# Exploració visual · Fase 2

Obre `index.html` en un navegador per veure la direcció **A**, ja escollida, comparar-la amb les alternatives descartades i provar la primera secció. Els botons **Escriptori / Tauleta / Mòbil** canvien l'amplada de la prova. També es pot redimensionar la finestra. Les decisions vigents són a `../DESIGN.md` i els tokens a `../design/tokens.css`.

## Abast

- **A · Ofici contemporani:** direcció escollida. Dona una base llegible i propera a Particulars i un registre més estructurat a Industrial. La font seleccionada per reproduir-la entre plataformes és Source Sans 3, allotjada a `../design/fonts/` amb la llicència.
- **B · Precisió industrial:** alternativa més compacta i tècnica.
- **C · Editorial estructural:** alternativa més singular; caldria comprovar-la amb la fotografia real abans d'escollir-la.
- Els símbols són exploracions gràfiques, no el logotip existent ni un redisseny aprovat.
- Les frases de mostra i les etiquetes de la prova no són contingut final de la web.
- Els accessos de la prova apunten a ancoratges interns. A la web final seguiran les rutes validades `/particulars/` i `/industrial/`.

## Fotografies de prova

Les dues imatges de `assets/` es van generar amb l'eina integrada `image_gen`, en mode **photorealistic-natural**, únicament per estudiar el contrast entre les dues branques i el pas de blanc i negre a color. **No representen el taller, productes, instal·lacions ni projectes de Serralleria Carbó.** S'han de substituir per fotografies facilitades i aprovades pel client abans de producció.

Prompts finals utilitzats:

1. `particulars-concept.png`: “Use case: photorealistic-natural. Asset type: provisional photographic panel for a Catalan metalworking company's website concept study, NOT documentary company photography. Primary request: close view of a custom dark steel handrail and slim metal stair structure installed in a calm contemporary home, emphasizing the crafted joints and finish. Style: credible architectural photography, natural texture, restrained and sophisticated. Composition: wide horizontal crop, no people, no text, generous clear area in lower left for a separate HTML label, geometry leading toward center right. Lighting: soft daylight. Color palette: neutral charcoal, stone white, subtle natural wood; authentic material color needed for black-and-white to color hover comparison. Constraints: no logo, no lettering, no watermark, no invented workers or location claims.”
2. `industrial-concept.png`: “Use case: photorealistic-natural. Asset type: provisional photographic panel for an industrial fabrication website concept study, NOT documentary company photography. Primary request: close view of accurately fabricated stainless steel and carbon steel components arranged on a clean workbench in a real-feeling metal fabrication workshop, visible welded joints and measured geometric repetition suitable to suggest short production runs. Style: credible editorial industrial photography, restrained and sophisticated. Composition: wide horizontal crop, no people, no text, strong structure and perspective, useful darker lower left area for separate HTML label. Lighting: controlled natural workshop light, honest material reflections. Color palette: cool graphite, steel silver, muted workshop tones; authentic material color needed for black-and-white to color hover comparison. Constraints: no logo, no lettering, no watermark, no fabricated claims about machines, certifications, company or place.”

## Verificació de la prova

`verify.cjs` executa Chrome amb Playwright i comprova les amplades de 1440, 768, 390 i 320 px; el canvi d'estat de la imatge amb ratolí i teclat; l'activació d'enllaços amb Enter i tacte; i la desactivació de transicions amb moviment reduït. També genera captures de comparació. Això verifica el comportament del prototip en un navegador d'escriptori i emulació tàctil; encara caldrà revisar la UI final en dispositius físics amb les fotografies definitives.
