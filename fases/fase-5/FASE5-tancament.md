# Fase 5 · Tancament del desenvolupament

**Data:** 01/10/2026 · **Branca:** `fase-5/base-astro` (pujada a GitHub, encara sense fusionar a `main`) · **Estat:** desenvolupament tancat; publicació pendent de dades i decisions de tercers.

La Fase 5 havia de lliurar una «web funcional» (CONTEXT, taula de fases). La construcció de les rutes previstes per a aquesta entrega està acabada en català: plantilles, sistema visual i de moviment, SEO tècnic, redireccions i revisió editorial. La resta del que falta per publicar no depèn del desenvolupament, sinó de dades o decisions del client i del director. Aquest document en fa el balanç i fixa els criteris per publicar. El registre viu continua a [FASE5-pendents.md](FASE5-pendents.md).

## Què s'ha construït

- **Base tècnica.**
  - Astro 7 i Tailwind 4.
  - Contingut de `content/ca/`, validat per esquema.
  - i18n preparat per a català, castellà i anglès: català sense prefix; castellà i anglès amb prefix.
  - Font local, tokens de la Fase 2 i rols visuals compartits (`src/styles/roles.css`).
- **Plantilles.**
  - Home, portada de Particulars, servei de Particulars (Estructures, Automatismes i Urgències), portafoli de Particulars, portada d'Industrial, Capacitats, Empresa, Contacte i 404.
  - Sense JavaScript i amb moviment reduït, tot el contingut es llegeix.
- **Moviment.** View Transitions entre pàgines i entre estats, entrades curtes d'un sol ús, parallax i vidre subtils, i la línia de càrrega dels enllaços.
- **SEO tècnic.**
  - `noindex` a tot el que no està aprovat.
  - `canonical`, `hreflang` només entre versions publicades, i `sitemap.xml` i `robots.txt` generats a partir del contingut aprovat.
  - Dades estructurades `LocalBusiness` amb dades confirmades, i favicon.
- **Migració.** Mapa de redireccions de la web antiga independent del proveïdor, amb validació pròpia ([FASE5-redireccions.md](FASE5-redireccions.md)).
- **Revisió editorial.**
  - El text visible coincideix amb `content/ca/` ([FASE5-revisio-editorial.md](FASE5-revisio-editorial.md)).
  - El build comprova que els titulars de les plantilles diguin el mateix que el contingut.
  - Les revisions validades queden registrades a la comprovació de referències.
- **Formulari.**
  - Compacte, amb validació accessible al navegador i preselecció per branca i servei.
  - **No envia:** amb dades correctes mostra un avís honest i ofereix el contacte directe, sense cap estat d'èxit.
- **Ubicació.** El mapa de Google Maps es carrega només a petició del visitant; abans no es connecta amb Google.

## Estat de cada ruta del sitemap

| Ruta | Estat | Què falta per aprovar-la |
|---|---|---|
| `/empresa/` | **Aprovada**, indexable | — |
| `/particulars/projectes/` | **Aprovada**, indexable | — (el cas Porta de pàrquing manté la seva nota de revisió, per decisió del director) |
| `/` | Esborrany | Fotografies conceptuals: doble accés, rajoles de carros, mobiliari i capacitats industrials |
| `/particulars/` | Esborrany | Fotografies conceptuals: entrada i targetes de serveis |
| `/particulars/estructures/` | Esborrany | Fotografies conceptuals: entrada i panell «Escales» |
| `/particulars/automatismes/` | Esborrany | Marques de motors (`reviewNeeded`) i fotografies conceptuals (entrada i «Altres accessos») |
| `/particulars/urgencies/` | Esborrany | Fotografia conceptual de l'entrada |
| `/industrial/` | Esborrany | Fotografies conceptuals: entrada, materials, maquinària, soldadura, sèries i sectors |
| `/industrial/capacitats/` | Esborrany | Fotografies conceptuals: entrada, plaques de materials, màquines i producció |
| `/contacte/` | Esborrany | Formulari operatiu: allotjament, privacitat aprovada i prova real d'enviament amb adjunt |
| `/legal/avis-legal/`, `/legal/privacitat/` | Bloquejades, sense pàgina | Textos del client o de l'assessor |
| `/legal/cookies/` | Pendent de revisió, sense pàgina | Text validat; ha d'incloure Google Maps i l'analítica que s'instal·li |
| `/particulars/mobiliari/` | **Ajornada** (01/10/2026) | Exemples i fotografies pròpies; mentrestant el menú porta al formulari |
| `/industrial/series-curtes/`, `/sectors/`, `/proces/`, `/projectes/` | **Ajornades** (27/09/2026) | Contingut propi confirmat; mentrestant porten a seccions de la portada d'Industrial |

Les rutes ajornades no es generen, no surten al sitemap i conserven el seu esborrany a `content/ca/`. No necessiten redirecció perquè mai s'han publicat.

## Pendents de tercers

| Pendent | Responsable | Desbloqueja |
|---|---|---|
| Fotografies pròpies que substitueixin les conceptuals ([FASE5-direccio-fotografica.md](FASE5-direccio-fotografica.md)) | Client | Home, Particulars, serveis, Industrial i Capacitats |
| Avís legal i política de privacitat | Client o assessor | Pàgines legals i formulari |
| Política de cookies validada, amb Google Maps i l'analítica | Client o assessor i director | `/legal/cookies/`, analítica i redirecció de `/legal/` |
| Triar l'allotjament | Director | Formulari, redireccions i publicació |
| Prova real d'enviament amb adjunt (si és Netlify: límit de 8 MB per petició) | Director, després del desenvolupament | `/contacte/` |
| Marques de motors | Client | Automatismes |
| Campanyes d'anuncis actives a `/estructuras/` i `/motores/` | Client | Redireccions de les landings antigues |
| Decisions de redireccions: 410 de tres plantilles de WordPress; què fem amb `/estructuras/` i `/motores/` abans del castellà | Director | Fitxer de redireccions del proveïdor |
| Slugs de castellà i anglès ([FASE5-idiomes.md](FASE5-idiomes.md)) i traduccions validades | Director i traductor | Versions ES/EN |
| Contrastar dades i horari amb la fitxa de Google Business Profile | Client o director | Dades estructurades i Search Console |
| Validació visual dels redissenys de la Fase 5 que encara consten com a «Obert (validació del director)» a [FASE5-pendents.md](FASE5-pendents.md) | Director | Tancament definitiu del Bloc 5 |

## Criteris per publicar

Una pàgina es pot publicar quan compleix tots aquests requisits, els mateixos que aplica el build:

1. `status: approved`, sense `reviewNeeded` ni `noindex`.
2. Totes les fotografies són originals autoritzades; cap imatge conceptual no es presenta com a feina pròpia.
3. Text visible igual al de `content/ca/`, amb la comprovació de referències en verd.
4. Enllaços interns que resolen, i canonical, títol i descripció propis.

La web es pot publicar quan, a més a més:

- l'allotjament està triat, amb HTTPS i el domini `www.serralleriacarbo.com`;
- el fitxer de redireccions s'ha generat a partir del mapa i s'ha comprovat després del desplegament;
- les pàgines legals estan publicades;
- el formulari envia de debò, o bé no s'ofereix com a funcional;
- el sitemap s'envia a Search Console.

**Comprovacions que han de sortir sense errors** (totes surten en verd en aquest tancament):

- `npm run verify`: tipus, build i referències;
- `npm run check:links`: 11 pàgines, 239 enllaços interns i el sitemap amb 2 URL;
- `npm run check:redirects`.

## Següents fases

- **Fase 6 · SEO tècnic i analítica.**
  - Auditoria SEO de cada ruta.
  - Analítica (Google Analytics, Tag Manager i Clarity ja existeixen a la web antiga) amb un banner de consentiment i càrrega només després d'acceptar; s'activa quan la política de cookies estigui aprovada.
  - Search Console quan la web estigui publicada.
- **Fase 7 · QA i optimització.** Es pot avançar en paral·lel:
  - rendiment;
  - pes i formats de les imatges;
  - accessibilitat;
  - proves en dispositius reals amb les fotografies definitives.
- **Integració a `main`.** Obrir una pull request de `fase-5/base-astro` cap a `main` quan el director ho decideixi.
