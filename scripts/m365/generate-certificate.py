"""Genera el certificat del formulari web per a Microsoft Graph (Fase 8, 8.5).

La clau privada es crea FORA del repositori i no se'n mostra mai el contingut. Només s'imprimeixen
dades públiques: el fitxer que s'ha d'adjuntar a l'administrador, el subjecte, les dates i l'empremta
SHA-1 que mostrarà Microsoft Entra.

  python -I scripts/m365/generate-certificate.py [carpeta] [dies]

  carpeta  Per defecte ~/m365-formulari. Ha de ser fora de qualsevol repositori Git.
  dies     Validesa. Per defecte 365 (renovació 30 dies abans; vegeu FASE8-formulari-real-pla.md §6.5).

Resultat (amb la data del dia):
  formulari-web-AAAAMMDD.cer.pem  Part pública (certificat X.509). És el fitxer que s'envia a
                                  l'administrador perquè el carregui a l'aplicació d'Entra.
  formulari-web-AAAAMMDD.key.pem  Clau privada RSA de 2048 bits en PKCS#8 («BEGIN PRIVATE KEY»).
                                  No s'envia a ningú. Es desa a Netlify com a variable secreta amb
                                  scripts/netlify/set-env-from-file.py i després s'esborra.

Necessita OpenSSL (inclòs a Git per a Windows; es pot indicar amb la variable OPENSSL).
"""
import datetime
import os
import shutil
import subprocess
import sys
from pathlib import Path

SUBJECT = '/CN=Formulari web Serralleria Carbo'
folder = Path(os.path.expanduser(sys.argv[1] if len(sys.argv) > 1 else '~/m365-formulari')).resolve()
days = int(sys.argv[2]) if len(sys.argv) > 2 else 365
if not 30 <= days <= 730:
    sys.exit('La validesa ha de ser entre 30 i 730 dies.')

# Mai dins d'un repositori: es busca una carpeta .git a la carpeta de destinació o a qualsevol pare.
for parent in [folder, *folder.parents]:
    if (parent / '.git').exists():
        sys.exit(f'{folder} és dins d\'un repositori Git ({parent}). Trieu una carpeta de fora.')

openssl = os.environ.get('OPENSSL') or shutil.which('openssl') or next(
    (p for p in (r'C:\Program Files\Git\usr\bin\openssl.exe', r'C:\Program Files\Git\mingw64\bin\openssl.exe') if Path(p).exists()), None)
if not openssl:
    sys.exit('No es troba OpenSSL. Indiqueu-ne el camí amb la variable OPENSSL.')

stamp = datetime.date.today().strftime('%Y%m%d')
key = folder / f'formulari-web-{stamp}.key.pem'
cer = folder / f'formulari-web-{stamp}.cer.pem'
if key.exists() or cer.exists():
    sys.exit(f'Ja existeixen fitxers del {stamp} a {folder}: no se sobreescriuen.')
folder.mkdir(parents=True, exist_ok=True)


def run(*args):
    # Sense mostrar la sortida d'OpenSSL quan treballa amb la clau privada.
    done = subprocess.run([openssl, *args], capture_output=True, text=True, env=dict(os.environ, MSYS_NO_PATHCONV='1'))
    if done.returncode != 0:
        sys.exit(f'OpenSSL ha fallat ({args[0]}): {done.stderr.strip()[-200:]}')
    return done.stdout


run('req', '-x509', '-newkey', 'rsa:2048', '-sha256', '-days', str(days), '-nodes',
    '-keyout', str(key), '-out', str(cer), '-subj', SUBJECT)

# Permisos: només l'usuari actual pot llegir la clau privada. Si no es poden aplicar, l'script s'atura i
# no dona el certificat per bo (la clau queda creada; s'ha d'esborrar o protegir a mà).
if os.name == 'nt':
    user = os.environ.get('USERNAME', '')
    done = subprocess.run(['icacls', str(key), '/inheritance:r', '/grant:r', f'{user}:F'], capture_output=True, text=True) if user else None
    if not done or done.returncode != 0:
        sys.exit(f'No s\'han pogut restringir els permisos de {key}. Esborreu-la o protegiu-la abans de continuar.')
else:
    key.chmod(0o600)

# Comprovacions sense mostrar la clau: format PKCS#8 i parella amb el certificat.
with key.open(encoding='ascii') as handle:
    pkcs8 = handle.readline().strip() == '-----BEGIN PRIVATE KEY-----'
matches = run('pkey', '-in', str(key), '-pubout') == run('x509', '-in', str(cer), '-noout', '-pubkey')

subject = run('x509', '-in', str(cer), '-noout', '-subject').strip()
thumbprint = run('x509', '-in', str(cer), '-noout', '-fingerprint', '-sha1').split('=', 1)[1].strip().replace(':', '').upper()
end = run('x509', '-in', str(cer), '-noout', '-enddate').split('=', 1)[1].strip()
end_date = datetime.datetime.strptime(end, '%b %d %H:%M:%S %Y %Z')

print('Certificat generat. No es mostra cap contingut de la clau privada.')
print(f'  Part pública (adjunteu-la a l\'administrador): {cer}')
print(f'  Clau privada (no l\'envieu; només a Netlify):   {key}')
print(f'  {subject}')
print(f'  Vàlid fins al {end_date:%d/%m/%Y %H:%M} UTC ({days} dies)')
print(f'  Renovació: a partir del {end_date - datetime.timedelta(days=30):%d/%m/%Y}')
print(f'  Empremta SHA-1 (M365_CERT_THUMBPRINT; ha de coincidir amb la d\'Entra): {thumbprint}')
print(f'  Clau en PKCS#8: {"sí" if pkcs8 else "NO"} | La clau i el certificat són parella: {"sí" if matches else "NO"}')
if not (pkcs8 and matches):
    sys.exit('Comprovació fallida: no feu servir aquests fitxers.')
