# Fase 5 · Revisió editorial: pàgina publicada vs `content/ca/`

**Data:** 30/09/2026 · **Estat:** decidit i aplicat el 30/09/2026 · Bloc 5 del [pla d'afinament](FASE5-pla-millora-integral.md)

## Decisions i aplicació (30/09/2026)

Decisions del director:

- **G1–G4:** A.
- **U2:** horari confirmat; és el mateix a Urgències, a Particulars i a Contacte.
- **I4:** «Robotització» passa a «Automatització · Digitalització i automatització de la soldadura en curs».
- **C4:** confirmat. La frase de les toleràncies ja és a l'entrada d'`industrial-capacitats.md`.
- **E3 i A4:** A. Les galeries es mostren sense titular i l'H2 queda al contingut amb un comentari.
- **H3:** eliminada.

Aplicat:

- **Contingut.** `content/ca/` s'ha actualitzat en 10 fitxers: `home`, `particulars` i els quatre serveis, `particulars-projectes`, `industrial`, `industrial-capacitats` i `contacte`. `empresa.md` no canvia.
- **Plantilles.** Llegeixen del contingut:
  - la fitxa de cada servei: entrada, tres dades «**títol** · text» i nota opcional;
  - els passos del mètode d'Industrial, en un apartat H3;
  - les etiquetes de les xifres de la Home;
  - els enllaços visibles: «Veure serveis», «Veure els cinc treballs», «Formulari de contacte», «Consulta la fitxa de capacitats», «Formulari de consulta tècnica», «Envia una consulta tècnica» i els de les galeries.
- **Comprovació dels titulars.** Els titulars es continuen repartint en línies a `i18n/ui.ts`, i el build comprova que diguin el mateix que l'H2 del contingut (`sameText` a `src/lib/markdown.ts`).
- **Textos de maqueta (G3).** Queden validats a `i18n/ui.ts` com a textos d'interfície; cada text viu en un sol lloc.
- **Correccions sobre aquesta llista:**
  - **K3:** els H2 «Si ets particular» i «Si contactes com a empresa» sí que es mostren, com a títol accessible de cada grup del formulari. No canvien.
  - **A5:** «Si el problema és ara» es mostra com a títol de la franja d'avaries.
  - **K2:** no hi havia titular de formulari al contingut, i «Explica'ns el projecte» és un text d'interfície (G3).
- **Enllaços del portafoli:** passen a «Estructures» i «Automatismes». Es mostren en majúscules, com abans.
- **Referències.** La revisió queda registrada a `scripts/check-references.mjs` (`VALIDATED_REVISIONS`): qualsevol altre canvi de text continua fent fallar `check:references`.
- **Resultat de la comparació.** Només queden diferències de format: llistes mostrades com a fitxes o passos, titulars repartits en línies sense punt, dades mostrades com a esquemes, comptadors o plaques, i files d'enllaços mostrades com a botons separats.

## Per a què serveix

Abans d'aprovar cap pàgina, el text que es veu i el de `content/ca/` han de dir el mateix. Ara no ho fan, per tres motius:

- les plantilles usen titulars i etiquetes de les maquetes de Fase 4, guardats a `src/i18n/ui.ts`;
- algunes indicacions teves han tret o substituït paràgrafs del contingut;
- hi ha textos d'interfície que no surten de cap contingut validat.

Aquesta llista recull totes les diferències de les 11 rutes construïdes.

**Com s'ha fet.** S'ha comparat automàticament el text visible de cada pàgina del build amb els blocs del seu fitxer de contingut (script al scratchpad de la sessió). Després s'han revisat els resultats a mà: s'han descartat els falsos positius (espais entre enllaços, xifres animades, llistes mostrades en targetes) i s'han contrastat amb les decisions ja registrades a [FASE5-pendents.md](FASE5-pendents.md). `seoTitle` i `seoDescription` coincideixen a totes les rutes.

**Com decidir.** Cada punt té un codi. Per a cada un, n'hi ha prou amb una lletra:

- **A · Mana la pàgina:** es manté el que es veu i s'actualitza `content/ca/`.
- **B · Mana el contingut:** la pàgina torna a mostrar el text de `content/ca/`.
- **C · Un altre text:** l'escrius tu.

La columna «Proposta» és la meva recomanació. Si una decisió general (G) et serveix, cobreix tots els punts que hi remeten.

## Decisions generals

| Codi | Tema | Situació | Proposta |
|---|---|---|---|
| **G1** | **Titulars de secció (H2)** | Gairebé totes les pàgines mostren el titular de la maqueta («Fets, no només paraules», «Experiència en cinc sectors»…). L'H2 de `content/ca/` («Treballs reals», «Per a quins sectors treballem»…) no es veu. | **A.** Els titulars de la maqueta estan validats a Fase 4, i els d'aquesta llista són descriptius i contenen el tema de la secció. Es passen a `content/ca/`. Excepció a revisar: les seccions on el titular antic tenia més valor de cerca, marcades amb ⚑. |
| **G2** | **Línies d'enllaços dels fitxers** («Veure projectes», «Veure capacitats»…) | A la pàgina, els enllaços surten com a botons o targetes amb l'etiqueta de la maqueta, o no surten si porten a una ruta ajornada. | **A.** El contingut ha de reflectir els enllaços que realment es mostren. Els que apunten a les interiors d'Industrial ajornades es conserven als esborranys d'aquelles rutes. |
| **G3** | **Textos que només existeixen a `ui.ts`** | Frases de maqueta o d'interfície noves que no són a cap fitxer de contingut. Les marcades amb ⚠ contenen una afirmació sobre l'empresa. | Validar-les una per una (punts marcats amb **G3**). Les que aprovis passen al fitxer de contingut de la ruta perquè hi hagi una sola font. |
| **G4** | **Paràgrafs retirats per indicació teva** | Paràgrafs de contingut que ja no es mostren perquè ho vas demanar (entrada de Particulars, lead de xifres de la Home…). | **A.** S'eliminen de `content/ca/`, o es mouen a un comentari si els vols conservar com a reserva. |

## Home · `/` · `home.md`

| Codi | Què es veu | Què diu `home.md` | Proposta |
|---|---|---|---|
| H1 | Camí Particulars: «Baranes, escales, portes, automatismes i mobiliari a mida. També atenem reparacions.» | «Portes i motors, baranes i estructures, carros industrials i mobiliari a mida. Fabriquem i instal·lem al taller; també atenem reparacions…» | **A**. És el text de la maqueta, per indicació teva del 27/09. |
| H2 | Camí Industrial: només l'eslògan «Sèries curtes. Peces exigents. Resposta industrial.» | Afegeix «Fabriquem peces, carros i conjunts en acer al carboni i inox 304/316, amb soldadura MIG/MAG i TIG…» | **A**. El detall ja és a la portada d'Industrial i a Capacitats. |
| H3 | No es mostra | «Si tens una avaria en una porta o un automatisme, consulta reparacions i contacte directe.» | **A**, eliminar. La rajola «Portes i motors» i la franja d'avaries de Particulars ja porten a reparacions. Alternativa **B**: una línia petita sota el doble accés. |
| H4 | «Fets que ens defineixen» | «El taller, en xifres» | G1 (**A**). |
| H5 | Etiqueta de xifra: «Persones a la plantilla» | «12 persones · Plantilla» | **A**. |
| H6 | Paràgraf sota el titular de xifres: retirat el 29/09 | «Aquesta capacitat de taller i desplaçament ens permet treballar tant en una barana…» | G4 (**A**). |
| H7 | «Tria el teu camí» · «Per a casa, comunitats i negocis» · «Empreses · construcció · producció» · «Veure serveis» | No hi són | G3. Són etiquetes de la maqueta. |
| H8 | Detalls de les rajoles de serveis: «Fabricació, motorització i reparació», «Escales i passarel·les», «Fabricació unitària o en sèrie», «Ferro i inoxidable», «Peces úniques, carros i sèries · Acer i inoxidable» | No hi són | G3 ⚠. Cal confirmar sobretot «Fabricació unitària o en sèrie» (carros per a particulars) i «Ferro i inoxidable» (mobiliari). |

## Particulars · `/particulars/` · `particulars.md`

| Codi | Què es veu | Què diu `particulars.md` | Proposta |
|---|---|---|---|
| P1 | Entrada: només el titular | Segon paràgraf d'entrada: «Si tens una avaria o un projecte nou, explica'ns què necessites…» | G4 (**A**). Retirat el 29/09. |
| P2 | Franja «Tens una avaria?» amb «Si falla una porta o un automatisme, truca'ns i explica'ns què ha passat. Atenció de dilluns a divendres, de 8 a 13 h i de 15 a 18 h.» | No hi és | G3 ⚠. **L'horari** surt del traspàs de Fase 4, però `particulars-urgencies.md` encara té un `reviewNeeded` per confirmar-lo (vegeu U2). |
| P3 | «Feines a mida / Respostes clares» | «En què et podem ajudar» | G1 (**A**). |
| P4 | «Fets, no només paraules» | «Treballs reals» | G1 (**A**). |
| P5 | Tancament dels casos: «Els cinc treballs, al portafoli» | No hi és | G3. |
| P6 | «Explica'ns la feina» (contacte) | «Explica'ns què necessites» | G1 (**A**). |
| P7 | No es mostra (hi ha el botó de WhatsApp) | «També pots escriure'ns per WhatsApp al 630 661 908.» | **A**, eliminar. |

## Serveis de Particulars (plantilla PS)

Els quatre serveis comparteixen el mateix canvi de format: el paràgraf de preparació del contingut ara es mostra com una fitxa de tres dades amb una nota «Opcional» (redisseny del 28/09). La decisió és la mateixa per a tots: **S0**.

| Codi | Què es veu | Què diu el contingut | Proposta |
|---|---|---|---|
| **S0** | Fitxa de tres dades, per exemple «Mides · De la peça o de l'espai.», «Ubicació · On s'haurà d'instal·lar.», «Ús previst · Per a què la necessites.», més «Opcional · …» | Un paràgraf seguit amb les mateixes idees i la frase final «Amb aquesta informació / Amb aquestes dades podem valorar…» | **A**. El contingut passa a una llista de tres dades i la nota opcional. La frase final s'elimina, com ja vas decidir. |

### Estructures · `/particulars/estructures/`

| Codi | Què es veu | Què diu el contingut | Proposta |
|---|---|---|---|
| E1 | «Estructures per a cada espai» + «Baranes, escales, passarel·les i altres peces definides segons l'espai, l'ús i l'acabat.» | No hi és | G3. |
| E2 | «Comencem per entendre l'espai» | «Del projecte al muntatge» | G1 (**A**). |
| E3 | La galeria es mostra sense titular; el paràgraf de la secció sí que es veu | «Feines que ja hem fet» | **A** (sense titular) o **B** (tornar a mostrar l'H2). Proposta: **B**, perquè ajuda a entendre que són feines reals. |
| E4 | Avís: «Si tens una avaria en una porta o un automatisme, explica'ns què ha passat.» | No hi és | G3. És el mateix avís a Estructures i Mobiliari. |
| E5 | «Comencem pel teu espai» (contacte) | «Explica'ns el teu projecte» | G1 (**A**). |

### Automatismes · `/particulars/automatismes/`

| Codi | Què es veu | Què diu el contingut | Proposta |
|---|---|---|---|
| A1 | «Automatismes per a cada accés» + «Motoritzem portes i revisem sistemes que ja estan instal·lats.» | No hi és | G3. |
| A2 | Panells «Portes de garatge» i «Altres accessos» | No hi són | G3. El panell «Altres accessos» usa una imatge conceptual. |
| A3 | «Comencem per conèixer la porta» (fitxa, S0) | «Quina porta tens?» | G1 (**A**). |
| A4 | La galeria es mostra sense titular | «Instal·lacions reals» | Com E3. Proposta: **B**. |
| A5 | «Explica'ns el teu cas» (contacte) | «Si el problema és ara» + enllaços «Veure urgències · Enviar una consulta» | G1 i G2 (**A**). |
| A6 | No es mostra cap marca | `reviewNeeded`: «Confirmar les marques de motors…» | Es pot tancar el `reviewNeeded`: la pàgina no n'esmenta cap. |

### Mobiliari · `/particulars/mobiliari/`

| Codi | Què es veu | Què diu el contingut | Proposta |
|---|---|---|---|
| M1 | «Comencem per l'ús de la peça» (fitxa, S0) | «Una peça definida per l'espai» | G1 (**A**). |
| M2 | «Explica'ns el projecte» | «Veure estructures · Explicar el projecte» | G2 (**A**). |
| M3 | Sense galeria | `reviewNeeded`: demanar exemples i fotografies abans de publicar-ne una | Es pot tancar el `reviewNeeded` si acceptes publicar sense galeria. |

### Urgències · `/particulars/urgencies/`

| Codi | Què es veu | Què diu el contingut | Proposta |
|---|---|---|---|
| U1 | «Explica'ns la incidència» (fitxa, S0) | «Contacta directament» + «Truca al 630 661 908 · Escriu-nos per WhatsApp» | G1 i G2 (**A**). |
| U2 | «Atenció de dilluns a divendres, de 8 a 13 h i de 15 a 18 h.» (també a la franja de Particulars) | `reviewNeeded`: «Confirmar horaris abans de fer qualsevol promesa de disponibilitat.» | **Bloquejant.** Cal confirmar l'horari amb el client o amb Google Business Profile. Si és correcte, es tanca el `reviewNeeded`; si no, es corregeix a les dues pàgines. |

## Portafoli · `/particulars/projectes/` · `particulars-projectes.md`

| Codi | Què es veu | Què diu el contingut | Proposta |
|---|---|---|---|
| F1 | «Cinc feines / Cinc contextos» | Sense titular equivalent | G3. |
| F2 | «De la feina al teu projecte» (serveis relacionats) | «Consulta també els serveis d'estructures i d'automatismes.» | **A**. |
| F3 | «Explica'ns la idea» | «Parlem del teu projecte» | G1 (**A**). |

Les descripcions dels cinc casos surten de `content/ca/projects/` i hi coincideixen.

## Industrial · `/industrial/` · `industrial.md`

| Codi | Què es veu | Què diu `industrial.md` | Proposta |
|---|---|---|---|
| I1 | H1 en tres línies sense punts: «Sèries curtes / Peces exigents / Resposta industrial» | «Sèries curtes. Peces exigents. Resposta industrial.» | **A** de presentació. El text es manté i l'H1 accessible es llegeix sencer. Cap canvi al contingut. |
| I2 | «El taller en primer pla» + «Un taller per passar del plànol a la peça.» | «Comprova l'encaix del taller» | G1 (**A**) ⚑ i G3 per al lead. |
| I3 | Cartells «Acer i inoxidable», «Transformació del metall» + «Plegadora», «Processos de soldadura», «Del taller al muntatge» + «Equip propi per als desplaçaments i el muntatge.» | No hi són | G3. Les dades es corresponen amb Capacitats. |
| I4 | «En procés, no certificacions vigents»: ISO 9001 · En implantació, ISO 3834 · En estudi, **Robotització · I automatització en curs** | «Requisits tècnics i qualitat». A Capacitats: «digitalització i l'automatització de la soldadura» | **C per a «Robotització»** ⚠. El contingut no parla de robotització. Proposta: «Automatització · Digitalització i automatització de la soldadura en curs». La resta, **A**. |
| I5 | «Experiència en cinc sectors» | «Per a quins sectors treballem» ⚑ | G1 (**A**). |
| I6 | «La sèrie comença amb una peça» + «Material, soldadura, muntatge i quantitat es valoren conjuntament abans de fabricar. Cada sèrie es concreta segons els seus requisits.» | «Una manera de treballar definida» + «Definim → Preparem → Fabriquem → Comprovem. Aquest procés ordena…» | G1 (**A**) i G3 per al lead. La seqüència de fletxes es mostra com a passos. |
| I7 | «Quatre passos / Una feina ben definida» i els quatre passos amb descripció | Només els noms dels passos | G3. Les quatre descripcions són de la maqueta. |
| I8 | «Un encàrrec real / Deu gàbies» | «Un cas real» | G1 (**A**). |
| I9 | «Parlem de la peça» + llista «Plànol o documentació · Material i aplicació · Unitats previstes» | «Envia els requisits» + «Per a una consulta tècnica directa, truca al 630 661 908 o escriu a…» | G1 (**A**). El telèfon i el correu són al bloc de contacte comú. |
| I10 | No es mostren (rutes ajornades) | «Veure sectors», «Veure el procés · Entendre les sèries curtes», «Veure el projecte» | G2 (**A**). Es retiren d'`industrial.md` mentre les rutes estiguin ajornades. |

## Capacitats · `/industrial/capacitats/` · `industrial-capacitats.md`

| Codi | Què es veu | Què diu el contingut | Proposta |
|---|---|---|---|
| C1 | «Del material a la peça» | «Espai i equip» | G1 (**A**). El paràgraf de 950 m² i 12 persones sí que es mostra. |
| C2 | Esquemes amb el nom de cada màquina | «Disposem de plegadora, cisalla i punxonadora.» | **A**. Mateixes dades en un altre format. |
| C3 | Plaques «Acer» / «Inoxidable» amb 304 i 316 | Llista «Acer al carboni · Acer inoxidable 304 · Acer inoxidable 316» | **A**. Mateixes dades. |
| C4 | «Valoració segons el plànol · Les mides, els gruixos i les toleràncies de cada peça es revisen amb la documentació tècnica.» | No hi és | G3 ⚠. Cal confirmar la revisió de **toleràncies**. |
| C5 | «Soldem / Muntem» + «Els processos i els recursos es concreten segons la peça i l'abast acordat.» · «MIG/MAG + TIG» | «Treballem amb processos MIG/MAG i TIG.» | G3 per al lead. Les dades, **A**. |
| C6 | «Desplaçaments i muntatge»: 6 furgonetes, 1 camió ploma | «Muntatge i logística» + frase | G1 (**A**). |
| C7 | «Quan el projecte demana suport tècnic» | «Projectes amb requisits tècnics» | G1 (**A**). |
| C8 | ISO 9001 · En implantació, ISO 3834 · En estudi + frase de digitalització | «Millora en curs» + «Estem implantant l'ISO 9001 i estudiant l'ISO 3834…» | **A**. Coherent amb I4 un cop corregida «Robotització». |
| C9 | «Parlem de la peça» + «Què ens ajuda a començar» (Plànol o documentació · Material i tipus de peça · Unitats previstes · Termini necessari) + «Contacte industrial» | «Què necessitem per valorar la feina» + «Enviar una consulta tècnica» + «També pots parlar de la feina al 630 661 908…» | G1 i G2 (**A**). |

## Empresa · `/empresa/` · `empresa.md`

Validada el 28/09. Només hi ha diferències de format:

| Codi | Què es veu | Què diu el contingut | Proposta |
|---|---|---|---|
| EM1 | Xifres amb etiqueta: «Any de fundació», «m² Taller de fabricació», «Persones a la plantilla», «+1 Furgonetes i camió ploma» | Les mateixes dades dins dels paràgrafs | **A**. Les xifres es comproven al build. |
| EM2 | Àmbits: «Vilafranca del Penedès i la rodalia · La major part de la feina», «Fins a Barcelona · Encàrrecs», «Arreu de Catalunya · Feines de sèries» | Una frase amb les tres zones | **A**. |
| EM3 | Dues targetes enllaçades | Línia «Serveis per a particulars · Capacitats industrials» | G2 (**A**). |

## Contacte · `/contacte/` · `contacte.md`

| Codi | Què es veu | Què diu el contingut | Proposta |
|---|---|---|---|
| K1 | No es mostra la secció. El número principal, el WhatsApp, la trucada i el fix hi són com a accions. | «Contacte directe» + paràgraf amb els telèfons | **A**. Ja registrat a pendents. |
| K2 | «Explica'ns el projecte» | Titular del formulari del contingut | G1 (**A**). |
| K3 | «Si et va millor, parlem-ne ara» / «Consulta tècnica directa» | «Si ets particular» / «Si contactes com a empresa» | G1 (**A**). Els paràgrafs sí que coincideixen. |
| K4 | «Ens trobaràs a Vilafranca» | «Dades generals» | G1 (**A**). L'adreça i els telèfons coincideixen. |
| K5 | Grups i camps del formulari, ajudes («Com podem parlar amb tu?», «Només els detalls que ja coneguis.»…) i avís «Formulari en preparació: encara no envia consultes…» | No hi són | G3. Són textos d'interfície. L'avís s'ha de substituir pel text de privacitat quan el formulari funcioni. |

## Què bloqueja l'aprovació, a més d'aquestes decisions

- **U2 · Horari d'atenció:** s'ha de confirmar abans d'aprovar Urgències i Particulars. L'esquema no deixa aprovar una pàgina amb `reviewNeeded` obert.
- **I4 · «Robotització»:** no consta al contingut.
- **C4 · Toleràncies**, **H8 · detalls de les rajoles** i la resta de punts ⚠: són afirmacions sobre l'empresa que no surten de cap contingut validat.
- **Fotografies conceptuals** sense avís (sectors, «Escales», «Altres accessos»): pendent obligatori de publicació.

## Després de la decisió

1. Actualitzar `content/ca/` amb les opcions **A** i **C**, i les plantilles amb les opcions **B**. Els textos d'interfície aprovats (G3) passen al fitxer de contingut de la seva ruta.
2. Tornar a executar la comparació: ha de sortir sense diferències, fora de les de format acceptades.
3. Marcar `status: approved` només a les pàgines sense `reviewNeeded` ni pendents obligatoris; la resta continua en esborrany (`noindex`).
