# Fase 7 · Menys text i retirada de la pàgina Empresa

Indicació del director de projecte (06/10/2026): la web té massa text i alguns textos no aporten res que no s'expliqui en una altra secció.

## Decisió que canvia el sitemap de la Fase 1

La pàgina **Empresa** (`/empresa/`) es retira. Els seus continguts ja surten en altres llocs:

| Contingut d'Empresa | On queda |
|---|---|
| Fundació (1989), taller de 950 m², 12 persones, furgonetes i camió ploma | Home, «Fets que ens defineixen» |
| Taller, materials, soldadura i maquinària | Home, «Fabriquem al taller. Muntem quan cal»; Industrial i Capacitats |
| Zones de treball («Arrelats a Vilafranca») | Home, nova línia «On treballem» a la secció del taller |
| Les dues maneres de treballar | Home, doble accés i «Com triar el camí» |
| Adreça i contacte | Contacte |

El document de la Fase 1 continua descrivint `/empresa/`: és una referència validada i no es modifica. Aquesta decisió posterior hi preval.

Aplicació:

- S'eliminen la ruta `src/pages/empresa/`, la plantilla `CompanyTemplate.astro` i el seu CSS, els textos `ui.company`, el grup de fotografies `company` i l'enllaç «Empresa» del menú de la Home.
- `content/ca/empresa.md` es conserva com a esborrany (`status: draft`), com la resta de continguts sense pàgina, per si cal recuperar-ne el text.
- Redirecció `301 /empresa/ → /` a `src/config/redirects.mjs`, perquè la URL publicada a Netlify no acabi en un 404.
- La pàgina surt del sitemap XML automàticament, perquè ja no es genera.

## Textos retirats

- **Home:** el paràgraf d'entrada sota el titular repetia el que expliquen els dos camins. L'entrada queda només amb el titular. La secció del taller perd l'enllaç a Empresa i guanya la línia «On treballem», amb les zones del text validat d'Empresa: Vilafranca del Penedès i la rodalia, fins a Barcelona, i les sèries arreu de Catalunya («les valorem», no un compromís).
- **Industrial:** el paràgraf d'entrada («Industrial és la línia de fabricació per a tercers…») i l'antetítol «Una línia de Serralleria Carbó» amb el seu filet. L'entrada és més baixa: 615 px en lloc de 738 px a 1440 × 900.
- **Què fabriquem:** l'entrada perd «, com un carro» (els carros ja tenen la seva cel·la).

## El taller en primer pla

La secció ha de caber en una pantalla d'escriptori sense desplaçament. El resum i l'accés a la fitxa de capacitats pugen al costat del titular. Les quatre fotografies formen una tira d'una fila. L'estat de qualitat queda a sota.

| Amplada | Abans | Ara | Pantalla útil (sense capçalera) |
|---|---|---|---|
| 1440 × 900 | 1420 px | 706 px | 823 px |
| 1280 × 800 | 1379 px | 655 px | 723 px |

A tauleta, les fotografies van en dues columnes; a mòbil, en una columna i més baixes (150–185 px). En una pantalla de mòbil no hi cap la secció sencera.

Revisió registrada a `check-references`: «menys text i retirada de la pàgina d'empresa, indicació del director (06/10/2026)».
