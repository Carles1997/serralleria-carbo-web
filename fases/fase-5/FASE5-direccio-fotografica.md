# Direcció fotogràfica · Fase 5

## Criteri

- Particulars: arquitectura i metall d'ús quotidià, llum natural, ambient tranquil. El bordeus queda reservat a la interfície.
- Industrial: peces i processos en grafit i plata neutra, amb reflexos controlats.
- Projectes documentats: fotografies originals recuperades. Cap imatge generada es presenta com un treball real.

## Aplicació

| Bloc | Origen i tractament |
| --- | --- |
| Home, doble accés | Dues noves imatges conceptuals coordinades: barana metàl·lica en un habitatge per a Particulars i preparació d'una petita sèrie al taller per a Industrial |
| Home, empresa i estructures | Fotografies originals de gàbies i passarel·la |
| Home, portes i motors, carros i mobiliari | Portes i motors mostra la fotografia original de reparació (Rectangle-19.jpg), amb el logotip de la samarreta intacte; carros és conceptual; mobiliari té una nova imatge de targeta amb el moble complet visible |
| Particulars | Portada conceptual; quatre targetes de servei amb imatge específica; tres casos amb fotografies originals |
| Portafoli | Portada de passarel·la i cinc casos amb fotografia original de cada projecte |
| Quatre pàgines de servei | Una portada conceptual específica per servei; les galeries d’Estructures i Automatismes combinen treballs reals i imatges conceptuals identificades a cada targeta. Altres accessos mostra un portal motoritzat diferent de la portada d’Automatismes |
| Industrial | Portada, materials, maquinària, soldadura, nova imatge del procés de sèrie curta i cinc sectors conceptuals; el muntatge mostra la fotografia original de la furgoneta i l'operari (Rectangle-1-1.png), amb el logotip intacte; gàbies originals al cas |
| Capacitats | Portada conceptual; dues imatges de materials i tres de maquinària amb aspecte de taller real; soldadura conceptual més lluminosa; fotografia original al bloc del taller. Les imatges conceptuals estan identificades a la pàgina. |

El mapa tècnic és src/config/photography.ts. La procedència dels originals consta a assets/fotografies-recuperades/cataleg.csv. Els prompts de les imatges noves són a assets/imatges-conceptuals/prompts.md.

## Lliurament web

Astro genera variants responsives AVIF i WebP amb JPEG de reserva. Només les imatges del primer tram es carreguen amb prioritat; la resta fan servir càrrega diferida i descodificació asíncrona. Els PNG conceptuals són màsters de repositori i no es lliuren directament al navegador. Les fotografies originals no es refan amb IA perquè això podria alterar la feina documentada.

## Límits

Els originals recuperats tenen qualitat i enquadraments irregulars. El tractament visual unifica color i contrast, però una sessió de fotos real del taller, l'equip i les obres acabades és la millor substitució futura per als recursos conceptuals.

