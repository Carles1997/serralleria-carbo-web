# Fase 6 · Bloc 3 · SEO editorial d'Industrial i Capacitats

**Data:** 08/10/2026 · **Estat:** decisions del director del 08/10/2026 implementades i revisades.

**Revisió de Codex (08/10/2026):** favorable. Ha revisat el diff del bloc i ha executat `verify`, `check:links` i `check:redirects`, amb resultat correcte. No ha repetit les proves visuals: l'encaix, el focus i la mida tàctil d'E5 són els de l'apartat 5, fets abans de la revisió.
- No s'activa la indexació: tots els estats de `content/ca/` continuen igual.
- No canvien els H1 ni la resta de textos aprovats.

**Fonts:**
- [SEO-F3](../fase-3/SEO-F3.md): intenció principal i variants per ruta;
- [pla executable, apartat 3](FASE6-pla-executable.md#3-proposta-seo-per-ruta);
- [dades del Perfil d'Empresa](FASE6-dades-google-business-profile.md);
- textos de `content/ca/` i HTML generat;
- decisions del director del 06/10/2026: Industrial resumeix l'oferta i Capacitats concentra les dades tècniques; l'oferta d'Industrial no es limita a sèries curtes.

**Límits:** no hi ha dades de Search Console ([bloc 2, apartat 6](FASE6-bloc2-rendiment.md#6-search-console-i-dades-reals)). Les intencions són hipòtesis de SEO-F3, sense volums de cerca.

**Criteri:** cada canvi busca que el títol i la descripció representin **de manera fidel i diferenciada** el que respon cada pàgina. No es presenta cap similitud de text com a prova de canibalització, ni es garanteix que els títols nous canviïn quina pàgina mostra Google per a una consulta. Això només es podrà observar amb Search Console.

---

## 1. Decisions

| # | Ruta | Element | Decisió del director (08/10/2026) |
|---|---|---|---|
| E1 | `/industrial/` | `seoDescription` | **Aprovat** |
| E2 | `/industrial/` | `seoTitle` | **Aprovat** |
| E3 | `/industrial/capacitats/` | `seoTitle` | **Aprovat amb un altre text:** «Soldadura i fabricació metàl·lica \| Serralleria Carbó». La pàgina presenta el conjunt de capacitats del taller, i els processos concrets ja surten a la descripció i al contingut |
| E4 | `/industrial/capacitats/` | `seoDescription` | **Aprovat** |
| E5 | `/industrial/capacitats/` | Enllaç secundari del bloc de consulta | **Aprovat amb un ajust:** substitueix «Torna a Industrial». Es conserven el botó de consulta tècnica i el retorn de les molles de pa, sense afegir una tercera acció |
| E6 | `/particulars/estructures/` | `seoTitle` | **Ajornat.** Es manté el títol actual |

---

## 2. Industrial (`/industrial/`)

**Intenció de cerca:** fabricació metàl·lica per a tercers; variants: subcontractació de fabricació metàl·lica, taller de soldadura industrial; també fabricació en sèrie. **Públic:** empreses, constructores i promotores.

| | Abans | Ara |
|---|---|---|
| `seoTitle` (E2) | Fabricació metàl·lica per a tercers \| Industrial (48) | **Fabricació metàl·lica per a tercers \| Serralleria Carbó** (55) |
| `seoDescription` (E1) | Fabricació metàl·lica per a tercers a Vilafranca del Penedès: fabricació en sèrie en acer al carboni i inox 304/316, soldadura MIG/MAG i TIG. (141) | **Fabricació metàl·lica per a tercers a Vilafranca del Penedès: estructures, portes, mobiliari, peces a plànol i carros industrials, en sèrie o a mida.** (149) |
| H1 | Fabricació en sèrie. Peces exigents. Resposta industrial. | Sense canvis |

**Justificació:**
- **Descripció:** ara resumeix el que respon la pàgina, que és l'oferta (què es fabrica, per a qui i en sèrie o a mida). Aplica la decisió del director que Industrial resumeix l'oferta i Capacitats concentra les dades tècniques. Tots els termes vénen d'`industrial.md`.
- **Títol:** identifica l'empresa amb el nom que es reconeix als resultats. Al Perfil d'Empresa hi ha 61 cerques amb el nom i l'adreça i 44 de «carbo». «Industrial» sol no identifica l'empresa. La intenció principal no canvia, i «sèrie» ja és a l'H1 i a la descripció.

## 3. Capacitats (`/industrial/capacitats/`)

**Intenció de cerca:** soldadura industrial MIG MAG TIG; variants: soldadura d'acer inoxidable, fabricació en inox 304 i 316. **Públic:** tècnics i compradors que comproven materials, processos i maquinària.

| | Abans | Ara |
|---|---|---|
| `seoTitle` (E3) | Capacitats de soldadura i fabricació \| Industrial (49) | **Soldadura i fabricació metàl·lica \| Serralleria Carbó** (53) |
| `seoDescription` (E4) | Taller de 950 m² amb plegadora, cisalla i punxonadora; acer al carboni, inox 304/316, soldadura MIG/MAG i TIG a Industrial. (123) | **Taller de 950 m² a Vilafranca del Penedès amb plegadora, cisalla i punxonadora. Acer al carboni i inox 304/316, soldadura MIG/MAG i TIG.** (136) |
| H1 | Capacitats del taller | Sense canvis |

**Justificació:**
- **Títol:** presenta el conjunt de capacitats del taller (soldadura i fabricació), que és el que la pàgina documenta. És el criteri del director; els processos concrets són a la descripció i al contingut.
- **Descripció:**
  - concentra les dades tècniques que són pròpies d'aquesta pàgina;
  - afegeix la ubicació del taller;
  - treu «a Industrial», que al resultat de cerca es llegeix com un lloc.

  Totes les dades ja són a `industrial-capacitats.md`.
- **Conjunt:** Industrial presenta l'oferta i Capacitats, el taller. Cada pàgina té una representació pròpia, però no es pot garantir que Google les mostri sempre per a consultes diferents.

### E5 · Enllaç cap a l'encàrrec real

| | Abans | Ara |
|---|---|---|
| Enllaç secundari del bloc «Parlem de la peça» | «Torna a Industrial ↖» → `/industrial/` | **«Veure un encàrrec real: deu gàbies ↗» → `/industrial/#projectes`** |

**Es conserven:**
- el botó principal «Envia una consulta tècnica»;
- el retorn a Industrial de les molles de pa.

No hi ha cap tercera acció.

**Justificació:** connecta la pàgina tècnica amb l'únic cas de fabricació real documentat d'Industrial, amb un ancoratge descriptiu.

---

## 4. Implementació

| Fitxer | Canvi |
|---|---|
| `content/ca/industrial.md` | Frontmatter: `seoTitle`, `seoDescription` (E1, E2). Cos i estat sense canvis |
| `content/ca/industrial-capacitats.md` | Frontmatter: `seoTitle`, `seoDescription` (E3, E4). Cos i estat sense canvis |
| `src/i18n/ui.ts` | `industrialCapacities.contact.back` («Torna a Industrial») → `caseLink` (text i àncora `#projectes`) |
| `src/templates/CapacitiesTemplate.astro` | L'enllaç secundari apunta a `/industrial/#projectes`, amb el text nou i la fletxa ↗. Mateixa classe i estil (`c-contact-return`) |
| `scripts/check-references.mjs` | Revisió validada nova: només les empremtes del frontmatter d'`industrial.md` i `industrial-capacitats.md`, amb `bodies: {}`. No desactiva cap comprovació; els cossos continuen validats per les revisions anteriors |

## 5. Comprovacions

| Comprovació | Resultat |
|---|---|
| `npm run verify` | 0 errors. `check-references` mostra com a canvis permesos exactament quatre camps: `seoTitle` i `seoDescription` dels dos fitxers. Referències intactes |
| `npm run check:links` | 13 pàgines, 355 enllaços interns, tots els destins resolen (inclòs `/industrial/#projectes`) |
| `npm run check:redirects` | Sense errors, 13 regles llestes |
| HTML generat (`dist/`) | `<title>`, `og:title` i `meta description` d'Industrial i Capacitats amb els textos aprovats. H1 sense canvis |
| Canonical, `noindex` i sitemap | Sense canvis de comportament: les 8 rutes comercials en esborrany porten `noindex`, la 404 porta `noindex` sense canonical, les 4 indexables (Projectes i les legals) no porten `noindex`, i el sitemap conserva les mateixes 4 URL |
| E5 a 1440, 768, 390 i 320 px | Una sola línia, 260 × 44 px (mida tàctil correcta), dins del bloc i sense desbordament de pàgina. Amb teclat rep el focus amb un contorn de 3 px. Com abans, l'enllaç queda en una fila a part del botó. Les columnes, les alçades i les posicions de la secció són idèntiques a l'anterior (1440, 1024 i 768 px); només canvia l'amplada intrínseca del bloc d'accions |
| Previsualització `revisio-client` | Actualitzada (desplegament `6ac7e22e823b5e7fb4ab0bf5`, sense `--prod`). Títols nous, `noindex` meta a Industrial i Capacitats, i enllaç a `/industrial/#projectes` presents a l'HTML servit |
| `npm run check:redirects:live` a `revisio-client` | Totes les comprovacions són correctes: 13 regles, les dues URL que es mantenen i `X-Robots-Tag: noindex` |

## 6. Seguiment

Quan hi hagi Search Console:
- observar quines consultes mostren Industrial i quines Capacitats;
- si totes dues apareixen per a la mateixa consulta, revisar primer els enllaços i després el text;
- revisar el títol d'Estructures (E6, ajornat) i el de Particulars amb el CTR real.
