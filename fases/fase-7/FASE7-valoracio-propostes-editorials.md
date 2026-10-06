# Fase 7 · Valoració de les propostes editorials

**Data:** 06/10/2026  
**Informe revisat:** `FASE7-revisio-editorial-refinament.md`  
**Abast:** valoració del contingut i de la seva presentació en les plantilles actuals. No s'han modificat textos de la web.

## 1. Valoració general

La proposta va ben encaminada: elimina llenguatge intern, explicacions duplicades i frases que no ajuden a decidir. Tanmateix, no convé aprovar-la íntegrament tal com està. Algunes retallades eliminen matisos comercials o introdueixen una distinció massa àmplia entre «particular» i «empresa».

La regla és **reduir repetició, no informació que canvia una decisió**. S'han de preservar especialment:

- La reparació o instal·lació per a un negoci dins de Particulars.
- Els projectes de constructores i promotores dins d'Industrial.
- La fabricació industrial d'una sola unitat, a partir d'un plànol **o d'una especificació**.
- La possibilitat de subministrar sense muntatge.
- L'equip propi de soldadura i muntatge.
- L'àrea de servei habitual i la valoració de feines fora d'aquesta zona.
- El caràcter opcional dels plànols i altres documents en una primera consulta.
- L'horari i els canals d'atenció per incidències.

La revisió s'ha fet contra `content/ca/`, `src/i18n/ui.ts` i les plantilles Astro actuals. No és una nova auditoria visual renderitzada ni una comprovació de l'enviament del formulari.

## 2. Propostes que es poden implementar tal com estan

| ID | Decisió | Motiu / informació que es preserva |
| --- | --- | --- |
| H-2 | Aplicar | «Taller de fabricació» és suficient: la ubicació ja s'explica a la mateixa Home |
| H-5 | Aplicar | «Acer al carboni i inoxidable» conserva el material; sèries, peces i carros continuen identificats al conjunt de la secció |
| H-6 | Aplicar | La frase curta conserva incidència, projecte i requisits d'una peça; s'elimina una explicació interna del formulari |
| H-7 | Aplicar | «Formulari de contacte» diferencia bé aquest enllaç de WhatsApp, telèfon i correu del mateix bloc |
| P-2 | Aplicar | Es mantenen fabricació, instal·lació, peces a mida, públic i taller; els exemples continuen als treballs reals |
| P-3 | Aplicar | La targeta continua identificant portes, persianes i motors; la franja d'avaries conserva trucada i horari |
| P-5 | Aplicar | Elimina «portada» i «casos recuperats», que són llenguatge de projecte; els casos i contextos es mantenen |
| P-6 | Aplicar | Elimina una frase que repeteix el botó; l'accés «Veure els cinc treballs» ha de conservar protagonisme |
| P-7 | Aplicar | Conserva descripció, fotografia, mides i document; la justificació final era redundant |
| S-2 | Aplicar | El títol i l'enllaç ja expliquen el destí d'Automatismes |
| S-3 | Aplicar | «Truca'ns o escriu-nos» és una acció concreta, adequada per a reparacions |
| S-4 | Aplicar | L'entrada d'Estructures ja conserva espai, ús, acabat i tipologies |
| S-5 | Aplicar | Es poden retirar les metadades decoratives d'Estructures; es mantenen «Baranes», «Escales» i «Passarel·les» |
| S-7 | Aplicar | Instal·lació i revisió de sistemes existents continuen explicades a l'entrada d'Automatismes |
| I-2 | Aplicar | Una frase de context i les quatre fases expliquen el mètode; no cal un segon titular i paràgraf equivalents |
| I-3 | Aplicar | Retirar «Cada encàrrec es concreta segons els seus requisits» no elimina els sectors ni la construcció a gran escala |
| C-2 | Aplicar | «Confirmats» descriu el procés intern de validació, no una utilitat per al visitant; les denominacions dels materials es mantenen |

### Condicions de coherència de la implementació

- **H-5:** no eliminar alhora els productes i tota menció a sèries/peces a plànol del context proper. El nou text identifica el material, no substitueix l'explicació de l'oferta.
- **P-3:** escurçar la targeta, però conservar la franja «Tens una avaria?» amb acció de trucada i horari. No reduir també aquesta franja fins que la pàgina perdi l'orientació per incidències.
- **P-6:** retirar també el contenidor buit i ajustar el layout. L'usuari havia demanat precisament que el botó del portafoli fos fàcil de trobar.
- **S-2, S-4 i S-7:** adaptar les plantilles quan el paràgraf deixa d'existir; no deixar etiquetes `<p>` buides ni assertions que continuïn exigint-lo.
- **S-5:** la proposta afecta les metadades d'Estructures. No eliminar automàticament les d'Automatismes: «Motorització i reparació» o «Revisió de sistemes instal·lats» poden aportar informació diferent del nom de la fotografia.
- **I-2:** preservar fases i animació. Actualitzar conjuntament el model Markdown, la lectura de subseccions i els hooks; no amagar només l'H3 amb CSS.

## 3. Propostes que convé implementar amb aquests ajustos

Els textos següents són la recomanació de revisió per substituir les propostes originals; no s'han aplicat ni es registren encara com a textos validats al mecanisme de hashes.

### H-1 · Taller de la Home

**No eliminaria íntegrament el paràgraf amb l'única compensació proposada.** La fila «Tall, plegat i soldadura de ferro i inoxidable» conserva material i processos, però perd la distinció entre subministrament i muntatge i la referència a peces i sèries.

Proposta de paràgraf compacte:

> Peces i sèries de ferro i inoxidable, amb subministrament o muntatge segons l'encàrrec.

Conservar les files «Al taller», «Sobre el terreny» i «On treballem». Si es vol eliminar completament el paràgraf, traslladar **també** la possibilitat de subministrament sense muntatge a les files, no només els materials. No duplicar ambdues alternatives.

### H-3 · Vehicles

**No aplicar «6 + 1 / furgonetes i un camió ploma» com a simple escurçament.** És una composició que obliga a interpretar quin nombre correspon a cada vehicle.

Conservar inequívocament:

> 6 furgonetes · 1 camió ploma

Si les xifres grans continuen sent «6 + 1», presentar cada unitat associada al seu nombre i donar al conjunt un nom accessible complet. Resoldre la repetició amb composició, no suprimint la correspondència entre dada i etiqueta. No cal canviar la dada ni convertir-la en una xifra nova.

### H-4 · Antetítols dels serveis a la Home

«Espais i reparacions» funciona per a Particulars. **«Empreses i obra» és massa ampli com a criteri independent:** un comerç que necessita reparar una persiana també és una empresa, però el seu camí és Particulars.

Proposta:

- **Particulars:** «Espais i reparacions».
- **Industrial:** «Sèries, peces a plànol i obra».

Les targetes principals mantenen els públics explícits: habitatges/comunitats/negocis i constructores/promotores/empreses. El tipus d'encàrrec és el criteri que resol l'encavalcament, no la condició jurídica de qui consulta.

### P-1 · Accés a Industrial des de Particulars

No aplicaria «Empresa, obra o peça a plànol? Industrial»: pot enviar qualsevol negoci cap a Industrial i «obra» pot incloure una reforma domèstica.

Proposta coherent amb la guia actual de la Home:

> Constructora, promotora, sèrie o peça a plànol? Industrial

Manté visibles constructores/promotores i no exclou la fabricació en sèrie, que desapareixia de la proposta original.

### P-4 · Pont entre Particulars i Industrial

«També els fabriquem en sèrie» té un antecedent poc clar després d'una graella de serveis que inclou reparacions. A més, la proposta torna a presentar Industrial sobretot com a sèrie o peces, amb menys claredat per a obra.

Proposta:

> A Industrial fabriquem estructures, portes i mobiliari per a sèries i projectes d'obra, i peces a plànol i carros industrials per a empreses, constructores i promotores. També fem encàrrecs industrials d'una sola unitat.

Es pot conservar «Si tens dubtes, t'orientem» com a ajuda breu si hi ha un contacte accessible al mateix bloc. No és necessari repetir-la a totes les pàgines.

### S-1 · Fitxa d'Urgències

«Ens ajuden aquestes dades» és correcte, però una etiqueta més directa explica millor què ve a continuació.

Proposta:

> Si prefereixes el formulari, indica:

Conservar els tres punts —porta, què passa, on és—, la nota de fotografia opcional i l'accés directe al formulari.

### S-6 · Equip propi a Estructures

És adequat treure la frase sobre l'equip propi de la fitxa que demana dades. **No és adequada la desaparició d'aquesta informació de la pàgina:** reforça que no només es fabrica, sinó que també es pot muntar amb recursos propis.

Aplicar el text curt de la fitxa:

> Per valorar la teva estructura, ens ajuden tres dades.

Traslladar «El taller disposa d'equip propi de soldadura i muntatge» a la presentació del servei, o integrar-ne el significat en la frase sobre fabricació i instal·lació. Mostrar-ho una sola vegada i no crear una nova secció gran per a aquesta dada.

### S-8 · Incidència a Automatismes

Es pot eliminar el número del paràgraf perquè hi ha un botó amb el número i acció `tel:`. **Conservaria el verb «truca»**, que orienta millor qui té una avaria que no pas el genèric «explica'ns».

Proposta:

> Si la porta o el motor falla, truca'ns i explica'ns la incidència.

Conservar el botó telefònic i l'accés a Urgències. No convertir-ho en una promesa de servei immediat o 24 hores.

### I-1 · Què fabriquem a Industrial

La proposta original és més curta, però elimina **«a partir d'una especificació»** i no explicita l'obra. La persona que té requisits però no té un plànol pot interpretar que encara no pot consultar.

Proposta:

> Fabricació per a empreses i obra: estructures, portes i mobiliari, en sèrie o a mida; peces a partir d'un plànol o d'una especificació, i encàrrecs industrials d'una sola unitat.

Conservar les cinc famílies de producte i la referència a constructores/promotores a les targetes corresponents. No afegir una promesa de fabricació il·limitada ni quantitats mínimes o màximes.

### I-4 · Tancament d'Industrial

Es pot eliminar del paràgraf la llista de material/unitats/termini perquè es mostra al costat. Mantindria el matís de valoració territorial i la documentació com a aportació opcional.

Proposta:

> Si en tens, adjunta un plànol o documentació. Per a fabricació en sèrie, podem valorar encàrrecs d'arreu de Catalunya.

Conservar la guia visible «Per valorar la consulta» amb documentació, material i aplicació, unitats i termini. Si en un futur s'elimina aquesta guia, revisar el paràgraf: la supressió deixa de ser segura si desapareix també l'altra font d'informació.

### Ct-1 · Àrea de servei a Contacte

La proposta «Treballem… i fins a Barcelona» formula amb més certesa el que Contacte actualment presenta com a feines que es valoren. Conservaria el matís sense recuperar el paràgraf llarg.

Proposta:

> Per a particulars, treballem principalment a Vilafranca del Penedès i la rodalia i valorem feines fins a Barcelona. Per a fabricació industrial en sèrie, podem valorar encàrrecs d'arreu de Catalunya.

Es pot eliminar «Indica'ns la ubicació al formulari…». La població continua disponible com a dada opcional. No donar a entendre que tots els muntatges industrials es fan arreu de Catalunya: l'abast ampli indicat correspon a la fabricació en sèrie.

## 4. Propostes condicionades i conservacions

### C-1 · Introducció de Capacitats

**Es pot aplicar**, perquè la nota renderitzada `.c-plan-note` conserva expressament que mides, gruixos i toleràncies es revisen amb la documentació tècnica.

La nota s'ha de mantenir visible al flux de lectura; no eliminar-la després per reduir espai. Aquesta informació evita presentar les capacitats com una garantia genèrica de qualsevol dimensió o tolerància.

### G-1 · Lema del peu

**Conservar** «Vilafranca del Penedès · Des de 1989». Una coincidència entre l'H1 de la Home i el peu no és una redundància perjudicial: a les altres pàgines el peu identifica ubicació i trajectòria.

### Part C · Blocs sense proposta

La conservació general és raonable, especialment serveis, casos reals, materials, maquinària, processos, xifres, estat de certificacions i textos jurídics.

No s'ha d'interpretar «sense proposta» com una validació definitiva de totes les frases. Dues expressions visibles mereixen una revisió específica addicional, sense frenar les correccions anteriors:

- **«Qualsevol peça a mida»**, a la rajola industrial de Home: és una formulació absoluta. Recomanació més precisa: **«Peces i conjunts a mida»**, coherent amb la família de producte ja documentada.
- **«El primer projecte publicat d'Industrial…»**, al cas de les gàbies: explica l'ordre de publicació, no un benefici per al client. Proposta: **«Fabricació i subministrament de deu gàbies per a un client industrial.»** Manté quantitat, treball i públic sense llenguatge intern.

Són propostes addicionals, no canvis ja aprovats o implementats.

## 5. Revisió dels canvis de Contacte ja aplicats

La simplificació descrita a la Part A és coherent amb el brief: menys introducció, un sol títol, dades centralitzades i descripció sense el camp «peça» duplicat.

Convé comprovar tres punts abans de considerar-la tancada:

1. **Selector «Industrial · Empreses i obra»:** comparteix el risc d'ambigüitat d'H-4. Recomanació de detall més informatiu: **«Sèries, peces a plànol i obra»**, mantenint «Industrial» com a nom de branca. Així una reparació d'un comerç no queda identificada automàticament com a Industrial.
2. **Incidències:** eliminar la llarga ajuda és correcte; conservar el telèfon molt visible i l'horari. Si la pàgina deixa de orientar una avaria, és preferible una indicació breu al canal telefònic que recuperar el paràgraf eliminat.
3. **Adjunt:** «Opcional» és suficient només si l'etiqueta diu clarament que es poden aportar fotografies o documents. Si hi ha límits de mida o formats reals, no suprimir aquesta ajuda funcional com si fos farciment.

El formulari segueix pendent d'enviament segons l'informe. Cap millora editorial pot convertir la validació local en una confirmació de recepció.

## 6. Textos legals i continguts ajornats

- **Dos H1 a les pàgines legals:** la font actual té un H1 a la capçalera i renderitza també el del Markdown, ocult per CSS. Es pot corregir tècnicament per renderitzar el títol una sola vegada, sense canviar el contingut jurídic, la jerarquia de les clàusules ni els ancoratges de l'índex. No cal reobrir la redacció legal per aquesta correcció de plantilla.
- **Adreça 59 / 59–61:** no normalitzar-la editorialment. Poden ser dues formes legítimes de representar ubicació i domicili; confirmar amb el client abans de canviar dades legals.
- **Continguts ajornats:** conservar-los sense publicar. Les correccions de la web activa no autoritzen reactivar pàgines ni renombrar les URL d'Industrial.

## 7. Instrucció operativa per a Claude

Aquest document és una valoració del revisor. L'ordre d'execució l'ha de donar el director després de llegir-la; no registris aquest informe com a aprovació dels canvis pendents.

Si el director confirma aquesta selecció:

1. Aplica les propostes del §2 i C-1 amb les seves condicions.
2. Per als IDs del §3, utilitza les versions revisades aquí en lloc de les versions originals.
3. Conserva G-1 i tota la informació rellevant enumerada al §1.
4. Presenta o aplica els ajustos addicionals del §4–5 segons l'abast de l'autorització rebuda.
5. Actualitza Markdown, UI i parsers conjuntament. Registra només les revisions efectivament aprovades en `check-references.mjs`; no desactivis les proteccions.
6. Comprova la lectura amb els textos veïns: una frase només és redundant si la informació que conserva un altre bloc és realment visible.
7. Executa `npm run verify`, `npm run check:links` i les comprovacions de navegació pertinents. Revisa que els textos i botons segueixin llegibles a 1440, 768, 390 i 320 px.

**No s'han modificat els continguts, les plantilles ni els canvis locals existents en aquesta revisió.**
