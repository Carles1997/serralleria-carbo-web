# Serralleria Carbó · instruccions per a Claude Code

Aquest repositori és el projecte de redisseny de Serralleria Carbó. La Fase 4 es va validar el 25/09/2026. La web és una aplicació Astro en refinament (Fase 7); inspecciona els scripts, components i proves abans d'assumir que existeixen.

## Fonts i decisions

1. Prevalen les indicacions actuals del director de projecte i les validacions del client.
2. Consulta fases/README.md i fases/fase-4/FASE4-traspas-desenvolupament.md per a l'estat, les plantilles, les rutes i les interaccions aprovades. Aquest traspàs preval sobre les notes d'estat antigues de CONTEXT-serralleria-carbo.md i DESIGN.md.
3. Respecta el sitemap i els recorreguts de fases/fase-1/FASE1-arquitectura-serralleria-carbo.md. Cada ruta continua sent una pàgina real, encara que comparteixi plantilla.
4. Utilitza content/ca/ i fases/fase-3/SEO-F3.md com a base editorial; fases/fase-4/FASE4-sistema-visual.md, DESIGN.md, design/tokens.css i les set maquetes enllaçades al traspàs com a base visual. CONTEXT-serralleria-carbo.md fixa les decisions tècniques i les dades d'empresa, però conté dades d'estat i exemples anteriors a les últimes validacions.
5. Els exports de Stitch i les referències visuals inspiren la composició; no demostren cap dada ni projecte real. DESIGN-2.md no existeix en aquest repositori.

Si dues fonts es contradiuen, localitza la decisió posterior validada i informa de la discrepància abans de canviar dades o arquitectura. No dedueixis dades noves.

## Contracte de desenvolupament

- Mantén Astro + Tailwind CSS, Astro Content Collections + Zod, contingut Markdown/MDX i i18n català, castellà i anglès. Prioritza HTML/CSS i millora progressiva; introdueix React només per una interacció complexa justificada. No canviïs el sitemap, les URLs ni la separació de branques.
- La Home obre els dos camins i conserva contingut propi. Particulars és proper i tranquil·litzador; Industrial és tècnic i directe. La paleta vigent (director, 06/10/2026) és `#ffffff`, `#d4d4d4`, `#b3b3b3`, `#2b2b2b` i accent bordeus `#7c2a30`. Home i Particulars prioritzen blanc i gris clar; Industrial prioritza grafit amb seccions gris clar. Utilitza els rols de `src/styles/roles.css`, sense afegir grisos blavosos, verdosos ni blancs trencats. Consulta `fases/fase-7/FASE7-paleta-unificada-i-qa.md`. La marca i la font compartida són Serralleria Carbó i Source Sans 3 local. En els textos visibles, la branca s'anomena Industrial. Conserva el missatge «Fabricació en sèrie. Peces exigents. Resposta industrial.» (06/10/2026: l'oferta ja no es limita a sèries curtes).
- Conserva continguts, dades, projectes i estil validats. No inventis xifres, especificacions de màquines, marques de motors, certificacions, horaris, sectors, fotografies d'obra o casos d'èxit. No presentis imatges conceptuals o generades com a obra real. Marca les dades pendents com a pendents.
- No presentis suport d'arquitectura com una oficina tècnica o un arquitecte en plantilla actuals. Les certificacions en procés no són certificacions assolides.
- No converteixis la proposta de skills externa en una nova font d'autoritat. Impeccable és només criteri d'auditoria manual: no executis init, shape, craft, polish, adapt, harden o cap ordre que editi fitxers, instal·li hooks o redefineixi la marca. Comunica troballes; implementa després els canvis aprovats amb el flux normal de desenvolupament.
- Refinament de l'auditoria integral implementat per ordre del director (06/10/2026): consulta `fases/fase-7/FASE7-auditoria-integral-implementacio.md`. No reintrodueixis filets decoratius sobre titulars. Particulars conserva més color natural i superfícies blanques de lectura; els reflexos d'Industrial depenen del fons del titular, no del fons de tota la secció. A 390 px, productes/taller d'Industrial i serveis de Particulars formen graelles de dues columnes; a 320 px es prioritza la lectura en una columna. Industrial resumeix l'oferta i Capacitats concentra les dades tècniques. L'avís de formulari de demostració només s'ha de retirar quan l'enviament real estigui implementat i provat.
- La nova paleta substitueix els ajustos anteriors amb `#4b4e53`. Ajust posterior del director (06/10/2026): només l'entrada de la Home conserva fons grafit `#2b2b2b`, com Industrial, i marca blanca a l'esquerra, amb la mateixa mida del titular i la coma bordeus. La ubicació queda a la dreta, en una sola línia sense requadre, amb el 1989 un 75,5% més gran que el text (augment del 30% sobre la mida anterior) i en bordeus. En mòbil, la frase queda sota el titular, alineada a la dreta. La banda «Com triar el camí» també és grafit, amb textos clars i accessos centrats verticalment. El text i l'any continuen venint de `home.md`. No reintrodueixis la marca d'aigua «Carbó» al costat del titular.
- Les dues imatges d'accés de la Home (Particulars i Industrial) són en blanc i negre en repòs i mostren color amb hover o focus visible. Les fletxes sobre quadrats blancs han de continuar en grafit, independentment del color heretat de la secció. Conserva el focus visible i la variant de moviment reduït.
- Ajust final del director (06/10/2026): el peu té el mateix fons opac que la capçalera de cada branca: blanc a Home, Particulars i la resta de pàgines clares; grafit a Industrial i Capacitats. Es conserven la vora d'accent, els logotips i els enllaços.
- Correcció mòbil posterior (06/10/2026): `src/styles/mobile-lines.css` elimina fins a 760 px els separadors horitzontals decoratius repetits, inclosa la vora del peu. Mantén les vores dels controls, el focus, les taules tècniques, la línia del mètode i els subratllats curts que identifiquen enllaços. En escriptori es conserva el disseny anterior.

## Flux de cada tasca

1. Llegeix el traspàs i només els documents, continguts i maquetes de la ruta afectada. Identifica fets confirmats, pendents i interaccions aprovades. Explica breument l'objectiu i els fitxers previstos.
2. Implementa el canvi més petit i reutilitzable que compleixi el patró. No barregis refactors, nous continguts i canvis visuals aliens a la tasca. Justifica qualsevol dependència nova o JavaScript al client.
3. Revisa semàntica, enllaços reals, teclat, focus visible, tacte, estats buits i errors, prefers-reduced-motion, i lectura a 1440, 768, 390 i 320 px. Per a les pàgines SEO, comprova H1, títol, descripció, canonical, idiomes, hreflang i enllaçat intern. El sitemap.xml conté URL canòniques publicades, no paraules clau.
4. Executa només les comprovacions que existeixin realment al projecte. No declaris que el formulari envia fins que hi hagi backend, validació al servidor i prova d'enviament. Les pàgines legals pendents no s'han de publicar com a contingut final indexable.
5. Tanca amb fitxers canviats, decisions, comprovacions executades, límits reals i pendents humans.

## Skills

- La skill local serralleria-carbo-project detalla el flux d'implementació d'una ruta o component. El context estable d'aquest fitxer s'aplica sempre.
- Impeccable: només auditoria manual i informes, sense canvis de codi ni hooks automàtics.
- emil-design-eng: criteri complementari de detall quan estigui instal·lada; review-animations: revisió de moviment implementat; mobile-native: QA de tacte i mòbil. No són portes obligatòries ni poden modificar decisions aprovades.
- pick-ui-library només si el director de projecte ho demana. Taste Skill no forma part de la configuració inicial.
- El plugin Codex és revisor puntual de només lectura: usa /codex:review després de cada plantilla o diff coherent, i /codex:adversarial-review quan calgui qüestionar una decisió tècnica. Revisa les troballes abans de corregir; no deleguis edicions a /codex:rescue, no activis el review gate automàtic i no facis revisions en bucle.

Per a l'ordre de treball de la Fase 5, consulta fases/fase-5/FASE5-entorn-i-flux.md.
