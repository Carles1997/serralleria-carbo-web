# Fase 7 · Refinament global i redisseny de Contacte · Execució

**Data:** 06/10/2026
**Encàrrec:** [`FASE7-brief-refinament-global-i-contacte.md`](FASE7-brief-refinament-global-i-contacte.md)
**Referència visual de Contacte:** [`referencies/contacte-referencia-client-2026-10-06.png`](referencies/contacte-referencia-client-2026-10-06.png)
**Informe editorial:** [`FASE7-revisio-editorial-refinament.md`](FASE7-revisio-editorial-refinament.md)
**Estat:** implementat en local, sense commit, push ni desplegament (instrucció del director)

## 1. Sistema compartit

### Escala tipogràfica i espaiat (`src/styles/roles.css`)

| Rol | Abans | Ara | Mesurat a 1440 / 768 / 390 px |
| --- | --- | --- | --- |
| H1 d'interior (`--type-hero`) | `clamp(3.9rem, 6.2vw, 7rem)` | `clamp(2.1rem, 1.2rem + 3.4vw, 4.5rem)` | 68 / 45 / 34 px |
| H1 de la Home | `clamp(4.1rem, 7.1vw, 7.4rem)` | `clamp(2.5rem, 1.3rem + 4vw, 4.5rem)` (escala pròpia moderada) | 72 / 52 / 40 px |
| H2 (`--type-h2`) | `clamp(3.5rem, 5.4vw, 5.8rem)` | `clamp(1.75rem, 1.1rem + 2.4vw, 3.5rem)` | 52 / 36 / 28 px |
| H3 (`--type-h3`) | `clamp(1.9rem, 2.6vw, 2.8rem)` | `clamp(1.25rem, 0.9rem + 1.3vw, 2rem)` | 32 / 24 / 20 px |
| H4 (`--type-h4`) | `clamp(1.3rem, 1.7vw, 1.8rem)` | `clamp(1.125rem, 0.95rem + 0.6vw, 1.5rem)` | 24 / 20 / 18 px |
| Introducció | `clamp(1.05rem, 1.25vw, 1.2rem)` | `clamp(1rem, 0.9rem + 0.45vw, 1.2rem)` | 19 / 18 / 16 px |
| Secció | `clamp(3.5rem, 5vw, 4.5rem)` | `clamp(1.75rem, 1rem + 2.6vw, 3.25rem)` | 52 / 36 / 28 px |
| Titular → contingut | `clamp(2rem, 3.5vw, 3rem)` | `clamp(1rem, 0.75rem + 0.8vw, 1.5rem)` | 24 / 18 / 16 px |

S'ha fet un inventari renderitzat a 13 rutes i 4 amplades: no queda cap titular ni xifra més gran que l'H1 de la seva pàgina, cap titular retallat ni cap desbordament horitzontal.

Les mides locals que anul·laven el sistema (maqueta, revisió del client, afinament) s'han consolidat. Cada full de plantilla s'ha reescrit en una sola capa: Home, `particulars.css`, `service.css`, `portfolio.css`, `industrial.css`, `capacities.css`, `contact.css` i `mockup-base.css`. S'ha eliminat `industrial-surfaces.css`, que era un full d'*overrides*: les seves superfícies ara viuen a la paleta d'`industrial-base.css`. **No s'han modificat** `design/tokens.css`, `src/styles/fase4.css` ni les maquetes de les fases 1–4.

### Superfícies clares (Home, Particulars, serveis, Projectes, Contacte, legals i 404)

| Funció | Valor | Token |
| --- | --- | --- |
| Superfície principal | `#dce0df` | `--surface-grey` |
| Blanc trencat | `#eeefeb` | `--surface-paper` (= `--client-paper`) |
| Formulari | `#ffffff` | `--surface-white` |
| Text principal | `#202627` | `--ink` |
| Text secundari | `#4c5652` | `--ink-muted` |
| Línies | `#bcc4c1` (fines) i `#8f9996` (fortes) | `--line-on-light`, `--line-strong-on-light` |
| Acció i logo | `#7c2a30` (el mateix `--color-accent` que pinta el logo) | `--action`; hover `#66222a` (`--action-hover`) |

El gris clar i el blanc trencat marquen agrupacions, no alternen a cada H2. A la Home, per exemple, l'entrada i la guia van en gris, les xifres i el taller formen un sol grup en blanc trencat, els serveis van en gris i el tancament en blanc trencat. Les fotografies conserven el text blanc, amb una ombra concentrada darrere del text en lloc de capes negres globals.

### Capçalera, peu i tancament compartits

- **`SiteHeader`:** nova propietat `tone`. És clara (blanc trencat, logo bordeus) a tota la família Serralleria i de grafit mitjà (`#3a4243`, logo plata) a Industrial. El menú obert segueix el to. L'alçada passa de 76 a 68 px a escriptori i de 68 a 60 px a mòbil, i s'exposa com a `--header-h` per a les peces enganxoses.
- **`SiteFooter`:** la meitat de padding i sense alçada mínima. Fa **114 px a escriptori** (abans 212) i **262 px a mòbil** (abans 540). Els enllaços queden en fila, amb 44 px de zona tàctil. És clar a Serralleria i de grafit mitjà a Industrial.
- **`ContactBlock`** (tancament de Home, Particulars, serveis i Projectes): titular mitjà, text breu, una acció principal en bordeus (WhatsApp) i tres accions secundàries. Sense fons bordeus ni la «C» gegant. Fa 279 px a 1440 en lloc de 423 (Home) o 568 (Particulars).

## 2. Canvis per ID

| ID | Fet | Comprovació |
| --- | --- | --- |
| G01 | [Informe editorial](FASE7-revisio-editorial-refinament.md) de les 10 rutes: canvis autoritzats aplicats (Part A), 29 propostes pendents (Part B), textos conservats (C), legals i ajornats (D) | Text extret del navegador, no només dels Markdown |
| G02 | Escala reduïda (taula de dalt); xifres i títols de targeta per sota de l'H1 | Inventari renderitzat: H1 68–72 px a escriptori, 34–40 px a mòbil |
| G03 | Seccions, targetes i alçades mínimes escèniques reduïdes | Alçada total a 1440: Home 3.621 → 2.865 px; Particulars 4.447 → 3.578; Estructures 3.092 → 2.335; Projectes 5.042 → 3.735; Industrial 4.849 → 4.198; Capacitats 3.088 → 2.501; Contacte 2.518 → 1.752 |
| G04 | Peu compacte | 212 → 114 px (1440); 540 → 262 px (390) |
| H01 | Home sense blocs negres: entrada, guia, taller, serveis i tancament clars | Captures i axe-core: 0 infraccions de contrast |
| H02 | Bordeus únic `#7c2a30` (`--action` = `--color-accent`, el del logo) per a CTA, focus, coma del titular, xifres i indicadors | Cap altre bordeus actiu a Home i Particulars |
| H03 | «Fabricació en sèrie» al missatge, l'H1, el menú i la metadescripció d'Industrial | Cap «curta/curtes» a les pàgines generades |
| H04 | «Fabriquem al nostre taller. Muntem al teu projecte», en dues línies a escriptori, amb el grup de fabricació, muntatge i àrea | 506 → 434 px a 1440. La frase repetida queda com a proposta H-1 |
| H05 | Tancament compacte | 423 → 279 px. La segona frase repetida queda com a proposta H-6 |
| P01 | Família clara de la Home a Particulars, als serveis i a Projectes | Captures a 1440 i 390 |
| P02 | Fora el número gegant de l'escenari dels treballs (`.p-story-stage-number`). `src/scripts/story.ts` ja no l'escriu ni l'anima. Tampoc hi ha números a les targetes de servei ni el número del portafoli sobre les fotos | Es conserven el canvi de foto, la barra de progrés i «01 / 03» a la capçalera de cada cas, fora de la foto |
| P03 | «Explica'ns la feina» amb el patró compartit compacte; manté l'àrea de treball | 568 → 344 px |
| I01 | La foscor venia **del fitxer** (lluminositat mitjana 41/255) **i de la capa**. Nova exportació derivada `assets/imatges-conceptuals/industrial-series-hero-v1-llum.jpg` (corba de tons que obre les ombres, mitjana 67/255, 224 KB en lloc d'1,8 MB). El màster PNG es conserva sense canvis. Capa reduïda i concentrada a l'esquerra i a baix | La imatge no és una foto de persones ni porta el logo a la roba |
| I02 | Grafit `#3b4243` → **`#525c5c`**; plata `#d5d9d8` i boira `#e2e5e4` per als blocs clars. Text d'accent sobre grafit `#dfe5e3` (el plata `#c5ceca` no arribava a 4,5:1 en mida petita); el logo conserva el plata aprovat | axe-core: 0 infraccions a Industrial i Capacitats |
| I03 | «La sèrie comença amb una peça» en una sola composició: titular, frase i acció al costat de la fotografia, i a sota la línia metàl·lica amb els quatre nodes. «Quatre passos…» passa a ser una etiqueta petita. S'ajusta `series.ts`: la línia comença al 75 % de la pantalla i acaba al 30 % | 811 → 734 px a 1440 (390 px: 1.434 → 1.127); el bloc «Quatre passos» ja no és una caixa a part. Els quatre passos s'encenen amb el bloc a la pantalla (escriptori i mòbil). Amb moviment reduït i sense JavaScript, els quatre passos són visibles |
| C01 | Fora la introducció llarga i el títol «Explica'ns què necessites» | Un sol H1 |
| C02 | Nova composició: informació ~38 % a l'esquerra, formulari ~62 % a la dreta, superfície blanca amb contorn fi i radi de 6 px. DOM reordenat: H1, contacte directe, formulari, horari i adreça. A mòbil el formulari ve just després del telèfon, el WhatsApp i el correu | Captures 1440, 768, 390 i 320 |
| C03 | Selector compacte «Particulars · Espais i reparacions» / «Industrial · Empreses i obra». Empresa opcional i només a Industrial. Fora el camp `peca` duplicat. Unitats, material, termini, sector i població dins un `<details>` opcional. Adjunt en una franja | 18/18 proves funcionals |
| C04 | «On som»: títol funcional, adreça, text d'àrea i mapa de 280 px (escriptori) i 200 px (mòbil), que es carrega només en prémer el botó | Cap petició a Google abans de l'acció |

`CLAUDE.md` deixa de dir que no hi ha aplicació Astro i actualitza l'eslògan i les superfícies, sense reescriure el contracte.

## 3. Formulari: estat real de l'enviament

**El formulari no envia.** `src/scripts/contact-form.ts` valida al navegador i, amb les dades correctes, mostra «La consulta no s'ha enviat: el formulari encara no està actiu. Escriu-nos per WhatsApp o truca al 630 661 908.». No fa cap petició. Sense JavaScript, el botó queda desactivat i el telèfon, el WhatsApp i el correu són a la columna de contacte. No s'ha afegit cap servei d'enviament (§10.7). Continua pendent la tasca 8.5 de la Fase 8: backend, validació al servidor i prova d'enviament real.

Contractes comprovats: `?tipus=empresa`, `?tipus=particular&servei=…`, preselecció d'Industrial pel *referrer*, canvi de camí que conserva les dades escrites i desactiva els camps de l'altra branca, errors vinculats amb `aria-invalid`, focus al primer error, estat accessible, correu incorrecte, adjunt, desplegable amb teclat, consentiment obligatori, comunicacions comercials desmarcades i comportament sense JavaScript.

## 4. Verificació

- `npm run verify`: 0 errors, 0 avisos, 0 suggeriments; referències intactes respecte a `5e0ffc9`.
- `npm run check:links`: 13 pàgines, 354 enllaços interns, tots els destins resolen.
- `npm run check:redirects`: 13 regles llestes, sense errors.
- axe-core 4.10 a 13 rutes, a 1440 i 390 px: 0 infraccions.
- Inventari tipogràfic i de desbordament a 13 rutes × 4 amplades: 0 desbordaments.
- Teclat: focus bordeus de 3 px sobre fons clar i plata o blanc sobre grafit; el menú mòbil s'obre, rep el focus i es tanca amb Esc, tant a la Home com a Industrial.
- SEO: un H1 per pàgina publicada, canonical i `noindex` sense canvis, redireccions intactes. Les legals ja tenien un segon H1 ocult abans d'aquest encàrrec (informe, Part D).

## 5. Pendents per al director o el client

1. ~~Validar les propostes de reescriptura~~: aplicades el 06/10/2026 segons la [valoració del revisor](FASE7-valoracio-propostes-editorials.md); detall a l'[informe editorial](FASE7-revisio-editorial-refinament.md), Part E.
2. Confirmar l'adreça: 59 o 59-61.
3. Si es reactiva `/industrial/series-curtes/`: adaptar el contingut i decidir-ne la URL i la redirecció.
4. ~~Segon H1 ocult de les pàgines legals~~: corregit el 06/10/2026 (un sol H1, ancoratges intactes).
5. Backend del formulari (Fase 8, tasca 8.5).
6. Publicar quan el director ho indiqui. Els crèdits de producció de Netlify estaven esgotats el 06/10/2026.


## 6. Ajustos del director després de la previsualització (06/10/2026)

- **Titular de marca de la Home:** recupera la mida de la maqueta validada (`clamp(4.1rem, 7.1vw, 7.4rem)`, subtítol inclòs). És l'únic titular que no segueix la nova escala.
- **To de la Home i Particulars:** el director demana pujar el to «com el #808080». Aquest gris com a fons no arriba al contrast mínim (text fosc 3,9:1, blanc 3,95:1, bordeus 2,8:1). Per això es fa servir un gris neutre més marcat, sense el matís verdós anterior: superfície `#c6c8c7`, blanc trencat `#dfe0df`, text secundari `#434a47` i línies `#a6aaa8` / `#7f8482`. axe-core: 0 infraccions.
- **Xifres i taller (Home):** formen un sol bloc del mateix to, sense el filet de separació.
- **«La sèrie comença amb una peça»:** la mateixa estètica que «Soldem / Muntem» de Capacitats. Fotografia a tot el fons, titular, frase i acció a l'esquerra, i el mètode en un panell translúcid a la dreta. Fa 460 px a 1440 (la de Capacitats, 338) i conserva la mateixa animació, amb els quatre passos encesos amb el bloc a la pantalla.
- **Identitat, sense canviar l'estructura:**
  - un filet curt sobre els titulars de secció (bordeus a Serralleria, reflex metàl·lic a Industrial);
  - el logotip en marca d'aigua a l'espai lliure de l'entrada de la Home, ocult a mòbil;
  - un filet a l'etiqueta de cada camí del doble accés (bordeus i plata);
  - una vora superior de 3 px al peu, en el color de la branca;
  - una vora superior bordeus al formulari de Contacte, com a la referència del client.
