# Fase 9 · Manual de publicació

**Data:** 19/10/2026 · **Actualitzat:** 29/10/2026. Producció autoritzada, configurada i publicada a Netlify; DNS i registres de correu sense modificar. Vegeu el registre de tancament del 29/10 per al resultat final.

**Objectiu.** Publicar la web nova a `https://www.serralleriacarbo.com`:
- sense perdre posicionament ni correu;
- amb un camí de tornada enrere;
- seguint una llista tancada, de manera que el dia de la publicació no calgui prendre cap decisió nova.

**Regles:**
- Cap pas de producció, DNS ni Microsoft 365 no s'executa sense l'autorització explícita del director per a aquell pas.
- **Els secrets** (`RL_SECRET`, credencials de Microsoft 365) no passen mai per xat, correu ni repositori:
  - es desen amb `scripts/netlify/set-env-from-file.py` (vegeu [FASE8-formulari-real-pla.md](../fase-8/FASE8-formulari-real-pla.md) §6.4 i §6.5);
  - a Netlify, com a variables secretes.
- **Registres de correu:** el canvi de DNS no toca MX, SPF, DKIM, DMARC ni `autodiscover`.

**Fonts:**
- [FASE6-pla-executable.md](../fase-6/FASE6-pla-executable.md): migració del WordPress, Search Console, condicionants i seguiment;
- [FASE8-compliment-i-confianca.md](../fase-8/FASE8-compliment-i-confianca.md);
- [FASE8-formulari-real-pla.md](../fase-8/FASE8-formulari-real-pla.md);
- `scripts/lib/indexing-policy.mjs`.

---

## 1. Com funciona la publicació en aquest projecte

**Indexació en dos nivells** (`scripts/lib/indexing-policy.mjs`):
1. **Build no definitiu:** és qualsevol build que no sigui de producció a Netlify amb el domini definitiu com a adreça principal. Porta `X-Robots-Tag: noindex` a totes les respostes. Inclou el build local, `revisio-client` i la producció abans que el domini sigui el principal.
2. **Build definitiu:** `CONTEXT=production` i `URL=https://www.serralleriacarbo.com`.
   - Sense `noindex` global: cada pàgina decideix pel seu estat.
   - `_redirects` comença amb tres regles de domini: el subdomini `serralleriacarbo.netlify.app` i el domini sense `www` redirigeixen amb un 301 a `https://www.serralleriacarbo.com`, conservant el camí.

**Estat de cada pàgina** (`isIndexable`, `src/i18n/pages.ts`): només `status: approved` és indexable i entra al sitemap i als `hreflang`. Els esborranys porten `<meta name="robots" content="noindex">`.

**Simulació en local** (19/10/2026), amb `CONTEXT=production URL=https://www.serralleriacarbo.com SITE_NAME=serralleriacarbo npm run build`:
- `dist/_headers` sense `noindex` global;
- `_redirects` amb les 3 regles de domini davant de les 23 de camí;
- **només 4 pàgines indexables**: Projectes i les tres legals en català. Les altres 34 continuen amb `noindex` perquè són esborranys.

Després es va refer el build normal (amb `noindex`).

**Actualització del 20/10/2026:** aprovació editorial registrada a [FASE9-aprovacio-continguts-2026-10-20.md](FASE9-aprovacio-continguts-2026-10-20.md). Les pàgines comercials CA/ES/EN estan aprovades; Contacte manté `noindex` fins a la prova real. Les xifres de la simulació del 19/10 anterior són històriques.

## 2. Portes: tot ha d'estar resolt abans del dia D

| # | Porta | Estat (19/10/2026) | Responsable | Com es comprova |
|---|---|---|---|---|
| P1 | **Aprovació editorial** de les pàgines que s'indexaran: `status: approved` | Aprovació editorial comercial CA/ES/EN registrada el 20/10. Contacte també aprovat després de la prova real del 29/10; legals ES/EN aprovats pel director (20/10) | Client i director; canvi de fitxers, Claude | `npm run check:links` (recompte del sitemap) i build definitiu simulat |
| P2 | **Idiomes del llançament** (decisió C11): només català, o català, castellà i anglès | **Fet:** CA/ES/EN aprovats pel director el 20/10/2026 i comprovats en la preparació del 29/10 | Director | Si ES i EN no es publiquen, les seves pàgines continuen `noindex` i s'hi decideix la solució de `/estructuras/` i `/motores/` (C2) |
| P3 | **Formulari real** provat amb Microsoft 365 (prova controlada §11 del pla 8.5) i **avís de demostració retirat** | **Prova funcional completada:** quatre correus rebuts/respostos i adjunts oberts. Codi preparat: Contacte indexable i avís només al build no definitiu. Producció publicada el 29/10 i prova live BGFD9SBT6T acceptada; domini definitiu pendent del DNS i comprovació posterior | Administrador, Jordi, director i Claude | Recepció i Reply-To acreditats per les quatre respostes del client; traça «Delivered» complementària. Avís per retirar i provar abans del llançament (`check-contact-form.py`) |
| P4 | **Textos legals ES/EN** | Aprovats expressament pel director el 20/10/2026; estats actualitzats. No es declara una revisió jurídica independent nova | Director | `status: approved` als vuit fitxers legals ES/EN |
| P5 | **Drets d'imatge:** consentiments de les persones identificables (8.6) | Permisos d’ús confirmats pel director el 15/10; no s’aporten documents addicionals en aquest tancament | Client | Registre a FASE8 |
| P6 | **Textos legals** (8.10) | Català aportat per l’advocat; ES/EN aprovats pel director el 20/10. No es declara una revisió jurídica independent posterior | Director | Registre d’aprovació |
| P7 | **NAP definitiu:** telèfon i adreça 59 o 59-61 (C3 i C5) | **Fet:** telèfon fix (13/10/2026) i adreça definitiva 59-61 (director, 23/10/2026), aplicada al web i enviada al Perfil d'Empresa. Falten els directoris (D6) | Client | Coincidència web, dades estructurades i Perfil d'Empresa |
| P8 | **Decisions de redirecció:** `/estructuras/`, `/motores/` (C2), feeds, `/cat/` i 12 adreces de fotos del WordPress | **Fet en local:** 23 regles de pàgines validades i 23 URL de 12 fotografies/miniatures conservades amb els mateixos bytes i resposta 200. Comprovació en viu el dia del tall | Director i client | `npm run check:redirects` sense regles «per decidir» |
| P9 | **Crèdits de Netlify** per als desplegaments de producció | **Compte Personal comprovat el 29/10/2026:** 1.000 crèdits de pla, sense operational mode ni usos excedits. No s’ha fet cap compra ni canvi de pla | Director o client | El panell mostra saldo i els desplegaments de producció no es salten |
| P10 | **Search Console:** accés, exportació de dades del WordPress i verificació per registre TXT de domini | Verificació i accés no confirmats. Seguiment SEO pendent; no impedeix publicar tècnicament el web i el sitemap | Client | Exportació desada i propietat de domini verificada |
| P11 | **Inventari DNS** complet i finestra de canvi acordada amb mayasystems.net | Captura pública de DNS desada el 29/10. Falta la confirmació de còpia completa de WordPress i la finestra de canvi amb Xavi | Client | Taula de registres actuals (§3.2) |
| P12 | **Validació final del client** sobre la web completa | El director demana tancar la preparació i publicar el 29/10/2026. Autorització explícita de secrets, FORM_MODE=live, dominis i publicació rebuda el 29/10/2026 | Client | — |
| P13 | **Prova amb lector de pantalla** (8.8). Recomanada; no bloqueja la publicació. La declaració d'accessibilitat no es publica (director, 20/10/2026) | Pendent | Director | Protocol de FASE8 §8.4 |

## 3. Preparació (de D−7 a D−1)

### 3.1 Codi i continguts

1. **Aprovació (P1).** Les pàgines aprovades passen a `status: approved` als fitxers de `content/{ca,es,en}/`:
   - es registra la revisió a `scripts/check-references.mjs`;
   - es comprova amb `npm run verify`, `check:i18n` i `check:links`;
   - el sitemap s'actualitza sol.
2. **Formulari (P3).** Després de la prova real:
   - es retira l'avís de demostració;
   - en producció: `FORM_MODE=live`, un `RL_SECRET` nou i les credencials de Microsoft 365. Totes tres, secretes i només al context `production`.
3. **Fusió a `main`.**
   - `fase-7/qa` es fusiona a `main`, la branca de producció, amb una *pull request* revisada.
   - **Atenció:** si el desplegament continu de Netlify és actiu, la fusió llança una compilació de producció.
   - Abans de fusionar, confirmar al panell si és actiu i si hi ha crèdits.
   - Mentre el domini no sigui el principal a Netlify, aquesta compilació no és definitiva (porta `noindex`), de manera que no exposa res.
4. **Comprovacions finals sobre la previsualització:**

   ```bash
   npm run verify
   npm run check:i18n
   npm run check:links
   npm run check:redirects
   npm run test:contact
   ```

   I, amb el servidor local i la previsualització:
   - `scripts/qa/check-a11y.py`;
   - `check-csp.py`;
   - `check-contact-form.py`;
   - `check-language-switcher.py`.

### 3.2 DNS i correu (amb mayasystems.net)

1. **Inventari** de tots els registres actuals de `serralleriacarbo.com`, amb el valor i el TTL:
   - A i AAAA de l'arrel;
   - CNAME de `www`;
   - MX;
   - TXT (SPF, verificacions de Google o Microsoft);
   - CNAME d'`autodiscover`;
   - DKIM (si ja n'hi ha);
   - DMARC.
   - Es desa en aquest document. És la base per tornar enrere.
2. **Baixar el TTL** de l'arrel i de `www` a 300 s, entre 24 i 48 h abans del dia D.
3. **No es toquen** MX, SPF, `autodiscover`, DKIM ni DMARC.

### 3.3 Netlify

1. **Afegir el domini:** al projecte `serralleriacarbo`, *Domain management*:
   - afegir `www.serralleriacarbo.com` com a **domini principal**;
   - afegir `serralleriacarbo.com` com a àlies.
   - Netlify mostrarà els valors de DNS que cal posar.
   - Es fa servir **el valor que mostri el panell aquell dia**; no es copia de documents antics.
2. **Efecte:** amb el domini principal, la variable `URL` dels builds de producció passa a ser el domini, i el següent build de producció ja és **definitiu**.
3. **Variables de producció:**
   - `FORM_MODE=live`;
   - `RL_SECRET` nou;
   - les credencials de Microsoft 365.
   - Totes, al context `production` i secretes, amb `set-env-from-file.py … production --secret`.

### 3.4 Google

1. **Search Console (P10):** exportar les dades del WordPress (consultes, pàgines i enllaços) i verificar la propietat de domini amb TXT.
2. **Perfil d'Empresa:** preparar el canvi del camp «Lloc web» si cal (D1.4), i revisar el telèfon i l'adreça (P7).

## 4. Dia D

**Moment:** feiner al matí, amb Jordi i el director disponibles. L'administrador de Microsoft 365, localitzable.

1. **Desplegament de producció definitiu** (amb autorització):
   - **Opció recomanada:** build de Netlify (`main`), que fixa `CONTEXT` i `URL` sola.
   - **Alternativa, amb build local:**

     ```bash
     CONTEXT=production URL=https://www.serralleriacarbo.com SITE_NAME=serralleriacarbo npm run build
     ```

     Comprovar: `grep -c "X-Robots-Tag: noindex" dist/_headers` ha de donar 0, i `head -6 dist/_redirects` ha de mostrar les regles de domini. Llavors:

     ```bash
     netlify deploy --dir=dist --functions=netlify/functions --no-build --prod --site=f9c27e63-fc41-45d2-8597-7b71491cc228
     ```
2. **Comprovar abans del DNS**, només per l'**enllaç permanent del desplegament** (`https://<id>--serralleriacarbo.netlify.app`):
   - **Per què:** el build definitiu redirigeix `serralleriacarbo.netlify.app` a `www`, que encara és el WordPress.
   - **Què es mira:** pàgines, capçaleres, formulari en `live` amb una consulta real de prova, i `check-csp.py` contra l'enllaç permanent.
3. **Canvi de DNS a mayasystems.net:**
   - `www`: CNAME al subdomini de Netlify;
   - arrel: el valor indicat per Netlify.
   - Res més.
4. **Certificat HTTPS:** Netlify l'emet en uns minuts, quan veu el DNS. Comprovar `https://www.serralleriacarbo.com` i `https://serralleriacarbo.com` (que ha de fer un 301 a `www`).
5. **Comprovacions en directe:**

   ```bash
   npm run check:redirects:live -- https://www.serralleriacarbo.com
   ```

   - **Capçaleres:** HSTS del domini propi, `Content-Security-Policy: frame-ancestors 'self'` i la resta (FASE8 §7), **sense** `X-Robots-Tag: noindex`.
   - **Pàgines i fitxers:** `robots.txt`, `sitemap.xml` (les URL aprovades), canonical i `hreflang`.
   - **Proves:** `check-csp.py` i `check-a11y.py … - axe` contra el domini.
   - **Formulari:** una consulta real; Jordi en confirma la recepció.
   - **Correu:** enviar i rebre un correu a `carbo@` des de fora, per confirmar que el DNS no l'ha afectat.
6. **Google:**
   - Search Console: enviar el sitemap i inspeccionar la Home;
   - Perfil d'Empresa: actualitzar el camp «Lloc web» si cal.

## 5. Tornada enrere

| Problema | Acció |
|---|---|
| Error greu de la web nova (pàgines, formulari) | Netlify, *Deploys*: publicar el desplegament anterior. Si cal, tornar el DNS als valors de l'inventari (§3.2). Amb TTL de 300 s, el canvi és ràpid |
| El correu falla | Comprovar que MX, SPF i `autodiscover` coincideixen amb l'inventari i restaurar-los. El canvi de la web no els ha de tocar |
| Certificat HTTPS que no s'emet | Comprovar els valors de DNS amb el panell de Netlify. No hi ha cap acció al WordPress |
| El formulari real falla | `FORM_MODE=dry-run` a producció i redesplegament; tornar a posar l'avís de demostració. El telèfon i el correu continuen visibles |

## 6. Després del llançament

| Moment | Comprovació |
|---|---|
| +1 h | Registre de `neteja-temporals`: una execució cada hora al minut 5 (comprovació de producció, FASE8 §11.6) |
| +1 dia | Search Console: errors de rastreig i 404. Formulari: consultes rebudes |
| +7 dies | Indexació de les pàgines aprovades; redireccions sense 404 a les adreces antigues amb valor |
| +28 dies | Cerques per grup i pàgina propietària, clics (comparats amb la línia base del Perfil d'Empresa), seguiment del pla de FASE6 §7 |

## 7. Rendiment abans de publicar (19/10/2026)

### 7.1 Mètode

**Banc:** el mateix de la Fase 6, [FASE6-bloc2-rendiment.md](../fase-6/FASE6-bloc2-rendiment.md):
- [`scripts/perf/lab-mobile.py`](../../scripts/perf/lab-mobile.py) amb Chromium de Playwright;
- mòbil de 390 × 844, CPU 4 vegades més lenta, xarxa d'1,6 Mbps i 150 ms de latència;
- sense memòria cau.

**Comparació:** alternada, amb [`scripts/perf/lab-ab.py`](../../scripts/perf/lab-ab.py), nou en aquesta fase. Cada parell carrega les dues versions, i l'ordre s'alterna a cada parell perquè la variació de la màquina afecti totes dues per igual:
- 9 parells en mòbil;
- 5 en escriptori.

**Versions comparades:**
- **A**, la que va tancar el rendiment de la Fase 6 (desplegament `6ac7d8655525ba2ffb1897a2`, 08/10/2026);
- **B**, l'actual (`6ad610f8d44107b8a37de05c`).

B inclou els canvis posteriors: anglès, capçalera nova, targetes, CSP, accessibilitat, vels i ordre Industrial-Particulars.

**Límits:** són mesures de laboratori amb variabilitat alta. Indiquen la direcció i la mida aproximada dels canvis, no el temps d'un usuari real. Les dades reals arribaran de Search Console (Core Web Vitals) unes setmanes després de publicar.

### 7.2 Resultats

Medianes en ms.

| Pàgina | FCP A → B | LCP A → B | Parells en què B millora l'LCP | Tasques llargues A → B | CLS | Pes |
|---|---|---|---|---|---|---|
| Home, escriptori | 772 → 644 | **1328 → 964** | 5 de 5 | 0 → 0 | 0 | 303 → 305 KB |
| Home, mòbil | 3096 → 2544 | **4076 → 3528** | 6 de 9 | 776 → 1644 (vegeu 7.3) | 0 | 223 → 225 KB |
| Industrial, mòbil | 2468 → 2404 | 2468 → 2868 | 5 de 9 (sense diferència clara) | **977 → 538** | 0 | **223 → 113 KB** |
| Particulars, mòbil | 2176 → 2452 | 2176 → 2496 | 4 de 9 (sense diferència clara) | 1674 → 1549 | 0 | 288 → 290 KB |
| Contacte, mòbil | 2340 → 2032 | 3104 → 2988 | 5 de 9 | **1866 → 0** | 0 | 89 → 92 KB |

**Lectura:**
- **Cap regressió atribuïble als canvis recents:** la CSP, els vels i l'ordre Industrial-Particulars no empitjoren el rendiment.
- **Millores clares:**
  - LCP de la Home en escriptori;
  - LCP i FCP de la Home en mòbil;
  - feina bloquejant d'Industrial i de Contacte;
  - pes d'Industrial (la meitat).
- **Industrial i Particulars:** l'LCP en mòbil es mou dins del soroll del banc. Els parells es reparteixen gairebé a parts iguals.
- **CLS = 0** a totes les pàgines.
- **Element LCP de la Home:** ara és la imatge de l'accés d'Industrial, la primera targeta.

### 7.3 Les tasques llargues de la Home en mòbil

**Observació:** la suma de tasques llargues de la Home puja de 776 a 1644 ms.

**Traça d'una execució de cada versió** (`lab-mobile.py --trace` i `trace-summary.py`, fins a 6 s):

| | A | B |
|---|---|---|
| FCP / LCP de l'execució | 2432 / 3384 | 1820 / 2784 |
| Temps propi de *Layout* | 1250 ms | 979 ms |
| Temps propi d'*UpdateLayoutTree* (estils) | 674 ms | 474 ms |
| Tasques de més de 50 ms abans del primer pintat | 569 + 848 ms | 805 ms |

**Interpretació:** és la mateixa feina, la maquetació en fred de tota la pàgina i la segona maquetació quan arriba la font. B fa menys feina en total, però l'agrupa en tasques més llargues, i per això la suma de «tasques llargues» puja. **No és una regressió.**

### 7.4 Què limita el mòbil i què es proposa (pendent d'aprovació)

**Diagnòstic:** el cost principal en mòbil és la **maquetació de tota la pàgina, que es fa dues vegades**: la inicial i la de l'arribada de la font. Amb la CPU limitada, és prop d'un segon. Ja ho apuntava la Fase 6 (§3.3).

**Propostes**, ordenades per relació benefici-risc:
1. **`content-visibility: auto`**, amb una alçada intrínseca estimada, a les seccions de sota del primer pantalla de la Home i d'Industrial.
   - El navegador no les maqueta fins que s'hi acosta el visitant, i les dues maquetacions inicials es redueixen.
   - **Riscos:** àncores i salts de desplaçament si l'alçada estimada és dolenta, i interacció amb les animacions de revelació. Es provaria amb `lab-ab.py` i amb les proves de navegador abans de proposar-lo.
2. **Mètriques de la font de reserva** (`size-adjust` i `ascent-override` a la `@font-face` de reserva), perquè l'arribada de Source Sans 3 i de la tipografia de marca no obligui a remaquetar.
   - **Riscos:** baixos.
   - **Benefici:** depèn de quant s'assemblin les mètriques.
3. **Després de publicar:** validar amb dades reals. L'informe de Core Web Vitals de Search Console necessita unes setmanes de trànsit; l'objectiu és un LCP de 2,5 s o menys al percentil 75. **No es prenen decisions de disseny només amb el laboratori.**

### 7.5 Prova de les dues optimitzacions (20/10/2026): no s'apliquen

**Variants:** compilacions experimentals, servides en local i comparades alternadament amb la mateixa base, 9 parells per combinació. `src/styles/global.css` es va modificar només de manera temporal i es va restaurar:
- **cv:** `content-visibility: auto` i `contain-intrinsic-size: auto 900px` a partir de la tercera secció de la Home i d'Industrial;
- **fs:** font de reserva ajustada a Arial, calculada amb fontTools sobre `CarboText-VF.woff2`, amb `font-display: swap`:
  - `size-adjust` 87,96 %;
  - `ascent-override` 113,68 %;
  - `descent-override` 37,06 %;
  - `line-gap-override` 0 %;
- **fo:** la mateixa font de reserva, amb `font-display: optional`. És l'única manera d'evitar la segona maquetació quan la font arriba tard.

| Variant | LCP Home, base → variant | Parells en què millora | LCP Industrial, base → variant | Parells en què millora |
|---|---|---|---|---|
| cv | 3580 → 3440 | 5 de 9 | 2592 → 2284 | 4 de 9 |
| fo | 1748 → 2472 | 3 de 9 | 1504 → 1476 | 5 de 9 |
| fs | 1704 → 2728 | **1 de 9** | — | — |

**Lectura:**
- **cv:** cap millora clara. Les tasques llargues baixen poc (261 → 190 i 294 → 183 ms). Té riscos coneguts:
  - àncores com `/#serveis` de la barra de dalt, amb alçades estimades;
  - el mètode de sèries d'Industrial, que calcula posicions en desplaçar;
  - les animacions de revelació.
- **fs i fo:** no milloren l'LCP. A la Home, sovint l'empitjoren: amb la font de reserva, el text de les targetes (`path-scope`) es converteix un moment en candidat a l'LCP, i això endarrereix la mesura. A més, `optional` faria que, en una primera visita lenta, la web es veiés amb Arial ajustada en lloc de la tipografia de marca.
- **Soroll:** dins de cada sèrie, la màquina va canviar de velocitat (el primer pintat de la base va d'1,3 a 2,4 s). Cap variant no supera aquest soroll.

**Decisió proposada:**
- No aplicar cap de les dues optimitzacions.
- Mantenir la web tal com és: CLS 0, i LCP millor que a la Fase 6 a la Home.
- Revisar-ho amb les dades reals de Core Web Vitals de Search Console quan hi hagi trànsit, que és el criteri que val (§7.4, punt 3).

