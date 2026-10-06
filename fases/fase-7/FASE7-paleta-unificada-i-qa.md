# Fase 7 · Paleta unificada i verificació visual

Data: 06/10/2026. Implementació sol·licitada pel director del projecte.

## Decisió vigent

La referència «Salt and pepper» aportada pel director substitueix els grisos anteriors de la interfície. Es conserva l'accent bordeus de la marca.

Referència original conservada a `referencies/paleta-salt-and-pepper.avif`.

| Color | Ús |
| --- | --- |
| `#FFFFFF` | Lectura, superfícies clares, formularis i tinta sobre grafit |
| `#D4D4D4` | Seccions secundàries clares, descans visual i plata d'Industrial |
| `#B3B3B3` | Separadors, detalls metàl·lics i elements secundaris |
| `#2B2B2B` | Text sobre fons clar i superfícies principals d'Industrial |
| `#7C2A30` | Marca, accions i accents puntuals |

Home i Particulars prioritzen blanc i gris clar. Industrial prioritza grafit, alternant amb gris clar per separar continguts i millorar la lectura. La diferenciació depèn de la proporció de superfícies, les fotografies i els detalls metàl·lics, dins d'una mateixa paleta.

La font activa dels rols és `src/styles/roles.css`. Els tokens històrics de `design/tokens.css` es conserven com a document validat de Fase 4; els àlies actius es redefineixen a la capa de rols. No afegir colors literals a les plantilles ni copiar la paleta antiga dels mockups.

Fotografies, degradats de protecció del text, transparències de focus i ombres poden produir tonalitats derivades. No són noves superfícies opaques de la interfície. Els reflexos metàl·lics clars utilitzen blanc i gris mitjà; sobre superfícies clares preval el grafit per garantir lectura.

## Correccions aplicades

- Imatges dels dos camins de la Home: blanc i negre en repòs; color amb ratolí i focus de teclat. En dispositius sense hover es conserva el blanc i negre inicial.
- Fletxes dels accessos i targetes de la Home: grafit sobre blanc en hover i focus, sense heretar tinta blanca de la secció.
- Entrada de la Home (ajust posterior del director): fons grafit igual que Industrial, titular i ubicació blancs, coma i any bordeus; es conserva la composició, la mida del titular i la ubicació a la dreta sense requadre. La banda «Com triar el camí» també té fons grafit i text clar; els accessos comparteixen alineació vertical. El 1989 augmenta un 30% respecte de la mida anterior: passa de 1,35em a 1,755em.
- Home, Particulars, serveis, projectes, Industrial, Capacitats, Contacte i pàgines legals: superfícies, tinta, separadors i controls ajustats als rols comuns.
- Capçalera i barres de filtres: fons opacs de la paleta per evitar que el contingut de sota alteri el color i el contrast.
- Ajust final del peu: mateix fons que la capçalera, blanc a les pàgines clares i grafit a Industrial i Capacitats; es conserven la vora d'accent, els logotips i els enllaços.
- Textos, dades, rutes, imatges i continguts de referència protegits: sense modificacions editorials en aquesta tasca.

## Comprovacions executades

- `npm run verify`: comprovació de tipus, build de 13 pàgines i control de referències superats.
- `npm run check:links`: 355 enllaços interns resolts en les 13 pàgines.
- `npm run check:redirects`: sense errors en les redireccions preparades; es mantenen les decisions pendents ja conegudes.
- Navegador Chromium: 13 rutes a 1440, 768, 390 i 320 px (52 combinacions). Sense desbordaments horitzontals, titulars fora del viewport, errors de JavaScript ni peticions fallides inesperades detectats.
- Revisió dels fons opacs: tots pertanyen a la paleta. Revisió de contrast de text sobre fons sòlids sense incidències detectades; aquesta prova no certifica per si sola l'accessibilitat completa ni el contrast de totes les fotografies.
- Home: blanc i negre/color, focus, fletxes dels dos camins i les cinc targetes comprovats.
- Recorreguts d'escriptori i mòbil: Home → Particulars → Urgències i Industrial → Capacitats → Contacte, amb tipus de consulta preseleccionat.
- Menú: activació amb teclat, tancament amb Escape i retorn del focus. Filtres de projectes: Automatismes, Estructures i tots els projectes.
- Formulari: validació de camps obligatoris i resposta de demostració. No envia correus ni simula una consulta enviada.
- Mètode industrial: quatre passos accessibles amb moviment normal, moviment reduït i JavaScript desactivat.

## Límits i estat de lliurament

La verificació mòbil s'ha fet amb viewports de navegador, sense prova física de tots els dispositius. No s'ha fet una certificació WCAG ni una auditoria de seguretat en aquesta tasca.

El formulari continua en demostració fins a implementar i provar l'enviament real. Les traduccions i decisions de redirecció pendents no es resolen amb aquest canvi visual.

Els canvis estan disponibles a la previsualització local. Aquest document no acredita un nou desplegament públic a Netlify.
