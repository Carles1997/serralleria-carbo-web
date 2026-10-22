# Informe · Actualització del manual i dels documents desfasats · 22/10/2026

**Encàrrec:** Studio OS, tasca [9] (SC-2026-01). Canvis només documentals i d'un comentari; cap contingut públic, regla, configuració de publicació, DNS ni dada de Studio OS modificada. Sense commit, push, merge ni desplegament.

**Base:** branca `Carles1997/studio-6c3f2e22-g0`, commit `40eb008` («Approve commercial content and Spanish and English legal texts»), arbre net a l'inici.

## Fitxers modificats i motiu

| Fitxer | Motiu |
|---|---|
| `fases/fase-9/FASE9-manual-publicacio.md` | Data d'actualització de les portes. §1: registre dels legals ES/EN i recompte de 33 URL. P1 marcada com a feta (20/10) amb l'abast real i el build definitiu simulat encara per repetir. P2 reformulada: continguts EN aprovats, decisió del 08/10 (CA+ES, EN ajornat) citada i decisió explícita dels idiomes del llançament pendent. P4 = aprovació del director, no de l'advocat. P6 pendent i no substituïda per P4. P8 separada en decidides (R1–R6, 08/10) i pendents (12 URL de fotos i campanyes Ads/Meta). §3.1: P1 feta |
| `fases/fase-9/FASE9-aprovacio-continguts-2026-10-20.md` | Notes que marquen com a substituïts el pendent legal ES/EN i el recompte de 27 URL. Nou apartat «Què no decideix aquest registre» (P2 i P6) |
| `fases/fase-8/FASE8-compliment-i-confianca.md` | Fila «Idiomes» de l'apartat 3: continguts aprovats i decisió de llançament pendent. Nota d'actualització al paràgraf històric del 08/10 sobre els legals castellans. Al registre final, P6 i P2 continuen pendents |
| `fases/README.md` | La fila de la Fase 9 ja no dona l'aprovació editorial per pendent i llista les portes obertes |
| `src/config/redirects.mjs` | Només el comentari de capçalera: deia «el web es publica en català i castellà (l'anglès queda ajornat)» com a fet vigent. Ara situa aquesta base el 08/10, registra que P2 continua pendent i esmenta els dos pendents de redirecció. Cap regla canviada |
| `fases/fase-9/FASE9-informe-actualitzacio-documentacio-2026-10-22.md` | Aquest informe |

## Evidències utilitzades

- `FASE9-aprovacio-continguts-2026-10-20.md`: aprovació editorial de les pàgines comercials CA/ES/EN i Contacte (amb `noindex`); aprovació posterior dels vuit legals ES/EN pel director, «sense atribuir una nova revisió a l'advocat».
- `FASE8-compliment-i-confianca.md`: apartat final del 20/10 (legals ES/EN), tasca 8.10 (revisió de l'assessor, sense estat de fet), §6 (legals CA de l'advocat aprovats el 06/10).
- `FASE6-bloc4-redireccions.md` i `FASE6-bloc5-castella.md`: decisions R1–R6 i C11 del 08/10/2026 (CA+ES des del primer dia, EN ajornat); pendent de les 12 fotografies (apartat 2); comprovació de campanyes com a `launchChecks`.
- Estat real dels fitxers: `status: approved` a les pàgines comercials, Contacte i legals de `content/{ca,es,en}/`; 404 i rutes ajornades en `draft`.
- `src/config/redirects.mjs` i sortida de `npm run check:redirects`: 23 regles llestes (14 × 301, 9 × 410), 0 en espera, 0 per decidir; les fotos de WordPress no hi figuren.

## Comprovacions executades (22/10/2026, després dels canvis)

| Ordre | Resultat |
|---|---|
| `npm run verify` (astro check + build + check:references) | Correcte. astro check: 0 errors, 0 avisos, 0 suggeriments. «Referències intactes respecte a 5e0ffc9 (96 fitxers estrictes, 26 continguts)» |
| `npm run check:links` | Correcte. 39 pàgines, 1124 enllaços interns; sitemap amb 33 URL indexables |
| `npm run check:i18n` | Correcte. 38 pàgines (ca 12 · es 13 · en 13), 33 amb `hreflang` |
| `npm run check:redirects` | Correcte. 23 llestes, 0 per decidir; mostra la comprovació de campanyes a `/estructuras/` i `/motores/` |
| `npm run test:contact` | Correcte. 58 proves, 58 superades |
| `git diff` | Només Markdown de `fases/` i el bloc de comentari de `redirects.mjs` |

No s'han executat les proves de navegador de `scripts/qa/` (necessiten servidor i no són afectades per canvis documentals).

## Decisions que continuen pendents

- **P2 · Idiomes del llançament:** cal la decisió explícita del director. Discrepància registrada: la decisió del 08/10 (anglès ajornat) i l'estat actual (EN aprovat i inclòs al sitemap i als `hreflang` del build) no s'han reconciliat formalment. No s'ha decidit res.
- **P6 · Revisió final de l'advocat (8.10):** pendent; l'aprovació del director dels legals ES/EN no l'acredita.
- **P8 · Redireccions:** destí de les 12 URL antigues de fotos del WordPress (director) i comprovació de campanyes de Google Ads o Meta (client).
- **P1 · Comprovació:** repetir el build definitiu simulat amb els estats actuals (la simulació del 19/10 és anterior a les aprovacions).
- La resta de portes no canvien: P3 formulari real, P5 consentiments d'imatge, P7 adreça, P9 crèdits de Netlify, P10 Search Console, P11 inventari DNS, P12 validació del client, P13 lector de pantalla.

## Riscos i observacions fora d'abast

- `FASE6-pla-executable.md` (C11, línies 89 i 328) i `FASE6-pla-accio.md` encara plantegen el llançament «només en català» com a opció; són documents històrics de la Fase 6 i no s'han tocat.
- `check:redirects` etiqueta `/contacte/` com a «destí en esborrany, noindex» tot i que Contacte ja està aprovat (amb `noindex` per P3). És text de l'script; no s'ha canviat.
