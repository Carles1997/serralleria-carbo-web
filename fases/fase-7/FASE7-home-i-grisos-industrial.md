# Home i grisos d'Industrial · 06/10/2026

Canvis sol·licitats i aprovats pel director: substituir el bloc de projecte de la Home per una presentació del taller i donar més llum a Industrial. Desplegament demanat a Netlify.

## Home

«Fabriquem al taller. Muntem quan cal» explica la fabricació de peces i sèries per a subministrament i el muntatge quan l'encàrrec ho requereix. Conserva la fotografia, mostra dues files editorials de fabricació i muntatge i ofereix un únic accés a `/empresa/`. No presenta la fotografia com a prova d'un projecte dins d'aquest bloc.

El text prové de `content/ca/home.md`. La nova revisió editorial queda registrada amb empremta a `scripts/check-references.mjs`; les referències de Fase 1–4 i els tokens continuen protegits.

## Industrial

La portada i Capacitats comparteixen `src/templates/industrial-surfaces.css`:

| Ús | Color |
| --- | --- |
| Taller i contacte | Plata `#d5d9d8` |
| Sectors i requisits | Gris clar `#e2e5e4` |
| Producció i dades | Grafit `#3b4243` |
| Text sobre gris clar | Tinta `#202627` |
| Text secundari sobre gris clar | `#475151` |

Els titulars metàl·lics sobre fons clar utilitzen reflexos foscos, amb contrast en tota la gamma. Les fotografies mantenen el text clar i les seves capes de lectura. Les accions principals sobre plata són de grafit amb text blanc. La branca conserva la identitat neutra i es diferencia del blanc i bordeus de Particulars.

## Verificació

- `npm run verify`: 0 errors, 14 pàgines i referències protegides intactes.
- `npm run check:links`: 384 enllaços interns, tots resolen.
- `npm run check:redirects`: 12 regles llestes, sense errors; es conserven els pendents existents.
- Revisió renderitzada de Home, Industrial i Capacitats a 1440, 768, 390 i 320 px, amb moviment reduït: cap desbordament horitzontal. Captures de les seccions afectades i comprovació dels colors, les imatges i els botons.
- Es manté el comportament d'animació existent; aquest canvi no afegeix JavaScript al client.

## Publicació

Destí: el projecte existent `serralleriacarbo` de Netlify, a `https://serralleriacarbo.netlify.app`. No requereix canvis al domini original ni als registres del correu. El desplegament manual publica el `dist/` verificat, inclosos `_headers` i `_redirects`.

El formulari continua subjecte a la connexió d'enviament prevista al projecte; publicar aquests canvis visuals no valida un backend d'enviament.
