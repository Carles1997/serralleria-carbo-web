# Fase 3 — Mapa editorial de cerca

**Estat:** assignació editorial inicial de Fase 3, preparada per a la validació del director de projecte. Les rutes i la intenció principal de cada pàgina queden definides sobre el sitemap aprovat; les expressions i prioritats es podran ajustar amb dades reals de Search Console, Analytics i campanyes. No incorpora volums de cerca ni dificultat estimada sense una font de dades.  
**Abast:** 50 expressions candidates en cadascun dels tres idiomes, assignades a les pàgines comercials del sitemap aprovat. Les pàgines legals i la 404 no tenen objectiu de posicionament comercial.

## Mètode i límits

El mapa combina les categories i capacitats confirmades al CONTEXT, els termes de la web antiga i la lectura de resultats de cerca per expressions locals i industrials. La recerca ha contrastat terminologia de **serralleria, baranes i automatismes** a Vilafranca, de **sèries curtes i subcontractació de soldadura** en català i castellà, i d'**small batch / short run metal fabrication** en anglès. El client confirma ara Vilafranca i rodalia com a àmbit principal dels treballs locals, feines fins a Barcelona i valoració de sèries industrials a Catalunya. Les expressions són hipòtesis d'intenció, no una afirmació de demanda o de rànquing.

Cada pàgina té una expressió principal i dues variants semàntiques. S'hi afegeixen cinc expressions de suport per idioma: **45 + 5 = 50**. Les variants no s'han de repetir mecànicament dins el text. Es prioritzen títols descriptius, contingut útil i experiència real, d'acord amb [Google Search Central: contingut útil](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) i [títols de pàgina](https://developers.google.com/search/docs/appearance/title-link). Les versions d'idioma han de mantenir URL i hreflang coherents, segons la [guia de versions localitzades de Google](https://developers.google.com/search/docs/specialty/international/localized-versions).

**Distinció clau:** les cerques i les paraules clau s'assignen a pàgines; un `sitemap.xml` només enumera les URL canòniques que volem que es descobreixin. No conté paraules clau ni garanteix la indexació o una posició. Cal que cada pàgina respongui a la seva intenció, sigui enllaçada internament i es pugui rastrejar. [Guia de sitemaps de Google](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview) · [Guia d'enllaços interns](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).

## Propietat de cada intenció i prioritat inicial

| Intenció de cerca | Pàgina propietària | Prioritat editorial | Senyal diferencial a mostrar |
|---|---|---|---|
| Marca i serralleria a Vilafranca | `/` | Alta | Dues branques visibles i taller real a Vilafranca. |
| Història, equip i taller | `/empresa/` | Mitjana | Fundació el desembre de 1989, 12 persones i 950 m². |
| Serveis de serralleria per a particulars | `/particulars/` | Alta | Quatre serveis validats i accés als treballs reals. |
| Reparació o incidència amb portes i automatismes | `/particulars/urgencies/` | Alta | Telèfon visible i explicació del cas; no prometre obertura de panys ni disponibilitat 24 h. |
| Baranes i estructures metàl·liques | `/particulars/estructures/` | Alta | Casos reals de baranes, passarel·la i ascensor. |
| Motors, portes i persianes | `/particulars/automatismes/` | Alta | Casos reals de porta i persianes motoritzades. |
| Mobiliari metàl·lic a mida | `/particulars/mobiliari/` | Mitjana, condicionada | Categoria real; ampliar amb exemples només quan el client els aporti. |
| Exemples de treballs particulars | `/particulars/projectes/` | Mitjana | Cinc casos documentats, sense pàgines de detall noves. |
| Subcontractació de fabricació metàl·lica | `/industrial/` | Alta | Missatge industrial i enllaç directe a capacitats i contacte. |
| Materials, soldadura i maquinària | `/industrial/capacitats/` | Alta | Inox 304/316, MIG/MAG, TIG, plegadora, cisalla, punxonadora; sense capacitats no documentades. |
| Experiència per sectors | `/industrial/sectors/` | Mitjana | Sectors confirmats, sense inferir homologacions. |
| Fabricació de sèries curtes | `/industrial/series-curtes/` | Alta | Procés de valoració i cas de deu gàbies; Catalunya segons encàrrec. |
| Procés de fabricació | `/industrial/proces/` | Mitjana | Definim → Preparem → Fabriquem → Comprovem. |
| Evidència de fabricació industrial | `/industrial/projectes/` | Mitjana | Un cas real; no crear més casos ni dades tècniques. |
| Cerca de contacte o pressupost | `/contacte/` | Alta | Formulari segons branca i contactes correctes. |

La pàgina propietària és la destinació editorial preferida per a aquest grup d'intencions, no una garantia que Google la mostri. Quan una consulta activi una altra URL, es revisaran la pàgina, el títol i els enllaços abans de considerar cap ruta nova. No es creen pàgines de localitat per a Barcelona o Catalunya sense contingut i servei diferenciats.

## Assignació per pàgina

| Pàgina del sitemap | Intenció | Català: principal · 2 variants | Castellà: principal · 2 variants | Anglès: principal · 2 variants |
|---|---|---|---|---|
| `/` | Marca + descoberta local | serralleria Vilafranca del Penedès · serralleria a Vilafranca · treballs de serralleria Vilafranca | cerrajería Vilafranca del Penedès · cerrajería en Vilafranca · trabajos de cerrajería Vilafranca | metalworking in Vilafranca del Penedès · metal workshop Vilafranca · Serralleria Carbó Vilafranca |
| `/empresa/` | Confiança / empresa | Serralleria Carbó · taller de serralleria a Vilafranca · taller de fabricació metàl·lica Vilafranca | Serralleria Carbó · taller de cerrajería en Vilafranca · taller de fabricación metálica Vilafranca | Serralleria Carbó · metal fabrication workshop Vilafranca · metalworking company Vilafranca |
| `/particulars/` | Serveis per a particulars | serralleria per a particulars · serralleria per a habitatges · serveis de serralleria Vilafranca | cerrajería para particulares · cerrajería para viviendas · servicios de cerrajería Vilafranca | residential metalwork · custom metalwork for homes · residential metalwork Vilafranca |
| `/particulars/urgencies/` | Incidència / contacte | reparació de portes Vilafranca · avaries de portes automàtiques · urgències de serralleria Vilafranca | reparación de puertas Vilafranca · averías de puertas automáticas · urgencias de cerrajería Vilafranca | metal door repairs Vilafranca · faulty automatic doors · urgent metalwork repairs Vilafranca |
| `/particulars/estructures/` | Projecte concret | estructures metàl·liques a mida · baranes metàl·liques a mida · passarel·les metàl·liques interiors | estructuras metálicas a medida · barandillas metálicas a medida · pasarelas metálicas interiores | custom metal structures · custom metal railings · interior steel walkways |
| `/particulars/automatismes/` | Porta / motorització | automatismes per a portes · motorització de portes de garatge · portes automàtiques Vilafranca | automatismos para puertas · motorización de puertas de garaje · puertas automáticas Vilafranca | door automation · garage door motorisation · automatic doors Vilafranca |
| `/particulars/mobiliari/` | Encàrrec a mida | mobiliari metàl·lic a mida · mobles de ferro a mida · mobiliari de ferro i inox | mobiliario metálico a medida · muebles de hierro a medida · mobiliario de hierro y acero inoxidable | custom metal furniture · bespoke steel furniture · steel and stainless furniture |
| `/particulars/projectes/` | Prova / inspiració | projectes de serralleria · treballs de serralleria realitzats · exemples de baranes i portes | proyectos de cerrajería · trabajos de cerrajería realizados · ejemplos de barandillas y puertas | metalwork projects · completed metalwork projects · railing and door examples |
| `/industrial/` | Fabricació B2B | fabricació metàl·lica per a tercers · subcontractació de fabricació metàl·lica · taller de soldadura industrial | fabricación metálica para terceros · subcontratación de fabricación metálica · taller de soldadura industrial | subcontract metal fabrication · industrial metal fabrication · contract metal fabrication |
| `/industrial/capacitats/` | Validació tècnica | soldadura industrial MIG MAG TIG · soldadura d'acer inoxidable · fabricació en inox 304 i 316 | soldadura industrial MIG MAG TIG · soldadura de acero inoxidable · fabricación en inox 304 y 316 | industrial MIG MAG TIG welding · stainless steel welding · 304 and 316 stainless fabrication |
| `/industrial/sectors/` | Encaix sectorial | fabricació metàl·lica per a sectors industrials · soldadura per a sectors industrials · fabricació metàl·lica per a cellers | fabricación metálica para sectores industriales · soldadura para sectores industriales · fabricación metálica para bodegas | metal fabrication for industrial sectors · welding for industrial sectors · metal fabrication for wineries |
| `/industrial/series-curtes/` | Proposta de valor | fabricació de sèries curtes metàl·liques · peces metàl·liques en sèrie curta · sèries curtes en acer inoxidable | fabricación de series cortas metálicas · piezas metálicas en serie corta · series cortas en acero inoxidable | small batch metal fabrication · short run metal parts · small batch stainless steel fabrication |
| `/industrial/proces/` | Procés de compra | procés de fabricació metàl·lica · fabricació de peces a partir de plànol · procés de soldadura i muntatge | proceso de fabricación metálica · fabricación de piezas a partir de plano · proceso de soldadura y montaje | metal fabrication process · fabrication from drawings · welding and assembly process |
| `/industrial/projectes/` | Prova B2B | projectes de fabricació industrial · gàbies industrials fabricades · exemples de soldadura industrial | proyectos de fabricación industrial · jaulas industriales fabricadas · ejemplos de soldadura industrial | industrial fabrication projects · industrial cage fabrication · industrial welding examples |
| `/contacte/` | Conversió / marca | contacte Serralleria Carbó · pressupost de serralleria Vilafranca · consulta de fabricació industrial | contacto Serralleria Carbó · presupuesto de cerrajería Vilafranca · consulta de fabricación industrial | contact Serralleria Carbó · metalwork enquiry Vilafranca · industrial fabrication enquiry |

## Cinc expressions de suport per idioma

| Pàgina assignada | Català | Castellà | Anglès |
|---|---|---|---|
| `/industrial/capacitats/` | soldadura TIG d'acer inoxidable | soldadura TIG de acero inoxidable | TIG welding stainless steel |
| `/industrial/capacitats/` | fabricació en acer al carboni | fabricación en acero al carbono | carbon steel fabrication |
| `/particulars/automatismes/` | persianes metàl·liques motoritzades | persianas metálicas motorizadas | motorised metal shutters |
| `/particulars/estructures/` | baranes interiors de ferro | barandillas interiores de hierro | interior steel railings |
| `/industrial/series-curtes/` | subcontractació de soldadura | subcontratación de soldadura | subcontract welding |

## Exclusions i revisió necessària

- **No orientar contingut a serveis no acreditats:** mecanitzat CNC, tall làser, plegat CNC, prototipatge, homologacions o assaigs. Apareixen en resultats competidors, però no consten com a capacitats de Carbó.
- **No utilitzar** “24 hores”, “mateix dia”, “resposta en X hores”, “certificat ISO” ni altres promeses sense confirmació del client.
- “Urgències” és una categoria real; la zona habitual és Vilafranca i rodalia, però l'horari i els temps de resposta continuen pendents. L'anglès `urgent` és només una traducció d'intenció i requereix especial prudència si es publica.
- La revisió indicativa de resultats per “cerrajero urgente Vilafranca” mostra sobretot obertura de panys i servei 24 h (per exemple, [Cerrajería Masip](https://cerrajeriamasip.com/)). És una inferència de cerca, no una dada de demanda: la pàgina conserva el nom “Urgències” del sitemap validat, però la consulta principal apunta a **reparació de portes** fins que el client confirmi altres serveis i horaris.
- L'anglès no implica exportació ni servei fora de l'àmbit confirmat: Catalunya només per a sèries que el client pugui valorar.
- Abans de congelar les expressions: comparar consultes reals a Search Console, anuncis actius de `/estructuras/` i `/motores/`, i la formulació preferida pel client per a Mobiliari i la filial Industrial. Reassignar termes que no encaixin amb l'oferta real, sense canviar el sitemap.

## Contracte SEO per al desenvolupament i la publicació

1. **Un URL canònic per pàgina i idioma.** Respectar les 15 rutes comercials validades, amb versions CA/ES/EN segons la convenció d'idioma que es concreti en implementar `astro:i18n`. Cada versió ha de tenir el seu títol, metadescripció i contingut propis, i referències `hreflang` recíproques. No canonitzar les traduccions cap al català. [Versions localitzades](https://developers.google.com/search/docs/specialty/international/localized-versions).
2. **Pàgines útils i connectades.** Enllaços HTML rastrejables entre home, branques, serveis, projectes i contacte, amb textos descriptius. La selecció visual de la home ha de conservar enllaços reals a `/particulars/` i `/industrial/`; l'efecte hover no pot ser l'única via d'accés. [Enllaços rastrejables](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).
3. **Sitemap XML de publicació.** Incloure només URL publicades, indexables i canòniques. Excloure la 404, fitxes de projecte sense URL pròpia, redireccions i pàgines legals encara bloquejades. Un cop els textos legals siguin aprovats i publicats, decidir la seva indexació pel contingut real, no per l'objectiu comercial. Enviar el sitemap a Search Console i comprovar-hi l'estat, sense interpretar l'enviament com a indexació confirmada. [Construir un sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
4. **Metadades alineades amb la pàgina.** `seoTitle`, H1 i descripció han d'identificar el servei o la pregunta que resol cada URL. La metadescripció és una proposta de resum, no el fragment garantit de Google. No afegir una etiqueta `meta keywords`. [Fragments de cerca](https://developers.google.com/search/docs/appearance/snippet).
5. **Migració de les rutes antigues.** Aplicar redireccions permanents URL a URL quan el contingut tingui un equivalent nou i comprovar que no hi hagi cadenes ni destins inexistents. [Redireccions permanents](https://developers.google.com/search/docs/crawling-indexing/301-redirects).
6. **Dades estructurades verificables.** A la fase tècnica, representar l'empresa amb dades de contacte i adreça confirmades, coherents amb la fitxa existent de Google Business Profile. No afegir horaris, ressenyes, certificacions, departaments ni zones de servei no verificats. [Guia de LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business).

### Punts concrets del mapa de redireccions antic

| URL antiga | Destí editorial que encaixa amb el sitemap | Estat abans de publicar |
|---|---|---|
| `/projectes/` | `/particulars/projectes/` | Manté els cinc casos de Particulars; el cas Gàbia queda a Industrial. |
| `/pressupost/` | `/contacte/` | Formulari unificat aprovat. |
| `/motores/` | Versió **ES** de `/particulars/automatismes/`. | La landing antiga és en castellà; revisar si hi ha campanyes actives abans del canvi. |
| `/estructuras/` | Versió **ES** de `/particulars/estructures/`. | El text recuperat parla d'estructures metàl·liques a mida; comprovar campanyes i URL de destinació final abans del 301. |
| `/legal/` | `/legal/cookies/` quan la política de cookies estigui aprovada i publicada. | La pàgina antiga només conté cookies. No enviar-la a `/legal/`, perquè no existeix al sitemap nou. |

Les URL de plantilla sense contingut real es tractaran segons l'inventari del full de càlcul, sense enviar-les automàticament a la home. El rastreig antic també va detectar variants TranslatePress a `/cat/estructuras/` i `/cat/motores/`; cal comprovar si continuen accessibles o indexades i dirigir-les a les versions **CA** equivalents. La forma exacta de les noves URL per idioma es fixarà quan s'implementi la convenció d'`astro:i18n`, sense canviar el sitemap lògic aprovat.

## Validació posterior amb dades reals

**Search Console és la font principal per saber quines consultes i quines pàgines apareixen a la cerca de Google; Analytics descriu què passa després de l'entrada a la web.** Quan hi hagi accés, exportar consultes, pàgines, clics, impressions, CTR i posició de Search Console per idioma i branca; revisar també cobertura i estat d'indexació de cada URL. A Analytics, separar les sessions orgàniques per landing i comprovar consultes enviades, clics de telèfon i conversions si aquests esdeveniments s'han configurat. [Ús conjunt de Search Console i Analytics](https://developers.google.com/search/docs/monitor-debug/google-analytics-search-console).

Prioritzar els ajustos així: (1) URL importants sense indexar o redireccions errònies; (2) consultes amb impressions però amb una landing que no respon bé a la intenció; (3) pàgines amb clics però poca conversió; (4) noves variants sorgides de dades reals. Guardar una línia base abans del llançament i comparar períodes equivalents després. No assignar volums, creixement previst o una posició objectiu sense dades.

## Fonts de contrast terminològic

- Web antiga de [Serralleria Carbó](https://www.serralleriacarbo.com/contacte/) i inventari `Mapa-redireccions-serralleriacarbo.xlsx` per a oferta i llenguatge existents.
- Mostres de terminologia local a [Automatismes i Serralleria Marc Lara](https://automatismesiserralleriamlara.com/treballs-de-serralleria-amb-ferro-i-acer-inoxidable-a-vilafranca-del-penedes/) i de sèries curtes a [Mecanitzats LLAM](https://www.mecanitzatsllam.com/serveis/). S'han utilitzat per contrastar vocabulari, no com a font de capacitats de Carbó.
- Mostres en anglès de “small batch” i “subcontract metal fabrication” a [PnP Grupp](https://subcontracting.pnpgrupp.ee/) i de “short run” a [Metal S.r.l.](https://metal.srl/en/). Són exemples de llenguatge sectorial, sense traslladar afirmacions empresarials.
