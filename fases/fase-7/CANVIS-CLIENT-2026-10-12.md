# Canvis del client · Reparacions, decoradors i manteniment industrial

**Data:** 12/10/2026  
**Destinatari:** Claude, responsable de la implementació.  
**Origen:** reunió del director amb el client i instruccions posteriors.  
**Lliurable actual:** especificació d’implementació. Aquest document no modifica la web.

## 1. Objectiu i abast

Implementar quatre canvis coordinats en català i castellà:

1. Eliminar el protagonisme i la denominació pública «Urgències / Urgencias» i presentar el servei com a **Reparacions / Reparaciones**.
2. Retirar **Tecnologies duals / Tecnologías duales** de l’oferta industrial publicada.
3. Fer explícit que el mobiliari metàl·lic a mida també s’adreça a **decoradors**, sense excloure els particulars.
4. Incorporar una secció destacada de **manteniment industrial**, integrada en la pàgina Industrial.

Les instruccions del client són decisions. Els textos i la composició d’aquest document són la proposta concreta per executar-les i presentar-ne el resultat a revisió. No afegir serveis, garanties o dades que el client no hagi confirmat.

### Preservar

- Disseny general, tipografia, paleta vigent i diferenciació entre Particulars i Industrial.
- Fotografies actuals definitives. Només es retira de la composició la imatge del sector eliminat; no se substitueixen les altres ni es generen fotografies noves.
- Textos legals i dades de l’empresa.
- Funcionalitat i proteccions del formulari. Continuarà en demostració fins a l’autorització d’enviaments reals.
- `noindex` de la previsualització i estat d’aprovació dels continguts no afectats.
- Absència de ratlles decoratives sobre els titulars i de separadors excessius en mòbil.

**Abast de publicació:** preparar codi, proves i diff per revisar. Aquest document no autoritza DNS, producció, enviaments reals ni un desplegament. No fer commit o push sense una instrucció posterior del director.

## 2. Reparacions en lloc d’urgències

### 2.1 Nomenclatura pública

Substituir «Urgències», «Urgències i reparacions», «Veure urgències» i equivalents castellans per:

| Ús | Català | Castellà |
|---|---|---|
| Navegació i servei del formulari | Reparacions | Reparaciones |
| Enllaç al servei | Veure reparacions | Ver reparaciones |
| Nom descriptiu llarg, quan calgui | Reparació de portes i automatismes | Reparación de puertas y automatismos |

Revisar capçalera, menú mòbil, footer, navegació de Particulars, targetes de Home i Particulars, pàgina del servei, enllaços des d’Automatismes, molles de pa, formulari, WhatsApp preemplenat, metadades i noms accessibles.

Revisar també els missatges del formulari que diguin «Si és urgent / Si es urgente»: substituir-los per una alternativa neutra com «També pots trucar al 630 661 908 / También puedes llamar al 630 661 908», sense canviar el significat de les confirmacions d’enviament o demostració.

No fer una substitució cega en documents històrics ni textos legals. Poden mantenir-se identificadors interns antics quan preservin compatibilitat; no s’han de renderitzar com a etiquetes comercials.

### 2.2 Conservar el banner de la captura

El client vol conservar el banner actual de Particulars:

- Títol: **Tens una avaria?**
- Text: **Si falla una porta o un automatisme, truca’ns i explica’ns què ha passat. Atenció de dilluns a divendres, de 8 a 13 h i de 15 a 18 h.**
- Acció secundària: **Formulari de contacte**.
- Acció principal: **Truca al 630 661 908** → `tel:+34630661908`.

Conservar-ne composició, fons gris, botó bordeus, horari i versió mòbil. No introduir-hi la paraula «urgències» ni promeses d’immediatesa o disponibilitat permanent.

En castellà mantenir la versió equivalent vigent: «¿Tienes una avería?», amb el mateix horari i les mateixes accions. La redundància que demana corregir el client correspon a la introducció de la pàgina Reparacions, no a aquest banner.

### 2.3 Introducció de la pàgina Reparacions

Text català actual a `content/ca/particulars-urgencies.md`:

> Si una porta, una persiana o un motor ha deixat de funcionar, truca'ns i explica'ns què ha passat i on és la instal·lació. Treballem sobretot a Vilafranca del Penedès i la rodalia.

**Substituir-lo per:**

> Reparacions de portes, persianes i automatismes a Vilafranca del Penedès i la rodalia. Contacta amb nosaltres per valorar la intervenció.

**Castellà:**

> Reparaciones de puertas, persianas y automatismos en Vilafranca del Penedès y alrededores. Contacta con nosotros para valorar la intervención.

Conservar el titular específic existent, els canals de contacte i la informació útil per valorar una reparació. No repetir a la introducció l’explicació que una avaria significa que alguna cosa no funciona.

En el bloc de dades per contactar, proposar una formulació més directa:

| Català | Castellà |
|---|---|
| Element · Porta, persiana o motor. | Elemento · Puerta, persiana o motor. |
| Incidència · Descriu el problema. | Incidencia · Describe el problema. |
| Ubicació · Municipi i lloc de la instal·lació. | Ubicación · Municipio y lugar de la instalación. |

Conservar «Si pots, adjunta una fotografia / Si puedes, adjunta una fotografía».

### 2.4 Rutes i compatibilitat

Per coherència amb la denominació pública, implementar:

| Ruta antiga | Nova ruta | Resposta antiga |
|---|---|---|
| `/particulars/urgencies/` | `/particulars/reparacions/` | 301 directe |
| `/es/particulares/urgencias/` | `/es/particulares/reparaciones/` | 301 directe |

- Actualitzar els enllaços interns perquè vagin directament a les rutes noves.
- Actualitzar ruta del contingut, pàgines Astro, configuració, canonical, equivalents d’idioma, molles de pa i sitemap quan pertoqui segons l’estat d’indexació.
- No deixar dues pàgines equivalents amb resposta 200.
- Conservar compatibilitat amb `servei=urgencies` dels enllaços antics del formulari. Es pot mantenir aquest valor intern amb l’etiqueta «Reparacions», sense exposar-lo al text visible. No cal reanomenar tots els `pageId`, fitxers d’imatge o claus internes.
- Si es canvia l’àncora actual `#urgencies` del banner, mantenir una àncora de compatibilitat perquè els enllaços existents continuïn funcionant.

## 3. Retirar Tecnologies duals

Eliminar la targeta «Tecnologies duals / Tecnologías duales», la seva imatge de la secció i la menció als paràgrafs, metadades i llistes d’oferta actuals.

Queden quatre sectors:

| Català | Castellà |
|---|---|
| Alimentació | Alimentación |
| Sanitari | Sanitario |
| Packaging | Packaging |
| Cellers | Bodegas |

Canviar el titular a **«Experiència en quatre sectors» / «Experiencia en cuatro sectores»**. Revisar igualment noms accessibles, numeració i qualsevol referència al nombre cinc.

**Composició:** quatre columnes equilibrades a escriptori, dues quan l’amplada ho exigeixi i una en mòbil estret si dues comprometen la llegibilitat. Reutilitzar el tractament fotogràfic i l’enquadrament actuals; evitar espais buits, targetes estirades o noves retallades agressives.

Revisar `content/ca/industrial-sectors.md`, que pot continuar com a document d’una ruta ajornada, perquè no reintrodueixi el sector en el futur. Conservar els documents històrics com a registre, anotant la decisió actual on correspongui. No esborrar físicament l’arxiu fotogràfic si no cal; retirar-ne imports i ús si queda sense referències.

No substituir Tecnologies duals per Manteniment: el manteniment és un servei transversal, no un cinquè sector.

## 4. Mobiliari a mida també per a decoradors

### 4.1 Missatge

Fer visible aquest públic a les superfícies on es consulta mobiliari. No n’hi ha prou amb una metadescripció o amb un document d’una pàgina ajornada.

**Targeta de mobiliari a la Home:**

- Títol: **Mobiliari a mida**.
- Subtítol: **Per a particulars i decoradors**.
- ES: **Mobiliario a medida · Para particulares y decoradores**.

Si l’espai és limitat, substituir el subtítol actual «Ferro i inoxidable» per aquest públic. Els materials continuen explicats al text de Particulars; no afegir tres línies de subtítol sobre la fotografia.

**Bloc Mobiliari de Particulars, text proposat:**

> Fabriquem mobiliari amb estructura de ferro o inoxidable a mida de l’ús i de l’espai. Treballem tant per a particulars com per a decoradors que busquen peces metàl·liques per als seus projectes.

**Castellà:**

> Fabricamos mobiliario con estructura de hierro o acero inoxidable a medida del uso y del espacio. Trabajamos tanto para particulares como para decoradores que buscan piezas metálicas para sus proyectos.

**CTA:** «Consulta el teu mobiliari a mida / Consulta tu mobiliario a medida», amb la preselecció de mobiliari existent.

### 4.2 Coherència dels dos camins

- Un decorador que busca mobiliari per a un espai concret ha de trobar resposta a Particulars.
- Industrial continua atenent fabricació per a empreses, sèries, peces tècniques i projectes d’obra. No redefinir Industrial exclusivament pel nombre d’unitats: també fa encàrrecs unitaris.
- No introduir un tercer camí a la Home ni sobrecarregar la franja «Com triar el camí» amb més professions.
- Conservar la destinació actual de mobiliari al formulari; no crear una pàgina específica o galeria nova com a efecte col·lateral.
- Actualitzar el contingut de referència de mobiliari ajornat perquè reflecteixi el mateix públic quan es reprengui.
- No prometre disseny d’interiors, assessorament decoratiu, muntatge de fusta o altres serveis no confirmats.

## 5. Nova secció destacada de manteniment industrial

### 5.1 Direcció escollida

**Una franja editorial ampla, clara i amb pes tipogràfic**, dins del llenguatge visual d’Industrial. Ha de mostrar que es pot contactar per manteniment, a més de fabricació.

Ubicació: **immediatament després de «Què fabriquem» i abans d’«El taller en primer pla»**. És un servei prioritari, no una nota al final ni una sisena targeta de producte.

Àncora comuna als dos idiomes: `#manteniment`, coherent amb el sistema actual d’àncores compartides. Afegir «Manteniment / Mantenimiento» a la navegació interna d’Industrial si n’hi ha, sense desbordaments ni canvis a la navegació global.

### 5.2 Textos proposats

| Element | Català | Castellà |
|---|---|---|
| Etiqueta petita | SERVEI PER A EMPRESES | SERVICIO PARA EMPRESAS |
| H2 | Manteniment industrial | Mantenimiento industrial |
| Cos | També ens encarreguem del manteniment en l’àmbit industrial. Explica’ns què cal revisar o reparar i on s’ha de fer la intervenció. | También nos encargamos del mantenimiento en el ámbito industrial. Cuéntanos qué hay que revisar o reparar y dónde debe realizarse la intervención. |
| Acció principal | Consulta un manteniment | Consulta un mantenimiento |
| Acció secundària | Truca al 630 661 908 | Llama al 630 661 908 |

La redacció és deliberadament general perquè el client ha confirmat el servei, però encara no el catàleg exacte d’intervencions. No afegir llistes de maquinària, electricitat, hidràulica, pneumàtica, manteniment normatiu, contractes periòdics, cobertura 24 h, intervenció immediata o reducció garantida d’aturades.

Els detalls d’abast es poden ampliar després amb informació del client; la secció es pot implementar ara amb aquest text.

### 5.3 Composició visual

**Escriptori:**

- Superfície de gris clar de la paleta actual d’Industrial, amb text grafit. Reutilitzar tokens vigents, no els colors de documents antics que hagin quedat superats.
- Amplada exterior de secció completa; contingut dins de `section-shell`.
- Dues columnes aproximadament 55/45: etiqueta i titular a l’esquerra; explicació i accions a la dreta, alineades amb el mateix marge superior.
- Titular a l’escala dels H2 industrials. Pot ocupar dues línies naturals: «Manteniment» i «industrial». No forçar una sola línia ni reduir la lletra per encabir-la.
- Padding vertical orientatiu de 56–72 px, ajustat al ritme real. Ha de respirar sense convertir-se en una segona portada de pantalla completa.
- Acció principal amb el tractament industrial fosc sobre clar i text blanc; secundària de trucada com a enllaç amb fletxa. Mantenir el llenguatge gris/acer propi d’Industrial.
- Sense fotografia nova, marc exterior, icones d’alarma, fons bordeus dominant, degradats nous ni ratlla sobre el titular. El protagonisme prové de la posició, el contrast i la tipografia.
- Si les seccions contigües comparteixen exactament la mateixa superfície, seleccionar un altre to ja existent de la paleta industrial i comprovar el contrast. No canviar tota la pàgina.

**Mòbil:**

- Una columna: etiqueta, titular, text i accions.
- Padding vertical orientatiu de 32–40 px i marges laterals del sistema.
- CTA principal fàcil de tocar, secundari separat amb espai suficient; àrees tàctils de 44 px mínim.
- Sense separadors horitzontals decoratius ni desplaçament horitzontal.
- Cap element essencial depèn del hover o d’una animació. Reutilitzar només moviment existent i respectar moviment reduït.

**Esquema de jerarquia, no maqueta literal:**

```text
┌─────────────────────────────────────────────────────────────────┐
│ SERVEI PER A EMPRESES          També ens encarreguem del         │
│                               manteniment en l’àmbit industrial… │
│ MANTENIMENT                                                     │
│ INDUSTRIAL                    [Consulta un manteniment ↗]        │
│                               Truca al 630 661 908 ↗             │
└─────────────────────────────────────────────────────────────────┘
```

El contorn de l’esquema només indica l’àrea: no s’ha de dibuixar a la web.

### 5.4 Contacte i preselecció

- CTA CA: `/contacte/?tipus=empresa&servei=manteniment`.
- CTA ES: `/es/contacto/?tipus=empresa&servei=manteniment`.
- Mantenir el paràmetre públic `servei` que ja fa servir la preselecció; el camp Industrial enviat al backend és `producte` en la implementació actual. Comprovar aquest traspàs, no assumir que són el mateix nom.
- Afegir l’opció «Manteniment industrial / Mantenimiento industrial» amb valor `manteniment` al selector Industrial i a la llista permesa del servidor.
- Revisar l’etiqueta del selector: «Què cal fabricar?» deixa de cobrir totes les opcions. Proposta: **«Tipus d’encàrrec» / «Tipo de encargo»**. Fer coherents les etiquetes del formulari, els errors, el correu i les comprovacions de build.
- El manteniment no s’afegeix a les cinc targetes de «Què fabriquem»: aquestes continuen representant productes. Desacoblar les llistes si el codi les compara com si haguessin de ser idèntiques.
- Revisar les ajudes exclusivament orientades a fabricar: per a manteniment, no donar a entendre que cal un plànol, unitats o material obligatori. Les dades tècniques continuen opcionals.
- Conservar la selecció en canviar d’idioma i mostrar l’opció també sense JavaScript. No prometre preselecció per query en una pàgina estàtica sense JS si no s’ha implementat; l’usuari ha de poder seleccionar-la manualment.
- Telèfon: `tel:+34630661908`. No crear cap destinatari nou ni activar Microsoft Graph.

### 5.5 Ajust mínim de coherència a Industrial

- Afegir al resum d’oferta, en un lloc sense repeticions, la frase «També oferim manteniment industrial / También ofrecemos mantenimiento industrial».
- Revisar la crida final «Parlem de la peça»: canviar-la a **«Parlem del teu encàrrec» / «Hablemos de tu encargo»**, perquè també inclogui el manteniment.
- Revisar les ajudes de la crida final: «Què necessites», «Ubicació de la intervenció, si escau», «Documentació o fotografies, si en tens». Conservar les dades de fabricació útils com a opcionals, evitant fer obligatori un plànol.
- No repetir el banner a Home ni a Particulars en aquest bloc. No cal una pàgina nova de manteniment per implementar la petició.

## 6. Mapa de fitxers a revisar

Comprovar l’estat real abans d’editar; aquesta llista identifica punts localitzats el 12/10/2026.

| Àrea | Fitxers o carpetes |
|---|---|
| Textos CA/ES | `content/ca/particulars-urgencies.md`, `content/es/particulars-urgencies.md`, `content/{ca,es}/particulars.md`, `content/{ca,es}/home.md`, `content/{ca,es}/industrial.md`, `content/{ca,es}/particulars-automatismes.md` |
| Referències editorials | `content/ca/ui.md`, `content/ca/particulars-mobiliari.md`, `content/ca/industrial-sectors.md` |
| UI i navegació | `src/i18n/ui.ts`, components de capçalera i footer que consumeixen aquestes dades |
| Composició | `src/templates/IndustrialTemplate.astro`, `src/templates/industrial.css`, `src/templates/ParticularsTemplate.astro`, plantilla de servei i Home |
| Rutes | `src/pages/particulars/urgencies/index.astro`, `src/pages/es/particulares/urgencias/index.astro`, `src/config/routes.ts`, `src/config/redirects.mjs` |
| Imatges de sectors | `src/config/photography.ts` |
| Formulari | `src/lib/contact/config.ts`, `schema.ts`, `messages.ts`, `mail.ts`, `src/scripts/contact-form.ts`, `src/templates/ContactTemplate.astro` |
| Verificació | scripts de referències protegides, i18n, enllaços, redireccions i proves del formulari |

Els continguts Markdown són la font editorial. Les etiquetes d’interfície van al diccionari. No duplicar textos divergents ni introduir paràgrafs comercials directament a la plantilla quan el projecte els obté del Markdown.

## 7. Criteris d’acceptació i verificació

### Contingut

- Cap denominació comercial visible «Urgències / Urgencias» a les pàgines generades en CA/ES. Buscar també variants sense accent, singular i text de metadades. Documentar excepcions tècniques: rutes de redirecció, identificadors i paràmetres antics.
- Banner «Tens una avaria?» conservat, amb el mateix horari i trucada.
- Introducció de Reparacions substituïda en tots dos idiomes.
- Tecnologies duals eliminat de les superfícies actuals; quatre sectors i quatre imatges.
- Decoradors explícits a la targeta de mobiliari de Home i al bloc de Particulars.
- Manteniment industrial visible com a secció pròpia i accessible des del seu CTA.

### Funcionalitat

- Rutes noves amb resposta 200, rutes antigues amb 301 directe quan es provin en un entorn que executi les regles Netlify.
- Enllaços interns, canonical, selector d’idioma i sitemap coherents amb les noves rutes i l’estat d’indexació.
- Mobiliari continua preseleccionant mobiliari; manteniment preselecciona Industrial i el valor correcte.
- Servidor accepta `manteniment` només a Industrial i continua rebutjant valors inexistents o propietats heretades.
- Correu simulat descriu correctament «Manteniment industrial»; cap enviament real.
- Protecció de duplicats, límits d’adjunts, antispam i modes sense regressions.

### Visual

- Revisar Home, Particulars, Reparacions, Industrial i Contacte en català i castellà.
- Una passada visual agrupada a escriptori i mòbil (orientativament 1440 i 390 px), més comprovació de desbordament a 320 px.
- Verificar focus, contrast, noms accessibles, textos llargs castellans i accions tàctils.
- Manteniment destaca sense una pàgina industrial més fosca ni elements d’alarma.
- Quatre sectors equilibrats i fotografies restants conservades.

Executar `verify`, `check:i18n`, `check:links`, `check:redirects` i les proves de formulari afectades. Adaptar les expectatives al canvi legítim, sense eliminar comprovacions perquè fallin. Actualitzar les referències de contingut protegides amb l’abast exacte d’aquesta petició, mantenint els controls.

Separar sempre resultats locals, proves a Netlify i validacions pendents. No afirmar que una redirecció està verificada en viu només perquè existeix a `_redirects`.

## 8. Entrega de Claude

1. Resum dels quatre canvis i fitxers afectats.
2. Textos finals CA/ES i captures de la franja de manteniment en escriptori i mòbil.
3. Resultats de les comprovacions i qualsevol pendent concret.
4. Diff preparat per revisar, amb el formulari encara en demostració.

No ajornar el bloc sencer per manca de detall del catàleg de manteniment: implementar el missatge general aprovat pel director, sense inventar prestacions. Si una afirmació concreta necessita confirmació, deixar-la fora i explicar-ho a l’entrega.
