# Dossier de decisió · Fotografies antigues de WordPress · P8

**Data:** 22/10/2026. **Destinatari:** Direcció. **Estat:** P8 pendent de decisió sobre fotos i de comprovació de campanyes.

Dossier preparatori de «Tancar decisions de redirecció de la web antiga». Revisió exclusivament local, sense xarxa ni contactes. No s'han canviat redireccions, imatges, continguts públics ni configuració.

## Resum de la decisió pendent

Direcció ha de decidir el destí de les URL antigues de les 12 fotografies enumerades al bloc 4: imatge estable, pàgina que mostra el cas o absència de redirecció (404). No hi ha cap alternativa triada en aquest dossier. Cal confirmar l'ús visible de l'ID 04 abans de donar per acreditat l'equivalent públic de totes dotze.

La nota del 09/10 de `fases/fase-6/FASE6-bloc4-redireccions.md` confirma que les fotos visibles són definitives; aquesta aprovació no decideix el destí de les URL antigues. El mapa pot tenir zero regles per decidir i P8 continuar pendent: les fotos no hi tenen regla i el comprovador de redireccions no les detecta.

## Fets i recomptes

- **12 fotografies**, IDs 01, 02, 04, 06, 07, 08, 09, 12, 14, 15, 16 i 23: conjunt documental del bloc 4, amb 11 usos visibles acreditats pel codi actual i un per confirmar.
- **24 URL antigues diferents documentades:** 12 originals de mida completa i 12 miniatures d'Elementor. Repeticions en diverses pàgines no són fotografies ni URL noves.
- **Variants de mida de WordPress (`-WxH`): nombre desconegut**, no inventariades per a aquestes fotos. No s'infereixen URL a partir dels noms.
- L'expressió «12 URL» de P8 a `fases/fase-9/FASE9-manual-publicacio.md` i `fases/fase-9/FASE9-informe-actualitzacio-documentacio-2026-10-22.md` remet a **12 fotos**, no a un inventari exhaustiu de 12 adreces.
- Els recomptes generals del bloc 4 (46 URL a l'HTML, 40 fitxers diferents i 17 fotos de mediateca) tenen un abast diferent i no s'han de sumar als 24 d'aquest dossier.

## Evidència de les 12 fotografies

**Fonts de cada fila:** O = `assets/fotografies-recuperades/origen-wordpress.csv` (id, media_id, source_url, asset, sha256); C = `assets/fotografies-recuperades/cataleg.csv` (id, asset_principal, url_font, original_miniatura); S = `fases/fase-6/linia-base-wordpress-2026-10-08/fitxers/page-sitemap-xml.xml`; P = `src/config/photography.ts` i les plantilles detallades més avall.

O i C acrediten els originals; els SHA-256 dels 12 fitxers recuperats s'han contrastat amb O i coincideixen també amb sha256_asset de C. S acredita les 12 miniatures; C també n'acredita 11. La vinculació de la miniatura 23 amb l'original es basa en el mateix nom base al sitemap, sense hash de miniatura al catàleg.

**H (comú a totes les files):** les miniatures apareixen a `fases/fase-6/linia-base-wordpress-2026-10-08/fitxers/pagina-projectes.html`, `fases/fase-6/linia-base-wordpress-2026-10-08/fitxers/pagina-estructuras.html` i `fases/fase-6/linia-base-wordpress-2026-10-08/fitxers/pagina-cat-estructuras.html`. No apareixen a `fases/fase-6/linia-base-wordpress-2026-10-08/fitxers/pagina-inici.html`. Els originals complets de les files no apareixen a l'HTML desat: la seva acreditació prové dels CSV, no d'un enllaç HTML antic.

**Certesa alta:** identitat del fitxer recuperat acreditada per hash i ús visible traçable al codi de renderització actual. No equival a una comprovació en línia. **Per confirmar:** hi ha identitat del fitxer, però no ús visible demostrat. Les pàgines i casos indicats són evidència d'ús, no destinacions de redirecció aprovades.

| ID | media_id | URL antigues acreditades (O: original; T: miniatura) | Fitxer recuperat | Ús nou documentat | Font | Certesa |
|---|---|---|---|---|---|---|
| 01 | 430 | O: https://www.serralleriacarbo.com/wp-content/uploads/2024/09/Imatge-de-WhatsApp-2024-06-25-a-les-12.48.12_407a5dd0.jpg<br>T: https://www.serralleriacarbo.com/wp-content/uploads/elementor/thumbs/Imatge-de-WhatsApp-2024-06-25-a-les-12.48.12_407a5dd0-qu78w834utgt4h81r9g2etyx3mdknwrvlh9upe4t3q.jpg | `assets/fotografies-recuperades/projectes/persianes-negoci/persianes-negoci-facana-01.jpg` | persianes-negoci: primary, Projectes de Particulars; serviceScope.persiana | O, C, S, H, P | alt |
| 02 | 429 | O: https://www.serralleriacarbo.com/wp-content/uploads/2024/09/Imatge-de-WhatsApp-2024-06-25-a-les-12.48.12_7d6b0eaa.jpg<br>T: https://www.serralleriacarbo.com/wp-content/uploads/elementor/thumbs/Imatge-de-WhatsApp-2024-06-25-a-les-12.48.12_7d6b0eaa-qu78w67gh5e8h9as28mt9ufzwumu8ikex7yvqu7lg6.jpg | `assets/fotografies-recuperades/projectes/persianes-negoci/persianes-negoci-facana-02.jpg` | persianes-negoci: stage, Particulars | O, C, S, H, P | alt |
| 04 | 422 | O: https://www.serralleriacarbo.com/wp-content/uploads/2024/09/Imatge-de-WhatsApp-2024-06-25-a-les-12.48.53_74b5bf5a.jpg<br>T: https://www.serralleriacarbo.com/wp-content/uploads/elementor/thumbs/Imatge-de-WhatsApp-2024-06-25-a-les-12.48.53_74b5bf5a-qu78q6yf037kmjzfz5l8wurfvm3s9ttvrmkouh2r12.jpg | `assets/fotografies-recuperades/projectes/estructura-ascensor/estructura-ascensor-pati-01.jpg` | estructura-ascensor: només shared.ascensor01; ús visible per confirmar | O, C, S, H, P | per confirmar |
| 06 | 424 | O: https://www.serralleriacarbo.com/wp-content/uploads/2024/09/Imatge-de-WhatsApp-2024-06-25-a-les-12.48.53_c40e4b26.jpg<br>T: https://www.serralleriacarbo.com/wp-content/uploads/elementor/thumbs/Imatge-de-WhatsApp-2024-06-25-a-les-12.48.53_c40e4b26-qu78q8u3dra59rwpo6ei1uad2duip81cfvvnt0zyom.jpg | `assets/fotografies-recuperades/projectes/estructura-ascensor/estructura-ascensor-pati-03.jpg` | estructura-ascensor: stage, Particulars | O, C, S, H, P | alt |
| 07 | 425 | O: https://www.serralleriacarbo.com/wp-content/uploads/2024/09/Imatge-de-WhatsApp-2024-06-25-a-les-12.48.53_c5921cd7.jpg<br>T: https://www.serralleriacarbo.com/wp-content/uploads/elementor/thumbs/Imatge-de-WhatsApp-2024-06-25-a-les-12.48.53_c5921cd7-qu78qaprrfcpwztzd77r6tta95l94m8t456mrkx6c6.jpg | `assets/fotografies-recuperades/projectes/estructura-ascensor/estructura-ascensor-pati-04.jpg` | estructura-ascensor: primary, Projectes de Particulars | O, C, S, H, P | alt |
| 08 | 418 | O: https://www.serralleriacarbo.com/wp-content/uploads/2024/09/Imatge-de-WhatsApp-2024-06-25-a-les-12.51.48_2cf85461.jpg<br>T: https://www.serralleriacarbo.com/wp-content/uploads/elementor/thumbs/Imatge-de-WhatsApp-2024-06-25-a-les-12.51.48_2cf85461-qu78nx6ghi3mkha88o8pdxec73auo5t8gdtg3eg02e.jpg | `assets/fotografies-recuperades/projectes/gavia-industrial/gavia-industrial-fabricacio-01.jpg` | gavia-industrial: stage; ús visible a home.company i capacities.workshop | O, C, S, H, P | alt |
| 09 | 419 | O: https://www.serralleriacarbo.com/wp-content/uploads/2024/09/Imatge-de-WhatsApp-2024-06-25-a-les-12.51.49_d5c584b5.jpg<br>T: https://www.serralleriacarbo.com/wp-content/uploads/elementor/thumbs/Imatge-de-WhatsApp-2024-06-25-a-les-12.51.49_d5c584b5-qu78ny4aoc4ww38v36nbyf5ssh67vuwysigxkoelw6.jpg | `assets/fotografies-recuperades/projectes/gavia-industrial/gavia-industrial-taller-02.jpg` | gavia-industrial: primary; encàrrec real a industrial.project | O, C, S, H, P | alt |
| 12 | 428 | O: https://www.serralleriacarbo.com/wp-content/uploads/2024/09/Imatge-de-WhatsApp-2024-06-25-a-les-12.51.52_ef777e05.jpg<br>T: https://www.serralleriacarbo.com/wp-content/uploads/elementor/thumbs/Imatge-de-WhatsApp-2024-06-25-a-les-12.51.52_ef777e05-qu78sjjw36fdngkk965o59excaitil5q39ae1dlbh2.jpg | `assets/fotografies-recuperades/projectes/porta-parquing/porta-parquing-interior-03.jpg` | porta-parquing: stage i primary, Particulars i Projectes; home.doorsTile i serviceScope.garatge | O, C, S, H, P | alt |
| 14 | 432 | O: https://www.serralleriacarbo.com/wp-content/uploads/2024/09/Imatge-de-WhatsApp-2024-06-25-a-les-12.55.04_fc524e95.jpg<br>T: https://www.serralleriacarbo.com/wp-content/uploads/elementor/thumbs/Imatge-de-WhatsApp-2024-06-25-a-les-12.55.04_fc524e95-qu78xh7dyv6klreifsy5qil1m476xdqzrol5qo9wt2.jpg | `assets/fotografies-recuperades/projectes/baranes-interior-casa/baranes-interior-escala-01.jpg` | baranes-interior-casa: primary, Projectes de Particulars; serviceScope.barana | O, C, S, H, P | alt |
| 15 | 416 | O: https://www.serralleriacarbo.com/wp-content/uploads/2024/09/IMG-20240805-WA0001.jpg<br>T: https://www.serralleriacarbo.com/wp-content/uploads/elementor/thumbs/IMG-20240805-WA0001-qu78hwzktlvoe609b2sigfybkgwfhryyynrrprcjti.jpg | `assets/fotografies-recuperades/projectes/passarella-interior/passarella-interior-vista-frontal-01.jpg` | passarella-interior: stage, Particulars; home.structuresTile i serviceScope.passarella | O, C, S, H, P | alt |
| 16 | 417 | O: https://www.serralleriacarbo.com/wp-content/uploads/2024/09/IMG-20240805-WA0002.jpg<br>T: https://www.serralleriacarbo.com/wp-content/uploads/elementor/thumbs/IMG-20240805-WA0002-qu78hyv979y91dxj03lrlfh8r8n5x66fmx2qob9rh2.jpg | `assets/fotografies-recuperades/projectes/passarella-interior/passarella-interior-vista-lateral-02.jpg` | passarella-interior: primary i portfolioHero, Projectes de Particulars | O, C, S, H, P | alt |
| 23 | 433 | O: https://www.serralleriacarbo.com/wp-content/uploads/2024/09/Imatge-de-WhatsApp-2024-06-25-a-les-12.55.05_e774d23b.jpg<br>T: https://www.serralleriacarbo.com/wp-content/uploads/elementor/thumbs/Imatge-de-WhatsApp-2024-06-25-a-les-12.55.05_e774d23b-qu78xi585p7uxdd5abcsb0ci7i2k52uq3t8n7y8imu.jpg | `assets/fotografies-recuperades/projectes/baranes-interior-casa/baranes-interior-escala-02.jpg` | baranes-interior-casa: stage, Particulars | O, C (original), S, H, P; miniatura sense hash | alt |

### Traçabilitat del web nou

- `src/templates/ParticularsTemplate.astro` renderitza stage de projectPhotography; `src/templates/PortfolioTemplate.astro` renderitza primary dels cinc projectIds de `content/ca/particulars-projectes.md`, a `/particulars/projectes/`. Els casos són `content/ca/projects/persianes-negoci.md`, `content/ca/projects/estructura-ascensor.md`, `content/ca/projects/porta-parquing.md`, `content/ca/projects/baranes-interior-casa.md` i `content/ca/projects/passarella-interior.md`. No tenen pàgina individual de detall.
- `src/templates/IndustrialTemplate.astro` mostra industrial.project (ID 09) a `/industrial/`; `content/ca/projects/gavia-industrial.md` documenta el cas i `content/ca/industrial-projectes.md` declara aquest projectId. Aquesta declaració sola no demostra que s'hi renderitzi stage (ID 08); l'ús visible d'aquest ID queda acreditat per Home i Capacitats.
- `src/templates/HomeTemplate.astro`, `src/templates/ServiceTemplate.astro` i `src/templates/CapacitiesTemplate.astro` consumeixen respectivament home, serviceScope i capacities. La configuració vincula aquests camps als fitxers de la taula.
- `fases/fase-6/auditoria-seo/netlify/raw/crawl.json` és una captura històrica complementària, no una prova del desplegament actual. No substitueix la traçabilitat del codi.

## Discrepàncies explícites

1. **ID 04:** el bloc 4 inclou aquesta foto entre les usades, però photography.ts només la publica dins de sitePhotography.shared. Cap plantilla consumeix aquest camp i no apareix al crawl consultat. La recuperació i la identitat estan acreditades; l'ús visible i una eventual pàgina de destinació queden **per confirmar**. No se substitueix per una altra vista del mateix cas.
2. **ID 23:** original_miniatura, sha256_miniatura i miniatura_web són buits a C. La URL T de la taula sí que és al sitemap i als HTML H. L'original i l'ús actual estan acreditats; falta la traça per hash de la miniatura recuperada, que no s'ha inventat.
3. **ID 13, fora de les 12:** el crawl històric conté gavia-industrial-transport-03 a `/empresa/`, mentre que photography.ts actual no l'importa. No es pren aquest ús antic com a ús actual ni s'amplia el conjunt de decisió sense confirmar-lo.

## Alternatives ja documentades, sense selecció

Font: apartat 2 de `fases/fase-6/FASE6-bloc4-redireccions.md`.

| Alternativa | Requisits i efectes documentats |
|---|---|
| 301 imatge → imatge estable | Publicar una còpia estable de cada fotografia i dirigir-hi les URL antigues corresponents. El bloc 4 la presenta com l'opció recomanada per conservar la cerca d'imatges; això és una recomanació de la font, no una decisió d'aquest dossier. Les URL de `/_astro/` canvien amb el procés d'imatges i no serveixen com a destí estable. |
| 301 a la pàgina que mostra el cas | Identificar la pàgina que realment mostra la mateixa fotografia. El bloc 4 la considera menys adequada per a la cerca d'imatges. Per a l'ID 04 aquesta correspondència visible no està demostrada. No s'inventen pàgines individuals de cas. |
| No redirigir (404) | No afegir cap regla per a aquestes URL. El bloc 4 ho preveu si no es vol cap de les altres dues alternatives. Sense Search Console no es pot quantificar el trànsit o els enllaços que afectarien aquesta opció. |

## Decisió que encara s'ha de prendre

- [ ] Direcció: registrar l'alternativa escollida per a les 12 fotos i les seves URL acreditades, les excepcions si n'hi ha i la resolució de la discrepància de l'ID 04. Decisió: **pendent**. Data i referència de l'aprovació: **pendents**.
- [ ] Client: comprovar campanyes actives de Google Ads o Meta a `/estructuras/` i `/motores/` i, si escau, actualitzar-ne la destinació abans del tall. Resultat: **pendent**, sense cap consulta ni contacte fet en aquesta tasca.

## Mancances i límits

- **Search Console:** sense dades de trànsit, indexació o enllaços externs de les URL antigues; l'absència de dades no demostra absència de valor.
- **Variants de mida:** falta un inventari de variants WordPress per foto; les 24 URL acreditades no constitueixen un inventari complet de totes les possibles variants.
- **Ús actual:** pendent de confirmar l'ID 04; no es dona per demostrada la correspondència pública de totes dotze. Falta la traça de miniatura al catàleg de l'ID 23; l'ID 13 presenta una divergència temporal.
- **P5:** els consentiments de persones identificables continuen pendents segons el manual de publicació, encara que els permisos d'ús de les fotografies estiguin confirmats. Si escau, cal comprovar aquest pendent abans de publicar còpies estables. No es reprodueixen dades personals ni documentació de consentiment.
- **Campanyes:** comprovació pendent del client, independent de l'alternativa fotogràfica. El bloc 4 la registra com a comprovació prèvia al llançament i indica que no impedeix activar les regles ja decidides.

Aquest dossier prepara la decisió; **P8 continua pendent**. No implementa cap alternativa ni tanca la comprovació de campanyes.
