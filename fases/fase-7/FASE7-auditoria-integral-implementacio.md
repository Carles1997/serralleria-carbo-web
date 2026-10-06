# Implementació de l’auditoria integral

**Data:** 06/10/2026

**Autorització:** el director demana implementar les millores de l’auditoria, eliminar els filets sobre els titulars i fer commit i push.

**Branca:** `fase-7/qa`.

Referència: [auditoria de l’estat anterior](FASE7-auditoria-integral-web-actual-2026-10-06.md).

## Canvis aplicats

| Punt | Implementació |
| --- | --- |
| Filets dels titulars | Eliminats els pseudo-elements decoratius dels H2 de totes les famílies i els filets de les etiquetes dels dos camins de Home. També eliminada la vora decorativa del titular fotogràfic de maquinària. Es mantenen els separadors de dades, estats de focus i línies funcionals de progrés. |
| A01 · Reflex metàl·lic | La variant fosca s’aplica només als H2 sobre superfícies clares. Les targetes fotogràfiques conserven el reflex clar. Augmentada la llum de la part més fosca del reflex clar; conservat el marge de pintura per als glifs. «Inoxidable» i «De soldadura» es llegeixen sobre les fotos. |
| A02 · Mòbil | Productes i quatre fotografies del taller industrial passen a dues columnes a 390 px. La peça tècnica final ocupa tota la fila. A 320 px aquests blocs tornen a una columna per conservar lectura. Serveis de Particulars a 390 px: dues columnes amb fotografia separada del text; a 320 px, una columna. El cinquè sector industrial és una targeta horitzontal. |
| A03 · Industrial i Capacitats | Industrial presenta un resum de taller sense repetir-hi tota la fitxa de materials i processos. La informació de suport tècnic i millores ISO continua disponible en un desplegable amb l’avís explícit que no són certificacions vigents. Capacitats concentra materials, processos, equips i logística; la preparació de la consulta queda al costat de la nota sobre dimensions, gruixos i toleràncies, amb accés directe al formulari. La informació no es repeteix al tancament. Portada de Capacitats més curta. |
| A04 · Textos dels serveis | Pont editorial propi per a Estructures i Automatismes, derivat del Markdown de cada servei. Eliminada la frase «Aquest servei també el fabriquem en sèrie». No es suggereix fabricació de motors. |
| A05 · Identitat i ritme | Home conserva el titular de marca gran i els grisos aprovats. Les dades de confiança formen una franja compacta; el taller té una fotografia més ampla i superfície blanca de lectura. L’accés de Particulars conserva color natural. Particulars té serveis sobre blanc i capítols de treballs sobre blanc; tractament fotogràfic menys desaturat. El bordeus continua sent `#7c2a30`, sense nova paleta. |
| A06 · Contacte | Horari resumit al costat del telèfon en mòbil i tauleta. Avís de demostració abans dels camps, vinculat al botó d’enviament. Vies directes amb alçada mínima de 44 px. Informació legal íntegra, amb menys pes de fons i contorn. |
| A07 · Blocs secundaris | Els serveis relacionats sense paràgraf passen a una franja compacta; mantenen titular i destinació. El text secundari de reparacions deixa de tenir escala de titular gran. Es conserven accions directes i contacte final. |

No s’han afegit dependències ni noves rutes. La marca, les dades confirmades, els casos, el logo a la roba, els textos legals i les interaccions aprovades es conserven. Els mockups congelats i `design/` no s’han modificat.

## Separació de funcions

- **Home:** orientació entre públics, confiança, oferta i contacte.
- **Particulars:** serveis per a habitatges, comunitats i negocis; instal·lació, treball a mida i reparació.
- **Industrial:** fabricació per a empreses i obra, en sèrie o a mida, incloent encàrrecs industrials unitaris.
- **Capacitats:** materials, maquinària, soldadura, logística i documentació per valorar una feina. No introdueix rangs o especificacions sense confirmar.

Les operacions «Plegat», «Tall» i «Punxonat» expliquen la funció de les tres màquines ja confirmades; no afegeixen marques, models ni capacitats dimensionals.

## Mesures abans i després

Alçades totals de document, amb Chrome a 390 × 844 px; els números serveixen per comparar la composició, no per certificar conversió.

| Pàgina | Abans | Després |
| --- | ---: | ---: |
| Home | 3.825 px | 3.676 px |
| Particulars | 4.612 px | 4.277 px |
| Industrial | 6.247 px | 5.347 px |
| Capacitats | 3.345 px | 3.290 px |
| Contacte | 2.976 px | 3.068 px |

Industrial redueix uns 900 px, aproximadament un 14 %. Contacte incorpora més informació abans del formulari perquè ningú escrigui sense saber que és una demostració; l’avís és temporal i s’ha de retirar quan el backend funcioni. Es prioritza aquesta claredat sobre una reducció artificial de l’alçada.

A 1440 px, Home passa de 2.858 a 2.616 px; es conserva el titular de marca i s’evita que les dades de confiança competeixin amb les seccions principals.

## Verificació executada

- `npm run verify`: 48 fitxers comprovats, 0 errors, 0 avisos i 0 suggeriments; build correcte. Referències estrictes intactes: 96 fitxers i 26 continguts contrastats amb la base. Les quatre revisions editorials autoritzades tenen empremta registrada, sense canviar la base de protecció.
- `npm run check:links`: 13 pàgines, 355 enllaços interns, tots els destins resolen.
- `npm run check:redirects`: 13 regles llestes sense errors; es mantenen les dues traduccions i tres decisions ja pendents.
- Primera passada: 13 rutes × quatre amplades (1440, 768, 390 i 320), sense desbordament horitzontal ni titular fora de pantalla; un H1 per ruta.
- Confirmació específica final: vuit rutes afectades × quatre amplades, 32 comprovacions amb assercions. Sense filets sobre titulars, text de targetes sense retall, variant metàl·lica correcta, desplegable industrial accessible amb teclat i avís del formulari abans dels camps.
- Captures definitives amb fotografies carregades; revisió visual de Home, Particulars, Industrial, Capacitats i Contacte.
- Menú: focus visible, `aria-expanded` i tancament amb Esc.
- Formulari: preselecció Empresa des de Capacitats, servei via URL, dades conservades en canviar de branca, focus al primer error i informació de no enviament amb dades vàlides.
- Filtres de projectes a 1440 i 390 px: 2 automatismes, 3 estructures i 5 casos en total; URL i missatge accessible coherents.
- Animació dels casos: cada capítol centrat a la zona de lectura activa la fotografia corresponent a 1440 i 390 px. El mètode industrial descobreix els quatre passos. Moviment reduït conserva el contingut; sense JavaScript es mantenen les vies directes i el formulari no simula un enviament.
- `git diff --check`: sense errors d’espaiat.

Límits: proves amb Chrome automatitzat, sense dispositiu tàctil físic, lector de pantalla, Safari/iOS ni nova passada independent d’axe-core. No equivalen a una certificació completa d’accessibilitat.

## Pendents de la fase de publicació

El formulari **continua sense backend**; l’avís de demostració és explícit i no s’ha inventat cap estat d’èxit. L’activació de correus i adjunts, CSP i capçaleres reals del hosting, adreça definitiva, indexació comercial, traduccions i decisions de redirecció són els pendents coneguts de les fases següents. No formen part d’aquest refinament de disseny.

El push és a la branca de treball. Aquest encàrrec no inclou fusionar-la amb `main` ni fer un desplegament manual a Netlify.

Impeccable s’ha emprat com a criteri manual; les modificacions s’han fet amb el flux normal del projecte, sense executar-ne ordres ni hooks.
