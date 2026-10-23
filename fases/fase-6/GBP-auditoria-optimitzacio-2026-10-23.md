# Perfil d'Empresa de Google · Auditoria i optimització (23/10/2026)

Encàrrec del director del 23/10/2026: auditar i optimitzar el Perfil d'Empresa de Google de Serralleria Carbó i aplicar-hi les millores justificades. Aquest document recull l'estat inicial, les troballes, els canvis aplicats i el que queda pendent.

Les dades de suport són a [`gbp-2026-10-23/`](gbp-2026-10-23/):
- `abans/fotos/`: còpia de les 8 fotos i del logotip publicats abans dels canvis;
- `evidencies/`: captures, de l'estat inicial a la comprovació final;
- `fotos-preparades/`: les còpies que s'han pujat o que es proposen;
- `ressenyes/`: el QR;
- `linia-base-2026-10-23.csv`: la línia base de rendiment.

**Llegenda d'estat:**
- **Enviat:** desat al panell; Google el revisa.
- **Aprovat:** el panell ja no el marca com a pendent.
- **Visible:** comprovat a la Cerca o a Maps.

## 1. Fonts i fitxa confirmada

**Fonts:**
- `CLAUDE.md`;
- `content/ca|es|en/`, prenent com a base les pàgines amb `status: approved`;
- `src/config/site.ts`;
- [FASE6-dades-google-business-profile.md](FASE6-dades-google-business-profile.md) i les seves CSV;
- [FASE6-pla-accio.md](FASE6-pla-accio.md), apartats C3–C7 i D1–D3;
- el catàleg `assets/fotografies-recuperades/cataleg.csv`;
- [FASE8-compliment-i-confianca.md](../fase-8/FASE8-compliment-i-confianca.md), punt 8.6 (drets d'imatge);
- la previsualització `revisio-client`, només per consultar-la. No s'ha posat al perfil.

**Fitxa:**
- **Gestor de perfils:** el compte en gestiona dues. **Només s'ha tocat «Serralleria Carbó»**, verificada, amb codi de botiga 02512410685401234329 i adreça Carrer d'Eugeni d'Ors, 59. L'altra («Eliminar Piojos…», Igualada, sense verificar) no té relació amb el projecte i no s'ha obert.
- **Identificadors:** l'editor treballa amb el perfil 11159993715849104986, el mateix de la Fase 6. L'enllaç de ressenyes obre el lloc `0xec3b68613bd6d987`, el CID que ja constava.

**Directrius oficials consultades (23/10/2026):**
- [Directrius per representar l'empresa](https://support.google.com/business/answer/3038177):
  - nom real, sense paraules clau;
  - les categories mínimes, triant «l'empresa ÉS», no «l'empresa TÉ»;
  - descripció sense enllaços, preus ni promocions;
  - zona de servei de fins a unes 2 hores, i negocis híbrids.
- [Fotos](https://support.google.com/business/answer/6103862):
  - JPG o PNG, de 10 KB a 5 MB;
  - 720 × 720 px recomanats i 250 × 250 px com a mínim;
  - nítides, ben il·luminades i sense filtres intensos;
  - la portada no sempre es mostra en primer lloc.
- [Ressenyes](https://support.google.com/contributionpolicy/answer/7400114): no es poden oferir incentius ni desanimar les ressenyes negatives, ni demanar-les només als clients satisfets («review gating»). Tampoc no se'n poden publicar amb conflicte d'interès.

## 2. Estat inicial (23/10/2026, abans de cap canvi)

Captures: `evidencies/01-abans-panell-cerca.jpg` i `evidencies/02-abans-fotos-sense-portada.jpg`.

| Camp | Valor anterior | Observació |
|---|---|---|
| Nom | Serralleria Carbó | Correcte. Maps en castellà el mostra sense accent («Serralleria Carbo»); és la presentació de Google, no el nom desat |
| Verificació | Verificada · «Eficàcia del perfil: informació exhaustiva» | Sense avisos de suspensió |
| Categoria principal | Metal·listeria (ES: Carpintería metálica y de aluminio; EN: Metalwork) | |
| Categories secundàries | Muntador/a d'estructures metàl·liques · Subministrament de metalls · Fabricació de metall · Contractista d'estructures d'acer | Les mateixes del 02/10, amb els noms en català (EN: Steel erector, Metal supplier, Metal fabricator, Steel framework contractor; ES: …, Empresa de armaduras y ferrallas) |
| Descripció | «Estem a la vostra disposició per oferir-vos serveis de serralleria especialitzats i solucions personalitzades» | Una sola frase genèrica (110 caràcters de 750) |
| Data d'obertura | Buida | |
| Telèfon | 938 90 27 94 | Coincideix amb el principal del web (fix) |
| Xat, perfils socials | Buits | |
| Lloc web | `http://serralleriacarbo.com/` | Sense https ni www: dues redireccions fins a la versió canònica |
| Adreça | Carrer d'Eugeni d'Ors, 59, 08720 Vilafranca del Penedès, Barcelona | Coordenades 41.3424819, 1.6916747 |
| Zona de servei | Alt Penedès, Barcelona («Google ha actualitzat la zona de servei») | La va afegir Google; quadra amb «Vilafranca i la rodalia» |
| Horari | Dl–dv 8:00–13:00 i 15:00–18:00; ds i dg tancat | Coincideix amb el web. Sense horaris especials |
| Atributs | Entrada accessible amb cadira de rodes; targetes de crèdit i de dèbit; Mastercard (tots «Google ha actualitzat els atributs») | No confirmats per l'empresa |
| Serveis | Cap | |
| Productes, publicacions, reserves | Cap | |
| Fotos | Logotip (265 × 265) i 8 fotos (~40.200 visualitzacions); **sense portada** | Vegeu l'apartat 6.1 |
| Ressenyes | 59, mitjana 3,7; **0 respostes**; 1 de nova d'1★ sense text (fa 2 setmanes) | El 02/10 n'hi havia 58 (mitjana 3,8) |

## 3. Línia base de rendiment

Dades a [linia-base-2026-10-23.csv](gbp-2026-10-23/linia-base-2026-10-23.csv). La consulta és del 23/10/2026; Rendiment s'ha obert amb `hl=en`, perquè les pestanyes es carreguin.

**Abast del panell:** només ofereix de maig a octubre del 2026. Octubre està incomplet.

| Mes | Trucades | Indicacions | Clics al web | Interaccions |
|---|---|---|---|---|
| Maig | 52 | 50 | 16 | 118 |
| Juny | 46 | 51 | 18 | 115 |
| Juliol | 65 | 34 | 28 | 127 |
| Agost | 67 | 57 | 13 | 137 |
| Setembre | 51 | 34 | 29 | 114 |
| Octubre (incomplet) | 22 | 49 | 6 | 77 |
| **Total** | **303** | **275** | **110** | **688** |

**Altres dades del període:**
- **Persones que han vist el perfil:** 3.064.
  - Maps al mòbil: 47 %.
  - Cerca al mòbil: 37 %.
  - Cerca a l'ordinador: 11 %.
  - Maps a l'ordinador: 6 %.
- **Cerques que han mostrat el perfil:** 488, sumant els cinc primers termes, que són els únics amb número:
  - «ferreteria»: 237;
  - «ferreteria vilafranca»: 86;
  - «carbo»: 64;
  - «serralleria carbó, carrer d'eugeni d'ors…»: 61;
  - «ferretería»: 40.
  - Hi ha 31 termes més amb menys de 15 cerques. Inclouen «copias de llaves» i «duplicado de llaves», «herrero vilafranca», «serralleria vilafranca» i «vigas acero vilafranca».
- **Reserves:** 0.

**Avís per comparar:**
- Google revisa les dades a posteriori: el setembre, que el 02/10 sumava 105 interaccions, ara en suma 114.
- Les comparacions s'han de fer amb mesos tancats i consultats almenys una setmana després de tancar-los.

## 4. Troballes prioritzades

| # | Tipus | Impacte | Troballa | Acció |
|---|---|---|---|---|
| T1 | Error | Alt | Cap resposta a 59 ressenyes; tres de les quatre últimes són d'1★ | Esborranys preparats (§7.5). Publicar-los correspon a l'empresa |
| T2 | Oportunitat | Alt | Ritme de ressenyes molt baix (4 en 12 mesos) | Enllaç, QR, missatges i procediment (§7.2–7.4) |
| T3 | Error | Alt | Descripció genèrica, sense Particulars ni Industrial | **Canviada i aprovada** (§5) |
| T4 | Error | Mitjà | Cap servei | **10 serveis enviats**, separats per branca (§5) |
| T5 | Oportunitat | Mitjà | No hi ha cap categoria de portes, encara que la majoria de ressenyes parlen de portes, automatismes i comandaments | **«Proveïdor de portes de garatge» i «Soldador» afegides** (§5) |
| T6 | Dada pendent | Alt | El 74 % de les cerques comptades són «ferreteria», probablement per la categoria «Subministrament de metalls» | No s'ha tocat: depèn de si l'empresa ven material al taulell (C4) |
| T7 | Error | Mitjà | Sense foto de portada; fotos antigues; cap foto del taller, de la façana o d'Industrial | **Portada i 9 fotos reals pujades** (§6) |
| T8 | Error | Baix | Lloc web en `http://` sense `www` | **Canviat a `https://www.serralleriacarbo.com/` i aprovat** |
| T9 | Dada pendent | Mitjà | Atributs afegits per Google (accessibilitat i pagaments) sense confirmar | Confirmar-los amb el client (§5.2) |
| T10 | Dada pendent | Mitjà | Adreça: «59» al perfil i al web; «59-61» al domicili social dels textos legals | No s'ha canviat res (§5.2) |
| T11 | Oportunitat | Baix | Sense publicacions | Calendari d'un mes preparat (§8) |
| T12 | Dada pendent | Baix | Una foto antiga (escala amb llenya, 396 × 328 px, 6.400 visualitzacions) té aspecte de foto de catàleg | Confirmar si és obra pròpia. No s'ha retirat (§6.1) |
| T13 | Dada pendent | Baix | Sense horaris de festius. Google proposa Tots Sants, que el 2026 cau en diumenge | Calendari de festius del client |
| T14 | Info | — | Duplicats: la cerca de marca no mostra cap segona fitxa de Google. Les variants de nom i d'adreça són als directoris (QDQ, eInforma, Infonif, Empresite, Comga), no a Google | Unificar-los quan es decideixi C5 (D6 del pla) |
| T15 | Info | — | Una segona font de ressenyes (Infobel: 3,8, 58 ressenyes) surt a la Cerca | No es pot gestionar des del perfil |

## 5. Canvis aplicats

Tots s'han fet el 23/10/2026 des del perfil verificat. La còpia dels valors anteriors és a l'apartat 2 i a `abans/`.

| Camp | Abans | Després | Estat (23/10) | Justificació |
|---|---|---|---|---|
| Categories secundàries | 4 (vegeu §2) | Les mateixes 4 + **Proveïdor de portes de garatge** + **Soldador** | **Aprovat** | Portes: el web les fabrica, instal·la i motoritza (Particulars, Automatismes) i la majoria de ressenyes en parlen. Soldador: MIG/MAG i TIG a Capacitats. S'han descartat «Serraller» i «Servei de serralleria d'urgències», que Google associa a obertura de panys i urgències, i «Ferrer», que suggereix forja |
| Descripció | La frase genèrica | Text de 736 caràcters (a sota) | **Aprovat** | Només dades validades a la Home, Particulars, Industrial i Capacitats. Sense urgències, certificacions ni enllaços |
| Lloc web | `http://serralleriacarbo.com/` | `https://www.serralleriacarbo.com/` | **Visible** a Maps | Adreça final del web actual (200, canonical pròpia), sense redireccions. Sense UTM (§9) |
| Serveis | Cap | 10 serveis personalitzats amb descripció (a sota) | **Aprovat** el mateix dia; encara no visible a Maps | Els textos dels serveis validats al web, amb la branca entre parèntesis. Una sola fitxa per a les dues branques |
| Foto de portada | Cap | `portada-a-passarella.jpg` | **Visible** a Maps i a la Cerca el 23/10 | §6.2 |
| Fotos | 8 | 8 + 9 noves | **Aprovat**; a Maps apareix el filtre «Avui» | §6.3 |

**Descripció publicada:**

> Serralleria Carbó és un taller de serralleria i fabricació metàl·lica de Vilafranca del Penedès, en actiu des de 1989.
>
> Per a particulars, fem instal·lacions, reparacions i treballs a mida per a habitatges, comunitats i negocis: baranes, escales, passarel·les, estructures, portes i automatismes. També fabriquem mobiliari metàl·lic a mida per a particulars i decoradors.
>
> Amb Industrial fabriquem per a tercers: peces a partir de plànol, sèries curtes i mitjanes, estructures, portes i tancaments per a obra, i carros industrials. També fem manteniment industrial. Treballem l'acer al carboni i l'inoxidable 304 i 316, amb soldadura MIG/MAG i TIG.
>
> Taller de 950 m² i equip de 12 persones. Treballem sobretot a Vilafranca i la rodalia.

**Serveis enviats.** Estan dins de la categoria principal: el panell els agrupa per categoria. La branca de cada servei s'indica entre parèntesis.

| Servei | Descripció |
|---|---|
| Fabricació metàl·lica per a tercers (Industrial) | Fabricació per a empreses i obra: estructures, portes i mobiliari, en sèrie o a mida, i encàrrecs industrials d'una sola unitat. Fabriquem, soldem i muntem al nostre taller de Vilafranca del Penedès. |
| Peces i conjunts a plànol (Industrial) | Peces i conjunts a partir d'un plànol o d'una especificació, en acer al carboni o inox 304/316. Taller amb plegadora, cisalla i punxonadora, i soldadura MIG/MAG i TIG. |
| Sèries curtes i mitjanes (Industrial) | Sèries curtes i mitjanes per a empreses. Material, soldadura, muntatge i quantitat es valoren conjuntament abans de fabricar. Podem valorar encàrrecs d'arreu de Catalunya. |
| Estructures, portes i tancaments per a obra (Industrial) | Escales, baranes, estructures per a ascensors, portes i tancaments per a projectes de constructores i promotores. |
| Carros industrials (Industrial) | Carros adaptats a una necessitat concreta, d'una unitat o en sèrie. |
| Manteniment industrial (Industrial) | Revisions i reparacions a les instal·lacions de la teva empresa. Ens desplacem fins a la instal·lació amb equip i vehicles propis. |
| Portes i automatismes (Particulars) | Fabriquem, instal·lem i motoritzem portes i accessos de garatge, pàrquing i negoci. També revisem automatismes que ja estan instal·lats. |
| Baranes, escales i passarel·les a mida (Particulars) | Fabriquem i instal·lem baranes, escales, passarel·les i altres estructures metàl·liques a mida de cada espai, per a habitatges, comunitats i negocis. |
| Reparació de portes, persianes i automatismes (Particulars) | Reparem portes, persianes i automatismes d'habitatges, comunitats i negocis. Explica'ns la incidència i, si pots, envia'ns una fotografia. |
| Mobiliari metàl·lic a mida (Particulars i decoradors) | Mobiliari amb estructura de ferro o inoxidable, a mida de l'ús i de l'espai. Per a particulars i decoradors. |

Els serveis s'han ordenat amb Industrial primer, com a la barra de dalt del web (director, 19/10/2026).

### 5.1 Què no s'ha canviat, i per què

| Camp | Motiu |
|---|---|
| Nom | És el nom real. No s'hi afegeixen paraules clau ni la població |
| Categoria principal | Es manté «Metal·listeria». Canviar-la pot alterar la visibilitat durant setmanes; si cal, es fa amb el web nou publicat (C6) |
| «Subministrament de metalls» | Probablement atrau les cerques de «ferreteria» (74 %). Només es pot treure si l'empresa confirma que no ven material al taulell (C4) |
| «Contractista d'estructures d'acer» | En castellà es tradueix com «Empresa de armaduras y ferrallas» (armadura de formigó). Es manté fins que el client digui si en fa. Si no, es pot treure |
| Data d'obertura | Google demana la data d'obertura **en aquesta adreça**. El 1989 és la fundació de l'empresa, però no consta des de quan és al número 59 |
| Telèfon | El fix ja és el principal (director, 13/10/2026). No s'hi ha afegit el mòbil: la decisió del 13/10 el reserva per a la pàgina de contacte i WhatsApp. Afegir-lo a «Altres números» és opcional i ho ha de decidir el director |
| Xat (WhatsApp) | Sense decisió del director per al perfil |
| Adreça i marcador | La diferència entre 59 i 59–61 no està resolta. 59 és l'adreça de contacte del web i del perfil; 59-61 és el domicili social dels textos legals, que l'advocat va aprovar el 20/10/2026. La FASE7 indica que no s'han d'unificar per suposició. No s'ha mogut res |
| Zona de servei | Ja és «Alt Penedès», que quadra amb «Vilafranca i la rodalia». No s'hi afegeix Barcelona: el web parla de «valorar» feines fins a Barcelona, no d'una zona habitual |
| Atributs (accessibilitat, pagaments) | Els va afegir Google. Ni es confirmen ni s'esborren sense saber si són certs |
| Horaris especials | Falta el calendari de festius del client |
| Productes | No hi ha venda confirmada de productes (C4) |
| Logotip | El logotip publicat és l'original complet («carbó · serralleria», bordeus) amb el telèfon i el web en petit. L'arxiu del web (`src/assets/branding/carbo-logo.png`) **no inclou «serralleria»**: canviar-lo seria perdre part de la marca. Proposta: que el client faciliti l'original vectorial per fer una versió quadrada de 720 × 720 sense el text de contacte |
| Fotos antigues | No se n'ha retirat cap. Tenen unes 40.200 visualitzacions i el director va confirmar els permisos d'ús de les fotografies actuals el 15/10/2026 |
| Perfils socials | La pàgina de Facebook (2 «m'agrada») està pendent de la decisió C15 |

### 5.2 Dades que necessitem de vosaltres

1. **Venda de material al taulell** (C4). Si no en veneu, traiem «Subministrament de metalls».
2. **Armadura de formigó o ferralla** per a obra: en feu? Si no, traiem «Contractista d'estructures d'acer».
3. **Des de quan és el taller al carrer d'Eugeni d'Ors, 59** (data d'obertura en aquesta adreça).
4. **Adreça definitiva** (C5): 59 o 59-61 per a visites i contacte.
5. **Atributs:**
   - l'entrada és accessible amb cadira de rodes?
   - quines formes de pagament accepteu (targeta, transferència, efectiu)?
   - hi ha aparcament?
6. **Calendari de festius** en què el taller tanca, començant per l'any 2026 (8 i 25 de desembre).
7. **Mòbil i WhatsApp al perfil:** sí o no (director).
8. **Logotip original** en vectorial (AI, EPS, SVG o PDF).
9. **Foto de l'escala amb llenya** (T12): és obra vostra?

## 6. Identitat visual i fotografies

### 6.1 Catàleg i criteri

**Fonts:**
- **Fotografies reals:**
  - `assets/fotografies-recuperades/`: fotos de la web antiga, amb catàleg i origen;
  - les 8 fotos antigues del perfil.
- **Imatges conceptuals:** `assets/imatges-conceptuals/` (28 PNG generats amb IA, amb `prompts.md`).
  - **No s'utilitzen al perfil:** no són el taller, l'equip ni obra real.
  - Inclouen `sector-tecnologies-duals-v2.png`, que tampoc no s'ha de fer servir.

**Criteris aplicats:**
- **Permisos:** permisos d'ús de les fotografies actuals confirmats pel director el 15/10/2026 (FASE8, 8.6).
- **Persones:** no es pugen fotos amb persones identificables mentre no hi hagi consentiment de dret d'imatge (P5 del manual de publicació). Per això queden fora:
  - `porta-parquing-interior-01` i `-02`, amb un operari;
  - `gavia-industrial-fabricacio-01`, un operari d'esquena amb la samarreta de l'empresa;
  - `equip-furgoneta-intervencio`;
  - `reparacio-persiana-comercial`.
- **Autoria no confirmada:** `soldadura-muntatge-obra` i `soldadura-espurnes` (estat `revisar-drets`).
- **Descartades al catàleg:** el trepant sobre fusta i el metall incandescent.

**Tractament de les còpies:**
- **Fotos sense retall:** còpia exacta de l'original. Ja són JPEG comprimits de WhatsApp, i tornar-los a comprimir els faria perdre qualitat.
- **Portades:** retall a 16:9 en JPEG de qualitat 90.
- **En cap cas:** filtres, textos ni logotips sobreposats.
- **Originals:** no s'han modificat.

### 6.2 Portada (aplicada)

| Candidata | Fitxer original | Retall | Resolució i pes | Valoració |
|---|---|---|---|---|
| **A · Passarel·la (aplicada)** | `projectes/passarella-interior/passarella-interior-vista-frontal-01.jpg` | 16:9, del 20 % superior | 1500 × 844, 394 KB | **Recomanada:** llum natural, baranes de ferro negre i xapa d'acer, línies clares. Es llegeix bé en panoràmic (Maps i Cerca a l'ordinador) i en quadrat (miniatura al mòbil). Projecte aprovat |
| B · Gàbia al taller | `projectes/gavia-industrial/gavia-industrial-taller-02.jpg` | 16:9, del 30 % superior | 1200 × 675, 197 KB | Ensenya el taller real i Industrial. Té més elements de fons, i el retall deixa un avantbraç amb guant a l'esquerra (sense cara) |
| C · Persianes d'un negoci | `projectes/persianes-negoci/persianes-negoci-facana-01.jpg` | 16:9, centrat | 1600 × 900, 406 KB | Neta i ben il·luminada. Comunica menys l'ofici del metall, i la façana és d'un client |

**Comprovació:**
- El 23/10 Maps i el panell de la Cerca ja mostraven la portada A com a primera imatge: `evidencies/09-despres-panell-cerca.jpg`.
- Google no garanteix que es mantingui sempre en primer lloc.
- La miniatura quadrada de Maps al mòbil manté la passarel·la al centre.

### 6.3 Selecció per a cada ús

**Preparada** vol dir que es pot publicar: obra real, permisos d'ús confirmats i cap persona identificable.

**Pujades el 23/10/2026**, en revisió de Google:

| Ús | Fitxer pujat (`fotos-preparades/`) | Original | Resolució i pes | Motiu | Estat |
|---|---|---|---|---|---|
| Particulars | `particulars-passarella-frontal.jpg` | `passarella-interior-vista-frontal-01.jpg` | 1500 × 2000, 577 KB | Obra completa ben il·luminada | Pujada |
| Particulars | `particulars-passarella-lateral.jpg` | `passarella-interior-vista-lateral-02.jpg` | 1500 × 2000, 549 KB | Vista lateral que mostra les baranes | Pujada |
| Particulars | `particulars-baranes-escala-interior.jpg` | `baranes-interior-escala-01.jpg` | 1200 × 1600, 175 KB | Barana interior en una reforma | Pujada |
| Particulars | `particulars-estructura-ascensor.jpg` | `estructura-ascensor-pati-04.jpg` | 1200 × 1600, 331 KB | Estructura per a ascensor en una comunitat | Pujada |
| Particulars (negoci) | `particulars-persianes-negoci.jpg` | `persianes-negoci-facana-01.jpg` | 1600 × 1200, 343 KB | Persianes motoritzades | Pujada |
| Particulars (negoci) | `particulars-persiana-detall.jpg` | `persianes-negoci-persiana-03.jpg` | 1200 × 1600, 340 KB | Detall de la persiana | Pujada |
| Particulars (portes) | `particulars-porta-parquing.jpg` | `porta-parquing-interior-03.jpg` | 1600 × 1204, 288 KB | Porta de pàrquing, sense persones | Pujada |
| Industrial i interior del taller | `industrial-gavia-taller.jpg` | `gavia-industrial-taller-02.jpg` | 1200 × 1600, 264 KB | Peça industrial al taller propi: plegadora, trepant i campana. Només hi surt un guant | Pujada |
| Industrial | `industrial-gavia-transport.jpg` | `gavia-industrial-transport-03.jpg` | 1200 × 1600, 229 KB | Gàbia carregada al camió amb el logotip de l'empresa. Les persones i matrícules del fons són petites i no s'identifiquen | Pujada |

**No disponibles o pendents:**

| Ús | Situació |
|---|---|
| Logotip | Es manté l'actual (§5.1). Cal l'original vectorial |
| Façana i accés | **No n'hi ha cap.** Google ho demana («Afegeix foto exterior») i hi ha 275 peticions d'indicacions en sis mesos. Vegeu la guia (§6.4) |
| Equip treballant | N'hi ha tres de bones, però **falta el consentiment** de les persones (P5) |
| Mobiliari a mida i decoradors | **No n'hi ha cap foto real** (la pàgina Mobiliari també ho té pendent) |
| Soldadura i acabats | Les dues fotos de soldadura no tenen l'autoria confirmada. Calen fotos noves del taller |
| Manteniment industrial | Cap foto |

### 6.4 Guia perquè el client faci les fotos que falten

**Indicacions generals:**
- Mòbil en horitzontal, a la màxima resolució, sense zoom digital, filtres ni modes «bellesa».
- Llum de dia; el sol, a l'esquena o de costat, mai al davant.
- Netejar la lent abans de fer la foto.
- Fer-ne tres o quatre de cada i triar la més nítida.
- No hi han de sortir matrícules, cares de clients ni dades d'obra (adreces, documents).
- Si hi surten treballadors, cal el seu consentiment per escrit **abans** de publicar.

| Foto | Què ha de sortir | Com |
|---|---|---|
| Façana i accés (prioritat 1) | La porta del taller i el rètol, amb prou carrer perquè es reconegui en arribar | Des de la vorera del davant, a l'alçada dels ulls, en horitzontal. Un matí amb el sol de cara a la façana. Una segona foto més ample amb el carrer |
| Interior del taller | La nau, endreçada, amb plegadora, cisalla o punxonadora | Des d'una cantonada, a 1,5 m d'alçada, amb els llums encesos i les portes obertes per tenir llum natural. Sense trastos al primer pla |
| Maquinària | Cada màquina, sola i sencera | De costat, a tres quarts. Fons net |
| Soldadura (amb consentiment) | Un operari soldant, amb pantalla | Des del costat, sense cara visible o amb permís. La llum de la soldadura no ha de cremar tota la imatge: millor amb la nau il·luminada |
| Acabats i detalls | Cordons de soldadura, unions, pintura o inox polit | De prop, amb llum lateral suau. Peça neta |
| Mobiliari a mida | La peça acabada al seu espai, amb permís del client | En horitzontal i vertical, amb llum de finestra |
| Equip i vehicles | Les furgonetes i el camió ploma amb el logotip, davant del taller | En horitzontal. Si hi surt l'equip, amb el consentiment de tothom |
| Manteniment industrial | La intervenció en una instal·lació, amb permís del client | Sense logotips ni dades del client |

## 7. Ressenyes

### 7.1 Auditoria (59 ressenyes, 23/10/2026)

**Volum i respostes:**
- Distribució: 5★ 26 · 4★ 15 · 3★ 6 · 2★ 1 · 1★ 11. Mitjana: 3,7.
- Ressenyes amb text: 35.
- Respostes: cap.

**Antiguitat:**
- En els últims 12 mesos n'hi ha 4: tres d'1★ (una sense text de fa 2 setmanes, una de juny amb text i una de gener) i una de 5★ (gener).
- La millor època va ser del 2023 al 2024.

**Temes recurrents**, amb detall a [FASE6-gbp-ressenyes.csv](FASE6-gbp-ressenyes.csv):
- **Positius:**
  - rapidesa en avaries de portes i pàrquings;
  - tracte i professionalitat;
  - netedat;
  - qualitat de la feina.
- **Negatius:**
  - terminis llargs o incomplerts (3);
  - trucades sense resposta (2);
  - comandaments de pàrquing: averies, garantia i desacords (2);
  - factura o preu (2);
  - un pany resolt per una persona subcontractada.

**Millores del servei** que proposen els comentaris reals. Les ha de decidir l'empresa:
1. **Tornar les trucades:** una llista diària de trucades pendents i un compromís intern de retornar-les el mateix dia o l'endemà.
2. **Terminis:**
   - donar dates realistes en acceptar el pressupost;
   - avisar el client **abans** de la data si hi ha un retard.
3. **Pressupostos:**
   - dir-ne el termini d'entrega quan es demanen;
   - en una ressenya positiva, el pressupost va trigar.
4. **Comandaments:**
   - provar-los davant del client en lliurar-los;
   - explicar per escrit la garantia que s'ofereix. La garantia és una dada que ha de concretar l'empresa.
5. **Factura:** detallar hores i material al pressupost, i avisar si es desvia.

### 7.2 Enllaç i QR

- **Enllaç oficial** (Gestor → Aconsegueix més ressenyes): **https://g.page/r/CYfZ1jthaDvsEAE/review**
  - **Comprovat:** obre el formulari de ressenya de «Serralleria Carbó», lloc `0xec3b68613bd6d987` (`evidencies/08-…`). El formulari es va tancar sense publicar res.
  - Des de la Cerca, Google dona una variant amb un altre codi final (`…EBM/review`) que porta al mateix lloc. **Utilitzeu-ne només una:** la de dalt.
- **QR:**
  - **Fitxers:** [`ressenyes/qr-ressenya-google.png`](gbp-2026-10-23/ressenyes/qr-ressenya-google.png) (820 × 820 px) i [`.svg`](gbp-2026-10-23/ressenyes/qr-ressenya-google.svg) per imprimir.
  - **Format:** negre sobre blanc, correcció d'errors Q, versió 4, marge de 4 mòduls.
  - **Verificat:** s'ha descodificat amb OpenCV, a mida completa i reduït a 240 px, i retorna exactament l'enllaç.
  - **En imprimir-lo:** com a mínim 2,5 × 2,5 cm, sense canviar-ne els colors.

### 7.3 Missatges de WhatsApp per demanar una opinió honesta

S'envien a **tots** els clients en acabar una feina, no només als satisfets. No es demana cap puntuació ni s'ofereix res a canvi.

**Diferència amb la proposta D2 de la Fase 6:** aquella proposta començava amb «Si està content amb la feina…». Aquí s'ha tret perquè seria demanar ressenyes de manera selectiva, i les normes de Google ho prohibeixen.

**Català:**
> Hola, [nom]. Som de Serralleria Carbó. Gràcies per confiar-nos [la feina]. Ens ajudaria molt saber la teva opinió, sigui quina sigui. Si vols, la pots deixar a Google en aquest enllaç: https://g.page/r/CYfZ1jthaDvsEAE/review. Moltes gràcies!

**Castellà:**
> Hola, [nombre]. Somos de Serralleria Carbó. Gracias por confiarnos [el trabajo]. Nos ayudaría mucho conocer tu opinión, sea cual sea. Si quieres, puedes dejarla en Google en este enlace: https://g.page/r/CYfZ1jthaDvsEAE/review. ¡Muchas gracias!

### 7.4 Procediment per a Jordi o Laura

1. **Quan s'envia:**
   - en tancar cada feina (o en cobrar-la), dins dels 3 dies següents, per WhatsApp;
   - a **tots** els clients, amb el missatge de §7.3 en l'idioma del client;
   - una sola vegada, sense recordatoris insistents.
2. **Registre de seguiment:** apuntar la data i el tipus de feina en un full.
   - No cal cap dada nova del client.
   - Serveix per veure quantes es demanen i quantes arriben.
3. **No es pot:**
   - oferir descomptes ni regals;
   - demanar 5 estrelles;
   - demanar-ho només als clients contents;
   - demanar a treballadors, familiars o proveïdors que en deixin;
   - escriure ressenyes en nom d'un client;
   - insistir mentre el client és davant.
4. **Respondre totes les ressenyes noves** en menys d'una setmana:
   - **Positives:** agrair, mencionar la feina si el client la cita i no repetir sempre la mateixa frase.
   - **Negatives:**
     - respondre amb calma;
     - no discutir els fets en públic;
     - no donar dades del client;
     - convidar a trucar al 93 890 27 94 o a escriure a carbo@serralleriacarbo.com;
     - després, trucar-li si se sap qui és.
5. **Cada mes:** revisar els temes de les ressenyes noves a la reunió de l'equip.
   - Si una ressenya és falsa o incompleix les normes, es pot denunciar des del panell («Denuncia la ressenya»). Mai per haver estat negativa.
6. **Objectiu orientatiu:** 2 o 3 ressenyes noves al mes. No és una garantia: depèn dels clients.

### 7.5 Esborranys de resposta (59 pendents, cap publicada)

**Abans de publicar:**
- El to i la signatura s'han de validar (C7). Proposta de signatura: «L'equip de Serralleria Carbó».
- No hi ha noms d'autor, per privacitat. La numeració és la del panell, ordenat de més recent a més antiga, i coincideix amb `FASE6-gbp-ressenyes.csv` + 1.
- Cada resposta va en l'idioma de la ressenya.
- **Ordre recomanat de publicació:**
  1. les negatives recents: 1, 2, 4;
  2. les negatives més visibles: 13, 24, 31, 39 i 43;
  3. la resta.

**Negatives i neutres amb text:**

| # | Ressenya | Esborrany |
|---|---|---|
| 2 | 1★, juny 2026 (es): feina de pocs dies que va trigar 5 mesos | Gracias por explicar su experiencia. Lamentamos que el trabajo se alargara tanto respecto a lo que esperaba; no es el servicio que queremos ofrecer. Nos gustaría hablarlo directamente con usted para entender qué falló: puede llamarnos al 93 890 27 94 o escribir a carbo@serralleriacarbo.com. El equipo de Serralleria Carbó. |
| 13 | 1★, nov. 2023: pany no resolt | Gràcies pel comentari. Lamentem que el problema del pany no quedés resolt. Si vol explicar-nos-ho, ens pot trucar al 93 890 27 94 o escriure a carbo@serralleriacarbo.com i ho revisarem. L'equip de Serralleria Carbó. |
| 24 | 1★, abr. 2023 (es): comandament i desacord | Gracias por su comentario. Lamentamos que la incidencia con el mando acabara en un desacuerdo. Si quiere, podemos revisarlo con calma: puede llamarnos al 93 890 27 94 o escribir a carbo@serralleriacarbo.com. El equipo de Serralleria Carbó. |
| 25 | 1★, nov. 2022 (es): «Lo peor» | Lamentamos que su experiencia no fuera buena. Si quiere contarnos qué ocurrió, puede llamarnos al 93 890 27 94 o escribir a carbo@serralleriacarbo.com. El equipo de Serralleria Carbó. |
| 26 | 3★, nov. 2022: trucades no tornades, bona feina | Gràcies pel comentari i per valorar la qualitat de la feina. Té raó que hem de respondre millor les trucades, i en prenem nota. Si encara té res pendent, ens pot trucar al 93 890 27 94 o escriure a carbo@serralleriacarbo.com. L'equip de Serralleria Carbó. |
| 31 | 1★, març 2022 (es): comandaments cars i sense garantia | Gracias por su opinión. Lamentamos que los mandos no le dieran el resultado que esperaba. Si todavía tiene alguno con problemas, llámenos al 93 890 27 94 o escríbanos a carbo@serralleriacarbo.com y lo revisamos. El equipo de Serralleria Carbó. |
| 33 | 3★, gen. 2022: bona feina, factura alta | Gràcies per valorar la feina. Si vol revisar el detall de la factura, ens pot trucar al 93 890 27 94 o escriure a carbo@serralleriacarbo.com i l'hi expliquem. L'equip de Serralleria Carbó. |
| 39 | 1★, febr. 2021 (es): dos meses y no se presentan | Gracias por su comentario. Lamentamos la espera y lo ocurrido con la cita; no es como queremos trabajar. Si quiere hablarlo, puede llamarnos al 93 890 27 94 o escribir a carbo@serralleriacarbo.com. El equipo de Serralleria Carbó. |
| 42 | 3★, oct. 2020 (es): «solo paso por delante» | Gracias por su valoración. Si algún día necesita un trabajo de serrallería, estaremos encantados de atenderle. El equipo de Serralleria Carbó. *(Opcional: no és un client.)* |
| 43 | 1★, oct. 2020: va haver de trucar diverses vegades | Gràcies pel comentari. Lamentem que hagués d'insistir per tirar endavant la feina; no és com volem treballar. Si vol parlar-ne, ens pot trucar al 93 890 27 94 o escriure a carbo@serralleriacarbo.com. L'equip de Serralleria Carbó. |
| 47 | 4★, juny 2020: «un pèl car» | Gràcies per la valoració i pel comentari. Ens alegra que la feina li agradés. L'equip de Serralleria Carbó. |
| 53 | 3★, nov. 2019 (es): «Herrero de toda la vida» | ¡Muchas gracias por su comentario! El equipo de Serralleria Carbó. |

**Positives amb text:**

| # | Ressenya | Esborrany |
|---|---|---|
| 5 | 5★, set. 2025: «Perfectes i professionals» | Moltes gràcies per la valoració! Ens alegra que la feina li hagi agradat. L'equip de Serralleria Carbó. |
| 6 | 4★, febr. 2025: reparació del balcó | Gràcies per explicar la seva experiència amb la reparació del balcó. Ens alegra que, tot i el que es va trobar en desmuntar-lo, poguéssim trobar-hi una solució. L'equip de Serralleria Carbó. |
| 7 | 5★, ag. 2024: escala per a la nau; el pressupost va trigar | Gràcies per confiar-nos l'escala de la nau i pel comentari. Prenem nota del temps del pressupost, que volem millorar. Ens alegra que la qualitat i el servei hi estiguessin a l'altura. L'equip de Serralleria Carbó. |
| 8 | 5★, ag. 2024: reparació de porta, ràpids i nets | Moltes gràcies! Ho farem arribar als companys que hi van anar: ens alegra que la porta quedés arreglada ràpidament i tot ben net. L'equip de Serralleria Carbó. |
| 9 | 5★, ag. 2024: avaria a la porta del pàrquing | Gràcies per la valoració. Ens alegra haver resolt l'avaria de la porta del pàrquing i que l'equip treballés amb cura. L'equip de Serralleria Carbó. |
| 10 | 5★, jul. 2024: ràpids, menys dies que la competència | Moltes gràcies per confiar en nosaltres. Ens alegra que poguéssim solucionar el problema amb rapidesa. L'equip de Serralleria Carbó. |
| 11 | 5★, febr. 2024: material de primeres marques, tracte cordial | Gràcies pel comentari i per la fotografia. Ens alegra que la feina i el tracte li hagin agradat. L'equip de Serralleria Carbó. |
| 12 | 5★, des. 2023 (es): trabajo impecable | Muchas gracias por su valoración. Nos alegra que el trabajo y el trato estuvieran a la altura. El equipo de Serralleria Carbó. |
| 14 | 5★, nov. 2023: incidència resolta ràpid | Gràcies per la valoració. Ens alegra que poguéssim resoldre la incidència amb rapidesa. L'equip de Serralleria Carbó. |
| 15 | 5★, nov. 2023: complidors i atents | Moltes gràcies pel comentari! L'equip de Serralleria Carbó. |
| 17 | 5★, set. 2023: servei excel·lent de tots | Gràcies! Ho farem arribar a tot l'equip. L'equip de Serralleria Carbó. |
| 18 | 5★, set. 2023: grans professionals | Moltes gràcies per la confiança! L'equip de Serralleria Carbó. |
| 19 | 5★, set. 2023: 4 portes de pàrquing operatives el mateix dia | Gràcies per la ressenya. Ens alegra que les quatre portes del pàrquing quedessin operatives el mateix dia. L'equip de Serralleria Carbó. |
| 20 | 5★, set. 2023: bon servei i ràpid | Moltes gràcies! Ens alegra que n'estiguessin contents. L'equip de Serralleria Carbó. |
| 23 | 4★, maig 2023 (es): mando ya codificado | ¡Gracias! Nos alegra que pudiéramos tenerle el mando preparado. El equipo de Serralleria Carbó. |
| 27 | 5★, oct. 2022: econòmics, fiables i amables | Moltes gràcies per la confiança i per recomanar-nos! L'equip de Serralleria Carbó. |
| 29 | 5★, set. 2022: ràpids i professionals | Moltes gràcies per la valoració! L'equip de Serralleria Carbó. |
| 34 | 4★, ag. 2021 (es): «Aluminio» | Muchas gracias por su valoración. El equipo de Serralleria Carbó. |
| 35 | 5★, ag. 2021: tracte professional | Gràcies pel comentari! Ens alegra que el tracte fos bo. L'equip de Serralleria Carbó. |
| 37 | 4★, març 2021 (es): «Soluciones de tus problemas» | Gracias por su valoración. Nos alegra haberle ayudado. El equipo de Serralleria Carbó. |
| 41 | 4★, des. 2020: molt ben atès, oficials i despatx | Gràcies! Ho farem arribar als oficials i a l'oficina. L'equip de Serralleria Carbó. |
| 55 | 4★, des. 2018: «Bons serrallers» | Moltes gràcies! L'equip de Serralleria Carbó. |
| 57 | 4★, jul. 2018 (es): «Bien» | ¡Gracias por su valoración! El equipo de Serralleria Carbó. |

**Sense text:**
- **1★ i 2★:** 1 (oct. 2026), 4 (gen. 2026), 21 (2★), 48 i 58.
  > Gràcies per la valoració. Lamentem que l'experiència no fos bona. Si ens vol explicar què va passar, ens pot trucar al 93 890 27 94 o escriure a carbo@serralleriacarbo.com i ho revisarem. L'equip de Serralleria Carbó.
- **3★:** 45 i 52.
  > Gràcies per la valoració. Si hi ha alguna cosa que puguem millorar, ens agradarà saber-ho: 93 890 27 94 o carbo@serralleriacarbo.com. L'equip de Serralleria Carbó.
- **4★ i 5★:** 3, 16, 22, 28, 30, 32, 36, 38, 40, 44, 46, 49, 50, 51, 54, 56 i 59. Cal alternar-ne les frases perquè no siguin idèntiques:
  - «Moltes gràcies per la valoració. L'equip de Serralleria Carbó.»
  - «Gràcies per confiar en nosaltres! L'equip de Serralleria Carbó.»
  - «Agraïm molt la seva valoració. L'equip de Serralleria Carbó.»

## 8. Calendari de publicacions (un mes)

**Ritme:** una publicació setmanal (tipus «Novetat»), els dimarts al matí.

**Criteris:**
- Totes les fotos ja s'han pujat al perfil i són obra real (§6.3).
- Textos dels projectes aprovats al web (`content/ca/projects/`) i de les pàgines validades.
- El text no porta telèfon (Google sol rebutjar les publicacions que en porten). Es fa servir el botó **«Truca ara»**.
- No s'enllaça la previsualització. Quan es publiqui el web nou, el botó pot passar a «Més informació» amb la pàgina del projecte.
- Res d'urgències ni de 24 hores.

| Data | Branca | Foto | Text |
|---|---|---|---|
| Dt 27/10/2026 | Particulars | `particulars-passarella-lateral.jpg` | Baranes de ferro negre i una passarel·la per a un habitatge en reforma. Tot es va soldar i pintar a la mateixa obra. Fabriquem i instal·lem baranes, escales i passarel·les a mida de cada espai. Explica'ns el teu i en preparem la valoració. |
| Dt 03/11/2026 | Industrial | `industrial-gavia-taller.jpg` | Fabricació i subministrament de deu gàbies per a un client industrial. Des del nostre taller de Vilafranca fabriquem per a empreses: sèries curtes i mitjanes, peces a partir de plànol i carros industrials, també d'una sola unitat. |
| Dt 10/11/2026 | Particulars (negoci) | `particulars-persianes-negoci.jpg` | Fabricació, instal·lació i motorització de sis persianes enrotllables i de la porta d'un negoci. També reparem portes, persianes i automatismes d'habitatges, comunitats i negocis. |
| Dt 17/11/2026 | Particulars (comunitat) | `particulars-estructura-ascensor.jpg` | Fabricació i instal·lació d'una estructura per incorporar un ascensor a una comunitat que buscava millorar la mobilitat dins de l'edifici. Cada estructura es defineix segons l'espai i l'ús. |

**Opcional, quan hi hagi les dades:**
- **Horari dels festius de desembre:** al panell d'horaris especials, no com a publicació.
- **Foto de la façana:** «Ens trobaràs al carrer d'Eugeni d'Ors», quan el client faci la foto.

## 9. UTM i mesura

**Ara no s'ha posat cap UTM al camp del lloc web.** Analytics no està configurat (Fase 6, 8.7) i no tindria cap efecte. Els clics al web ja es compten al panell de rendiment.

**Comprovació feta el 23/10/2026** amb `?utm_source=google&utm_medium=organic&utm_campaign=perfil-empresa`:
- **Web actual:** respon 200 i manté la canonical `https://www.serralleriacarbo.com/`, sense paràmetres.
- **Previsualització del web nou:** respon 200 amb la mateixa canonical i `noindex`.
- **Codi del web nou:** només llegeix `tipus` i `servei` de la URL (formulari i portafoli), així que els UTM no hi interfereixen.

**Proposta per al llançament**, quan hi hagi Analytics amb consentiment (8.7):
- camp «Lloc web» = `https://www.serralleriacarbo.com/?utm_source=google&utm_medium=organic&utm_campaign=perfil-empresa`.

## 10. Comprovació pública final (23/10/2026)

| Element | Panell | Cerca / Maps |
|---|---|---|
| Portada (passarel·la) | Activa | **Visible** a Maps i al panell de la Cerca |
| Categories | Aprovades (sense «pendent») | Maps continua mostrant la principal, «Metal·listeria» (Maps en castellà: «Carpintería metálica y de aluminio»). Les secundàries no es mostren a la fitxa pública |
| Descripció | Aprovada | Encara no surt a la pestanya «Informació» de Maps. Cal tornar-ho a comprovar en 24–72 h |
| Lloc web | Aprovat | **Visible:** l'enllaç de Maps ja apunta a `https://www.serralleriacarbo.com/` |
| Serveis (10) | Aprovats (sense avís de pendent) | Encara no visibles a Maps |
| 9 fotos noves | Aprovades (0 pendents) | **Visibles:** Maps mostra el filtre de fotos «Avui» |
| Telèfon, adreça i horari | Sense canvis | Correctes a la Cerca |

Captura final: `evidencies/10-despres-maps-publica.jpg`.

**Pendent:** a partir del 26/10/2026, comprovar si la descripció i els serveis ja són visibles a Maps i a la Cerca, i anotar-ne la data aquí.

## 11. Seguiment a 30 i 60 dies

**Criteris de lectura:**
- **Resultat observat:** el que mostra el panell.
- **Hipòtesi:** la relació amb un canvi concret. No s'atribueix automàticament cap variació a un canvi; hi influeixen l'estacionalitat (agost, festius de desembre), les ressenyes noves i la publicació del web.
- **Mesura comparable:**
  - mesos tancats, consultats amb `hl=en` com a mínim 7 dies després de tancar-los;
  - el mateix mes de referència;
  - les mateixes mètriques del CSV.

| Revisió | Data | Període que es compara | Què cal mirar |
|---|---|---|---|
| 30 dies | Setmana del 30/11/2026 (millor després del 07/12, amb novembre tancat) | **Novembre del 2026** davant de la mitjana de maig–setembre del 2026 (118 interaccions, 56 trucades, 45 indicacions, 21 clics al mes) | Trucades, indicacions, clics; termes de cerca: pes de «ferreteria» davant de termes de serralleria, portes o soldadura; ressenyes noves i respostes; visualitzacions de fotos noves; serveis i descripció visibles |
| 60 dies | Setmana del 11/01/2027, amb desembre tancat | **Novembre + desembre del 2026** davant de **maig + juny del 2026** (dos mesos sense vacances d'estiu) | El mateix, i l'evolució de la mitjana de ressenyes. Si s'ha publicat el web nou, cal separar-ne l'efecte |

**Al tall mensual (B6):** afegir les dades a `FASE6-gbp-metriques.csv` o a un CSV nou amb la mateixa estructura que `linia-base-2026-10-23.csv`.

## 12. Resum

**Millorat avui:**
- descripció completa amb Particulars, Industrial i mobiliari per a decoradors;
- dues categories que representen feina real (portes de garatge i soldadura);
- lloc web amb https;
- 10 serveis organitzats per branca;
- primera foto de portada;
- 9 fotos reals de treballs de Particulars i d'Industrial.

**Ja visible:** la portada, el web amb https i les 9 fotos noves.

**Aprovat però encara no visible a Maps:** la descripció, les categories noves (la fitxa pública només mostra la principal) i els serveis.

**Preparat per a vosaltres:**
- enllaç i QR de ressenyes verificats;
- missatges de WhatsApp en català i castellà;
- procediment per a Jordi o Laura;
- 59 esborranys de resposta;
- calendari de publicacions d'un mes;
- guia per fer les fotos que falten.

**Actualització:** el director ha respost les preguntes de §5.2. Vegeu l'apartat 13.

**Necessitàvem de vosaltres** (§5.2):
- venda al taulell;
- ferralla;
- des de quan sou al número 59;
- adreça 59 o 59-61;
- atributs;
- festius;
- mòbil i WhatsApp;
- logotip vectorial;
- autoria de la foto de l'escala;
- consentiments de dret d'imatge;
- validar el to i la signatura de les respostes i publicar-les.

## 13. Respostes del director i segona tanda de canvis (23/10/2026)

### 13.1 Respostes

| Pregunta (§5.2) | Resposta del director |
|---|---|
| Venda de material al taulell | **No en veneu** |
| Ferralla per a obra | Sense resposta explícita. Es manté «Contractista d'estructures d'acer» |
| Adreça definitiva | **C/ Eugeni d'Ors, 59-61, 08720 Vilafranca del Penedès (Barcelona)** |
| Accessibilitat | **Entrada accessible** per a persones amb discapacitat (planta baixa) |
| Pagaments | **Totes les formes** |
| Aparcament i festius | Sense resposta. Continuen pendents |
| Telèfons | **Fix principal, i mòbil i WhatsApp com a secundaris** |
| Logotip | Fitxer PNG de 1983 × 793 px amb transparència, aportat pel director: el mot «carbó» amb l'ornament, en bordeus. Còpia a `gbp-2026-10-23/logotip/carbo-logotip-original-director.png`. No és vectorial |
| Foto de l'escala amb llenya | **Obra pròpia.** El director també confirma que totes les imatges del web i dels arxius interns són de l'empresa |
| Dret d'imatge | **Teniu tots els consentiments** de les persones que hi surten |
| Respostes a ressenyes | **No es publiquen de moment.** Moltes són de fa anys i s'han de validar amb el client. Els esborranys de §7.5 queden arxivats |

**Límits que es mantenen,** encara que la propietat de les imatges estigui confirmada:
- Les imatges de `assets/imatges-conceptuals/` són generades amb IA. Mostren escenes que no han passat i **no es presenten mai com a obra, taller o equip reals** (encàrrec del 23/10 i `CLAUDE.md`).
- La carpeta `Referencies/` conté captures de webs d'altres empreses, que es van fer servir com a inspiració de disseny. No s'utilitzen.

### 13.2 Canvis aplicats

| Camp | Canvi | Estat (23/10) |
|---|---|---|
| Categories | S'ha tret **«Subministrament de metalls»**: no veneu material. Hauria de reduir les impressions per «ferreteria», que no corresponen a l'activitat | Enviat (pendent de revisió) |
| Telèfons | Principal: 938 90 27 94. **Addicional: 630 66 19 08** | Enviat |
| Xat | **WhatsApp:** `https://wa.me/34630661908`, el mateix número i format que el web | Enviat |
| Accessibilitat | **«Té una entrada accessible en cadira de rodes: Sí»** confirmat per l'empresa. Els altres atributs (aparcament, lavabo…) queden sense contestar | Desat |
| Pagaments | Targetes de crèdit i de dèbit, Mastercard i **VISA** | Enviat |
| Logotip | Substituït per `logotip/gbp-logotip-1080.png`: 1080 × 1080, PNG de 72 KB, el logotip del director centrat sobre blanc. Ocupa el 76 % de l'amplada, perquè el retall circular no talli cap extrem | **Actiu** al panell |

**Pagaments:** el panell només ofereix targetes, sense efectiu ni pagament mòbil. S'han marcat VISA i Mastercard, les xarxes habituals en un TPV. American Express, Diners, JCB, Discover i UnionPay no s'han marcat perquè no consten.

**Logotip anterior:** l'original complet amb «serralleria», el telèfon i el web, a 265 × 265 px. Se'n conserva còpia a `abans/fotos/gbp-logotip.jpg`.

### 13.3 Adreça 59-61: no aplicada al perfil

L'encàrrec original indicava que no es canviés la ubicació del negoci. A més, al Perfil d'Empresa un canvi d'adreça passa per la revisió de Google i en alguns casos demana tornar a verificar la fitxa. Per això queda pendent de confirmació expressa del director, amb aquesta proposta:
1. **Perfil:** canviar només el número, «Carrer d'Eugeni d'Ors, 59» per «Carrer d'Eugeni d'Ors, 59-61», i comprovar que el marcador no es mogui.
2. **Web:**
   - `src/config/site.ts`, a `address`, `postalAddress` i el text de l'enllaç i del mapa;
   - les pàgines que mostren l'adreça;
   - el registre a `CLAUDE.md` i al manual de publicació (P7).
3. **Directoris** (D6): el mateix format a tot arreu.

### 13.4 Segona proposta de fotos

Full de contactes: [`fotos-preparades/proposta-2-full-contactes.jpg`](gbp-2026-10-23/fotos-preparades/proposta-2-full-contactes.jpg). Fitxers a `fotos-preparades/proposta-2/`. Encara no s'han pujat.

| # | Fitxer | Ús al perfil | Resolució | Valoració |
|---|---|---|---|---|
| 1 | `01-equip-taller-gavia.jpg` | Equip treballant i interior del taller (Industrial) | 1200 × 1600 | **Imprescindible:** la millor foto «a la feina». Taller real, peça industrial i samarreta de l'empresa |
| 2 | `02-reparacio-persiana.jpg` | Reparacions i automatismes (Particulars) | 716 × 441 | **Molt recomanada:** operari amb la samarreta de l'empresa treballant en un automatisme. Per sota dels 720 px recomanats, però per sobre del mínim (250) |
| 3 | `03-equip-furgoneta.png` | Equip i vehicles propis | 716 × 441 | **Recomanada:** marca visible i desplaçament a obra. Mateixa limitació de resolució |
| 4 | `05-estructura-ascensor-zenital.jpg` | Particulars (comunitats) | 1200 × 1600 | **Recomanada:** una vista diferent de l'estructura, que ja té una foto al perfil |
| 5 | `06-soldadura-obra-4x3.jpg` | Soldadura i muntatge a obra (Industrial) | 629 × 472 (retall 4:3 de la panoràmica) | **Opcional:** és l'única foto de soldadura en obra. Té menys resolució i un estil diferent de la resta (casc taronja, uniforme) |
| 6 | `04-porta-parquing-operari.jpg` | Portes de pàrquing | 1600 × 1204 | **Opcional:** l'operari queda al marge i en la miniatura quadrada surt tallat |

**No recomanades:**

| Foto | Motiu |
|---|---|
| `soldadura-espurnes.png` | Fosca i amb un efecte dramàtic. Ensenya poc de l'empresa i té poca resolució |
| `porta-parquing-interior-01` | Contrallum molt fort i operari en silueta |
| `persianes-negoci-facana-02` | Hi surt un vianant |
| Trepant sobre fusta, metall incandescent | No representen la feina de serralleria que ofereix el perfil |

**Per a un perfil endreçat i atractiu:**
- **Una foto de cada tipus abans que moltes del mateix:** portada, façana, taller, equip, una o dues per servei.
- **Tota la sèrie amb el mateix estil:** llum de dia, presa horitzontal i sense filtres.
- **Les dues fotos de 716 px:** si en teniu l'original del mòbil, és millor pujar-lo.
- **Fotos noves:** cal fer-ne una sola sessió, en un matí assolellat, amb la llista de §6.4, en aquest ordre:
  1. façana i accés amb el rètol;
  2. nau general;
  3. plegadora, cisalla i punxonadora;
  4. soldadura MIG/TIG amb l'equip;
  5. una peça de mobiliari acabada;
  6. furgonetes i camió ploma davant del taller.
- **Ritme:** pujar-ne 2 o 3 cada mes, millor que totes alhora. Així el perfil es manté actiu i les publicacions setmanals (§8) tenen fotos noves.

### 13.5 Tercera tanda (23/10/2026): adreça i fotos, per indicació del director

**Indicació del director:** canviar l'adreça i pujar les 4 fotos recomanades de §13.4.

| Camp | Canvi | Estat al panell (23/10) | Visible a Maps (23/10) |
|---|---|---|---|
| Adreça | «Carrer d'Eugeni d'Ors, 59» → «**Carrer d'Eugeni d'Ors, 59-61**». Text entrat sense triar cap suggeriment de l'autocompletat, perquè no s'hi aplicés un altre punt | **Aprovat** (sense demanar verificació) | Encara mostra el 59 (propagació). El marcador públic no s'ha mogut: 41.3424819, 1.6916747 |
| Zona de servei | En desar l'adreça, Google també va reenviar la zona de servei; després de l'aprovació va quedar **buida**. S'ha tornat a posar **Alt Penedès**, el valor que hi havia | Enviat | — |
| Categories, telèfons, WhatsApp, pagaments | Els canvis de §13.2 | **Aprovats**: les categories ja no inclouen «Subministrament de metalls»; principal 938 90 27 94, addicional 630 66 19 08; WhatsApp `wa.me/34630661908`; pagaments amb VISA | Pendent de propagació |
| Fotos | Pujades `01-equip-taller-gavia`, `02-reparacio-persiana`, `03-equip-furgoneta` i `05-estructura-ascensor-zenital`. No s'han pujat les opcionals 04 i 06 | En revisió (una encara pendent en acabar) | — |

**Web: adreça 59-61 aplicada (sense commit ni desplegament).**
- `src/config/site.ts`: `address`, `postalAddress`, `mapUrl` i `mapEmbedUrl`. Es reflecteix a Contacte, al peu i a les dades estructurades `LocalBusiness`.
- `content/ca/empresa.md`: pàgina retirada i conservada com a referència. Canvi registrat a `scripts/check-references.mjs`.
- `CLAUDE.md`, `CONTEXT-serralleria-carbo.md` i el manual de publicació: la porta P7 queda feta, excepte els directoris (D6).
- **Comprovacions:**
  - `npm run check`: 0 errors;
  - `npm run build`: 39 pàgines; tota l'adreça de la sortida és 59-61;
  - `check:references` i `check:links`: correctes;
  - Contacte i JSON-LD revisats a la previsualització local.

**Pendent:**
- comprovar a Maps, a partir del 26/10, que l'adreça pública és la 59-61 i que la zona de servei torna a sortir;
- unificar l'adreça als directoris (D6): QDQ, Infonif, eInforma, Empresite i Comga;
- desplegar el web a `revisio-client` quan ho autoritzi el director.
