"""Desa una variable d'entorn de Netlify llegint-ne el valor d'un fitxer local, sense mostrar-lo mai.

Per a les credencials del formulari (Fase 8, 8.5): el valor no passa pel xat, el correu ni el
repositori. El fitxer ha de ser fora del repositori (per exemple, la clau privada del certificat
generada a la carpeta de l'usuari) i s'ha d'esborrar quan la variable estigui comprovada.

  python -I scripts/netlify/set-env-from-file.py <CLAU> <fitxer> <context> [--secret]

  <context>  «production» o «branch:revisio-client» (mai «all»).
  --secret   Variable secreta: només de lectura per al codi que s'executa a Netlify. En el pla Free,
             Netlify l'accepta amb els abastos builds, functions i runtime (sense post-processing);
             l'abast exclusiu «Functions» és del pla Pro (comprovat el 15/10/2026).

Fa servir l'API de Netlify amb la CLI autenticada (NETLIFY_CLI o «netlify»). El valor viatja com a
argument del procés local de la CLI, no s'escriu enlloc i no apareix a la sortida. La CLI
«netlify env:set» va retornar èxit sense desar res en aquest projecte (15/10/2026); per això es fa
servir l'API. Cal un desplegament nou perquè les funcions llegeixin el valor.
"""
import json
import os
import subprocess
import sys

SITE = 'f9c27e63-fc41-45d2-8597-7b71491cc228'
NETLIFY = os.environ.get('NETLIFY_CLI', 'netlify')

if len(sys.argv) < 4 or sys.argv[3] not in ('production',) and not sys.argv[3].startswith('branch:'):
    sys.exit(__doc__)
key, path, context = sys.argv[1], sys.argv[2], sys.argv[3]
secret = '--secret' in sys.argv[4:]
with open(path, encoding='utf-8') as handle:
    value = handle.read().strip()
if not value:
    sys.exit('El fitxer és buit.')


def api(method, data):
    done = subprocess.run([NETLIFY, 'api', method, '--data', json.dumps(data)], capture_output=True, text=True, encoding='utf-8')
    text = (done.stdout + done.stderr).replace(value, '[REDACTAT]')
    return done.returncode, text


code, text = api('getSite', {'site_id': SITE})
if code != 0:
    sys.exit('No s\'ha pogut llegir el projecte de Netlify (CLI autenticada?).')
account = json.loads(text)['account_id']
target = {'value': value, 'context': 'branch', 'context_parameter': context.split(':', 1)[1]} if context.startswith('branch:') else {'value': value, 'context': context}
code, text = api('getEnvVars', {'account_id': account, 'site_id': SITE})
existing = {var['key']: var for var in json.loads(text)} if code == 0 else {}

if key in existing:
    if bool(existing[key].get('is_secret')) != secret:
        sys.exit(f'{key} ja existeix amb secret={existing[key].get("is_secret")}: no es canvia el tipus des d\'aquí.')
    code, text = api('setEnvVarValue', {'account_id': account, 'site_id': SITE, 'key': key, 'body': target})
    action = 'valor actualitzat'
else:
    body = {'key': key, 'values': [target]}
    if secret:
        body.update(is_secret=True, scopes=['builds', 'functions', 'runtime'])
    code, text = api('createEnvVars', {'account_id': account, 'site_id': SITE, 'body': [body]})
    action = 'variable creada'
if code != 0:
    sys.exit(f'{key}: error de Netlify ({text.strip()[-120:]})')

code, text = api('getEnvVars', {'account_id': account, 'site_id': SITE})
for var in json.loads(text):
    if var['key'] == key:
        contexts = [v.get('context') + (f":{v['context_parameter']}" if v.get('context_parameter') else '') for v in var.get('values', [])]
        print(f'{key}: {action} | secret={var.get("is_secret")} | abastos={var.get("scopes")} | contextos={contexts}')
del value
print('Recordeu: cal un desplegament nou perquè la funció llegeixi el valor, i esborrar el fitxer local si ja no cal.')
