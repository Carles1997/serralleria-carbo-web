# Fase 7 · Revisió editorial del refinament global

**Data:** 06/10/2026
**Encàrrec:** `FASE7-brief-refinament-global-i-contacte.md`, §4 (G01)
**Mètode:** s'ha llegit el text que veu l'usuari a les deu rutes generades, a 1440 px. Inclou capçalera, menú, peu, titulars, entrades, targetes, CTA, textos sobre fotografia, formulari, ajudes i estats. El text s'ha extret del navegador i s'ha contrastat amb la seva font (Markdown de `content/ca/` o `src/i18n/ui.ts`).

## Com llegir aquest informe

- **Part A:** canvis concrets ja aplicats, autoritzats pel brief (§4.4 i §10). Estan registrats a `check-references` («refinament global i Contacte del director (06/10/2026)»).
- **Part B:** propostes de reescriptura addicionals. **No s'han aplicat**: esperen la validació del director o del client. Cada proposta indica el text actual exacte, la proposta exacta i el motiu.
- **Part C:** textos que es conserven, agrupats quan no hi ha cap incidència.
- **Part D:** textos legals (només comprovació, sense reescriure) i continguts ajornats sense ruta activa.

Decisions possibles: **conservar**, **escurçar**, **substituir**, **eliminar** o **pendent de dada**.

---

## A. Canvis concrets ja aplicats (autoritzats pel brief)

| Ruta i bloc | Fitxer/font | Text anterior exacte | Decisió | Text aplicat | Motiu |
| --- | --- | --- | --- | --- | --- |
| Home · targeta Industrial | `content/ca/home.md` | Sèries curtes. Peces exigents. Resposta industrial. | Substituir | Fabricació en sèrie. Peces exigents. Resposta industrial. | §4.4 i H03: l'oferta ja no es limita a sèries curtes |
| Industrial · H1 | `content/ca/industrial.md`, `ui.ts` `industrial.hero.title` | Sèries curtes. Peces exigents. Resposta industrial. | Substituir | Fabricació en sèrie. Peces exigents. Resposta industrial. | §4.4 |
| Industrial · menú (portada i Capacitats) | `ui.ts` `industrial.nav`, `content/ca/ui.md` | Sèries curtes | Substituir | Fabricació en sèrie | §4.4. El destí continua resolt a `/industrial/#produccio`; la ruta ajornada `/industrial/series-curtes/` no canvia |
| Industrial · metadescripció | `content/ca/industrial.md` (frontmatter) | …Vilafranca del Penedès: sèries curtes en acer al carboni i inox 304/316, soldadura MIG/MAG i TIG. | Substituir | …Vilafranca del Penedès: fabricació en sèrie en acer al carboni i inox 304/316, soldadura MIG/MAG i TIG. | §4.4. Només es corregeix la limitació; la resta del SEO es manté |
| Industrial · mètode | `content/ca/industrial.md` | Aquest procés ordena la conversa tècnica, la preparació i la fabricació d'una sèrie curta. | Substituir | Aquest procés ordena la conversa tècnica, la preparació i la fabricació segons els requisits acordats. | §4.4 |
| Home · taller (H2) | `content/ca/home.md` | Fabriquem al taller. Muntem quan cal | Substituir | Fabriquem al nostre taller. Muntem al teu projecte | §4.4, H04 i §7.2 |
| Contacte · H1 | `content/ca/contacte.md` | Contacta amb Serralleria Carbó | Substituir | Contacte | §10.2: un únic H1, «Contacte» |
| Contacte · entrada | `content/ca/contacte.md` | Explica'ns què necessites i tria si és **per a un espai concret o una reparació** o si és **una sèrie, una peça tècnica o un projecte constructiu**. Així podem demanar-te la informació adequada des del primer moment. | Eliminar | — | §4.4 i C01 |
| Contacte · títol sobre el formulari | `ui.ts` `contactPage.form.heading` i `intro` | Explica'ns què necessites / Serveix tant per a una reparació com per a una fabricació. Els camps marcats amb * són necessaris. Si es tracta d'una incidència urgent, truca directament al 630 661 908. | Eliminar | — | §4.4 i C01. Es conserva l'etiqueta funcional «Descripció» |
| Contacte · ajudes i lateral per branca | `content/ca/contacte.md` (seccions «Si és per a un espai concret…» i «Si és una sèrie…»), `ui.ts` `contactPage.aside` | Indica el tipus de servei —urgències i reparacions, estructures, portes i automatismes o mobiliari— i descriu la feina… / Per a una incidència, pots trucar al **630 661 908**… / Indica què cal fabricar (estructures, portes amb instal·lació…)… / El contacte industrial comparteix el número… / «Si et va millor, parlem-ne ara» / «Consulta tècnica directa» | Eliminar | — | C02 i C03: sense columna que repeteixi el camí triat ni explicacions repetides. El telèfon, el WhatsApp i el correu queden a la columna de contacte |
| Contacte · selector de camí | `ui.ts` `contactPage.form.branch`, `content/ca/ui.md` | Espai concret o reparació · Habitatge, comunitat o negoci / Sèrie, peça tècnica o projecte · Empreses, constructores i promotores | Substituir | Particulars · Espais i reparacions / Industrial · Empreses i obra | §10.3 |
| Contacte · camp duplicat | `ui.ts` `contactPage.form.fields.peca` | Tipus de peça o conjunt * | Eliminar | — (la peça es descriu a «Descripció») | §10.3: el camp obligatori duplicava la descripció |
| Contacte · horari | `content/ca/contacte.md` | De dilluns a divendres, de 8 a 13 h i de 15 a 18 h. Dissabtes i diumenges, tancat. | Substituir | **Dilluns a divendres:** 8:00–13:00 i 15:00–18:00 / **Dissabte i diumenge:** tancat | §10.4: horari en dues línies |
| Contacte · ubicació (H2) | `content/ca/contacte.md`, `ui.ts` `contactPage.place.heading` | Ens trobaràs a Vilafranca | Substituir | On som | §10.5 i C04: títol funcional petit |
| Contacte · bloc d'adreça del Markdown | `content/ca/contacte.md` | **Serralleria Carbó S.L.** / Carrer d'Eugeni d'Ors, 59 / 08720 Vilafranca del Penedès, Barcelona / **630 661 908** (principal · WhatsApp) · **93 890 27 94** (fix) / **carbo@serralleriacarbo.com** | Eliminar | — (les dades surten de `src/config/site.ts`) | §10.5: no repetir raó social, telèfons, correu i adreça en blocs consecutius. El bloc no es mostrava enlloc; era contingut mort |
| Contacte · avís del botó | `ui.ts` `contactPage.form.pending` | Formulari en preparació: encara no envia consultes. | Escurçar l'ajuda; ampliar l'avís | Formulari en preparació: encara no envia consultes. Mentrestant, truca o escriu-nos per WhatsApp. | §10.7: missatge honest amb l'alternativa directa |
| Contacte · ajuda de l'adjunt | `ui.ts` `contactPage.form.upload` | Adjunta una fotografia o un document si en tens. / Adjunta la documentació tècnica disponible. | Escurçar | Opcional. | C03: l'etiqueta ja diu què es pot adjuntar |
| Contacte · grups del formulari | `ui.ts` `contactPage.form.sections` | Dades de contacte / La feina | Eliminar | — | C03: formulari d'una sola columna lògica, sense subtítols de grup |
| Contacte · dades opcionals | `ui.ts` `contactPage.form.extra` (nou) | — | Afegir etiqueta funcional | Afegir més dades (opcional) / Afegir dades tècniques (opcional) | §10.3: grup desplegable amb població i, a Industrial, unitats, material, termini i sector |

Els noms de camp es conserven (`tipus`, `nom`, `correu`, `telefon`, `servei`, `descripcio`, `adjunt`, `ubicacio`, `unitats`, `material`, `termini`, `sector`, `consentiment`, `comunicacions`). S'afegeix `empresa` (opcional, només a Industrial) i se suprimeix `peca`.

---

## B. Propostes de reescriptura pendents de validació

**No s'han aplicat.** Per aprovar-les, cal indicar-ne els números. Totes reutilitzen dades ja confirmades; cap n'introdueix de noves.

### Home (`/`)

| # | Ruta i bloc | Fitxer/font | Text actual exacte | Decisió | Proposta exacta | Motiu i possible efecte |
| --- | --- | --- | --- | --- | --- | --- |
| H-1 | Taller · paràgraf | `content/ca/home.md` | Treballem el ferro i l'inoxidable al taller de Vilafranca. Segons l'encàrrec, fabriquem peces i sèries per subministrar-les o ens desplacem per fer-ne el muntatge. | Eliminar (i moure el material a la fila) | Fila «Al taller»: **Tall, plegat i soldadura de ferro i inoxidable** | Repeteix el titular i les tres files (§7.2). La secció baixa unes 3 línies |
| H-2 | Xifres · etiqueta del taller | `content/ca/home.md` | Taller de fabricació a Vilafranca del Penedès | Escurçar | Taller de fabricació | Vilafranca ja és a l'H1 i a «On treballem» |
| H-3 | Xifres · vehicles | `content/ca/home.md`, `ui.ts` `home.numbers` | 6 +1 / 6 furgonetes i 1 camió ploma | Escurçar | 6 +1 / furgonetes i un camió ploma | La xifra es repeteix a l'etiqueta |
| H-4 | Serveis · antetítols de branca | `ui.ts` `home.services.*.eyebrow` | Per a un espai concret / Sèries, peces a plànol i projectes | Substituir | Espais i reparacions / Empreses i obra | Mateix vocabulari que el selector de Contacte. Evita barrejar públic i tipus d'encàrrec |
| H-5 | Serveis · rajola d'Industrial | `ui.ts` `home.services.tiles` | Sèries, peces a plànol i carros · Acer i inoxidable | Escurçar | Acer al carboni i inoxidable | Els tipus de producte ja són a les etiquetes de sota |
| H-6 | Tancament · text | `content/ca/home.md` | Explica'ns una incidència, descriu el projecte que tens previst o envia els requisits d'una peça. El contacte s'adapta a particulars i empreses perquè la consulta arribi amb la informació adequada. | Escurçar | Explica'ns una incidència, el projecte que tens previst o els requisits d'una peça. | H05 i §7.3: la segona frase torna a explicar els dos camins |
| H-7 | Tancament · enllaç al formulari | `content/ca/home.md` | Contacta amb Serralleria Carbó | Substituir | Formulari de contacte | El nom de l'empresa es repeteix; «Formulari» descriu el destí, com a Particulars |

### Particulars (`/particulars/`)

| # | Ruta i bloc | Fitxer/font | Text actual exacte | Decisió | Proposta exacta | Motiu i possible efecte |
| --- | --- | --- | --- | --- | --- | --- |
| P-1 | Entrada · enllaç a l'altra branca | `ui.ts` `particulars.hero.otherBranch` | Sèries o peces tècniques? Industrial | Substituir | Empresa, obra o peça a plànol? Industrial | Criteri dels camins: constructores i promotores troben Industrial |
| P-2 | Serveis · entrada | `content/ca/particulars.md` | Una passarel·la interior, baranes per a una reforma, una porta de pàrquing motoritzada: són treballs que hem fet i que pots veure a Projectes. Fabriquem i instal·lem peces a mida per a habitatges, comunitats i negocis des del nostre taller a Vilafranca del Penedès. | Escurçar | Fabriquem i instal·lem peces a mida per a habitatges, comunitats i negocis des del nostre taller de Vilafranca del Penedès. | La primera frase anticipa la secció de treballs reals, que ve just després |
| P-3 | Serveis · Reparacions | `content/ca/particulars.md` | Si una porta, una persiana o un motor ha deixat de funcionar, truca'ns durant l'horari d'atenció i explica'ns què ha passat. | Escurçar | Portes, persianes i motors que han deixat de funcionar. | La franja «Tens una avaria?» ja dona la trucada i l'horari |
| P-4 | Pont cap a Industrial · text | `content/ca/particulars.md` | Les mateixes estructures, portes i mobiliari també els fabriquem en sèrie, i amb la línia Industrial fem peces a plànol i carros industrials per a empreses, constructores i promotores. Si entres per aquí, també t'atendrem. | Escurçar | També els fabriquem en sèrie. Industrial fa peces a plànol i carros per a empreses, constructores i promotores; si entres per aquí, també t'atendrem. | Més breu, amb el mateix criteri |
| P-5 | Treballs reals · entrada | `content/ca/particulars.md` | A la portada destaquem tres treballs documentats: baranes interiors, una estructura per a ascensor i les persianes motoritzades d'un negoci. El portafoli recull els cinc casos recuperats, fets per a habitatges, comunitats i negocis. | Substituir | Tres treballs documentats en un habitatge, una comunitat i un negoci. El portafoli en recull cinc. | «A la portada destaquem» i «casos recuperats» és llenguatge intern; els títols ja anomenen els tres casos |
| P-6 | Treballs reals · tancament | `ui.ts` `particulars.projects.outroTitle` | Els cinc treballs, al portafoli | Eliminar | — (es manté el botó «Veure els cinc treballs») | El botó ja ho diu |
| P-7 | Tancament · text | `content/ca/particulars.md` | Descriu la feina i, si en tens, adjunta una fotografia, les mides o un document. Així podem començar a valorar el projecte amb informació concreta. | Escurçar | Descriu la feina i, si en tens, adjunta una fotografia, les mides o un document. | La segona frase no afegeix cap dada |

### Serveis de Particulars

| # | Ruta i bloc | Fitxer/font | Text actual exacte | Decisió | Proposta exacta | Motiu i possible efecte |
| --- | --- | --- | --- | --- | --- | --- |
| S-1 | Urgències · fitxa | `content/ca/particulars-urgencies.md` | Si t'estimes més utilitzar el formulari, indica el tipus de porta, què ha deixat de funcionar i, si pots, adjunta una fotografia. | Escurçar | Si prefereixes el formulari, ens ajuden aquestes dades. | Els tres passos i la nota opcional ja ho detallen |
| S-2 | Urgències · relacionat | `content/ca/particulars-urgencies.md` | Si vols conèixer la feina d'instal·lació i motorització de portes, consulta també la pàgina d'automatismes. | Eliminar | — (es mantenen el titular i l'enllaç) | Repeteix el titular «També pots veure els automatismes» |
| S-3 | Urgències · tancament (H2) | `ui.ts` `service.pages.particulars-urgencies.contactHeading` | Explica'ns què ha passat | Substituir | Truca'ns o escriu-nos | És el tercer «Explica'ns» seguit de la pàgina; les accions són trucar i escriure |
| S-4 | Estructures · tipologies | `ui.ts` `service.pages.particulars-estructures.scope.lead` | Baranes, escales, passarel·les i altres peces definides segons l'espai, l'ús i l'acabat. | Eliminar | — | Repeteix l'entrada de la pàgina gairebé paraula per paraula |
| S-5 | Estructures · etiquetes de les fotografies | `ui.ts` `service.pages.particulars-estructures.scope.panels[].meta` | Habitatges · comunitats · negocis / Ferro a mida / Estructures metàl·liques | Eliminar | — | No aporten informació nova i en una foto repeteixen l'H1 |
| S-6 | Estructures · fitxa | `content/ca/particulars-estructures.md` | Per valorar la teva estructura, ens ajuda tenir tres dades sobre la feina. El taller disposa d'equip propi de soldadura i muntatge. | Escurçar | Per valorar la teva estructura, ens ajuden tres dades. | La segona frase no té relació amb la fitxa |
| S-7 | Automatismes · tipologies | `ui.ts` `service.pages.particulars-automatismes.scope.lead` | Motoritzem portes i revisem sistemes que ja estan instal·lats. | Eliminar | — | Repeteix l'entrada de la pàgina |
| S-8 | Automatismes · avaria | `content/ca/particulars-automatismes.md` | Si la porta o el motor falla, truca al 630 661 908 i explica'ns la incidència. | Escurçar | Si la porta o el motor falla, explica'ns la incidència. | El número ja és al botó del costat |

### Portafoli (`/particulars/projectes/`)

Sense propostes. Es conserva tot (Part C).

### Industrial (`/industrial/`)

| # | Ruta i bloc | Fitxer/font | Text actual exacte | Decisió | Proposta exacta | Motiu i possible efecte |
| --- | --- | --- | --- | --- | --- | --- |
| I-1 | Què fabriquem · entrada | `content/ca/industrial.md` | Els mateixos productes que fem a mida per a particulars, en diverses unitats o en sèrie; peces a partir d'un plànol o d'una especificació, i encàrrecs industrials d'una sola unitat. | Escurçar | Productes a mida en diverses unitats o en sèrie, peces a plànol i encàrrecs d'una sola unitat. | Més directe, mateix abast. Un carro d'una sola unitat continua cobert |
| I-2 | Sèrie · dues frases de context | `content/ca/industrial.md` | Material, soldadura, muntatge i quantitat es valoren conjuntament abans de fabricar. Cada sèrie es concreta segons els seus requisits. / ### Quatre passos. Una feina ben definida / Aquest procés ordena la conversa tècnica, la preparació i la fabricació segons els requisits acordats. | Escurçar | Material, soldadura, muntatge i quantitat es valoren conjuntament abans de fabricar. (sense l'apartat H3 ni el segon paràgraf) | §9.2: «una única frase de context útil». L'H3 ja s'ha reduït a etiqueta petita; eliminar-lo requereix canviar l'estructura validada del Markdown |
| I-3 | Sectors · entrada | `content/ca/industrial.md` | …altres elements metàl·lics. Cada encàrrec es concreta segons els seus requisits. | Escurçar | …altres elements metàl·lics. | «Es concreta segons els seus requisits» apareix tres vegades a la pàgina |
| I-4 | Tancament · text | `content/ca/industrial.md` | Indica material, tipus de peça, unitats i termini que necessites. Adjunta un plànol o la documentació disponible perquè l'equip pugui valorar la consulta. Per a feines de sèries, podem estudiar encàrrecs d'arreu de Catalunya. | Escurçar | Adjunta un plànol o la documentació disponible. Per a sèries, estudiem encàrrecs d'arreu de Catalunya. | La llista «Per valorar la consulta», just al costat, ja demana material, unitats i termini |

### Capacitats (`/industrial/capacitats/`)

| # | Ruta i bloc | Fitxer/font | Text actual exacte | Decisió | Proposta exacta | Motiu i possible efecte |
| --- | --- | --- | --- | --- | --- | --- |
| C-1 | Entrada | `content/ca/industrial-capacitats.md` | Materials, processos i maquinària del taller d'Industrial. Els gruixos, les mides i les toleràncies de cada peça es revisen amb el plànol. | Escurçar | Materials, processos i maquinària del taller d'Industrial. | La nota «Valoració segons el plànol» repeteix la mateixa frase més avall |
| C-2 | Materials · etiqueta | `ui.ts` `industrialCapacities.overview.materials.label` | Confirmats | Eliminar | — | Llenguatge intern de validació de dades |

### Contacte (`/contacte/`)

| # | Ruta i bloc | Fitxer/font | Text actual exacte | Decisió | Proposta exacta | Motiu i possible efecte |
| --- | --- | --- | --- | --- | --- | --- |
| Ct-1 | On som · text | `content/ca/contacte.md` | La major part dels treballs per a particulars es fa a Vilafranca del Penedès i la rodalia; també valorem feines fins a Barcelona. Per a sèries industrials podem estudiar encàrrecs de tot Catalunya. Indica'ns la ubicació al formulari perquè puguem confirmar l'encaix. | Escurçar | Treballem sobretot a Vilafranca del Penedès i la rodalia, i fins a Barcelona. Les sèries industrials, les valorem arreu de Catalunya. | Mateixa àrea confirmada, més breu. La ubicació ara és un camp opcional |

### Compartits

| # | Ruta i bloc | Fitxer/font | Text actual exacte | Decisió | Proposta exacta | Motiu i possible efecte |
| --- | --- | --- | --- | --- | --- | --- |
| G-1 | Peu · lema | `ui.ts` `brand.tagline` | Vilafranca del Penedès · Des de 1989 | Conservar | — | A la Home coincideix amb l'H1, però al peu de la resta de pàgines identifica l'empresa |

---

## C. Textos que es conserven

| Pàgina | Blocs | Motiu |
| --- | --- | --- |
| Home | H1 i subtítol; «Com triar el camí» (preguntes, branques i «Tens dubtes? T'orientem»); públic i text de les dues targetes; «Fets que ens defineixen»; files «Al taller», «Sobre el terreny» i «On treballem»; «Serveis i capacitats» i el seu lema; títols i detalls de les quatre rajoles de Particulars; productes de la rajola d'Industrial; «Explora els serveis per a particulars», «Coneix Industrial»; «Parlem del teu encàrrec» | Validats recentment pel director. Expliquen el criteri dels camins o donen dades confirmades |
| Particulars | H1; franja «Tens una avaria?» amb l'horari; títols i textos de Portes i motors, Estructures i Mobiliari; títol del pont cap a Industrial; títols, contextos i textos dels tres casos; «Explica'ns la feina»; «A prop, amb capacitat de taller» i el seu text d'àrea | Serveis i casos reals; l'àrea de treball és dada confirmada |
| Urgències | H1, entrada i horari; «Explica'ns la incidència» i els tres passos | Acció directa en una incidència, dins l'horari confirmat, sense prometre atenció 24 h |
| Estructures i Automatismes | H1 i entrades; títols de les fotografies; textos de treballs documentats; passos de la fitxa; «Necessites una reparació?»; franja de sèrie | Expliquen el servei i acrediten amb treballs reals |
| Portafoli | H1, entrada, «Cinc feines, cinc contextos», filtres, els cinc casos, «De la feina al teu projecte», «Explica'ns la idea» | Contingut documental i navegació útil |
| Industrial | Línies superiors, H1, accions; «Un taller per passar del plànol a la peça» i xifres; cinc productes; «El taller en primer pla» i el seu resum; «En procés, no certificacions vigents» i els tres estats; quatre passos del mètode; cinc sectors; «Un encàrrec real. Deu gàbies»; «Parlem de la peça» i la llista | Dades tècniques confirmades i distinció obligatòria entre certificacions en procés i vigents |
| Capacitats | H1; menú local; «Del material a la peça» amb 950 m² i 12 persones; materials i maquinària; «Soldem / Muntem» i dades; requisits i estats ISO; «Parlem de la peça» | Fitxa tècnica confirmada |
| Contacte | Etiquetes del formulari, errors, estat de no enviament, caselles i informació de privacitat de l'advocat | Contractes funcionals i textos jurídics aprovats |
| 404 | H1, text i tres sortides | Breu i útil |
| Capçalera i peu | Menús, «Parlem?» / «Consulta industrial», enllaços legals, «Torna a l'inici» | Navegació |

---

## D. Textos legals i continguts ajornats

### Textos legals (`/legal/avis-legal/`, `/legal/privacitat/`, `/legal/cookies/`, `legal-formulari.md`)

No s'han reescrit ni escurçat, tal com indica el brief.

- **Duplicació de presentació:** cada pàgina legal té dos `<h1>` al codi, el de l'entrada visible i el del document de l'advocat, ocult amb CSS. Ja era així abans d'aquest encàrrec. Proposta tècnica: no renderitzar l'H1 del Markdown. **Pendent de validació**, perquè toca la plantilla legal.
- **Inconsistència coneguda:** l'adreça és «59» a Contacte i al Perfil d'Empresa, i «59-61» als textos legals. **Pendent de dada**: el client ha de confirmar quina és la correcta.

### Continguts sense ruta activa

No es publiquen. Es revisaran quan es reactivin, sense crear pàgines noves.

- `content/ca/industrial-series-curtes.md` (ruta ajornada `/industrial/series-curtes/`): el títol «Sèries curtes per a peces exigents», el text i el CTA «Consultar una sèrie curta» defineixen l'oferta com a sèries curtes. Si es reactiva, caldrà adaptar-los a «Fabricació en sèrie» i decidir la URL amb el seu mapa de redireccions.
- `content/ca/empresa.md` (pàgina retirada): diu «valorar una sèrie curta». No es publica.
- `industrial-proces.md`, `industrial-sectors.md`, `industrial-projectes.md`, `particulars-mobiliari.md`: rutes ajornades. No s'han revisat en profunditat en aquesta passada.


---

## E. Execució de la valoració del revisor (06/10/2026)

El director ha aprovat aplicar la selecció de [`FASE7-valoracio-propostes-editorials.md`](FASE7-valoracio-propostes-editorials.md). Les propostes de la Part B queden resoltes així. La revisió consta a `check-references` com a «propostes editorials valorades i aprovades pel director (06/10/2026)».

| ID | Estat | Text aplicat |
| --- | --- | --- |
| H-1 | Aplicada amb ajust (§3) | Peces i sèries de ferro i inoxidable, amb subministrament o muntatge segons l'encàrrec. Es conserven les tres files |
| H-2 | Aplicada | Taller de fabricació |
| H-3 | Aplicada amb ajust (§3) | 6 furgonetes · 1 camió ploma. La xifra gran «6 +1» és visual (`aria-hidden`); l'etiqueta en fa de nom accessible complet i fa un salt equilibrat |
| H-4 | Aplicada amb ajust (§3) | Espais i reparacions / Sèries, peces a plànol i obra |
| H-5 | Aplicada | Acer al carboni i inoxidable (les etiquetes de producte es mantenen) |
| H-6 | Aplicada | Explica'ns una incidència, el projecte que tens previst o els requisits d'una peça. |
| H-7 | Aplicada | Formulari de contacte |
| P-1 | Aplicada amb ajust (§3) | Constructora, promotora, sèrie o peça a plànol? Industrial |
| P-2 | Aplicada | Fabriquem i instal·lem peces a mida per a habitatges, comunitats i negocis des del nostre taller de Vilafranca del Penedès. |
| P-3 | Aplicada | Portes, persianes i motors que han deixat de funcionar. (la franja «Tens una avaria?» conserva trucada i horari) |
| P-4 | Aplicada amb ajust (§3) | A Industrial fabriquem estructures, portes i mobiliari per a sèries i projectes d'obra, i peces a plànol i carros industrials per a empreses, constructores i promotores. També fem encàrrecs industrials d'una sola unitat. |
| P-5 | Aplicada | Tres treballs documentats en un habitatge, una comunitat i un negoci. El portafoli en recull cinc. |
| P-6 | Aplicada | Sense frase; s'ha retirat també el contenidor i el botó «Veure els cinc treballs» obre la franja |
| P-7 | Aplicada | Descriu la feina i, si en tens, adjunta una fotografia, les mides o un document. |
| S-1 | Aplicada amb ajust (§3) | Si prefereixes el formulari, indica: |
| S-2 | Aplicada | La secció «També pots veure els automatismes» queda amb el titular i l'enllaç; la plantilla admet la secció sense paràgraf |
| S-3 | Aplicada | Truca'ns o escriu-nos |
| S-4 | Aplicada | Sense entrada a la galeria d'Estructures (entrada opcional a la plantilla) |
| S-5 | Aplicada només a Estructures | Sense metadades a les tres fotografies; Automatismes les conserva |
| S-6 | Aplicada amb ajust (§3) | Fitxa: «Per valorar la teva estructura, ens ajuden tres dades.» Entrada del servei: «Amb equip propi de soldadura i muntatge, fabriquem i instal·lem…» (una sola menció) |
| S-7 | Aplicada | Sense entrada a la galeria d'Automatismes |
| S-8 | Aplicada amb ajust (§3) | Si la porta o el motor falla, truca'ns i explica'ns la incidència. |
| I-1 | Aplicada amb ajust (§3) | Fabricació per a empreses i obra: estructures, portes i mobiliari, en sèrie o a mida; peces a partir d'un plànol o d'una especificació, i encàrrecs industrials d'una sola unitat. |
| I-2 | Aplicada | Material, soldadura, muntatge i quantitat es valoren conjuntament abans de fabricar. Sense l'apartat «Quatre passos…»: el model Markdown, el lector de la plantilla i el marcatge s'han actualitzat junts; els passos passen a H3 (ordre de titulars correcte). Es conserven `#proces`, `[data-series]` i l'animació |
| I-3 | Aplicada | Sense «Cada encàrrec es concreta segons els seus requisits.» |
| I-4 | Aplicada amb ajust (§3) | Si en tens, adjunta un plànol o documentació. Per a fabricació en sèrie, podem valorar encàrrecs d'arreu de Catalunya. (es manté la guia «Per valorar la consulta») |
| C-1 | Aplicada | Materials, processos i maquinària del taller d'Industrial. (la nota «Valoració segons el plànol» continua visible) |
| C-2 | Aplicada | Sense l'etiqueta «Confirmats» |
| Ct-1 | Aplicada amb ajust (§3) | Per a particulars, treballem principalment a Vilafranca del Penedès i la rodalia i valorem feines fins a Barcelona. Per a fabricació industrial en sèrie, podem valorar encàrrecs d'arreu de Catalunya. |
| G-1 | Conservat | Vilafranca del Penedès · Des de 1989 |

**Ajustos addicionals de la valoració (§4–6)**

- **Home, rajola Industrial:** «Qualsevol peça a mida» → «Peces i conjunts a mida».
- **Industrial, cas de les gàbies:** «El primer projecte publicat d'Industrial és…» → «Fabricació i subministrament de deu gàbies per a un client industrial.».
- **Contacte, selector:** «Industrial · Empreses i obra» → «Industrial · Sèries, peces a plànol i obra» (també a `content/ca/ui.md`).
- **Contacte, incidències (§5.2):** el telèfon continua destacat a la primera línia de la columna de contacte, amb l'horari. No calia cap canvi.
- **Contacte, adjunt (§5.3):** les etiquetes («Fotografia, esbós o document» / «Plànol o documentació tècnica») ja diuen què es pot aportar, i el formulari no té cap límit real de mida o format. «Opcional.» és, per tant, suficient.
- **Pàgines legals (§6):** el cos ja no renderitza l'H1 del Markdown, de manera que cada pàgina té un sol H1. El contingut jurídic, les clàusules i els ancoratges de l'índex no canvien: 10, 15 i 9 ancoratges comprovats, cap de trencat.
- **No s'ha fet:** normalitzar l'adreça 59 / 59-61 (pendent del client) ni reactivar continguts ajornats.
