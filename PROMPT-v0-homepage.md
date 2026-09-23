# Prompt per a v0 · Mockup alternatiu de la homepage

Crea **un mockup navegable i d'alta fidelitat de la homepage** de Serralleria Carbó. És una exploració de la **Fase 4 (disseny UI)** per comparar-la amb la maqueta actual; encara no és la implementació de producció ni implica publicar res.

## Abans de dissenyar

Llegeix aquests fitxers del repositori en aquest ordre:

1. `FASE4-brief.md` — abast i criteris de la fase.
2. `FASE1-arquitectura-serralleria-carbo.md` — sitemap i recorreguts **ja validats**.
3. `DESIGN.md` i `design/tokens.css` — direcció A «Ofici contemporani», tipografia i identitat aprovades.
4. `content/ca/home.md` — contingut català de referència per a la home, incloses les metadades SEO.
5. `FASE3-revisio.md` — estats provisionals i dades pendents. Consulta'l per evitar promeses no confirmades.
6. `FASE4-mockups/home/index.html`, `styles.css` i `README.md` — proposta actual. Fes-ne una **alternativa visual real**, no un retoc menor. Conserva el que ja funciona en estructura i comportament.
7. `Referencies/Landing page layout Inspo(Mobile and web).jpeg` i `Referencies/QUARRA STONE COMPANY _ corporate website redesign - Tony Che.jpeg` — referències de to visual, escala tipogràfica, ritme i integració fotogràfica. **No copiïs la seva composició literal, ni usis aquestes imatges com a assets de la web.**

Si no pots llegir algun fitxer, indica quin és abans de substituir dades o decisions per suposicions.

## Objectiu visual

Vull una web contemporània de serralleria i fabricació metàl·lica, **sòbria, professional i amb caràcter propi**. Fons foscos (negre, carbó i grisos metàl·lics), blancs nets, fotografia de metall integrada a la retícula, separadors subtils, espai negatiu ben mesurat i titulars amb molta presència. El color d'accent del logotip és `#7c2a30`; sobre fons fosc, fes servir el to clar previst als tokens quan calgui contrast. Pots introduir una secció clara si millora la lectura i el ritme, però la impressió global ha de ser fosca i editorial.

La direcció tipogràfica escollida és **A**, amb **Source Sans 3** local a `design/fonts/`. No inventis cap logotip, símbol de marca ni segona família tipogràfica. El nom de la marca ha de tenir força per si mateix.

Evita una landing genèrica de SaaS: targetes repetides, icones decoratives, gradients vistosos, efectes de vidre, crom brillant fals, engranatges o guspires ornamentals. La sofisticació ha de venir de la composició, les proporcions, la fotografia i la jerarquia.

## Estructura i contingut obligatoris

- La home és la portada d'una **única web amb dues branques**. A la primera secció hi ha dos accessos equivalents i clarament visibles: **Particulars a l'esquerra** i **Carbó Industrial a la dreta** en escriptori. Cada panell és un enllaç complet. A mòbil s'apilen i ambdós camins s'han de descobrir sense fer scroll excessiu; preveu accessos ràpids si cal.
- Les dues fotografies del primer accés comencen en blanc i negre o molt desaturades i recuperen el color en hover **i en focus de teclat**. En tacte continuen sent llegibles i accionables sense hover. No facis dependre cap informació o acció d'aquest efecte.
- Mantén el **H1 i el contingut de `content/ca/home.md`** com a font editorial. Pots ajustar la distribució visual i els salts de línia, però no inventis xifres, anys, cobertura geogràfica, serveis, materials, certificacions, terminis ni afirmacions comercials.
- Mostra les quatre dades confirmades amb etiquetes llegibles: **1989**, **950 m²**, **12 persones**, **6 furgonetes i 1 camió ploma**. Evita transformar-les en xifres derivades com «anys d'experiència».
- Conserva l'accés visible a **reparacions/urgències**, els serveis de Particulars, les capacitats d'Industrial, projectes i contacte. La home ha de tenir contingut propi per a SEO; no ha de ser només una pantalla de tria.
- El to de **Serralleria Carbó / Particulars** és proper, serè i tranquil·litzador; el de **Carbó Industrial** és tècnic i directe. La frase industrial és exactament: **«Sèries curtes. Peces exigents. Resposta industrial.»**
- Els projectes són els sis casos documentats (cinc de Particulars i un d'Industrial); no facis passar fotos conceptuals per fotografies d'aquests treballs. Fins que arribin els originals, és preferible una solució tipogràfica o espais fotogràfics clarament marcats.
- Mantén el número principal **630 661 908**. L'acció principal pot obrir WhatsApp amb un missatge predeterminat editable per l'usuari; a urgències, conserva també un enllaç `tel:`.
- Respecta les rutes del sitemap validat. En el mockup, els enllaços a pàgines encara no dissenyades poden usar ancoratges de demostració, però documenta la seva ruta final.
- El català és l'única versió redactada ara. Reserva espai per a CA/ES/EN sense inventar traduccions. Els textos legals i algunes dades continuen pendents; no els donis aparença de contingut aprovat per publicar.

## Llibertat creativa i límits

Tens llibertat per proposar **una composició millor que l'actual**: proporcions, enquadraments, alternança de superfícies, tractament de dades, serveis i projectes. Fes una proposta decidida, amb qualitat de direcció d'art. Mantén intactes l'arquitectura de la Fase 1, la base catalana de la Fase 3 i les decisions de marca aprovades de la Fase 2.

Les imatges de `FASE2-propostes/assets/` i `FASE4-mockups/home/metal-detail-concept.png` són **només conceptuals**. Pots utilitzar-les per a la prova visual amb una nota discreta de maqueta. No utilitzis les imatges de `Referencies/` dins la pàgina. Si proposes altres fotos, identifica-les com a placeholders i no les associïs a treballs reals.

Aquest projecte **encara no té l'aplicació Astro de producció**. La pila prevista per a la Fase 5 és Astro + Tailwind, però ara treballa només el mockup. Si v0 genera React/Next per facilitar la previsualització, deixa clar que és un prototip descartable i documenta els components i estats que després es podran traslladar a Astro.

## Lliurament que espero

1. Una homepage completa, navegable i visualment diferenciada de la proposta existent. **Crea-la en una carpeta nova** (per exemple `FASE4-mockups/home-v0/`); no sobreescriguis `FASE4-mockups/home/`, `content/ca/`, `DESIGN.md` ni els documents de fases validades.
2. Estats i composicions cuidats per a escriptori, tauleta i mòbil (comprova com a mínim 1440, 768, 390 i 320 px). Sense desbordament horitzontal, amb focus visible, contrast llegible, àrees tàctils adequades i suport de moviment reduït.
3. Una nota breu amb les decisions visuals, el comportament del doble accés, les rutes de destí de les accions i les fotografies que caldrà substituir.
4. Mantén `noindex` al mockup. No publiquis ni despleguis la web.

Treballa en una **branca separada** per poder comparar aquesta alternativa amb la base actual abans de decidir res.
