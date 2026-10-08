# Fase 6 · Bloc 2 · Rendiment mòbil

**Data:** 08/10/2026 · **Aprovació:** director, 08/10/2026 (diagnòstic i millora del rendiment mòbil; actualització de `revisio-client`).

**Abast:**
- Home i Industrial;
- sense canvis de textos, de disseny aprovat, de qualitat d'imatge, de DNS, de producció ni d'analítica.

**Antecedent:** [FASE6-bloc1-resultats.md](FASE6-bloc1-resultats.md#rendiment) (LCP mòbil de 6,5 s a la Home i 4,2 s a Industrial, mesura sense repeticions controlades).

**Revisió independent:**
- **Codex, codi d'aquest bloc:** favorable (08/10/2026). Ha contrastat les medianes desades i ha executat `verify`, `check:links`, `check:redirects` i `check:redirects:live`. No ha repetit la validació visual ni les proves en dispositius reals.
- **Codex, commit `1ad0bf2` (bloc 1):** continua pendent.

**Abast de les conclusions:** totes les xifres d'aquest document són de **laboratori**, amb una màquina de mesura de variabilitat alta. Serveixen per comparar versions en les mateixes condicions i per confirmar causes. **No garanteixen** aquests temps en mòbils reals, que només es podran conèixer amb dades de camp (CrUX) o amb proves en dispositius.

---

## 1. Mètode de mesura

| Element | Valor |
|---|---|
| Eina | Chromium de Playwright, Python, amb l'entorn de claude-seo. Script [`scripts/perf/lab-mobile.py`](../../scripts/perf/lab-mobile.py); resum de traces amb [`scripts/perf/trace-summary.py`](../../scripts/perf/trace-summary.py). No és Lighthouse. |
| Dispositiu simulat | Emulació mòbil de Chromium: 390 × 844, densitat 2×, tàctil |
| CPU | 4 vegades més lenta (`Emulation.setCPUThrottlingRate`) |
| Xarxa | 1,6 Mbps de baixada, 750 kbps de pujada, 150 ms de latència |
| Memòria cau | Desactivada, amb un context nou a cada execució (primera visita) |
| Moviment | Sense preferència de reducció, tret de la variant «moviment reduït» |
| Escriptori | 1440 × 900, sense limitació de CPU ni de xarxa |
| Adreça | `revisio-client` i enllaços permanents de cada desplegament (porten `noindex`) |
| Màquina | Ordinador Windows del projecte, amb altres processos actius |

**Mètriques:**
- TTFB, FCP i LCP de l'API de rendiment;
- element LCP;
- final de la descàrrega del recurs LCP;
- suma de tasques llargues (més de 50 ms);
- CLS;
- pes transferit.

Es presenten la mediana, el mínim, el màxim i el rang interquartílic (RIQ).

**Laboratori i dades reals.** Són mesures sintètiques de laboratori, útils per comparar versions en condicions iguals. No són dades d'usuaris reals:
- no hi ha dades de camp (CrUX), perquè la web nova no té trànsit públic;
- tampoc no hi ha accés a Search Console (vegeu l'apartat 6).

Les xifres absolutes depenen de la màquina. La comparació vàlida és la que es fa entre versions mesurades en la mateixa sessió.

---

## 2. Mesura de referència (abans)

7 execucions per pàgina en mòbil, 5 en escriptori. Valors en ms.

| Pàgina | FCP mediana (mín–màx, RIQ) | LCP mediana (mín–màx, RIQ) | Tasques llargues | CLS | Element LCP |
|---|---|---|---|---|---|
| Home, mòbil | 4056 (2932–6556, 1168) | 6316 (4124–8852, 2396) | 1588 | 0 | `img` de l'accés de Particulars (`home-particulars-acces-v2…avif`) |
| Industrial, mòbil | 3972 (2228–8432, 1880) | 3972 (2228–8432, 1880) | 4181 | 0 | `img` de l'entrada (`industrial-series-hero-v1-llum…avif`) |
| Home, escriptori | 336 (272–484) | 1232 (404–1424) | 0 | 0 | `img` de l'accés de Particulars |
| Industrial, escriptori | 404 (256–816) | 516 (340–860) | 0 | 0–0,002 | `img` de l'entrada |

**Observat a cada execució:**
- **Recursos:** el recurs LCP acaba de baixar molt abans del pintat: Home cap a 1,25 s i Industrial cap a 0,9 s (medianes). La font acaba entre 1,0 i 1,5 s, i el CSS entre 0,6 i 0,9 s. El TTFB és d'uns 240 ms, amb una execució anòmala de 3,6 s a la Home.
- **Retard:** tot el retard és de renderització, després de la descàrrega.

---

## 3. Diagnòstic

### 3.1 Traces del fil principal

| Pàgina | Observat a la traça (primera execució) |
|---|---|
| Industrial | Una sola tasca de **2.479 ms**: l'avaluació d'un mòdul (`v8.evaluateModule` 2.471 ms). Conté 1.592 ms de `Layout` i 845 ms de recàlcul d'estils, abans del primer pintat. Un segon `Layout` de 728 ms coincideix amb l'arribada de la font. |
| Home | Cap script no hi té un pes rellevant. El primer cicle de renderització fa 2.465 ms (`Layout` 1.566 ms, d'estils 546 ms); un segon `Layout` de 922 ms coincideix amb l'arribada de la font. |
| Pàgina legal (control) | També té 892 ms de `Layout` i 500 ms d'estils en fred, amb la mateixa limitació. |

**Mesura en calent** (sense limitació, en forçar un layout a una pàgina ja carregada): 1–2 ms a totes les pàgines (278–361 elements).

**Conclusió:** el cost alt és el **primer layout en fred**, que inclou la primera forma del text i la càrrega de fonts, i és comú a totes les pàgines en aquest entorn. Sobre aquesta base, hi ha feina pròpia de cada pàgina.

### 3.2 Experiments comparatius

Les variants s'han injectat **només al navegador de prova**, sense tocar el codi.

| Pàgina | Variant | N | FCP mediana | LCP mediana | Tasques llargues | Lectura |
|---|---|---|---|---|---|---|
| Industrial | base | 7 | 3972 | 3972 | 4181 | — |
| Industrial | sense `series.ts` (es treu `[data-series]` abans dels scripts) | 7 | 2796 | 2796 | 1163 | **Causa confirmada:** l'script del mètode de sèries afegeix uns 3 s de tasques llargues i 1,2 s a l'LCP |
| Home | base | 7 | 4056 | 6316 | 1588 | — |
| Home | sense l'ocultació de `[data-reveal]` | 7 | 4224 | 4224 | 1722 | **Causa confirmada:** l'accés de Particulars, amagat fins que el JavaScript el revela, endarrereix l'LCP uns 2,1 s respecte al primer pintat |
| Home | sense l'animació del titular (`title-rise`) | 5 | 4480 | 6580 | 1193 | Sense efecte. **Descartat** |
| Home | sense cap animació | 5 | 4092 | 4092 | 1918 | LCP = FCP. Confirma que només en pesa l'ocultació |
| Home | moviment reduït | 5 | 3028 | 3044 | 1322 | Coherent amb l'anterior |
| Home | només «Carbo Text» i `sans-serif` (sense les reserves) | 5 | 4080 | 6292 | 1683 | Sense efecte. **Descartat** |
| Home | `text-wrap: wrap` a tot arreu | 5 | 4156 | 6556 | 1881 | Sense efecte. **Descartat** |

### 3.3 Causes confirmades i hipòtesis

**Confirmades:**
1. **Industrial (`src/scripts/series.ts`).** En carregar-se, cridava `update()` de manera síncrona. En mòbil, el bucle alternava lectures de geometria (`getBoundingClientRect` i `getComputedStyle(…, '::before')`) amb escriptures (classes `is-visible` i `is-lit`, propietat `--fill`). Cada lectura després d'una escriptura forçava un recàlcul de tota la pàgina, abans del primer pintat i en un bloc que és molt per sota de la primera pantalla.
2. **Home (accés de Particulars).** L'element LCP portava `data-reveal="clip"`, amb `opacity: 0` fins que el mòdul de moviment s'executava i l'IntersectionObserver el revelava. En un mòbil lent, això arribava uns 2 s després del primer pintat.

**Hipòtesis no confirmades (no s'hi actua):**
- El cost del primer layout en fred i del segon layout en arribar la font (`font-display: swap`) sembla, sobretot, de l'entorn (fonts del sistema Windows i Chromium d'escriptori amb limitació).
  - En un Android real podria ser diferent. Només es pot confirmar amb dades de camp o amb un dispositiu real.
  - Canviar `font-display` afectaria la identitat tipogràfica en primera visita: no s'ha fet.
- La variabilitat alta entre execucions (RIQ d'1 a 3 s en mòbil) s'atribueix a la càrrega de la màquina de mesura.

---

## 4. Correccions

| Fitxer | Canvi | Què es preserva |
|---|---|---|
| `src/scripts/series.ts` | (1) Totes les lectures de geometria es fan abans de cap escriptura. (2) El mètode no es prepara fins que és a menys d'una pantalla de distància (IntersectionObserver amb `rootMargin: 100%`). Fins llavors es veu en l'estat complet, que és l'estat sense JavaScript. | Mateixos llindars, mateixa línia que avança amb el desplaçament, mateixos nodes que s'encenen. Mateix comportament amb moviment reduït |
| `src/templates/HomeTemplate.astro` | L'accés de Particulars ja no porta `data-reveal`. La seva entrada, la mateixa que abans (fos de 520 ms, fotografia que s'assenta en 900 ms, textos escalonats), comença amb CSS des del primer pintat. | Disseny, textos, imatges, hover i focus. Amb moviment reduït no hi ha animació. L'accés d'Industrial conserva la revelació |

**No s'ha afegit:**
- cap dependència;
- cap precàrrega nova: les dues imatges d'accés ja tenien `fetchpriority="high"` i una precàrrega;
- cap canvi a les fonts, al CSS global ni a les animacions que no causen el problema (titular de la Home, entrades d'Industrial, revelacions de la resta de seccions).

**Efecte acceptat:** a 320 × 568, l'accés d'Industrial queda per sota de la primera pantalla. Conserva la seva revelació en entrar-hi, com fins ara.

---

## 5. Verificació

### 5.1 Abans i després en sèries separades

Mateix banc i mateixa adreça (`revisio-client`), abans i després del desplegament. 7 execucions en mòbil i 5 en escriptori. Valors en ms.

| Pàgina | FCP abans → després | LCP abans → després | Tasques llargues abans → després | CLS |
|---|---|---|---|---|
| Home, mòbil | 4056 → 4172 | **6316 → 5184** | 1588 → 1787 | 0 → 0 |
| Industrial, mòbil | 3972 → 4112 | 3972 → 4112 | **4181 → 2108** | 0 → 0 |
| Home, escriptori | 336 → 300 | 1232 → 1212 | 0 → 0 | 0 → 0 |
| Industrial, escriptori | 404 → 584 | 516 → 608 | 0 → 0 | 0,002 → 0 |

Traça posterior d'Industrial: l'avaluació del mòdul passa de 2.471 ms a 1 ms. Hi continuen els dos layouts en fred (primer pintat i arribada de la font).

**Limitació:** les sèries separades no són prou fiables. La velocitat de la màquina va canviar durant la sessió: la mateixa pàgina passa d'un primer pintat d'1 s a 4 s en execucions consecutives. Per això la comparació de referència és l'alternada (5.2).

### 5.2 Comparació alternada

*Resultats de laboratori, amb variabilitat alta entre execucions: indiquen la direcció i la mida aproximada de la millora en aquestes condicions, no el temps que veurà un usuari real.*

**Mètode:** 9 parells en mòbil. A cada parell es carrega la versió anterior i després la nova, amb el mateix perfil, servides alhora pels seus enllaços permanents de Netlify:
- anterior: `6ac7c5f61c87bfb3d522a1ec--…`;
- nova: `6ac7d8655525ba2ffb1897a2--…`.

Els dos enllaços porten `noindex`. Valors en ms.

| Pàgina | Mètrica | Anterior, mediana (mín–màx) | Nova, mediana (mín–màx) | Parells en què millora la nova |
|---|---|---|---|---|
| Home | LCP | 3060 (1156–5548) | **1476** (1072–4404) | 6 de 9 |
| Home | LCP − FCP | 1008 | **264** | — |
| Home | FCP | 2052 (1060–3768) | 1236 (1032–3472) | 6 de 9 |
| Industrial | Tasques llargues | 549 (369–2506) | **309** (190–2136) | **9 de 9** |
| Industrial | LCP (= FCP) | 1296 (1088–3536) | 1248 (1040–3988) | 4 de 9 (sense diferència apreciable) |

Durant la sèrie, la màquina va passar d'un estat lent (parells 1 a 4, primer pintat de 2 a 4 s) a un de ràpid (parells 5 a 9, uns 1,1 s).

**Lectura dels resultats:**
- **Home:**
  - en estat lent, la separació entre el primer pintat i l'LCP baixa d'1,0–1,8 s a 0,9–1,0 s;
  - en estat ràpid, passa de 0,1–0,3 s a 0,04–0,26 s;
  - l'element LCP continua sent l'accés de Particulars.
- **Industrial:**
  - la feina bloquejant baixa en tots els parells;
  - l'LCP no canvia de manera apreciable. Ara el limiten els dos layouts en fred, l'inicial i el de l'arribada de la font (vegeu 3.3), que no depenen d'aquest canvi.

**Separació que queda a la Home: hipòtesi parcialment confirmada.** El fos de la targeta comença amb opacitat 0. Chromium no compta l'element per a l'LCP fins al fotograma en què ja és visible, i en un mòbil lent aquest fotograma queda darrere el layout de l'arribada de la font.

**Prova alternada** (7 parells, versió nova amb fos i sense fos de la targeta, en estat ràpid): separació mediana de 184 ms amb fos i 68 ms sense; millora en 5 de 7 parells. En estat lent no s'ha pogut mesurar.

**Decisió del director (08/10/2026): es conserva el fos d'opacitat actual.** No es modifiquen més animacions ni es repeteixen mesures sense una nova causa concreta.

### 5.3 Altres comprovacions

| Comprovació | Resultat |
|---|---|
| Regressió visual: primera pantalla de la Home i d'Industrial, després de 2,5 s, anterior i nova. 1440 × 900, 768 × 1024, 390 × 844 i 320 × 568, amb moviment normal i reduït | **0 píxels de diferència** a les 16 combinacions. Sense desbordament horitzontal |
| Estat de les targetes d'accés | Particulars: animació `reveal-fade` aplicada sense `is-revealed`, opacitat final 1. Industrial: revelació igual que abans (a 320 × 568, sota la primera pantalla, continua oculta fins que s'hi arriba, com abans). Amb moviment reduït, cap animació |
| Mètode de sèries (estats de classes i `--fill` / `--series-progress` a 390 i 1440 px, en sis posicions de desplaçament) | **Idèntics** a partir del moment que el mètode és a 1,2 pantalles o menys. En carregar la pàgina, la versió nova encara no l'ha preparat i el mostra complet, molt per sota de la pantalla |
| CLS | 0 en totes les execucions de les dues versions, en mòbil i escriptori |
| `npm run verify` (astro check, build, check-references) | 0 errors; referències intactes |
| `npm run check:links` i `npm run check:redirects` | Correctes |
| `npm run check:redirects:live` a `revisio-client` després del desplegament | Correcte, amb `X-Robots-Tag: noindex` |
| Previsualització | `revisio-client` actualitzada amb el desplegament `6ac7d8655525ba2ffb1897a2`, sense `--prod` |

**No comprovat:**
- dispositius reals (Android o iPhone);
- Safari;
- dades de camp;
- PageSpeed Insights (sense clau i sense poder-lo executar al navegador integrat).

---

## 6. Search Console i dades reals

El director no té accés a Search Console (08/10/2026). Això no bloqueja aquest bloc.

**El que sabem i el que no:**
- **Sense accés, no podem consultar** consultes, pàgines d'entrada, clics ni els informes d'indexació i Core Web Vitals del web actual. Això no vol dir que aquestes dades no existeixin: la web WordPress porta indicis de Search Console (Site Kit), però no sabem quina propietat hi ha ni quin període cobreix.
- **Canviar el DNS o l'allotjament no esborra l'historial de Search Console.** Les dades són de la propietat (domini o prefix d'URL), no del servidor, i es conserven mentre la propietat continuï verificada.
  - El risc és **perdre la verificació**: per exemple, si depèn d'una etiqueta o d'un fitxer del WordPress que desapareix amb la migració, o d'un registre DNS que s'esborri.
  - Search Console mostra, com a màxim, uns 16 mesos de rendiment en finestra mòbil. Les dades més antigues deixen d'estar disponibles amb el temps. **No podem assegurar que n'hi hagi 16 mesos complets**: depèn de quan es va crear la propietat.

**Recomanació:**
1. Esbrinar qui controla la propietat i demanar-hi accés ([preguntes](FASE6-bloc1-resultats.md#2-search-console-què-hem-de-demanar)).
2. Exportar les dades disponibles com més aviat millor, i en tot cas abans del canvi de DNS, per tenir la línia base fixada.
3. Abans del llançament, comprovar el mètode de verificació. Si depèn del WordPress, afegir-ne un que sobrevisqui a la migració, com un registre TXT de domini (D4), per no perdre l'accés a l'historial.

**Mentrestant:**
- la priorització SEO i la migració es basen en la [línia base de WordPress](linia-base-wordpress-2026-10-08/README.md), el Perfil d'Empresa i l'inventari de Yoast. Hi poden faltar URL antigues amb valor que només Search Console mostraria;
- la verificació del domini (D4) queda pendent.

---

## 7. Propostes per a les redireccions obertes (no decidides)

Basades en el contingut desat a la [línia base](linia-base-wordpress-2026-10-08/README.md) i en l'equivalent actual. **La decisió és del director.** No s'ha implementat cap regla, i avui totes responen 404 al web nou.

| URL antiga | Contingut antic (08/10/2026) | Equivalent actual | Proposta | Motiu |
|---|---|---|---|---|
| `/sample-page/` | **No és una plantilla buida.** És la pàgina de manteniment «Disculpeu les molèsties», amb adreça («59-61»), telèfon fix, fax i correu. Surt com a enllaç de lloc a la cerca de marca. | `/contacte/` | **301 a `/contacte/`** (en comptes del 410 proposat a la C2) | Té un equivalent clar: qui hi arriba busca les dades de contacte. Detall per a la C5: la pàgina diu «59-61» |
| `/hello-world/` | Entrada d'exemple de WordPress («Hello world!»), amb formulari de comentaris | Cap | **410** | Sense contingut real ni equivalent |
| `/category/uncategorized/` | Arxiu de categoria amb l'entrada d'exemple | Cap | **410** | Igual |
| `/estructuras/` | Landing en castellà: «Fabricamos estructuras metálicas a medida», amb pressupost (343 paraules) | `/particulars/estructures/` (CA); en el futur, la versió ES | **302 a `/particulars/estructures/`** fins que existeixi la versió ES; després, **301** a la versió ES | Probable destinació de campanyes i enllaç de lloc a la cerca de marca. El 302 no queda a la memòria cau com a definitiu. Abans, el client ha de dir si hi ha campanyes actives |
| `/motores/` | Landing en castellà: motors per a portes (enrotllables, batents, guillotina, basculants, corredisses), amb pressupost (83 paraules) | `/particulars/automatismes/` (CA); en el futur, la versió ES | **302 a `/particulars/automatismes/`** fins a la versió ES; després, **301** | Igual |
| `/feed/` | RSS amb una sola entrada, l'exemple «Hello world!» | Cap (el web nou no té feed) | **410** | Sense contingut útil ni equivalent |
| `/comments/feed/` | Feed de comentaris buit | Cap | **410** | Igual |
| `/cat/` | WordPress hi fa un 301 a `/` (prefix català de TranslatePress) | `/` (el català no porta prefix) | **301 a `/`** | És un equivalent exacte, no una redirecció per defecte: és la portada catalana |
| `/es/` | WordPress hi fa un 301 a `/` (prefix castellà de TranslatePress) | Cap avui; serà la portada de la versió ES | **Cap regla** (404) fins a la versió ES. Alternativa: 302 a `/` | Un 301 quedaria a la memòria cau dels navegadors i xocaria amb la futura `/es/`. Sense Search Console no se'n coneix cap valor |

Si s'aproven, el canvi és afegir o ajustar les regles de `src/config/redirects.mjs`. Per als 302 temporals, caldrà ampliar el mapa, que avui només admet 301 i 410. Es comprovaria amb `npm run check:redirects` i `check:redirects:live`.

---

## 8. Fitxers i pendents

### Fitxers

| Fitxer | Tipus |
|---|---|
| `src/scripts/series.ts` | Correcció: lectures abans d'escriptures i inici diferit |
| `src/templates/HomeTemplate.astro` | Correcció: entrada CSS de l'accés de Particulars |
| `scripts/perf/lab-mobile.py` (nou) | Banc de mesura reproduïble, amb variants de prova |
| `scripts/perf/trace-summary.py` (nou) | Resum de traces del fil principal |
| `fases/fase-6/rendiment-2026-10-08/` (nou) | Dades crues: una línia JSON per execució i resums de traces. Les traces completes, d'1,2 MB cadascuna, no es desen |
| `fases/fase-6/FASE6-bloc2-rendiment.md` (nou) | Aquest document |
| `fases/fase-6/FASE6-pla-executable.md`, `FASE6-bloc1-resultats.md`, `fases/fase-5/FASE5-redireccions.md` | Estat de Search Console i enllaç a les propostes de redirecció |

**Per tornar a mesurar** (cal un Python amb Playwright; el de claude-seo n'inclou):

```bash
python -I scripts/perf/lab-mobile.py https://revisio-client--serralleriacarbo.netlify.app / --runs 7
```

### Revisió

- Codex del commit `1ad0bf2` (bloc 1): **pendent**. El 08/10/2026 va fallar perquè el model configurat no és compatible amb el compte; l'autorevisió no la substitueix.
- Codi d'aquest bloc: revisat per Codex, amb resultat favorable (vegeu la capçalera). Validació visual i dispositius reals no repetits per Codex.

### Comprovacions de producció pendents

Totes depenen que hi hagi crèdits a Netlify i, algunes, del llançament:

| Comprovació | Quan | Criteri |
|---|---|---|
| Desplegament de producció de `main` amb els blocs 1 i 2 | Quan hi hagi crèdits | Desplegament publicat. `npm run check:redirects:live -- https://serralleriacarbo.netlify.app` amb `X-Robots-Tag: noindex` |
| Domini definitiu: sense `noindex` per capçalera; subdomini de Netlify i domini sense `www` amb un sol 301 cap a `https://www.`; enllaç permanent amb `noindex` | Dia del llançament, després d'un desplegament nou | [FASE6-bloc1-resultats.md](FASE6-bloc1-resultats.md#pendent-per-la-limitació-de-crèdits) |
| PageSpeed Insights (amb clau D7 o des d'un navegador normal) a la Home, Particulars i Industrial | Abans del llançament i al domini | Resultats desats. Es comparen amb aquest laboratori sense esperar-ne les mateixes xifres |
| Prova en un Android real i en Safari (iPhone) | Abans del llançament | Entrada de la Home, mètode de sèries d'Industrial, sense salts de contingut |
| Dades de camp (CrUX i Core Web Vitals de Search Console) | Unes 4 setmanes després del llançament, si hi ha prou trànsit | LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1 al percentil 75 |

### Pendents i decisions

| Pendent | Qui |
|---|---|
| ~~Decidir si l'accés de Particulars conserva el fos d'opacitat~~ **Decidit (08/10/2026): es conserva** | Director |
| Mesurar en un dispositiu Android real i amb PageSpeed Insights (clau D7) per confirmar o descartar el cost dels layouts en fred | Director o Claude amb accés |
| Particulars: 2,8 s de tasques llargues en mediana (5 execucions de control). No s'hi ha trobat el patró de `series.ts` (`story.ts` llegeix primer i escriu després) i queda fora d'aquest bloc | Per valorar |
| Dades de camp (CrUX) quan hi hagi trànsit | Després del llançament |
| Accés a Search Console i verificació del domini (apartat 6) | Client |
| Decisions de redirecció (apartat 7) | Director |
