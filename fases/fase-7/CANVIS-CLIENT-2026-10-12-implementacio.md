# Canvis del client del 12/10/2026 · Implementació

**Data:** 12/10/2026 · **Especificació:** [CANVIS-CLIENT-2026-10-12.md](CANVIS-CLIENT-2026-10-12.md)

**Estat:**
- Implementat en local i preparat per revisar.
- Sense commit ni desplegament.
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

## 6. Pendents

- **Redireccions en viu:** les 301 són a `dist/_redirects`, però **no s'han comprovat en viu**. Cal executar `npm run check:redirects:live` després d'un desplegament autoritzat a `revisio-client`.
- **Validació:** el director ha de validar les propostes del §2 i el to de la franja de manteniment.
- **Catàleg d'intervencions de manteniment:** el client encara l'ha de concretar. Fins aleshores, la secció només porta el text general.
- **Castellà:** continua pendent l'aprovació editorial de les traduccions castellanes.
