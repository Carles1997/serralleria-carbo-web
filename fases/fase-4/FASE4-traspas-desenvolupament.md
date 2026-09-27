# Fase 4 → Fase 5 · Traspàs de disseny a desenvolupament

**Data:** 25/09/2026  
**Estat:** Fase 4 validada pel client el 25/09/2026; especificació de referència per a Fase 5.  
**Fonts que manen:** [sitemap i recorreguts de Fase 1](../fase-1/FASE1-arquitectura-serralleria-carbo.md), [continguts catalans](../../content/ca/), [mapa SEO](../fase-3/SEO-F3.md), [sistema visual de Fase 4](FASE4-sistema-visual.md), [tokens](../../design/tokens.css) i les maquetes enllaçades aquí. Els exports de Stitch són inspiració compositiva, no una font de dades empresarials.

## Plantilles aprovades com a patró

| Codi | Maqueta representativa | Funció |
|---|---|---|
| H | [Home](FASE4-mockups/home/index.html) | Entrada a les dues branques, context d'empresa, serveis, xifres confirmades i contacte. |
| P | [Portada Particulars](FASE4-mockups/particulars/index.html) | Urgències prioritàries, quatre serveis, tres casos destacats i accés als cinc casos. |
| PS | [Servei Estructures](FASE4-mockups/particulars/estructures/index.html) | Patró de servei per a Particulars: portada, abast visual, seqüència de feina i crides a projectes/contacte. |
| PP | [Portafoli Particulars](FASE4-mockups/particulars/projectes/index.html) | Cinc casos reals, filtres i enllaços als serveis relacionats. |
| I | [Portada Industrial](FASE4-mockups/industrial/index.html) | Capacitats, sèries curtes + procés, cinc sectors, cas documentat i consulta tècnica. |
| II | [Interior Capacitats](FASE4-mockups/industrial/capacitats/index.html) | Patró industrial compacte per a materials, maquinària, soldadura i requisits. |
| C | [Contacte compartit](FASE4-mockups/contacte/index.html) | Particular/Empresa, canals directes, camps segons branca i adjunt. |

Les pàgines derivades usen aquests patrons i els textos propis de Fase 3. **No cal fer una maqueta nova per a cada servei.** Una ruta del sitemap continua sent una pàgina real i indexable encara que comparteixi plantilla visual. El desenvolupament ha d'evitar pàgines duplicades de contingut.

### Jerarquia entre la portada i Capacitats d’Industrial

La portada `/industrial/` presenta la línia de fabricació: proposta de valor, vista general del taller, mètode, sectors i cas real. El mosaic del taller mostra quatre àmbits sense desplegar les llistes tècniques completes. El botó principal de la portada i la crida després del mosaic obren directament `/industrial/capacitats/`.

`/industrial/capacitats/` és la fitxa per comprovar l’encaix d’un encàrrec: materials concrets, plegadora/cisalla/punxonadora, MIG/MAG i TIG, muntatge, requisits a concretar amb el plànol i contacte tècnic. Té una capçalera més breu, molles de pa i un retorn contextual a la portada. Les dues rutes mantenen intencions editorials i SEO diferents segons el mapa de Fase 3; no es fusionen.

A Particulars, el final dels tres casos destacats indica que hi ha cinc treballs documentats i ofereix un botó blanc principal cap a `/particulars/projectes/`; el contacte hi queda com a acció secundària.

## Correspondència exacta amb el sitemap validat

| Ruta de Fase 1 | Plantilla de Fase 5 | Contingut i adaptació |
|---|---|---|
| `/` | H | `content/ca/home.md`; bifurcació amb enllaços HTML reals a les dues branques. |
| `/empresa/` | Interior editorial compartit, derivat d'H | `content/ca/empresa.md`; història, equip i taller confirmats. La ruta queda pròpia, sense maqueta individual. |
| `/particulars/` | P | `content/ca/particulars.md`; urgències visibles des del primer recorregut, quatre àmbits visuals inclosos els carros industrials. |
| `/particulars/urgencies/` | PS, variant breu d'incidència | `content/ca/particulars-urgencies.md`; trucada directa i formulari curt com a accions primàries. Sense promeses d'horari o resposta. |
| `/particulars/estructures/` | PS | Maqueta de referència i `content/ca/particulars-estructures.md`. |
| `/particulars/automatismes/` | PS | `content/ca/particulars-automatismes.md`; casos relacionats, sense marques de motors fins a confirmació. |
| `/particulars/mobiliari/` | PS | `content/ca/particulars-mobiliari.md`; no crear exemples inexistents. |
| `/particulars/projectes/` | PP | `content/ca/particulars-projectes.md` i cinc fitxes de `content/ca/projects/`; els filtres no creen rutes de cas noves. |
| `/industrial/` | I | `content/ca/industrial.md`; missatge «Sèries curtes. Peces exigents. Resposta industrial.» |
| `/industrial/capacitats/` | II | Maqueta de referència i `content/ca/industrial-capacitats.md`. |
| `/industrial/sectors/` | II, variant de sectors | `content/ca/industrial-sectors.md`; les peces de sector són visibles i accionables, sense selector que amagui l'oferta. |
| `/industrial/series-curtes/` | II, variant de proposta de valor | `content/ca/industrial-series-curtes.md`; la portada I uneix sèries i mètode com a resum, però aquesta URL conserva contingut i intenció propis. |
| `/industrial/proces/` | II, variant de procés | `content/ca/industrial-proces.md`; quatre passos Definim → Preparem → Fabriquem → Comprovem, amb informació completa sense animació. |
| `/industrial/projectes/` | II, variant de cas industrial | `content/ca/industrial-projectes.md` i únic cas real Gàbia; cap galeria fictícia. |
| `/contacte/` | C | `content/ca/contacte.md`; `?tipus=empresa` preselecciona Empresa i `?tipus=particular` Particular. Una sola URL canònica. |
| `/legal/` | Plantilla de text legal | Índex de les tres polítiques del sitemap de Fase 1; publicar només amb contingut aprovat. El mapa SEO de Fase 3 conté una nota contradictòria sobre aquesta ruta: preval el sitemap validat. |
| `/legal/avis-legal/` | Plantilla de text legal | `content/ca/legal-avis-legal.md`; text del client pendent. |
| `/legal/privacitat/` | Plantilla de text legal | `content/ca/legal-privacitat.md`; text del client pendent. |
| `/legal/cookies/` | Plantilla de text legal | `content/ca/legal-cookies.md`; adaptar només el text confirmat i el mecanisme de consentiment que s'implementi. |
| 404 localitzada | Estat de sistema compartit | `content/ca/404.md`; preservar idioma i donar accés a Home i a les dues branques. No incloure a `sitemap.xml`. |

Els enllaços que ara van a una àncora de demostració i porten `data-future-route` s'han de connectar a la ruta aprovada corresponent durant la Fase 5. L'atribut no és una font nova d'arquitectura. Les variants d'idioma i les URL finals es concretaran amb la convenció tècnica sense alterar aquest arbre lògic.

## Sistema visual i components

- **Marca compartida:** Source Sans 3, negre/carbó, blanc, grisos i fotografia d'ofici. Geometria recta, juntes fines, jerarquia editorial i una sola família de capçalera/peu. Usar `DESIGN.md` i `design/tokens.css` com a base, amb les correccions aprovades de Fase 4.
- **Particulars:** llenguatge proper i tranquil·litzador; accent del logotip `#7c2a30`, fons carbó i titulars clars. Telèfon visible a la capçalera i camí curt cap a Urgències.
- **Industrial:** llenguatge tècnic i directe; plata neutra i grafit amb reflex metàl·lic als fragments destacats dels titulars. L'efecte no ha de comprometre el contrast ni retallar les lletres.
- **Components reutilitzables:** capçalera per branca i menú mòbil, hero fotogràfic, accions directes, mosaic de serveis, seqüència de procés, visor/portafoli, cards de sector, dades confirmades, crida final i peu legal. Les fotografies conceptuals han d'estar identificades fins a substituir-les per originals autoritzades.
- **Responsive:** comprovar 1440, 768, 390 i 320 px, i amplades intermèdies. Titulars recompostos sense retall, ordre de lectura natural, objectius tàctils d'almenys 44 px, cap desbordament. Reservar marge per a textos ES/EN més llargs.

## Contracte d'interaccions i moviment

| Peça | Ratolí / teclat / tacte | Moviment i estat alternatiu |
|---|---|---|
| Doble accés de la Home | Cada panell és un enllaç real amb nom visible. Hover i focus poden passar la fotografia de blanc i negre a color. En tacte, les dues opcions són visibles i es trien amb un toc. | Transició decorativa curta; amb moviment reduït, canvi immediat o imatge estàtica. L'enllaç funciona sense animació. |
| Menú mòbil | Botó amb `aria-expanded`, focus visible; en obrir, el focus va al primer enllaç. Escape tanca i retorna el focus. | Sense entrada teatral ni bloqueig del scroll necessari. Garantir una navegació alternativa si JavaScript falla. |
| Accés als projectes documentats | La Home apunta a `/particulars/projectes/` des de la navegació; Particulars mostra tres casos i un botó destacat cap als cinc. La portada Industrial conserva el cas de les gàbies. | Les imatges conceptuals mai no es presenten com a fotos d’obra real. |
| Història de tres casos a Particulars | L'scroll marca el capítol actiu i la barra de progrés; les tres fitxes continuen llegibles i enllaçables. | Entrada breu de text i indicador; amb moviment reduït, sense desplaçament decoratiu. |
| Portafoli Particulars | Filtrar Tots/Estructures/Automatismes; `aria-pressed` i nombre visible actualitzats. `?servei=estructures` o `?servei=automatismes` obre el filtre corresponent. | Sense JS, mostrar els cinc casos. No crear URLs de fitxa de projecte no previstes al sitemap. |
| Mosaic de sectors Industrial | Cinc sectors visibles alhora, amb nom i crida entenedora; hover/focus canvia discretament la il·lustració i el lateral. Tacte obre l'acció directament. | 220 ms aproximadament per a l'accent visual; amb moviment reduït, sense desplaçament. Evitar contingut ocult darrere d'interaccions. |
| Sèries curtes + mètode | Una sola secció de portada amb àncora `#proces`. Quatre passos i línia de progrés segons scroll: horitzontal en escriptori, vertical en mòbil. | Revelació progressiva només si hi ha JS i moviment permès; sense JS o amb moviment reduït, passos i línia llegibles des del primer moment. Les rutes `/industrial/series-curtes/` i `/industrial/proces/` continuen separades. |
| Formulari | Radios Particular/Empresa; preselecció d'origen; camps de la branca inactiva ocults i deshabilitats; errors associats amb `aria-invalid`/`aria-describedby` i focus al primer error; nom del fitxer visible. | Cap animació que retardi la validació. Estat d'èxit, error de xarxa i reintent reals només quan s'implementi el backend. |

Les animacions segueixen la lectura, no retarden cap dada ni CTA. Evitar reproducció automàtica i moviment continu. El focus ha de ser visible sobre fons foscos i clars. Enllaços i botons han de ser elements HTML semàntics; l'animació no substitueix l'estat seleccionat o el text.

## Formulari: separació clara entre maqueta i producció

La maqueta actual **no envia**. A Fase 5, definir destinació i protecció de dades abans d'activar el botó: validació al servidor, enviament fiable, límits de mida i tipus d'arxiu, antispam proporcional, errors de xarxa recuperables i confirmació accessible. No persistir adjunts al navegador. Revisar amb el client els textos de privacitat, avís legal, consentiment i tractament de fitxers abans de publicar. El plànol industrial és destacat, però l'obligatorietat formal s'ha de decidir amb el flux real i la informació que pugui aportar el client.

Les dues branques enviaran a `carbo@serralleriacarbo.com` amb assumpte distingit `[Particulars]` o `[Industrial]`. El número principal és 630 661 908 i l’horari d’atenció és de dilluns a divendres, de 8 a 13 h i de 15 a 18 h (caps de setmana tancat). La branca Empresa ha de sortir seleccionada si l'enllaç porta `?tipus=empresa` o si el recorregut industrial ho estableix. La branca Particular és el valor inicial general. Canviar de branca ha d'esborrar errors de camps ocults sense perdre silenciosament les dades de l'altra branca mentre l'usuari encara edita.

## SEO i publicació

- Cada ruta comercial té intenció i textos propis a [SEO-F3.md](../fase-3/SEO-F3.md): títol, metadescripció, una H1 i contingut útil. No hi ha etiqueta `meta keywords`. El `sitemap.xml` enumera URL canòniques publicades; les paraules clau es treballen a la pàgina i als enllaços interns.
- Implementar enllaços HTML rastrejables entre Home, branques, serveis, projectes i Contacte. No convertir tots els enllaços en àncores de la portada. Aplicar els 301 antics segons el mapa de Fase 3, sense inventar destins nous.
- Les maquetes tenen `noindex` perquè són prototips locals. Eliminar aquesta etiqueta únicament de les pàgines publicables i aprovades. No exposar pàgines legals incompletes ni contingut de mostra com a indexable.
- Configurar idioma, URL canònica i `hreflang` recíproc quan es concreti `astro:i18n`. Search Console servirà per validar cobertura i consultes; Analytics, per observar ús i conversions quan el client doni accés. Cap d'aquestes dades s'ha inferit ara.

## Criteri d'acceptació per a Fase 5

Repetir els tres recorreguts de Fase 1 fins al contacte real; comprovar que les 20 destinacions del mapa anterior resolen correctament o tenen un estat editorial explícit; executar proves de teclat, tacte, moviment reduït i 1440/768/390/320 px en les rutes ja construïdes; contrastar en dispositius reals i navegadors addicionals; substituir recursos conceptuals abans de publicar. Les dades i textos pendents es completen amb confirmació del client, sense inventar especificacions o promeses.

## Revisió del client del 25/09/2026

- Als textos de marca, la branca es presenta com a **Industrial**. Serralleria Carbó continua sent la marca mare.
- Els carros industrials apareixen a Particulars per a una unitat i a Industrial per a producció en sèrie. No es presenten com a cas documentat nou.
- La Home deixa de tenir bloc propi de «Treballs documentats». Es conserven el portafoli Particulars i el cas de les gàbies a Industrial. L’estructura de l’ascensor pot conviure en ambdues branques més endavant, quan se’n validi la presentació industrial.
- Industrial inclou la possibilitat de valorar escales, baranes, estructures per a ascensors i altres elements de construcció de gran escala per a constructores, caps d’obra i promotores. No es fa passar això per un projecte real ja documentat. La galeria de sectors té cinc targetes; «Seguretat i defensa» s’ha retirat i «Tecnologies duals» ocupa més espai.
- L’accés a `/contacte/?tipus=particular&servei=carros` preselecciona el servei de carros en la maqueta. En desenvolupament, preservar aquest comportament i validar també el missatge d’error, la confirmació i l’enviament real.
- A 390 i 320 px, els serveis de Home i Particulars segueixen una graella de dues columnes. La transició del portafoli mòbil amb imatge fixa que canvia en avançar els casos queda per a Fase 5: abans d’implementar-la, comprovar-ne lectura, rendiment, navegació tàctil i preferència de moviment reduït.
- El full [`revisio-client.css`](FASE4-mockups/revisio-client.css) recull l’ajust de densitat i color sobre les set plantilles de referència. Les rutes del sitemap de Fase 1 es mantenen.
