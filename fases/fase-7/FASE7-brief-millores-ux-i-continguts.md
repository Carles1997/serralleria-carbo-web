# Brief d'implementació · Claredat dels dos camins i refinament visual

**Projecte:** Serralleria Carbó · **Destinatari:** Claude, implementació de la web Astro  
**Estat:** proposta d'execució per revisar abans de donar per definitius els textos i el disseny  
**Origen:** auditoria transversal posterior als canvis del 03/10/2026 i observacions del director

## Objectiu

Fer que una persona entengui ràpidament quin camí li correspon, què pot encarregar i com contactar, amb menys repetició i menys desplaçament innecessari. Cal polir la Home, Particulars, Industrial i Contacte com un conjunt coherent. El resultat ha de conservar el caràcter aprovat: Particulars proper i clar, amb accent bordeus `#7c2a30`; Industrial tècnic i directe, amb tipografia i reflexos metàl·lics.

**Executa aquests canvis al projecte; no facis un nou mockup aïllat.** Abans d'editar, llegeix les decisions i els fitxers indicats al final. Si una dada o una decisió depèn del client, registra-la com a pendent i continua amb les parts independents.

## Decisions que no s'han de reinterpretar

- El sitemap i els recorreguts d'usuari de la Fase 1 estan validats. Mantén les rutes i la jerarquia. No creïs pàgines interiors noves per omplir contingut ni redirigeixis arbitràriament un camí cap a l'altre.
- La separació entre Particulars i Industrial **no depèn només del nombre d'unitats**. Industrial també pot fabricar un carro industrial unitari o una peça tècnica a plànol; Particulars inclou una feina específica per a un habitatge, comunitat o negoci i les reparacions. Una comunitat que demana diverses portes pot entrar per qualsevol camí i se l'ha d'atendre o orientar.
- Els carros industrials figuren com a producte d'Industrial. No els tornis a introduir com a servei de Particulars. Els exemples reals poden conviure en més d'un context si ja estan documentats i validats.
- Industrial també pot treballar per a constructores i promotores en projectes de certa escala. Evita que «obra» sense qualificar sembli una reforma domèstica.
- No inventis dades d'empresa, certificacions, projectes, fotos de producció en sèrie, adreces, marques ni prestacions. Mantén la distinció entre fotografies reals i conceptuals. El client ha confirmat que no hi ha fotografies pròpies de producció en sèrie, excepte les gàbies.
- Mantén l'eslògan «Sèries curtes. Peces exigents. Resposta industrial.» i els estats editorials actuals. No marquis contingut com a `approved`, no retiris `noindex` ni publiquis la web com a resultat d'aquest encàrrec.
- El SEO orgànic en profunditat es treballarà després que quedin definitius contingut i interfície. Conserva la semàntica, les metadades i els enllaços interns existents; no obris una nova ronda de paraules clau o slugs.

## 1. Unificar el criteri de decisió i els textos visibles

**Problema:** les noves explicacions de la Home, la guia de camins, Industrial i el formulari tornen diverses vegades sobre el mateix missatge. A més, «una peça → Particulars» pot enviar un carro industrial unitari al camí equivocat.

**Criteri editorial únic:**

| Particulars | Industrial |
| --- | --- |
| Reparació, instal·lació o feina a mida per a un espai concret: habitatge, comunitat o negoci. | Producció en sèrie o de diverses unitats, peces tècniques a plànol, carros industrials i elements per a projectes de construcció de més escala. També pot rebre un encàrrec industrial unitari. |

Fes servir formulacions breus adaptades a cada lloc, no aquesta taula repetida a totes les pàgines. Una referència per a la Home podria ser:

> **Per a un espai concret o una reparació?** Particulars. **Per a una sèrie, una peça tècnica o un projecte constructiu?** Industrial. Si no ho tens clar, explica'ns la feina i t'orientarem.

És text de treball, no una dada nova ni una exigència de copiar-lo literalment. Evita en qualsevol cas un criteri exclusivament numèric. Usa el mateix vocabulari en les targetes d'entrada, la guia, la introducció d'Industrial, les franges de pas entre branques i el formulari. Revisa també les frases que diuen «de Industrial»; escriu-les en català natural sense canviar el sentit.

Assigna una funció diferent a cada bloc:

1. **Home, accés doble:** decidir el camí.
2. **Home, serveis:** exemples concrets d'allò que es pot encarregar, sense tornar a explicar tota la regla.
3. **Industrial, «Què fabriquem»:** gamma de productes i tipus de fabricació.
4. **Industrial, taller i procés:** evidència de capacitat i manera de treballar.
5. **Contacte:** recollir la necessitat i ajudar a dirigir-la.

Retalla la repetició entre la portada d'Industrial i «Què fabriquem». No perdis informació confirmada per aconseguir frases més curtes.

## 2. Home · «Com triar el camí» molt més compacta

**Problema:** la guia actual ocupa una franja llarga després de les dues targetes d'accés. A 390 px, la primera pantalla no identifica prou aviat les dues opcions i l'usuari ha de baixar molt per veure Industrial.

**Proposta:** converteix-la en una **banda de decisió curta**, de lectura immediata, amb dues opcions clarament diferenciades i una única frase d'ajuda. Mantén els enllaços reals a `/particulars/` i `/industrial/` i els noms de les branques. El títol «Com triar el camí» pot continuar per accessibilitat, però no ha d'imposar una nova secció de gran alçada. No repeteixis en aquesta banda les llistes de productes de les targetes principals.

- **Escriptori:** banda en una o dues línies útils, alineada amb el sistema tipogràfic existent; evita una capçalera enorme, tres files de contingut i massa `padding-block`.
- **Mòbil:** presenta la guia compacta **abans de les dues targetes fotogràfiques** o integrada de manera equivalent just després de la introducció. La persona ha de veure explícitament «Particulars» i «Industrial» abans d'haver de recórrer les dues targetes completes. No converteixis aquesta solució en un menú que amagui un dels camins.
- A 390 × 844, tots dos noms i el criteri curt han de ser visibles sense el primer desplaçament. A 320 px, mantén-los llegibles i accionables encara que les targetes amb fotografia continuïn a sota.
- Redueix l'alçada de les targetes mòbils o de la introducció només en la mesura necessària; conserva les fotografies, la jerarquia de la portada i zones tàctils còmodes. No fixis una alçada que retalli el text.
- La guia ha de resoldre el dubte; no ha de semblar una tercera secció promocional.

## 3. Industrial · redissenyar «Què fabriquem» i mostrar abans el taller

La captura facilitada pel director mostra cinc targetes altes, totes amb «Demana pressupost». Aquesta repetició fa que la secció sembli més llarga del que requereix la informació i allunya «El taller en primer pla».

### Estructura proposada

- Mantén els **cinc productes** i el seu ordre: estructures/baranes/escales, portes/tancaments, mobiliari, carros industrials, peces/conjunts a mida.
- Presenta'ls com una **matriu editorial compacta** o una seqüència de mòduls curts, amb número discret, títol ben jerarquitzat, una descripció d'una o dues línies i una fletxa visual. Preserva l'estètica industrial, els límits fins i un estat de focus evident. Evita cinc rectangles de 300 px gairebé idèntics i buits.
- **Tota la cel·la pot ser l'enllaç** a Contacte amb `tipus=empresa` i el servei preseleccionat. Això conserva l'acció específica per producte sense imprimir «Demana pressupost» cinc vegades. La fletxa ha de ser decorativa (`aria-hidden`) i el nom accessible de cada enllaç ha de distingir el producte i indicar, si cal, que obre la consulta.
- Si cal un CTA textual, posa **una sola acció compartida** després de la matriu, per exemple «Explica'ns què cal fabricar» o «Envia una consulta tècnica», que obri la consulta d'empresa sense servei preseleccionat. Conviurà amb els enllaços específics de cada cel·la.
- La nota que porta cap a Particulars ha de ser breu i contextual. No afegeixis un altre bloc alt només per aquesta nota.
- Considera escurçar el títol «Què fabriquem en sèrie» a **«Què fabriquem»** si el títol actual fa entendre que un carro industrial unitari o una peça a plànol queden exclosos. El text introductori ha de deixar clars els tres supòsits: diverses unitats/sèries, peces a plànol i encàrrecs industrials unitaris quan pertoqui. Aquesta decisió s'ha de reflectir alhora a `content/ca/industrial.md`, a la UI i als ancoratges que la descriguin.
- No afegeixis fotografies falsament presentades com a fabricació pròpia de sèries.

### Alçada i relació amb «El taller en primer pla»

**Criteri verificable per a escriptori:** en arribar a l'àncora `#produccio` a **1440 × 900 px**, la matriu ha de ser prou breu perquè **el títol o l'inici visual d'«El taller en primer pla» es vegi a la mateixa pantalla**, sense un segon gest de scroll. Aquest és el sentit operatiu de «veure el taller sense haver de fer scroll» en aquesta part de la pàgina. Mantén la portada Industrial ja aprovada: no cal forçar que tot el taller aparegui a la primera pantalla de `/industrial/` des de dalt.

Per aconseguir-ho, ajusta conjuntament espai superior/inferior, separació del titular, alçada de les cel·les i nota final. No ho resolguis amagant contingut, reduint la lletra per sota d'una lectura còmoda o superposant seccions. A 768/390/320 px, prioritza lectura, toc i una transició més curta que l'actual; la mateixa exigència de 900 px no s'aplica a pantalles petites.

### Interacció

El `hover` pot aportar una línia de llum metàl·lica, un desplaçament molt subtil de la fletxa o un canvi de contrast. El mateix estat s'ha d'entendre amb `focus-visible`; res essencial no pot dependre del `hover`. Respecta `prefers-reduced-motion`. Si hi ha animació d'entrada, que no amagui targetes a qui navega amb teclat o té moviment reduït. Prioritza llegibilitat sobre efecte.

## 4. Navegació i destinació dels CTA

- A la Home, el menú «Projectes» apunta a `/particulars/projectes/`. Fes que l'etiqueta identifiqui que són projectes de Particulars, sense crear ni moure rutes.
- A Particulars, l'opció «Mobiliari» del menú obre una consulta perquè la ruta de detall està ajornada. Canvia l'etiqueta perquè indiqui l'acció real, per exemple «Consulta mobiliari»; mantén el destí i la preselecció existents.
- Confirma que totes les cel·les noves d'Industrial conserven els paràmetres correctes del formulari. Un enllaç visualment bonic que obre una consulta genèrica quan s'havia escollit un producte seria una regressió.
- Mantén operatives les rutes validades i evita nous enllaços a pàgines encara no construïdes.

## 5. Contacte · mateix formulari, instrucció més inclusiva

El títol «Explica'ns el projecte» no és natural per a una avaria urgent. Proposa un titular transversal com **«Explica'ns què necessites»** i una ajuda breu que serveixi tant per a reparacions com per a fabricació. Conserva els camps, els filtres i la preselecció per tipus de consulta. Revisa que l'etiqueta de consulta Industrial no exclogui constructores o promotores.

El formulari encara té tasques pendents de posada en producció; **no afirmis que els missatges ja s'envien** només perquè la selecció i la interfície funcionen. No substitueixis dades de contacte confirmades.

## 6. Identitat visual i ritme de pàgina

- Conserva tipografia, paleta i tractament del logotip aprovats. Aplica el bordeus de manera funcional i consistent a Particulars i el gris metàl·lic a Industrial; no reparteixis accents perquè sí.
- La primera pantalla de Particulars és força fosca i desaturada i s'assembla massa a Industrial. Prova un tractament fotogràfic una mica més càlid o lluminós **sense canviar la imatge ni perjudicar el contrast del text**. Si la foto no permet una millora neta, documenta-ho com a decisió condicionada a fotografia definitiva.
- Harmonitza grandàries de titulars, amplades de lectura i espai vertical entre Home, Particulars, Industrial i Contacte. Elimina espais que separen contingut relacionat, però conserva pauses que ajuden a entendre blocs diferents.
- Evita transicions brusques entre blanc pur, fons foscos i superfícies grises: compara pàgines consecutives en context, no seccions aïllades. No facis una repaletització completa.
- Mantén els efectes metàl·lics llegibles i verifica que les darreres lletres de línia no quedin retallades a cap amplada.

## 7. Coherència de fonts i dades pendents

- Actualitza la presentació d'Industrial a `content/ca/empresa.md` perquè no sembli limitada a fabricants i integradors; inclou també constructores i promotores si el context de l'oració ho permet. No ampliïs prestacions no confirmades.
- Revisa conjuntament `content/ca/`, `src/i18n/ui.ts` i les plantilles perquè els textos visibles no contradiguin el contingut editorial. Mantén el mecanisme de control de referències del projecte.
- L'adreça de la pàgina de contacte i la que apareix als textos legals poden tenir funcions diferents (`59` davant de `59-61`). **No les unifiquis per suposició.** Registra per al client la confirmació de l'adreça de taller/visites i la del domicili social, i després etiqueta cada ús de manera precisa.
- Mantén com a pendents coneguts les fotografies definitives, les dades que el client encara no ha validat, la tramesa real del formulari i els controls de publicació. No els presentis com a errors nous d'aquesta iteració.

## Fitxers i fonts a consultar abans d'editar

1. `fases/fase-1/FASE1-arquitectura-serralleria-carbo.md` i `fases/fase-7/FASE7-proposta-dos-camins.md` per a l'arquitectura i l'última decisió del client.
2. `DESIGN.md`, `design/tokens.css`, `fases/fase-4/FASE4-sistema-visual.md` i les maquetes aprovades de Fase 4 per a la identitat visual.
3. `content/ca/home.md`, `particulars.md`, `industrial.md`, `contacte.md`, `empresa.md` i `ui.md` per al contingut.
4. `src/templates/HomeTemplate.astro`, `IndustrialTemplate.astro`, `industrial.css`, `ParticularsTemplate.astro`, `particulars.css`, `ContactTemplate.astro`, `src/i18n/ui.ts`, `src/config/routes.ts` i el codi del formulari per a la implementació.
5. Els documents de pendents de Fase 5 i les decisions posteriors del client. Si hi ha contradicció amb una font anterior, prioritza la decisió més recent que consti com a validada i explica-la.

## Ordre d'execució i comprovació

1. Fes una lectura curta de les fonts, detecta si hi ha canvis més recents que afectin aquest brief i resumeix qualsevol contradicció real abans d'implementar-la.
2. Ajusta primer el criteri editorial compartit i les destinacions dels enllaços. Després refina Home, Industrial i Contacte. Tanca amb la passada visual transversal.
3. Executa `npm run verify` i `npm run check:links`. Si el control de referències exigeix registrar els canvis deliberats en fitxers validats, segueix el procediment existent; no desactivis la comprovació.
4. Revisa la web renderitzada a **1440, 768, 390 i 320 px**. Verifica especialment la Home abans del primer scroll, `#produccio` a 1440 × 900, les cel·les Industrial, el menú mòbil, el formulari, el focus de teclat, el tacte, el moviment reduït i l'absència de desbordament horitzontal.
5. Recorre tres casos: reparació urgent; feina a mida per a una comunitat; empresa que demana una sèrie o un carro unitari. Cada persona ha de poder entendre el camí i arribar a la consulta adequada. Documenta qualsevol pas que continuï ambigu.
6. Lliura una relació breu de fitxers canviats, captures comparatives de les zones clau, resultats de proves i pendents que necessiten resposta del client. No facis `push` ni desplegament sense una instrucció expressa posterior.

## Condicions de tancament

- Els dos camins s'identifiquen aviat en mòbil i el criteri de decisió és coherent sense repeticions innecessàries.
- «Com triar el camí» ocupa clarament menys espai i continua accessible.
- «Què fabriquem» presenta els cinc productes de manera visual i compacta, sense cinc «Demana pressupost», amb destinacions específiques intactes.
- En entrar a `#produccio` a 1440 × 900, es veu l'inici d'«El taller en primer pla» sense continuar desplaçant-se.
- Les dades confirmades, la identitat aprovada, el sitemap, els estats editorials i les rutes continuen intactes.
- Les proves automàtiques i els recorreguts manuals indicats passen, o queda explicat exactament què falla i per què.

---

## Execució (06/10/2026)

**Contradicció resolta:** la decisió del 03/10/2026 (`FASE7-proposta-dos-camins.md`) separava els camins per nombre d'unitats. Aquest brief, posterior i del director, l'afina: Industrial també rep encàrrecs unitaris (un carro, una peça a plànol). S'aplica el brief.

### Canvis

| Punt | Fet | Fitxers |
|---|---|---|
| 1. Criteri únic | Particulars: «Per a un espai concret o una reparació». Industrial: «Sèries, peces a plànol i projectes». El mateix vocabulari a les targetes d'entrada, la guia, la introducció d'Industrial, les franges entre branques i el formulari. «de Industrial» → «d'Industrial». Retallada la repetició entre la portada d'Industrial i «Què fabriquem» | `content/ca/home.md`, `particulars.md`, `industrial.md`, `industrial-capacitats.md`, `industrial-proces.md`, `industrial-projectes.md`, `contacte.md`, `ui.md`, `src/i18n/ui.ts` |
| 2. Home | «Com triar el camí» és ara la capçalera compacta del doble accés: dues preguntes amb el nom de la branca i una frase d'ajuda. A mòbil queda abans de les dues targetes. La introducció té una mica menys d'aire a ≤ 400 px. La secció de serveis només dona exemples («Alguns exemples del que pots encarregar a cada camí») | `HomeTemplate.astro` |
| 3. Industrial | «Què fabriquem en sèrie» → «Què fabriquem», amb l'entrada que cobreix els tres supòsits. Matriu compacta de cinc cel·les: tota la cel·la és l'enllaç amb el producte preseleccionat, té una fletxa decorativa (`aria-hidden`) i el text accessible «…, obre una consulta tècnica». Al peu, una sola acció compartida («Envia una consulta tècnica») i la nota breu cap a Particulars. La línia de llum i el desplaçament de la fletxa també funcionen amb `focus-visible`, i es desactiven amb moviment reduït | `IndustrialTemplate.astro`, `industrial.css` |
| 4. Navegació | Home: «Projectes» → «Projectes particulars». Particulars: «Mobiliari» → «Consulta mobiliari» (mateix destí i mateixa preselecció). Les cinc cel·les conserven `tipus=empresa` i el seu `servei` | `src/i18n/ui.ts` |
| 5. Contacte | Titular «Explica'ns què necessites», ajuda «Serveix tant per a una reparació com per a una fabricació». Tipus de consulta: «Espai concret o reparació» / «Sèrie, peça tècnica o projecte», amb el detall «Empreses, constructores i promotores». El camp de text passa a dir «Descripció», perquè no repeteixi el titular. Camps, filtres i preselecció sense canvis | `src/i18n/ui.ts`, `content/ca/contacte.md`, `content/ca/ui.md` |
| 6. Identitat | Hero de Particulars més càlid i lluminós amb la mateixa imatge (sèpia lleu, més brillantor, vel més lleuger a la dreta). La zona del text conserva la foscor | `particulars.css` |
| 7. Fonts | Empresa: Industrial també per a empreses, constructores i promotores | `content/ca/empresa.md` |

Revisió validada registrada a `check-references` («brief de millores UX i continguts del director (06/10/2026)»). No s'ha canviat cap estat editorial, `noindex`, ruta ni sitemap.

### Comprovacions

- `npm run verify` (0 errors, 0 avisos), `check:links` i `check:redirects`: correctes.
- **Home abans del primer desplaçament:** «Particulars» i «Industrial» visibles a 390 × 844 (enllaços a 506 i 567 px) i a 320 × 640 (554 i 635 px). Abans, a 390 × 844 només es veia «Particulars» al final de la pantalla.
- **`#produccio` a 1440 × 900:** el títol «El taller en primer pla» comença a 672 px. Abans era a 981 px, fora de pantalla.
- Sense desbordament horitzontal ni errors de consola a 1440, 768, 390 i 320 px a les deu rutes principals.
- Focus de teclat visible a la guia i a les cel·les.

### Recorreguts

1. **Reparació urgent:** Home → «Per a un espai concret o una reparació? Particulars» (o la rajola «Reparacions») → franja «Tens una avaria?» amb el telèfon i el formulari. Clar.
2. **Feina a mida per a una comunitat:** Home → Particulars → Portes i motors o Estructures → formulari «Espai concret o reparació». Si la comunitat vol diverses portes, la franja de Particulars i la nota d'Industrial l'orienten, i els dos camins l'atenen.
3. **Empresa que demana una sèrie o un carro unitari:** Home → «Per a una sèrie, una peça tècnica o un projecte constructiu? Industrial» → «Què fabriquem» → Carros industrials («d'una unitat o en sèrie») → formulari d'empresa amb «Carros industrials» preseleccionat. **Ambigüitat residual lleu:** la pregunta de la guia no esmenta els carros. Qui busca un carro unitari els troba a la targeta d'Industrial i a «Què fabriquem».

### Pendents per al client

- **Adreça:** confirmar l'adreça de taller i visites (ara «59» a Contacte i al Perfil d'Empresa) i el domicili social («59-61» als textos legals). No s'han unificat. Quan es confirmi, s'etiquetarà cada ús.
- **Menú d'Industrial:** l'element «Sèries curtes» (nom del sitemap de la Fase 1) porta a «Què fabriquem». Si es vol, es pot canviar l'etiqueta del menú sense tocar la ruta.
- Continuen pendents, sense canvis en aquesta iteració: fotografies definitives, tramesa real del formulari i controls de publicació.
