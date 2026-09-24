# Portafoli de Particulars · Fase 4

Mockup de la ruta validada `/particulars/projectes/`. El director de projecte ha indicat mantenir aquesta proposta de moment, tot i que la seva estètica continua pendent de revisió. Presenta exactament els cinc casos de `content/ca/particulars-projectes.md`, en l'ordre de `projectIds`; no crea pàgines de detall noves.

## Fonts de veritat

- `../../../../../content/ca/particulars-projectes.md`: títol, descripció SEO i ordre.
- `../../../../../content/ca/projects/`: títols, descripcions, categories i anys recuperats dels cinc casos.
- `../../../../fase-1/FASE1-arquitectura-serralleria-carbo.md`: enllaç servei → projectes → contacte, amb filtre per categoria si és possible.
- `../../../FASE4-sistema-visual.md`: llenguatge visual compartit.

## Decisions de disseny

- Els casos es mostren com a cinc peces editorials àmplies, sense pàgines individuals ni una llista compacta. Cada peça té un espai preparat per a la seva fotografia original.
- Els marcs actuals són gràfica abstracta de maqueta, no representacions dels projectes. Cada marc ho declara. La foto de capçalera també és conceptual i queda etiquetada.
- Els filtres d'Estructures i Automatismes són funcionals. Sense JavaScript, els cinc casos continuen visibles. `?servei=estructures` o `?servei=automatismes` obre la pàgina amb el filtre corresponent.
- Cada cas enllaça al servei relacionat. Estructures ja té mockup; Automatismes apunta de moment a la secció de serveis de la portada de Particulars i conserva `data-future-route` per a la ruta final.
- `noindex, nofollow` evita la indexació de la maqueta. Les fotografies, formulari final i textos legals segueixen pendents.

## Revisió pendent

Comprovar el ritme de les cinc peces, el retall de la foto conceptual, els filtres, l'absència de desbordaments i la lectura a 1440, 768, 390 i 320 px. Amb les fotografies originals, substituir els marcs i redactar els textos alternatius corresponents abans de la publicació.
