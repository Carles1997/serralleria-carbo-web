# Fase 4 · Auditoria preliminar dels mockups de Stitch

**Estat:** revisió de disseny, no validació de contingut ni de desenvolupament. **Fitxers de Stitch intactes.**

## Abast i límit de l'evidència

S'han revisat `stitch_serralleria_carbo_design_system/ofici_contemporani/DESIGN.md`, els dos `code.html` i la captura mòbil. El `screen.png` de la versió d'escriptori conté només el missatge «<FIFE Image failed to fetch>» (28 bytes). Per tant, la composició d'escriptori s'ha pogut auditar pel codi, però encara no visualment amb una captura fiable. Les dues pàgines HTML són exports separats, no una única implementació responsive verificada.

**Valoració:** és una bona base de direcció visual. No és una base factual ni funcional que es pugui traslladar a la web sense una depuració profunda. El llenguatge visual pot continuar; el text i moltes fitxes s'han de reconstruir des dels documents aprovats.

## Conservar

1. **Contrast fosc i materialitat:** carbó, metall, tipografia clara i bordeus `#7c2a30` generen una identitat més forta que la primera maqueta. Mantenir Source Sans 3.
2. **Dues entrades fotogràfiques:** Particulars i Industrial tenen pes semblant i una lectura ràpida. Conservar l'esquerra/dreta en escriptori i l'apilament en mòbil.
3. **Fotografia protagonista:** enquadraments de detall i capes de text sobre imatge ajuden a entendre l'ofici. Les fotos actuals són conceptuals; substituir-les per originals aprovats o mantenir-les identificades com a prova.
4. **Xifres com a element gràfic:** 1989, 950 m², 12 persones i vehicles aporten confiança. Conservar les dades, amb etiquetes completes i exactes.
5. **Contacte i reparacions visibles:** la jerarquia de la trucada i de WhatsApp és útil per al recorregut d'urgències, sense prometre disponibilitat no confirmada.
6. **Ritme editorial:** alternança de blocs fotogràfics, informació curta i línies de separació. Conservar-ne el principi, amb menys targetes repetides.

## Ajustar en la següent iteració visual

| Element | Recomanació |
|---|---|
| Identitat | Conservar els neutres i l'accent, però no adoptar automàticament tot el nou `DESIGN.md` de Stitch: `DESIGN.md` i `design/tokens.css` del projecte continuen sent la font aprovada. La variant rosa `#ffb3b4` no ha d'esdevenir el color de marca. |
| Formes | El document de Stitch prescriu angles rectes, però el mòbil utilitza moltes targetes arrodonides, ombres i gradients. Tornar a superfícies planes, juntes fines i cantons rectes o quasi rectes. |
| Primera pantalla mòbil | Preservar els dos camins i el contacte urgent, però reduir la franja superior perquè Particulars i Industrial apareguin aviat. Substituir el llenguatge d'«app» per un patró de web responsive. |
| Barra inferior mòbil | Cinc pestanyes fixes ocupen alçada, tenen etiquetes de 10 px i suggereixen una app. Preferible capçalera mòbil amb menú i contacte, amb una acció urgent persistent només si la prova d'ús la justifica. |
| Serveis | Recuperar les quatre categories aprovades de Particulars i el camí propi d'Industrial. Evitar que una galeria horitzontal amagui serveis essencials. |
| Projectes | Mantenir una selecció fotogràfica atractiva, però amb els cinc casos documentats de Particulars i el cas industrial. No afegir materials, dimensions, anys, llocs ni certificacions sense font. |
| Contacte | A la home, un CTA clar i opcions de trucada/WhatsApp són suficients; el formulari compartit complet viu a `/contacte/`, amb branca preseleccionada segons origen. |
| Tipografia | Els titulars poden continuar contundents. Text corrent a 16 px mínim, microetiquetes només per a orientació, i menys línies molt compactes sobre fotografia. |
| Accessibilitat cromàtica | `#6b7280` sobre `#121316` té contrast aproximat 3,84:1, i `#b8434c` sobre `#121316` 3,49:1: inadequats com a text normal. `#9ca3af` (7,32:1) i `#d48e94` (7,16:1) funcionen millor en aquests fons. |

## Correccions factuals imprescindibles

- **Ubicació i contacte:** el taller és a Vilafranca del Penedès. Les mencions a Baix Empordà, La Bisbal d'Empordà, Sabadell i les adreces associades són incorrectes. El correu general confirmat és `carbo@serralleriacarbo.com`; els `info@...` del mockup no consten. El principal és `630 661 908`. El `tel:937000000` mòbil és inventat.
- **Urgències:** eliminar «24h», «desplaçament immediat», «servei de guàrdia», «temps de resposta garantit» i «menys de 24 hores laborables» fins que el client confirmi disponibilitat i terminis. Preservar el contacte directe i la trucada.
- **Certificacions i equip:** eliminar «UNE-EN 1090», «soldadors homologats», controls certificats i oficina tècnica interna actual. El projecte només confirma ISO 9001 en implantació, ISO 3834 en estudi i possibilitat de coordinar suport d'arquitectura tècnica.
- **Maquinària i materials:** no hi ha confirmació de làser de fibra, potència 4 kW, plegadora de 170 t, xapa de 20 mm, tall CNC, corten, alumini, vidres tècnics o marques de perfileria. El material confirmat és ferro/acer i inox 304/316; soldadura MIG/MAG i TIG; plegadora, cisalla i punxonadora sense especificacions publicables.
- **Projectes:** tots els exemples detallats de Stitch són diferents dels sis casos reals de `content/ca/projects/`. Noms, localitats, dimensions, pesos, pressions, unitats i processos de prova generats s'han de descartar. Tampoc es poden atribuir les fotos conceptuals a projectes reals.
- **Dades:** conservar 1989, 950 m², 12 persones, 6 furgonetes i 1 camió ploma, però no «36 anys», «mestres d'ofici», «nau a La Bisbal», «6+1» com a única etiqueta ni anys 2024–2025 presentats com a auditoria o vigència.
- **Posicionament:** «serralleria d'autor» i un catàleg només de luxe/arquitectura singular desplacen Particulars cap a una oferta no confirmada. El to aprovat és proper, serè, concret i professional. Industrial ha de ser tècnica i directa, amb «Sèries curtes. Peces exigents. Resposta industrial.»

## SEO, navegació i funcionalitat

- La home ha d'utilitzar el contingut i les metadades de `content/ca/home.md`: H1 «Serralleria Carbó, a Vilafranca del Penedès des de 1989», títol SEO i descripció corresponents. L'H1 de Stitch canvia entre escriptori («Serralleria Carbó») i mòbil («Precisió en Metall»); la versió mòbil perd marca i ubicació. Cap export inclou metadescripció ni `noindex` de maqueta.
- Els dos HTML són composicions i textos diferents. Construir una sola home responsive abans de validar jerarquia, SEO i contingut. Provar 1440, 768, 390 i 320 px amb les mateixes dades.
- La majoria d'enllaços apunten a `#` (21 d'escriptori i 8 de mòbil). Mapejar-los a les rutes de Fase 1; mantenir ancoratges només com a demostració explícita.
- El formulari d'escriptori intercepta l'enviament i mostra «Documentació rebuda» sense transmissió. L'adjunt creat amb JavaScript no s'incorpora al formulari. Al mòbil, «Demanar Estudi» no envia res. No mostrar missatges d'èxit falsos en una prova navegable.
- El pas de blanc i negre a color apareix en hover d'escriptori, però no en focus; al codi mòbil no hi ha aquest comportament. Afegir focus visible, estat de color en focus i suport per a moviment reduït; el panell ha de ser accessible íntegrament amb teclat i tacte.
- Les fotos i fonts depenen de URLs externes de Google i el prototip carrega Tailwind per CDN. Això és acceptable per a una exploració, però els assets aprovats i la font local han de quedar al projecte abans de producció. Les imatges decoratives de fons amb `data-alt` no aporten text alternatiu real.

## Proposta de següent pas

1. Validar aquesta direcció **només com a referència visual** i obtenir una captura d'escriptori funcional.
2. Preparar una versió responsive única de la home, reutilitzant el tractament de fotografia, paleta i xifres, però amb textos i rutes de Fase 1–3.
3. Verificar l'hero i les dues branques en ratolí, teclat i tacte. Substituir les promeses i projectes inventats abans de mostrar-lo al client com a proposta de contingut.
4. Quan arribin fotografies originals, substituir els visuals conceptuals i revisar enquadraments i contrast sobre les fotos reals.
