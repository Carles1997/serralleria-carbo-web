# Fase 6 · Pla d'acció SEO

**Data:** 02/10/2026 · **Fonts:**
- [Dades del Perfil d'Empresa](FASE6-dades-google-business-profile.md);
- [auditoria SEO](auditoria-seo/FULL-AUDIT-REPORT.md);
- [mapa de redireccions](../fase-5/FASE5-redireccions.md);
- [pendents de la Fase 5](../fase-5/FASE5-pendents.md).

Aquest document és el pla de referència de la Fase 6 i substitueix l'[ACTION-PLAN.md](auditoria-seo/ACTION-PLAN.md) de l'auditoria, que queda com a foto del 02/10/2026. Les accions es divideixen en quatre blocs, segons qui les pot fer:

| Bloc | Qui | Estat |
|---|---|---|
| **A** | Desenvolupament (Claude), sense validació perquè no toca continguts ni dades validades | Implementat el 02/10/2026 |
| **B** | Claude, però **després del desplegament** a Netlify | Pendent del desplegament |
| **C** | **Decisions del director o del client** abans d'implementar-les | Pendent de validació |
| **D** | Accions **directes al Perfil d'Empresa**, a Search Console o a Netlify, que ha de fer el client o el director amb el seu accés | Pendent |

Prioritats:
- **P0:** abans de publicar el web nou.
- **P1:** primera setmana.
- **P2:** primer mes.
- **P3:** quan hi hagi temps.

---

## A. Implementat per Claude (02/10/2026)

Tot passa `npm run verify` (0 errors) i `npm run check:redirects`.

| # | Acció | Fitxers | Detall |
|---|---|---|---|
| A1 | **Fitxer de redireccions de Netlify, generat** | `src/integrations/netlify-files.mjs`, `scripts/lib/redirect-plan.mjs`, `scripts/check-redirects.mjs`, `astro.config.mjs` | El build escriu `dist/_redirects` només amb les regles **llestes** del mapa (9: quatre 301 i cinc 410). El validador i el generador comparteixen l'avaluació, i el validador falla si el fitxer generat no coincideix amb el mapa. Les regles en espera o per decidir hi entraran soles quan es resolguin. |
| A2 | **`/legal/` torna a «en espera»** | `src/config/redirects.mjs` | Ara que les pàgines legals es generen com a esborrany en revisió jurídica, la regla sortia com a llesta. Se li afegeix el requisit de la Fase 5: la política de cookies ha d'estar aprovada. |
| A3 | **Capçaleres de Netlify** | `public/_headers` | `/_astro/*` amb memòria cau d'un any i `immutable`. A totes les respostes: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` i `Permissions-Policy`. La CSP queda per al bloc B. |
| A4 | **Open Graph i targeta social** | `src/layouts/BaseLayout.astro`, `public/og/serralleria-carbo.png`, `scripts/make-og-image.py` | `og:type`, `og:site_name`, `og:locale`, `og:title` i `og:description` (els mateixos que el SEO), `og:url`, `og:image` amb mides i text alternatiu, i `twitter:card`. La imatge per defecte és el logotip sobre el color paper del sistema visual. No fa servir cap foto. Les imatges per branca són la decisió C9. |
| A5 | **`LocalBusiness` complet** | `src/components/StructuredData.astro`, `src/config/site.ts` | S'hi afegeixen l'horari (dilluns a divendres, de 08:00 a 13:00 i de 15:00 a 18:00; validat i coincident amb el Perfil d'Empresa), les coordenades de la fitxa verificada, `hasMap` i `sameAs` amb l'enllaç estable de la fitxa (`?cid=`), i `logo`/`image`. No hi ha ressenyes, valoracions ni zones de servei. |
| A6 | **`BreadcrumbList`** | `src/components/BreadcrumbData.astro` i plantilles de servei, portafoli, capacitats i empresa | Té els mateixos elements que les molles de pa visibles. |
| A7 | Documentació | `fases/fase-5/FASE5-redireccions.md` | S'hi anota que el fitxer de Netlify ja es genera i que falta comprovar el 410 en el primer desplegament. |

---

## B. Per a Claude, després del desplegament a Netlify

| # | Prio. | Acció | Com |
|---|---|---|---|
| B1 | P0 | ~~Comprovar les redireccions al staging~~ **Fet el 05/10/2026:** quatre 301 en un sol salt i cinc 410. Les regles en espera o per decidir responen 404, com estava previst | Demanar cada URL antiga a `serralleriacarbo.netlify.app`: estat 301 o 410, capçalera `Location` i cap cadena. Si Netlify no serveix el 410 amb la reescriptura, documentar-ho i proposar una alternativa (Fase 5). |
| B2 | P0 | ~~Comprovar les capçaleres~~ **Fet el 05/10/2026:** `/_astro/*` amb memòria cau `immutable` d'un any i les quatre capçaleres de seguretat | `curl -I` a una pàgina i a un fitxer de `/_astro/`: memòria cau `immutable` i capçaleres de seguretat. |
| B3 | P1 | Validar les dades estructurades i l'Open Graph | Prova de resultats enriquits de Google i depurador de previsualització de Facebook sobre el staging. Comprovar també una previsualització real a WhatsApp. |
| B4 | P2 | Content-Security-Policy | Redactar una CSP amb hashes dels scripts inserits i amb l'origen del mapa de Google sota demanda. Provar-la primer en mode `Report-Only` al staging i activar-la quan no hi hagi bloquejos. |
| B5 | P1 | Repetir l'auditoria SEO | Amb claude-seo, quan els continguts estiguin aprovats (C1), per confirmar la indexació, el sitemap i la puntuació. |
| B6 | Continu | Tall mensual del Perfil d'Empresa | Al principi de cada mes, afegir a `FASE6-gbp-metriques.csv` les interaccions, trucades, indicacions, clics i cerques del mes anterior. Cal accés al compte des de Chrome. El panell només deixa veure sis mesos i, en castellà, les pestanyes no es carreguen: s'ha d'obrir amb `hl=en`. |

---

## C. Decisions del director o del client

Cada decisió indica la proposta concreta i què passa després. Quan estigui validada, la implementació la fa Claude, tret que s'indiqui el contrari.

### C1 · P0 · Aprovar els continguts que es publicaran indexables (director)

**Situació:** 8 de 10 pàgines són `status: draft` i porten `noindex`. Si el web es publica així, Google deixaria d'indexar la Home i els serveis del domini.

| Pàgina | Fitxer | Estat |
|---|---|---|
| Home | `content/ca/home.md` | draft |
| Particulars | `content/ca/particulars.md` | draft |
| Estructures | `content/ca/particulars-estructures.md` | draft |
| Automatismes | `content/ca/particulars-automatismes.md` | draft |
| Urgències | `content/ca/particulars-urgencies.md` | draft |
| Industrial | `content/ca/industrial.md` | draft |
| Capacitats | `content/ca/industrial-capacitats.md` | draft |
| Contacte | `content/ca/contacte.md` | draft |
| Empresa | `content/ca/empresa.md` | approved |
| Projectes | `content/ca/particulars-projectes.md` | approved |

**Cal decidir:** quines pàgines s'aproven per al llançament, d'acord amb els pendents de [FASE5-pendents.md](../fase-5/FASE5-pendents.md).

**Després:** Claude canvia `status` i registra la revisió validada a `check-references`, i el sitemap les inclou automàticament.

### C2 · P0 · Redireccions pendents (director i client)

1. **Plantilles de WordPress** (`/sample-page/`, `/hello-world/`, `/category/uncategorized/`).
   - **Proposta:** 410, perquè no tenen contingut i SEO-F3 demana no enviar-les a la Home.
   - **Cal:** confirmar-ho.
2. **`/estructuras/` i `/motores/`** (antigues landings en castellà).
   - **Cal:** el client ha de dir si hi ha campanyes de Google Ads o Meta que hi apuntin.
   - **Opcions del director:**
     - a) publicar abans les versions ES;
     - b) 302 temporal a les pàgines catalanes i 301 quan existeixi la versió ES;
     - c) acceptar un 404 temporal.
   - **Proposta:** b), si no es pot fer a).

### C3 · P1 · Telèfon principal (client)

| Lloc | Telèfon |
|---|---|
| Web i schema | Mòbil 630 661 908 (principal) i fix com a segon contacte |
| Perfil d'Empresa i directoris | Fix 93 890 27 94 |

En els últims sis mesos, el perfil ha generat 278 trucades.

- **Cal decidir:** quin número ha de ser el principal a tot arreu.
- **Proposta:** el mateix número com a principal al web, a l'schema i al Perfil d'Empresa, i l'altre com a secundari. El Perfil d'Empresa admet números addicionals.
- **Després:** Claude ajusta `src/config/site.ts` si cal, i el client ho canvia al perfil (D1.3).

### C4 · P1 · Venda de material al taulell (client)

El 74 % de les cerques que mostren el perfil són «ferreteria», probablement per la categoria «Proveedor de metales».

- **Cal confirmar:** l'empresa ven material o ferreteria al públic?
  - **Sí:** mantenir la categoria i valorar si el web ho ha d'explicar. Això seria contingut nou, i caldria la validació del director.
  - **No:** treure «Proveedor de metales» del perfil (D1.2).

### C5 · P1 · Adreça oficial (client)

eInforma dona «Calle Eugeni d'Ors, 59 - 61» com a domicili social. El web i el Perfil d'Empresa diuen «59».

- **Cal confirmar:** l'adreça que s'ha de fer servir a tot arreu.
- **Si és «59 - 61»:** Claude actualitza `site.ts` i els textos que la mostren, i el client actualitza el perfil.

### C6 · P1 · Categories del Perfil d'Empresa (client, amb el director)

**Actual:**
- Principal: «Carpintería metálica y de aluminio».
- Secundàries: «Erector de acero», «Proveedor de metales», «Fabricante de estructuras metálicas» i «Empresa de armaduras y ferrallas».

**Proposta:**
1. **Afegir** categories que descriguin serveis que l'empresa fa realment: portes i automatismes, serralleria o metal·listeria, soldadura.
   - Al camp de categoria del perfil, escriure «puertas», «garaje», «automáticas», «metalistería», «soldad» i «herrer» i triar de la llista de Google les que encaixin exactament.
   - Google només admet les seves categories, i els noms exactes s'han de comprovar al desplegable.
2. **No fer servir** «Cerrajero»: Google l'associa a obertura de panys i còpia de claus, i porta trucades que no corresponen.
3. **Revisar:**
   - «Proveedor de metales», segons C4;
   - «Empresa de armaduras y ferrallas», que és armadura de formigó: només s'ha de mantenir si l'empresa en fa.
4. **Categoria principal:** mantenir-la o canviar-la per la que descrigui millor la feina principal. **Un canvi de categoria principal pot fer variar la visibilitat durant unes setmanes:** fer-lo amb el web nou ja publicat.

### C7 · P1 · Ressenyes: respondre-les i demanar-ne de noves (client)

Hi ha 58 ressenyes, cap de respondre i només 3 en 12 mesos. Les respostes les ha de publicar el client, perquè són comunicació en nom de l'empresa. Les propostes de text són a D2.

**Cal validar:** el to de les respostes i qui les signa (per exemple, «L'equip de Serralleria Carbó»).

### C8 · P2 · Títols d'Industrial (director)

| Pàgina | Títol actual | Proposta | Caràcters |
|---|---|---|---|
| `/industrial/` | Fabricació metàl·lica per a tercers \| Industrial | Fabricació metàl·lica per a tercers \| Serralleria Carbó | 55 |
| `/industrial/capacitats/` | Capacitats de soldadura i fabricació \| Industrial | Capacitats de soldadura i fabricació \| Serralleria Carbó | 56 |

**Motiu:** als resultats de Google la marca és el que es reconeix i el que es busca (61 cerques amb el nom i l'adreça, 44 de «carbo»).

**Després:** Claude canvia el `seoTitle` i registra la revisió.

### C9 · P2 · Imatges per compartir per branca (director)

Ara hi ha una imatge per defecte amb el logotip. **Proposta:** una per branca, feta amb fotos d'obra real ja validades:

- **Particulars:** passarel·la interior o baranes, de Projectes.
- **Industrial:** les deu gàbies, si es pot ensenyar.

**Cal:** triar les fotos. Claude prepara les imatges de 1200 × 630 i les assigna per branca.

### C10 · P2 · Enllaços cap a `/empresa/` (director)

Ara només hi enllacen dues pàgines. **Proposta:** afegir «Empresa» als enllaços del peu de pàgina. És un canvi d'estructura visible.

### C11 · P2 · Versió en castellà (director)

Està prevista al contracte i18n i resoldria `/estructuras/` i `/motores/` (C2). Al perfil hi ha cerques en castellà («herrero vilafranca», «herreros en vilafranca del penedes», «vigas acero vilafranca», «duplicado de llaves vilafranca del penedes»).

**Cal:** validar la traducció de Particulars, Estructures i Automatismes (FASE5-idiomes.md).

### C12 · P2 · Ampliar les pàgines curtes amb dades reals (client i director)

Les pàgines de servei tenen entre 176 i 262 paraules. Per ampliar-les sense inventar res, cal que el client respongui:

1. Quins tipus de porta i de motor instal·leu i repareu habitualment: batents, corredisses, basculants, seccionals, enrotllables o persianes?
2. Treballeu amb alguna marca de motor que vulgueu esmentar?
3. A quins municipis treballeu habitualment, a part de Vilafranca?
4. Feu manteniment de portes de comunitats o pàrquings (revisions periòdiques)?
5. Com és el procés de pressupost: visita, terminis orientatius i forma de lliurament?
6. Quines formes de pagament accepteu?
7. Quines preguntes us fan més sovint els clients per telèfon?
8. Feu duplicats de claus o venda de comandaments? Al perfil hi ha cerques d'aquest tipus i ressenyes sobre comandaments.

Amb les respostes, el director valida el text i Claude el maqueta. Una secció de preguntes freqüents reals ajuda també a les cerques amb IA.

### C13 · P2 · Ressenyes al web (client)

**Proposta:** citar 3 o 4 ressenyes reals del Perfil d'Empresa amb el permís dels autors, amb el nom de pila o les inicials i un enllaç a la fitxa. No es marcarien amb schema de valoració, perquè Google no admet ressenyes pròpies.

### C14 · P3 · `alt` de les fotos d'obra real (director)

Les imatges amb `alt` buit són decoratives o conceptuals i no s'han de presentar com a obra real. Quan arribin les fotos definitives d'obra real, cal confirmar quines ho són, i Claude hi posarà un `alt` descriptiu.

### C15 · P3 · Pàgina de Facebook (client)

Hi ha una pàgina «serralleria carbo» amb 2 «m'agrada».

- **Cal decidir:** mantenir-la i actualitzar-la, o tancar-la.
- **Si es manté activa:** s'afegeix a `sameAs` i al perfil (D1.6).

---

## D. Accions directes al Perfil d'Empresa, Search Console i Netlify

Les ha de fer el client o el director amb el seu accés. Claude no hi fa canvis. Si el client ho demana i dona permís explícit per a cada acció, Claude pot fer els canvis del Perfil d'Empresa des de Chrome.

**Com s'hi arriba:** cerca «Serralleria Carbó» a Google amb el compte de l'empresa, i al bloc «La teva empresa a Google» fes clic a **Editar perfil**. També es pot fer des de l'app de Google Maps, a **Tu perfil de empresa**.

### D1 · Fitxa del perfil

**D1.1 · P1 · Descripció.** Editar perfil → Información → Descripción. Proposta de 652 caràcters (el màxim és 750), feta només amb textos validats del web:

> Serralleria Carbó és una empresa de Vilafranca del Penedès fundada el 1989. Des del nostre taller de 950 m² fabriquem i instal·lem portes, baranes, escales, passarel·les, estructures metàl·liques i automatismes per a habitatges, comunitats i negocis, i reparem portes, persianes i motors. Amb Industrial, la nostra línia de fabricació per a tercers, fem peces, carros i conjunts metàl·lics en sèries curtes: acer al carboni i inox 304/316, soldadura MIG/MAG i TIG, plegat, cisallat i punxonat. Treballem sobretot a Vilafranca i la rodalia i fins a Barcelona; per a sèries industrials valorem encàrrecs d'arreu de Catalunya. Som un equip de 12 persones.

Google no hi admet enllaços, preus ni promocions. **Validació:** director (text) i client (publicació).

**D1.2 · P1 · Categories.** Editar perfil → Información → Categoría empresarial. Aplicar la decisió C6 (i C4).

**D1.3 · P1 · Telèfons.** Editar perfil → Contacto → Número de teléfono. Aplicar la decisió C3. Afegir el segon número a «Otros números de teléfono».

**D1.4 · P0 · Lloc web.** Editar perfil → Contacto → Sitio web.
- **Ara:** canviar `http://serralleriacarbo.com/` per `https://www.serralleriacarbo.com/`. Ja és l'adreça final del web actual i estalvia dues redireccions.
- **Quan hi hagi Analytics:** posar `https://www.serralleriacarbo.com/?utm_source=google&utm_medium=organic&utm_campaign=perfil-empresa`, per separar el trànsit del perfil de la resta.

**D1.5 · P1 · Data d'obertura.** Editar perfil → Información → Fecha de apertura → **desembre de 1989** (dada validada a `content/ca/empresa.md`).

**D1.6 · P3 · Perfils socials.** Editar perfil → Contacto → Perfiles sociales. Només els perfils que es mantinguin actius (C15).

**D1.7 · P1 · Horaris especials.** Editar perfil → Horario → Horario especial. Afegir els festius en què el taller tanca (Google suggereix el 12 d'octubre). **Cal:** el calendari de festius del client.

**D1.8 · P2 · Atributs.** Editar perfil → Más. Ara estan tots buits. Omplir només els que el client confirmi:
- Pagaments: formes acceptades.
- Accessibilitat: entrada accessible amb cadira de rodes, només si és cert.
- Aparcament, si n'hi ha al costat del taller.
- Opcions de servei: servei a domicili, pressupostos.

**D1.9 · P2 · Serveis.** Editar perfil → Editar servicios → Añadir servicio personalizado. Ara no n'hi ha cap. Proposta, amb textos dels serveis validats del web (cada descripció ha de fer menys de 300 caràcters):

| Servei | Descripció proposada |
|---|---|
| Portes i automatismes | Fabriquem, motoritzem i reparem portes i accessos de garatge, pàrquing i negoci. |
| Reparació de portes i motors | Si una porta, una persiana o un motor ha deixat de funcionar, truca'ns i explica'ns què ha passat. |
| Baranes, escales i passarel·les | Fabriquem i instal·lem baranes, escales i passarel·les metàl·liques a mida de cada espai. |
| Estructures metàl·liques a mida | Estructures per a habitatges, comunitats i negocis, com la d'un ascensor en una comunitat. |
| Carros industrials | Carros adaptats a una necessitat concreta, d'una unitat o en sèrie. |
| Mobiliari amb estructura metàl·lica | Mobiliari a mida de l'ús i de l'espai. Explica'ns la peça. |
| Fabricació per a tercers en sèries curtes | Peces, carros i conjunts metàl·lics en sèries curtes per a fabricants, enginyeries i integradors. |
| Soldadura MIG/MAG i TIG | Acer al carboni i inox 304/316, amb equip propi de soldadura i muntatge. |
| Plegat, cisallat i punxonat | Taller de 950 m² amb plegadora, cisalla i punxonadora. |
| Estructures per a constructores i promotores | Escales, baranes i estructures per a ascensors en projectes de gran escala. |

**Validació:** director (text) i client (servei real). Si es confirma C12.8 (duplicats o comandaments), s'hi pot afegir.

**D1.10 · P2 · Fotos.** Fotos i vídeos → Añadir fotos. Ara n'hi ha 8 i el logotip, sense portada ni exterior.
1. **Foto de portada:** una obra real representativa.
2. **Exterior:** façana del taller amb el rètol, perquè la gent el reconegui en arribar (222 peticions d'indicacions en sis mesos).
3. **Interior del taller:** maquinària, soldadura.
4. **Equip treballant,** amb el permís de les persones.
5. **Obres recents,** una o dues al mes.

Han de ser fotos reals i pròpies, sense imatges generades ni de catàleg.

**D1.11 · P3 · Productes.** Ara no n'hi ha. Només té sentit si C4 confirma venda al taulell o si es vol presentar comandaments o portes com a producte.

### D2 · Ressenyes (P1)

**Respondre:** Leer reseñas → Sin respuesta → Responder. Propostes de text, a validar a C7. **No s'han de discutir els fets en públic ni donar dades del client.**

| Ressenya | Proposta de resposta |
|---|---|
| 1★, juny del 2026 (terminis) | «Gràcies pel comentari. Lamentem que la feina no s'ajustés al termini que esperava. Ens agradaria parlar-ne amb vostè directament per entendre què va passar: pot trucar-nos al 93 890 27 94 o escriure a carbo@serralleriacarbo.com. L'equip de Serralleria Carbó.» |
| 1★ sense text, gener del 2026 | «Gràcies per la valoració. Si ens vol explicar què no va anar bé, ens pot trucar al 93 890 27 94 o escriure a carbo@serralleriacarbo.com i ho mirarem. L'equip de Serralleria Carbó.» |
| 5★ (amb text o sense) | «Moltes gràcies per la confiança i per la valoració. Ens alegra que hàgim pogut ajudar-lo. L'equip de Serralleria Carbó.» Personalitzar-la amb el tipus de feina quan la ressenya el mencioni (porta de pàrquing, escala, balcó…). |
| 4★, febrer del 2025 (balcó) | «Gràcies per explicar la seva experiència amb la reparació del balcó. Ens alegra que poguéssim trobar una solució. L'equip de Serralleria Carbó.» |
| Negatives antigues (2018–2023: comandaments, trucades, terminis) | Resposta breve, d'agraïment i amb invitació a contactar, com la de la primera fila. Començar per les més visibles a Maps: les de comandaments del 2022 i el 2023 i la de terminis del 2020. |

Si el número principal canvia (C3), s'ha d'actualitzar a les respostes.

**Demanar ressenyes:**
1. Al bloc del perfil: **Pedir una reseña** → copiar l'enllaç o el codi QR.
2. Enviar-lo quan s'acabi una feina, per WhatsApp o per correu. Missatge proposat: «Hola, som de Serralleria Carbó. Gràcies per confiar en nosaltres. Si està content amb la feina, ens ajudaria molt que deixés una valoració a Google: [enllaç]. Moltes gràcies.»
3. **No** oferir res a canvi, **no** demanar només valoracions positives i **no** publicar ressenyes en nom de clients. Ho prohibeixen les normes de Google.
4. **Objectiu orientatiu:** 2 o 3 ressenyes noves al mes. La competència visible al perfil en té 125 (Cerrajería Masip, 4,9) i 54 (Metálicas Urbano, 4,6).

### D3 · Publicacions (P2)

Publicaciones → Crear publicación. Ara no n'hi ha cap. **Proposta:**
- una publicació per cada projecte aprovat de Projectes (cinc), amb la foto real i el text validat del projecte, i l'enllaç a la pàgina del projecte quan el web estigui publicat;
- després, una al mes amb una obra recent.

### D4 · Search Console (P0, abans del llançament)

1. Obrir https://search.google.com/search-console amb el compte de l'empresa → Añadir propiedad → **Dominio** → `serralleriacarbo.com`.
2. Google dona un registre **TXT**. Demanar a **mayasystems.net** que l'afegeixi al DNS del domini.
3. Quan estigui verificat:
   - **Rendimiento:** fins a 16 mesos de consultes, clics i posicions del web actual. És l'any complet que el panell del perfil no dona.
   - Al llançament, enviar `https://www.serralleriacarbo.com/sitemap.xml` a **Sitemaps** i seguir **Páginas** i les URL redirigides.
4. Donar accés de lectura al director del projecte (Configuración → Usuarios y permisos). Claude ho pot consultar llavors des del navegador, o amb l'API si es configura.

### D5 · Netlify (P0)

1. **Branca de producció.** ~~Ha de ser `main`.~~ **Fet el 05/10/2026:** publicava des de `fase-5/base-astro`, una branca esborrada de GitHub després de la fusió. Ara és `main` i s'ha desplegat `main@d88c140`. Cada fusió a `main` es publica automàticament.
2. **Ordre de build.** `npm run build`, directori de publicació `dist`. El fitxer `_redirects` el genera el build.
3. **Domini, al llançament.**
   - Domain management → Add domain → `www.serralleriacarbo.com`, com a domini principal.
   - A **mayasystems.net**, els registres DNS que indiqui Netlify (normalment un CNAME de `www` cap al lloc de Netlify i el domini arrel cap a Netlify).
   - Comprovar que el certificat HTTPS s'emet i que `serralleriacarbo.com` redirigeix a `https://www.`.
4. **Formularis.** Netlify Forms (límit de 8 MB). Prova d'enviament real abans del llançament (pendent de la Fase 5).

### D6 · Directoris (P2)

Quan hi hagi les decisions C3 i C5, unificar el nom «Serralleria Carbó», l'adreça i el telèfon a:
- QDQ: «Serrallería Carbo, S.L.», adreça sense número;
- eInforma: «59 - 61»;
- Empresite;
- Comga;
- DatosCif.

Cada directori té un formulari de correcció o de reclamació de la fitxa. Totes les dades han de coincidir amb el Perfil d'Empresa i el web.

### D7 · Clau d'API de Google (P3)

Google Cloud Console → crear un projecte → activar **PageSpeed Insights API** i **Chrome UX Report API** → Credenciales → **Clave de API**. Passar-la al director per configurar-la a claude-seo (`~/.config/claude-seo/`). Així les auditories tindran dades de PageSpeed i, quan el domini tingui trànsit, dades de camp de CrUX.

---

## Resum per prioritat

| Prioritat | Claude | Director | Client |
|---|---|---|---|
| **P0** | B1, B2 (després del desplegament) | C1, C2 | D1.4, D4, D5 |
| **P1** | B3, B5 | C3–C7 (amb el client) | D1.1–D1.3, D1.5, D1.7, D2 |
| **P2** | B4 | C8–C12 | D1.8–D1.10, D3, D6 |
| **P3** | B6 (mensual) | C14 | C13, C15, D1.6, D1.11, D7 |
