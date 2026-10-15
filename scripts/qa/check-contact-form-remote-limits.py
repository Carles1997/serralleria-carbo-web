"""Proves pendents del formulari a Netlify en mode dry-run (Fase 8, 8.5; 15/10/2026).

Complementa check-contact-form-remote.py, que ja va comprovar la resta el 09/10/2026. No envia cap
correu (FORM_MODE=dry-run) i no mostra mai el valor de RL_SECRET: els registres de la funció només en
diuen l'origen («estable», «instancia» o «cap») i l'identificador aleatori de la instància.

Parts:
  frequencia  Límit horari (capa 2) amb RL_SECRET: un sol comptador per IP i hora UTC; cinc consultes
              vàlides acceptades i la sisena, 429; i, amb el comptador a 3, cinc peticions simultànies
              sense superar mai cinc acceptacions. Respecta la regla de Netlify (capa 1, 5 per minut):
              com a molt una petició cada 21 s i 65 s de silenci abans de la ràfega simultània. Falla si
              s'accepten més de cinc consultes o si la capa 1 emmascara el resultat.
  lenta       Pujada d'un adjunt vàlid amb la xarxa limitada (CDP de Chromium) i, després, la mateixa
              pujada interrompuda: missatge final i dades conservades.
  plantar     Registres sintètics caducats i vigents per provar la neteja programada.
  neteja      Comprova el magatzem després d'executar neteja-temporals («Run now» al panell de Netlify).
  netejar     Esborra només les claus creades per aquestes proves (llista desada a l'estat).

Ús:
  python -I scripts/qa/check-contact-form-remote-limits.py <URL> <part> <fitxer d'estat> [id del desplegament]
Requereix la CLI de Netlify autenticada (NETLIFY_CLI) i Playwright per a «lenta».
"""
import datetime
import json
import os
import re
import secrets
import subprocess
import sys
import threading
import time
import urllib.error
import urllib.request

B = sys.argv[1].rstrip('/')
PART = sys.argv[2]
STATE_FILE = sys.argv[3]
DEPLOY_ID = sys.argv[4] if len(sys.argv) > 4 else None
SITE = 'f9c27e63-fc41-45d2-8597-7b71491cc228'
STORE = 'formulari-contacte'
SCOPE = 'dry-run/branch-deploy'
NETLIFY = os.environ.get('NETLIFY_CLI', 'netlify')
ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ'
JPEG = bytes([0xFF, 0xD8, 0xFF, 0xE0])
results = []
last_call = [0.0]

try:
    with open(STATE_FILE, encoding='utf-8') as handle:
        state = json.load(handle)
except FileNotFoundError:
    state = {'claus': [], 'refs': []}


def save_state():
    with open(STATE_FILE, 'w', encoding='utf-8') as handle:
        json.dump(state, handle, ensure_ascii=False, indent=1)


def out(text):
    sys.stdout.buffer.write((text + chr(10)).encode('utf-8'))
    sys.stdout.flush()


def check(name, ok, detail):
    results.append({'cas': name, 'ok': bool(ok)})
    out(f"{'ok   ' if ok else 'FALLA'} {name}  {json.dumps(detail, ensure_ascii=False)[:1400]}")


def cli(*args):
    env = dict(os.environ, NETLIFY_SITE_ID=SITE, MSYS_NO_PATHCONV='1')
    done = subprocess.run([NETLIFY, *args], capture_output=True, text=True, encoding='utf-8', env=env)
    return done.returncode, done.stdout


def keys(prefix):
    code, text = cli('blobs:list', STORE, '--prefix', prefix, '--json')
    if code != 0:
        raise SystemExit(f'blobs:list ha fallat ({code})')
    data = json.loads(text) if text.strip() else []
    items = data.get('blobs', data) if isinstance(data, dict) else data
    return sorted(item['key'] if isinstance(item, dict) else item for item in items)


def blob(key):
    code, text = cli('blobs:get', STORE, key)
    return json.loads(text) if code == 0 and text.strip() else None


def short(key):
    """Clau amb l'empremta escurçada: és un HMAC de la IP (pseudònim), no cal mostrar-la sencera."""
    parts = key.split('/')
    return '/'.join(parts[:-1] + [parts[-1][:8] + '…']) if key.startswith('rl/') else key


def remember(*new_keys):
    for key in new_keys:
        if key not in state['claus']:
            state['claus'].append(key)
    save_state()


def pace(seconds=21):
    wait = last_call[0] + seconds - time.time()
    if wait > 0:
        time.sleep(wait)
    last_call[0] = time.time()


def ref():
    value = ''.join(secrets.choice(ALPHABET) for _ in range(10))
    state['refs'].append(value)
    remember(f'sub/{SCOPE}/{value}')
    return value


def multipart(fields, file=None):
    boundary = 'qa' + secrets.token_hex(12)
    parts = [f'--{boundary}\r\nContent-Disposition: form-data; name="{k}"\r\n\r\n{v}\r\n'.encode('utf-8') for k, v in fields.items()]
    if file:
        name, content, mime = file
        parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="adjunt"; filename="{name}"\r\nContent-Type: {mime}\r\n\r\n'.encode('utf-8') + content + b'\r\n')
    parts.append(f'--{boundary}--\r\n'.encode('utf-8'))
    return b''.join(parts), f'multipart/form-data; boundary={boundary}'


def post(reference):
    fields = {'tipus': 'particular', 'nom': 'Prova QA', 'correu': 'qa@example.com', 'servei': 'estructures',
              'descripcio': 'Consulta de prova automàtica, sense enviament.', 'consentiment': 'on', 'idioma': 'ca',
              'origen': '/contacte/', 'ref': reference}
    body, ctype = multipart(fields)
    request = urllib.request.Request(f'{B}/api/contacte?idioma=ca', data=body, method='POST',
                                     headers={'content-type': ctype, 'accept': 'application/json', 'user-agent': 'serralleria-qa'})
    started = time.time()
    try:
        with urllib.request.urlopen(request, timeout=60) as response:
            status, headers, text = response.status, dict(response.headers), response.read().decode('utf-8', 'replace')
    except urllib.error.HTTPError as error:
        status, headers, text = error.code, dict(error.headers), error.read().decode('utf-8', 'replace')
    except (ConnectionError, urllib.error.URLError) as error:
        status, headers, text = 0, {}, f'connexió tallada: {error}'
    parsed = json.loads(text) if text.startswith('{') else None
    # Classificació: «acceptada» (200 dry-run), «limitada» (429 JSON de la funció), «capa1» (429 sense
    # cos de la regla de Netlify o connexió tallada) o «altre».
    if status == 200 and parsed and parsed.get('state') == 'dry-run' and not parsed.get('duplicate'):
        kind = 'acceptada'
    elif status == 429 and parsed and parsed.get('state') == 'rate-limited':
        kind = 'limitada'
    elif status in (0, 429):
        kind = 'capa1'
    else:
        kind = 'altre'
    return {'ref': reference, 'estat': status, 'tipus': kind, 'segons': round(time.time() - started, 2),
            'peticio': {k.lower(): v for k, v in headers.items()}.get('x-nf-request-id', '')[:12]}


def hour_key(now=None):
    return datetime.datetime.fromtimestamp(now or time.time(), datetime.timezone.utc).strftime('%Y%m%d%H')


def function_logs(since_iso, refs, timeout=150):
    """Entrades «contacte» dels registres de la funció per a aquestes referències: instància i secret."""
    found = {}
    deadline = time.time() + timeout
    while time.time() < deadline:
        args = ['logs', '--source', 'functions', '--function', 'contacte', '--since', since_iso, '--json']
        if DEPLOY_ID:
            args += ['--deploy-id', DEPLOY_ID]
        code, text = cli(*args)
        for line in text.splitlines():
            for match in re.finditer(r'\{\\?"event\\?":\\?"contacte\\?".*?\}', line):
                raw = match.group(0).replace('\\"', '"')
                try:
                    entry = json.loads(raw)
                except json.JSONDecodeError:
                    continue
                if entry.get('ref') in refs:
                    found[entry['ref']] = {k: entry.get(k) for k in ('result', 'instance', 'secret')}
        if all(r in found for r in refs):
            break
        time.sleep(15)
    return found


def wait_inside_hour(minutes_needed):
    now = datetime.datetime.now(datetime.timezone.utc)
    if now.minute + minutes_needed >= 60:
        start = (now + datetime.timedelta(hours=1)).replace(minute=1, second=0, microsecond=0)
        out(f'Espera fins a {start:%H:%M} UTC perquè la prova no travessi el canvi d\'hora.')
        time.sleep((start - now).total_seconds())


if PART == 'frequencia':
    wait_inside_hour(12)
    hour = hour_key()
    since = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
    before = keys(f'rl/{hour}/{SCOPE}/')
    if before:
        check('Precondició: cap comptador previ en aquesta hora', False, {'claus': [short(k) for k in before]})
        raise SystemExit(1)
    time.sleep(65)  # finestra de la capa 1 buida

    # A1. Seqüencials: cinc acceptades i la sisena, 429 de la funció.
    seq = []
    for _ in range(6):
        pace()
        seq.append(post(ref()))
    counters = keys(f'rl/{hour}/{SCOPE}/')
    remember(*counters)
    values = [blob(k) for k in counters]
    kinds = [item['tipus'] for item in seq]
    check('A1. Mateixa IP i hora: les cinc primeres acceptades i la sisena, 429 de la funció',
          kinds == ['acceptada'] * 5 + ['limitada'], {'respostes': seq})
    check('A1. Un sol comptador al magatzem, amb el valor 5', len(counters) == 1 and values[0] == {'count': 5},
          {'claus': [short(k) for k in counters], 'valors': values})
    check('A1. Mai més de cinc acceptacions', kinds.count('acceptada') <= 5, {'acceptades': kinds.count('acceptada')})

    # A2. Concurrència: el comptador torna a zero (només la clau d'aquesta prova), tres seqüencials i,
    # després d'un minut sense peticions, cinc de simultànies: n'han d'entrar exactament dues.
    for key in counters:
        cli('blobs:delete', STORE, key, '--force')
    pre = []
    for _ in range(3):
        pace()
        pre.append(post(ref()))
    time.sleep(65)
    refs_now = [ref() for _ in range(5)]
    burst = [None] * 5
    gate = threading.Barrier(5)

    def worker(index):
        gate.wait()
        burst[index] = post(refs_now[index])

    threads = [threading.Thread(target=worker, args=(i,)) for i in range(5)]
    for thread in threads:
        thread.start()
    for thread in threads:
        thread.join()
    last_call[0] = time.time()
    counters2 = keys(f'rl/{hour}/{SCOPE}/')
    remember(*counters2)
    values2 = [blob(k) for k in counters2]
    accepted = [item['tipus'] for item in pre + burst].count('acceptada')
    masked = [item for item in burst if item['tipus'] == 'capa1']
    check('A2. Prèvia: tres seqüencials acceptades', [item['tipus'] for item in pre] == ['acceptada'] * 3, {'respostes': pre})
    check('A2. Cinc simultànies amb el comptador a 3: mai més de cinc acceptacions en total', accepted <= 5,
          {'acceptades': accepted, 'simultànies': burst})
    check('A2. Les simultànies arriben a la funció (la capa 1 no emmascara el resultat)', not masked, {'emmascarades': masked})
    check('A2. Exactament dues de les simultànies acceptades i tres limitades per la funció',
          sorted(item['tipus'] for item in burst) == ['acceptada', 'acceptada', 'limitada', 'limitada', 'limitada'], {'tipus': [item['tipus'] for item in burst]})
    check('A2. Un sol comptador, amb el valor 5', len(counters2) == 1 and values2[0] == {'count': 5},
          {'claus': [short(k) for k in counters2], 'valors': values2})

    # Instàncies: només les que consten als registres de la funció per a aquestes referències.
    all_refs = [item['ref'] for item in seq + pre + burst]
    logs = function_logs(since, all_refs)
    instances = {}
    for reference, entry in logs.items():
        instances.setdefault(entry['instance'], []).append(entry['result'])
    secrets_seen = sorted({entry['secret'] for entry in logs.values()})
    check('Registres: totes les peticions fan servir el secret estable', secrets_seen == ['estable'],
          {'origen del secret': secrets_seen, 'peticions amb registre': len(logs), 'peticions': len(all_refs)})
    check('Registres: instàncies observades (més d\'una demostra el comptador compartit)', len(instances) >= 1,
          {'instàncies': {k: {'peticions': len(v), 'resultats': sorted(set(v))} for k, v in instances.items()},
           'sense registre trobat': [r for r in all_refs if r not in logs]})
    out(f"Instàncies observades: {len(instances)}. Amb {'més d' + chr(39) + 'una instància' if len(instances) > 1 else 'una sola instància'} i un sol comptador.")
    state['hora_frequencia'] = hour
    save_state()

elif PART == 'lenta':
    from playwright.sync_api import sync_playwright

    SIZE = 1_000_000
    NETWORK = {'offline': False, 'latency': 300, 'downloadThroughput': 1_600_000 / 8, 'uploadThroughput': 512_000 / 8}
    hour = hour_key()
    # La part «frequencia» deixa el comptador d'aquesta connexió a 5: s'esborra (només la clau de la
    # prova) perquè el límit horari no tapi el resultat de la pujada.
    for key in keys(f'rl/{hour}/{SCOPE}/'):
        if key in state['claus']:
            cli('blobs:delete', STORE, key, '--force')
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        page = browser.new_page(viewport={'width': 1280, 'height': 900})
        page.goto(B + '/contacte/', wait_until='load')
        cdp = page.context.new_cdp_session(page)
        cdp.send('Network.enable')

        def fill(note):
            page.fill('#nom', 'Prova QA')
            page.fill('#correu', 'qa@example.com')
            page.select_option('#servei', 'estructures')
            page.fill('#descripcio', f'Consulta de prova automàtica amb la xarxa lenta, sense enviament. {note}')
            page.check('#consentiment')
            page.set_input_files('#adjunt', {'name': 'plànol.jpg', 'mimeType': 'image/jpeg', 'buffer': JPEG + bytes(SIZE - len(JPEG))})

        # B1. Pujada completa amb la xarxa limitada.
        fill('B1')
        cdp.send('Network.emulateNetworkConditions', NETWORK)
        pace()
        with page.expect_response(lambda r: '/api/contacte' in r.url, timeout=180000) as info:
            page.click('[data-submit]')
        response = info.value
        page.wait_for_function('() => { const s = document.getElementById("form-status"); return s && !s.hidden && s.dataset.state !== "sending"; }', timeout=60000)
        status_box = page.evaluate('() => { const s = document.getElementById("form-status"); return [s.dataset.state, s.textContent.trim()]; }')
        body = response.json()
        # Temps real de la petició segons el navegador (Resource Timing): de l'inici de la petició a
        # l'últim byte de la resposta. No inclou l'espera entre proves ni l'emplenament del formulari.
        seconds = page.evaluate('() => { const e = performance.getEntriesByType("resource").filter((x) => x.name.includes("/api/contacte")).pop(); return e ? [e.duration, e.requestStart - e.startTime, e.responseStart - e.requestStart, e.responseEnd - e.responseStart] : null; }')
        if body.get('ref'):
            state['refs'].append(body['ref'])
            remember(f"sub/{SCOPE}/{body['ref']}")
        minimum = SIZE * 8 / 512_000
        check('B1. Adjunt de 1.000.000 bytes amb 512 kbit/s de pujada: acceptat en dry-run i missatge final',
              response.status == 200 and body.get('state') == 'dry-run' and status_box[1].startswith("La consulta no s'ha enviat")
              and seconds and seconds[0] / 1000 >= minimum,
              {'xarxa': 'pujada 512 kbit/s, baixada 1,6 Mbit/s, latència 300 ms (CDP)', 'estat': response.status,
               'temps real de la petició (s)': round(seconds[0] / 1000, 1) if seconds else None,
               'mínim teòric de la pujada (s)': round(minimum, 1),
               'fases (s): connexió, enviament fins a la resposta, descàrrega': [round(x / 1000, 2) for x in seconds[1:]] if seconds else None,
               'missatge': status_box})

        # B2. La mateixa pujada, interrompuda. Amb CDP, posar la xarxa fora de línia no talla una petició
        # que ja s'està enviant (la del 15/10/2026 va arribar sencera): el tall s'injecta al navegador amb
        # Playwright, que reté la petició 8 s (la meitat de la pujada de B1) i la talla amb «connectionreset».
        # No arriba a Netlify: prova la resposta del formulari a un tall, no la xarxa.
        page.goto(B + '/contacte/', wait_until='load')
        fill('B2')

        def cut(route):
            time.sleep(8)
            route.abort('connectionreset')

        page.route('**/api/contacte**', cut)
        page.click('[data-submit]')
        page.wait_for_function('() => { const s = document.getElementById("form-status"); return s && !s.hidden && s.dataset.state !== "sending"; }', timeout=90000)
        after = page.evaluate('''() => ({ estat: document.getElementById("form-status").dataset.state,
          missatge: document.getElementById("form-status").textContent.trim(),
          nom: document.getElementById("nom").value, correu: document.getElementById("correu").value,
          servei: document.getElementById("servei").value, descripcio: document.getElementById("descripcio").value,
          fitxer: [...document.getElementById("adjunt").files].map((f) => [f.name, f.size]),
          consentiment: document.getElementById("consentiment").checked,
          boto: document.querySelector("[data-submit]").disabled })''')
        page.unroute('**/api/contacte**')
        check('B2. Connexió tallada durant la pujada: missatge d\'error i dades conservades',
              after['estat'] == 'error' and after['missatge'].startswith('No hem pogut enviar la consulta') and after['nom'] == 'Prova QA' and after['correu'] == 'qa@example.com' and after['servei'] == 'estructures'
              and after['descripcio'].endswith('B2') and after['fitxer'] == [['plànol.jpg', SIZE]] and after['consentiment'] and not after['boto'],
              after)
        browser.close()
    counters = keys(f'rl/{hour}/{SCOPE}/')
    remember(*counters)
    out(f'Comptadors d\'aquesta hora després de «lenta»: {[short(k) for k in counters]} {[blob(k) for k in counters]}')

elif PART == 'plantar':
    now = time.time()
    hour, old_hour = hour_key(now), hour_key(now - 2 * 3600)
    records = {
        f'rl/{old_hour}/{SCOPE}/sintetic-caducat': {'count': 1},
        f'rl/{hour}/{SCOPE}/sintetic-vigent': {'count': 1},
        f'sub/{SCOPE}/SINTCADUCAT': {'state': 'dry-run', 'mode': 'dry-run', 'at': int((now - 2 * 3600) * 1000)},
        f'sub/{SCOPE}/SINTVIGENT': {'state': 'dry-run', 'mode': 'dry-run', 'at': int((now - 300) * 1000)},
    }
    for key, value in records.items():
        code, _ = cli('blobs:set', STORE, key, json.dumps(value), '--force')
        remember(key)
        out(f"{'plantat' if code == 0 else 'ERROR'} {key}")
    state['sintetics'] = {'caducats': [k for k in records if 'CADUC' in k.upper()], 'vigents': [k for k in records if 'VIGENT' in k.upper()],
                          'plantats_a': datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')}
    save_state()

elif PART == 'neteja':
    present = set(keys('rl/')) | set(keys('sub/'))
    expired, current = state['sintetics']['caducats'], state['sintetics']['vigents']
    check('C. Neteja programada: elimina els caducats', not any(k in present for k in expired), {'caducats encara presents': [k for k in expired if k in present]})
    check('C. Neteja programada: conserva els vigents', all(k in present for k in current), {'vigents absents': [k for k in current if k not in present]})

elif PART == 'netejar':
    present = set(keys('rl/')) | set(keys('sub/'))
    removed = []
    for key in state['claus']:
        if key in present:
            cli('blobs:delete', STORE, key, '--force')
            removed.append(short(key))
    left = sorted(set(keys('rl/')) | set(keys('sub/')))
    out(f'Esborrades {len(removed)} claus d\'aquestes proves. Claus que queden al magatzem: {[short(k) for k in left]}')
    check('Neteja final: no queda cap clau creada per aquestes proves', not any(k in left for k in state['claus']), {'restants': [short(k) for k in left]})

failed = [item for item in results if not item['ok']]
out(f'\nresultats: {len(results) - len(failed)} ok, {len(failed)} falles')
sys.exit(1 if failed else 0)
