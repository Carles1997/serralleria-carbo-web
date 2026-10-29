# Línia base de la web WordPress · 08/10/2026

**Captura:** 08/10/2026, 16:20 UTC, des de `https://www.serralleriacarbo.com`, només amb peticions de lectura. Feta abans de cap canvi de DNS, per comparar-la després de la migració.

**Com es va fer:** [`capture.py`](capture.py) (Python 3, sense dependències):

```bash
python -I capture.py
```

Escriu els resultats en aquest directori. Per comparar després de la migració, s'executa sobre una còpia del directori i es comparen els dos `inventari.json`.

## Fitxers

| Fitxer | Contingut |
|---|---|
| `inventari.json` | Per a cada URL: cadena de respostes (estat, `Location`, `X-Robots-Tag`) i, si respon 200, títol, descripció, `robots`, canonical, `hreflang`, H1, H2, tipus JSON-LD, nombre de paraules i indicis d'etiquetes de mesura |
| `inventari.csv` | Resum d'una línia per URL |
| `fitxers/` | `robots.txt`, els sis sitemaps de Yoast, els dos feeds i l'HTML de les pàgines que responen 200 |

## URL revisades (45)

- **Sitemap de Yoast:** les 15 URL de `sitemap_index.xml`, les mateixes del rastreig del 02/10/2026.
- **Variants:**
  - les mateixes 14 rutes amb el prefix `/cat/`;
  - quatre rutes amb el prefix `/es/`;
  - tres rutes sense barra final.
- **Adreces addicionals:** `/feed/`, `/comments/feed/`, `/cat/`, `/es/`, `/en/` i `/empresa/`.
- **Host:** `http://www.`, el domini sense `www` per `https` i el domini sense `www` per `http`.

## Observacions

1. **Totes les pàgines de servei responen 200, amb `robots: index, follow` (Yoast).** Cap té meta descripció. L'idioma declarat és `es`, tot i que el contingut és en català. Les landings en castellà declaren `es-ES`.

2. **Les plantilles d'Elementor (`/elementor-hf/…`) ara fan un 301 a la Home.** Al rastreig del 02/10/2026 responien 200. El mapa nou hi manté el 410.

3. **Les variants `/cat/…` i `/es/…` fan un 301 a la URL sense prefix.** Hi ha dues excepcions: `/cat/estructuras/` i `/cat/motores/` responen 200 en català. Totes dues ja tenen regla. Les variants `/cat/elementor-hf/…` encadenen dos salts.

4. **Adreces sense tractament decidit (no s'han de redirigir a la Home per defecte):**
   - `/feed/` és un RSS amb una sola entrada, «Hello world!»;
   - `/comments/feed/` és un feed buit;
   - `/cat/` i `/es/` fan un 301 a `/`. `/es/` és el prefix previst de la futura versió en castellà.

   Estan registrades a `undecided` de `src/config/redirects.mjs`.

5. **`/empresa/` i `/en/` responen 404 a WordPress.** La regla `/empresa/` del mapa nou serveix per a les adreces del web nou, no per a cap URL antiga.

6. **Host:** el domini sense `www` fa un 301 a `https://www.`. Per `http` hi ha dos salts: `http` → `https` → `www`.

7. **Indicis de mesura:** totes les pàgines porten:
   - el generador `Site Kit by Google 1.189.0`;
   - una etiqueta de Google `GT-T9H3C3ZW`;
   - un contenidor de Tag Manager `GTM-TXQ24TCC`.

   **Són un indici, no una confirmació.** No demostren quin compte en té l'accés, que Search Console estigui verificat ni que hi hagi dades disponibles. No s'han de copiar al web nou: qualsevol mesura nova depèn de la tasca 8.7 (consentiment).

## Límits

- Sense Search Console no es coneixen les URL amb clics o enllaços externs fora d'aquest inventari: les imatges de `/wp-content/uploads/`, la pàgina que surt com a «Disculpeu les molèsties» a la cerca de marca, i possibles URL antigues fora del sitemap.
- No inclou el contingut de les imatges ni dels fitxers CSS i JS.
