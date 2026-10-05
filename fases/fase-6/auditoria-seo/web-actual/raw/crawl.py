"""Rastreig de només lectura del staging de Netlify per a l'auditoria SEO (Fase 6).

S'executa amb el Python de la skill claude-seo (requests + bs4). Desa crawl.json al mateix directori.
"""
import json
import re
import sys
import time
from collections import deque
from pathlib import Path
from urllib.parse import urljoin, urlparse, urldefrag

import requests
from bs4 import BeautifulSoup

BASE = sys.argv[1] if len(sys.argv) > 1 else "https://serralleriacarbo.netlify.app/"
OUT = Path(__file__).with_name(sys.argv[2] if len(sys.argv) > 2 else "crawl.json")
HOST = urlparse(BASE).netloc
UA = "Mozilla/5.0 (compatible; SerralleriaCarboAudit/1.0)"
MAX = 300

session = requests.Session()
session.headers["User-Agent"] = UA


def norm(url):
    url, _ = urldefrag(url)
    p = urlparse(url)
    if p.netloc != HOST or p.scheme not in ("http", "https"):
        return None
    if re.search(r"\.(jpg|jpeg|png|webp|avif|svg|gif|pdf|css|js|xml|txt|ico|woff2?|mp4)$", p.path, re.I):
        return None
    return f"{p.scheme}://{p.netloc}{p.path}" + (f"?{p.query}" if p.query else "")


def text_words(soup):
    for t in soup(["script", "style", "noscript", "svg"]):
        t.decompose()
    main = soup.find("main") or soup.body or soup
    return len(re.findall(r"\w+", main.get_text(" ", strip=True)))


pages = {}
queue = deque([BASE])
seen = {BASE}
while queue and len(pages) < MAX:
    url = queue.popleft()
    try:
        r = session.get(url, timeout=30, allow_redirects=False)
    except requests.RequestException as e:
        pages[url] = {"status": None, "error": str(e)}
        continue
    rec = {"status": r.status_code, "x_robots": r.headers.get("x-robots-tag")}
    if r.status_code in (301, 302, 307, 308):
        loc = urljoin(url, r.headers.get("location", ""))
        rec["redirect"] = loc
        n = norm(loc)
        if n and n not in seen:
            seen.add(n)
            queue.append(n)
        pages[url] = rec
        continue
    if "text/html" not in r.headers.get("content-type", ""):
        pages[url] = rec
        continue
    html = r.text
    soup = BeautifulSoup(html, "lxml")
    head = soup.head or soup
    meta = lambda name: (head.find("meta", attrs={"name": name}) or {}).get("content")
    canon = head.find("link", rel="canonical")
    rec.update({
        "bytes": len(r.content),
        "lang": (soup.html or {}).get("lang"),
        "title": soup.title.get_text(strip=True) if soup.title else None,
        "description": meta("description"),
        "robots": meta("robots"),
        "canonical": canon.get("href") if canon else None,
        "hreflang": [(l.get("hreflang"), l.get("href")) for l in head.find_all("link", rel="alternate") if l.get("hreflang")],
        "og": {m.get("property"): m.get("content") for m in head.find_all("meta") if (m.get("property") or "").startswith("og:")},
        "h1": [h.get_text(" ", strip=True) for h in soup.find_all("h1")],
        "h2": [h.get_text(" ", strip=True) for h in soup.find_all("h2")],
        "jsonld_types": [],
        "images": [],
        "internal_links": [],
        "external_links": [],
    })
    for s in soup.find_all("script", type="application/ld+json"):
        try:
            data = json.loads(s.string or "")
            items = data.get("@graph", [data]) if isinstance(data, dict) else data
            for it in items:
                rec["jsonld_types"].append(it.get("@type"))
        except Exception as e:  # noqa: BLE001
            rec["jsonld_types"].append(f"INVALID: {e}")
    for img in soup.find_all("img"):
        rec["images"].append({
            "src": img.get("src"), "alt": img.get("alt"), "width": img.get("width"),
            "height": img.get("height"), "loading": img.get("loading"),
        })
    for a in soup.find_all("a", href=True):
        href = urljoin(url, a["href"])
        n = norm(href)
        if n:
            rec["internal_links"].append(n)
            if n not in seen:
                seen.add(n)
                queue.append(n)
        elif urlparse(href).scheme in ("http", "https"):
            rec["external_links"].append(href)
    rec["word_count"] = text_words(soup)
    pages[url] = rec
    time.sleep(0.3)

OUT.write_text(json.dumps(pages, ensure_ascii=False, indent=1), encoding="utf-8")
print(f"{len(pages)} URL rastrejades -> {OUT}")
