# Fase 3 — Revisió editorial del català

**Estat:** base catalana i mapa SEO auditats i acceptats provisionalment pel director de projecte el 23/09/2026 per iniciar la Fase 4. Aquest és el contingut de referència per als mockups; continua subjecte a correccions quan arribin dades noves. Traduccions ES/EN, fotografies i textos legals pendents. No publicar fins que els continguts necessaris estiguin completats i validats.

## Quins textos apareixeran a la web?

- `seoTitle` és el títol proposat per a la pestanya del navegador i per al resultat de cerca; `seoDescription` proposa el resum del resultat. Google pot adaptar el títol o el fragment mostrat. Cap dels dos és el titular visible dins la pàgina.
- El `#` de cada fitxer és el titular visible principal (H1); els `##` són seccions visibles i els paràgrafs són el text de referència per al disseny. Els fitxers mantenen `status: draft` perquè encara no són aprovats per publicar i poden incorporar les dades pendents.
- A Fase 4 es decidiran composició, jerarquia visual, posició dels blocs i adaptació entre dispositius. L'arquitectura del sitemap i el missatge aprovat de Carbó Industrial es mantenen.

## Ajust editorial d'aquesta revisió

La primera redacció de Particulars s'explicava massa des de la consulta de l'usuari. La versió nova obre amb trajectòria i feina concreta, recuperant la confiança del llenguatge antic amb dades comprovables i un tracte proper en segona persona. Industrial conserva un registre tècnic i directe. La home manté els dos camins aprovats i incorpora un bloc de quatre dades per a la futura secció visual: **1989, 950 m², 12 persones i 6 furgonetes + 1 camió ploma**. Les xifres es presenten amb la seva etiqueta, sense fer derivacions com “anys d'experiència” que quedarien desactualitzades.

Les fotografies continuen **pendents de selecció**. Primer cal recuperar els originals dels projectes i del taller; es podran complementar amb fotografies de banc o generades per IA quan s'identifiqui clarament el seu paper. Les imatges externes o generades no s'han de presentar com a treballs, instal·lacions ni personal reals de Serralleria Carbó. Els textos i les dades de la home s'han de poder llegir també sense fotografia.

## Què s'ha preparat

- `content/ca/`: 15 pàgines de contingut del sitemap, una 404 i textos compartits de navegació i formulari.
- `content/ca/projects/`: sis fitxes de treballs reals recuperats del full de càlcul, distribuïdes en cinc casos de Particulars i un d'Industrial. Es mostren a les dues pàgines de projectes aprovades, sense crear rutes noves.
- `content/ca/legal-*.md`: avís legal i privacitat pendents del client; cookies amb esborrany d'adaptació. Els tres mantenen `publishReady: false` i no són publicables.
- `SEO-F3.md`: 50 expressions candidates per idioma, assignades a les 15 pàgines comercials, amb propietat de cada intenció, prioritats, criteris d'indexació i punts de migració. És un mapa editorial sense volums de cerca inventats.
- `scripts/check_fase3.py`: comprovació de rutes, metadades, H1, enllaços interns i bloqueig legal. Resultat actual: **19 rutes esperades, 3 legals bloquejades, 0 incidències estructurals**.

## Ordre de lectura per validar el contingut

1. [Home](content/ca/home.md), [Particulars](content/ca/particulars.md), [Carbó Industrial](content/ca/industrial.md) i [Contacte](content/ca/contacte.md): to, jerarquia i dues vies de conversió.
2. Pàgines de servei i capacitats de `content/ca/`: precisió de les promeses, informació necessària per contactar i coherència amb cada públic.
3. [Projectes de Particulars](content/ca/particulars-projectes.md), [Projectes industrials](content/ca/industrial-projectes.md) i les sis fitxes de `content/ca/projects/`: correspondència entre text, any i fotografia real.
4. [Mapa SEO](SEO-F3.md): termes candidats i assignació per pàgina, abans d'aprovar els títols i les descripcions.

## Fonts i límits factuals

| Afirmació o contingut | Font de projecte | Límits editorials |
|---|---|---|
| Fundació el desembre de 1989, plantilla de 12 persones, taller de 950 m², sis furgonetes, camió ploma, plegadora, cisalla i punxonadora | Missatge del client rebut el 23/09/2026; `CONTEXT-serralleria-carbo.md`, apartat 2.4 | Els 950 m² substitueixen els 900 m² previs. No deduir gruixos, toleràncies, capacitat de màquina ni terminis. |
| Ferro / acer, inoxidable 304/316 i soldadura MIG/MAG/TIG | Missatge del client rebut el 23/09/2026; materials industrials previs al CONTEXT | No afirmar graus o processos addicionals. L'alumini de la web antiga requereix confirmació actual. |
| Vilafranca i rodalia, feines fins a Barcelona i sèries valorables a Catalunya | Missatge del client rebut el 23/09/2026 | Les distàncies i el 95 % són aproximats; no convertir-los en una promesa universal de servei. |
| Contacte general i domicili | CONTEXT 2.4; full `Contingut actual`, fila 4; decisió del director de projecte en aquesta ronda | **630 661 908** com a principal i WhatsApp; el fix continua secundari. No substituir l'adreça per una altra formulació sense verificar la fitxa de Google. |
| Contacte industrial Jordi Mas | CONTEXT 2.4 | No presentar-lo com a responsable de totes les consultes particulars. |
| Quatre categories de Particulars | Fase 1; formulari antic a `Contingut actual`, fila 5 | No fusionar o crear categories noves. |
| Cinc casos de Particulars | `Projectes reals`, files 2 i 4–7 | Les fotografies s'han de correspondre amb el cas. S'omet l'afirmació de conformitat normativa de la porta fins a verificació documental. |
| Cas industrial de deu gàbies | `Projectes reals`, fila 3; confirmació del client | No atribuir càrregues quantificades ni especificacions no aportades. |
| Sectors i procés industrial | CONTEXT 2.4 i Fase 1 | L'experiència sectorial no implica homologació. El procés no promet controls no especificats. |
| Suport d'arquitectura tècnica per a projectes industrials | Confirmació del director de projecte en aquesta ronda | Servei coordinat externament; comunicar que es poden valorar aquests projectes sense presentar una oficina tècnica o un arquitecte com a personal intern actual. |
| ISO 9001 / ISO 3834 | CONTEXT 2.4; decisió del director de projecte en aquesta ronda | Comunicar també a la pàgina principal d'Industrial només com a **implantació / estudi en curs**. |

## Decisions confirmades i guardades per a les fases següents

1. **Telèfon principal:** 630 661 908 amb acció principal de WhatsApp. Proposta de missatge inicial a `content/ca/ui.md`; l'usuari el podrà editar i haurà d'enviar-lo ell mateix. A Urgències es manté també un enllaç de trucada directa. El 93 890 27 94 queda com a fix secundari. El contacte industrial de Jordi Mas no es substitueix.
2. **Projectes amb suport d'arquitectura tècnica:** Carbó Industrial els pot valorar. La prestació tècnica està externalitzada, però el text públic no ha d'explicar l'organització del proveïdor ni suggerir que és un departament intern.
3. **ISO 9001 / ISO 3834:** incloure'n l'estat també a `/industrial/`, amb implantació de la primera i estudi de la segona. No presentar-les com a certificacions obtingudes.
4. **Cookies:** es pot preparar una adaptació del text antic ara. `content/ca/legal-cookies.md` ja conté un esborrany, encara no publicable perquè falta la relació real de cookies del web nou i la validació final.

## Pendents conservats per reprendre més endavant

1. **Marques de motors:** esperar la confirmació del client; no publicar marques ni logotips encara.
2. **Alumini:** confirmar si el material continua dins l'oferta actual; no incloure'l als textos nous fins aleshores.
3. **Mobiliari:** demanar exemples i fotografies reals quan estiguin disponibles. La categoria es manté al sitemap validat.
4. **Avís legal i privacitat:** el client els està treballant. Inserir els textos validats i el consentiment del formulari quan els lliuri.
5. **Política de cookies:** completar l'inventari real (noms, proveïdors, finalitats, durades i configuració del consentiment) i revisar l'esborrany abans de publicar-lo. La política antiga de CookieYes només consta resumida al full recuperat. [Guia de cookies de l'AEPD](https://www.aepd.es/guias/guia-cookies.pdf).
6. **SEO i analítica:** quan hi hagi accés, contrastar el mapa de consultes amb Search Console i Analytics, confirmar les campanyes de `/estructuras/` i `/motores/`, verificar les variants `/cat/` i tancar les redireccions. `SEO-F3.md` ja proposa els destins equivalents.
7. **Fotografies:** recuperar els originals de treballs i taller; valorar després imatges de banc o generades per a usos complementaris, sense presentar-les com a treballs reals.
8. **Detall industrial opcional:** si el client disposa de dades comunicables, confirmar gruixos, dimensions i altres límits de maquinària, i el rang d'unitats que considera una sèrie curta. No afegir cap valor sense font.
9. **Urgències i automatismes:** confirmar les incidències ateses i els horaris publicables, i si els tipus de porta esmentats a l'antiga pàgina de motors continuen vigents. Fins aleshores no prometre disponibilitat ni enumerar aquests tipus com a oferta actual.
10. **Trajectòria:** demanar fites o material històric només si es vol ampliar la pàgina Empresa; de moment es publica únicament la fundació confirmada.

## Criteris de revisió abans de traduir

- Llegir primer home, Particulars, Industrial i Contacte per confirmar veu i jerarquia; després serveis i projectes.
- Contrastar cada descripció de projecte amb la fotografia i amb el client; el text recuperat s'ha depurat, però no s'han inventat nous treballs.
- Revisar els `seoTitle` i `seoDescription` juntament amb el mapa SEO. No confondre candidates de paraula clau amb dades de volum o posició.
- Només quan el català estigui aprovat, adaptar ES/EN mantenint el significat i el to de cada branca. Els textos legals seguiran el procés de l'assessor.
- La Fase 4 pot començar amb aquesta base CA i SEO acceptada provisionalment. Les dades pendents, les traduccions i els textos legals s'han de completar i validar abans de la publicació; qualsevol canvi que afecti la composició es revisarà també als mockups.
