"""Accessibilitat de les pàgines generades (Fase 8, tasca 8.8).

1. axe-core (devDependency, versió fixa) a totes les pàgines de dist/, a 1280 i 390 px, amb les regles
   WCAG 2.0, 2.1 i 2.2 A i AA. Falla amb qualsevol infracció. Les «best-practice» es mostren a part.
   La CSP de la web bloqueja el script injectat d'axe: el context de prova la desactiva (bypass_csp);
   la política real ja la prova check-csp.py.
2. Contrast del text sobre fotografia: axe no el pot calcular quan el fons és una imatge (resultats
   «incomplete» de color-contrast). Per a aquests elements, la prova amaga el text (i la seva ombra),
   fa una captura del fons real (fotografia i vels) i calcula la relació de contrast del color del text
   amb cada píxel del fons que queda sota les lletres i a 2 px al voltant (diferència entre una
   captura amb el text i una sense). Criteri: el percentil 5 (el 95 % del fons) ha d'arribar a
   4,5:1, o a 3:1 si el text és gran (≥ 24 px, o ≥ 18,66 px en negreta). Es mesura sense l'ombra del
   text, que encara hi suma llegibilitat.

  python -I scripts/qa/check-a11y.py http://localhost:4330 [informe.json|-] [axe|tot] [/,/industrial/]
"""
import io
import json
import pathlib
import sys

from PIL import Image, ImageChops, ImageFilter
from playwright.sync_api import sync_playwright

B = sys.argv[1].rstrip('/') if len(sys.argv) > 1 else 'http://localhost:4330'
REPORT = sys.argv[2] if len(sys.argv) > 2 and sys.argv[2] != '-' else None
ONLY_AXE = len(sys.argv) > 3 and sys.argv[3] == 'axe'  # sense la mesura del text sobre fotografia (ràpid)
ONLY_PAGES = sys.argv[4].split(',') if len(sys.argv) > 4 else None  # p. ex. /,/industrial/

# Excepcions acceptades per decisió del director: es mostren a la sortida, però no fan fallar la prova.
ACCEPTED = {
    ('color-contrast', '.hero-origin > strong'): "«1989» en bordeus sobre grafit a l'entrada de la Home (1,5:1): el director el manté (16/10/2026)",
}
ROOT = pathlib.Path(__file__).resolve().parents[2]
DIST = ROOT / 'dist'
AXE = (ROOT / 'node_modules' / 'axe-core' / 'axe.min.js').read_text(encoding='utf-8')
all_pages = sorted({('/' + str(p.parent.relative_to(DIST)).replace('\\', '/') + '/').replace('/./', '/').replace('//', '/') for p in DIST.rglob('index.html')})
pages = [p for p in all_pages if not ONLY_PAGES or p in ONLY_PAGES]
TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']
results, report = [], {'infraccions': [], 'bones_practiques': [], 'contrast_sobre_foto': []}


def out(text):
    sys.stdout.buffer.write((text + '\n').encode('utf-8'))


def check(name, ok, detail):
    results.append(ok)
    out(f"{'ok   ' if ok else 'FALLA'} {name}  {json.dumps(detail, ensure_ascii=False)[:700]}")


def luminance(rgb):
    def channel(c):
        c = c / 255
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = rgb[:3]
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)


def contrast(l1, l2):
    hi, lo = max(l1, l2), min(l1, l2)
    return (hi + 0.05) / (lo + 0.05)


MEASURE = """(selector) => {
  const el = document.querySelector(selector);
  if (!el) return null;
  const range = document.createRange();
  range.selectNodeContents(el);
  const rects = [...range.getClientRects()].filter((r) => r.width > 1 && r.height > 1);
  const cs = getComputedStyle(el);
  const size = parseFloat(cs.fontSize), weight = parseInt(cs.fontWeight, 10);
  // Text pintat amb un degradat retallat (background-clip: text): el color són les parades del degradat.
  const clipped = (cs.backgroundClip || cs.webkitBackgroundClip) === 'text' || cs.webkitBackgroundClip === 'text';
  const colors = clipped ? (cs.backgroundImage.match(/rgba?\\([^)]*\\)/g) ?? [cs.color]) : [cs.color];
  return { rects: rects.map((r) => [r.left, r.top, r.width, r.height]), colors, clipped, size, weight,
           gran: size >= 24 || (size >= 18.66 && weight >= 700), text: el.textContent.trim().slice(0, 50) };
}"""
# Amaga només els glifs (color, -webkit-text-fill-color, ombra i, si el text és un degradat retallat,
# el degradat), de manera que la captura mostra el fons real: fotografia, vels i fons propis.
GLYPHS = ['color', '-webkit-text-fill-color', 'text-shadow']
HIDE = """(selector) => { const el = document.querySelector(selector);
  for (const node of [el, ...el.querySelectorAll('*')]) {
    const cs = getComputedStyle(node);
    node.style.setProperty('color', 'transparent', 'important');
    node.style.setProperty('-webkit-text-fill-color', 'transparent', 'important');
    node.style.setProperty('text-shadow', 'none', 'important');
    if ((cs.backgroundClip || cs.webkitBackgroundClip) === 'text' || cs.webkitBackgroundClip === 'text') node.style.setProperty('background-image', 'none', 'important');
  } }"""
SHOW = """(selector) => { const el = document.querySelector(selector);
  for (const node of [el, ...el.querySelectorAll('*')]) ['color', '-webkit-text-fill-color', 'text-shadow', 'background-image'].forEach((p) => node.style.removeProperty(p)); }"""


def parse_rgb(css):
    nums = [float(x) for x in css[css.index('(') + 1:css.index(')')].replace('/', ',').replace(' ', ',').split(',') if x]
    return nums[:3]


with sync_playwright() as pw:
    browser = pw.chromium.launch()
    for width in (1280, 390):
        ctx = browser.new_context(viewport={'width': width, 'height': 900}, bypass_csp=True, reduced_motion='reduce')
        page = ctx.new_page()
        for path in pages:
            page.goto(B + path, wait_until='networkidle')
            page.evaluate('() => window.scrollTo(0, document.body.scrollHeight)')
            page.wait_for_timeout(200)
            page.evaluate('() => window.scrollTo(0, 0)')
            page.add_script_tag(content=AXE)
            res = page.evaluate("""async (tags) => {
              const r = await axe.run(document, { runOnly: { type: 'tag', values: [...tags, 'best-practice'] }, resultTypes: ['violations', 'incomplete'] });
              const pick = (v) => ({ id: v.id, impacte: v.impact, wcag: v.tags.filter((t) => /^wcag\\d/.test(t)), nodes: v.nodes.map((n) => n.target.join(' ')).slice(0, 6), total: v.nodes.length });
              return { violations: r.violations.map(pick), incomplete: r.incomplete.filter((v) => v.id === 'color-contrast').flatMap((v) => v.nodes.map((n) => n.target.join(' '))) };
            }""", TAGS)
            accepted = []
            for v in res['violations']:
                keep = [n for n in v['nodes'] if (v['id'], n) not in ACCEPTED]
                accepted += [ACCEPTED[(v['id'], n)] for n in v['nodes'] if (v['id'], n) in ACCEPTED]
                v['total'] -= len(v['nodes']) - len(keep)
                v['nodes'] = keep
            res['violations'] = [v for v in res['violations'] if v['total'] > 0]
            wcag = [v for v in res['violations'] if v['wcag']]
            best = [v for v in res['violations'] if not v['wcag']]
            report['infraccions'] += [{'pàgina': path, 'amplada': width, **v} for v in wcag]
            report['bones_practiques'] += [{'pàgina': path, 'amplada': width, **v} for v in best]
            check(f'axe {width} px {path}', not wcag, {'infraccions WCAG': [(v['id'], v['total']) for v in wcag], 'bones pràctiques': [(v['id'], v['total']) for v in best], **({'excepcions acceptades': accepted} if accepted else {})})

            # Contrast del text sobre fotografia (els «incomplete» de color-contrast d'axe).
            for selector in ([] if ONLY_AXE else res['incomplete']):
                info = page.evaluate(MEASURE, selector)
                if not info or not info['rects']:
                    continue
                page.evaluate('(s) => document.querySelector(s).scrollIntoView({ block: "center" })', selector)
                page.wait_for_timeout(120)
                info2 = page.evaluate(MEASURE, selector)
                covered = page.evaluate('''(s) => { const el = document.querySelector(s); const r = el.getBoundingClientRect();
                  const hit = document.elementFromPoint(r.left + Math.min(8, r.width / 2), r.top + r.height / 2); return !(hit && (hit === el || el.contains(hit) || hit.contains(el))); }''', selector)
                if covered or not info2['rects']:
                    continue
                # Dues captures, amb el text i sense: els píxels que canvien són les lletres (i la seva
                # ombra). Només compta el fons sota les lletres i a 2 px al voltant: una vora o una forma
                # del fons lluny de les lletres no afecta la lectura i no ha de penalitzar la mesura.
                visible = Image.open(io.BytesIO(page.screenshot())).convert('RGB')
                page.evaluate(HIDE, selector)
                page.wait_for_timeout(60)
                shot = Image.open(io.BytesIO(page.screenshot())).convert('RGB')
                page.evaluate(SHOW, selector)
                ink = ImageChops.difference(visible, shot).convert('L').point(lambda v: 255 if v > 24 else 0).filter(ImageFilter.MaxFilter(5))
                text_ls = [luminance(parse_rgb(c)) for c in info['colors']]
                ratios = []
                for x, y, w, h in info2['rects']:
                    box = (max(0, int(x)), max(0, int(y)), min(shot.width, int(x + w)), min(shot.height, int(y + h)))
                    if box[2] <= box[0] or box[3] <= box[1]:
                        continue
                    for px, m in zip(shot.crop(box).getdata(), ink.crop(box).getdata()):
                        if m:
                            ratios.append(min(contrast(t, luminance(px)) for t in text_ls))
                if not ratios:
                    continue
                ratios.sort()
                p05 = ratios[int(len(ratios) * 0.05)]
                need = 3.0 if info['gran'] else 4.5
                item = {'pàgina': path, 'amplada': width, 'element': selector[-60:], 'text': info['text'], 'mida': info['size'],
                        'gran': info['gran'], 'degradat': info['clipped'], 'mínim': round(ratios[0], 2), 'p05': round(p05, 2), 'mediana': round(ratios[len(ratios) // 2], 2), 'cal': need}
                report['contrast_sobre_foto'].append(item)
                check(f"contrast sobre foto {width} px {path} «{info['text'][:30]}»", p05 >= need, {k: item[k] for k in ('element', 'mida', 'mínim', 'p05', 'mediana', 'cal')})
        ctx.close()
    browser.close()

if REPORT:
    pathlib.Path(REPORT).write_text(json.dumps(report, ensure_ascii=False, indent=1), encoding='utf-8')
failed = results.count(False)
out(f'\nresultats: {len(results) - failed} ok, {failed} falles ({len(pages)} pàgines × 2 amplades; {len(report["contrast_sobre_foto"])} textos sobre fotografia mesurats)')
sys.exit(1 if failed else 0)
