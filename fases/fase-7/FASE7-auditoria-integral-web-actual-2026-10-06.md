# Auditoria integral de la web actual · Serralleria Carbó

**Data:** 6 d’octubre de 2026

**Estat revisat:** commit `73dd529` · `Restore the Home title, deepen the grey and add brand identity`

**Entorn:** build Astro local, `http://localhost:4322`, Chrome.

**Abast:** valoració i verificació. No s’ha modificat el web ni s’ha desplegat res.

**Implementació posterior:** el director ha autoritzat executar les millores. L’estat resultant i les comprovacions consten a [FASE7-auditoria-integral-implementacio.md](FASE7-auditoria-integral-implementacio.md). Aquest informe conserva l’estat anterior com a evidència de l’auditoria.

## 1. Veredicte

**La web ha millorat en comprensió, jerarquia i consistència. La base és bona i els recorreguts principals funcionen. Encara no donaria per tancat el refinament visual ni la preparació per publicar.**

La nova redacció respon millor a la petició del client: constructors i promotors tenen una entrada explícita a Industrial, els encàrrecs industrials unitaris estan contemplats i l’oferta ja no queda limitada a sèries curtes. L’usuari pot contactar sense haver de llegir totes les pàgines.

**Sí que hi ha una pèrdua parcial d’impacte visual**, especialment a la Home i Particulars. Es conserva la identitat de marca —logotip, bordeus, tipografia, fotografia i llenguatge geomètric— però les superfícies grises molt semblants i la repetició de composicions fan el conjunt més uniforme. Industrial conserva més caràcter gràcies als materials, el reflex metàl·lic i les composicions fotogràfiques.

Aquesta última conclusió és un judici de direcció d’art sustentat en la comparació de captures; no és una dada de conversió ni una prova amb usuaris. **No recomano reiniciar el disseny:** recomano corregir la lectura sobre fotografia, depurar la composició mòbil, donar més funció a Capacitats i recuperar contrast compositiu en alguns blocs concrets.

## 2. Què s’ha revisat

- Documentació de refinament de Fase 7, la valoració editorial anterior, estat de fases i pendents de publicació.
- Textos actuals de `content/ca/`, interfície de `src/i18n/ui.ts`, plantilles, estils, fotografia i scripts rellevants.
- Les 13 rutes generades: Home, Particulars, Reparacions, Estructures, Automatismes, Projectes particulars, Industrial, Capacitats, Contacte, les tres legals i 404.
- Comprovació de disposició a **1440, 768, 390 i 320 px**: 52 combinacions de ruta i amplada.
- Captures noves en escriptori i mòbil, carregant abans les imatges diferides; comparació amb les referències de Fase 4 de Home i Industrial.
- Navegació real, menú mòbil, preselecció i validació del formulari, filtres del portafoli, canvi de fotografies dels treballs i progressió del mètode industrial.
- Moviment reduït i comportament sense JavaScript en els recorreguts indicats més avall.
- `npm run verify`, `npm run check:links` i `npm run check:redirects`.

Les decisions posteriors del director prevalen sobre la maqueta antiga: titular gran de la Home, grisos més marcats, mètode industrial sobre fotografia i absència de noves pàgines interiors sense contingut diferencial. La comparació amb Fase 4 avalua el caràcter; no proposa restaurar decisions obsoletes.

## 3. Valoració per àmbit

| Àmbit | Valoració | Evidència i conseqüència |
| --- | --- | --- |
| Comprensió de l’oferta | Millora clara | La Home identifica habitatges, comunitats i negocis a Particulars; constructores, promotores i empreses a Industrial. El text d’Industrial inclou fabricació a mida, sèries i una sola unitat. |
| Navegació | Correcta en els recorreguts provats | 354 enllaços interns resolen. Capacitats obre la pàgina corresponent. La consulta des d’Industrial manté la branca Empresa. |
| Contingut | Més precís i breu | Es mantenen material, processos, dades del taller, muntatge, àrea i estats reals de certificacions. Queda una frase compartida entre serveis que cal especialitzar. |
| Identitat | Conservada, amb menys força en algunes pàgines | Bordeus del logo, plata industrial i font comuna donen coherència. Els grisos propers i la composició repetida redueixen el contrast de jerarquia i el caràcter editorial. |
| Mòbil | Funciona; la composició necessita una passada específica | Sense desbordaments als quatre amples. Industrial arriba a 6.247 px a 390 px, amb productes i taller molt apilats. |
| Accessibilitat | Bona base estructural; hi ha una incidència visual | Un H1 per ruta, focus visible i errors de formulari vinculats. El reflex fosc sobre dues targetes fotogràfiques dificulta llegir els títols. No és una certificació WCAG completa. |
| Animació | Funcional i coherent amb els patrons aprovats | Els tres treballs canvien a la fotografia corresponent; els quatre passos industrials es descobreixen. No cal afegir efectes a tots els blocs. |
| Rendiment | Pes favorable en la mostra local | Recursos adaptatius AVIF/WebP, font local i càrrega diferida. No s’han mesurat Core Web Vitals en dispositius i xarxes reals. |
| SEO i publicació | Preparació existent; revisió definitiva pendent | Canonicals i estats d’indexació presents; rutes comercials principals encara `noindex`. No s’ha refet l’estratègia SEO en aquesta auditoria. |
| Seguretat | Fonaments configurats; verificació de producció pendent | Hi ha capçaleres preparades a `_headers`; CSP i enviament segur del formulari estan pendents. No s’ha fet una auditoria de penetració ni comprovat les capçaleres del hosting. |

## 4. Entén l’usuari quin camí ha de seguir?

### Particular amb una reparació

Pot trucar des de la capçalera o accedir a Particulars i utilitzar l’accés a reparacions. El recorregut **Home → Particulars → Reparacions** funciona. No cal arribar al portafoli ni completar un formulari per trucar.

**Mantenir:** telèfon directe i accés visible a reparacions. **Millorar:** en Contacte mòbil, posar un resum d’horari al costat del telèfon; actualment el bloc complet d’horaris queda després del formulari.

### Particular que prepara una reforma

La Home el dirigeix a Particulars. Pot consultar Estructures o Automatismes si necessita entendre millor la feina, veure exemples o contactar directament. **Home → Particulars → Contacte** és suficient; la pàgina de servei és opcional.

**Mantenir:** exemples reals, imatges de servei i contacte accessible. **Millorar:** reduir els blocs secundaris que repeteixen accessos a altres serveis i contacte, sense eliminar informació útil sobre l’encàrrec.

### Constructora o promotora

La guia de la Home diu expressament **«Constructora, promotora, sèrie o peça a plànol? Industrial»**. Industrial concreta estructures, baranes, escales, portes i projectes de construcció. Pot passar directament a consulta.

**Mantenir:** aquesta identificació explícita; evita tornar a la distinció incompleta «una unitat / diverses unitats». **Millorar:** els textos de pas a Industrial des de serveis han de referir-se al producte i al tipus de projecte, no a «fabricar un servei».

### Empresa que necessita una peça o un carro

Industrial contempla carros d’una unitat o en sèrie i peces a plànol. Les targetes porten a la consulta amb el producte seleccionat. Capacitats és una consulta complementària, no una barrera obligatòria.

**Conclusió:** ara la separació és considerablement més entenedora. Que un negoci pugui aparèixer en ambdós camins no és una contradicció: una reparació del seu local i la fabricació d’una peça tècnica són encàrrecs diferents. Cal conservar els exemples de feina al costat del nom de la branca.

No hi ha proves que el nombre de pàgines estigui causant abandonament. La fricció observada és **la poca informació nova d’algunes destinacions i la longitud mòbil**, no l’obligació de visitar-les totes.

## 5. Identitat visual: què s’ha guanyat i què s’ha afeblit

### Elements que convé preservar

1. **Titular principal gran de la Home.** És una excepció deliberada de marca; no s’ha de reduir per forçar-lo a l’escala de titulars interiors.
2. **Logotip real i color coherent.** El bordeus `#7c2a30` vincula marca, acció i focus. Industrial manté el tractament plata aprovat.
3. **Una mateixa família tipogràfica i criteris d’espaiat.** Les pàgines ja comparteixen una estructura recognoscible.
4. **Fotografies com a protagonistes.** Les portades, les targetes de servei i el mètode industrial tenen una base visual sòlida.
5. **Projectes documentals i equip real.** Aporten confiança i singularitat, encara que les fotografies originals no tinguin l’acabat de les conceptuals.
6. **Industrial més lluminós.** Alternar grafit, plata i boira millora la lectura i manté el llenguatge metàl·lic.

### On percebo pèrdua de caràcter

- A Home i Particulars, `#c6c8c7` i `#dfe0df` ocupen grans superfícies. La transició és discreta i diversos blocs es perceben com una sola seqüència plana.
- Es repeteix massa el patró **titular a l’esquerra + text a la dreta + filet curt**. Ordena, però no dona a cada secció una funció compositiva pròpia.
- Les fotografies fosques o desaturades, juntament amb els grisos, fan que Particulars s’acosti massa al clima industrial. El bordeus hi és coherent funcionalment, però no resol tot sol aquesta similitud.
- Els filets, la marca d’aigua i les fletxes reforcen el sistema; la identitat necessita també ritme, composició i una direcció fotogràfica reconeixible.

### Proposta de refinament

**Conservar la paleta actual com a base i treballar tres punts de contrast compositiu, sense tornar tota la web al negre ni afegir més colors.**

- Home: mantenir la marca i el doble accés; diferenciar millor la prova de confiança del taller i la graella de serveis mitjançant proporcions, fotografia i agrupació. No repetir dues introduccions grans que expliquin el mateix.
- Particulars: donar més calidesa natural a les imatges, reservar el bordeus per a accions i indicadors rellevants i usar superfícies més lluminoses en zones de lectura. La proposta ha de continuar sent sòbria, sense tintar grans blocs de bordeus automàticament.
- Industrial: conservar textura, reflex i grafit; contrastar-los amb seccions tècniques clares. La variant metàl·lica ha de dependre del **fons real del text**, no del color de tota la secció.

La marca ha de ser recognoscible encara que s’amaguin el logotip i els filets. Aquest és un bon criteri de revisió per a la propera proposta visual.

## 6. Millores prioritzades

### A01 · Prioritat alta · Corregir la lectura metàl·lica sobre fotografia

**Observat:** a Industrial, «INOXIDABLE» i «DE SOLDADURA» es mostren amb un reflex fosc sobre fotografies fosques. Costen de llegir.

**Causa comprovada:** `src/templates/industrial-base.css:59` aplica la variant fosca a tots els titulars dins `.i-capabilities`. Aquesta secció té fons clar, però les targetes de `IndustrialTemplate.astro:189` i `:204` són fosques. El selector també afecta els seus H3.

**Proposta per a Claude:** separar la superfície del titular de secció i la superfície de cada targeta. Reservar la variant fosca als títols realment sobre plata/boira; usar el reflex clar a les fotografies fosques. Conservar el marge de pintura que evita tallar els glifs. Comprovar la part menys lluminosa del degradat, no només el color CSS de reserva.

**Acceptació:** «Acer i inoxidable» i «Processos de soldadura» llegibles en tota la línia a 1440, 768, 390 i 320 px, amb reflex visible i sense retall. Revisió visual obligatòria: una comprovació automàtica pot no valorar bé text transparent amb `background-clip` sobre imatge.

### A02 · Prioritat alta · Redissenyar l’apilament mòbil

**Observat:** Industrial és compacte en escriptori, però a 390 px productes ocupa 940 px i taller 1.349 px. Junts sumen 2.289 px abans d’arribar al mètode.

**Proposta:** fer una composició mòbil específica. Provar una graella de dues columnes per a les peces que mantinguin lectura clara; usar una peça a amplada completa quan el contingut ho necessiti. Reduir alçada d’imatge i espai intern de targetes, mantenint material, maquinària, soldadura i muntatge visibles. El text secundari tècnic pot ser desplegable quan sigui complementari.

A Particulars, valorar també dues columnes per als accessos de servei a 390 px, amb text curt. A 320 px, una columna és preferible si l’alternativa força lletra petita o títols difícils de llegir.

**Evitar:** reduir tota la tipografia, ocultar l’oferta principal en un carrusel o eliminar contingut només per assolir una alçada arbitrària. L’objectiu és reduir blocs repetitius i conservar comprensió.

**Acceptació:** totes les categories es poden descobrir sense gestos laterals; controls còmodes; cap desbordament; primer CTA útil accessible abans del contingut extens; mesurar de nou les seccions que originaven la longitud.

### A03 · Prioritat mitjana · Donar valor diferencial a Capacitats

**Observat:** Industrial i Capacitats repeteixen taller de 950 m², equip, maquinària, materials, processos, muntatge i millores ISO. Capacitats afegeix logística i la valoració de requisits del plànol, però el salt de valor és limitat.

**Proposta:** Industrial ha de respondre **què pots encarregar i per què confiar en el taller**. Capacitats ha de respondre **amb quins mitjans treballen i què necessita l’equip per valorar l’encaix tècnic**.

- A Industrial, conservar un resum de taller i una selecció visual; evitar donar-hi una fitxa tècnica completa i repetir-la a la destinació.
- A Capacitats, agrupar materials, maquinària, soldadura, muntatge i requisits en una fitxa concisa. Incorporar rangs, dimensions o documents només si el client els confirma.
- Fer que el CTA descrigui la destinació tècnica; no presentar-la com a pas imprescindible abans de contactar.
- Mantenir les rutes interiors industrials ajornades. No crear noves pàgines per repartir el mateix contingut.

**Acceptació:** es pot explicar en una frase què aporta cadascuna; llegir Capacitats afegeix informació útil o una consulta tècnica més directa.

### A04 · Prioritat mitjana · Precisar la frase compartida dels serveis

**Observat:** `src/i18n/ui.ts:422` diu «Aquest servei també el fabriquem en sèrie per a empreses, constructores i promotores». `ServiceTemplate.astro:334` ho presenta tant a Estructures com a Automatismes.

«Fabricar un servei» és imprecís. A Automatismes pot donar a entendre que l’empresa fabrica els motors, cosa que aquest redactat no hauria de suggerir.

**Proposta de textos per revisar i aplicar conjuntament amb el contingut editorial:**

- Estructures: «També fabriquem estructures per a sèries i projectes de constructores i promotores».
- Automatismes: «Per a constructores i promotores, també fabriquem i instal·lem portes i tancaments per a obra».

**Acceptació:** text propi segons el servei, sense atribuir fabricació de motors ni eliminar l’accés a Industrial. Mantenir concordança entre `content/ca/` i la interfície.

### A05 · Prioritat mitjana · Recuperar ritme visual

**Proposta:** preparar primer una mostra de Home i Particulars amb els ajustos descrits a §5, mantenint estructura i textos aprovats. Revisar el resultat complet, no només cada targeta aïllada.

No considero el bordeus aleatori: ara el seu ús està més unificat. El problema pendent és la relació entre superfícies, escala, fotografia i jerarquia. Afegir bordeus a més elements no és una solució suficient.

**Acceptació:** es distingeixen entrada, orientació, confiança, oferta i contacte sense dependre de filets; Particulars conserva un caràcter més proper i Industrial un caràcter tècnic; no augmenta la longitud.

### A06 · Prioritat mitjana · Depurar Contacte mòbil i la demostració del formulari

**Observat:** la composició de Contacte és més neta, però l’horari queda després del formulari en mòbil. L’avís que el formulari no envia és al final; es pot començar a omplir abans de descobrir-lo.

**Proposta:** mostrar un resum d’horari al costat del telèfon; conservar el bloc complet d’informació més avall. En previsualització, avisar abans dels camps que és una demostració i oferir contacte real. Quan s’activi el backend, retirar l’avís i provar un enviament real.

La informació legal ja incorporada s’ha de conservar. Es pot millorar el pes visual i l’agrupació, sense reescriure el text aprovat per l’assessor. Les vies directes a mòbil tenen regles d’alçada de 40 px; convé portar-les al criteri de 44 px del projecte sense allargar tot el bloc.

**Acceptació:** usuari informat abans d’escriure; horari visible junt al canal de trucada; errors i consentiments mantenen el funcionament; dades conservades en canviar de branca.

### A07 · Prioritat baixa · Reduir blocs secundaris desproporcionats

En serveis, algunes combinacions de breu de consulta, accés a reparacions, servei relacionat, pont a Industrial i contacte final repeteixen la mateixa invitació.

**Proposta:** mantenir la primera acció principal i el contacte final; convertir recomanacions secundàries amb poc contingut en accessos breus, sense un H2 i una secció gran per a cada enllaç. La relació Reparacions → Automatismes, per exemple, no necessita un bloc amb tant protagonisme si només conté un accés.

**Acceptació:** segueixen disponibles els recorreguts útils; cada secció que queda té una pregunta pròpia a respondre.

## 7. Valoració per pàgina

| Pàgina | Conservar | Refinar |
| --- | --- | --- |
| Home | Marca gran, públic explícit, dades de confiança, doble accés, contacte directe | Ritme dels blocs grisos i relació taller/serveis. No eliminar dades d’empresa per fer-la més curta. |
| Particulars | Portada, reparacions visibles, serveis fotogràfics, casos reals amb canvi d’imatge | Graella mòbil i calidesa fotogràfica. La seqüència de casos ha de continuar sent opcional per contactar. |
| Reparacions | Canal directe, horari, treballs concrets, evitar promeses d’atenció contínua | Compactar el servei relacionat. No presentar-lo com a urgències 24 h. |
| Estructures | Abast visual, procés reutilitzable, consulta i exemples integrats | Frase de pas a Industrial i pes dels accessos secundaris. |
| Automatismes | Distinció entre portes, motorització i reparació | Evitar que el pont industrial suggereixi fabricació de motors. |
| Projectes particulars | Fotografies documentals, filtres, categories i context | Acabat fotogràfic coherent sense inventar un resultat acabat. Mantenir-lo com a evidència complementària. |
| Industrial | Productes i públic clars, encàrrecs unitaris, seccions més lluminoses, mètode compacte | Reflex de targetes, longitud mòbil i diferència respecte de Capacitats. |
| Capacitats | Materials/processos confirmats, logística, requisits, CTA tècnic | Fitxa amb informació diferencial; evitar tornar a resumir tota la portada industrial. |
| Contacte | Dades directes, formulari progressiu, branca preseleccionada, mapa a petició | Horari mòbil, expectatives de demostració, pes visual de la informació legal. |
| Legals | Rutes i textos proporcionats; un H1 per pàgina | La longitud és pròpia del document: no aplicar retall editorial comercial ni alterar contingut legal en aquest refinament. |
| 404 | Estat HTTP correcte i alternatives de navegació | Sense incidència funcional detectada en aquesta passada. |

## 8. Fotografia i credibilitat

`src/config/photography.ts` diferencia les fotografies conceptuals de les documentals. Els casos reals continuen utilitzant fotografies recuperades de projectes; no s’han confós amb escenes generades.

La combinació té potencial, però l’acabat de llum, color i enquadrament és desigual. **No s’ha de substituir la prova real per una escena artificial més elegant.** Convé seleccionar i retallar cada foto documental pel que demostra, conservar el logo de la roba i ajustar-ne el tractament sense inventar el resultat del treball.

Les imatges conceptuals de maquinària i sectors s’han de validar amb el client perquè no suggereixin equips, instal·lacions o una capacitat específica que no són de l’empresa. Això és una comprovació de credibilitat pendent, no una afirmació que les dades actuals siguin falses. Evitar convertir una escena conceptual en fotografia d’un projecte documentat.

## 9. Alçades i densitat

Mesures del document complet, amb totes les imatges carregades. 1440 px usa pantalla de 1000 px d’alt; 390 px usa 844 px. **La longitud per si sola no demostra una mala experiència.** Serveix per localitzar acumulacions.

| Ruta | Alçada a 1440 px | Alçada a 390 px |
| --- | ---: | ---: |
| Home | 2.858 px | 3.825 px |
| Particulars | 3.675 px | 4.612 px |
| Industrial | 3.918 px | 6.247 px |
| Capacitats | 2.571 px | 3.345 px |
| Contacte | 1.743 px | 2.976 px |

Industrial mòbil: productes 940 px, taller 1.349 px, mètode 815 px i sectors 886 px. És el principal candidat a una composició adaptada, abans de continuar reduint indiscriminadament l’espaiat de tota la web.

## 10. Verificació funcional i tècnica

### Resultats comprovats en aquesta passada

- `npm run verify`: comprovació Astro de 48 fitxers amb **0 errors, 0 avisos i 0 suggeriments**, build correcte i referències protegides intactes.
- Referències: **96 fitxers estrictes i 26 de contingut** comprovats respecte de la base establerta `5e0ffc9`.
- `npm run check:links`: **13 pàgines i 354 enllaços interns**, sense destinacions no resoltes.
- `npm run check:redirects`: **13 regles preparades**, sense errors estructurals; les decisions i traduccions pendents es detallen a §11.
- 52 comprovacions de disposició: sense desbordament horitzontal ni titulars fora de l’amplada; un H1 per ruta.
- Sense errors JavaScript de pàgina observats. Totes les imatges de les nou rutes comercials van carregar en les captures definitives.
- Menú mòbil: s’obre, actualitza `aria-expanded`, mostra focus i es tanca amb Esc.
- Consulta: preselecció Empresa des de Capacitats; preselecció de mobiliari via URL; canvi de branca conserva el nom; enviament buit centra el primer error.
- Enviament vàlid: mostra que **no s’ha enviat** i ofereix telèfon/WhatsApp. No hi ha petició a un backend.
- Portafoli a 1440 i 390 px: Automatismes mostra 2 casos, Estructures 3 i Tots 5; URL, estat actiu i missatge accessible s’actualitzen.
- Particulars, amb moviment normal: els tres capítols activen la fotografia corresponent en escriptori i mòbil.
- Industrial, amb moviment normal: els quatre passos del mètode es mostren i s’il·luminen en avançar el scroll en escriptori i mòbil.
- Moviment reduït: contingut visible en les captures. Sense JavaScript: menú accessible a Home/Industrial, quatre passos presents i enviament de Contacte desactivat amb alternatives directes.
- Sense peticions de tercers a la càrrega inicial de les rutes provades; el mapa continua sota demanda.

### Pes de recursos en una mostra amb contextos nous de navegador

Totals aproximats de recursos carregats després de recórrer la pàgina: imatges, font, CSS i scripts; **no és el pes del repositori ni una mesura de temps de càrrega**.

| Pàgina | 1440 px | 390 px |
| --- | ---: | ---: |
| Home | 308 KB | 208 KB |
| Industrial | 395 KB | 223 KB |
| Projectes particulars | 684 KB | 215 KB |
| Contacte | 86 KB | 86 KB |

Els valors són favorables per al tipus de pàgina i demostren que les variants mòbils eviten descarregar sistemàticament els originals grans. Cal validar temps i estabilitat al hosting final amb dispositiu i xarxa reals abans de certificar rendiment.

### Límits de l’auditoria

No s’ha executat axe-core de manera independent en aquesta passada perquè no estava disponible en l’entorn de proves. L’informe de Claude en documenta una passada anterior amb zero incidències; no s’ha reutilitzat com a certificació pròpia. La incidència del reflex sobre fotografia mostra per què cal també inspecció visual.

No s’han provat lector de pantalla, Safari/iOS real, Android real, lliurament de correus, pujades reals d’adjunts, Core Web Vitals de camp, fallades del proveïdor del mapa ni seguretat de producció. Els amples mòbils i les interaccions han estat provats amb Chrome automatitzat; no equivalen a una prova tàctil sobre un dispositiu físic.

## 11. Pendents coneguts abans de publicar

Separats de les millores de disseny per no presentar-los com a regressions noves:

1. **Formulari:** backend, validació al servidor, controls d’adjunts i prova d’enviament real; Fase 8, tasca 8.5. La interfície sola no completa el servei.
2. **Adreça:** confirmar 59 o 59–61 i unificar web, documentació i dades d’empresa.
3. **Indexació:** les pàgines comercials principals segueixen en `draft`/`noindex`; el portafoli i les tres legals són indexables. La configuració genera quatre URL al sitemap. Revisar la matriu definitiva després de validar la web i garantir que la previsualització no es confon amb el domini públic. No s’ha comprovat la indexació real a Google.
4. **Redireccions:** `/estructuras/` i `/motores/` esperen les versions ES; tres URL de plantilles antigues esperen la decisió 410. El validador no substitueix la prova HTTP després del desplegament.
5. **Seguretat i hosting:** comprovar HTTPS i les capçaleres reals, definir i provar CSP i revisar el tractament del formulari. `_headers` preparat no demostra que el servidor local o qualsevol altre hosting l’apliqui.
6. **SEO/analítica:** continuar Fase 6 després de validar contingut i estructura; els accessos i treballs pendents consten al pla de fase.
7. **Publicació:** domini, hosting i desplegament amb autorització; no s’ha desplegat aquesta revisió.

## 12. Ordre de treball recomanat per a Claude i revisió

1. **Corregir A01** i precisar A04. Revisió del canvi i captures abans de considerar-los resolts.
2. **Treballar A02 i A06 a mòbil**, comparant abans/després de les seccions, no només l’alçada global.
3. **Preparar una mostra visual d’A05** a Home/Particulars i revisar-la com a pàgina completa. Conservar textos, logotip i titular de marca aprovats.
4. **Resoldre A03 i A07** dins l’arquitectura actual, sense afegir noves rutes ni inventar dades tècniques.
5. Repetir només les comprovacions afectades i els recorreguts principals; després, verificació conjunta i validació del director/client.
6. Tancar els pendents de formulari, SEO, seguretat i publicació a la fase corresponent.

Aquest document **proposa i prioritza**; no declara aprovades les noves composicions. Els canvis ja aprovats i implementats es mantenen com a referència. Impeccable s’ha utilitzat únicament com a criteri manual de revisió, sense executar-ne funcions de modificació.

## 13. Evidència visual guardada

- [Home actual · escriptori](referencies/auditoria-2026-10-06/home-1440.png)
- [Industrial actual · escriptori](referencies/auditoria-2026-10-06/industrial-1440.png)
- [Industrial actual · mòbil](referencies/auditoria-2026-10-06/industrial-390.png)
- [Incidència de reflex en targetes del taller](referencies/auditoria-2026-10-06/taller-detail-1440.png)

Les mesures i proves complementàries d’aquesta sessió es troben a `tmp/auditoria-actual-20261006/`; és una carpeta temporal exclosa de Git. Les conclusions i les captures seleccionades d’aquest document constitueixen el registre permanent de la revisió.
