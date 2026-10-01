# Fase 7 · QA i optimització

**Inici:** 01/10/2026 · **Estat:** primera passada feta. Les proves en dispositius reals i en un allotjament públic es faran quan hi hagi fotografies definitives i allotjament.

La Fase 6 (SEO tècnic i analítica) queda en espera fins que hi hagi accés a Google Analytics i Search Console (decisió del director, 01/10/2026). La part de SEO que no depèn d'aquests accessos (títols, descripcions, encapçalaments, enllaçat i textos alternatius) es revisa aquí.

## Mètode

- **Build de producció** (`npm run build`) servit amb `astro preview`, mesurat amb Chrome real (Playwright). Scripts al scratchpad de la sessió: `qa-perf.cjs` i `qa-seo-a11y.cjs`.
- **Perfil mòbil:** 390 × 844, densitat 2×, CPU 4 vegades més lenta i xarxa 4G lenta (1,6 Mbps, 150 ms).
- **Perfil escriptori:** 1440 × 900, sense limitacions.
- **Límit de la mesura:** el servidor local no comprimeix els fitxers HTML, CSS i JS. Les imatges i la font ja són formats comprimits. En un allotjament amb compressió, el document i el CSS pesaran menys.

## Rendiment (línia base)

| Ruta | LCP mòbil | LCP escriptori | CLS | Pes mòbil | Peticions |
|---|---|---|---|---|---|
| `/` | 2,1 s | 1,0 s | 0,017 | 419 KB | 15 |
| `/particulars/` | 1,0 s | 0,2 s | 0 | 461 KB | 15 |
| `/particulars/estructures/` | 0,9 s | 0,1 s | 0 | 396 KB | 11 |
| `/particulars/automatismes/` | 0,9 s | 0,1 s | 0 | 358 KB | 11 |
| `/particulars/urgencies/` | 0,9 s | 0,2 s | 0,012 | 223 KB | 8 |
| `/particulars/projectes/` | 1,9 s | 0,3 s | 0,03 | 539 KB | 14 |
| `/industrial/` | 1,1 s | 0,3 s | 0,005 | 367 KB | 13 |
| `/industrial/capacitats/` | 1,0 s | 0,2 s | 0 | 381 KB | 15 |
| `/empresa/` | 1,5 s | 0,7 s | 0,007 | 527 KB | 11 |
| `/contacte/` | 1,5 s | 0,9 s | 0 | 206 KB | 9 |

- **Llindars de Google** (LCP ≤ 2,5 s, CLS ≤ 0,1): totes les rutes els compleixen, també en el perfil mòbil lent.
- **JavaScript:** gairebé nul. Menys de 10 KB en total; la major part va inserida al document.
- **CSS:** 13–19 KB per pàgina.
- **Imatges:**
  - totes en AVIF, amb WebP i JPG de reserva;
  - `srcset` i `sizes` per amplada, amb amplada i alçada declarades (sense salts);
  - càrrega diferida fora de la primera pantalla i prioritat a la imatge principal.
  - A 390 px amb densitat 2× el navegador tria la variant de 960 px, la que correspon. Un primer indicador de «imatges massa petites» era un error de mesura del script.
- **Font:** era el recurs més pesat, 167 KB a totes les pàgines. Ara en pesa 54 (vegeu «Corregit en aquesta passada»).

## SEO a la pàgina i accessibilitat estructural

Comprovat a les 10 rutes construïdes i a la 404, a 1440 i a 390 px:

- un sol H1, `lang="ca"`, canonical i títols i descripcions únics;
- sense salts en la jerarquia d'encapçalaments;
- totes les imatges tenen `alt`, decoratiu o descriptiu;
- enllaços i botons amb nom accessible i camps amb etiqueta;
- un sol `main`, capçalera i peu;
- objectius de tacte ≥ 24 px (mínim de WCAG 2.2);
- contrast WCAG sobre els fons sòlids.

**Observacions:**

| Punt | Valoració |
|---|---|
| La coma bordeus del titular de la Home té un contrast de 2:1 sobre el fons fosc | És un signe de marca validat a la maqueta, no informació. Es manté. |
| El títol SEO de `/particulars/` fa 62 caràcters | Lleugerament per sobre del límit orientatiu de 60. Google el pot escurçar. Canviar-lo és un canvi de contingut: decisió del director. |
| L'enllaç «Inici» de les molles de pa fa 24 × 44 px | Compleix el mínim de WCAG 2.2 (24 px). |
| Text sobre fotografia (entrades, cartells i sectors) | L'eina no en pot calcular el contrast. Totes aquestes zones porten una ombra de lectura. Cal revisar-les a mà quan hi hagi les fotografies definitives. |

## Corregit en aquesta passada

- **Pàgina 404.**
  - **Abans:** era una pàgina nua, sense capçalera, peu ni sistema visual. Qui arribava des d'una adreça antiga perdia el context.
  - **Ara:** porta la capçalera i el peu comuns i una entrada fosca amb el text de `404.md` i tres camins (inici, Particulars i Industrial).
  - **Sense canvis:** continua amb `noindex` i respon amb l'estat 404.

- **Font web reduïda** (aprovada pel director el 01/10/2026). «Carbo Text» és Source Sans 3 limitada als caràcters del català, el castellà i l'anglès:
  - pes: 54 KB en lloc de 166 KB, un 67 % menys, a cada pàgina;
  - mateix eix de pes variable i mateixes funcions tipogràfiques; aspecte idèntic;
  - la genera `scripts/subset-font.py` (`fonttools`, eina local) a partir de `design/fonts/`, que no es modifica;
  - nom: canvia perquè la llicència OFL reserva «Source» per a l'original; la llicència és al costat de la font (`src/assets/fonts/`);
  - comprovat: cobreix tots els caràcters del build i del contingut; cada pàgina descarrega només aquesta font i la Source Sans 3 original queda com a reserva sense descarregar-se.

## Propostes pendents

1. **Compressió i memòria cau.**
   - Brotli o gzip per al text i memòria cau llarga per a `/_astro/` (els fitxers porten empremta).
   - Es configuren a l'allotjament quan es triï.

## Pendent per tancar la Fase 7

- **PageSpeed Insights i Lighthouse** sobre l'adreça pública, quan hi hagi allotjament.
- **Proves en dispositius reals** amb les fotografies definitives:
  - iPhone amb Safari i Android amb Chrome;
  - Firefox i Safari d'escriptori.
- **Lectors de pantalla:**
  - NVDA amb Firefox i VoiceOver amb Safari;
  - recorregut complet de navegació, formulari i mapa.
- **Contrast del text sobre fotografia**, amb les imatges definitives.
- **Castellà i anglès:** QA de les tres llengües quan hi hagi traduccions validades.
- **Formulari:** prova real d'enviament amb adjunt quan hi hagi allotjament i privacitat aprovada.
