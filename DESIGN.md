# DESIGN — Serralleria Carbó / Carbó Industrial

**Projecte:** SC-2026-01  
**Versió:** 1.0 · 23 de setembre de 2026  
**Estat:** Fase 2 validada pel client i congelada. La Fase 3 té una base CA i SEO acceptada provisionalment; la Fase 4 està oberta.  
**Fonts de decisió:** `CONTEXT-serralleria-carbo.md`, `fases/fase-1/FASE1-arquitectura-serralleria-carbo.md`, `fases/fase-2/FASE2-marca-disseny.md` i les decisions del director de projecte d'aquesta conversa.

## 1. Decisions fixades

- Es manté una marca mare, **Serralleria Carbó**, i una branca, **Carbó Industrial**, dins d'una sola web. No es modifica el sitemap ni cap user journey validat de la Fase 1.
- La direcció escollida és **A · Ofici contemporani**. Les opcions B i C de `fases/fase-2/FASE2-propostes/index.html` queden com a exploracions descartades. La família tipogràfica no canvia entre branques; Industrial es diferencia amb jerarquia, densitat, fotografia i més superfícies fosques.
- La base cromàtica combina blancs, grisos i carbó. El bordeus **`#7c2a30`**, aportat com a color d'accent del logotip, és compartit per les dues branques.
- La primera secció de la home presenta **dos camins equivalents** amb fotografies diferenciades: Particulars a l'esquerra i Carbó Industrial a la dreta en pantalles amples. El tractament inicial és en blanc i negre o molt desaturat; hover i focus recuperen el color. A mòbil, els camins s'apilen i funcionen sense hover.
- El missatge industrial aprovat és **“Sèries curtes. Peces exigents. Resposta industrial.”** No es fixa en aquesta fase cap altre text comercial de pàgina.

## 2. Marca i veu

**Idea rectora interna:** ofici visible i resposta adequada a cada encàrrec. No s'utilitza com a eslògan de la web.

| | Serralleria Carbó · Particulars | Carbó Industrial |
|---|---|---|
| Caràcter | Proper, serè, resolutiu | Tècnic, directe, rigorós |
| Prioritat de lectura | Necessitat → ajuda possible → contacte | Requisit → capacitat comprovable → procés → contacte tècnic |
| Vocabulari | Paraules quotidianes i explicacions clares | Terminologia precisa, dades i unitats confirmades |
| Credibilitat | Treballs instal·lats, persones i procés comprensible | Taller, materials, soldadura, procés i cas industrial documentat |
| To prohibit | Alarmisme, promeses d'immediatesa no confirmades, paternalisme | Superlatius, capacitats no verificades, certificacions encara no obtingudes |

Es pot recuperar la proximitat i el vocabulari útil de la web antiga, però la redacció nova ha de ser més precisa i professional. La projecció de negoci cap a Industrial no ha de fer que la branca de Particulars sembli secundària en la navegació inicial.

## 3. Tipografia

**Família escollida:** Source Sans 3, font variable allotjada localment a `design/fonts/SourceSans3VF-Upright.woff2`; llicència OFL a la mateixa carpeta. S'ha triat per preservar la llegibilitat i el caràcter humà de la direcció A de manera consistent entre plataformes. La família està dissenyada per a interfícies i es distribueix amb llicència SIL Open Font License 1.1, segons el [repositori oficial d'Adobe](https://github.com/adobe-fonts/source-sans) i la seva [llicència](https://github.com/adobe-fonts/source-sans/blob/release/LICENSE.md).

- **Marca mare:** “Serralleria” en una línia petita i espaiada, “Carbó” com a pes principal. En entorns reduïts es pot disposar el nom complet en una sola línia si continua llegible.
- **Branca industrial:** “Carbó” com a nucli i “Industrial” com a descriptor separat. El parentiu visual prové de la mateixa família, el mateix accent i la mateixa construcció, sense una segona font tècnica.
- **Text corrent:** 16 px mínim, pes 400, interlineat 1.5. Text introductori pot arribar a 18 px. No condensar paràgrafs industrials.
- **Titulars:** pes 700, interlineat 1.05, tracking lleugerament negatiu. Escala fluida definida als tokens; evitar titulars tan grans que forcin particions incòmodes en CA/ES/EN.
- **Etiquetes curtes:** pes 600, majúscules i tracking positiu només quan tenen funció d'orientació. No aplicar majúscules a frases ni a blocs de dades.
- **Xifres i fitxes tècniques:** pes 600 o 700, alineació i espaiat consistents; les unitats es llegeixen amb la xifra. No publicar dades que el client no hagi aportat.

El símbol angular mostrat a la comparativa A és **exploratori i no s'adopta com a logotip aprovat**. El sistema funciona amb els dos noms tipogràfics. Qualsevol integració d'un arxiu de logotip del client haurà de respectar aquestes jerarquies i el color d'accent, sense inventar un símbol.

## 4. Color i contrast

Els valors autoritzats viuen a `design/tokens.css`.

| Rol | Valor | Ús |
|---|---|---|
| Paper | `#f6f5f2` | Base general clara |
| Superfície | `#ffffff` | Blocs de lectura i formularis |
| Superfície suau | `#e9e9e6` | Separació sense enfosquir excessivament |
| Carbó | `#252627` | Seccions de pes, especialment Industrial |
| Tinta | `#202124` | Text principal en clar |
| Gris de text | `#5f6264` | Text secundari en clar |
| Acer | `#858a8c` | Detall gràfic; no text petit sobre blanc |
| Línia | `#d6d4cf` | Separadors i vores |
| Bordeus | `#7c2a30` | Accions, focus i identificació de marca en fons clar |
| Bordeus clar | `#d48e94` | Text o focus d'accent sobre carbó |

El bordeus original dona un contrast aproximat de **9,41:1 sobre blanc** i **8,63:1 sobre paper**. En canvi, sobre carbó el contrast és només **1,61:1**: no s'ha d'emprar com a text petit ni com a indicador únic en fons fosc. Per això hi ha un to aclarit sobre carbó; el logotip i les accions principals també poden funcionar en blanc. Les xifres s'han calculat amb la fórmula WCAG de luminància relativa; es verificaran de nou quan es combinin colors i imatges a la UI final.

## 5. Imatge i composició

- Prioritzar fotografies pròpies de treballs instal·lats per a Particulars i del taller, peces i procés real per a Industrial. No fer passar imatges generades o de banc per treballs de l'empresa.
- Mostrar metall real: unions, acabats, proporció i context d'ús. Evitar engranatges, guspires, xapa oxidada i degradats metàl·lics com a decoració recurrent.
- Base general clara amb moments foscos. Particulars necessita més aire i context humà; Industrial pot utilitzar més carbó i quadrícula compacta, alternats amb zones clares per llegir dades llargues.
- Els dos panells fotogràfics de la home han de compartir tractament de llum, escala i enquadrament perquè es llegeixin com una sola composició. Fotografies reals del client substituiran `fases/fase-2/FASE2-propostes/assets/`, que són només material de prova generat.
- La fotografia mai no pot assumir sola la funció d'informar o de navegar: nom de branca, acció i focus es mantenen visibles.

## 6. Components i estats

- **Capçalera:** la jerarquia i els elements són els fixats a la Fase 1. A Particulars, el telèfon ha de ser localitzable des de totes les pàgines. **Dada posterior de Fase 3:** el número principal confirmat és el 630 661 908, amb acció de WhatsApp; a Urgències es conserva també la trucada directa.
- **Enllaços i botons:** àrea interactiva d'almenys 44 × 44 px, text explícit, estat de focus visible i contrast suficient. El bordeus és principal en fons clar; en fons fosc, ús de blanc o del bordeus aclarit segons la funció.
- **Targetes de servei i projecte:** fotografia o detall real, títol llegible i acció identificable sense hover. Particulars pot tenir més espai; Industrial, dades més alineades i compactes.
- **Fitxes de capacitat i procés:** estructura regular per comparar informació, sense pictogrames que substitueixin els termes tècnics. No incloure toleràncies, terminis, maquinària ni certificacions no confirmades.
- **Formulari compartit:** estructura unificada amb camps adaptats a Particular o Empresa com estableix la Fase 1. L'adjunt industrial ha de ser prominent. Els estats d'error s'expliquen amb text, no només color.
- **Navegació i llengües:** els dos camins i el selector CA/ES/EN conserven el mateix comportament i posició conceptual entre branques. Preveure paraules més llargues en castellà i anglès.

## 7. Primera secció de la home

La prova executable és `fases/fase-2/FASE2-propostes/index.html`. El concepte de doble accés queda **aprovat**; la fotografia i el text final s'incorporaran en fases posteriors.

1. En escriptori, panells equivalents esquerra/dreta, amb tota l'àrea com a enllaç cap a `/particulars/` o `/industrial/`. Cap camí depèn d'un menú amagat.
2. En hover amb dispositiu apuntador fi, només la imatge activa passa de gris a color. La transició és curta, sense canvi de mida del panell ni salt de contingut.
3. En navegació amb teclat, el focus és visible i el panell recupera el color. Enter activa l'enllaç.
4. En tacte, els dos camins són clicables directament i conserven un tractament cromàtic que permet identificar les fotos sense necessitat de hover. A amplades reduïdes s'apilen.
5. Amb preferència de moviment reduït, les transicions queden anul·lades. L'efecte de color és complementari: nom i acció hi són sempre.
6. La home conserva contingut propi sota la primera secció, segons la Fase 1. La preferència recordada pot prioritzar la branca en visites posteriors sense amagar l'altra.

La prova s'ha verificat a 1440, 768, 390 i 320 px sense desbordament horitzontal, i amb ratolí, teclat, tacte emulat i moviment reduït. La UI final requerirà revisió en dispositius físics amb les fotografies aprovades.

## 8. Lliurables i límit de fase

- `DESIGN.md`: decisió i regles de la identitat.
- `design/tokens.css`: paleta, tipografia, espaiat, radis i moviment per a Astro/Tailwind. La integració concreta amb Tailwind es farà quan existeixi el projecte i se'n fixi la versió, sense canviar els valors aprovats.
- `design/fonts/`: font allotjada localment i llicència.
- `fases/fase-2/FASE2-propostes/`: comparativa històrica i prova funcional del concepte. Les opcions B/C i les imatges generades no són assets de producció.

No formen part de la Fase 2 els textos definitius, les traduccions, les paraules clau per pàgina, els mockups de plantilles ni el desenvolupament de la web. El client encara ha de facilitar fotografies reals, l'arxiu del logotip si en vol integrar un, i les dades de negoci pendents identificades al CONTEXT. La substitució de fotos i l'ajust de retall es faran sense reobrir l'arquitectura ni el llenguatge de marca.
