"""Proves del formulari real en una previsualització de Netlify en mode dry-run (Fase 8, 8.5).

No envia cap correu: la funció és en mode «dry-run». Cada consulta vàlida gasta el límit horari de la
connexió (5 per hora en l'àmbit dry-run) i cada petició a la funció, la regla de Netlify (5 per minut):
la prova espera 20 s entre peticions (amb 13 s, la regla aproximada de Netlify encara saltava) i fa les consultes vàlides en un ordre pensat perquè la sisena
comprovi el límit horari. La ràfega de la regla de Netlify va al final.

Ús (Playwright):
  python -I scripts/qa/check-contact-form-remote.py https://revisio-client--serralleriacarbo.netlify.app [tot|limits]
«limits» només executa els passos 9–11 (límit horari, petició de més de 6 MB i regla de Netlify).
"""
import json
import secrets
import sys
import threading
import time
import urllib.error
import urllib.request
from playwright.sync_api import sync_playwright

B = sys.argv[1].rstrip('/') if len(sys.argv) > 1 else 'https://revisio-client--serralleriacarbo.netlify.app'
PART = sys.argv[2] if len(sys.argv) > 2 else 'tot'
MAX = 3_000_000
JPEG = bytes([0xFF, 0xD8, 0xFF, 0xE0])
PAGES = {'ca': '/contacte/', 'es': '/es/contacto/'}
NOT_SENT = {'ca': "La consulta no s'ha enviat", 'es': 'La consulta no se ha enviado'}
ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ'
results = []
last_call = [0.0]


def check(name, ok, detail):
    results.append({'cas': name, 'ok': bool(ok), 'detall': detail})
    line = f"{'ok   ' if ok else 'FALLA'} {name}  {json.dumps(detail, ensure_ascii=False)}"
    sys.stdout.buffer.write((line[:900] + chr(10)).encode('utf-8'))
    sys.stdout.flush()


def pace(slots=1, seconds=20):
    """Reserva `slots` peticions a la funció, a raó d'una cada 20 s com a molt: ben per sota de la regla de
    Netlify (5 per minut). Unes peticions simultànies ocupen tants llocs com peticions."""
    wait = last_call[0] + seconds - time.time()
    if wait > 0:
        time.sleep(wait)
    last_call[0] = time.time() + seconds * (slots - 1)


def ref():
    return ''.join(secrets.choice(ALPHABET) for _ in range(10))


def multipart(fields, file=None):
    boundary = 'qa' + secrets.token_hex(12)
    parts = []
    for name, value in fields.items():
        parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="{name}"\r\n\r\n{value}\r\n'.encode('utf-8'))
    if file:
        name, content, mime = file
        parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="adjunt"; filename="{name}"\r\nContent-Type: {mime}\r\n\r\n'.encode('utf-8') + content + b'\r\n')
    parts.append(f'--{boundary}--\r\n'.encode('utf-8'))
    return b''.join(parts), f'multipart/form-data; boundary={boundary}'


def post(fields, file=None, locale='ca', accept='application/json'):
    body, ctype = multipart(fields, file)
    request = urllib.request.Request(f'{B}/api/contacte?idioma={locale}', data=body, method='POST', headers={'content-type': ctype, 'accept': accept, 'user-agent': 'serralleria-qa'})
    try:
        with urllib.request.urlopen(request, timeout=60) as response:
            return response.status, dict(response.headers), response.read().decode('utf-8', 'replace')
    except urllib.error.HTTPError as error:
        return error.code, dict(error.headers), error.read().decode('utf-8', 'replace')
    except (ConnectionError, urllib.error.URLError) as error:
        # Netlify pot tallar la connexió d'un POST rebutjat abans de llegir-ne el cos.
        return 0, {}, f'connexió tallada: {error}'


def fields(locale='ca', **extra):
    base = {'tipus': 'particular', 'nom': 'Prova QA', 'correu': 'qa@example.com', 'servei': 'estructures',
            'descripcio': 'Consulta de prova automàtica, sense enviament.', 'consentiment': 'on', 'idioma': locale, 'origen': PAGES[locale]}
    base.update(extra)
    return base


def payload(signature, size, name, mime):
    return {'name': name, 'mimeType': mime, 'buffer': signature + bytes(max(0, size - len(signature)))}


def fill(page, locale='ca', descripcio=None):
    page.fill('#nom', 'Prova QA')
    page.fill('#correu', 'qa@example.com')
    page.select_option('#servei', 'estructures')
    page.fill('#descripcio', descripcio or ('Consulta de prova automàtica, sense enviament.' if locale == 'ca' else 'Consulta de prueba automática, sin envío.'))
    page.check('#consentiment')


def press_check(p, selector):
    if not p.is_checked(selector):
        p.focus(selector)
        p.keyboard.press('Space')


def status_text(page):
    page.wait_for_function('() => { const s = document.getElementById("form-status"); return s && !s.hidden && s.dataset.state !== "sending"; }', timeout=60000)
    return page.evaluate('() => { const s = document.getElementById("form-status"); return [s.dataset.state, s.textContent]; }')


def js_submit(page):
    pace()
    with page.expect_response(lambda response: '/api/contacte' in response.url) as info:
        page.click('[data-submit]')
    response = info.value
    state = status_text(page)
    try:
        body = response.json()
    except Exception:
        body = None
    return response.status, response.headers, body, state


def native_submit(npage):
    pace()
    npage.focus('[data-submit]')
    with npage.expect_navigation() as nav:
        npage.keyboard.press('Enter')
    response = nav.value
    return response.status, response.headers, npage.evaluate('() => [document.documentElement.lang, document.querySelector("meta[name=robots]")?.content, document.querySelector("[role=status]")?.textContent]')


# 0. Pàgines: avís de demostració i noindex.
if PART == 'tot':
  with sync_playwright() as pw:
      browser = pw.chromium.launch()
      ctx = browser.new_context(viewport={'width': 1280, 'height': 900})
      page = ctx.new_page()
      js_errors = []
      page.on('pageerror', lambda error: js_errors.append(str(error)))
      for locale, path in PAGES.items():
          response = page.goto(B + path, wait_until='load')
          info = page.evaluate('() => [document.querySelector("#form-pending strong")?.textContent, document.querySelector("meta[name=robots]")?.content, document.getElementById("contact-form").getAttribute("action"), document.querySelector("[data-submit]").disabled]')
          check(f'Pàgina {locale}: avís de demostració i noindex', response.status == 200 and response.headers.get('x-robots-tag') == 'noindex' and info[0] and info[2] == f'/api/contacte?idioma={locale}' and info[3] is False,
                {'estat': response.status, 'X-Robots-Tag': response.headers.get('x-robots-tag'), 'avís': info[0], 'meta robots': info[1], 'action': info[2]})

      # 1. Primera petició a la funció (activa la neteja oportunista de la instància nova).
      pace()
      request = urllib.request.Request(f'{B}/api/contacte', headers={'accept': 'application/json', 'user-agent': 'serralleria-qa'})
      try:
          urllib.request.urlopen(request, timeout=60)
          get_status, get_headers, get_body = 200, {}, ''
      except urllib.error.HTTPError as error:
          get_status, get_headers, get_body = error.code, dict(error.headers), error.read().decode('utf-8', 'replace')
      check('Funció: GET respon 405 amb noindex i sense memòria cau', get_status == 405 and get_headers.get('X-Robots-Tag', get_headers.get('x-robots-tag')) == 'noindex' and 'no-store' in str(get_headers.get('Cache-Control', get_headers.get('cache-control'))),
            {'estat': get_status, 'capçaleres': {k: v for k, v in get_headers.items() if k.lower() in ('x-robots-tag', 'cache-control', 'allow')}, 'cos': get_body[:120]})

      # 2. Error que només detecta el servidor (no gasta el límit horari).
      page.goto(B + PAGES['ca'], wait_until='load')
      fill(page, descripcio='1234567890 !!')
      status, _, body, state = js_submit(page)
      check('JS ca: error del servidor sota el camp', status == 400 and page.text_content('#descripcio-error') == 'Descriu la consulta amb paraules.', {'estat': status, 'error': page.text_content('#descripcio-error')})

      # 3. Vàlida 1: JavaScript, català, adjunt d'exactament 3.000.000 bytes.
      page.goto(B + PAGES['ca'], wait_until='load')
      fill(page)
      page.set_input_files('#adjunt', payload(JPEG, MAX, 'plànol.jpg', 'image/jpeg'))
      started = time.time()
      status, headers, body, state = js_submit(page)
      check('JS ca: adjunt d\'exactament 3.000.000 bytes (dry-run)', status == 200 and body and body.get('state') == 'dry-run' and state[1].startswith(NOT_SENT['ca']),
            {'estat': status, 'resposta': body, 'segons': round(time.time() - started, 1)})

      # 4. 3.000.001 bytes: el navegador ho atura; el servidor també (petició directa).
      page.goto(B + PAGES['ca'], wait_until='load')
      fill(page)
      page.set_input_files('#adjunt', payload(JPEG, MAX + 1, 'plànol.jpg', 'image/jpeg'))
      page.click('[data-submit]')
      state = status_text(page)
      check('JS: 3.000.001 bytes aturat al navegador', state[0] == 'error' and 'supera els 3 MB' in page.text_content('#adjunt-error'), {'error': page.text_content('#adjunt-error')})
      pace()
      status, headers, body = post(fields(), ('foto.jpg', JPEG + bytes(MAX + 1 - len(JPEG)), 'image/jpeg'))
      check('Servidor: 3.000.001 bytes, 413', status == 413 and json.loads(body).get('state') == 'too-large', {'estat': status, 'cos': body[:160]})

      # 5. Vàlida 2: sense JavaScript, castellà, 2.999.999 bytes.
      nctx = browser.new_context(java_script_enabled=False)
      npage = nctx.new_page()
      npage.goto(B + PAGES['es'], wait_until='load')
      npage.fill('#nom', 'Prueba QA')
      npage.fill('#correu', 'qa@example.com')
      npage.select_option('#servei', 'automatismes')
      npage.fill('#descripcio', 'Consulta de prueba automática, sin envío.')
      press_check(npage, '#consentiment')
      npage.set_input_files('#adjunt', payload(JPEG, MAX - 1, 'foto.jpg', 'image/jpeg'))
      status, headers, (lang, robots, message) = native_submit(npage)
      check('Sense JS es: 2.999.999 bytes, pàgina de resposta en castellà amb noindex', status == 200 and lang == 'es' and robots == 'noindex' and (message or '').startswith(NOT_SENT['es']) and headers.get('x-robots-tag') == 'noindex',
            {'estat': status, 'lang': lang, 'robots': robots, 'missatge': (message or '')[:70]})

      # 6. Vàlida 3: sense JavaScript, català, Industrial amb producte i dades tècniques.
      npage.goto(B + PAGES['ca'], wait_until='load')
      press_check(npage, 'input[name=tipus][value=empresa]')
      visible = npage.evaluate('() => ["empresa", "servei-empresa", "unitats", "servei"].map((id) => document.getElementById(id).checkVisibility())')
      npage.focus('.form-extra summary')
      npage.keyboard.press('Enter')
      npage.fill('#nom', 'Prova QA')
      npage.fill('#correu', 'qa@example.com')
      npage.fill('#empresa', 'Empresa de prova')
      npage.select_option('#servei-empresa', 'peces')
      npage.fill('#descripcio', 'Sèrie de prova automàtica, sense enviament.')
      npage.fill('#unitats', '100')
      press_check(npage, '#consentiment')
      status, headers, (lang, robots, message) = native_submit(npage)
      check('Sense JS ca: Industrial sense servei de Particulars', status == 200 and visible == [True, True, False, False] and (message or '').startswith(NOT_SENT['ca']),
            {'estat': status, 'visibles (empresa, producte, unitats tancat, servei)': visible, 'missatge': (message or '')[:60]})
      nctx.close()

      # 7. Vàlida 4: JavaScript, castellà; reenviament sense canvis = duplicat (no gasta el límit).
      page.goto(B + PAGES['es'], wait_until='load')
      fill(page, 'es')
      first = js_submit(page)
      second = js_submit(page)
      check('JS es: reenviament sense canvis, duplicat', first[0] == 200 and second[0] == 200 and second[2].get('duplicate') is True and first[2]['ref'] == second[2]['ref'],
            {'primer': first[2], 'segon': second[2]})

      # 8. Vàlida 5: tres peticions simultànies amb la mateixa referència (ocupen 3 llocs de la finestra).
      pace(3)
      shared = ref()
      outcomes = []

      def worker():
          outcomes.append(post(fields(ref=shared)))

      threads = [threading.Thread(target=worker) for _ in range(3)]
      for thread in threads:
          thread.start()
      for thread in threads:
          thread.join()
      summary = sorted((status, json.loads(body).get('state'), json.loads(body).get('duplicate')) for status, _, body in outcomes)
      fresh = [s for s in summary if s[0] == 200 and not s[2]]
      check('Simultànies amb la mateixa referència: una sola acceptació nova', len(fresh) == 1 and all(s[0] in (200, 409) for s in summary), {'respostes (estat, estat, duplicat)': summary})

      check('JS: cap error de JavaScript', not js_errors, {'errors': js_errors})
      ctx.close()
      browser.close()

# Passos 9–11: límits (sense navegador).
# 9. Sisena consulta vàlida de l'hora: 429 de la funció (límit horari, capa 2).
pace()
status, headers, body = post(fields(ref=ref()))
parsed = json.loads(body) if body.startswith('{') else None
# Amb RL_SECRET configurat per a revisio-client (15/10/2026), totes les instàncies comparteixen el
# comptador: una sisena consulta acceptada és una falla, no un avís. La prova detallada (instàncies
# observades i concurrència) és check-contact-form-remote-limits.py.
check('Sisena consulta vàlida de l\'hora: 429 de la funció', status == 429 and parsed and parsed.get('state') == 'rate-limited', {'estat': status, 'cos': body[:200]})

# 10. Petició de més de 6 MB (sense passar pel navegador): resposta de la plataforma.
pace()
status, headers, body = post(fields(), ('gran.jpg', JPEG + bytes(7_000_000), 'image/jpeg'), accept='text/html')
check('Petició de 7 MB: rebutjada (abans de la funció o per la funció)', status != 200, {'estat': status, 'tipus': headers.get('Content-Type', headers.get('content-type')), 'cos': body[:200]})

# 11. Regla de Netlify (capa 1): ràfega de 10 peticions després d'un minut sense peticions.
time.sleep(62)
burst = []
for _ in range(10):
    request = urllib.request.Request(f'{B}/api/contacte', headers={'accept': 'application/json', 'user-agent': 'serralleria-qa'})
    try:
        urllib.request.urlopen(request, timeout=30)
        burst.append((200, ''))
    except urllib.error.HTTPError as error:
        burst.append((error.code, error.read().decode('utf-8', 'replace')[:80]))
    time.sleep(1.5)
codes = [code for code, _ in burst]
first_429 = next((body for code, body in burst if code == 429), None)
check('Regla de Netlify: la ràfega acaba en 429', 429 in codes, {'codis': codes, 'cos del primer 429': first_429})
last_call[0] = time.time()

failed = [item for item in results if not item['ok']]
sys.stdout.buffer.write(f'\nresultats: {len(results) - len(failed)} ok, {len(failed)} falles\n'.encode('utf-8'))
sys.exit(1 if failed else 0)
