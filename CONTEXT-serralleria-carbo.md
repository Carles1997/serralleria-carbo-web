# CONTEXT DE PROJECTE — NOVA WEB SERRALLERIA CARBÓ

> Document de context per a IA (Claude Code / ChatGPT).
> Conté tota la informació necessària per produir aquest projecte.
> Llegir completament abans de proposar res. No inventar dades: tot el que no
> aparegui aquí com a pendent, preguntar o marcar com a placeholder.

**ESTAT ACTUAL DEL PROJECTE (v1.7 — 23 de setembre de 2026)**
- Fase 0 (context i setup): **TANCADA**. Auditoria completa de la web antiga feta — veure secció 8.
- Fase 1 (arquitectura): **TANCADA**. Sitemap i user journeys validats al document annex `FASE1-arquitectura-serralleria-carbo.md`.
- Fase 2 (marca i disseny): **TANCADA I VALIDADA PEL CLIENT**. Decisions congelades a `DESIGN.md` i `design/tokens.css`; prova visual a `FASE2-propostes/`.
- Fase 3 (continguts): **TANCADA PROVISIONALMENT PER AL PAS A FASE 4**, per decisió del director de projecte després de l'auditoria del català i de les correccions. Textos CA i mapa SEO per pàgina congelats com a base de disseny. Les dades i fotografies pendents, les versions ES/EN i els textos legals es completaran i validaran abans de publicar.
- Fase 4 (disseny UI): **OBERTA**. Preparar mockups de les plantilles clau a partir de l'arquitectura i del contingut català validat com a base.
- Fase 5 en endavant: no iniciades.

**Documents annexos d'aquest projecte:**
- `FASE1-arquitectura-serralleria-carbo.md` — sitemap definitiu, navegació i user journeys.
- `Mapa-redireccions-serralleriacarbo.xlsx` — inventari d'URLs antigues, contingut recuperat, projectes reals i notes d'auditoria.
- `DESIGN.md` i `design/tokens.css` — decisions de marca i sistema visual de la Fase 2.
- `FASE2-propostes/` — comparativa de direccions i prova funcional de la primera secció; les fotografies són conceptuals, no treballs reals.

---

## 1. Resum del projecte

Redisseny complet de la web corporativa de **Serralleria Carbó S.L.** (Vilafranca del Penedès, Barcelona), empresa del sector de la serralleria amb molts anys d'experiència, dedicada tradicionalment a projectes per a particulars, que ara inicia una **nova línia de producció industrial** (fabricació per a tercers).

Objectius principals:
1. Diferenciar clarament els dos àmbits (particular / industrial) dins d'una sola web.
2. Posicionar-se orgànicament per a ambdós públics (SEO estratègic).
3. Reflectir la capacitat real del taller (950 m² segons la dada més recent del client, equip propi) i la solvència de l'empresa.
4. Facilitar la conversió: contacte, formularis adaptats a cada públic.

Client actual: https://www.serralleriacarbo.com/ (web antiga, one-page, serveis genèrics sense jerarquia, sense cap entrada al client industrial).

**IMPORTANT — DISSENY**: aquest és un **redisseny complet des de zero**. No hi ha identitat visual prèvia que respectar: paleta, tipografies, estètica i sistema de disseny es definiran de nou a la Fase 2 i es validaran amb el client. NO proposis ni assumeixis colors, estils ni referències visuals heretades de cap material antic.

---

## 2. Decisions tècniques (JA TANCADES, no reobrir)

### 2.1 Stack

- **Framework: Astro** (+ Tailwind CSS).
  - Motiu: contingut estàtic majoritàriament, SEO central, zero JS per defecte, Content Collections per als textos multilingüe, optimització d'imatges integrada (`astro:assets`), i cicle de feedback ràpid amb IA.
  - Components React només si algun component requereix interactuïtat complexa (islands).
- **Contingut**: fitxers Markdown/MDX amb Astro Content Collections + validació Zod. Textos viuen a `content/{ca,es,en}/`.
- **Idiomes**: català, castellà i anglès. Rutes per idioma amb `astro:i18n` i hreflang complet.
- **Formulari**: serverless function o servei extern (decidir en Fase 5; candidats: Formspree, Web3Forms o endpoint propi).
- **Desplegament**: sortida estàtica a Vercel/Netlify/Cloudflare Pages. Domini existent del client.

### 2.2 Arquitectura de la informació (JA TANCADA)

Una sola web, **home amb fork**, dues branques en **subcarpetes** (NO subdominis).

Sitemap definitiu (tancat a la Fase 1 — veure document annex per als user journeys):

```
/                                    Home: fork dels dos àmbits + contingut SEO propi
/empresa/                            Qui som, taller, equip, trajectòria

/particulars/
    /particulars/urgencies/
    /particulars/estructures/
    /particulars/automatismes/
    /particulars/mobiliari/
    /particulars/projectes/          (5 casos reals recuperats de la web antiga)

/industrial/
    /industrial/capacitats/
    /industrial/sectors/
    /industrial/series-curtes/
    /industrial/proces/
    /industrial/projectes/           (1r cas real: "Gàbia" — 10 gàbies industrials)

/contacte/                           Formulari unificat (particular/empresa)
/legal/avis-legal/  ·  /legal/privacitat/  ·  /legal/cookies/
404 personalitzada (ha de respectar l'idioma actual)
```

Les quatre categories de particulars (Urgències, Estructures, Automatismes, Mobiliari) **no són inventades**: són les que l'empresa ja fa servir al desplegable del formulari de pressupost de la web antiga.

- La home és un **híbrid**: above the fold amb els dos camins (dos blocs/card grans: "Particulars" / "Carbó Industrial") + below the fold amb contingut propi per a SEO (qui som, anys d'experiència, dades del taller, sectors, tast de serveis, contacte).
- NO fer una landing pura de selecció: la home ha de capturar paraules clau genèriques i marca.
- Recordar l'elecció de l'usuari (localStorage) per prioritzar el seu àmbit en visites posteriors.
- Cada branca té navegació pròpia i identitat diferenciada (to, estructura, components) que es definirà de nou a la Fase 2. Enllaç discret a l'altre àmbit per si l'usuari s'ha equivocat.
- Carbó Industrial funciona com un microsite propi dins la web, amb arquitectura de marca mare/filla respecte a Serralleria Carbó.

### 2.3 Llenguatge de marca i to de veu

- **Serralleria Carbó** (mare): to proper, tranquil·litzador, experiència i confiança. Públic particular.
- **Carbó Industrial** (filial): to tècnic, directe, sense exageracions. Públic: fabricants, enginyeries, integradors. Missatge central del nou negoci: **"Sèries curtes. Peces exigents. Resposta industrial."**
- Contingut i dades del negoci industrial (què fabriquen, com treballen, capacitats, sectors, procés, certificacions en camí): extrets dels materials facilitats pel client; són informació factual, no directrius de disseny.

### 2.4 Dades reals de l'empresa (ús directe, no inventar res més)

- Fundació: **desembre de 1989**. Plantilla comunicada pel client: **12 persones**.
- Taller de fabricació: **950 m²** (dada del client de 23/09/2026; substitueix els 900 m² dels materials anteriors).
- Capacitats: ferro / acer al carboni, inoxidable 304/316 segons els materials previs, soldadura MIG/MAG i TIG. Maquinària comunicada pel client: **plegadora, cisalla i punxonadora**. No consten gruixos, longituds, toleràncies ni capacitats de màquina.
- Equip propi de soldadura i muntatge. Flota comunicada pel client: **6 furgonetes i 1 camió ploma**.
- Àmbit de treball comunicat pel client: Vilafranca del Penedès i rodalia (aproximadament el **95 %** de la feina dins d'uns **20 km** de Vilafranca); també fan feines fins a Barcelona, aproximadament a **50 km** del taller. Per a feines de sèries, poden valorar projectes de tot Catalunya. Són descripcions aproximades, no una promesa de cobertura o desplaçament per a qualsevol encàrrec.
- L'empresa havia disposat d'oficina tècnica i d'un arquitecte en plantilla. Ara externalitza el suport tècnic o d'arquitectura que requereixen alguns projectes industrials. **Es pot comunicar que valora projectes amb aquests requisits, però no presentar una oficina tècnica o un arquitecte com a recursos interns actuals.**
- Experiència industrial per sectors: alimentació, sanitari, packaging, cellers, seguretat/defensa i tecnologies duals.
- Procés de treball (per a la pàgina industrial): Definim → Preparem → Fabriquem → Comprovem.
- Certificacions en procés: implantació ISO 9001, estudi ISO 3834, digitalització i automatització de la soldadura (marcar com "en procés", no com a certificades).
- Contacte industrial: Jordi Mas · 605 779 694 · gerencia@serralleriacarbo.com · Vilafranca del Penedès.

**Dades de contacte generals (CONFIRMADES a l'auditoria de la Fase 0):**
- Adreça: Carrer d'Eugeni d'Ors, 59, 08720 Vilafranca del Penedès, Barcelona.
- Telèfon fix: 93 890 27 94 · Mòbil/WhatsApp: 630 661 908.
- **Telèfon principal de la nova web:** 630 661 908. Acció principal cap a WhatsApp amb missatge inicial preemplenat; el text exacte queda proposat a `content/ca/ui.md`. A Urgències també ha d'existir una acció de trucada directa, d'acord amb el user journey validat. El fix continua com a dada de contacte secundària. El contacte industrial de Jordi Mas continua separat.
- Correu general: carbo@serralleriacarbo.com.
- Raó social: Serralleria Carbó S.L.

**Encara PENDENT de client o per a una fase posterior:** marques de motors que instal·len; si l'alumini de la web antiga continua dins l'oferta actual; exemples de mobiliari; avís legal i privacitat; inventari i configuració finals de cookies; dades reals de Search Console/Analytics i estat de les campanyes antigues.

---

## 3. Estratègia SEO (MAPA EDITORIAL DE FASE 3 EN REVISIÓ)

> El mapa concret d'intencions i expressions candidates és a `SEO-F3.md`. L'assignació inicial a les pàgines aprovades es pot fixar ara; la prioritat i les variants s'afinaran amb dades reals de Search Console i Analytics quan hi hagi accés. Cap xifra de volum o posició s'ha inventat.

Línies mestres provisionals:
- Investigació de paraules clau per idioma, agrupades per intenció i per àmbit.
- Exemples orientatius PENDENTS DE VALIDAR — Particular: "serralleria Vilafranca", "reparació portes", "baranes", "automatismes". Industrial: "fabricació sèries curtes", "subcontractació soldadura", "peces inox 304/316".
- Cada branca optimitza les seves famílies de paraules clau; la home captura el genèric i la marca.
- Metadades per pàgina i idioma, dades estructurades Schema.org (LocalBusiness + Organization), sitemap multilingüe amb hreflang, canonicals.
- Redireccions 301 des de les URLs antigues abans de la publicació (mapa complet al full de càlcul annex).
- **SEO local**: el Google Business Profile ja existeix i té ressenyes. És un actiu que no es pot reconstruir — no crear-ne mai un de nou, i afegir la divisió industrial com a servei i categoria secundària dins la fitxa existent. Nom, adreça i telèfon han de coincidir exactament entre la web i la fitxa.

---

## 4. Full de ruta de producció (ordre estricta)

**Regla d'or: mai passar a la fase següent sense una base congelada i validada.** El 23/09/2026, el director de projecte autoritza el pas a Fase 4 amb els textos catalans auditats i el mapa SEO com a base congelada de treball. Aquesta acceptació provisional no equival a aprovació per publicar: les traduccions ES/EN, les dades i fotografies pendents i els textos legals continuen al registre de pendents i s'han de completar abans de les fites que els necessitin i, en tot cas, abans de publicar.

| Fase | Contingut | Eina principal | Lliurable / validació |
|---|---|---|---|
| 0. Context i setup | Recollir materials, crear aquest CONTEXT, configurar repo Git, scaffold Astro + Tailwind | Tu + Claude Code | Repo amb CONTEXT.md |
| 1. Arquitectura | Sitemap definit, user journeys (particular urgència, particular projecte, industrial), jerarquia de navegació | ChatGPT (analista) + tu (decisor) | Sitemap validat per client |
| 2. Marca i disseny | Nova identitat visual des de zero: concepte, paleta, tipografies, sistema de components, tokens de disseny, to de veu per àmbit | ChatGPT + tu | DESIGN.md + tokens (CSS/Tailwind) validats |
| 3. Continguts | Textos de totes les pàgines en català + mapa de paraules clau per pàgina; traduccions ES/EN i legals pendents registrats | ChatGPT (redactor) + tu (editor) | Base CA i SEO auditada i acceptada provisionalment per iniciar F4; validació final de tots els idiomes i legals abans de publicar |
| 4. Disseny UI | Mockups de les 4-5 plantilles clau (home amb fork, home industrial, serveis, contacte, particular) + sistema de components | ChatGPT (prompts) + tu | Mockups validats per client |
| 5. Desenvolupament | Ordre: setup i18n → design system de components → pàgines (home → particulars → industrial → serveis → contacte → legals) → formularis | Claude Code | Web funcional |
| 6. SEO tècnic i analítica | Metadades, Schema.org, sitemap/hreflang, Google Analytics, Search Console | Claude Code + configuració | Indexació verificada |
| 7. QA i optimització | Lighthouse, imatges AVIF/WebP, lazy loading, QA manual (3 idiomes, formularis, responsive real, enllaços) | Claude Code + tu | Aprovació pre-publicació |
| 8. Publicació | Desplegament, domini, SSL, 301s, revisió final | Tu | Web en viu + factura final |

---

## 5. Normes de treball amb IA

### 5.1 Claude Code (producció)

- Treballar en **petites tasques concretes** per sessió ("crea el component Card de servei seguint aquest disseny"), mai "fes-me la web".
- **Revisar cada diff abans de confirmar** (git add selectiu). Mantenir l'arquitectura neta.
- Desar els prompts que funcionin a `PROMPTS.md` per reutilitzar-los entre pàgines i idiomes.
- Prova visual cada 2-3 components (mòbil inclòs). No acumular deute visual.

### 5.2 ChatGPT (estratègia, contingut, investigació)

- Sempre enganxar el context rellevant (aquest document) a l'inici de cada conversa.
- Generar contingut secció a secció, pàgina a pàgina. Tu com a editor: corregir, humanitzar i validar.
- **Les dades concretes (telèfons, noms, xifres, certificacions) sempre teves o del client; la IA mai les inventa.**
- Traduccions ES/EN a partir dels textos catalans validats.
- SEO: la investigació i assignació de paraules clau s'ha de contrastar amb la IA i validar-se abans d'implementar (veure secció 3).

### 5.3 General

- Tu ets el director de projecte i el filtre de qualitat. Les IA produeixen; tu decideixes i valida.
- El client valida: sitemap (F1), marca i disseny (F2), textos (F3), mockups (F4) i pre-publicació (F7).

---

## 6. Materials pendents del client (checklist)

**Accessos** (com a administrador; el domini i els comptes són propietat del client)
- [ ] Domini: accés al registrador (panell DNS). Atenció: no tocar els registres MX sense confirmar on està allotjat el correu corporatiu.
- [ ] WordPress actual (admin) i proveïdor d'allotjament
- [ ] Google Analytics (GA4 ja existent: GT-T9H3C3ZW) i Search Console
- [ ] Google Business Profile — la fitxa ja existeix i té ressenyes: NO crear-ne una de nova mai
- [ ] Microsoft Clarity (ja actiu: qzba4vnwtv)
- [ ] Google Ads / Meta Ads — confirmar si hi ha campanyes actives apuntant a /estructuras/ o /motores/

**Materials i dades**
- [ ] Fotografies del taller, l'equip i treballs industrials (les de particulars ja recuperades de la web antiga)
- [x] Any de fundació i àmbit geogràfic d'actuació (dades rebudes el 23/09/2026)
- [x] Confirmar la situació de l'oficina tècnica i l'arquitecte: suport extern per als projectes industrials que el requereixin
- [ ] Confirmar si els treballs en alumini continuen formant part de l'oferta actual
- [ ] Marques de motors que instal·len (per a /particulars/automatismes/)
- [x] Telèfon principal a mostrar: 630 661 908, vinculat a WhatsApp amb missatge inicial
- [ ] Textos legals: avís legal i política de privacitat (només existeix la de cookies)
- [ ] Traduccions ES/EN si es contracten a part (sinó, cobertes per aquest projecte)
- [ ] Validació de cada fase dins dels terminis acordats

---

## 7. Abast del pressupost (referència)

Total: **2.000 € + IVA** — Identitat i llenguatge de marca (350 €) · Estratègia i arquitectura web (200 €) · Disseny i desenvolupament web a mida (950 €) · SEO estratègic (300 €) · Analítica Google (80 €) · Rendiment i optimització (70 €) · Publicació (50 €).

Pagament: 40 % a la confirmació / 60 % a la publicació. Oferta vàlida fins al 22 d'octubre de 2026.

**No inclòs**: funcionalitats no descrites, fotografia professional, textos legals, costos recurrents (allotjament, domini, llicències), publicitat de pagament, manteniment posterior.

---

## 8. Auditoria de la web antiga (Fase 0 — TANCADA)

Resultats de l'inventari complet de `serralleriacarbo.com`. Detall complet al full de càlcul annex.

**Pila tècnica antiga:** WordPress 6.9 + Elementor + Hello Elementor + Yoast SEO + Contact Form 7 + TranslatePress + CookieYes + Site Kit by Google.

**URLs:** 15 al sitemap, només 7 amb contingut real (`/`, `/projectes/`, `/contacte/`, `/pressupost/`, `/legal/`, `/estructuras/`, `/motores/`). La resta són plantilles per defecte de WordPress/Elementor a redirigir o donar de baixa.

**Troballes rellevants:**
- `/estructuras/` i `/motores/` són **landings de Google Ads** en castellà, òrfenes (no enllaçades des de cap menú). Confirmar amb el client si hi ha campanyes actives abans de tallar-les.
- Es van recuperar **6 projectes reals amb fotos i descripció** (català i castellà): passarel·la interior, gàbia, ascensor, porta pàrquing, persianes de negoci, baranes interior de casa. Cinc van a `/particulars/projectes/`; el de la **gàbia va a `/industrial/projectes/`** (confirmat pel client).
- El web actual **només està en català** de facto: les pàgines principals no tenen hreflang ni versió alternativa real. Només les dues landings d'Ads tenen TranslatePress amb versió a `/cat/`.
- Els `<title>` actuals són genèrics ("HOME - Serralleria Carbó") i **totes les metadescripcions estan buides**. Marge de millora SEO immediat.
- El formulari antic de pressupost ja incloïa **adjunt de fitxer** i un desplegable amb les 4 categories de servei — la funcionalitat del formulari nou no és cap novetat per al client.

**Identificadors a conservar o migrar:** GA4 `GT-T9H3C3ZW` · GTM `GTM-TXQ24TCC` · Clarity `qzba4vnwtv` · reCAPTCHA v3.

---


*Document de context v1.7 — 23 de setembre de 2026. Referència de projecte: SC-2026-01.*
*Canvis respecte a v1.6: tancament provisional de la Fase 3 i obertura de la Fase 4 per decisió del director de projecte, amb pendents previs a la publicació registrats. No s'ha alterat el sitemap validat.*
