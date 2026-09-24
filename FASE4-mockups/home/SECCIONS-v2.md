# Fase 4 · Redisseny de serveis i projectes

**Estat:** segon mockup de les dues seccions, pendent de revisió visual i validació.

## Alternatives valorades

| Secció | Alternativa | Valoració |
|---|---|---|
| Serveis | Mosaic de quatre àmbits de Particulars i una peça industrial de la mateixa família visual | **Implementada.** Tots els serveis es veuen sense obrir cap control i les dues branques comparteixen vores, metadades, jerarquia i tractament de la imatge. |
| Serveis | Un únic escenari que canvia de foto i text en seleccionar cada servei | Més espectacular en moviment, però ocultaria tres serveis i alentiria el recorregut d'una persona amb una avaria. |
| Projectes | Un cas destacat amb imatge d'estudi, text real i navegació entre sis casos | **Implementada.** Dóna pes a cada feina i pot rebre les fotografies originals sense canviar el component. |
| Projectes | Mur editorial asimètric de fotografies reals | Interessant quan tinguem les sis imatges originals. Ara obligaria a associar visuals conceptuals a treballs concrets. |

## Criteri aplicat

- Particulars conserva un to directe i proper; Industrial manté el missatge «Sèries curtes. Peces exigents. Resposta industrial.»
- Les quatre categories de Particulars i l'accés a les capacitats industrials continuen visibles i tenen la ruta futura validada.
- Els sis títols i les descripcions del visor surten dels fitxers de contingut de Fase 3.
- Els SVG són esquemes genèrics; les fotografies continuen etiquetades com a conceptuals. No s'atribueix cap imatge a un projecte real.
- La mateixa estructura funciona amb ratolí, teclat i tacte. Sense JavaScript, els sis projectes es poden llegir seguits.

## Preparació per al desenvolupament de l'animació

- **Serveis:** la fotografia pot aparèixer amb una màscara de revelat i els traços dels esquemes es poden dibuixar en entrar al viewport. El títol i l'enllaç han de ser visibles abans de qualsevol moviment.
- **Projectes:** el canvi de cas admet un tall de fotografia, transició del número gran i entrada tipogràfica del títol. Controls manuals, interrupció immediata quan l'usuari torna a clicar i cap reproducció automàtica.
- **Accessibilitat:** conservar el mateix contingut amb moviment reduït; el canvi de color també funciona en focus de teclat.

## Asset conceptual nou

Fitxer: FASE4-mockups/home/project-stage-concept-v2.png. Generat amb la tool integrada image_gen i copiat al projecte. És una fotografia d'estudi del material, no una imatge d'una feina feta ni del taller real.

Prompt utilitzat:

Use case: photorealistic-natural
Asset type: conceptual editorial photograph for a metalworking company website project showcase; clearly a visual study, not documentation of a real client project.
Primary request: Create a striking, sophisticated close-up photograph of anonymous fabricated steel sections and precise welded joints resting on a dark workshop table. No identifiable finished product or machine capabilities.
Scene/backdrop: quiet contemporary metal workshop, background falls into deep shadow.
Style/medium: believable architectural and industrial photography, restrained European editorial art direction, tactile material detail, no illustration or CGI look.
Composition/framing: square image; asymmetrical arrangement of steel forms, strong diagonal lines, central subject safe for both square and landscape crops; leave some darker breathing room toward upper left for a large overlaid project number.
Lighting/mood: controlled side light on brushed steel edges, matte charcoal shadows, subtle reflections, sober and premium.
Color palette: black, graphite, cool silver, neutral steel; no bright colored glow.
Materials/textures: clean fabricated carbon steel and stainless steel surfaces, realistic weld texture, no rust.
Text: none.
Constraints: no people, logos, signage, labels, sparks, laser cutting, CNC machinery, imaginary finished project, watermarks or typography.
