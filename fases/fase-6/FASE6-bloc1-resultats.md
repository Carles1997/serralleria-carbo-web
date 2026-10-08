# Fase 6 · Bloc 1 · Resultats

**Data:** 08/10/2026 · **Aprovació:** director, 08/10/2026 (bloc 1 tècnic i redesplegament de l'àlies `revisio-client`).

**Abast:**
- tècnic;
- sense canvis de contingut públic, ni d'estats d'indexació, ni de DNS, ni d'analítica;
- sense propostes editorials.

**Referència:** [FASE6-pla-executable.md](FASE6-pla-executable.md), apartat 8.

---

## 1. Protecció d'indexació per adreça

### Decisió

El tipus de build no és suficient. Netlify serveix el mateix desplegament de producció a diverses adreces: el domini, el subdomini principal `serralleriacarbo.netlify.app` i l'enllaç permanent de cada desplegament. A més, `_headers` aplica les capçaleres per camí, no per adreça. Per això la solució combina dues peces:

1. **Una condició de build que no depèn només del context.** El build només és «definitiu» si compleix les dues condicions:
   - és de producció a Netlify (`CONTEXT=production`);
   - l'adreça principal del lloc que Netlify passa al build (`URL`) és el domini de `src/config/site-url.mjs`.

   `URL` només és el domini quan aquest és el domini principal del lloc. Abans del llançament és `https://serralleriacarbo.netlify.app`, i el build continua protegit. Qualsevol altre build porta `X-Robots-Tag: noindex` a totes les respostes.
2. **Regles de domini per a les adreces que comparteixen el desplegament definitiu.** Al build definitiu, `_redirects` comença amb un 301 forçat cap a `https://www.serralleriacarbo.com/:splat` per a:
   - `https://serralleriacarbo.netlify.app/*`;
   - `http://serralleriacarbo.com/*`;
   - `https://serralleriacarbo.com/*`.

   És el format de «domain-level redirects» de la [documentació de Netlify](https://docs.netlify.com/routing/redirects/redirect-options/). Les regles només afecten aquests hosts exactes: no toquen `revisio-client--…` ni les previsualitzacions.

`robots.txt` no canvia (`Allow: /`): Google ha de poder rastrejar per llegir el `noindex`.

### Comportament esperat

| Adreça | Abans del llançament | Després del llançament |
|---|---|---|
| Domini principal `https://www.serralleriacarbo.com` | Web WordPress (DNS actual) | Sense capçalera global. Cada pàgina segueix el seu `status` (`noindex` a les no aprovades) |
| Variant sense `www` (`serralleriacarbo.com`) | Web WordPress (301 a `www`) | 301 a `https://www.` (regla de domini; Netlify també redirigeix els àlies de domini) |
| Subdomini principal `serralleriacarbo.netlify.app` | `X-Robots-Tag: noindex` | 301 al domini |
| Previsualització `revisio-client--serralleriacarbo.netlify.app` | `X-Robots-Tag: noindex` (build local, sense `CONTEXT`) | Igual |
| Altres proves: previsualitzacions de PR i branques | `X-Robots-Tag: noindex` (`CONTEXT` ≠ `production`) | Igual |
| Enllaç permanent d'un desplegament (`<id>--…`) | Netlify hi afegeix `X-Robots-Tag: noindex` pel seu compte | Igual (a comprovar el dia del llançament) |

### Implementació

| Fitxer | Canvi |
|---|---|
| `src/config/site-url.mjs` (nou) | Adreça del domini definitiu, compartida per `astro.config.mjs` i els scripts |
| `astro.config.mjs` | `site` llegeix `siteUrl` (mateix valor) |
| `scripts/lib/indexing-policy.mjs` (nou) | `indexingMode`, `noindexHeaders` i `domainRedirects` |
| `src/integrations/netlify-files.mjs` | Aplica la política: afegeix el bloc `noindex` a `dist/_headers` o les regles de domini a `dist/_redirects`, i ho anota al registre del build |
| `scripts/lib/redirect-plan.mjs` | `netlifyRedirects` accepta les regles de domini i les posa abans de les de camí |
| `scripts/check-redirects.mjs` | Valida `_redirects` amb el mateix entorn del build |

### Comprovacions

**Builds locals simulats:**

| Cas | Entorn | Resultat |
|---|---|---|
| Local | sense `CONTEXT` | `noindex` a `_headers`; cap regla de domini |
| Producció abans del llançament | `CONTEXT=production`, `URL=https://serralleriacarbo.netlify.app` | `noindex`; cap regla de domini |
| Producció definitiva | `CONTEXT=production`, `URL=https://www.serralleriacarbo.com`, `SITE_NAME=serralleriacarbo` | Sense `noindex`; 3 regles de domini al principi de `_redirects`; `check:redirects` correcte amb el mateix entorn |
| Previsualització | `CONTEXT=deploy-preview` | `noindex` |
| Definitiu sense `SITE_NAME` | — | El build falla amb un missatge explícit |

**Capçaleres reals després del desplegament** (`revisio-client`, desplegament `6ac7c5f61c87bfb3d522a1ec`, sense `--prod`):
- `https://revisio-client--serralleriacarbo.netlify.app/`, `/particulars/projectes/`, `/legal/privacitat/` i una ruta inexistent (404): totes amb `X-Robots-Tag: noindex`.
- L'enllaç permanent `https://6ac7c5f61c87bfb3d522a1ec--serralleriacarbo.netlify.app/` dona el mateix resultat.
- **Rich Results Test de Google** sobre `revisio-client`:
  - `/particulars/projectes/` (pàgina aprovada): «No: s'ha detectat "noindex" a l'encapçalament HTTP X-Robots-Tag». Rastreig permès i obtenció correcta.
  - `/` (esborrany): detecta el `noindex` de l'etiqueta meta.
- **Enllaç permanent de la producció actual** (`6ac510eb8f805300081189a1`, del 06/10/2026, generat abans d'aquest canvi): Netlify ja hi envia `X-Robots-Tag: noindex` pel seu compte.

### Pendent per la limitació de crèdits

- **`serralleriacarbo.netlify.app` continua sense `X-Robots-Tag`.** Hi ha publicat el desplegament de producció del 06/10/2026 (`50528333`). Els desplegaments de producció de `main` se salten per falta de crèdits (D5), i Projectes i les tres pàgines legals hi continuen indexables, amb canonical cap a `www`.
- **Quan hi hagi crèdits:**
  - el primer desplegament de producció de `main` (amb aquest bloc fusionat) ha de mostrar `X-Robots-Tag: noindex` a `serralleriacarbo.netlify.app`;
  - es comprova amb `npm run check:redirects:live -- https://serralleriacarbo.netlify.app`.
- **El dia del llançament, sense simulacions possibles abans:**
  - nou desplegament de producció després de fixar el domini principal;
  - `check:redirects:live` contra `https://www.serralleriacarbo.com` (sense `noindex` per capçalera);
  - `curl -I` de `https://serralleriacarbo.netlify.app/`, `http://serralleriacarbo.com/` i `https://serralleriacarbo.com/`: un sol 301 cap a `https://www.…`;
  - enllaç permanent del desplegament nou amb `noindex`.

**Regla d'operació:** la producció es construeix a Netlify des de `main`. Un `netlify deploy --prod` des d'un build local publicaria el web amb `noindex`.

---

## 2. Search Console: què hem de demanar

La línia base ha trobat Site Kit by Google, una etiqueta de Google (`GT-T9H3C3ZW`) i un contenidor de Tag Manager (`GTM-TXQ24TCC`) a totes les pàgines de WordPress.

**Això és un indici, no una confirmació.** No demostra:
- que hi hagi una propietat de Search Console verificada;
- quin compte la controla;
- que hi hagi dades disponibles.

Aquestes etiquetes **no** es copien al web nou: qualsevol mesura depèn de la tasca 8.7.

**Preguntes per al client:**
1. Qui va instal·lar i configurar Site Kit a la web WordPress (el client, una agència o mayasystems.net), i amb quin compte de Google.
2. Si aquest compte té una propietat de Search Console per a `serralleriacarbo.com` o `https://www.serralleriacarbo.com/`, i de quin tipus (domini o prefix d'URL).
3. Si té una propietat de Google Analytics 4 associada a `GT-T9H3C3ZW` i un contenidor de Tag Manager `GTM-TXQ24TCC`, i qui en són els administradors.

**Accessos que demanem:**
- **Search Console:** usuari amb permís complet o restringit per al director. Cal per exportar, abans del canvi de DNS:
  - consultes i pàgines del període disponible (com a màxim, uns 16 mesos; no està garantit que n'hi hagi tants);
  - l'informe de pàgines;
  - els enllaços externs.
- **GA4 (opcional):** només lectura, per a la línia base històrica. No implica activar cap analítica al web nou.
- **Si no hi ha cap propietat:**
  - crear una propietat de domini (D4) amb un registre TXT a mayasystems.net;
  - el client ha d'autoritzar el canvi de DNS; nosaltres no el fem.

**No cal demanar:** contrasenyes, ni accés d'administració a WordPress per a aquesta part.

---

## 3. Redireccions

**Comprovador en viu:** `npm run check:redirects:live -- <adreça>` ([script](../../scripts/check-live-redirects.mjs), detall a [FASE5-redireccions](../fase-5/FASE5-redireccions.md#comprovació-en-viu-08102026)). Distingeix 301 i 410, compta els salts i comprova la destinació exacta, amb barra final i sense.

**Resultat a `revisio-client` (08/10/2026):**

| Comprovació | Resultat |
|---|---|
| 8 regles 301 × 2 variants | Correctes: 301 directe, `Location` exacta, destí 200, un salt |
| 5 regles 410 × 2 variants | Correctes: 410 directe, sense `Location` |
| `/` i `/contacte/` | 200 sense redirecció |
| Indexació | `noindex` a les quatre adreces provades |

**Abans del desplegament,** el mateix comprovador va detectar la falta de `noindex` a l'àlies (4 errors). Això demostra que el comprovador detecta l'error.

**Informació, sense validar:**
- `/estructuras/` i `/motores/` (en espera de la versió ES) donen 404;
- les tres plantilles de WordPress (per decidir) donen 404.

**URL descobertes:** `/feed/`, `/comments/feed/`, `/cat/` i `/es/` queden registrades a `undecided` de `src/config/redirects.mjs`, sense regla ni destí. Avui responen 404 al web nou. Contingut revisat a la [línia base](linia-base-wordpress-2026-10-08/README.md#observacions). La decisió és del director.

---

## 4. Validacions

### Dades estructurades

| Ruta | Eina | Resultat observat |
|---|---|---|
| `/` | Rich Results Test (smartphone) | `LocalBusiness` («Empresas locales»): 1 element vàlid. «Organización»: 1 element vàlid. 1 problema no crític: falta `priceRange` (opcional). |
| `/particulars/projectes/` | Rich Results Test | `BreadcrumbList`: 1 element vàlid |
| Les 9 rutes comercials | `fetch_page.py` de claude-seo (Googlebot) | JSON-LD analitzable a totes les que en porten: `LocalBusiness` a la Home i Contacte, `BreadcrumbList` a les 5 interiors. Particulars i Industrial no en porten. |

- **Decisió:** no s'afegeix `priceRange`. És opcional i no hi ha cap dada de preus validada.
- **Límits de l'eina:**
  - el Rich Results Test marca «La URL no està disponible per a Google» perquè les pàgines són `noindex`, de manera esperada;
  - analitza les dades igualment;
  - no s'ha provat a mà cada ruta al Rich Results Test, perquè Contacte i les interiors fan servir els mateixos components.
- **Pendent al domini:**
  - repetir el test a la Home, Contacte i una interior, amb les pàgines aprovades;
  - comprovar que l'adreça i el telèfon coincideixin amb el GBP (C3, C5).

### Rendiment

**PageSpeed Insights no s'ha pogut fer servir:**
- l'API sense clau ha retornat «Quota exceeded»;
- la versió web no arrenca l'anàlisi al navegador integrat.

**Alternativa:** mesura de laboratori amb Chromium (Playwright de claude-seo) contra la previsualització real. Perfil mòbil de FASE7-qa:
- 390 × 844, densitat 2×;
- CPU 4 vegades més lenta;
- 1,6 Mbps i 150 ms;
- sense memòria cau.

Mediana de 3 passades:

| Ruta | LCP mòbil | LCP escriptori | CLS | Pes mòbil |
|---|---|---|---|---|
| `/` | **6,47 s** | 1,66 s | 0 | 223 KB |
| `/particulars/` | 3,10 s | 0,72 s | 0 | 288 KB |
| `/particulars/estructures/` | 2,71 s | 0,68 s | 0 | 278 KB |
| `/particulars/projectes/` | 2,60 s | 0,92 s | 0–0,008 | 318 KB |
| `/industrial/` | **4,23 s** | 0,77 s | 0–0,002 | 223 KB |
| `/industrial/capacitats/` | 2,81 s | 0,66 s | 0 | 264 KB |
| `/contacte/` | 3,36 s | 1,04 s | 0 | 89 KB |

**Observat:**
- **Escriptori:** compleix (LCP < 2,5 s, CLS < 0,1).
- **Mòbil limitat:** la Home i Industrial superen clarament els 2,5 s. La resta queda just per sobre o a prop.
- **Diagnòstic d'una passada:**
  - **Home:** la font, el CSS i les imatges d'accés han baixat cap a 1,6 s, però el primer pintat no arriba fins als 3,1 s. L'LCP acaba sent la imatge d'accés de Particulars, pintada a 4,2 s amb la imatge descarregada a 1,6 s.
  - **Industrial:** primer pintat a 3,1 s, amb la imatge principal descarregada a 1,1 s.
  - El retard és posterior a la descàrrega: apunta a treball del fil principal i a les animacions d'entrada que retarden el pintat.
  - **Hipòtesi per confirmar**, no comprovada en aquest bloc.

**Límits:**
- és una mesura de laboratori sintètica, no Lighthouse ni dades de camp;
- la variabilitat entre passades és alta (la Home ha donat de 4,2 a 6,5 s);
- FASE7-qa va mesurar 2,1 s a la Home amb un servidor local i un mètode diferent, i abans dels canvis d'entrada de la Home del 06/10/2026. Les xifres no són directament comparables.

**Pendent:**
- PageSpeed Insights amb la clau d'API (D7), o des d'un navegador normal;
- dades de camp (CrUX) quan hi hagi trànsit;
- **proposta per decidir:** un bloc tècnic per investigar el retard de pintat al mòbil (Home i Industrial) sense canviar el disseny aprovat.

### Auditoria tècnica

| Comprovació | Resultat |
|---|---|
| Metadades de les 13 pàgines generades (títol, descripció, H1, canonical, `robots`, `hreflang`) | Sense canvis respecte al pla executable, apartat 3 |
| Sitemap (`sitemap_discovery.py`) | Detectat i vàlid (`urlset`). 4 URL indexables, com s'esperava |
| Resposta per a Googlebot (`fetch_page.py`) | 200, HTML complet sense JavaScript, HSTS, capçaleres de seguretat i `X-Robots-Tag: noindex` |
| Precàrrega (`preload_check.py`, Home) | 75/100. La imatge LCP té `fetchpriority=high`. Recomana Speculation Rules: opcional, no s'aplica en aquest bloc |
| `npm run verify`, `check:links`, `check:redirects` | Correctes. 13 pàgines, 355 enllaços interns, referències intactes |

**Límit:** el runtime complet de claude-seo no està configurat (`/seo setup`), i no s'ha executat perquè instal·laria i modificaria l'entorn. S'han fet servir scripts individuals amb el seu entorn Python.

**Pendent al domini:**
- repetir l'auditoria (B5) amb les pàgines aprovades;
- Search Console: informe de pàgines i inspecció d'URL.

---

## 5. Línia base

[`linia-base-wordpress-2026-10-08/`](linia-base-wordpress-2026-10-08/README.md) conté l'inventari de 45 URL de la web WordPress, amb la cadena de respostes, les dades SEO i les evidències (robots, sitemaps, feeds i l'HTML de les pàgines 200). L'script `capture.py` el pot tornar a generar per comparar-lo després de la migració.

---

## 6. Pendents

| Pendent | Qui | Quan |
|---|---|---|
| Recuperar els crèdits de Netlify i publicar `main` amb aquest bloc. Comprovar el `noindex` de `serralleriacarbo.netlify.app` | Client o director, i Claude | Com més aviat millor |
| Respostes i accessos de Search Console (apartat 2). **08/10/2026:** encara sense accés; la verificació del domini queda pendent | Client | Abans del canvi de DNS |
| Decisions de les quatre URL descobertes i de la C2 | Director | Abans de publicar |
| PageSpeed Insights amb clau o des d'un navegador normal | Director o Claude amb la clau (D7) | Abans de publicar |
| Investigar el retard de pintat al mòbil (proposta de bloc tècnic) | Director (aprovació) | Abans de publicar |
| Comprovacions del dia del llançament (apartat 1) | Claude | Llançament |
