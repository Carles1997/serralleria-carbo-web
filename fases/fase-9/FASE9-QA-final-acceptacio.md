# Fase 9 · QA final i acceptació del client (P12)

**Data de preparació:** 23/10/2026 · **Estat:** Preparat; validació pendent.

**Objectiu.** Preparar la revisió de la web completa pel client i el director sobre la versió final. Aquest document és un protocol i una plantilla buida: no acredita cap prova executada ni cap acceptació. P12 continua **Pendent**. No s'atribueix cap execució històrica a Studio OS.

**Fonts:**
- [Manual de publicació](FASE9-manual-publicacio.md), §2, §3.1 i §4.
- [Informe d'actualització del 22/10/2026](FASE9-informe-actualitzacio-documentacio-2026-10-22.md).
- [Canvis del client del 12/10/2026](../fase-7/CANVIS-CLIENT-2026-10-12.md), §7.
- [QA final de les maquetes](../fase-4/FASE4-QA-final.md), com a referència de format, sense traslladar-ne els resultats a P12.
- [Pla del formulari real](../fase-8/FASE8-formulari-real-pla.md), §11.

## 1. Prerequisits

- [ ] **P1:** repetir i registrar el build definitiu simulat amb els estats editorials actuals; l'aprovació editorial ja registrada no substitueix aquesta comprovació.
- [ ] **P2:** registrar la decisió explícita del director sobre els idiomes del llançament i aplicar-la al selector, sitemap, indexació i `hreflang`. L'aprovació de continguts CA/ES/EN no decideix quins es llancen.
- [ ] **P3:** prova real controlada resolta segons el pla del formulari §11, recepció confirmada, formulari final en mode `live` i avís de demostració retirat i provat.
- [ ] **P5, P6 i P7:** consentiments d'imatge, revisió final de l'advocat i NAP definitiu resolts abans de tancar P12. Poden canviar fotografies, textos legals o dades de contacte; cal repetir les comprovacions afectades sobre la versió resultant.

Es poden preparar recorreguts abans, però no tancar l'acceptació mentre falti algun prerequisit. La resta de portes del manual mantenen els seus requisits i responsables; P12 no les substitueix.

## 2. Versió que s'ha de revisar

Revisar la **versió final**, per l'enllaç permanent del desplegament o la previsualització de la branca final, mai per estats intermedis. Registrar URL exacta, identificador del deploy, branca i commit a l'acta. Un enllaç de branca mutable necessita igualment identificar el deploy revisat.

Abans del canvi de DNS, seguir el manual §4 i emprar l'enllaç permanent: el subdomini general pot redirigir al WordPress. La previsualització permet revisar continguts i navegació; no acredita `live`, que només funciona en producció. La prova final en `live` requereix el desplegament de producció autoritzat, amb la mateixa versió identificada. Les autoritzacions operatives són les del manual; aquest protocol no les concedeix.

Per cada comprovació, anotar resultat, entorn, idioma, dispositiu/navegador i evidència o incidència. Si canvia la versió, registrar el nou identificador i repetir la passada afectada abans de signar.

## 3. Dispositius i navegadors

Matriu pendent d'executar; anotar model, sistema i versió del navegador. L'emulació complementa la prova real, però no la substitueix.

| Pendent | Dispositiu i navegador | Amplada orientativa | Recorregut |
|---|---|---|---|
| [ ] | iPhone real, Safari iOS | ≈390 px | Home → Particulars → Reparacions → Contacte; menú i formulari |
| [ ] | Android real, Chrome Android | ≈390 px | Home → Industrial → manteniment → Contacte; menú i formulari |
| [ ] | Tauleta, Safari iPadOS o Chrome Android | ≈768 px | Ambdues branques, orientacions vertical i horitzontal |
| [ ] | Escriptori, Chrome, Edge i Firefox (cadascun) | ≈1440 px | Home, Particulars, Reparacions, Industrial, Projectes i Contacte |
| [ ] | Viewport estret, navegador identificat | 320 px | Totes les plantilles i missatges del formulari, sense desbordament horitzontal |

- [ ] Titulars, textos, imatges i botons sense retalls ni solapaments; cap imatge trencada.
- [ ] Menú, retorns, filtres i visor de projectes operables amb tacte, ratolí i teclat segons el dispositiu.
- [ ] Textos llargs, zoom, focus visible i àrees tàctils revisats; cap acció depèn només del color o del pas del ratolí.

## 4. Idiomes, condicionats a P2

- [ ] Anotar la decisió P2 i els idiomes inclosos a l'acta, sense donar-ne cap per llançat abans de la decisió.
- [ ] Repetir els recorreguts i revisar continguts, formulari, errors i legals en cada idioma acordat.
- [ ] Selector d'idioma: conserva la pàgina equivalent quan existeix, mostra l'idioma correcte i no ofereix rutes ajornades com a publicades.
- [ ] `lang`, canonical, `hreflang` recíprocs i sitemap coherents amb P2 i amb l'estat d'indexació de l'entorn; cap idioma exclòs es declara indexable o a `hreflang`.
- [ ] Cap text sense traduir ni barreja accidental d'idiomes en menú, metadades, botons, ajuda, consentiment o errors.
- [ ] Textos llargs castellans i anglesos sense retalls a 390/320 px, si aquests idiomes formen part de P2. Si s'ajornen, registrar-ho com a fora de l'abast del llançament, sense presentar-los com a validats.

## 5. Descàrregues

La inspecció del repositori del 23/10/2026 no detecta documents descarregables PDF, ZIP, VCF ni DOC/DOCX a `src/` o `public/`. No s'inventa cap fitxer ni es confonen els adjunts que envia el visitant amb descàrregues del web.

- [ ] El client confirma que no s'espera cap document descarregable, o n'aporta la llista pendent (nom, format, idioma, ubicació i versió aprovada).
- [ ] Si se n'esperen, registrar la manca com a incidència i acordar-ne la resolució abans d'acceptar; quan existeixin, provar enllaç, descàrrega, obertura, nom, contingut i idioma en mòbil i escriptori.

## 6. Formulari

Seguir el [pla del formulari real](../fase-8/FASE8-formulari-real-pla.md) §11 per a la prova controlada i §11.6 per a producció. No copiar secrets, credencials ni dades personals a les evidències.

- [ ] En la versió final de producció autoritzada, enviar una consulta real en mode `live`; registrar referència i resultat. Un èxit visual o `202 Accepted` no prova el lliurament.
- [ ] Jordi confirma recepció a la safata d'entrada de `carbo@`, fora de brossa/quarantena; l'administrador confirma «Delivered» a la traça. Verificar contingut, accents, referència i resposta al visitant (Reply-To).
- [ ] Particulars i Industrial: camps condicionals, producte i preselecció des dels CTA correctes, inclòs manteniment; recorregut amb JavaScript i sense.
- [ ] Enviament sense adjunt i amb adjunt admès íntegre. Segons el pla: JPG, PNG, HEIC/HEIF i PDF, fins a 3.000.000 bytes, encara pendent de validar amb Graph a P3. Fer servir el límit final validat i comprovar màxim exacte, un byte per sota i un per sobre. DWG/DXF continuen pendents de decisió, sense donar-los per admesos.
- [ ] Camps obligatoris, correu invàlid, tipus/mida rebutjats, errors associats i focus al primer error; missatges comprensibles en cada idioma de P2.
- [ ] Errors de xarxa/servidor, límit de freqüència i duplicats segons el procediment acordat, sense enviaments massius ni fals èxit; alternativa de contacte visible.
- [ ] Consentiment obligatori i enllaç de privacitat operatius; comunicacions comercials separades i opcionals.
- [ ] Avís de demostració retirat després de la prova real; missatges i comportament coherents amb `live`. Si només s'ha provat en `test` o `dry-run`, P12 no es tanca.

## 7. Funcionalitat, contingut i accessibilitat

- [ ] Enllaços interns, logo, molles de pa, CTA, telèfon i correu correctes; rutes noves amb 200 i antigues amb 301 directe on l'entorn executi les regles Netlify. Separar evidències locals de les de desplegament.
- [ ] Continguts i fotografies aprovats; sense denominació comercial «Urgències / Urgencias» a les superfícies revisades segons Fase 7 §7, amb excepcions tècniques documentades. Banner «Tens una avaria?», horari, decoradors, quatre sectors i manteniment industrial coherents amb els canvis aprovats.
- [ ] Legals accessibles des del peu i del formulari, en els idiomes acordats i amb la revisió P6 registrada; l'aprovació editorial no equival al vistiplau de l'advocat.
- [ ] NAP (nom, adreça i telèfon) coherent entre web, dades estructurades i Perfil d'Empresa segons P7; no resoldre aquí l'adreça pendent.
- [ ] Teclat complet, ordre de focus, Escape al menú, noms accessibles, contrast, etiquetes, errors i moviment reduït revisats.
- [ ] P13: prova amb lector de pantalla recomanada segons FASE8 §8.4, citada al manual. Registrar resultat o pendent; aquesta recomanació no bloqueja per si sola la publicació ni implica publicar la declaració d'accessibilitat.

## 8. Criteris d'acceptació

**Bloquegen el tancament de P12:** prerequisits sense resoldre; versió no identificada; recorregut essencial inaccessible en un navegador de la matriu; desbordament que impedeix una acció; idioma publicat contrari a P2 o contingut essencial sense traduir; formulari sense recepció real confirmada, amb consentiment incorrecte o encara en demostració; descàrrega esperada absent sense acord; dades de contacte, legals o drets d'imatge pendents; errors de navegació o accessibilitat que impedeixen contactar.

**Es poden acordar per després del llançament:** ajustos cosmètics menors que no dificulten llegir, navegar ni enviar el formulari. Cal descriure cada incidència, impacte, responsable i termini, amb acceptació explícita del client i del director. No es poden reclassificar portes obligatòries com a millores posteriors. P13 continua recomanada segons el manual.

Resultats possibles a l'acta: acceptat, acceptat amb observacions no bloquejants acordades, o no acceptat. Només una confirmació real del client i del director sobre la versió identificada permet proposar el tancament de P12; preparar aquesta plantilla no el fa efectiu.

## 9. Plantilla d'acta d'acceptació

**Estat: Pendent**

Emplenar només després de la revisió efectiva. Els espais buits no acrediten data, assistència, resultat ni signatura.

| Camp | A emplenar |
|---|---|
| Data i hora de la revisió | |
| Client: nom i funció | |
| Director: nom i funció | |
| Altres participants | |
| URL permanent o previsualització revisada | |
| Identificador del deploy, branca i commit | |
| Entorn i prova final en producció `live` | |
| Decisió P2 i idiomes revisats | |
| Evidències dels prerequisits P1, P3, P5, P6 i P7 | |
| Dispositius, sistemes i versions dels navegadors | |
| Resultats i enllaços a evidències de cada secció | |
| Confirmació del client sobre descàrregues o llista esperada | |
| Referència de consulta, recepció i traça «Delivered» | |
| Resultat de l'acceptació | |
| Observacions i incidències bloquejants | |
| Ajustos posteriors acordats, responsables i terminis | |
| Estat o resultat de P13 | |
| Signatura o confirmació explícita del client, data i referència | |
| Signatura o confirmació explícita del director, data i referència | |

L'evidència per a P12 serà aquesta acta d'acceptació signada o amb confirmacions explícites traçables de totes dues parts. Fins aleshores, **P12: Pendent**.
