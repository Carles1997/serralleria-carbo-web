# Proposta · Separació entre Particulars i Industrial

**Data:** 03/10/2026 · **Origen:** reunió del director amb el client · **Estat:** decidida i implementada el 03/10/2026: alternativa A amb Reparacions.

## Decisió i respostes del client (03/10/2026)

- **Alternativa A** i **Reparacions** al lloc dels carros a Particulars.
- **En sèrie es pot fer qualsevol peça a mida:** portes, mobiliari, estructures, carros industrials…
- **Les portes en sèrie inclouen la instal·lació.**
- **No hi ha fotos de producció en sèrie**, a part de les gàbies. La secció nova d'Industrial fa servir targetes de text, sense imatges.
- **Una comunitat que vol 10 portes** hauria d'anar a Industrial, però no passa res si entra per Particulars. El missatge principal és que la línia Industrial s'ha obert per oferir els serveis de Particulars en diverses unitats o en sèrie. Per això els textos diuen «Si entres per aquí, també t'atendrem» i «Si dubtes, escriu-nos igualment».

**Implementació:**

| Àrea | Fitxers |
|---|---|
| Home: criteri a les targetes d'entrada, franja «Com triar el camí», columnes de serveis simètriques | `content/ca/home.md`, `HomeTemplate.astro`, `ui.ts`, `photography.ts` |
| Particulars: Reparacions al lloc dels carros, franja pont cap a Industrial i enllaç del hero | `content/ca/particulars.md`, `ParticularsTemplate.astro`, `particulars.css` |
| Estructures i Automatismes: franja pont | `ServiceTemplate.astro`, `service.css`, `ui.ts` |
| Industrial: secció «Què fabriquem en sèrie», amb els carros, i nota inversa cap a Particulars. El menú «Sèries curtes» hi porta | `content/ca/industrial.md`, `IndustrialTemplate.astro`, `industrial.css`, `routes.ts` |
| Formulari: tipus de consulta per encàrrec i desplegable de producte a Industrial | `content/ca/contacte.md`, `content/ca/ui.md`, `ContactTemplate.astro`, `contact-form.ts` |

La revisió validada queda registrada a `check-references`.

---

## Petició del client

1. A la Home no queda clar quan s'ha d'anar a Particulars i quan a Industrial. Ha de quedar explícit des de la portada.
2. Els serveis de Particulars (estructures, mobiliari, portes…) també es poden fer en producció industrial: una constructora o un promotor que en vol diverses unitats o una sèrie ha d'entrar per Industrial.
3. Industrial s'ha d'entendre com la via per a produccions de més d'una peça o en sèrie.
4. Les seccions de Particulars i d'Industrial també han de canviar, perquè cap usuari dubti de quin camí ha de triar.
5. Els carros industrials passen a ser exclusius d'Industrial, i cal decidir què ocupa el seu lloc a Particulars.

## Diagnòstic de la web actual

El problema de fons és que la web separa les dues branques **per públic** («per a casa, comunitats i negocis» davant d'«empreses»), però ensenya els **productes** només a Particulars. Qui busca baranes, portes o mobiliari els troba sota Particulars i hi entra, encara que en necessiti cinquanta per a una obra.

| On | Què es veu ara | Per què confon |
|---|---|---|
| Home · «Tria el teu camí» | Particulars: «Baranes, escales, portes, automatismes i mobiliari a mida». Industrial: «Sèries curtes. Peces exigents. Resposta industrial.» | Els productes només surten a Particulars. Industrial només té l'eslògan, i ningú llegeix «baranes en sèrie». El criteri (una peça o moltes) no apareix enlloc. |
| Home · subtítols del camí | «Per a casa, comunitats i negocis» / «Empreses · construcció · producció» | Un negoci o una comunitat que vol diverses portes no sap si és «negoci» o «producció». |
| Home · «Serveis i capacitats» | Columna Particulars amb 4 serveis, inclosos els **carros industrials**. Columna Empreses amb una sola peça genèrica, «Capacitats industrials». | Els carros industrials surten sota Particulars, i Industrial no hi té cap producte. |
| Particulars · «Feines a mida» | 4 serveis: Portes i motors, Estructures, **Carros industrials** i Mobiliari | No hi ha cap indicació que diverses unitats o una sèrie es demanen per Industrial. |
| Industrial · portada | Taller, materials, sèries, sectors, gàbies. El text diu «peces, carros i conjunts» i «estructures per a constructores» | No hi ha cap llista de què es fabrica en sèrie (estructures, portes, mobiliari, carros), ni cap senyal per a qui ve de Particulars. |
| Formulari | «Particular · Habitatge, comunitat o negoci» / «Empresa · Fabricació i projectes industrials». Una sola llista de serveis per a tots dos, amb carros. | Un promotor que vol baranes no és «particular», però tampoc no se sent «fabricació industrial». |

## Criteri proposat

**El camí el decideix el tipus d'encàrrec, no el producte ni qui l'encarrega:**

| Particulars | Industrial |
|---|---|
| **Una feina a mida** per a un espai concret: una barana, una porta, un moble, una reparació | **Diverses unitats, una sèrie o una obra**: el mateix element repetit, peces a plànol, subministrament per a una obra |
| Habitatges, comunitats i negocis | Constructores, promotores, empreses, fabricants, enginyeries i integradors |
| Visita, mides de l'espai, instal·lació i reparació | Plànol o especificació, unitats, material i termini |

**Els productes són comuns a tots dos camins:** estructures i baranes, portes i automatismes, mobiliari. N'hi ha d'exclusius:
- **Només Particulars:** reparacions i urgències.
- **Només Industrial:** carros industrials, peces i conjunts a plànol.

Aquesta frase ha d'aparèixer a la Home, a totes dues portades i al formulari, amb les mateixes paraules: **«Una feina a mida → Particulars · Diverses unitats o en sèrie → Industrial»**.

## Alternatives

### Alternativa A · Mateixos productes, dos camins (recomanada)

Es manté l'estructura validada (fork a la Home, dues portades, mateixes URL). S'hi afegeixen el criteri explícit i una llista de productes a Industrial.

**Home**
1. **Fork «Tria el teu camí»:**
   - Subtítols nous:
     - Particulars: «Una feina a mida per a casa, la comunitat o el negoci».
     - Industrial: «Diverses unitats, sèries i obres».
   - Text de cada targeta amb el criteri:
     - Particulars: «Baranes, escales, portes, automatismes i mobiliari per a un espai concret. També reparacions.»
     - Industrial: es manté «Sèries curtes. Peces exigents. Resposta industrial.» i s'hi afegeix «Estructures, portes, mobiliari i carros en sèrie per a constructores, promotores i empreses».
2. **Franja «Com triar»** just sota el fork, abans de les xifres, en una línia: «Una sola peça o una instal·lació → Particulars · Diverses unitats, una sèrie o una obra → Industrial». A mòbil va abans de les targetes.
3. **«Serveis i capacitats»:** les dues columnes passen a ser simètriques.
   - **Particulars:** Portes i motors · Estructures · Mobiliari a mida · Reparacions.
   - **Industrial:** Estructures i baranes per a obra · Portes i tancaments en sèrie · Mobiliari en sèrie · Carros industrials. El text de la columna és «Peces a plànol i sèries curtes · Acer i inoxidable».
   - Les targetes d'Industrial porten a la portada d'Industrial (secció nova, vegeu més avall) o al formulari d'empresa amb el servei preseleccionat.

**Particulars**
4. **Graella de serveis:** surt Carros industrials i entra **Reparacions** (vegeu les opcions de més avall).
5. **Franja pont** després de la graella, amb l'estil de la franja «Tens una avaria?»: «**Necessites diverses unitats o és per a una obra?** Les mateixes estructures, portes i mobiliari també els fabriquem en sèrie per a constructores, promotores i empreses. → Industrial».
6. **Hero:** l'enllaç petit «Industrial ↗» de la cantonada passa a dir «Diverses unitats o en sèrie? Industrial ↗».
7. **Pàgines de servei** (Estructures, Automatismes): una línia al final, «També en sèrie per a obres i empreses → Industrial».

**Industrial**
8. **Secció nova «Què fabriquem en sèrie»**, després del hero. Reutilitza les targetes amb imatge de «Experiència en cinc sectors»:
   - Estructures, baranes i escales per a obra;
   - Portes i tancaments en sèrie;
   - Mobiliari en sèrie;
   - Carros industrials;
   - Peces i conjunts a plànol.

   Cada targeta porta al formulari d'empresa amb el servei preseleccionat. Entradeta: «Els mateixos productes que fem a mida per a particulars, fabricats en diverses unitats o en sèrie, a partir del plànol o de l'especificació.»
9. **Franja pont inversa** al final: «Només necessites una peça per a casa teva, la comunitat o el negoci? → Particulars».

**Formulari**
10. **Tipus de consulta per encàrrec**, no per públic:
    - «**Una feina a mida** · Habitatge, comunitat o negoci: una peça, una instal·lació o una reparació»;
    - «**Diverses unitats o en sèrie** · Constructores, promotores i empreses: sèries, obres i peces a plànol».
11. **Llista de serveis segons el tipus:**
    - **A mida:** Urgències i reparacions · Estructures · Portes i automatismes · Mobiliari.
    - **En sèrie:** Estructures i baranes · Portes i tancaments · Mobiliari · Carros industrials · Peces a plànol.

    Els camps propis d'empresa (unitats, material, termini, plànol) ja hi són.

| A favor | En contra |
|---|---|
| Resol totes les peticions del client sense tocar URL ni sitemap | Més text nou per validar (Home, dues portades, formulari) |
| Reutilitza components que ja existeixen (targetes, franges, graelles) | La secció nova d'Industrial necessita imatges. Si no hi ha fotos reals de sèries, s'han d'usar les del taller o deixar-la sense foto |
| El mateix criteri apareix als quatre llocs on l'usuari decideix | — |
| Millora el SEO d'Industrial: termes com «baranes per a obra» o «carros industrials» | — |

**Esforç:** mitjà, 1–2 sessions de desenvolupament més la validació de textos.

### Alternativa B · Primer el producte, després el volum

La Home deixa de començar pel fork i comença pels productes. Cada producte (estructures, portes, mobiliari, carros) té dos botons: «Per al teu espai» (Particulars) i «Diverses unitats o en sèrie» (Industrial).

| A favor | En contra |
|---|---|
| És la manera més directa de dir que el producte és comú | Trenca la composició validada de la Home (el fork és el primer bloc de la maqueta de la Fase 4) |
| Útil per a qui arriba sabent què vol | Les urgències perden protagonisme a l'entrada |
| — | Més feina de disseny i de validació |
| — | Duplica la navegació |

**Esforç:** alt. Requereix redissenyar la Home.

### Alternativa C · Mínima: només textos i el canvi dels carros

S'hi apliquen només els punts 1, 4, 5 i 10 de l'alternativa A: textos del fork, carros fora de Particulars, franja pont a Particulars i noms del formulari. Industrial no canvia.

| A favor | En contra |
|---|---|
| Ràpida i amb poc risc | Industrial continua sense ensenyar què fabrica en sèrie, i el carro desapareix de Particulars sense un lloc clar on anar |
| — | Resol la meitat del problema |

**Esforç:** baix.

## Què posem a Particulars en lloc dels carros

| Opció | Contingut | Valoració |
|---|---|---|
| **1. Reparacions (recomanada)** | Targeta pròpia per a reparacions i urgències (la pàgina `/particulars/urgencies/` ja existeix). «Portes i motors» queda per a la fabricació, la instal·lació i la motorització. | Contingut real i validat. Reforça el servei que més demana el particular (diverses ressenyes del Perfil d'Empresa parlen d'avaries de portes de pàrquing). La graella queda en 4 serveis. |
| 2. Targeta pont cap a Industrial | 4a targeta: «Diverses unitats? → Industrial» | Omple el forat i explica el criteri, però barreja serveis i navegació dins la mateixa graella. Millor com a franja (punt 5 de l'alternativa A). |
| 3. Graella de 3 serveis | Portes i motors · Estructures · Mobiliari | Senzill, però deixa la graella desequilibrada respecte de la maqueta (2 × 2). |
| 4. Projectes | Targeta cap als cinc treballs reals | Ja és a la secció següent («Fets, no només paraules»): seria repetitiu. |

**Recomanació:** opció 1, juntament amb la franja pont del punt 5.

## Què no canvia

- **URL i sitemap de la Fase 1:** no s'afegeix cap ruta.
  - Si més endavant es vol una pàgina pròpia per a la producció en sèrie, el lloc previst és `/industrial/series-curtes/`. Ja és al sitemap (ara ajornada) i el seu esborrany parla de sèries curtes; caldria ampliar-lo amb la llista de productes.
  - `/particulars/mobiliari/` continua ajornada.
- El missatge validat «Sèries curtes. Peces exigents. Resposta industrial.»
- El sistema visual i els components: accent bordeus a Particulars, plata sobre grafit a Industrial.
- No s'inventa cap xifra, capacitat de producció, client ni projecte. L'únic cas en sèrie publicat continua sent el de les deu gàbies.

## Què cal confirmar amb el client

1. Quins productes es fabriquen en sèrie: estructures i baranes, portes i tancaments, mobiliari, carros. Hi ha cap producte que es faci en sèrie i no surti en aquesta llista, o al revés?
2. Les portes en sèrie inclouen la motorització i la instal·lació en obra, o només la fabricació?
3. Si hi ha fotos reals de produccions en sèrie (a més de les gàbies) per a la secció nova d'Industrial.
4. Si un negoci o una comunitat que demana diverses unitats iguals (per exemple, deu portes de trasters) ha d'entrar per Industrial. El criteri proposat diu que sí.

## Decisió que es demana al director

- **Alternativa:** A (recomanada), B o C.
- **Substitut dels carros a Particulars:** opció 1 (recomanada), 2, 3 o 4.
- **Textos:** validar o ajustar les propostes dels punts 1, 2, 5, 6, 8, 9 i 10.

Quan hi hagi la decisió, la implementació segueix el flux habitual: textos a `content/ca/` i `src/i18n/ui.ts`, revisions validades a `check-references`, revisió a 1440, 768, 390 i 320 px, i comprovacions del projecte.
