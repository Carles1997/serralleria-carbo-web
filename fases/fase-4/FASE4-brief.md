# Fase 4 — Punt de partida del disseny UI

**Estat:** oberta el 23/09/2026 per decisió del director de projecte. La base de contingut és el català auditat de `../../content/ca/`; el mapa SEO és `../fase-3/SEO-F3.md`. La Fase 4 acabarà quan el client validi els mockups de les plantilles clau.

**Estat actual (24/09/2026):** `FASE4-mockups/home/index.html` fixa la referència visual acceptada pel director de projecte. `FASE4-mockups/particulars/index.html` està aprovat provisionalment, pendent de verificació definitiva en escriptori i mòbil. La pàgina interior `FASE4-mockups/particulars/estructures/index.html` ha estat aprovada pel director de projecte. El portafoli `FASE4-mockups/particulars/projectes/index.html` es manté provisionalment; la seva revisió estètica queda pendent. La portada de Particulars mostra tres casos destacats i hi enllaça els cinc casos complets. La Fase 4 continua oberta.

**Revisió visual del 24/09/2026:** el director de projecte ha descartat la primera execució de la home per massa simple i genèrica. La segona iteració pren com a referència el contrast fosc, la tipografia de gran escala, el ritme editorial i l'ús integrat de fotografia de les dues imatges indicades a `FASE4-mockups/home/README.md`. És una revisió del mockup; els continguts, la doble entrada i el sitemap validats es conserven. Aquesta iteració encara és pendent de validació.

## Marc fixat

- Respectar el sitemap, la navegació i els tres recorreguts de `../fase-1/FASE1-arquitectura-serralleria-carbo.md`.
- Aplicar la direcció A, els tokens i les regles d'accessibilitat de `DESIGN.md` i `design/tokens.css`.
- Mantenir la primera secció de doble accés aprovada: Particulars i Carbó Industrial visibles, accionables amb ratolí, teclat i tacte; panells apilats en mòbil. `../fase-2/FASE2-propostes/index.html` és el punt de partida funcional, no un mockup final.
- Diferenciar la lectura de Particulars, més propera i tranquil·litzadora, i la d'Industrial, més tècnica i directa, dins d'un mateix sistema visual.

## Plantilles que cal resoldre

1. **Home general:** doble accés, introducció, quatre dades de l'empresa, accessos als serveis i a projectes reals.
2. **Portada de Particulars:** urgències prioritàries, quatre categories, projectes i contacte.
3. **Servei de Particulars i projectes:** plantilla reutilitzable amb accés als projectes relacionats i camí clar cap al formulari; preservar la trucada directa a Urgències.
4. **Portada i pàgina interior d'Industrial:** capacitats, procés, estat real de les ISO, exemple documentat i contacte tècnic accessible.
5. **Contacte:** formulari compartit amb opció Particular/Empresa, preselecció segons l'origen, adjunt visible per a l'empresa i estats d'error llegibles.

## Criteris de revisió

- Comprovar com es llegeixen el text i les dades a escriptori, tauleta i mòbil, inclosos 320 px; cap acció essencial ha de dependre de hover.
- Comprovar contrast, focus visible, navegació amb teclat, àrees tàctils i moviment reduït segons `DESIGN.md`.
- Reservar espais adaptables per a fotografies reals encara pendents. Les imatges de la prova de Fase 2 són conceptuals i no s'han de presentar com a feines de l'empresa.
- Preveure llargades diferents per als textos ES/EN sense traduir-los ni inventar-ne el contingut durant el disseny.
- No convertir les dades encara pendents de `../fase-3/FASE3-revisio.md` en promeses, especificacions o indicadors visuals definitius.

## Sortida de la fase

Mockups de les plantilles clau i sistema de components revisats en formats d'escriptori i mòbil, amb anotacions de comportament per als estats interactius. Validació del client abans de començar el desenvolupament de la Fase 5.

**Iteració Stitch del 24/09/2026:** la home de FASE4-mockups/home s'ha refet com una sola maqueta responsive a partir de la direcció fotogràfica i editorial dels exports locals de Stitch. Conserva la direcció A i els continguts confirmats de Fases 1–3; elimina afirmacions inventades, barra inferior d'app, formulari fictici i targetes excessives. Pendent de revisió visual i validació del client.

**Segon mockup de la home, 24/09/2026:** les seccions de serveis i treballs documentats s'han redissenyat com a mosaic visual compartit entre Particulars i Industrial i visor editorial manual dels sis casos reals. Les alternatives i el pla d'animació consten a FASE4-mockups/home/SECCIONS-v2.md. La Fase 4 continua pendent de revisió i validació.
