"""Comprova la Content-Security-Policy de totes les pàgines generades (Fase 8, tasca 8.9).

Per a cada pàgina de dist/ (amb JavaScript i Chromium):
  - hi ha el <meta http-equiv="content-security-policy">, cap script executable el precedeix i no
    permet 'unsafe-inline' a script-src;
  - cap bloqueig de la política (esdeveniments securitypolicyviolation i missatges de la consola);
  - els scripts s'han executat (classe «js» a <html>) i els atributs style s'apliquen (--i, --chars…).
Interaccions: menú mòbil, desplegable d'idioma, mapa de Google sota demanda (frame-src) i filtres del
portafoli, amb la mateixa comprovació de bloquejos.

  python -I scripts/qa/check-csp.py http://localhost:4330
"""
import json
import pathlib
import sys
from playwright.sync_api import sync_playwright

B = sys.argv[1].rstrip('/') if len(sys.argv) > 1 else 'http://localhost:4330'
DIST = pathlib.Path(__file__).resolve().parents[2] / 'dist'
pages = sorted('/' + str(p.parent.relative_to(DIST)).replace('\\', '/').strip('.') + '/' for p in DIST.rglob('index.html'))
pages = [p.replace('//', '/') for p in pages]
results = []

LISTEN = """window.__csp = [];
document.addEventListener('securitypolicyviolation', (e) => window.__csp.push({ directiva: e.effectiveDirective, bloquejat: e.blockedURI, mostra: (e.sample || '').slice(0, 60) }));"""
STATE = """() => {
  const meta = document.querySelector('meta[http-equiv="content-security-policy"]')?.content ?? '';
  const script = (meta.match(/script-src[^;]*/) ?? [''])[0];
  const styled = [...document.querySelectorAll('[style]')].find((el) => /--[a-z]/.test(el.getAttribute('style')));
  const prop = styled ? (styled.getAttribute('style').match(/(--[a-z-]+)\\s*:/) ?? [])[1] : null;
  // Cap script executable abans del <meta>: un <meta> només s'aplica als elements posteriors (revisió de Codex).
  const metaEl = document.querySelector('meta[http-equiv="content-security-policy"]');
  const abans = metaEl ? [...document.scripts].filter((s) => s.type !== 'application/ld+json' && (s.compareDocumentPosition(metaEl) & Node.DOCUMENT_POSITION_FOLLOWING)).length : null;
  return { meta: Boolean(meta), scriptsAbansDeLaPolitica: abans, scriptUnsafeInline: script.includes('unsafe-inline'), js: document.documentElement.classList.contains('js'),
    atributStyle: prop ? getComputedStyle(styled).getPropertyValue(prop).trim() !== '' : null, bloquejos: window.__csp };
}"""


def check(name, ok, detail):
    results.append(ok)
    sys.stdout.buffer.write((f"{'ok   ' if ok else 'FALLA'} {name}  {json.dumps(detail, ensure_ascii=False)[:600]}\n").encode('utf-8'))


with sync_playwright() as pw:
    browser = pw.chromium.launch()
    ctx = browser.new_context(viewport={'width': 1280, 'height': 900})
    ctx.add_init_script(LISTEN)
    console = []
    page = ctx.new_page()
    page.on('console', lambda m: 'Content Security Policy' in m.text and console.append(m.text[:200]))
    for path in pages:
        console.clear()
        page.goto(B + path, wait_until='networkidle')
        page.mouse.wheel(0, 4000)
        page.wait_for_timeout(300)
        state = page.evaluate(STATE)
        ok = state['meta'] and state['scriptsAbansDeLaPolitica'] == 0 and not state['scriptUnsafeInline'] and state['js'] and state['atributStyle'] is not False and not state['bloquejos'] and not console
        check(f'Pàgina {path}', ok, {**state, 'consola': console[:3]})

    # Interaccions.
    console.clear()
    mobile = browser.new_context(viewport={'width': 390, 'height': 844})
    mobile.add_init_script(LISTEN)
    m = mobile.new_page()
    m.on('console', lambda msg: 'Content Security Policy' in msg.text and console.append(msg.text[:200]))
    m.goto(B + '/', wait_until='networkidle')
    m.click('.menu-toggle')
    m.click('.header-lang summary')
    state = m.evaluate(STATE)
    opened = m.evaluate('() => [document.getElementById("mobile-nav").classList.contains("is-open"), document.querySelector("[data-lang-menu]").open]')
    check('Menú mòbil i desplegable d\'idioma', opened == [True, True] and not state['bloquejos'] and not console, {'oberts': opened, 'bloquejos': state['bloquejos'], 'consola': console[:3]})
    mobile.close()

    console.clear()
    page.goto(B + '/contacte/', wait_until='networkidle')
    page.click('[data-map-load]')
    page.wait_for_selector('[data-map] iframe', timeout=15000)
    page.wait_for_timeout(4000)
    frame = page.evaluate('() => document.querySelector("[data-map] iframe").src')
    state = page.evaluate(STATE)
    check('Mapa de Google sota demanda (frame-src)', frame.startswith('https://maps.google.com/') and not state['bloquejos'] and not console, {'iframe': frame[:60], 'bloquejos': state['bloquejos'], 'consola': console[:3]})

    console.clear()
    page.goto(B + '/particulars/projectes/', wait_until='networkidle')
    filters = page.locator('[data-filter], [data-portfolio-filter], .portfolio-filters a, .portfolio-filters button')
    if filters.count() > 1:
        filters.nth(1).click()
        page.wait_for_timeout(500)
    state = page.evaluate(STATE)
    check('Filtres del portafoli', not state['bloquejos'] and not console, {'filtres': filters.count(), 'bloquejos': state['bloquejos'], 'consola': console[:3]})
    browser.close()

failed = results.count(False)
sys.stdout.buffer.write(f'\nresultats: {len(results) - failed} ok, {failed} falles ({len(pages)} pàgines)\n'.encode('utf-8'))
sys.exit(1 if failed else 0)
