"""Proves de navegador del formulari real (Fase 8, 8.5), contra scripts/qa/serve-contact.mjs.

Cap prova no envia correus: el servidor de 4330 és en mode dry-run i el de 4331 fa servir un enviador
fals que només compta. Cobreix català i castellà, amb JavaScript i sense, validació, antispam,
adjunts (límit exacte en bytes), duplicats, errors i lectura a 390 i 320 px.

Ús (amb Playwright i els dos servidors en marxa):
  python -I scripts/qa/check-contact-form.py http://localhost:4330 http://localhost:4331
"""
import json
import sys
import urllib.request
from playwright.sync_api import sync_playwright

DRY = sys.argv[1].rstrip('/') if len(sys.argv) > 1 else 'http://localhost:4330'
FAKE = sys.argv[2].rstrip('/') if len(sys.argv) > 2 else 'http://localhost:4331'
MAX = 3_000_000
JPEG = bytes([0xFF, 0xD8, 0xFF, 0xE0])
PNG = bytes([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A])
PAGES = {'ca': '/contacte/', 'es': '/es/contacto/'}
NOT_SENT = {
    'ca': "La consulta no s'ha enviat: el formulari encara no està actiu.",
    'es': 'La consulta no se ha enviado: el formulario todavía no está activo.',
}
results = []

# Textos aprovats de cada branca (src/i18n/ui.ts), com els ha de veure l'usuari.
BRANCH_TEXTS = {
    'ca': {
        'particular': {'label': 'Fotografia, esbós o document', 'summary': 'Afegir més dades (opcional)', 'hint': 'Descriu la feina o la incidència amb les teves paraules.'},
        'empresa': {'label': 'Plànol, documentació o fotografies', 'summary': 'Afegir dades tècniques (opcional)', 'hint': 'Descriu la peça o el manteniment que necessites i els requisits que ja coneixes.'},
    },
    'es': {
        'particular': {'label': 'Fotografía, boceto o documento', 'summary': 'Añadir más datos (opcional)', 'hint': 'Describe el trabajo o la incidencia con tus propias palabras.'},
        'empresa': {'label': 'Plano, documentación o fotografías', 'summary': 'Añadir datos técnicos (opcional)', 'hint': 'Describe la pieza o el mantenimiento que necesitas y los requisitos que ya conoces.'},
    },
}
TEXTS_JS = '''() => {
  const hint = document.querySelector('.description-hint');
  return {
    label: document.querySelector('label[for=adjunt]').innerText.trim(),
    help: document.getElementById('upload-help').innerText.trim(),
    summary: document.querySelector('.form-extra summary').innerText.trim(),
    hint: getComputedStyle(hint).display === 'none' ? null : hint.innerText.trim(),
    placeholder: document.getElementById('descripcio').placeholder,
  };
}'''


def check(name, ok, detail):
    results.append({'cas': name, 'ok': bool(ok), 'detall': detail})


def qa(base, path):
    with urllib.request.urlopen(base + path) as response:
        return json.loads(response.read() or b'{}') if response.status == 200 else None


def reset(base):
    urllib.request.urlopen(base + '/__qa/reset').read()


def payload(signature, size, name, mime='application/octet-stream'):
    return {'name': name, 'mimeType': mime, 'buffer': signature + bytes(max(0, size - len(signature)))}


def fill(page, locale='ca', descripcio=None):
    page.fill('#nom', 'Anna Puig' if locale == 'ca' else 'Ana Pérez')
    page.fill('#correu', 'anna@example.com')
    page.select_option('#servei', 'estructures')
    page.fill('#descripcio', descripcio or ('Necessito una barana per a una escala interior.' if locale == 'ca' else 'Necesito una barandilla para una escalera interior.'))
    page.check('#consentiment')


def status_text(page):
    page.wait_for_function('() => { const s = document.getElementById("form-status"); return s && !s.hidden && s.dataset.state !== "sending"; }', timeout=10000)
    return page.evaluate('() => { const s = document.getElementById("form-status"); return [s.dataset.state, s.textContent, document.activeElement?.id]; }')


with sync_playwright() as pw:
    browser = pw.chromium.launch()

    # ---------- Amb JavaScript ----------
    ctx = browser.new_context(viewport={'width': 1280, 'height': 900})
    page = ctx.new_page()
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))

    for locale in ('ca', 'es'):
        reset(DRY)
        page.goto(DRY + PAGES[locale], wait_until='load')
        demo = page.is_visible('#form-pending')
        fill(page, locale)
        page.click('[data-submit]')
        state, text, focus = status_text(page)
        log = qa(DRY, '/__qa/state')['logs'][-1]
        check(f'JS {locale}: consulta vàlida en mode demostració', state == 'not-sent' and text.startswith(NOT_SENT[locale]) and focus == 'form-status' and log['result'] == 'dry-run' and demo,
              {'estat': state, 'text': text[:70], 'focus': focus, 'registre': log['result'], 'avís de demostració visible': demo})

    # Validació al navegador: no arriba cap petició.
    reset(DRY)
    page.goto(DRY + PAGES['ca'], wait_until='load')
    page.click('[data-submit]')
    state, text, focus = status_text(page)
    invalid = page.evaluate('() => [...document.querySelectorAll("[aria-invalid=true]")].map((el) => el.id)')
    check('JS ca: camps buits, errors al navegador i focus al primer', state == 'error' and focus == 'nom' and set(invalid) >= {'nom', 'correu', 'servei', 'descripcio', 'consentiment'} and qa(DRY, '/__qa/state')['logs'] == [],
          {'estat': state, 'focus': focus, 'camps': invalid})

    # Error que només detecta el servidor: es mostra sota el camp, en l'idioma de la pàgina.
    for locale, message in (('ca', 'Descriu la consulta amb paraules.'), ('es', 'Describe la consulta con palabras.')):
        reset(DRY)
        page.goto(DRY + PAGES[locale], wait_until='load')
        fill(page, locale, descripcio='1234567890 !!')
        page.click('[data-submit]')
        status_text(page)
        shown = page.text_content('#descripcio-error')
        check(f'JS {locale}: error del servidor sota el camp', shown == message and page.get_attribute('#descripcio', 'aria-invalid') == 'true', {'missatge': shown})

    # Adjunts: el màxim exacte, un byte per sota i un per sobre.
    for size, expected in ((MAX, 'not-sent'), (MAX - 1, 'not-sent'), (MAX + 1, 'error')):
        reset(DRY)
        page.goto(DRY + PAGES['ca'], wait_until='load')
        fill(page)
        page.set_input_files('#adjunt', payload(JPEG, size, 'foto.jpg', 'image/jpeg'))
        page.click('[data-submit]')
        state, text, _ = status_text(page)
        logs = qa(DRY, '/__qa/state')['logs']
        file_error = page.text_content('#adjunt-error')
        ok = state == expected and (logs and logs[-1].get('fileBytes') == size if expected == 'not-sent' else logs == [] and 'supera els 3 MB' in file_error)
        check(f'JS: adjunt de {size} bytes', ok, {'estat': state, 'registre': logs[-1] if logs else None, 'error del fitxer': file_error})

    # Tipus: extensió no admesa (navegador) i contingut que no coincideix amb l'extensió (servidor).
    reset(DRY)
    page.goto(DRY + PAGES['ca'], wait_until='load')
    fill(page)
    page.set_input_files('#adjunt', payload(b'MZ', 200, 'programa.exe'))
    page.click('[data-submit]')
    status_text(page)
    browser_type = page.text_content('#adjunt-error')
    page.set_input_files('#adjunt', payload(PNG, 200, 'foto.jpg', 'image/jpeg'))
    page.click('[data-submit]')
    status_text(page)
    server_type = page.text_content('#adjunt-error')
    logs = qa(DRY, '/__qa/state')['logs']
    check('JS: tipus de fitxer (navegador i servidor)', 'no s\'admet' in browser_type and 'no s\'admet' in server_type and logs[-1]['result'] == 'file-type',
          {'navegador': browser_type, 'servidor': server_type, 'registre': logs[-1]['result']})

    # Camp parany: fora del tabulador i de l'arbre d'accessibilitat.
    trap = page.evaluate('() => { const i = document.getElementById("nota_interna"); return [i.tabIndex, i.closest(".form-trap").getAttribute("aria-hidden"), i.getBoundingClientRect().right < 0]; }')
    check('Camp parany amagat i fora del tabulador', trap == [-1, 'true', True], {'tabindex, aria-hidden, fora de la vista': trap})

    # Duplicats (servidor amb enviador fals): reenviar sense canvis no torna a enviar.
    reset(FAKE)
    page.goto(FAKE + PAGES['ca'], wait_until='load')
    fill(page)
    page.click('[data-submit]')
    state1, text1, _ = status_text(page)
    page.click('[data-submit]')
    state2, text2, _ = status_text(page)
    after_resend = qa(FAKE, '/__qa/state')
    page.fill('#descripcio', 'Necessito una barana per a una altra escala interior.')
    page.click('[data-submit]')
    state3, text3, _ = status_text(page)
    after_edit = qa(FAKE, '/__qa/state')
    check('JS: reenviament sense canvis = un sol correu; amb canvis = consulta nova',
          state1 == 'sent' and text1 == text2 and after_resend['sent'] == 1 and after_resend['logs'][-1]['result'] == 'duplicate' and after_edit['sent'] == 2 and text3 != text1,
          {'primer': text1[:60], 'reenviament': after_resend['logs'][-1]['result'], 'correus després del reenviament': after_resend['sent'], 'correus després de canviar': after_edit['sent']})

    # Textos de branca amb JavaScript: placeholder real de cada branca i cap superposició.
    page.goto(DRY + PAGES['ca'], wait_until='load')
    js_before = page.evaluate(TEXTS_JS)
    page.check('input[name=tipus][value=empresa]')
    page.wait_for_timeout(300)
    js_after = page.evaluate(TEXTS_JS)
    expected = BRANCH_TEXTS['ca']
    check('JS ca: textos de cada branca (placeholder real, sense superposició)',
          js_before['placeholder'] == expected['particular']['hint'] and js_after['placeholder'] == expected['empresa']['hint']
          and js_before['hint'] is None and js_after['hint'] is None
          and js_before['label'] == expected['particular']['label'] and js_after['label'] == expected['empresa']['label']
          and js_after['summary'] == expected['empresa']['summary'] and 'fins a 3 MB' in js_after['help'],
          {'abans': js_before, 'després': js_after})

    # Industrial amb JavaScript: el producte arriba al correu i el servei de Particulars no s'envia.
    reset(FAKE)
    page.goto(FAKE + PAGES['es'], wait_until='load')
    page.check('input[name=tipus][value=empresa]')
    page.wait_for_timeout(300)
    page.fill('#nom', 'Ana Pérez')
    page.fill('#correu', 'ana@example.com')
    page.select_option('#servei-empresa', 'carros')
    page.fill('#descripcio', 'Necesitamos carros industriales para el almacén.')
    page.check('#consentiment')
    page.click('[data-submit]')
    state_js, text_js, _ = status_text(page)
    last = qa(FAKE, '/__qa/state')['last'] or {}
    check('JS es: Industrial amb producte', state_js == 'sent' and 'Industrial · Carros industrials' in last.get('subject', '') and page.is_disabled('#servei'),
          {'estat': state_js, 'assumpte': last.get('subject'), 'servei de Particulars desactivat': page.is_disabled('#servei')})

    # Manteniment industrial (12/10/2026): l'enllaç de la secció preselecciona Industrial i el manteniment.
    for locale, path, label in (('ca', '/contacte/?tipus=empresa&servei=manteniment', 'Manteniment industrial'), ('es', '/es/contacto/?tipus=empresa&servei=manteniment', 'Mantenimiento industrial')):
        reset(FAKE)
        page.goto(FAKE + path, wait_until='load')
        preselected = page.evaluate('() => [document.querySelector("input[name=tipus]:checked")?.value, document.getElementById("servei-empresa").value, document.getElementById("servei-empresa").selectedOptions[0]?.textContent, document.querySelector("label[for=servei-empresa]").textContent]')
        page.fill('#nom', 'Prova QA')
        page.fill('#correu', 'qa@example.com')
        page.fill('#descripcio', 'Cal revisar una porta seccional de la nau.' if locale == 'ca' else 'Hay que revisar una puerta seccional de la nave.')
        page.check('#consentiment')
        page.click('[data-submit]')
        state_m, _, _ = status_text(page)
        last = qa(FAKE, '/__qa/state')['last'] or {}
        check(f'JS {locale}: manteniment preseleccionat i enviat (correu fals)',
              preselected[:3] == ['empresa', 'manteniment', label] and state_m == 'sent' and 'Industrial · Manteniment industrial' in last.get('subject', '') and "Tipus d'encàrrec: Manteniment industrial" in last.get('body', ''),
              {'preselecció': preselected, 'estat': state_m, 'assumpte': last.get('subject')})

    # Doble clic: el botó es desactiva mentre s'envia.
    reset(FAKE)
    page.goto(FAKE + PAGES['es'], wait_until='load')
    fill(page, 'es')
    page.dblclick('[data-submit]')
    state, text, _ = status_text(page)
    check('JS es: doble clic = un sol correu', qa(FAKE, '/__qa/state')['sent'] == 1 and state == 'sent' and text.startswith('La consulta se ha enviado (ref. '), {'correus': qa(FAKE, '/__qa/state')['sent'], 'text': text[:60]})

    # Errors de xarxa i respostes que no són de la funció (simulades al navegador).
    for label, handler, expected in (
        ('xarxa caiguda', lambda route: route.abort(), 'No hem pogut enviar la consulta.'),
        ('502 sense JSON', lambda route: route.fulfill(status=502, body='Bad gateway'), 'No hem pogut enviar la consulta.'),
        ('429 de la capa 1 de Netlify', lambda route: route.fulfill(status=429, body='Too many requests'), 'Hem rebut diverses consultes seguides'),
        ('413 de la plataforma', lambda route: route.fulfill(status=413, body='Payload too large'), 'El fitxer supera els 3 MB'),
    ):
        page.goto(DRY + PAGES['ca'], wait_until='load')
        page.route('**/api/contacte**', handler)
        fill(page)
        page.click('[data-submit]')
        state, text, _ = status_text(page)
        enabled = page.is_enabled('[data-submit]')
        page.unroute('**/api/contacte**')
        check(f'JS: {label}', state == 'error' and text.startswith(expected) and enabled, {'estat': state, 'text': text[:70], 'botó actiu': enabled})

    # Límit de freqüència real del servidor: la sisena consulta vàlida de l'hora rep 429.
    reset(DRY)
    page.goto(DRY + PAGES['ca'], wait_until='load')
    fill(page)
    states = []
    for index in range(6):
        page.fill('#descripcio', f'Consulta de prova número {index + 1} per a la barana.')
        page.click('[data-submit]')
        states.append(status_text(page)[:2])
    check('JS: sisena consulta de l\'hora, 429', [s for s, _ in states] == ['not-sent'] * 5 + ['error'] and states[-1][1].startswith('Hem rebut diverses consultes seguides'), {'estats': [s for s, _ in states]})

    check('JS: cap error de JavaScript', not errors, {'errors': errors})
    ctx.close()

    # ---------- Lectura a 390 i 320 px ----------
    for width in (390, 320):
        mctx = browser.new_context(viewport={'width': width, 'height': 800}, is_mobile=True, has_touch=True)
        mpage = mctx.new_page()
        reset(DRY)
        mpage.goto(DRY + PAGES['ca'], wait_until='load')
        fill(mpage)
        mpage.set_input_files('#adjunt', payload(JPEG, 1000, 'foto-del-portal-de-casa.jpg', 'image/jpeg'))
        mpage.locator('[data-submit]').tap()
        state, text, _ = status_text(mpage)
        overflow = mpage.evaluate('() => document.documentElement.scrollWidth - window.innerWidth')
        box = mpage.evaluate('() => { const r = document.getElementById("form-status").getBoundingClientRect(); return [Math.round(r.left), Math.round(r.right)]; }')
        check(f'{width} px: missatge visible i sense desbordament', state == 'not-sent' and overflow <= 0 and box[0] >= 0 and box[1] <= width, {'desbordament': overflow, 'missatge (x)': box})
        mctx.close()

    # ---------- Sense JavaScript ----------
    nctx = browser.new_context(java_script_enabled=False)
    npage = nctx.new_page()

    def native_submit(base, locale, filler=None, file=None, branch=None, reload=True):
        if reload:
            npage.goto(base + PAGES[locale], wait_until='load')
        if branch:
            npage.check(f'input[name=tipus][value={branch}]')
        if filler:
            filler(npage)
        if file:
            npage.set_input_files('#adjunt', file)
        # Enviament amb el teclat (focus al botó i Enter). Sense JavaScript, Playwright no pot comprovar
        # si un element és «estable» per fer-hi clic: en aquest context no avancen els fotogrames
        # d'animació (una prova amb requestAnimationFrame no acaba). No afecta els usuaris.
        npage.focus('[data-submit]')
        with npage.expect_navigation() as nav:
            npage.keyboard.press('Enter')
        response = nav.value
        return response.status, npage.evaluate('() => [document.documentElement.lang, document.querySelector("meta[name=robots]")?.content, document.querySelector("[role=status]")?.textContent, document.querySelector("main a")?.getAttribute("href"), [...document.querySelectorAll("li")].map((li) => li.textContent)]'), response.headers

    enabled = None
    for locale in ('ca', 'es'):
        reset(DRY)
        npage.goto(DRY + PAGES[locale], wait_until='load')
        enabled = npage.is_enabled('[data-submit]')
        status, (lang, robots, message, back, _), headers = native_submit(DRY, locale, lambda p: fill(p, locale))
        check(f'Sense JS {locale}: enviament nadiu i pàgina de resposta', enabled and status == 200 and lang == locale and robots == 'noindex' and message.startswith(NOT_SENT[locale]) and back == PAGES[locale] and headers.get('x-robots-tag') == 'noindex',
              {'botó actiu': enabled, 'estat': status, 'lang': lang, 'robots': robots, 'missatge': (message or '')[:60], 'tornar': back})

    reset(DRY)
    status, (lang, _, message, _, items), _ = native_submit(DRY, 'ca')
    check('Sense JS ca: camps buits, 400 amb la llista d\'errors', status == 400 and message == 'Revisa els camps marcats per continuar.' and any(item.startswith('Nom i cognoms:') for item in items) and any(item.startswith('Política de privacitat:') for item in items),
          {'estat': status, 'errors': items})

    reset(DRY)
    status, (lang, _, message, _, items), _ = native_submit(DRY, 'es', lambda p: (p.fill('#nom', 'Ana'), p.fill('#correu', 'malament')))
    check('Sense JS es: errors en castellà', status == 400 and lang == 'es' and any(item.startswith('Correo electrónico: Revisa el formato') for item in items), {'estat': status, 'errors': items})

    for size, expected in ((MAX, 200), (MAX - 1, 200), (MAX + 1, 413)):
        reset(DRY)
        status, (_, _, message, _, _), _ = native_submit(DRY, 'ca', fill, payload(JPEG, size, 'foto.jpg', 'image/jpeg'))
        logs = qa(DRY, '/__qa/state')['logs']
        check(f'Sense JS: adjunt de {size} bytes', status == expected and (logs[-1].get('fileBytes') == size if expected == 200 else message.startswith('El fitxer supera els 3 MB')),
              {'estat': status, 'missatge': (message or '')[:60]})

    def press_check(p, selector):
        """Marca amb el teclat, pel mateix motiu que native_submit (comprovació d'estabilitat de
        Playwright sense JavaScript)."""
        if not p.is_checked(selector):
            p.focus(selector)
            p.keyboard.press('Space')

    # Sense JavaScript, Industrial mostra els seus camps (CSS :has) i no demana cap servei de Particulars.
    def visible_fields(p):
        return p.evaluate('() => Object.fromEntries(["empresa", "servei-empresa", "unitats", "material", "termini", "sector", "servei"].map((id) => { const el = document.getElementById(id); return [id, [el.checkVisibility(), !el.matches(":disabled")]]; }))')

    reset(FAKE)
    npage.goto(FAKE + PAGES['ca'], wait_until='load')
    before = visible_fields(npage)
    press_check(npage, 'input[name=tipus][value=empresa]')
    npage.focus('.form-extra summary')
    npage.keyboard.press('Enter')
    after = visible_fields(npage)
    npage.fill('#nom', 'Jordi Vidal')
    npage.fill('#correu', 'jordi@example.com')
    npage.fill('#empresa', 'Tallers Vidal SL')
    npage.select_option('#servei-empresa', 'peces')
    npage.fill('#descripcio', 'Sèrie de suports d\'acer inoxidable segons plànol.')
    npage.fill('#unitats', '250')
    npage.fill('#material', 'Inox 304')
    npage.fill('#termini', '6 setmanes')
    npage.fill('#sector', 'Alimentació')
    press_check(npage, '#consentiment')
    npage.focus('[data-submit]')
    with npage.expect_navigation() as nav:
        npage.keyboard.press('Enter')
    state = qa(FAKE, '/__qa/state')
    body = (state['last'] or {}).get('body', '')
    subject = (state['last'] or {}).get('subject', '')
    expected_lines = ['Empresa: Tallers Vidal SL', "Tipus d'encàrrec: Peces i conjunts a mida", 'Unitats previstes: 250', 'Material: Inox 304', 'Termini desitjat: 6 setmanes', 'Sector: Alimentació']
    check('Sense JS: Industrial amb empresa, producte i dades tècniques',
          nav.value.status == 200 and state['sent'] == 1 and all(line in body for line in expected_lines) and 'Industrial · Peces i conjunts a mida' in subject
          and before['empresa'] == [False, True] and before['servei'] == [True, True]
          and all(after[id] == [True, True] for id in ('empresa', 'servei-empresa', 'unitats', 'material', 'termini', 'sector')) and after['servei'][0] is False,
          {'estat': nav.value.status, 'assumpte': subject, 'línies': [line for line in expected_lines if line in body], 'abans (visible, actiu)': before, 'després': after})

    for locale in ('ca', 'es'):
        npage.goto(DRY + PAGES[locale], wait_until='load')
        before = npage.evaluate(TEXTS_JS)
        press_check(npage, 'input[name=tipus][value=empresa]')
        after = npage.evaluate(TEXTS_JS)
        npage.fill('#descripcio', 'Text escrit')
        typed = npage.evaluate(TEXTS_JS)
        expected = BRANCH_TEXTS[locale]
        ok = all(before[key] == expected['particular'][key] for key in ('label', 'summary', 'hint')) \
            and all(after[key] == expected['empresa'][key] for key in ('label', 'summary', 'hint')) \
            and typed['hint'] is None and before['placeholder'] == ' ' and ('3 MB' in after['help'])
        check(f'Sense JS {locale}: textos d\'Industrial (adjunt, desplegable i ajuda de la descripció)', ok, {'Particulars': before, 'Industrial': after, 'amb text': typed['hint']})

    # Sense JavaScript no hi ha preselecció per paràmetre: el manteniment es tria a mà al selector d'Industrial.
    reset(FAKE)
    npage.goto(FAKE + '/contacte/?tipus=empresa&servei=manteniment', wait_until='load')
    press_check(npage, 'input[name=tipus][value=empresa]')
    options = npage.evaluate('() => [...document.querySelectorAll("#servei-empresa option")].map((o) => o.value)')
    npage.select_option('#servei-empresa', 'manteniment')
    status, (_, _, message, _, _), _ = native_submit(FAKE, 'ca', lambda p: (p.fill('#nom', 'Prova QA'), p.fill('#correu', 'qa@example.com'), p.fill('#descripcio', 'Cal revisar una porta de la nau.'), press_check(p, '#consentiment')), reload=False)
    last = qa(FAKE, '/__qa/state')['last'] or {}
    check('Sense JS: manteniment seleccionat a mà', 'manteniment' in options and status == 200 and 'Industrial · Manteniment industrial' in last.get('subject', ''),
          {'opcions': options, 'estat': status, 'assumpte': last.get('subject')})

    # Tornar a Particulars sense JavaScript: torna a demanar el servei; els camps d'Industrial no compten.
    reset(FAKE)
    npage.goto(FAKE + PAGES['ca'], wait_until='load')
    press_check(npage, 'input[name=tipus][value=empresa]')
    npage.fill('#empresa', 'No hauria de sortir')
    press_check(npage, 'input[name=tipus][value=particular]')
    status, (_, _, message, _, items), _ = native_submit(FAKE, 'ca', lambda p: (p.fill('#nom', 'Anna Puig'), p.fill('#correu', 'anna@example.com'), p.fill('#descripcio', 'Necessito una barana interior.'), press_check(p, '#consentiment')))
    check('Sense JS: Particulars continua exigint el servei', status == 400 and any(item.startswith('Servei:') for item in items), {'estat': status, 'errors': items})

    # Duplicats sense JavaScript: cada enviament nadiu té una referència nova (limitació documentada).
    reset(FAKE)
    native_submit(FAKE, 'ca', fill)
    native_submit(FAKE, 'ca', fill)
    check('Sense JS: dos enviaments nadius = dues consultes (referència del servidor)', qa(FAKE, '/__qa/state')['sent'] == 2, {'correus falsos': qa(FAKE, '/__qa/state')['sent']})
    nctx.close()
    browser.close()

for item in results:
    line = f"{'ok   ' if item['ok'] else 'FALLA'} {item['cas']}  {json.dumps(item['detall'], ensure_ascii=False)}"
    sys.stdout.buffer.write((line + chr(10)).encode('utf-8'))
sys.exit(0 if all(item['ok'] for item in results) else 1)
