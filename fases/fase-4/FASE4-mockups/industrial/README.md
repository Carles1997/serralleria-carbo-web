# Mockup · Carbó Industrial

**Estat:** portada i conjunt de la Fase 4 validats pel client el 25/09/2026. La unificació de Sèries curtes i Mètode de treball forma part del patró aprovat. La passada transversal de les set plantilles s’ha completat. Obrir [index.html](index.html) en un navegador.

## Direcció

Aquesta versió utilitza el mockup de Stitch lliurat el 24/09/2026 com a punt de partida **compositiu**, no com a font de dades. Conserva la força del titular, la lectura tècnica i l'ordre capacitats → sèries i mètode → sectors → cas → contacte. La portada utilitza una imatge a tota l'amplada amb el titular superposat; el taller es presenta com un aparador de materials, maquinària, soldadura i muntatge; i els sis sectors es presenten alhora en una galeria de gràfics abstractes. Cada peça obre una consulta per correu amb el sector identificat a l'assumpte. La secció de Sèries curtes conserva el fons fotogràfic i incorpora els quatre passos del mètode en una línia de progrés, al lloc que ocupava la secció de Sèries. La composició conserva la tipografia compartida; l’accent industrial aprovat a la Fase 4 és plata neutra i el titular destacat té un reflex metàl·lic.

## Decisions de contingut

- Els textos i les xifres procedeixen de `content/ca/industrial.md`, `industrial-capacitats.md`, `industrial-series-curtes.md` i `projects/gavia-industrial.md`.
- S'han descartat les toleràncies, els gruixos, les quantitats de lot, les normes sectorials i els terminis de resposta que Stitch presentava sense confirmació.
- La referència a ISO 9001 indica **en implantació** i ISO 3834 **en estudi**. No es presenten com a certificacions vigents.
- Les tres fotografies de la maqueta són conceptuals i estan etiquetades com a tals. El número 10 del projecte és una representació gràfica, no una foto de les gàbies.

## Funcionalitat del mockup

- La capçalera enllaça el mockup de Capacitats; la resta de pàgines interiors pendents continuen apuntant a les seccions de la portada. Els atributs `data-future-route` documenten les rutes aprovades per al desenvolupament, sense alterar el sitemap.
- Els sis sectors són visibles alhora. No hi ha cap selector ni informació amagada. Cada peça és un enllaç de consulta amb un assumpte de correu específic. Funciona amb ratolí, tacte i teclat, també sense JavaScript.
- El mètode de treball s'ha integrat a Sèries curtes, amb l'àncora `#proces` dins del mateix bloc. En escriptori, la línia horitzontal s'il·lumina amb l'scroll i els passos apareixen successivament; en mòbil la línia és vertical. Sense JavaScript o amb moviment reduït, el contingut és completament visible.
- El dibuix abstracte respon breument al hover o al focus (transformació i opacitat, 220 ms); el moviment reduït elimina el desplaçament. L'acció i el nom són sempre visibles.
- La crida al formulari obre el mockup compartit de Contacte amb Empresa preseleccionada. El correu i la trucada continuen disponibles com a vies directes. El formulari només mostra i valida la interacció; no envia dades.
- El contingut i la navegació no depenen d'animacions. El moviment reduït elimina les transicions decoratives.

## Verificació i pendents

La portada s'havia revisat a 1440, 768, 390 i 320 px. Aquesta iteració de Sèries curtes s'ha comprovat a 1440, 390 i 320 px: cap desbordament horitzontal, quatre passos i àncora de Procés presents, progrés gradual amb scroll i contingut completament llegible amb moviment reduït. A 390 px, l'alçada total ha baixat aproximadament de 8.987 a 8.517 px. Cal revisar aquesta modificació amb el director de projecte, substituir els recursos conceptuals per fotografies adequades quan estiguin disponibles i connectar les rutes finals durant el desenvolupament.


**Actualització visual 24/09/2026:** la prova d'identitat s'ha incorporat a `index.html` i a `capacitats/index.html` mitjançant `identitat.css`. El reflex metàl·lic afecta les paraules destacades dels titulars, amb una variant fosca sobre el bloc clar de Capacitats. La paleta del taller és grafit i plata neutra.

**Jerarquia final 25/09/2026:** la portada resumeix quatre àmbits del taller amb el mosaic existent. El botó principal i la crida al final del mosaic obren directament la fitxa de Capacitats, on queden els detalls tècnics. El reflex metàl·lic té marge de pintura al final de línia. Revisat a 1440, 768, 390 i 320 px.
