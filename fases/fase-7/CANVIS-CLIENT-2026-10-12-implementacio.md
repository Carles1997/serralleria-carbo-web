# Canvis del client del 12/10/2026 · Implementació

**Data:** 12/10/2026 · **Especificació:** [CANVIS-CLIENT-2026-10-12.md](CANVIS-CLIENT-2026-10-12.md)

**Estat:**
- Commit `bf6af34`, desplegat a `revisio-client` per ordre del director (12/10/2026; desplegament `6acd156faadcd952b80051a1`, sense producció).
- Resultats en viu al §5.1.
- El formulari continua en demostració: no s'ha enviat cap correu.
- No s'han modificat el DNS, la producció ni la indexació.

## 1. Canvis i fitxers

| Canvi | Fitxers |
|---|---|
| **Reparacions en lloc d'Urgències** | `content/{ca,es}/particulars-urgencies.md` (ruta, introducció i dades per contactar), `content/{ca,es}/home.md`, `content/{ca,es}/particulars.md`, `content/{ca,es}/particulars-automatismes.md`, `src/i18n/ui.ts` (menú de Particulars, ruta del servei i opció del formulari), `src/lib/contact/config.ts` (etiqueta del correu), `src/pages/particulars/reparacions/` i `src/pages/es/particulares/reparaciones/` (rutes mogudes), `src/config/redirects.mjs` (dues 301) |
| **Tecnologies duals retirat** | `content/{ca,es}/industrial.md` (titular i paràgraf), `src/i18n/ui.ts` (quatre sectors), `src/config/photography.ts` (sense la importació), `src/templates/IndustrialTemplate.astro` i `industrial.css` (quatre columnes; dues des de 1000 px; una sota 350 px), `content/ca/industrial-sectors.md` (document ajornat, amb nota de la decisió) |
| **Mobiliari també per a decoradors** | `content/{ca,es}/particulars.md` (text i acció), `src/i18n/ui.ts` (subtítol de la targeta de la Home), `content/ca/particulars-mobiliari.md` (document ajornat) |
| **Manteniment industrial** | `content/{ca,es}/industrial.md` (secció nova, frase al resum d'oferta i crida final), `src/i18n/ui.ts` (etiqueta, titular, navegació d'Industrial, crida final i formulari), `src/templates/IndustrialTemplate.astro`, `industrial.css`, `industrial-base.css` (reflex del titular sobre clar), `src/lib/contact/{config,messages,mail}.ts` |
| **Referències i proves** | `content/ca/ui.md`, `scripts/check-references.mjs` (revisió del 12/10/2026 amb l'abast exacte), `scripts/test-contact.mjs`, `scripts/qa/check-contact-form.py` |

## 2. Textos finals

| Element | Català | Castellà |
|---|---|---|
| **Navegació i servei del formulari** | Reparacions | Reparaciones |
| **Enllaç des d'Automatismes** | Veure reparacions | Ver reparaciones |
| **Introducció de Reparacions** | Reparacions de portes, persianes i automatismes a Vilafranca del Penedès i la rodalia. Contacta amb nosaltres per valorar la intervenció. | Reparaciones de puertas, persianas y automatismos en Vilafranca del Penedès y alrededores. Contacta con nosotros para valorar la intervención. |
| **Dades per contactar** | Element · Porta, persiana o motor. / Incidència · Descriu el problema. / Ubicació · Municipi i lloc de la instal·lació. | Elemento · Puerta, persiana o motor. / Incidencia · Describe el problema. / Ubicación · Municipio y lugar de la instalación. |
| **Sectors** | Experiència en quatre sectors · Alimentació, Sanitari, Packaging, Cellers | Experiencia en cuatro sectores · Alimentación, Sanitario, Packaging, Bodegas |
| **Targeta de la Home** | Mobiliari a mida · Per a particulars i decoradors | Mobiliario a medida · Para particulares y decoradores |
| **Bloc Mobiliari** | Text de l'especificació i «Consulta el teu mobiliari a mida» | Text de l'especificació i «Consulta tu mobiliario a medida» |
| **Manteniment** | SERVEI PER A EMPRESES · Manteniment industrial · text de l'especificació · Consulta un manteniment · Truca al 630 661 908 | SERVICIO PARA EMPRESAS · Mantenimiento industrial · texto de la especificación · Consulta un mantenimiento · Llama al 630 661 908 |
| **Resum d'oferta d'Industrial** | … També oferim manteniment industrial. | … También ofrecemos mantenimiento industrial. |
| **Crida final** | Parlem del teu encàrrec | Hablemos de tu encargo |
| **Selector d'Industrial** | Tipus d'encàrrec · Manteniment industrial (`manteniment`) | Tipo de encargo · Mantenimiento industrial |

El banner «Tens una avaria? / ¿Tienes una avería?» es conserva sense canvis.

**Propostes que no figuren literalment a l'especificació** (cal validar-les):
- **Ajudes de la crida final:** «Què necessites», «Ubicació de la intervenció, si escau» i «Documentació o fotografies, si en tens» són de l'especificació. El quart punt, «Material, unitats i termini, si escau», reuneix les dades de fabricació anteriors com a opcionals.
  - **Castellà:** «Qué necesitas», «Ubicación de la intervención, si procede», «Documentación o fotografías, si las tienes» i «Material, unidades y plazo, si procede».
- **Ajudes del formulari d'Industrial** (§5.4, perquè no s'adrecin només a la fabricació):
  - **Text d'ajuda de la descripció:** «Descriu la peça o el manteniment que necessites i els requisits que ja coneixes.» / «Describe la pieza o el mantenimiento que necesitas y los requisitos que ya conoces.»
  - **Etiqueta de l'adjunt:** «Plànol, documentació o fotografies» / «Plano, documentación o fotografías».
  - **Opció buida del selector:** «Selecciona una opció» / «Selecciona una opción».

## 3. Decisions de composició

- **Manteniment:**
  - **Posició:** entre «Què fabriquem» (grafit) i «El taller en primer pla» (`#d4d4d4`).
  - **Fons:** com que la secció següent ja és `#d4d4d4`, la franja fa servir el gris mitjà de la paleta, `#b3b3b3`, amb text grafit (contrast 6,7:1), tal com preveu el §5.3 de l'especificació.
  - **Disposició:** dues columnes 55/45 i padding de 59,5 px a 1440 px. Una columna i 32 px de padding a 390 px.
  - **Accions:** botó grafit amb text blanc (50–56 px d'alçada) i trucada com a enllaç amb fletxa (48 px), separats 20 px en mòbil.
  - **Sense:** fotografia, marc ni ratlla sobre el titular.
  - **Àncora:** `#manteniment`, la mateixa en tots dos idiomes.
- **Navegació d'Industrial:** «Manteniment / Mantenimiento» després de «Fabricació en sèrie». Hi cap en una sola fila des del punt de tall existent (1321 px), també a Capacitats en castellà, amb 8 enllaços.
- **Sectors:** quatre columnes a escriptori, dues entre 351 i 1000 px i una a 320 px. Les fotografies i l'enquadrament es conserven. La imatge de Tecnologies duals ja no s'importa, però el fitxer es conserva a `assets/`.

## 4. Excepcions tècniques (no visibles)

| Element | Motiu |
|---|---|
| **Identificadors** `pageId: particulars-urgencies`, fitxers `content/*/particulars-urgencies.md` i imatge `particulars-urgencies-hero-v1.png` | L'especificació permet conservar els identificadors interns |
| **Valor de formulari** `servei=urgencies` | Compatibilitat amb els enllaços antics. L'etiqueta visible és «Reparacions» |
| **Àncora** `#urgencies` del banner de Particulars i classe `p-urgent` | Compatibilitat amb els enllaços existents |
| **Clau** `routes.services.urgencies` i rol `urgent` de la plantilla de servei | Claus internes |
| **Origens de redirecció** `/particulars/urgencies/` i `/es/particulares/urgencias/` | 301 cap a les rutes noves |

**Observació:** a Automatismes, el titular de la secció d'avaries «Si el problema és ara» no forma part de l'especificació i no s'ha tocat. Si es vol evitar qualsevol idea d'immediatesa, caldria una decisió editorial.

## 5. Comprovacions (locals)

| Comprovació | Resultat |
|---|---|
| `npm run verify` (astro check, build i referències) | Correcte; referències intactes amb la revisió registrada |
| `check:i18n` | Correcte (25 pàgines) |
| `check:links` | Correcte (764 enllaços; sitemap de 4 URL, sense canvis) |
| `check:redirects` | 23 regles llestes, incloses les dues 301 noves |
| `npm run test:contact` | 57/57. Inclou: manteniment només a Industrial i sense dades de fabricació obligatòries; `urgencies` amb l'etiqueta Reparacions; propietats heretades rebutjades |
| `scripts/qa/check-contact-form.py` | 37/37. Inclou: manteniment preseleccionat i enviat al correu fals en català i castellà; selecció manual sense JavaScript |
| Selector d'idioma | 12/12 |
| **Cerca al text visible, metadades i noms accessibles** de les pàgines generades | Cap «Urgències / Urgencias / urgent» i cap «dual». Les úniques coincidències de «dual» són dins d'«individualitzades / individualizadas» als textos legals |
| **Desbordament horitzontal** a 1440, 390 i 320 px (Home, Particulars, Reparacions, Automatismes, Industrial i Contacte, en català i castellà) | 0 px a totes |

### 5.1 Comprovacions a `revisio-client` (12/10/2026)

| Comprovació | Resultat |
|---|---|
| `npm run check:redirects:live` | Totes correctes. `/particulars/urgencies/` i `/es/particulares/urgencias/`, amb barra final i sense, fan un sol salt 301 a les rutes noves, que responen 200 |
| Home, Particulars, Reparacions, Industrial i Contacte, en català i castellà | 200 i `X-Robots-Tag: noindex`; textos nous presents; cap «Urgències / Urgencias» ni «Tecnologies duals / Tecnologías duales» al text |
| Consulta de manteniment a Industrial (POST a la funció) | `200`, `state=dry-run`; cap correu |
| `manteniment` a Particulars | `400`, error al camp `servei` |
| Dades temporals de la prova | 2 entrades esborrades amb `netlify blobs:delete`; el magatzem ha quedat buit |

## 6. Pendents

- **Validació:** el director ha de validar les propostes del §2 i el to de la franja de manteniment.
- **Catàleg d'intervencions de manteniment:** el client encara l'ha de concretar. Fins aleshores, la secció només porta el text general.
- **Castellà:** continua pendent l'aprovació editorial de les traduccions castellanes.

## 7. Ajustos del director posteriors (12/10/2026)

Fets després del desplegament de `bf6af34`, **sense commit ni desplegament**:

| Indicació | Implementació |
|---|---|
| **Manteniment amb més protagonisme** | Primera secció d'Industrial, just després de les dades, abans de «Què fabriquem». Fons plata (`#d4d4d4`) entre dues franges grafit, titular més gran, frase, acció principal i trucada, i tres passos «Com funciona» en targetes blanques |
| **Text més clar** | Frase: «Ens encarreguem del manteniment en l'àmbit industrial: revisions i reparacions a les instal·lacions de la teva empresa.» Passos: «Ens ho expliques», «Ho valorem» i «Ens hi desplacem» («amb equip i vehicles propis», dada confirmada). Sense catàleg d'intervencions ni promeses de termini. **Proposta per validar** |
| **Retirar «També oferim manteniment industrial.»** | Retirada de «Què fabriquem» (CA i ES) |
| **Menys enllaços al formulari** | Retirats «Envia una consulta» (entrada), «Explica'ns el teu projecte» (franja de dades) i «Consultar una sèrie» (mètode), en els tres idiomes. A Industrial en queden 10: menú mòbil, manteniment, cinc cel·les de producte, «Envia una consulta tècnica», crida final i peu. Si es volen treure més, «Envia una consulta tècnica» és el més redundant amb les cel·les |
| **Barra de dalt idèntica a totes les pàgines** | `SiteHeader` fa servir sempre `ui.home.nav`: Particulars, Industrial, Serveis i Projectes («Projectes particulars» → «Projectes»), i Contacte al menú mòbil. La branca de la pàgina queda marcada (`aria-current`). Es retiren les navegacions de branca de la capçalera i els seus punts de plegat (tot es plega a 1000 px). Les navegacions de Particulars es conserven per a les molles de pa i les etiquetes dels casos |
| **Anglès** | Versió completa a `/en/`: 13 pàgines, sis casos, textos legals (en revisió jurídica, amb avís i noindex) i formulari (missatges, pàgina sense JavaScript i idioma al correu). Slugs de [FASE5-idiomes](../fase-5/FASE5-idiomes.md). Particulars es diu «Residential» |
| **Desplegable d'idioma** | `<details>` accessible (funciona sense JavaScript). Codi de l'idioma actual i fletxa; llista fixa Català, Castellano, English amb l'actual marcat. Es tanca amb Escape (el focus torna al botó) o amb un clic a fora. Conserva els paràmetres i les àncores en canviar d'idioma |

**Comprovacions (locals):**
- **Verificació:** `astro check` sense errors; build correcte; referències intactes, amb la revisió nova registrada (`industrial.md` i `ui.md`).
- **Idiomes:** `check:i18n` correcte amb 38 pàgines (ca 12 · es 13 · en 13), selectors recíprocs i textos alternatius traduïts.
- **Enllaços i redireccions:** `check:links` correcte (39 pàgines i 1.086 enllaços). `check:redirects` correcte, amb la 404 anglesa per a `/en/*`.
- **Formulari:** 58 proves unitàries (inclou l'anglès) i 37 de navegador.
- **Selector d'idioma:** 15/15. Inclou el desplegable, l'ordre fix, Escape, el clic a fora i el pas de català a anglès conservant el manteniment preseleccionat.
- **Barra de dalt:** una sola variant per idioma a totes les pàgines.
- **Desbordament:** cap a 1440, 1024, 390 i 320 px. A 320 px, el desplegable queda dins de la pantalla.

**Pendents:**
- aprovació editorial de les traduccions angleses;
- validació jurídica dels textos legals anglesos, inclosa la paraula clau UNSUBSCRIBE per revocar les comunicacions;
- validació del text nou del manteniment;
- decisió sobre la resta d'enllaços al formulari.

## 8. Redisseny del manteniment i alineació del mètode (director, 13/10/2026)

Indicació: el bloc de text de «La sèrie comença amb una peça» ha de quedar centrat amb la caixa del mètode, i el manteniment necessita una proposta més elegant i professional, sense targetes grans i amb un contingut més clar. **Sense commit ni desplegament.**

| Element | Implementació |
|---|---|
| **Mètode de la sèrie** | El bloc del titular passa de `align-self:end` a `center`; en escriptori queda centrat verticalment amb la caixa (desviació 0 px a 1440 px) |
| **Composició del manteniment** | Fitxa en dues columnes sobre plata clara: a l'esquerra, etiqueta, titular (una mica més contingut), frase i accions; a la dreta, tres línies breus en una llista de definicions (`<dl>`), separades per filets fins i centrades amb el bloc de l'esquerra. Sense targetes, números grans ni el títol «Com funciona». Per sota de 1000 px, cada etiqueta queda sobre el seu text; fins a 760 px, una columna sense filets horitzontals (`mobile-lines.css`) |
| **Contingut (proposta per validar)** | Frase: «A més de fabricar, també fem el manteniment en l'àmbit industrial.» Fitxa: **Què fem** · Revisions i reparacions a les instal·lacions de la teva empresa. **On** · Ens desplacem fins a la instal·lació, amb equip i vehicles propis. **Com començar** · Explica'ns què cal revisar o reparar i on és. Si en tens, envia'ns fotografies. Equivalents en castellà i anglès. Només fa servir dades ja confirmades; sense catàleg d'intervencions, terminis ni zona de servei |
| **Alçada** | La secció passa a 440 px a 1440 px (abans, amb les targetes, era molt més alta) |

**Comprovacions (locals):**
- **Verificació:** `astro check` sense errors; build correcte; referències intactes, amb la revisió nova registrada per a `content/ca/industrial.md`.
- **Idiomes i enllaços:** `check:i18n` (38 pàgines) i `check:links` (39 pàgines, 1.086 enllaços) correctes.
- **Selector d'idioma:** el test continua passant, inclòs el pas al formulari anglès amb el manteniment preseleccionat.
- **Lectura i desbordament:** revisió visual a 1440, 768, 390 i 320 px (català i anglès), sense desbordament horitzontal.

**Pendent:** validació del text nou del manteniment en els tres idiomes.

## 9. Sèries curtes i mitjanes, telèfon fix, Contacte i selector d'idioma (director, 13/10/2026)

Fet després del desplegament de `9b9ba77`, **sense commit ni desplegament**.

| Indicació | Implementació |
|---|---|
| **«Sèries curtes i mitjanes» en comptes de «Fabricació en sèrie»** | Lema de la Home i H1 d'Industrial: «Sèries curtes i mitjanes. Peces exigents. Resposta industrial.» (ES «Series cortas y medianas…», EN «Short and medium runs…»). També a la crida final d'Industrial i a la nota d'àmbit de Contacte. Es mantenen les mencions genèriques («en sèrie o a mida», «sèries»). **Discrepància resolta:** CLAUDE.md fixava «Fabricació en sèrie» (06/10/2026); preval la indicació del director i s'hi actualitza |
| **Telèfon fix com a principal** | `company.phone` passa a ser el fix 93 890 27 94: capçalera, blocs de contacte, Particulars, serveis, Reparacions, Industrial, Capacitats, missatges del formulari i dades estructurades. Coincideix amb el Perfil d'Empresa de Google |
| **Mòbil només com a secundari** | `company.mobile` (630 661 908) només es mostra a la pàgina de contacte, a la fila «Mòbil». WhatsApp continua obrint el mòbil sense mostrar-ne el número. Les dades estructurades el mantenen com a segon punt de contacte |
| **Contacte a la barra de dalt** | Afegit al costat de Projectes en els tres idiomes, amb la pàgina actual marcada; el menú mòbil ja no necessita l'enllaç extra. Hi cap sense salts de línia de 1001 a 1440 px |
| **Selector d'idioma més subtil** | El panell té l'amplada del botó i només mostra CA, ES i EN. El nom sencer de cada idioma queda per als lectors de pantalla, i l'actual surt en bordeus (gris clar a Industrial). Opcions de 36 px d'alçada. Funciona igual sense JavaScript, amb Escape i amb un clic a fora |

**Comprovacions (locals):**
- **Verificació:** `astro check` sense errors; build correcte; referències intactes, amb la revisió nova registrada (`contacte.md`, `home.md`, `industrial.md`, `particulars-urgencies.md` i `ui.md`).
- **Idiomes i enllaços:** `check:i18n` correcte; `check:links` correcte (39 pàgines i 1.124 enllaços).
- **Formulari:** 58 proves unitàries i 37 de navegador.
- **Selector d'idioma:** 15/15; la prova 10 ara comprova els codis, els noms accessibles i l'idioma actual.
- **Mòbil:** el número només apareix a `/contacte/`, `/es/contacto/` i `/en/contact/`.
- **Lectura:** capçalera a 1440, 1100, 1001, 768, 390 i 320 px, sense desbordament. A 320 px, la primera línia del lema ocupa dues línies.

**Confirmat pel director (13/10/2026):** el fix atén les urgències de Reparacions, i WhatsApp es queda al mòbil.

## 10. Manteniment més compacte i entrada animada de la fitxa (director, 13/10/2026)

- **Menys espai:** menys marge vertical, titular una mica més petit i files més juntes. La secció passa de 440 a 391 px d'alçada a 1440 px, i de ~550 a 403 px a 1880 px.
- **Entrada de la fitxa:** cada filet es dibuixa d'esquerra a dreta, escalonat 140 ms per fila. Just darrere, l'etiqueta i el text apareixen amb un lliscament de 0,6 rem en la mateixa direcció. L'entrada es fa un sol cop i dura uns 1,1 s en total.
  - Els filets passen a ser pseudoelements perquè es puguin animar.
  - Amb moviment reduït o sense JavaScript, tot queda visible i fix.
  - En mòbil no hi ha filets; només apareix el text.
- **Formulari:** es manté la informació bàsica de protecció de dades. És la primera capa que exigeix l'art. 11 de la LOPDGDD i és el redactat de l'advocat del client. Retirar-la o escurçar-la necessita la conformitat de l'advocat.
  - **Més discreta (director, 13/10/2026), sense canviar el text:** lletra petita (0,75 rem), sagnada sota la casella i en grafit translúcid (contrast 5,3:1). També la nota de revocació.

**Comprovacions:**
- **Verificació:** `astro check` sense errors i referències intactes.
- **Enllaços:** `check:links` correcte.
- **Formulari:** 58 proves unitàries i 37 de navegador.
- **Selector d'idioma:** 15/15.
- **Animació:** fotogrames de l'entrada revisats a 1440 px; lectura a 1880, 1440, 390 i 320 px, sense desbordament.
