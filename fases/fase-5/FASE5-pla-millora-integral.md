# Fase 5 · Pla integral d'afinament UX i visual

**Estat:** proposta de treball del director de projecte, 27/09/2026. Requereix prova visual en una mostra abans de propagar-la a totes les rutes.  
**Abast:** experiència, densitat, jerarquia, color, tipografia, fotografia i moviment de la implementació Astro.  
**Límits:** es conserva el sitemap i els recorreguts de Fase 1, la separació Particulars/Industrial, els fets confirmats i la intenció de les maquetes de Fase 4. No es retallen continguts SEO útils només per escurçar pàgines. Les fotografies provisionals no es presenten com a obra real.

Aquest document concreta una nova petició d'afinament posterior a la validació de Fase 4. No modifica les maquetes congelades ni els documents de les fases anteriors. Quan una proposta visual alteri una decisió aprovada, primer s'ensenya en una pàgina pilot i es registra la decisió final.

## 1. Diagnòstic verificat

Captures de la previsualització Astro revisades a 1440 i 390 px, amb les seccions revelades després de fer scroll. L'auditoria anterior també va provar 768 i 320 px, menú, filtres i moviment reduït.

| Evidència | Lectura UX |
| --- | --- |
| A 390 px, la Home fa aproximadament 5.637 px; Particulars, 6.438 px; Industrial, 9.044 px; Estructures, 4.392 px; Portafoli, 6.690 px. | La llargada respon en part a contingut real, però les portades acumulen massa introducció, prova i detall abans de proposar el següent pas. No s'ha de fixar una alçada arbitrària: cal donar una funció única a cada secció. |
| Els tres casos de la portada Particulars ocupen uns 2.186 px a 390 px; la fitxa completa dels cinc casos és una altra ruta. | La vista prèvia s'acosta massa a l'experiència completa. Cal conservar els tres casos i el botó als cinc, però condensar la vista prèvia i reservar la lectura extensa per al portafoli. |
| A Industrial, el bloc Taller ocupa uns 2.237 px i Sèries + mètode uns 1.733 px a 390 px, abans de sectors, projecte i contacte. | La portada i `/industrial/capacitats/` necessiten papers editorials clarament diferents: orientació i prova ràpida a la portada; verificació tècnica a la fitxa. |
| A Particulars, hero + introducció sumen uns 1.036 px abans de la franja d'urgències a 390 px. | El telèfon és visible a capçalera, però l'accés específic a Urgències hauria d'estar disponible dins del primer viewport de la portada Particulars. |
| `src/templates/industrial.css` conté 91 valors hexadecimals diferents; `particulars.css`, 48; `contact.css`, 44. També acumulen molts `font-size` i espaiats locals. | No vol dir que cada color sigui erroni, però la implementació no té una gramàtica d'estils prou centralitzada. Això facilita diferències petites sense funció clara. |
| A Industrial apareixen `#7c2a30` en titular de capacitats, elements del taller, vora i CTA final, i `#d48e94` en el procés. | El reflex metàl·lic perd exclusivitat i la distinció de branca s'afebleix. La línia vermella del mètode sí que és una excepció demanada expressament pel director de projecte. |
| La Home usa escala de grisos al doble accés; Particulars i Portafoli també apliquen filtres diversos a les seves imatges. | L'efecte blanc i negre necessita una raó per context, no una aplicació general. La prova de treball real hauria de conservar informació del material i l'acabat quan hi hagi fotografia autoritzada. |
| `src/styles/motion.css` revela text durant 900 ms, imatges durant 1.100–1.600 ms i amaga elements fins que entren al viewport. | El moviment té caràcter, però pot crear trams inicialment buits. Els titulars, la informació i les accions essencials han de ser llegibles abans de l'efecte decoratiu. |
| A 320 px, el titular de Particulars queda retallat i el cos de les targetes 2×2 baixa a 10,56 px. | Són defectes de lectura verificats, prioritaris abans d'estendre el sistema visual. |

La sensació del director de projecte és, doncs, fundada. La identitat actual té potencial i moments potents; el problema principal és la manca de disciplina compartida en **què mostra cada pàgina, quan ho mostra i amb quins recursos visuals**.

## 2. Regla editorial i de navegació: una pàgina, una pregunta principal

Les rutes aprovades no obliguen l'usuari a visitar-les totes. La portada de cada branca ha de permetre decidir i actuar; les interiors han d'aprofundir només en el tema que promet el seu enllaç. Cada secció ha d'aportar una de quatre coses: **orientació, capacitat, prova o acció**. Si repeteix el mateix missatge de la secció anterior sense dades o exemples nous, es condensa.

| Ruta/patró | Pregunta que ha de respondre | Ajust concret |
| --- | --- | --- |
| Home `/` | «Sóc particular o empresa: per on començo i per què confiar-hi?» | Conservar el doble accés immediat. Les xifres aporten prova; el bloc Empresa explica trajectòria, sense tornar a descriure els mateixos serveis. El mosaic posterior serveix per saltar directament al servei, sense repetir la presentació de les dues branques. Un CTA principal clar per camí. |
| Particulars `/particulars/` | «Em poden ajudar amb aquesta feina o avaria?» | Afegir un camí visible a Urgències des del hero o situar la franja d'urgències immediatament després. Fer la introducció molt breu i diferenciar-la del hero. Conservar les quatre categories, inclosos els carros, en 2×2 a mòbil; el text explicatiu ha de ser llegible. Mostrar tres casos com a avenç compacte i reservar els cinc casos complets per al portafoli. Integrar la informació geogràfica sense una altra introducció llarga. |
| Servei Particulars, patró PS | «Què fan en aquest servei i què necessiten de mi?» | Hero específic, abast visual propi, passos clars i enllaç directe al portafoli filtrat i al contacte. La plantilla pot repetir estructura, però no paràgrafs genèrics ni una galeria inventada. L'usuari ha de poder seguir cap al projecte i el contacte sense haver de tornar enrere. |
| Portafoli Particulars | «Hi ha una feina comparable a la meva?» | Mantenir cinc casos i filtres. Quan arribin les fotos reals, deixar que l'obra tingui protagonisme. Cada cas: context, què es va fer i sortida al servei/contacte, sense tornades obligades. A mòbil, prioritzar una lectura contínua; l'efecte d'imatge fixa només si no atrapa l'scroll ni amaga text. |
| Industrial `/industrial/` | «Aquest taller encaixa amb la peça o sèrie que necessito?» | En el primer tram: proposta de valor, capacitat verificable breu i CTA cap a Capacitats o consulta. El mosaic del taller només anticipa materials, processos i muntatge. Sèries + mètode expliquen la manera de treballar, sectors demostren encaix, el cas Gàbia dona prova real i el contacte demana dades tècniques. Retallar frases que reformulen el mateix missatge de taller o producció. |
| Capacitats Industrial i altres interiors | «Puc verificar materials, màquines, soldadura, procés o sector?» | Profunditat tècnica pròpia de cada ruta, amb dades confirmades i enllaços contextuals. No copiar el mosaic i les frases de la portada. La fitxa de Capacitats és el detall, la portada n'és el resum. |
| Contacte compartit | «Quin canal em convé i què he d'aportar?» | Accions directes visibles, branca preseleccionada segons l'origen i camps només de la branca activa. Evitar repetir l'explicació de l'empresa. Fins que existeixi backend, indicar de manera inequívoca que el formulari és una demostració i dirigir a telèfon/WhatsApp/correu. |

**Regla d'enllaçat:** des de cada entrada important hi ha una sortida directa cap a **aprofundir** i una cap a **contactar**. Les targetes i els CTA descriuen el destí o l'acció («Veure materials i processos», «Veure tres casos d'estructures», «Enviar una consulta tècnica»), evitant etiquetes genèriques. En especial, l'empresa ha d'arribar de la Home a Capacitats o Contacte amb un camí curt. Només s'exposen enllaços a rutes implementades en aquesta entrega; les quatre interiors d'Industrial ajornades apunten a les seccions corresponents de la portada.

## 2.1 Priorització de les interiors Industrial en aquesta entrega · 27/09/2026

**Recomanació:** construir i polir `/industrial/` i `/industrial/capacitats/`. **Ajornar** com a pàgines independents `/industrial/series-curtes/`, `/industrial/sectors/`, `/industrial/proces/` i `/industrial/projectes/` fins que hi hagi contingut propi suficient. És una decisió d'abast de l'entrega actual, no una eliminació del sitemap validat de Fase 1 ni dels esborranys `content/ca/`.

Motiu constatat als textos disponibles: Sectors és sobretot una llista de cinc noms; Procés amplia els quatre passos que ja té la portada; Sèries curtes repeteix materials, mètode i consulta de la portada/Capacitats; Projectes només amplia el cas de deu gàbies sense nova fotografia o dades tècniques confirmades. La separació de rutes SEO de Fase 3 era una hipòtesi de creixement; no justifica publicar ara quatre pàgines de valor molt semblant. No hi ha un mínim de paraules SEO que calgui assolir: el criteri és que cadascuna respongui una pregunta pròpia amb informació verificable.

| Ruta planificada, ajornada | Destí útil durant aquesta entrega | Què falta per activar-la |
| --- | --- | --- |
| `/industrial/series-curtes/` | `/industrial/#series` | Abast de producció i almenys un exemple més complet confirmats pel client, amb explicació pròpia de la valoració d'una sèrie. |
| `/industrial/sectors/` | `/industrial/#sectors` | Context o casos diferenciats per sector; una llista de noms no és una fitxa sectorial. |
| `/industrial/proces/` | `/industrial/#proces` | Detall operatiu real de cada fase, documentació o comprovacions confirmades que vagin més enllà dels quatre passos resumits. |
| `/industrial/projectes/` | `/industrial/#projectes` | Fotografies originals i context tècnic autoritzat del cas Gàbia, o més casos industrials reals. |

**Implementació de la decisió:** mantenir a la portada els blocs de sèries/mètode, sectors i cas real, amb enllaços d'àncora accessibles. Al menú Industrial i als CTA de Home, Industrial, Capacitats i Contacte, substituir els quatre destins ajornats per aquests ancoratges o per una altra ruta real pertinent; la prova de navegació no pot portar a 404. Verificar que cada ID existeix, que l'scroll no queda tapat per la capçalera fixa i que l'enllaç és comprensible des d'una altra pàgina. Els esborranys ajornats no s'han de generar com a pàgines buides, posar al sitemap XML, declarar com a canonicals publicades ni indexar. Com que aquestes URL encara no s'han publicat, no cal crear redireccions 301 per al simple ajornament. Si alguna es publica i després es retira, caldrà revisar-ne els 301.

**SEO durant l'ajornament:** la intenció «sèries curtes / fabricació per a tercers» queda a `/industrial/`; materials, soldadura i maquinària a `/industrial/capacitats/`; sectors, mètode i Gàbia continuen com a seccions útils de la portada. Conservar títols, H2, text i enllaços HTML rastrejables, sense donar a les àncores el paper d'URL SEO independent. Registrar la diferència temporal respecte a `SEO-F3.md` i reavaluar les quatre rutes quan el client aporti contingut nou i quan hi hagi dades de Search Console/Analytics. No inventar especificacions per omplir pàgines.

## 3. Gramàtica visual proposada

### Color i superfícies

1. Definir rols semàntics en un únic lloc de la implementació: **fons de lectura**, **superfície de peça/imatge**, **fons fosc de marca**, **text**, **línia**, **acció**, **estat actiu** i **focus**. Partir de `design/tokens.css`, `src/styles/fase4.css` i la revisió de Fase 4. Documentar les diferències; no reescriure els valors congelats sense una decisió visual validada.
2. **Home compartida:** paper/carbó com a base i bordeus `#7c2a30` com a signe de marca i acció selectiva. Evitar una línia o una taca bordeus en cada secció.
3. **Particulars:** bordeus per a l'acció prioritària sobre clar, la franja d'urgències i estats seleccionats. Els titulars i paràgrafs segueixen tinta/blanc segons fons. Reservar els grans blocs bordeus per a moments de decisió, no per a qualsevol tancament repetit.
4. **Industrial:** plata `#c5ceca`, grafit i negre. Reflex metàl·lic només en fragments destacats dels titulars, amb contrast verificat. El bordeus continua com a parentiu discret de marca i **a la línia de progrés del mètode**, tal com es va aprovar; no domina titulars, mosaics o botons industrials. La pàgina Contacte adapta els estats visuals a la branca triada sense canviar-ne l'estructura.
5. Reduir les petites variants de gris, blanc i bordeus a un conjunt justificat de superfícies i línies. Les ombres i gradients han de descriure material, profunditat o lectura, mai omplir espai arbitràriament.

### Fotografia i tractament

- Preservar l'efecte de desaturació → color **només al doble accés de la Home**, on comunica una elecció. El text i la navegació hi són visibles sense hover.
- Interiors: una correcció de llum i contrast coherent per branca, sense alternar filtres de blanc i negre diferents com a patró decoratiu. Les fotos de treball real mostraran el material i l'acabat sense un filtre que n'oculti la prova.
- Les imatges conceptuals continuen etiquetades. Substituir-les per fotos originals autoritzades abans del judici visual final; triar retalls específics per a 1440, 768, 390 i 320 px. No afegir maquinària, peces o projectes ficticis per reforçar el disseny.

### Tipografia i ritme

- Source Sans 3 continua sent l'única família. Establir rols reutilitzables: **hero**, **H2 de secció**, **H3 de peça/cas**, **introducció**, **cos**, **metadada**. Una mateixa funció manté mida, interlineat i tracking semblants entre plantilles; les excepcions es documenten.
- El cos que explica serveis i decisions ha de ser llegible a mòbil, idealment de 16 px o més. A 320 px la graella 2×2 pot mostrar titular i resum curt, i situar l'explicació extensa fora de la targeta o a la pàgina de servei. Cap titular es pot retallar.
- Compartir amplada de contenidor, marges i una escala reduïda d'espaiats. Les seccions ordinàries han de créixer pel contingut; `min-height` i espais escènics es reserven al hero, al projecte visual o a una seqüència que realment ho necessiti. Evitar dos trams consecutius amb la mateixa composició «etiqueta + gran titular + paràgraf + buit».
- Retirar els rètols numerats decoratius de secció i l'espai que ocupaven. La jerarquia passa a dependre del títol, la composició i el contingut. Una secció, una acció principal; la secundària queda visualment subordinada.

### Retirada dels rètols numerats de secció · decisió del 27/09/2026

Eliminar de **totes les plantilles** els rètols decoratius del tipus «01 — Dues especialitats, un taller», «02 — El taller», «03 / Sectors» o «05 — Contacte». Cal retirar el marcatge i les cadenes d'interfície que quedin sense ús, no només amagar-los amb CSS. Després s'ha de recompondre cada capçalera de secció i reduir el marge superior o l'alçada que es reservava al rètol. El títol real i el contingut han de començar més amunt amb una separació coherent.

La retirada inclou els **prefixos numèrics** dels grups del formulari; se'n conserva el nom funcional («Dades de contacte», «La feina», «Documentació»). Es conserven H1/H2/H3, molles de pa i números que identifiquen una seqüència o un conjunt real —els quatre passos del mètode, els cinc casos, comptadors i dades empresarials— perquè aporten informació. Les etiquetes petites sense número només es mantenen si identifiquen branca, context, tipus d'obra o acció que el titular no explica. Això no canvia rutes, metadades SEO ni l'ordre de lectura accessible.

### Prova de blanc pur · decisió del 27/09/2026

Comparar el fons actual `--client-paper: #eeefeb` amb el blanc `#ffffff` en superfícies clares representatives. La prova temporal en navegador mostra una lectura més neta i més contrast entre tinta, bordeus i fotografia fosca a Home, Particulars i Portafoli. Si el blanc s'aplica indiscriminadament, es perd profunditat i la successió de franges clares/fosques es torna més dura. Per això el **Bloc 2 ha de presentar les dues variants** a 1440 i 390 px, almenys en xifres i serveis de Home, serveis de Particulars, capçalera i fitxes del Portafoli i Contacte.

La direcció inicial a provar és **blanc per a superfícies principals de lectura** i una única superfície neutra secundària justificada per separar fitxes, formulari o nivells d'informació. Revisar vores, grisos de text i transicions amb les fotografies. No canviar tots els fons ni `design/tokens.css` d'una sola passada abans de valorar el pilot.

## 4. Contracte de moviment

El moviment ha d'explicar **selecció, progrés o canvi d'estat**. La web no necessita una revelació teatral a cada paràgraf.

| Interacció | Tractament proposat | Condició de qualitat |
| --- | --- | --- |
| Doble accés Home | Transició curta del tractament fotogràfic a color en hover/focus. | Els dos enllaços i noms són visibles abans de moure el ratolí i funcionen amb tacte i teclat. |
| Menú, filtres, botons | Resposta immediata, aproximadament 160–220 ms, amb estat seleccionat clar. | Sense retard que faci dubtar si l'acció s'ha registrat. |
| Revelacions de secció | Reduir-les a pocs punts narratius; preferir opacity/translate subtils i durades de l'ordre de 300–450 ms. | Titular, text i CTA essencials no queden invisibles mentre l'usuari espera. Sense blur prolongat de lectura. |
| Mètode Industrial | Línia vermella progressiva i fases llegibles en ordre, horitzontal a escriptori i vertical a mòbil. | El scroll no queda capturat. Sense JavaScript o amb moviment reduït, tots els passos són visibles des del primer moment. |
| Casos Particulars | Transició discreta de cas/imatge que ajudi a relacionar fotografia i text. | Sense buits, salts o una imatge fixa que impedeixi recórrer la pàgina. Provar amb les fotos reals. |

Conservar `prefers-reduced-motion`, focus visible i contingut HTML complet sense JavaScript. Evitar animar amplada/alçada o filtres pesants durant l'scroll. Revisar especialment els 900–1.600 ms de `src/styles/motion.css` i el recompte de xifres: han d'aportar informació, no ajornar-la.

## 5. Seqüència d'implementació i revisió amb Claude

No executar tots els canvis en una sola passada. Cada bloc produeix un diff petit, captures i un informe curt. Codex revisa el resultat abans que Claude propagui el patró.

| Bloc | Claude implementa | Codex comprova | Porta de sortida |
| --- | --- | --- | --- |
| **0 · Inventari** | Matriu de contingut repetit i CTA per ruta; identifica text editorial validat, text d'interfície i pendent, sense canviar-los encara. Captures base a 1440/768/390/320. | Contrasta amb Fase 1, SEO-F3, continguts CA i traspàs de Fase 4. | Cap dada o ruta inventada; diagnòstic acordat. |
| **1 · Pilot d'estructura** | Home, Particulars i Industrial: propòsit únic per secció, accés urgent al primer viewport, teaser versus detall industrial, vista prèvia dels tres casos més compacta. Retirar els rètols numerats decoratius i l'espai que ocupaven. Conservar totes les rutes i informació útil. | Recorre tres tasques: avaria, reforma i fabricació; mesura decisions i scroll; revisa CTA i enllaços. | Els usuaris poden orientar-se i arribar al següent pas sense visitar pàgines alienes a la seva necessitat. |
| **2 · Pilot visual** | Aplica rols cromàtics, escala tipogràfica, superfícies i espaiat en les mateixes tres pàgines. Compara `#eeefeb` i `#ffffff` en els fons principals, amb captures equivalents a 1440 i 390 px. | Revisa coherència de marca, contrast, densitat i lectura a 1440/768/390/320. | Una direcció visual coherent i aprovada per propagar, sense retall a 320 ni text microscòpic. |
| **3 · Propagació** | Aplica el sistema als serveis, portafoli, Capacitats i Contacte de l'entrega actual. Retira també els rètols numerats de totes aquestes plantilles i n'ajusta l'alçada. No generis les quatre interiors Industrial ajornades. Diferencia cada contingut sense clonar introduccions. | Revisa una plantilla representativa i després els casos derivats, enllaços i coherència. | Cada ruta publicada té una pregunta, prova i acció pròpies; `check:links` sense errors ni enllaços a les quatre interiors ajornades. |
| **4 · Moviment** | Simplifica revelacions generals i implementa només els efectes aprovats amb alternatives accessibles. | Revisió específica d'animacions, tacte, teclat, scroll, moviment reduït i rendiment en mòbil. | La informació important és llegible immediatament i les animacions reforcen la comprensió. |
| **5 · QA editorial i publicació** | Alinea textos visibles amb `content/ca/` després de validació, integra fotografies autoritzades i resol pendents de Fase 5. | `npm run verify`, `npm run check:links`, recorreguts complets i SEO per ruta. | Noindex es retira només de pàgines aprovades; formulari només s'ofereix com a funcional després d'una prova real d'enviament. |

Les captures han de mostrar **estats acabats**, no seccions ocultes a l'inici d'una animació. Cada revisió inclou els quatre amples, un recorregut de teclat i un de tacte, contrast en clar/fosc i mode de moviment reduït. Es mesura el temps fins que es pot llegir la informació, no només la bellesa d'una captura estàtica. Cal provar finalment en dispositius físics amb les imatges definitives.

## 6. Instrucció preparada per a Claude Code

> Llegeix `fases/fase-5/FASE5-pla-millora-integral.md` i les fonts que s'hi citen. Aquesta és una petició nova d'afinament de Fase 5 del director de projecte. No alteris el sitemap, les rutes, els fets de l'empresa ni les maquetes congelades de Fase 4. Comença només pel **Bloc 0**: inventari de repeticions per ruta, CTA i comparativa de captures 1440/768/390/320, amb propostes de condensació que conservin la intenció SEO. Després implementa el **Bloc 1** com a pilot a Home, Particulars i Industrial, sense propagar-lo encara. En acabar cada bloc, mostra diff, captures i comprovacions; executa `/codex:review --wait` si el plugin està disponible i incorpora les troballes confirmades. No activis cap review gate automàtic ni donis permisos d'edició a Impeccable. Atura la propagació visual després del Bloc 2 perquè el director i Codex puguin valorar el pilot com a conjunt. No facis canvis editorials de fets ni prometis funcionalitat de formulari sense backend.

> **Afegit del 27/09/2026:** elimina a totes les seccions els rètols decoratius numerats i l'espai que ocupen, però conserva títols semàntics, grups funcionals i números de casos o passos. Al Bloc 2, compara visualment fons `#eeefeb` i `#ffffff`; mostra les dues variants abans de propagar el blanc i decideix-ne l'ús segons lectura, contrast i profunditat.

> **Abast Industrial d'aquesta entrega:** mantén `/industrial/` i `/industrial/capacitats/`. Ajornem `/industrial/series-curtes/`, `/industrial/sectors/`, `/industrial/proces/` i `/industrial/projectes/` perquè els textos actuals no aporten prou informació diferenciada. Conserva els seus esborranys i el sitemap mestre com a pla futur; ara no generis ni exposis aquestes quatre pàgines. Fes que menú i CTA apuntin a `/industrial/#series`, `#sectors`, `#proces` i `#projectes` segons el context, comprova els ancoratges i actualitza `FASE5-pendents.md` amb aquesta decisió d'abast. Reassigna la intenció SEO actual a Industrial/Capacitats sense crear pàgines duplicades ni inventar dades. Torna a proposar les URL interiors quan hi hagi contingut propi confirmat.

**Criteri d'èxit global:** els tres públics entenen què ofereix l'empresa, troben prova adequada i arriben al contacte corresponent per un camí curt; Home, Particulars i Industrial pertanyen a una mateixa marca però es distingeixen clarament; cap efecte, color o espai existeix només com a decoració sense funció.
