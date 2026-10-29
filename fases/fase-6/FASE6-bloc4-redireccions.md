# Fase 6 · Bloc 4 · Tancament de les redireccions de migració

**Data:** 08/10/2026 · **Estat:** decisions del director del 08/10/2026 implementades, revisades per Codex i publicades a `revisio-client` el 09/10/2026. La decisió sobre les dotze fotografies antigues queda pendent.

**Decisió de base (director, 08/10/2026):** el web es publica **en català i castellà des del primer dia**; l'anglès queda ajornat. Aquesta decisió substitueix les propostes anteriors de llançament només en català i de redireccions provisionals (302).

**Base:**
- les propostes de [FASE6-bloc2-rendiment.md, apartat 7](FASE6-bloc2-rendiment.md#7-propostes-per-a-les-redireccions-obertes-no-decidides);
- el contingut antic de la [línia base de WordPress](linia-base-wordpress-2026-10-08/README.md);
- el mapa `src/config/redirects.mjs` ([FASE5-redireccions](../fase-5/FASE5-redireccions.md)).

**Límit:** sense Search Console no es coneix el trànsit ni els enllaços externs de cap URL antiga.

---

## 1. Decisions i implementació

| # | URL antiga | Decisió (08/10/2026) | Al mapa |
|---|---|---|---|
| R1 | `/sample-page/` | 301 a `/contacte/` | Regla 301 cap a `contacte` (ca). Era la pàgina de manteniment «Disculpeu les molèsties», amb dades de contacte |
| R2 | `/hello-world/`, `/category/uncategorized/` | 410 | Regles 410 sense decisió pendent |
| R3 | `/feed/`, `/comments/feed/` | 410 | Regles 410 noves |
| R4 | `/cat/` | 301 a `/` | Regla 301 cap a `home` (ca) |
| R5 | `/es/` | Portada real en castellà, resposta 200 | `unchanged` (es manté). La pàgina es genera a `src/pages/es/index.astro` |
| R6 | `/estructuras/`, `/motores/` | 301 directe a les noves pàgines en castellà | Regles 301 cap a `particulars-estructures` (es) → `/es/particulares/estructuras/` i `particulars-automatismes` (es) → `/es/particulares/automatismos/`. Llestes perquè les destinacions es generen |

**Slugs en castellà.** Són els de la proposta de [FASE5-idiomes](../fase-5/FASE5-idiomes.md), adoptats per al llançament el 08/10/2026. Cap dels punts oberts d'aquell document afectava el castellà.

**Campanyes.** La comprovació de campanyes de Google Ads o Meta que apuntin a `/estructuras/` o `/motores/` queda registrada com a comprovació prèvia al llançament (`launchChecks`). No impedeix activar les regles. `npm run check:redirects` la mostra a cada execució.

**No s'implementa cap 302 provisional.**

**Estat del mapa (build local del 08/10/2026):**
- 21 regles llestes (12 × 301 i 9 × 410), cap en espera ni per decidir;
- es mantenen `/`, `/contacte/` i `/es/`;
- `dist/_redirects` també serveix la 404 castellana a les adreces inexistents de `/es/…`;
- `check:redirects` és correcte. `check:redirects:live` es farà en el pròxim desplegament de `revisio-client`.

## 2. Fitxers antics de `/wp-content/uploads/`

**Inventari revisat:**
- **46 URL** de fitxers referenciats a l'HTML desat a la línia base (40 fitxers diferents, sense comptar les mides generades per WordPress);
- **17 fotografies** de la mediateca pública registrades a [`assets/fotografies-recuperades/origen-wordpress.csv`](../../assets/fotografies-recuperades/origen-wordpress.csv), amb el catàleg traçable a `cataleg.csv`.

L'absència de dades de Search Console no demostra que aquests fitxers no tinguin valor: només impedeix saber-ho.

| Grup | Fitxers | Equivalent al web nou | Proposta |
|---|---|---|---|
| **Fotografies de projectes usades al web nou** | 12 de les 17 de la mediateca (ids 01, 02, 04, 06, 07, 08, 09, 12, 14, 15, 16 i 23 del catàleg) i les seves miniatures d'Elementor (`/wp-content/uploads/elementor/thumbs/…`) | **Clar:** la mateixa fotografia es mostra a un cas de Projectes de Particulars o a l'encàrrec real d'Industrial | **Per decidir** (sense implementar). Opció recomanada: 301 de cada URL antiga cap a una URL estable de la mateixa imatge al web nou (imatge → imatge, que és el que conserva la cerca d'imatges). Requereix publicar una còpia estable de cada foto, perquè les URL de `/_astro/` canvien amb el procés d'imatges. Alternativa: 301 cap a la pàgina que mostra el cas (menys adequat per a la cerca d'imatges). Si no es vol cap de les dues, 404 |
| Fotografies de la mediateca no usades | 5 (ids 03, 05, 10, 11 i 13) | No hi ha la mateixa imatge (el cas sí que existeix) | Cap regla (404). No s'inventa una equivalència amb una altra foto |
| Carrusel de la landing de motors | `2025/02/image-15.png` a `image-20.png` | Cap. Probablement són logotips de marques de motor, que no es publiquen sense validar (`reviewNeeded` d'Automatismes) | Cap regla (404) |
| Logotips, icona del lloc i separador | `Carbo-Logo.svg`, `Logo.svg`, `Logo-entero-svg-rojo.svg`, `cropped-Logo_Rojo-1*.png`, `Diseno-sin-titulo-19.png` (logotip de la pàgina de manteniment), `Vector.png` (separador) | No hi ha cap equivalent amb valor de cerca | Cap regla (404) |
| CSS d'Elementor | `elementor/css/post-*.css` (11) | Cap | Cap regla (404) |

**Cal decidir:** si les 12 fotografies amb equivalent clar es redirigeixen imatge a imatge (amb una còpia estable), cap a la pàgina del cas, o no es redirigeixen.

**Nota (09/10/2026):** el director ha decidit que les fotografies visibles actuals són definitives (FASE8 8.6). Aquesta decisió no resol el destí de les URL antigues de WordPress, que continua pendent.

## 3. Comprovacions pendents

- ~~`npm run check:redirects:live` a `revisio-client`~~ **Fet el 09/10/2026** (desplegament `6ac81d8fe0c9024a8068e5c2`, commit `a29d067`): totes les regles correctes, inclosos els 301 de `/estructuras/` i `/motores/` cap a les pàgines castellanes. La 404 de `/es/…` respon 404 en castellà.
- Al domini, el dia del llançament, l'endemà i al cap d'una setmana ([pla executable, 5.3](FASE6-pla-executable.md#53-verificacions)).
- Campanyes actives a `/estructuras/` i `/motores/` (client), abans del llançament.

## Tancament de les fotografies antigues (29/10/2026)

En preparar la publicació definitiva per ordre del director es conserva la identitat original de les URL: les 12 fotografies reutilitzades i les seves 11 miniatures conegudes es serveixen directament amb resposta 200 als mateixos camins de WordPress. El catàleg no té miniatura per a l’ID 23. No cal un 301 quan la URL i els bytes de la imatge es conserven.

S’han copiat a public/wp-content/uploads els originals i les miniatures exactes, comprovats amb les empremtes del catàleg. No s’ha modificat cap imatge del disseny ni s’afegeixen càrregues a les pàgines actuals. Manifest: [FASE9-imatges-antigues-conservades.json](../fase-9/FASE9-imatges-antigues-conservades.json). Aquesta decisió resol el pendent de les 12 fotos, i substitueix les opcions anteriors d’aquell apartat. La resta de fitxers sense equivalent no reben una redirecció genèrica.
