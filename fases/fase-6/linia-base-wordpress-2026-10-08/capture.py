"""Línia base de la web WordPress actual abans de la migració (Fase 6, bloc 1).

Només fa peticions GET de lectura a https://www.serralleriacarbo.com i desa al mateix directori:
- inventari.json: per a cada URL, la cadena de respostes (estat, Location) i, si respon 200,
  les dades SEO de la pàgina (títol, descripció, robots, canonical, encapçalaments, JSON-LD,
  etiquetes de mesura detectades);
- inventari.csv: resum d'una línia per URL;
- fitxers/: robots.txt, els sitemaps, els feeds i l'HTML de les pàgines que responen 200.

Ús: python -I capture.py  (Python 3, sense dependències). Es pot tornar a executar després de la
migració sobre una còpia d'aquest directori per comparar els resultats.
"""
import csv
import datetime
import html
import json
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path
from urllib.parse import urljoin, urlparse

BASE = 'https://www.serralleriacarbo.com'
OUT = Path(__file__).resolve().parent
FILES = OUT / 'fitxers'
UA = 'Mozilla/5.0 (compatible; SerralleriaCarbo-baseline/1.0)'

# Rutes publicades a sitemap_index.xml (Yoast) el 08/10/2026, més variants i adreces conegudes.
SITEMAP_PATHS = [
    '/', '/sample-page/', '/legal/', '/projectes/', '/estructuras/', '/motores/', '/pressupost/', '/contacte/',
    '/elementor-hf/header/', '/elementor-hf/footer-landing/', '/elementor-hf/594/', '/elementor-hf/147/',
    '/category/uncategorized/', '/author/iraibal_gy8unz9r/', '/hello-world/',
]
EXTRA_PATHS = [
    '/feed/', '/comments/feed/', '/cat/', '/es/', '/en/', '/empresa/',
    '/projectes', '/estructuras', '/motores',
]
HOSTS = ['http://www.serralleriacarbo.com/', 'https://serralleriacarbo.com/', 'http://serralleriacarbo.com/']
RAW = ['/robots.txt', '/sitemap_index.xml', '/page-sitemap.xml', '/post-sitemap.xml', '/elementor-hf-sitemap.xml',
       '/category-sitemap.xml', '/author-sitemap.xml', '/feed/', '/comments/feed/']


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None


OPENER = urllib.request.build_opener(NoRedirect)


def fetch(url):
    request = urllib.request.Request(url, headers={'User-Agent': UA})
    try:
        response = OPENER.open(request, timeout=30)
        return response.status, dict(response.headers), response.read()
    except urllib.error.HTTPError as error:
        return error.code, dict(error.headers), error.read()
    except Exception as error:  # xarxa, TLS…
        return None, {}, str(error).encode()


def chain(url, limit=6):
    hops = []
    current = url
    for _ in range(limit):
        status, headers, body = fetch(current)
        location = headers.get('Location') or headers.get('location')
        hops.append({'url': current, 'status': status, 'location': location,
                     'x_robots_tag': headers.get('X-Robots-Tag'), 'content_type': headers.get('Content-Type')})
        if status in (301, 302, 307, 308) and location:
            current = urljoin(current, location)
            continue
        return hops, status, headers, body
    return hops, None, {}, b''


def attr(text, tag, key, value, wanted):
    """Valor d'un atribut d'una etiqueta (Yoast fa servir cometes simples, altres plantilles dobles)."""
    for element in re.findall(rf'<{tag}\b[^>]*>', text, re.I):
        if re.search(rf'\b{key}=["\']{re.escape(value)}["\']', element, re.I):
            found = re.search(rf'\b{wanted}=(["\'])(.*?)\1', element, re.S | re.I)
            if found:
                return html.unescape(found.group(2)).strip()
    return None


def page_data(text):
    find = lambda pattern: [html.unescape(x).strip() for x in re.findall(pattern, text, re.S | re.I)]
    clean = lambda x: re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', x)).strip()
    types = []
    for block in find(r'<script[^>]+application/ld\+json[^>]*>(.*?)</script>'):
        try:
            data = json.loads(block)
            items = data.get('@graph', [data]) if isinstance(data, dict) else data
            types += [str(item.get('@type')) for item in items if isinstance(item, dict)]
        except ValueError:
            types.append('JSON-LD no vàlid')
    body = re.sub(r'<script.*?</script>|<style.*?</style>', ' ', text, flags=re.S | re.I)
    return {
        'lang': (find(r'<html[^>]*\blang="([^"]+)"') or [None])[0],
        'title': (find(r'<title[^>]*>(.*?)</title>') or [None])[0],
        'description': attr(text, 'meta', 'name', 'description', 'content'),
        'robots': attr(text, 'meta', 'name', 'robots', 'content'),
        'canonical': attr(text, 'link', 'rel', 'canonical', 'href'),
        'hreflang': find(r'<link rel=["\']alternate["\'] hreflang=["\']([^"\']+)'),
        'og_title': attr(text, 'meta', 'property', 'og:title', 'content'),
        'h1': [clean(x) for x in find(r'<h1[^>]*>(.*?)</h1>')],
        'h2': [clean(x) for x in find(r'<h2[^>]*>(.*?)</h2>')],
        'jsonld_types': types,
        'word_count': len(clean(body).split()),
        # Indicis de mesura de la web antiga. Són evidències, no s'han de copiar al web nou.
        'measurement_signals': sorted(set(
            find(r'<meta name="generator" content="(Site Kit[^"]*)"')
            + re.findall(r'\b(GTM-[A-Z0-9]+|GT-[A-Z0-9]+|G-[A-Z0-9]{6,}|UA-\d+-\d+)\b', text)
            + [f'google-site-verification' for _ in re.findall(r'google-site-verification', text)][:1]
        )),
    }


def slug(path):
    return re.sub(r'[^a-z0-9]+', '-', path.strip('/').lower()) or 'inici'


def main():
    FILES.mkdir(exist_ok=True)
    captured = datetime.datetime.now(datetime.timezone.utc).isoformat(timespec='seconds')
    rows = []
    targets = [(BASE + p, p) for p in SITEMAP_PATHS + EXTRA_PATHS]
    targets += [(BASE + '/cat' + p, '/cat' + p) for p in SITEMAP_PATHS if p != '/']
    targets += [(BASE + '/es' + p, '/es' + p) for p in ['/projectes/', '/estructuras/', '/motores/', '/contacte/']]
    targets += [(h, h) for h in HOSTS]
    for url, label in targets:
        hops, status, headers, body = chain(url)
        row = {'label': label, 'url': url, 'in_sitemap': label in SITEMAP_PATHS, 'hops': hops,
               'final_url': hops[-1]['url'], 'final_status': status, 'redirects': len(hops) - 1}
        if status == 200 and 'html' in (headers.get('Content-Type') or ''):
            text = body.decode('utf-8', 'replace')
            row['page'] = page_data(text)
            name = slug(urlparse(hops[-1]['url']).path)
            (FILES / f'pagina-{name}.html').write_bytes(body)
        rows.append(row)
        print(f"{label:38} {' > '.join(str(h['status']) for h in hops):14} {hops[-1]['url']}", file=sys.stderr)

    for path in RAW:
        status, headers, body = fetch(BASE + path)
        if status == 200:
            (FILES / (slug(path) + ('.xml' if 'feed' in path or path.endswith('.xml') else '.txt'))).write_bytes(body)

    (OUT / 'inventari.json').write_text(json.dumps({'captured_utc': captured, 'base': BASE, 'urls': rows},
                                                   ensure_ascii=False, indent=2), encoding='utf-8')
    with open(OUT / 'inventari.csv', 'w', newline='', encoding='utf-8') as handle:
        writer = csv.writer(handle)
        writer.writerow(['url', 'al_sitemap', 'cadena', 'url_final', 'estat_final', 'titol', 'canonical', 'robots', 'h1', 'paraules'])
        for row in rows:
            page = row.get('page', {})
            writer.writerow([row['label'], 'sí' if row['in_sitemap'] else 'no',
                             ' > '.join(str(h['status']) for h in row['hops']), row['final_url'], row['final_status'],
                             page.get('title') or '', page.get('canonical') or '', page.get('robots') or '',
                             ' | '.join(page.get('h1') or []), page.get('word_count') or ''])
    print(f'Desat: {len(rows)} URL, {captured}', file=sys.stderr)


if __name__ == '__main__':
    main()
