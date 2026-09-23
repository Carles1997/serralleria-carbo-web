# Fase 4 — Punt de partida del disseny UI

**Estat:** oberta el 23/09/2026 per decisió del director de projecte. La base de contingut és el català auditat de `content/ca/`; el mapa SEO és `SEO-F3.md`. La Fase 4 acabarà quan el client validi els mockups de les plantilles clau.

**Primer lliurable en revisió:** `FASE4-mockups/home/index.html`, mockup navegable de la home amb captures d'escriptori, tauleta i mòbil. Encara no està validat pel director de projecte ni pel client.

**Revisió visual del 24/09/2026:** el director de projecte ha descartat la primera execució de la home per massa simple i genèrica. La segona iteració pren com a referència el contrast fosc, la tipografia de gran escala, el ritme editorial i l'ús integrat de fotografia de les dues imatges indicades a `FASE4-mockups/home/README.md`. És una revisió del mockup; els continguts, la doble entrada i el sitemap validats es conserven. Aquesta iteració encara és pendent de validació.

## Marc fixat

- Respectar el sitemap, la navegació i els tres recorreguts de `FASE1-arquitectura-serralleria-carbo.md`.
- Aplicar la direcció A, els tokens i les regles d'accessibilitat de `DESIGN.md` i `design/tokens.css`.
- Mantenir la primera secció de doble accés aprovada: Particulars i Carbó Industrial visibles, accionables amb ratolí, teclat i tacte; panells apilats en mòbil. `FASE2-propostes/index.html` és el punt de partida funcional, no un mockup final.
- Diferenciar la lectura de Particulars, més propera i tranquil·litzadora, i la d'Industrial, més tècnica i directa, dins d'un mateix sistema visual.

## Plantilles que cal resoldre

1. **Home general:** doble accés, introducció, quatre dades de l'empresa, accessos als serveis i a projectes reals.
2. **Portada de Particulars:** urgències prioritàries, quatre categories, projectes i contacte.
3. **Servei de Particulars i projectes:** plantilla reutilitzable amb exemples relacionats i camí clar cap al formulari; preservar la trucada directa a Urgències.
4. **Portada i pàgina interior d'Industrial:** capacitats, procés, estat real de les ISO, exemple documentat i contacte tècnic accessible.
5. **Contacte:** formulari compartit amb opció Particular/Empresa, preselecció segons l'origen, adjunt visible per a l'empresa i estats d'error llegibles.

## Criteris de revisió

- Comprovar com es llegeixen el text i les dades a escriptori, tauleta i mòbil, inclosos 320 px; cap acció essencial ha de dependre de hover.
- Comprovar contrast, focus visible, navegació amb teclat, àrees tàctils i moviment reduït segons `DESIGN.md`.
- Reservar espais adaptables per a fotografies reals encara pendents. Les imatges de la prova de Fase 2 són conceptuals i no s'han de presentar com a feines de l'empresa.
- Preveure llargades diferents per als textos ES/EN sense traduir-los ni inventar-ne el contingut durant el disseny.
- No convertir les dades encara pendents de `FASE3-revisio.md` en promeses, especificacions o indicadors visuals definitius.

## Sortida de la fase

Mockups de les plantilles clau i sistema de components revisats en formats d'escriptori i mòbil, amb anotacions de comportament per als estats interactius. Validació del client abans de començar el desenvolupament de la Fase 5.
