# Fase 6 · Proposta de skills SEO

**Data:** 08/10/2026 · **Abast:** recerca i proposta. No s'ha instal·lat cap skill ni s'ha modificat el projecte, el DNS, l'analítica ni la producció.

**Fonts:**
- [Pla d'acció de la Fase 6](FASE6-pla-accio.md);
- [auditoria SEO del 02/10/2026](auditoria-seo/FULL-AUDIT-REPORT.md);
- documents de les fases 7 i 8 que afecten contingut, rutes, privacitat o publicació;
- configuració SEO del projecte: `astro.config.mjs`, `src/config/routes.ts`, `src/config/redirects.mjs`, `src/pages/sitemap.xml.ts` i `src/pages/robots.txt.ts`;
- el registre skills.sh (consultat amb `npx skills find`) i el `SKILL.md` de cada repositori candidat a GitHub. Les estrelles, llicències i dates venen de l'API de GitHub (08/10/2026).

**Conclusió:** no cal instal·lar cap skill nova. claude-seo (ja instal·lat) i els scripts del projecte cobreixen sis de les vuit necessitats. Les altres dues depenen d'accessos del client, no de skills.

## 1. Què ja tenim i què falta

| Necessitat | Ja ho cobreix | Què falta |
|---|---|---|
| 1. Auditoria tècnica en Astro | `seo-technical`, `seo-sitemap` i `seo-audit` de claude-seo. Al projecte: `npm run verify`, `check:links`, `check:redirects`, el sitemap filtrat per `isPublishedRoute`, el `noindex` dels esborranys i `dist/_redirects`. | Rastrejar el domini definitiu després del llançament. |
| 2. Paraules clau i intenció (CA/ES) | `seo-cluster` i `seo-sxo` per a la intenció. Les dades reals de cerca són a [FASE6-gbp-termes-cerca.csv](FASE6-gbp-termes-cerca.csv). | Volums de cerca: cal el Keyword Planner (compte de Google Ads) o DataForSEO (de pagament). |
| 3. SEO editorial | `seo-page`, `seo-content` i `seo-content-brief` per a títols, descripcions, H1, enllaçat intern i canibalització. | Res. |
| 4. SEO local i GBP | `seo-local` (NAP, ressenyes, categories) amb les CSV de GBP. | Accés de gestor al perfil de Google Business Profile. Cap skill fiable usa l'API de GBP. `seo-maps` necessita DataForSEO. |
| 5. Dades estructurades | `seo-schema`. Al projecte: `StructuredData.astro` i `BreadcrumbData.astro`. | Validar al Rich Results Test un cop publicat (tasca B3). |
| 6. Rendiment i Core Web Vitals | `seo-performance`, `seo-unlighthouse` i `seo-images`. Les mesures de laboratori ja s'han fet a la Fase 7. | Dades de camp: clau d'API per a PSI/CrUX (D7) i trànsit real. |
| 7. Search Console i mesura de conversions | `seo-google` (GSC, CrUX, GA4) i el connector `seo-matomo`. | La propietat de Search Console (D4). Cap analítica sense el bàner de consentiment (tasca 8.7). |
| 8. Migració des de WordPress | `src/config/redirects.mjs` + `check-redirects`, les dades de rastreig a `auditoria-seo/web-actual/raw` i `seo-drift` per comparar abans i després. | No hi ha cap skill de migració WordPress → Astro de qualitat. Queda pendent la decisió C2 (410 o redirecció). |

**Parts de claude-seo que no s'han d'usar en aquest projecte:**
- `seo-programmatic` i `seo-competitor-pages`: generen pàgines en massa.
- `seo-image-gen`: genera imatges conceptuals, que no es poden presentar com a obra real.
- Els connectors de pagament (Ahrefs, Moz, Firecrawl, SE Ranking, Profound): s'han de deixar sense configurar.
- El hook `validate-schema.py` no està registrat a la configuració de Claude i ha de continuar així.

claude-seo té disponible la versió 2.4.2 (publicada el 04/10/2026; instal·lada: 2.4.1). No s'ha actualitzat en aquesta tasca.

## 2. Candidates

| Skill | Font | Utilitat concreta | Requisits i riscos | Limitacions | Solapament | Veredicte |
|---|---|---|---|---|---|---|
| `jdevalk/skills@astro-seo` | github.com/jdevalk/skills (105★, MIT, últim canvi 07/2026) | Auditoria en 9 blocs pensada per a Astro | Es basa en el paquet `@jdevalk/astro-seo-graph`: dependència nova, IndexNow, llms.txt, targetes MCP/A2A | Força un stack propi; el projecte ja té el seu | Alt amb `seo-technical` i `seo-schema` | No instal·lar. Els blocs es poden usar com a llista de revisió manual. |
| `coreyhaines31/marketingskills@seo-audit` | github.com/coreyhaines31/marketingskills (53,7K★, MIT, actiu) | Llista d'auditoria clara, amb una bona secció de hreflang i canibalització | Només instruccions; no executa scripts | Genèrica, gens local | Alt amb `seo-audit` de claude-seo | Opcional com a segona opinió; no aporta res nou. |
| `coreyhaines31/marketingskills@site-architecture` | mateix repositori | Jerarquia i enllaçat intern | Només instruccions | Està pensada per replantejar l'arquitectura, que aquí ja està validada | `seo-cluster` | Descartada: risc d'obrir debats ja tancats. |
| `coreyhaines31/marketingskills@schema` | mateix repositori | Guia de JSON-LD | Només instruccions | Bàsica | `seo-schema` | Descartada: duplicada. |
| `coreyhaines31/marketingskills@analytics` | mateix repositori | Pla d'esdeveniments per a GA4 i GTM | Només instruccions | No tracta el consentiment ni el RGPD | `seo-google` | Descartada: va contra les condicions de la Fase 8. |
| `addyosmani/web-quality-skills@core-web-vitals` | github.com/addyosmani/web-quality-skills (2,9K★, MIT, 08/2026) | Separa bé les dades de camp de les de laboratori i diagnostica LCP, INP i CLS | Només instruccions; opcionalment usa Chrome DevTools MCP | No té apartat específic per a Astro | Parcial amb `seo-performance` | Complement opcional. |
| `cloudflare/skills@web-perf` | github.com/cloudflare/skills (3K★, Apache-2.0) | Auditoria de rendiment amb traces | Necessita Chrome DevTools MCP (`npx chrome-devtools-mcp@latest`) | Implica una configuració MCP nova | Igual que l'anterior | Descartada: massa infraestructura per al que aporta. |
| `every-app/open-seo@local-seo` | github.com/every-app/open-seo (22,7K★, MIT) | Auditoria de GBP i graella de posicions a Maps | MCP d'OpenSEO; cada punt de la graella és una crida de pagament | Envia dades del negoci a un servei extern | `seo-local` i `seo-maps` | Descartada: cost i enviament de dades a tercers. |
| `kostja94/marketing-skills@google-search-console` | github.com/kostja94/marketing-skills (1K★, MIT, 10/2026) | Interpretar els informes de Search Console i llista de revisió mensual | Només instruccions | Només serveix quan GSC ja té dades | Parcial amb `seo-google`, que obté les dades però no guia la lectura | Opcional després del llançament. |
| `squirrelscan/skills@audit-website` | github.com/squirrelscan/skills (97★) | Rastreig amb més de 260 regles | Binari extern de squirrelscan.com; el bucle de correccions edita codi automàticament | Pocs avals | `seo-technical` | Descartada. |
| `samber/cc-skills@site-launch-checklist` | github.com/samber/cc-skills (228★, MIT) | Llista de comprovació de llançament | Proposa instal·lar altres paquets de skills | Recomana pàgines d'alternatives, plantilles a l'engròs i rànquings «best of», i té una part legal pensada per a França (CNIL) | Delega l'SEO a claude-seo | Descartada: inclou pràctiques de contingut massiu. |

Les candidates que surten al registre però queden fora, sense revisar-les a fons:
- `coreyhaines31/marketingskills@programmatic-seo`: és creació massiva de pàgines.
- `calm-north/seojuice-skills`, `jezweb/claude-skills` i `indranilbanerjee/digital-marketing-pro`: tenen pocs avals o volen eines externes.
- `payloadcms/skills@cms-migration`: és per a Payload, no per a WordPress.

## 3. Selecció mínima recomanada

1. **claude-seo (ja instal·lat)**, limitat a aquestes sub-skills: `seo-technical`, `seo-sitemap`, `seo-page`, `seo-content`, `seo-cluster`, `seo-schema`, `seo-local`, `seo-performance`, `seo-images`, `seo-drift` i `seo-google`.
2. **Els scripts del projecte** com a porta obligatòria abans de cada canvi: `npm run verify`, `npm run check:links` i `npm run check:redirects`.
3. **Opcional, només si es vol:** `addyosmani/web-quality-skills@core-web-vitals` quan tinguem dades de CrUX, i `kostja94/marketing-skills@google-search-console` per a la revisió mensual. Totes dues són només text: no executen scripts, no demanen credencials i no envien dades.

La raó: qualsevol altra opció duplica claude-seo, afegeix dependències o costos, o empeny cap a pàgines que el projecte ha descartat.

## 4. Ordre d'ús dins la Fase 6

| Pas | Moment | Eina | Resultat esperat |
|---|---|---|---|
| 0 | Ara | Revisió manual | Corregir el pla de Fase 6, que té punts desfasats (vegeu l'apartat 6). |
| 1 | Abans de publicar, sobre la previsualització | `seo-technical` + `seo-sitemap` + scripts | Informe de canonical, robots, sitemap, 404 i redireccions. Les correccions es fan amb el flux normal. |
| 2 | Abans de publicar | `seo-page`, `seo-content` i `seo-cluster` sobre `content/ca/` | Una paraula clau principal per ruta, i títols, descripcions i H1 revisats. Mapa de canibalització entre Particulars i les seves subpàgines i entre Industrial i Capacitats. Sense pàgines noves ni textos més llargs. |
| 3 | Abans de publicar | `seo-schema` | LocalBusiness i BreadcrumbList revisats. Validació al Rich Results Test un cop publicat (B3). |
| 4 | Abans de canviar el DNS | `seo-drift`, referència de la web WordPress | Llista d'URL valuoses i comprovació que cadascuna redirigeix bé (decisió C2). |
| 5 | Llançament | Search Console, sense skill | Propietat verificada, sitemap enviat i inspecció de les URL clau. |
| 6 | Entre 2 i 4 setmanes després | `seo-google` (GSC, CrUX), `seo-drift` comparant, `seo-audit` | Nova auditoria (B5) i comparació amb el 71/100 del 02/10/2026. |
| 7 | Cada mes | `seo-local` amb l'export de GBP (B6) | Seguiment de ressenyes, categories i coherència del NAP. |

## 5. Accessos i decisions del client

**Imprescindibles**
- **Search Console:** propietat de domini, amb un registre TXT al DNS de mayasystems.net (D4), o que ens afegeixin com a propietaris.
- **Google Business Profile:** accés de gestor.
- **Dades d'empresa i GBP:**
  - adreça: «59» o «59-61» (C5);
  - telèfon principal (C3);
  - categories de GBP (C4, C6).
- **Redireccions:**
  - 410 per a les plantilles de WordPress;
  - què fem amb `/estructuras/` i `/motores/` (C2).
- **Llançament:** data i domini (D5), i quan es poden fer indexables les rutes comercials.

**Recomanats (gratuïts)**
- Clau d'API de Google Cloud per a PSI i CrUX (D7).
- Compte OAuth o de servei per a l'API de Search Console (nivell 1 de claude-seo).

**Opcionals**
- GA4 o Matomo, sempre amb bàner de consentiment i bloqueig previ (tasca 8.7). Search Console, en canvi, no necessita cookies.
- Compte de Google Ads per al Keyword Planner, per tenir volums en català i castellà.
- DataForSEO, de pagament per consulta.
- Bing Webmaster Tools.

## 6. Punts desfasats del pla d'acció

Cal corregir aquests punts de [FASE6-pla-accio.md](FASE6-pla-accio.md) abans d'usar-lo:
- C1 compta Empresa com a pàgina aprovada, i C10 hi proposa enllaços. La pàgina s'ha retirat i ara redirigeix a `/`.
- D1.1 i D1.9 descriuen el perfil de GBP amb «sèries curtes». El missatge vigent és «Fabricació en sèrie. Peces exigents. Resposta industrial.»
- A6 encara esmenta plantilles de la pàgina d'Empresa.
