# Fase 5 · Procediment per indexar una pàgina aprovada

**Data:** 27/09/2026  
**Abast:** com passa una ruta del sitemap de Fase 1 d'esborrany a pàgina indexable, en cada idioma. No canvia el sitemap, els continguts validats ni els criteris SEO de [SEO-F3](../fase-3/SEO-F3.md).

## Principi

Per defecte, cap pàgina és indexable. La web pot construir i mostrar una ruta en esborrany, però aquesta porta `noindex` fins que el seu contingut s'aprova explícitament. La decisió viu al frontmatter del fitxer de `content/{idioma}/`. El codi no la dedueix de cap altra font.

| `status` | Significat | Resultat al `<head>` |
|---|---|---|
| `draft` | Text de treball o base validada provisionalment | `noindex`; canonical per revisar-lo |
| `draft-review` | Esborrany amb una revisió externa pendent (p. ex. cookies) | `noindex` |
| `blocked-client` | Falta el text o la dada del client o de l'assessor | `noindex`; no s'ha de publicar |
| `approved` | Contingut validat per publicar en aquest idioma | Indexable, llevat que porti `noindex: true` |

Una pàgina és **indexable** només si compleix les quatre condicions ([`isIndexable`](../../src/i18n/pages.ts)):
- `status: approved`;
- sense `noindex: true`;
- sense `publishReady: false`;
- amb `route`.

«Aprovat» vol dir publicable. La 404, per exemple, es pot aprovar i continuar sent `noindex`.

L'esquema de [`src/content.config.ts`](../../src/content.config.ts) rebutja el build si una pàgina `approved` encara té `publishReady: false` o elements a `reviewNeeded`.

## Requisits abans d'aprovar una ruta

1. **Validació humana.** El client o el director de projecte validen el text final d'aquell idioma. Una traducció ES/EN s'aprova per separat; no hereta l'aprovació del català.
2. **Pendents resolts.** Cada element de `reviewNeeded` té una resposta amb font: marca de motors, horaris, especificació de càrrega… Si la resposta obliga a canviar el text, primer es fa una revisió editorial validada; vegeu «Línia base de referències».
3. **Cap recurs conceptual presentat com a real.** Les fotografies conceptuals s'han substituït per originals autoritzades, o bé no es mostren com a obra de l'empresa.
4. **Plantilla acceptada.** La plantilla de la ruta ha passat la QA de CLAUDE.md:
   - amplades de 1440, 768, 390 i 320 px;
   - teclat, tacte, focus i moviment reduït;
   - enllaços reals.
5. **SEO de la ruta.** Hi ha una sola H1, amb el `seoTitle` i el `seoDescription` propis de SEO-F3. Els enllaços interns són rastrejables i la ruta coincideix exactament amb el sitemap de Fase 1, amb barra final.
6. **Casos especials.**
   - Legals: només amb el text del client o de l'assessor.
   - `/contacte/`: formulari amb backend real, validació al servidor, prova d'enviament i text de privacitat aprovat.
   - `/legal/cookies/`: només amb l'inventari real de cookies i el mecanisme de consentiment implementat.

## Com s'aprova

1. Al frontmatter de la ruta i l'idioma, canvia només els camps de la porta de publicació:
   - `status: approved`;
   - elimina els elements resolts de `reviewNeeded`;
   - treu `publishReady: false` o `noindex: true` quan ja no apliquin.

   No es toca el cos del text.
2. Executa `npm run verify`. `check:references` llistarà aquests canvis com a «Canvis permesos», i qualsevol altra diferència farà fallar la comprovació.
3. Revisa l'HTML construït de la ruta a `dist/`:
   - sense `<meta name="robots" content="noindex">`;
   - `canonical` absolut al domini de producció;
   - `hreflang` només cap a versions també indexables, amb `x-default` al català quan hi hagi més d'un idioma.
4. Fes un commit específic d'aprovació, que indiqui qui ha validat, quan i per quin mitjà. Per exemple: `Aprovar /particulars/estructures/ (CA) · validació client 02/10/2026 per correu`.

## Què és automàtic i què queda pendent

- **Ja implementat.** El layout decideix `robots`, `canonical` i `hreflang` a partir d'aquestes dades:
  - una pàgina no indexable no declara `hreflang`;
  - una traducció en esborrany o `noindex` no apareix com a alternativa;
  - la 404 i les legals bloquejades no declaren canonical.
- **Pendent abans de publicar.**
  - `sitemap.xml` i `robots.txt` s'han de generar amb la mateixa funció `isIndexable`, sense cap llista manual.
  - Redireccions 301 del mapa de Fase 3.
  - Enviament del sitemap a Search Console i comprovació de cobertura. L'enviament no equival a indexació confirmada.

## Línia base de referències

`npm run check:references` ([script](../../scripts/check-references.mjs)) compara amb el commit `5e0ffc9`, el tancament de la Fase 4, i no pas amb `HEAD`:
- `fases/fase-1` a `fase-4` (inclosos els mockups) i `design/` han de ser idèntics, sense fitxers nous ni eliminats.
- `content/` pot rebre fitxers nous, com les traduccions. Els fitxers validats només poden canviar els camps de la porta de publicació: `status`, `publishReady`, `noindex` i `reviewNeeded`.

Si el director de projecte valida una revisió editorial o visual nova, s'actualitza la constant `BASELINE` de l'script en el mateix commit que registra la validació. No s'ha d'actualitzar per fer passar la comprovació.
