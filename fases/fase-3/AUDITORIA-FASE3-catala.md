# Auditoria editorial — Fase 3 (català) · Serralleria Carbó

**Projecte:** SC-2026-01 · **Data:** 23/09/2026 · **Abast:** textos catalans de `content/ca/` (incloses les sis fitxes de `content/ca/projects/`), metadades i coherència amb `CONTEXT-serralleria-carbo.md`, `FASE1-arquitectura-serralleria-carbo.md`, `DESIGN.md`, `FASE2-marca-disseny.md`, `FASE3-revisio.md`, `FASE3-resum-client-whatsapp.md`, `SEO-F3.md` i `Mapa-redireccions-serralleriacarbo.xlsx`.
**Mètode:** lectura completa, recompte de repeticions i longitud de metadades, i execució de `scripts/check_fase3.py` (resultat: 19 pàgines, 6 projectes, 3 legals bloquejades, 0 incidències estructurals). L'auditoria es va fer en mode només lectura.

---

## 0. Instruccions per a la IA que apliqui aquesta auditoria

1. **No canviïs l'arquitectura.** El sitemap i els user journeys de la Fase 1 i la identitat de la Fase 2 estan validats. No creïs rutes, pàgines de detall ni categories noves.
2. **No inventis dades.** Només es poden fer servir els fets de `CONTEXT-serralleria-carbo.md` §2.4 i les fonts citades a `FASE3-revisio.md`. Tot el que depèn d'una decisió de la secció 7 queda en espera fins que el director de projecte la resolgui.
3. **Fets fixos:**
   - Taller: **950 m²** (mai 900).
   - Telèfon principal: **630 661 908** amb WhatsApp. A Urgències també hi ha d'haver **trucada directa**. El fix 93 890 27 94 queda com a secundari.
   - **ISO 9001 en implantació** i **ISO 3834 en estudi**. Mai s'han de presentar com a certificacions obtingudes.
   - Els projectes amb requisits d'arquitectura tècnica **es poden valorar**, però no s'ha de presentar aquest suport com un departament o una persona interns.
   - Missatge industrial aprovat, sense modificar: **«Sèries curtes. Peces exigents. Resposta industrial.»**
4. **Respecta els pendents.** No omplis aquests buits: marques de motors, alumini, exemples de mobiliari, fotografies originals, avís legal i privacitat, dades de Search Console i Analytics. La política de cookies continua sent un esborrany no publicable (`publishReady: false`).
5. **Aplica els canvis per prioritat:** primer els crítics, després els importants i al final les millores. Fes canvis concrets; no reescriguis pàgines senceres si no cal.
6. **Distingeix text visible de metadades.** `#` és l'H1 visible, `##` són seccions visibles, i `seoTitle` i `seoDescription` són metadades.
7. **To de cada branca:**
   - **Particulars:** proper, serè i professional. Ha de transmetre trajectòria, ofici i feina concreta, sense paternalisme ni generalitats.
   - **Carbó Industrial:** tècnic, directe i rigorós, sense superlatius ni capacitats no documentades.
8. En acabar, torna a executar `scripts/check_fase3.py`, verifica que no hi hagi cap «900 m²» i llista els canvis fets per fitxer.

---

## 1. Veredicte general

**Cal una altra passada editorial, curta i centrada en uns quants punts. No cal reescriure-ho tot.**

Els fets estan ben controlats:

- A tot el web surten 950 m². Les coincidències amb «900» són totes de «ISO 9001».
- La ISO 9001 surt com a norma en implantació i la ISO 3834 com a norma en estudi.
- El 630 661 908 és el número principal i el fix queda com a secundari.
- El suport d'arquitectura tècnica no es presenta com un departament intern.
- Els textos legals estan bloquejats.

El problema és de to. Les obertures de la Home i de Particulars són justament el que el client ja havia comentat, i encara es llegeixen com un inventari. A més:

- La pàgina d'Urgències no respon a la intenció que li assigna SEO-F3.
- Hi ha fórmules repetides per tot el web: «equip propi» surt 11 vegades, «taller propi» 4, «des de 1989» 5 i «segons el projecte/cada/la peça» 6.
- A les pàgines industrials hi ha més reserves que dades.

Amb els tres canvis crítics i uns deu d'importants, es pot presentar al client.

---

## 2. Fortaleses (cal conservar-les)

1. **Traçabilitat.** Cada dada té una font a `FASE3-revisio.md`. S'ha retirat la frase de la porta de pàrquing sobre l'adequació a la normativa. La fitxa de la gàbia no inclou cap càrrega quantificada.
2. **Missatge industrial intacte.** És l'H1 de `/industrial/`, i l'H1 de Sèries curtes («Sèries curtes per a peces exigents») el reprèn sense desgastar-lo.
3. **Rigor a Sectors.** La frase «Aquesta llista indica experiència sectorial. No substitueix la revisió de les especificacions, homologacions…» és el to que es demana per a Industrial. No s'ha de tocar.
4. **Cada tipus de consulta demana el que li cal.** Particulars demana foto i mides, i Empresa demana plànol, unitats i termini. Això encaixa amb els recorreguts 3.2 i 3.3 de la Fase 1.
5. **Metadades ben dimensionades.** Tots els `seoTitle` tenen entre 37 i 59 caràcters i totes les `seoDescription` entre 96 i 148. No hi ha paraules clau farcides. Totes les pàgines d'Industrial acaben amb «| Carbó Industrial».

---

## 3. Problemes prioritzats

### 3.1 Crítics

| # | Fitxer · secció | Fragment actual | Motiu | Proposta |
|---|---|---|---|---|
| C1 | `content/ca/home.md` · H1, introducció i les dues targetes (l. 10–26) | «Tria l'àmbit que necessites i coneix què fem en cada cas.» / «Materials, processos i dades del taller per valorar un encàrrec amb criteri tècnic.» | Va ser el comentari del client. La introducció fa de guia d'ús de la web en lloc d'explicar l'empresa. La targeta industrial és una frase sense verb. No hi ha telèfon per a qui entra amb una avaria. | Substituir pel **fragment 1** (secció 5). |
| C2 | `content/ca/particulars.md` · H1 i introducció (l. 10–12) | «Des de 1989, a Serralleria Carbó treballem el ferro i l'acer inoxidable… Fabriquem… instal·lem… atenem… Som a Vilafranca…» | Són tres frases que enumeren serveis, sense cap feina concreta. És la queixa del client, i repeteix la fórmula de la Home. | Substituir pel **fragment 2**. |
| C3 | `content/ca/particulars-urgencies.md` · H1, introducció i «Contacta directament» (l. 12–23) | «Reparacions i incidències de serralleria» / «Una porta que no funciona o un automatisme avariat pot interrompre l'ús normal…» / dos «Si prefereixes…» seguits | L'H1 no coincideix amb el `seoTitle` («Reparació de portes a Vilafranca»). «Incidències de serralleria» atrau cerques d'obertura de panys, que SEO-F3 exclou. El número surt tres vegades en sis línies, i el fix té el mateix pes que la trucada. | Substituir pel **fragment 3**: dos botons (primer «Truca al 630 661 908», després «Escriu-nos per WhatsApp») i el fix només al bloc de dades. |

### 3.2 Importants

| # | Fitxer · secció | Fragment actual | Motiu | Proposta |
|---|---|---|---|---|
| I1 | `home.md` · «Què necessites fer?» (l. 45–49) | «[Veure serveis per a particulars](/particulars/) · [Veure capacitats industrials](/industrial/capacitats/)» i el paràgraf previ | Repeteix el paper de les dues targetes: `/particulars/` s'enllaça tres vegades a la Home. | Substituir el paràgraf per enllaços profunds: `[Reparació de portes](/particulars/urgencies/) · [Baranes i estructures](/particulars/estructures/) · [Automatismes](/particulars/automatismes/) · [Mobiliari a mida](/particulars/mobiliari/) · [Capacitats industrials](/industrial/capacitats/)`. |
| I2 | `empresa.md` · H1 (l. 10) | «Serralleria Carbó. Taller propi des de 1989» | Té el mateix patró que l'H1 de la Home, i totes dues pàgines competeixen per la marca. | «Qui som: un taller de Vilafranca des de 1989» |
| I3 | `empresa.md` · «Persones, taller i maquinària» (l. 14–18) | «Les dimensions, els materials i les condicions de cada encàrrec es valoren segons el projecte.» | El títol promet parlar de persones i només dona una xifra. La frase final no té relació amb la flota. La trajectòria es resol en una sola frase. | Retitular «Taller i maquinària» i eliminar la frase. No afegir història fins que el client aporti material (decisió D9). |
| I4 | `empresa.md` l. 16 | «Treballem amb ferro, acer al carboni i inoxidable» | Presenta ferro i acer al carboni com a materials diferents, cosa que no quadra amb les pàgines d'Industrial. | «Treballem el ferro (acer al carboni) i l'acer inoxidable, inclosos els graus 304 i 316.» |
| I5 | `industrial.md` · introducció (l. 12) | «Treballem amb fabricants, enginyeries i integradors que necessiten valorar una peça…» | Suggereix una cartera de clients consolidada amb aquests perfils, quan només hi ha un cas documentat. La subordinada fa que sigui el client qui «valora». | **Fragment 4**. |
| I6 | `industrial.md` · «Comprova l'encaix del taller» (l. 16–18) | «Consulta les capacitats abans de preparar la teva sol·licitud.» + arquitectura tècnica + ISO en un mateix bloc | L'imperatiu queda instructiu davant d'un professional, i el bloc barreja tres temes. | Separar el bloc en «Comprova l'encaix del taller» i «Requisits tècnics i qualitat» (**fragment 4**). |
| I7 | `industrial-capacitats.md` · introducció, Maquinària, Soldadura i Muntatge i logística | «Abans d'enviar un plànol, necessites saber amb què treballa el taller.» / «…es valoren cas per cas» (quatre reserves a la pàgina) | Segons el recorregut 3.3, l'usuari hi entra per saber «si el taller pot amb el gruix, el material i el volum», i la pàgina no ho pot dir. Aquestes dades no són a la llista de pendents. | Introducció: «Materials, processos i maquinària del taller de Carbó Industrial. Els gruixos, les mides i les toleràncies de cada peça es revisen amb el plànol.» Eliminar les reserves de Maquinària, Soldadura i Logística. No afegir xifres de màquina fins a la decisió D4. |
| I8 | Tot el web | «equip propi» (11), «taller propi» (4), «des de 1989» (5), «segons el projecte/cada/la peça» (6) | La fórmula repetida fa el text genèric. | Com a màxim un «equip propi» o «taller propi» per pàgina. Treure «des de 1989» de `particulars.md` (introducció i `seoDescription`). Substituir les reserves genèriques pel pas següent concret. |
| I9 | `particulars-estructures.md` l. 22 · `particulars-automatismes.md` l. 24 | «[Veure projectes d'estructures](/particulars/projectes/)» | L'etiqueta promet un filtre que no existeix. La Fase 1 el demana «si és possible». | Canviar l'etiqueta per «Veure els projectes», o bé deixar anotat per a la Fase 5 un ancoratge o filtre per categoria. |
| I10 | `particulars-projectes.md` · final | Només enllaça a `/contacte/` | Qui hi entra des de Google buscant idees no té cap camí cap al servei, excepte el menú. | Afegir «Consulta també: [Estructures](/particulars/estructures/) · [Automatismes](/particulars/automatismes/)» i, al renderitzar, enllaçar cada fitxa a la pàgina de la seva categoria. |
| I11 | `particulars.md` l. 48 | «Disposem de taller de fabricació, equip propi i vehicles per a la instal·lació i el desplaçament, que valorem segons cada feina.» | La subordinada s'enganxa a «vehicles». | «Tenim taller i vehicles propis per instal·lar. Els desplaçaments fora de la zona habitual els valorem en cada cas.» |
| I12 | `contacte.md` l. 38 | «El gruix dels treballs per a particulars…» | En una web de metall, «gruix» es llegeix com a gruix de xapa. | «La major part dels treballs per a particulars…» |
| I13 | `Mapa-redireccions-serralleriacarbo.xlsx` · pestanyes Redireccions, Notes i Projectes reals | `/estructuras/` → «/particulars/ o /industrial/ (revisar contingut)»; `/motores/` → `/particulars/automatismes/`; `/legal/` → `/legal/`. Notes: «Mobiliari… encaixa amb el projecte 'Gàbia'». Categories: Porta pàrquing = Urgència, Persianes = Estructures, Gàbia = Mobiliari. La fila de la gàbia té les columnes desplaçades. | El full és la font de les redireccions 301 i contradiu SEO-F3 i les fitxes de `content/ca/projects/`. | Actualitzar-lo segons SEO-F3: `/estructuras/` → versió ES de `/particulars/estructures/`; `/motores/` → versió ES de `/particulars/automatismes/`; `/legal/` → `/legal/cookies/` quan es publiqui. Registrar la reclassificació de categories **només després** de la decisió D7. |

### 3.3 Millores

| # | Fitxer · secció | Fragment actual | Motiu | Proposta |
|---|---|---|---|---|
| M1 | `home.md` · «Serralleria Carbó, en xifres» (l. 28–33) | «Fundació al desembre» / «6 furgonetes i 1 camió ploma» | El mes no aporta res en una xifra destacada. La xifra doble trenca el ritme a 320 px. Falta una frase que expliqui per què importen les xifres. | **Fragment 5**. Integrar-hi la frase pont de «Del taller a cada projecte» i reduir aquella secció al paràgraf d'àmbit geogràfic. |
| M2 | `particulars-automatismes.md` · «Quina porta tens?» i «Si el problema és ara» | No s'esmenten tipus de porta; «contacta directament» sense número | La landing antiga de `/motores/`, que és la versió ES d'aquesta pàgina, llistava portes enrotllables, batents, de guillotina, basculants i corredisses. | Si el client ho confirma (D10): «Treballem amb portes enrotllables, batents, basculants, corredisses i de guillotina.» Mai «tot tipus de portes». Afegir «Truca al 630 661 908» a «Si el problema és ara». |
| M3 | `particulars-automatismes.md` l. 22 | «Hem fabricat, instal·lat i motoritzat… També vam fabricar…» | Dos temps verbals diferents en dues frases seguides. | Unificar en perfet: «També hem fabricat, instal·lat i motoritzat…» |
| M4 | `particulars.md` · targetes Automatismes i Mobiliari (l. 30, 36) | «Instal·lació i reparació d'automatismes…» / «Mobiliari amb estructura metàl·lica a mida…» | Barregen frases sense verb amb les frases amb verb de les altres targetes. «Segons el projecte» és farciment. | «Instal·lem i reparem automatismes per a portes de garatge, persianes i altres accessos, i motoritzem portes noves o existents.» / «Fabriquem mobiliari amb estructura metàl·lica, a mida de l'ús i de l'espai.» |
| M5 | `particulars.md` · CTA final (l. 54) | «Anar a contacte» | L'etiqueta és funcional, no una invitació. | «Explica'ns la feina». Afegir a sota: «o escriu-nos per WhatsApp al 630 661 908». |
| M6 | `industrial-proces.md` · H1 i «Fabriquem» | «Un procés de treball clar» / «L'equip propi duu a terme les feines de soldadura i muntatge acordades.» | L'H1 s'autoavalua. «Fabriquem» és la fase més pobra. | H1: «Procés de fabricació: definim, preparem, fabriquem, comprovem». «Fabriquem»: «Tallem, punxonem, pleguem, soldem (MIG/MAG o TIG) i muntem al taller, d'acord amb el que s'ha definit.» Es dedueix de la maquinària declarada. |
| M7 | `industrial-projectes.md` l. 15 | «Presentem els treballs que podem documentar amb dades i imatges reals.» | Sona defensiu i subratlla l'escassetat. | «Casos de fabricació per a tercers, amb dades i imatges reals.» |
| M8 | `projects/gavia-industrial.md` | «El material i la soldadura es van triar per a l'ús previst.» | La frase és vaga, i la font diu una cosa més concreta. | «Fabricació i subministrament de deu gàbies per a un client industrial, preparades per suportar molt de pes gràcies al material i a la soldadura.» Font: Projectes reals, fila 3. Sense xifres de càrrega. |
| M9 | `projects/passarella-interior.md` | «La feina es va soldar i pintar al mateix recinte.» | «Recinte» és un calc; la font vol dir «a l'obra». | «Tot es va soldar i pintar a la mateixa obra.» |
| M10 | `projects/baranes-interior-casa.md` | S'ha perdut el context de la font | La font diu que va ser «un de quatre projectes realitzats en aquesta reforma». | Afegir: «Va ser una de les quatre feines que vam fer en aquesta reforma.» |
| M11 | `particulars.md` · `seoTitle` | «Serralleria per a particulars \| Serralleria Carbó» | Repeteix «Serralleria» i no diu on. | «Serralleria per a particulars a Vilafranca \| Serralleria Carbó» (62 caràcters, al límit). |
| M12 | `industrial.md` · `seoDescription` | «Sèries curtes i peces exigents: acer al carboni, inox 304/316…» | No respon la intenció de SEO-F3 («fabricació metàl·lica per a tercers») ni diu on. | «Fabricació metàl·lica per a tercers a Vilafranca del Penedès: sèries curtes en acer al carboni i inox 304/316, soldadura MIG/MAG i TIG.» |
| M13 | `industrial-sectors.md` · `seoDescription` | «Carbó Industrial té experiència en…» | El cos de la pàgina atribueix aquesta experiència a Serralleria Carbó. | «L'experiència de Serralleria Carbó inclou alimentació, sanitari, packaging, cellers, seguretat i defensa, i tecnologies duals.» (subjecte a D5) |
| M14 | Tot el web | «persianes de negoci» (Home, `seoDescription` de Projectes) / «persianes motoritzades» (Particulars, introducció de Projectes) | El mateix cas té noms diferents. | Unificar: «persianes motoritzades d'un negoci». |
| M15 | `particulars-projectes.md` · introducció | Llista dels cinc casos per quarta vegada al web | Repetició. | «Feines fetes per a habitatges, comunitats i negocis. Cada cas mostra el treball acabat i el lloc on es va instal·lar.» |
| M16 | `contacte.md` l. 16 | «Si prefereixes trucar, aquest mateix número també és la via directa.» | Circumloqució. | «També pots trucar-hi directament.» |
| M17 | `ui.md` · Estats del formulari | «Hem rebut la teva consulta.» | El missatge no diu què passarà ara. | «Hem rebut la teva consulta. La revisarem i et respondrem per telèfon o correu electrònic.» (sense termini) |
| M18 | `legal-cookies.md` · «Per a què es poden utilitzar?» | «La política de la web anterior agrupava les cookies en quatre categories.» | És una referència interna que el visitant no entendrà. | Treure-la quan es completi l'inventari real. La pàgina continua sense ser publicable. |
| M19 | `FASE3-resum-client-whatsapp.md` | «Et passo…» → «tingueu», «instal·leu» | El missatge passa de «tu» a «vosaltres» i no demana algunes dades clau. | Tractar-los de «vosaltres» a tot el missatge («Us passo…») i afegir les peticions de D4, D5 i D6. |

---

## 4. Valoració per blocs

### Home
Les dues entrades estan equilibrades i el paràgraf «Aquesta base permet atendre tant una barana per a un habitatge com una sèrie curta per a un fabricant» és el millor de tot el web: connecta les dues branques en una sola frase. **S'ha de conservar.** En canvi, l'obertura no explica l'empresa, «Què necessites fer?» repeteix el que ja fan les targetes i no hi ha cap camí directe per a qui té una urgència.

El bloc de xifres **sí que ajuda**: 950 m² i 12 persones donen escala a totes dues branques, i la flota fa creïble la instal·lació per a particulars. Cal refer les etiquetes i afegir-hi una frase que expliqui per què són rellevants (M1).

### Particulars (portada de la branca)
L'estructura és correcta: Urgències va primer, tal com demana el recorregut 3.1. El to és neutre, però no és proper. Les targetes barregen frases amb verb i sense, i el botó final és una etiqueta funcional. A més, la branca s'anomena «Particulars» però parla de «comunitats i negocis» (decisió D2).

### Empresa
Tot el que diu és correcte, però és un duplicat ampliat de la Home. Hi falta la trajectòria, que és una de les funcions que li assigna el sitemap («qui som, taller, equip, trajectòria»). Aquest buit no es pot omplir sense material del client.

### Industrial (portada i subpàgines)
El registre és l'adequat i el missatge aprovat es manté. Els problemes de la portada són la cartera de clients implícita, les instruccions al lector i el bloc barrejat. Per subpàgines:

- **Sectors:** és honesta, però prima (subjecta a D5).
- **Capacitats:** té més reserves que dades (I7, D4).
- **Sèries curtes:** no defineix què és una sèrie curta per a Carbó, per exemple un rang d'unitats (D4).
- **Procés:** és la subpàgina més prima i no diu qui serà l'interlocutor, que és una de les coses que busca l'usuari del recorregut 3.3 (M6, D8).
- **Projectes:** la introducció sona defensiva (M7).

En tot el recorregut industrial, el contacte de Jordi Mas només apareix a `/contacte/`. Qui entra des de Google directament a `/industrial/capacitats/` amb el mòbil necessita dos passos per arribar a un contacte tècnic (D8).

### Serveis de particulars
- **Estructures:** la més ben resolta. Només cal reduir «equip propi» i corregir l'etiqueta de l'enllaç (I9).
- **Automatismes:** hauria de recuperar els tipus de porta de la landing antiga, que a més és la mateixa pàgina que rebrà la redirecció 301 de `/motores/` (M2).
- **Mobiliari:** té poc contingut i acaba remetent a Estructures, cosa que evidencia el buit (D7).
- **Urgències:** crítica (C3).

### Projectes (pàgines i fitxes)
El repartiment de cinc casos a Particulars i un a Industrial és correcte, i l'any de cada cas hi consta. Les fitxes són massa seques i han perdut detalls de la font que es poden fer servir (M8–M10). La introducció de Particulars repeteix la llista de casos (M15). Les categories no coincideixen amb el full de càlcul (I13, D7).

### Contacte, UI, 404 i legals
Contacte distingeix bé les dues vies i les dades són correctes; només calen els ajustos I12 i M16. `ui.md` és coherent amb la Fase 1 (M17). La 404 és correcta. Els textos legals estan ben bloquejats (M18).

### Recorregut i enllaços (mòbil i entrada des de Google)
- Totes les pàgines acaben en `/contacte/`. És correcte.
- Hi ha dos camins sense sortida: Projectes de Particulars (I10) i l'entrada per urgència des de la Home (C1).
- **Nota per a la Fase 5 (no és un canvi de text):** els enllaços de `/industrial/*` cap a `/contacte/` han de preseleccionar «Empresa», com demana el recorregut 3.3 de la Fase 1.

---

## 5. Fragments reescrits (to recomanat)

### Fragment 1 — Home: obertura i dues entrades (substitueix `home.md` l. 10–26)

```markdown
# Serralleria Carbó, a Vilafranca del Penedès des de 1989

Fabriquem i instal·lem baranes, estructures, portes i automatismes per a cases, comunitats i negocis. Del mateix taller surt Carbó Industrial, la nostra línia de fabricació metàl·lica per a altres empreses.

## Particulars

Baranes, escales, portes, automatismes i mobiliari a mida, fets al nostre taller i instal·lats pel nostre equip. Si tens una avaria, truca'ns o escriu-nos al 630 661 908.

[Serveis per a particulars](/particulars/)

## Carbó Industrial

Sèries curtes. Peces exigents. Resposta industrial.

Fabricació per a tercers en acer al carboni i inox 304/316, amb soldadura MIG/MAG i TIG.

[Entra a Carbó Industrial](/industrial/)
```

### Fragment 2 — Particulars: obertura (substitueix `particulars.md` l. 10–12)

```markdown
# Serralleria per a particulars a Vilafranca i rodalia

Unes baranes per a una reforma, la passarel·la interior d'una casa, l'estructura de l'ascensor d'una comunitat, la porta motoritzada d'un pàrquing. Són feines que hem fet i que pots veure a Projectes. Les fabriquem al nostre taller i les instal·la el nostre equip.

Explica'ns què necessites, sigui una reparació o un projecte nou, i ho valorem amb tu. Si és una avaria, truca al 630 661 908.
```

### Fragment 3 — Urgències: obertura (substitueix `particulars-urgencies.md` l. 12–25)

```markdown
# Reparació de portes i automatismes

Si una porta, una persiana o un motor ha deixat de funcionar, truca'ns i explica'ns què ha passat i on és la instal·lació. Treballem sobretot a Vilafranca del Penedès i la rodalia.

[Truca al 630 661 908](tel:+34630661908) · [Escriu-nos per WhatsApp](#whatsapp)

Si t'estimes més escriure, envia'ns pel formulari el tipus de porta, què ha deixat de funcionar i, si pots, una fotografia.

[Explicar la incidència al formulari](/contacte/)
```
*El fix 93 890 27 94 es manté al bloc de dades generals, no com a acció principal. L'enllaç de WhatsApp s'implementarà a la Fase 5 amb el missatge de `ui.md`.*

### Fragment 4 — Industrial: introducció i blocs de capacitats i qualitat (substitueix `industrial.md` l. 12–20)

```markdown
Carbó Industrial és la línia de fabricació per a tercers de Serralleria Carbó. Fabriquem peces i conjunts metàl·lics en sèries curtes per a fabricants, enginyeries i integradors.

## Comprova l'encaix del taller

Taller de 950 m² amb plegadora, cisalla i punxonadora. Acer al carboni i inox 304/316. Soldadura MIG/MAG i TIG, i muntatge amb equip propi.

[Veure capacitats](/industrial/capacitats/)

## Requisits tècnics i qualitat

Valorem projectes que requereixen suport d'arquitectura tècnica. Estem implantant l'ISO 9001 i estudiem l'ISO 3834.
```
*El terme «arquitectura tècnica» està pendent de la decisió D3.*

### Fragment 5 — Home: bloc de xifres (substitueix `home.md` l. 28–39)

```markdown
## El taller, en xifres

- **1989** · Any de fundació
- **950 m²** · Taller de fabricació a Vilafranca
- **12 persones** · Plantilla
- **6 + 1** · Furgonetes i camió ploma per a muntatges i transport

El mateix taller treballa una barana per a un habitatge i una sèrie curta per a un fabricant.
```
*A continuació, «Del taller a cada projecte» queda reduït al paràgraf d'àmbit geogràfic (l. 41) i l'enllaç a `/empresa/`.*

---

## 6. Ordre d'aplicació recomanat

1. C1, C2 i C3 (fragments 1, 2 i 3).
2. I1–I12 (textos visibles i metadades), I8 aplicat a tots els fitxers.
3. M1–M17.
4. I13 i M18–M19 només si el director de projecte ho autoritza, perquè afecten el full de càlcul, la política de cookies i el missatge al client.
5. Tornar a executar `scripts/check_fase3.py` i comprovar a mà: cap «900 m²», cap ISO presentada com a obtinguda, 630 661 908 com a principal i trucada directa a Urgències.

---

## 7. Decisions pendents (no les resolguis tu: consulta el director de projecte o el client)

| ID | Decisió | Afecta |
|---|---|---|
| D1 | Mantenir el tractament de «tu» a tota la web, Industrial inclosa, o fer servir «vosaltres» en el B2B. La web antiga feia servir «vostè». | Totes les pàgines, `ui.md`, traduccions |
| D2 | Abast i nom de «Particulars»: confirmar que inclou comunitats i negocis (el cas de les persianes és d'un negoci). | `particulars*.md`, Home |
| D3 | Terme «suport d'arquitectura tècnica» a Industrial: confirmar si és el correcte o si cal dir «enginyeria» o «oficina tècnica». | `industrial.md`, `industrial-capacitats.md` |
| D4 | Dades de maquinària (gruix màxim de tall i plegat, longitud de plegadora, mida o pes màxim de conjunt) i què es considera «sèrie curta» (rang d'unitats). | `industrial-capacitats.md`, `industrial-series-curtes.md` |
| D5 | Permís explícit per publicar els sectors «seguretat i defensa» i «tecnologies duals». | `industrial-sectors.md`, `industrial.md` |
| D6 | Urgències: tipus d'incidència que s'atenen (panys sí o no) i horaris. | `particulars-urgencies.md`, SEO |
| D7 | Categories dels projectes respecte del full de càlcul (porta de pàrquing, persianes, gàbia), i si Mobiliari es publica indexable sense exemples. | `content/ca/projects/`, `particulars-mobiliari.md`, full de càlcul |
| D8 | Contacte a les pàgines d'Industrial: mostrar directament Jordi Mas (605 779 694) i quin número porta la capçalera de la branca industrial, el 630 amb WhatsApp o el 605. Qui és l'interlocutor tècnic que es pot esmentar a Procés. | `industrial*.md`, `ui.md` |
| D9 | Material d'història per a Empresa (origen, fites), només si el client l'aporta. | `empresa.md` |
| D10 | Confirmar si els tipus de porta de la landing antiga de `/motores/` continuen sent vigents. | `particulars-automatismes.md` |

---

*Auditoria editorial de la Fase 3 · SC-2026-01 · 23/09/2026. Fitxers auditats: 23 de `content/ca/` (inclosos els 6 de `projects/`) i 4 pestanyes del full de càlcul.*
