# Fase 5 · Mapa de redireccions

**Actualitzat:** 28/09/2026 · **Estat:** preparat, pendent de triar l'allotjament i de tres decisions del director.

## Decisió

L'allotjament final encara no està triat. Netlify s'ha plantejat per a la previsualització del client, però no està confirmat com a allotjament final. El mapa es manté com a dades independents del proveïdor a `src/config/redirects.mjs`. Quan es triï l'allotjament, un generador en traduirà les regles llestes al format del proveïdor. Fins aleshores no es publica cap fitxer de redireccions.

## Fonts

- Full «Redireccions» de `fases/fase-3/Mapa-redireccions-serralleriacarbo.xlsx`: inventari de la web antiga, 15 URL del sitemap Yoast i el rastreig del 22/09/2026.
- `fases/fase-3/SEO-F3.md`, «Punts concrets del mapa de redireccions antic». És posterior i preval quan les dues fonts es contradiuen.

Els destins s'indiquen per pàgina de contingut (`pageId` + idioma), no per URL. La ruta es llegeix del frontmatter de `content/{idioma}/`, de manera que el mapa no fixa slugs de traducció que encara s'han de validar ([FASE5-idiomes.md](FASE5-idiomes.md)).

## Regles

| URL antiga | Regla | Destí | Estat |
|---|---|---|---|
| `/projectes/` | 301 | `/particulars/projectes/` | Llesta (el destí encara és esborrany) |
| `/pressupost/` | 301 | `/contacte/` | Llesta (el destí encara és esborrany) |
| `/cat/estructuras/` | 301 | `/particulars/estructures/` | Llesta (el destí encara és esborrany) |
| `/cat/motores/` | 301 | `/particulars/automatismes/` | Llesta (el destí encara és esborrany) |
| `/estructuras/` | 301 | Versió ES d'Estructures (proposta: `/es/particulares/estructuras/`) | En espera: traducció i comprovació de campanyes |
| `/motores/` | 301 | Versió ES d'Automatismes (proposta: `/es/particulares/automatismos/`) | En espera: traducció i comprovació de campanyes |
| `/legal/` | 301 | `/legal/cookies/` | En espera: política de cookies aprovada i publicada |
| `/author/iraibal_gy8unz9r/` | 410 | — | Llesta |
| `/elementor-hf/header/`, `/elementor-hf/footer-landing/`, `/elementor-hf/594/`, `/elementor-hf/147/` | 410 | — | Llestes |
| `/sample-page/`, `/hello-world/`, `/category/uncategorized/` | 410 (proposta) | — | Per decidir |

`/` i `/contacte/` conserven la mateixa URL i no porten cap regla.

## Discrepàncies entre fonts

1. **`/estructuras/`.** El full de càlcul el deixava a revisar («/particulars/ o /industrial/»). SEO-F3 el dirigeix a la versió ES de `/particulars/estructures/`. S'aplica SEO-F3.
2. **`/legal/`.** El full de càlcul mantenia `/legal/`. SEO-F3 el dirigeix a `/legal/cookies/`, perquè `/legal/` no existeix al sitemap de Fase 1. S'aplica SEO-F3.
3. **Plantilles de WordPress** (`/sample-page/`, `/hello-world/`, `/category/uncategorized/`). El full de càlcul proposa un 301 a la Home. SEO-F3 demana no enviar les URL de plantilla automàticament a la Home. La proposta és un 410, com la resta de plantilles. **Cal la confirmació del director.**

## Decisions pendents del director

- Confirmar el 410 de les tres plantilles del punt 3.
- **`/estructuras/` i `/motores/` abans que existeixin les pàgines ES.** Si la web nova es publica abans que les traduccions, les dues landings antigues donarien 404. Hi ha tres opcions:
  - publicar abans aquestes dues versions ES;
  - fer una redirecció temporal (302) a les pàgines catalanes equivalents i passar al 301 definitiu quan existeixin les ES;
  - acceptar el 404 temporal.
  En qualsevol cas, primer cal comprovar amb el client si hi ha campanyes actives.

## Requisits quan es triï l'allotjament

**Actualització (02/10/2026):** el director ha triat Netlify. El build genera `dist/_redirects` amb `src/integrations/netlify-files.mjs`, només amb les regles llestes i amb la mateixa avaluació que `npm run check:redirects` (`scripts/lib/redirect-plan.mjs`). El validador comprova que el fitxer generat coincideix amb el mapa. Els 410 serveixen `/404.html` amb l'estat 410. La regla de `/legal/` porta el requisit de la política de cookies aprovada, perquè la pàgina ja es genera com a esborrany en revisió jurídica i, si no, sortiria com a llesta.

- Generar el fitxer del proveïdor a partir de `src/config/redirects.mjs`, només amb les regles llestes. No s'ha d'escriure cap regla a mà. **Fet.**
- Comprovar que el proveïdor admet el 410. Si no l'admet, triar una alternativa i documentar-la abans de publicar. **Pendent:** comprovar-ho en el primer desplegament de Netlify que inclogui el fitxer.
- Normalització de l'amfitrió: HTTPS, domini `www.serralleriacarbo.com` (el `site` d'Astro) i barra final (`trailingSlash: 'always'`), sense encadenar-la amb les regles del mapa.
- Després del desplegament, demanar cada URL antiga i comprovar l'estat, la capçalera `Location` i que no hi hagi cadenes. Revisar-ho també a Search Console.

## Validació

`npm run build && npm run check:redirects` comprova:

- que els orígens estiguin ben formats i no es repeteixin;
- que cap origen tapi una pàgina generada;
- que no hi hagi cadenes;
- que els destins catalans existeixin al contingut;
- que les regles 301 i 410 siguin coherents.

També mostra l'estat de cada regla: llesta, en espera o per decidir. Un destí en esborrany (`noindex`) s'indica però no bloqueja, perquè la publicació de cada pàgina la controlen el sitemap i `check:links`.
