# Fase 4 · Passada transversal final de les maquetes

**Data:** 25/09/2026  
**Estat:** revisió interna completada i Fase 4 validada pel client el 25/09/2026.  
**Abast:** set plantilles representatives, sense alterar el sitemap de la Fase 1.

## Matriu comprovada

| Plantilla | 1440 px | 768 px | 390 px | 320 px |
|---|:---:|:---:|:---:|:---:|
| [Home](FASE4-mockups/home/index.html) | ✓ | ✓ | ✓ | ✓ |
| [Particulars](FASE4-mockups/particulars/index.html) | ✓ | ✓ | ✓ | ✓ |
| [Estructures](FASE4-mockups/particulars/estructures/index.html) | ✓ | ✓ | ✓ | ✓ |
| [Projectes particulars](FASE4-mockups/particulars/projectes/index.html) | ✓ | ✓ | ✓ | ✓ |
| [Industrial](FASE4-mockups/industrial/index.html) | ✓ | ✓ | ✓ | ✓ |
| [Capacitats](FASE4-mockups/industrial/capacitats/index.html) | ✓ | ✓ | ✓ | ✓ |
| [Contacte](FASE4-mockups/contacte/index.html) | ✓ | ✓ | ✓ | ✓ |

**Entorn:** Chrome d'escriptori automatitzat amb Playwright, amplades de viewport indicades i simulació tàctil a 390 px. Les captures de les quatre amplades s'han inspeccionat visualment, inclòs el primer plegat a 768 i 320 px. Aquesta prova no equival a una passada en iOS, Android, Safari o Firefox físics.

## Resultat

- 7 plantilles × 4 amplades: cap desbordament horitzontal, imatge trencada ni error de JavaScript. Cada plantilla té una sola H1 i un element `main`; la font prevista es carrega.
- Titulars visibles sense retall a 768, 390 i 320 px. Els enllaços i botons visibles revisats en aquestes amplades tenen una àrea de com a mínim 44 × 44 px després dels ajustos de la passada.
- 135 passos de Tab mostrejats a 390 px entre les set plantilles: cap control invisible o sense focus visible. Menú mòbil operable i tancable amb Escape. La selecció principal de la Home funciona amb ratolí, teclat i tacte; l'efecte de color no és necessari per clicar.
- Amb `prefers-reduced-motion: reduce`, els titulars continuen visibles i els quatre passos del mètode industrial es mostren sense revelació progressiva.
- 23 comprovacions funcionals correctes i 217 referències locals sense fitxers ni àncores inexistents: Home → ambdues branques; visor de projectes i fletxa de teclat; Particulars → portafoli → Estructures; filtres i filtre per URL; Industrial → Capacitats, Procés i Contacte; menú i sector en tacte; formulari Particular/Empresa.
- Formulari: preselecció Empresa des d'Industrial, camps condicionals, primer camp erroni enfocat i error associat, nom d'adjunt visible, canvi de branca i estat de validació complet. L'èxit és **simulat** i explica que no s'ha enviat cap consulta.

## Ajustos fets durant la passada

1. Els enllaços de les maquetes que ja existeixen apunten directament a la plantilla corresponent. Les rutes sense maqueta independent conserven un destí de demostració i `data-future-route` amb la ruta de Fase 1. Aquest ajust fa revisables els recorreguts complets disponibles sense fingir que les pàgines pendents ja estan implementades.
2. Àrees tàctils de la marca de la Home, enllaços de portada de Particulars, molles de pa, contactes de Capacitats i telèfon contextual del formulari elevades a 44 px.
3. La comprovació automatitzada de la Home i el seu README s'han actualitzat per reflectir la navegació real entre maquetes.

## Límits i validació pendent

- **Client:** el conjunt visual, el to i els recorreguts han estat aprovats el 25/09/2026.
- **Dispositius i navegadors reals:** repetir almenys un recorregut complet en un iPhone/Android i en Safari/Firefox abans de publicar. Aquesta passada ha estat una emulació de Chrome.
- **Producció:** les fotografies conceptuals s'han de substituir per material aprovat; les marques de motors, textos legals i altres dades pendents de Fase 3 continuen obertes. El formulari no envia dades, no emmagatzema adjunts i no s'ha provat cap backend.
- **Rutes sense maqueta pròpia:** el comportament final queda especificat al [traspàs a desenvolupament](FASE4-traspas-desenvolupament.md). Caldrà provar aquestes rutes quan existeixin a Fase 5.

La passada interna i la validació final del client tanquen la Fase 4. Els límits de producció descrits aquí passen al traspàs de la Fase 5.

## Regressió de navegació i tipografia del 25/09/2026

Després de diferenciar la portada Industrial de Capacitats i reforçar l’accés al portafoli de Particulars, s’han repetit les comprovacions responsive de les set plantilles: 1440/768/390/320 px, sense incidències. Han passat 20 proves específiques de les noves entrades i retorns a aquestes quatre amplades, a més dels 23 recorreguts previs. El reflex metàl·lic s’ha ajustat perquè el glif final tingui marge de pintura sense forçar un salt de línia nou; revisat visualment a 1440, 390 i 320 px. La capçalera de Capacitats ara és més compacta i l’atribució de la imatge no se superposa al text ni al botó en mòbil.

## Regressió de la revisió del client del 25/09/2026

Aquesta revisió substitueix els punts anteriors que descrivien el visor de sis treballs de la Home i les sis targetes de sectors. La Home ja no té un bloc propi de projectes; el portafoli Particulars i el cas de les gàbies a Industrial continuen disponibles. Industrial mostra cinc sectors.

- Les set plantilles carreguen sense errors JS i sense desbordament horitzontal a 1440, 768, 390 i 320 px. Tots els recursos i enllaços locals que apareixen en les plantilles actives resolen.
- A 390 i 320 px, els quatre serveis de Home i Particulars s’organitzen en dues columnes. S’ha comprovat que el text de totes vuit targetes queda dins dels seus límits.
- `?tipus=particular&servei=carros` preselecciona Carros industrials al formulari; la tria Particular/Empresa canvia els camps a les quatre amplades. L’horari nou hi és visible.
- Revisió visual amb captures mòbils de Home, Particulars, Industrial i Contacte. S’ha ajustat el titular de Home a 320 px després de detectar un desbordament inicial.
- La prova és en Chrome automatitzat. El formulari continua sent una maqueta sense enviament real; la comprovació en dispositius físics passa a la Fase 5.
