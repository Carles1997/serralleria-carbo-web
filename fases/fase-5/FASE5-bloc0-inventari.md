# Fase 5 · Bloc 0 · Inventari de repeticions, CTA i mesures

**Data:** 27/09/2026 · **Origen:** [FASE5-pla-millora-integral.md](FASE5-pla-millora-integral.md) §5, Bloc 0.
**Mètode:** build estàtic (`npm run build`, `astro preview` a :4322), Chrome amb Playwright, moviment reduït perquè les captures mostrin l'estat acabat. Mesures a 1440, 768, 390 i 320 px (alçada de finestra 900 px). Captures base a 1440 i 390 px de les deu rutes construïdes (carpeta de treball local, no versionada). No s'ha modificat cap text editorial, dada ni ruta en aquest bloc.

## 1. Alçada total per ruta (px)

| Ruta | 1440 | 768 | 390 | 320 |
| --- | ---: | ---: | ---: | ---: |
| `/` | 3.783 | 4.581 | 5.637 | 5.835 |
| `/particulars/` | 6.030 | 6.018 | 6.438 | 6.697 |
| `/particulars/estructures/` | 3.130 | 2.915 | 4.392 | 4.562 |
| `/particulars/automatismes/` | 3.127 | 3.059 | 4.350 | 4.393 |
| `/particulars/mobiliari/` | 2.540 | 2.423 | 3.120 | 3.375 |
| `/particulars/urgencies/` | 2.368 | 2.224 | 3.043 | 3.139 |
| `/particulars/projectes/` | 5.053 | 4.837 | 6.690 | 6.667 |
| `/contacte/` | 2.414 | 3.272 | 4.184 | 4.573 |
| `/industrial/` | 5.962 | 6.427 | 9.044 | 9.574 |
| `/industrial/capacitats/` | 3.086 | 3.113 | 4.216 | 4.399 |

Coincideix amb el diagnòstic del pla (Home 5.637, Particulars 6.438, Industrial 9.044, Estructures 4.392 i Portafoli 6.690 px a 390).

## 2. Seccions per ruta: funció, repeticions i proposta

Funció: **O** orientació · **C** capacitat · **P** prova · **A** acció. Alçades a 390 px.

### Home `/`

| Secció | 390 px | Funció | Repetició o problema | Proposta (Bloc 1) |
| --- | ---: | --- | --- | --- |
| Entrada (H1 + accés ràpid) | 462 | O | Rètol «01 — Dues especialitats, un taller». | Retirar el rètol. |
| Doble accés | 923 | O/A | Etiquetes «01 / 02», «01 / Serralleria Carbó», «02 / Una branca…». L'acció d'Industrial diu «Veure capacitats» però porta a `/industrial/`. | Treure numeració; l'acció d'Industrial passa a l'etiqueta del contingut, «Coneix Industrial». |
| Xifres | 620 | P | Rètol «02 — El taller». | Retirar el rètol. |
| Empresa | 762 | O | Rètol «03 — Empresa / ofici». Enllaç a `/empresa/`, encara no construïda (P1). | Retirar el rètol. `/empresa/` continua al P1. |
| Serveis | 1.538 | A | Rètol «04 — Què fem»; cada rajola repeteix el seu nom en una etiqueta numerada («01 / Portes i motors» + «Portes i motors»); capçaleres de branca amb «01 / 02»; la rajola Industrial torna a mostrar l'eslògan del doble accés. | Retirar rètol, comptadors i etiquetes duplicades; treure l'eslògan repetit de la rajola Industrial. Es mantenen les cinc rajoles i els dos enllaços de branca. |
| Contacte | 751 | A | Rètol «05 — Contacte». | Retirar el rètol. |

### Particulars `/particulars/`

| Secció | 390 px | Funció | Repetició o problema | Proposta (Bloc 1) |
| --- | ---: | --- | --- | --- |
| Entrada | 641 | O | Cap accés a Urgències dins del primer viewport; la H1 es retalla a 320 px. | Afegir un accés directe a Urgències i reparacions; ajustar la H1 a l'amplada. |
| Introducció | 395 | O | Segona introducció seguida (primer paràgraf de `particulars.md`); retarda la franja d'urgències fins als ~1.036 px. | Eliminar la secció i usar aquest paràgraf com a entrada de Serveis (substitueix el text de maqueta). |
| Urgències | 405 | A | Arriba després de dues introduccions. | Situar-la just després de l'entrada. |
| Serveis 2×2 | 930 | A | Rètol «02 — …»; el cos de les targetes baixa a 11,5 px (390) i 10,6 px (320). | Treure el número del rètol; cos ≥ 15 px a mòbil, alçada per contingut. |
| Treballs reals | 2.186 | P | Rètol «03 — …»; la vista prèvia de tres casos s'acosta a la lectura del portafoli. | Treure el número; a mòbil, llista compacta sense escenari fix; a escriptori, capítols més baixos. |
| Àrea | 574 | O | Rètol «04 — …»; tercera introducció llarga abans del contacte. | Integrar el paràgraf d'àrea dins el bloc de contacte. |
| Contacte | 723 | A | Rètol «05 — Contacte». | Retirar el rètol. |

### Industrial `/industrial/`

| Secció | 390 px | Funció | Repetició o problema | Proposta (Bloc 1) |
| --- | ---: | --- | --- | --- |
| Entrada + xifres | 816 + 298 | O/P | «01 — 05» decoratiu. | Retirar-lo. |
| Taller | 2.237 | C | Rètol «01 / El taller»; el paràgraf de maqueta repeteix l'entrada («De peces úniques i carros…»); targetes amb «01 / Materials», «01 — 04»… | Retirar rètol, paràgraf redundant i numeració de targetes; mosaic més compacte a mòbil. Es manté el text de `industrial.md` i la nota ISO. |
| Sèries + mètode | 1.733 | C | Rètol «02 / …»; enllaços a `/industrial/proces/` i `/industrial/series-curtes/` (ajornades); el peu repeteix la guia de contacte. | Retirar rètol, enllaços ajornats i text repetit del peu (es manté «Consultar una sèrie»); passos sense alçada mínima a mòbil. |
| Sectors | 1.371 | P | Rètol «03 / Sectors»; «Àmbit d'experiència» ×5; enllaç a `/industrial/sectors/` (ajornada). | Retirar rètol, etiqueta repetida i enllaç ajornat; targetes més baixes a mòbil. |
| Cas real | 971 | P | Rètol «04 / …»; enllaç a `/industrial/projectes/` (ajornada). | Retirar rètol; l'enllaç passa a «Parlem d'un projecte semblant» → `#contacte` (text de la maqueta). |
| Contacte | 1.036 | A | Rètol «05 / Contacte tècnic». | Retirar el rètol. |

### Rutes que es tracten al Bloc 3 (propagació)

| Ruta | Observació |
| --- | --- |
| Serveis PS (quatre) | Sense rètols numerats de secció; notes de 12,8–14,4 px («Els esquemes són conceptuals…», fitxa de passos a mòbil). |
| Portafoli | 4.204 px de casos a 390 px; sense rètols numerats. |
| Contacte | Rètols «01 / La teva consulta» i grups «02 / Dades de contacte», «03 / La feina», «04 / Documentació»: el pla demana treure'n el prefix i conservar el nom. Ajudes del formulari a 14,1 px. |
| Capacitats | Rètols «01 / Materials i maquinària» … «04 / Consulta tècnica» i plaques «01 / Acer», «02 / Inoxidable»; navegació local numerada (01–04), que identifica un índex real i es pot conservar. |

## 3. CTA i enllaços

- **Rutes Industrial ajornades** (decisió del pla §2.1): el menú d'Industrial (portada i Capacitats) i quatre enllaços de contingut de la portada apunten a `/industrial/series-curtes/`, `/sectors/`, `/proces/` i `/projectes/`. Passen a `/industrial/#series`, `#sectors`, `#proces` i `#projectes`; dins la mateixa portada, els enllaços que remetrien a la secció on ja és l'usuari es retiren o es converteixen en contacte.
- **Etiqueta que no descriu el destí:** «Veure capacitats» (doble accés de la Home) porta a `/industrial/`.
- **`/empresa/`** (Home) continua pendent de construir: és part de l'entrega i del P1.
- Cada portada té almenys una sortida per aprofundir i una per contactar; Particulars no té sortida a Urgències al primer viewport.

## 4. Lectura

- **Text de cos < 15 px** en contingut explicatiu: targetes de serveis de Particulars (11,5 px a 390, 10,6 px a 320). La resta són notes d'imatge conceptual (12–13 px) o ajudes de formulari (14,1 px), que es revisaran a l'escala del Bloc 2.
- **Titular retallat:** H1 de Particulars a 320 px.

## 5. Límits

- Els textos editorials de `content/ca/` no es modifiquen: quan una secció es condensa, el paràgraf del contingut es recol·loca o es conserva; els textos que es retiren són d'interfície (maqueta o `src/i18n/ui.ts`).
- Les quatre rutes Industrial ajornades conserven els seus esborranys a `content/ca/` i el lloc al sitemap mestre de Fase 1; no es generen pàgines.
- Color, escala tipogràfica, superfícies, prova `#eeefeb`/`#ffffff` i moviment són Blocs 2 i 4.
