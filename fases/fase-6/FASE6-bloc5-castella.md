# Fase 6 · Bloc 5 · Versió en castellà

**Data:** 08/10/2026 (correccions del 09/10/2026) · **Estat:** implementat, revisat per Codex (també les correccions de l'apartat 7) i publicat a `revisio-client` el 09/10/2026 (apartat 9). Traduccions pendents d'aprovació i textos legals pendents de validació jurídica. Cap pàgina nova és indexable: les traduccions queden pendents d'aprovació.

**Decisió del director (08/10/2026):** el web es publica en **català i castellà des del primer dia**; l'**anglès queda ajornat**. Substitueix les propostes anteriors de llançament només en català i de redireccions provisionals. Actualitza la C11 del [pla d'acció](FASE6-pla-accio.md).

**Abast:**
- totes les rutes del llançament en castellà, amb la mateixa infraestructura i18n i les mateixes plantilles;
- català sense prefix i castellà amb `/es/` i slugs traduïts ([FASE5-idiomes](../fase-5/FASE5-idiomes.md));
- les interiors ajornades (Mobiliari i les quatre d'Industrial) no es creen.
- Els textos catalans aprovats no canvien.

---

## 1. Rutes

| Català | Castellà | Plantilla | Estat ES |
|---|---|---|---|
| `/` | `/es/` | Home | draft (noindex) |
| `/particulars/` | `/es/particulares/` | Particulars | draft |
| `/particulars/estructures/` | `/es/particulares/estructuras/` | Servei | draft |
| `/particulars/automatismes/` | `/es/particulares/automatismos/` | Servei | draft (amb el mateix `reviewNeeded` de marques de motor) |
| `/particulars/urgencies/` | `/es/particulares/urgencias/` | Servei | draft |
| `/particulars/projectes/` | `/es/particulares/proyectos/` | Portafoli | draft (en català està aprovada) |
| `/industrial/` | `/es/industrial/` | Industrial | draft |
| `/industrial/capacitats/` | `/es/industrial/capacidades/` | Capacitats | draft |
| `/contacte/` | `/es/contacto/` | Contacte | draft |
| `/legal/avis-legal/` | `/es/legal/aviso-legal/` | Legal | draft-review (pendent de validació jurídica) |
| `/legal/privacitat/` | `/es/legal/privacidad/` | Legal | draft-review |
| `/legal/cookies/` | `/es/legal/cookies/` | Legal | draft-review |
| 404 | `/es/404/` (Netlify la serveix a `/es/…` inexistents) | 404 | noindex |

Els sis casos de projecte són a `content/es/projects/`, en esborrany.

## 2. Contingut i interfície

- **`content/es/`:** traducció de cada pàgina, dels casos i del text de privacitat del formulari (`legal-formulari.md`). Conserva el significat, les dades (1989, 950 m², 12 persones, 6 furgonetes i 1 camió ploma, ISO 9001 en implantació, ISO 3834 en estudi, sectors, horari, zones de treball) i la diferenciació entre Particulars i Industrial. Cap text no s'ha allargat ni s'hi ha afegit cap dada.
- **Terminologia:**
  - **Noms:** la marca és «Serralleria Carbó» en tots dos idiomes. Les branques són «Particulares» i «Industrial»; el nom «Industrial» no canvia.
  - **Termes de cerca (SEO-F3):** «cerrajería» per a serralleria; «barandillas», «puerta de parking» i «según plano».
  - **Missatge d'Industrial:** «Fabricación en serie. Piezas exigentes. Respuesta industrial.».
- **`src/i18n/ui.ts`:** diccionari `es` amb navegació, botons, formulari, validacions, missatges, peu i textos d'accessibilitat. Els valors interns del formulari (`tipus`, `servei`) no es tradueixen.
  - Dos camps nous per idioma:
    - `routes`, amb les rutes que les plantilles enllacen directament. `BaseLayout` comprova al build que existeixin al contingut;
    - `language`, amb el codi, el nom i l'etiqueta del selector.
- **Formulari:** mateixes validacions i missatges en castellà. Continua sense enviar: l'avís «Formulario de demostración» i el missatge de no enviament es mantenen, sense cap estat d'èxit. Arribar des de `/es/industrial/` també obre la branca Empresa.

## 3. SEO dels dos idiomes

| Ruta | `<title>` (caràcters) | Descripció (caràcters) | Robots |
|---|---|---|---|
| `/es/` | Cerrajería en Vilafranca del Penedès \| Serralleria Carbó (56) | 135 | noindex |
| `/es/particulares/` | Cerrajería para particulares en Vilafranca \| Serralleria Carbó (62) | 153 | noindex |
| `/es/particulares/estructuras/` | Estructuras metálicas a medida \| Serralleria Carbó (50) | 130 | noindex |
| `/es/particulares/automatismos/` | Automatismos y motores para puertas \| Serralleria Carbó (55) | 130 | noindex |
| `/es/particulares/urgencias/` | Reparación de puertas en Vilafranca \| Serralleria Carbó (55) | 139 | noindex |
| `/es/particulares/proyectos/` | Proyectos de cerrajería reales \| Serralleria Carbó (50) | 156 | noindex |
| `/es/industrial/` | Fabricación metálica para terceros \| Serralleria Carbó (54) | 158 | noindex |
| `/es/industrial/capacidades/` | Soldadura y fabricación metálica \| Serralleria Carbó (52) | 138 | noindex |
| `/es/contacto/` | Contacto y presupuestos \| Serralleria Carbó (43) | 128 | noindex |
| `/es/legal/*` | Aviso legal · Política de privacidad · Política de cookies | 146–154 | noindex |

- **Idioma i canonical:** `lang="es"` i `og:locale` `es_ES`; canonical propi de cada pàgina, sense cap traducció canonitzada cap al català.
- **`hreflang` i sitemap:** només entre versions **aprovades i generades** (regla de [FASE5-indexacio](../fase-5/FASE5-indexacio.md)). Amb els estats actuals no se'n declara cap i el sitemap conserva les mateixes 4 URL.
  - **Prova en una còpia temporal**, aprovant Home, Industrial, Estructures i Projectes en tots dos idiomes:
    - el `<head>` declara `hreflang` ca/es recíproc, més `x-default` cap al català;
    - el sitemap inclou les alternatives `xhtml:link`;
    - `check:i18n` correcte.
  - El repositori no es va modificar.
- **Selector d'idioma** (capçalera, totes les pàgines):
  - enllaç a la mateixa pàgina en l'altre idioma, amb `hreflang`, `lang` i un nom accessible complet («ES Ver esta página en castellano»);
  - conserva els paràmetres `tipus` i `servei` i l'àncora;
  - a la 404 porta a la portada de l'altre idioma;
  - objectiu tàctil de 44 × 44 px, i 32 × 44 px per sota de 400 px.
- **Indexació de previsualitzacions:** no canvia. Tot build que no sigui la producció del domini definitiu porta `X-Robots-Tag: noindex`.

## 4. Textos legals

- **No hi ha cap versió castellana aprovada** al repositori: els textos de l'advocat lliurats el 06/10/2026 són en català.
- S'han preparat **traduccions fidels** de l'avís legal, la privacitat, les cookies i el text del formulari. Estat `draft-review` amb `publishReady: true`:
  - es mostren amb l'avís «Traducción pendiente de revisión jurídica» i amb `noindex`;
  - el peu castellà ja hi enllaça.
- **Cal la validació jurídica abans del llançament.** Els punts oberts del text català (empreses del grup, finalitats genèriques, domicili 59 / 59-61) també s'apliquen a la traducció. A més, l'advocat ha de confirmar la paraula «BAJA» per a la revocació, traduïda de «BAIXA».

## 5. Fitxers

| Fitxer | Canvi |
|---|---|
| `content/es/*.md`, `content/es/projects/*.md` (nous) | Contingut castellà |
| `src/pages/es/**` (nous) | Pàgines castellanes amb les plantilles existents; legals amb `src/i18n/legal.ts` |
| `src/i18n/ui.ts` | Diccionari `es`; `routes` i `language` també en català |
| `src/i18n/legal.ts` (nou) i `src/pages/legal/[page].astro` | Rutes legals per idioma |
| `src/templates/NotFoundTemplate.astro` (nou) i `src/pages/404.astro` | 404 compartida per idioma |
| `src/templates/*.astro` | Rutes de `ui.routes` en lloc de rutes catalanes escrites; `page` a la capçalera |
| `src/components/SiteHeader.astro` | Selector d'idioma i ajust de la capçalera per sota de 400 px |
| `src/layouts/BaseLayout.astro` | Comprovació de `ui.routes` contra el contingut |
| `src/config/routes.ts` | `isBuiltRoute`, rutes legals amb prefix i 404 per idioma fora de les rutes publicades |
| `src/templates/ContactTemplate.astro`, `src/scripts/contact-form.ts` | Ruta d'Industrial per idioma per triar la branca |
| `src/config/redirects.mjs`, `scripts/lib/redirect-plan.mjs`, `scripts/check-redirects.mjs`, `src/integrations/netlify-files.mjs` | Bloc 4: decisions R1–R6, `launchChecks` i 404 de `/es/…` |
| `scripts/check-i18n.mjs` (nou), `package.json` | `npm run check:i18n` |

## 6. Comprovacions (08/10/2026, build local)

| Comprovació | Resultat |
|---|---|
| `astro check` | 0 errors, 0 avisos |
| Build | 26 pàgines (13 en català i 13 en castellà) |
| `check:references` | Referències intactes; el contingut castellà consta com a contingut nou |
| `check:links` | 26 pàgines, 754 enllaços interns, tots els destins resolen. Sitemap: 4 URL |
| `check:redirects` | 21 regles llestes, cap pendent |
| `check:i18n` | Correcte. Va detectar i fer corregir les molles de pa de serveis, portafoli i legals, que portaven a la portada catalana |
| Encaix a 1440, 768, 390 i 320 px (23 pàgines dels dos idiomes) | Sense desbordament ni solapaments a la capçalera. Va detectar i fer corregir un desbordament de 3 a 11 px a 320 px causat pel selector. Els enllaços de la taula de cookies queden dins la taula desplaçable, igual que en català |
| Formulari en castellà | Errors i resum en castellà. Amb dades vàlides, el missatge diu que no s'ha enviat (no hi ha cap estat d'èxit). La privacitat enllaça `/es/legal/privacidad/`. La preselecció funciona per paràmetre (`?tipus=empresa&servei=peces`) i per origen (`/es/industrial/`) |
| Portafoli castellà | El filtre `?servei=automatismes` funciona; el selector el conserva |

**No comprovat:**
- desplegament a `revisio-client` i `check:redirects:live`, que esperen la revisió de Codex;
- lectors de pantalla;
- dispositius reals.

## 7. Correccions després de la revisió de Codex (09/10/2026)

Codex va revisar la implementació i va executar `verify`, `check:links`, `check:redirects` i `check:i18n`, amb resultat correcte. Va detectar dues correccions necessàries.

### 7.1 Textos alternatius

**Problema:** a `/es/industrial/` i `/es/particulares/proyectos/`, les fotografies informatives tenien l'`alt` en català. Venia de `src/config/photography.ts`.

**Correcció:**
- `projectPhotography[id].alt` passa a tenir un text per idioma (`{ ca, es }`). Els textos catalans no canvien.
- `projectPhotoAlt(id, locale)` torna el de l'idioma de la pàgina.
- Hi havia dos usos, i tots dos ja la fan servir: l'encàrrec real d'Industrial i els casos del portafoli.
- Les imatges decoratives conserven `alt=""` (escenari de la història de Particulars, portades, rajoles).

**Comprovat a l'HTML generat:**
- les cinc fotos del portafoli i la de l'encàrrec real porten l'`alt` castellà a `/es/…` i el català a les rutes catalanes;
- **`check:i18n`** ara falla si un `alt` no buit és idèntic a les dues versions d'una pàgina.

### 7.2 Selector d'idioma

**Problema:** els paràmetres `tipus` i `servei` i l'àncora només es copiaven en carregar la pàgina. Quan `portfolio.ts` canviava el filtre amb `replaceState`, el selector conservava l'estat inicial.

**Correcció a `SiteHeader.astro`:**
- **Sense JavaScript:** l'`href` sempre és la pàgina equivalent, i continua sent vàlid.
- **Amb JavaScript:** l'enllaç s'actualitza amb l'estat actual just abans de fer-lo servir: en passar-hi el punter, prémer-lo, rebre el focus, clicar (també amb el botó del mig) o obrir el menú contextual, i quan canvia l'àncora (`hashchange`).
  - La navegació continua sent nativa, inclosa l'obertura en una altra pestanya.
  - Els paràmetres que ja no hi són (filtre «Tots») es treuen.
- **Àncores:**
  - **Pàgines de plantilla:** les àncores són iguals en tots dos idiomes, i només es copien si existeixen a la pàgina actual.
  - **Pàgines legals:** les àncores surten dels títols del contingut i són diferents en cada idioma. L'equivalència es resol per la posició de cada apartat H2 i el mapa viatja a l'atribut `data-anchor-map`. Una àncora sense equivalent no es copia.

**Comprovacions noves:**
- **`check:i18n`** (estàtica, sobre `dist/`):
  - sense mapa, totes les àncores de la pàgina han d'existir a la de destí;
  - amb mapa, cada àncora i la seva equivalent han d'existir.
  - **Prova negativa:** amb un `alt` sense traduir, una àncora canviada i una àncora legal trencada introduïts a mà a l'HTML, en va detectar els tres errors.
- **`scripts/qa/check-language-switcher.py`** (navegador, Playwright, contra una previsualització): 10 casos, tots correctes el 09/10/2026.

| Cas | Resultat |
|---|---|
| Entrar a Projectes, canviar de filtre i després d'idioma (clic real) | Destí `/es/particulares/proyectos/?servei=automatismes`, amb el filtre actiu. Just abans del clic, l'`href` encara no tenia el filtre: el selector agafa l'estat en el moment d'usar-lo |
| Entrar amb `?servei=estructures`, triar «Tots» i canviar d'idioma | Destí `/particulars/projectes/`, sense el paràmetre |
| Navegar a `#contacte` després de carregar | Destí `/es/industrial/#contacte`; l'element existeix |
| Navegar a `#comunicacions` (avís legal) | Destí `/es/legal/aviso-legal/#comunicaciones`; l'element existeix |
| Àncora inexistent (legal i plantilla) | No es copia |
| Formulari amb `?tipus=empresa&servei=peces` | Destí `/es/contacto/?tipus=empresa&servei=peces`, branca Empresa |
| Ctrl+clic després de canviar el filtre | La pestanya nova obre `/particulars/projectes/?servei=estructures` |
| Menú contextual | L'`href` ja reflecteix el filtre actual |
| Sense JavaScript | `href="/es/particulares/proyectos/"` |

**Comprovacions del projecte (09/10/2026):**
- `verify`: 0 errors i referències intactes;
- `check:links`: 26 pàgines i 754 enllaços;
- `check:redirects`: 21 regles llestes;
- `check:i18n`: correcte.

**Fitxers d'aquesta correcció:** `src/config/photography.ts`, `src/templates/IndustrialTemplate.astro`, `src/templates/PortfolioTemplate.astro`, `src/components/SiteHeader.astro`, `scripts/check-i18n.mjs` i `scripts/qa/check-language-switcher.py` (nou).

### 7.3 Àncores mal codificades

Codex va verificar les correccions 7.1 i 7.2: `verify`, `check:i18n`, `check:links` i `check:redirects` passaven. Va reproduir un error addicional.

**Problema:** amb una àncora mal codificada, com `#100%`, `decodeURIComponent` llançava un `URIError` a l'script de la capçalera. L'script s'aturava abans d'inicialitzar el menú mòbil.

**Correcció a `SiteHeader.astro`:**
- la descodificació passa per `decodeHash`, que retorna una àncora buida si no es pot descodificar;
- el selector omet l'àncora invàlida del destí i la capçalera continua inicialitzant-se;
- les àncores vàlides, incloses les que tenen accents, es comporten igual que abans.

**Proves de navegador noves** a `scripts/qa/check-language-switcher.py`:

| Cas | Resultat |
|---|---|
| 8. Entrar a `/industrial/#100%` a 390 px (mòbil) | Cap error JavaScript a la pàgina d'entrada. El menú s'obre (`aria-expanded="true"`) i es tanca. El selector porta a `/es/industrial/` sense l'àncora |
| 9. Àncora vàlida amb accents (`#llei-aplicable-i-jurisdicció`) | Destí `/es/legal/aviso-legal/#ley-aplicable-y-jurisdicción`; l'element existeix |
| Prova negativa (sense la correcció) | El cas 8 falla amb «URI malformed» i el menú no s'obre: la prova detecta l'error |

**Resultat:**
- `check-language-switcher.py`: 12 de 12 correctes en tres execucions seguides;
- `verify`: 0 errors i referències intactes;
- `check:links`: 26 pàgines i 754 enllaços;
- `check:redirects`: 21 regles;
- `check:i18n`: correcte.

**Avís intermitent sense impacte funcional observat; origen pendent de confirmar:**
- **Què es va observar:** en 2 de 9 execucions completes de la prova, el navegador de proves va registrar «Transition was aborted because of invalid state. ViewTransition opt-in disabled» en navegar amb un toc.
- **Origen possible, no confirmat:** podria tenir relació amb les transicions entre documents de `styles/interactions.css` (`@view-transition { navigation: auto }`), però no s'ha demostrat.
- **Efecte:** cap. El menú i la navegació van funcionar en totes les execucions.
- **Reproducció:** cap vegada en 66 navegacions aïllades, amb el menú obert i tancat abans o sense, amb `#100%` o sense, i amb moviment normal o reduït.
- **Tractament a la prova:** el cas 8 separa els errors de la pàgina d'entrada (fan fallar la prova) d'aquest avís durant la navegació (es registra sense fer fallar la prova). Qualsevol altre error durant la navegació fa fallar la prova.
- **Pendent:** confirmar-ne l'origen en un bloc a part, si es vol.

**Revisió de Codex (09/10/2026):** favorable.
- **Va revisar:** el codi de la correcció i la reproducció acotada de l'error. `#100%` ja no interromp la inicialització de la capçalera i les àncores amb accents es conserven.
- **No va repetir:** les dotze proves de navegador de `check-language-switcher.py`. Els resultats d'aquesta taula són de l'execució de Claude.

## 8. Pendents

| Pendent | Qui |
|---|---|
| Revisió i aprovació de les traduccions de pàgines i casos. Fins llavors, `noindex` i fora del sitemap | Director o client |
| Validació jurídica dels textos legals castellans i del text del formulari | Client i advocat |
| Comprovació de campanyes a `/estructuras/` i `/motores/` | Client, abans del llançament |
| Decisió sobre les 12 fotografies antigues amb equivalent clar ([bloc 4](FASE6-bloc4-redireccions.md#2-fitxers-antics-de-wp-contentuploads)) | Director |
| Formulari operatiu (Fase 8, tasca 8.5) | Claude i director |
| Anglès | Ajornat |
