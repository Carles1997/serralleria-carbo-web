# Home v0 · alternativa de Fase 4

Mockup navegable d'alta fidelitat i **noindex**. És una alternativa visual real a `FASE4-mockups/home/`, no una implementació Astro de producció. Manté el sitemap i el contingut català provisional de Fase 3.

## Decisions visuals

- Composició editorial de fons carbó amb una entrada tipogràfica de gran escala, separadors fins i una única secció bordeus al contacte.
- Els dos accessos principals tenen el mateix pes, són enllaços de superfície completa i mantenen el nom, el text i l'acció visibles sense hover. La fotografia passa de desaturada a color amb hover/focus; en tacte continua sent accionable.
- Les dades confirmades apareixen com a llista editorial: 1989, 950 m², 12 persones i 6 furgonetes + 1 camió ploma.
- Les fotos de `FASE2-propostes/assets/` i `metal-detail-concept.png` són conceptuals. Cal substituir-les per originals del taller i dels sis casos documentats; no s'associen a feines reals en aquest mockup.

## Rutes i comportament

Els enllaços de la maqueta apunten a seccions internes per permetre revisar el recorregut. El `data-route` documenta el destí final: `/particulars/`, `/industrial/`, `/empresa/`, `/particulars/urgencies/`, `/particulars/estructures/`, `/particulars/automatismes/`, `/particulars/mobiliari/`, `/particulars/projectes/`, `/industrial/capacitats/`, `/industrial/projectes/` i `/contacte/`. El telèfon obre `tel:` i WhatsApp obre un missatge editable.

El menú mòbil inclou navegació de demostració, focus visible, `prefers-reduced-motion` i punts de tall per a 1440, 768, 390 i 320 px. Els textos ES/EN només tenen reserva visual; no hi ha traduccions inventades.

## Trasllat posterior a Astro

Els blocs `header`, `doors`, `facts`, `atelier`, `services`, `projects`, `contact` i `footer` es poden convertir en components Astro. Els atributs `data-route` i l'script del menú són només eines del mockup.
