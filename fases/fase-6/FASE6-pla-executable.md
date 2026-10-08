# Fase 6 · Pla executable SEO

**Data:** 08/10/2026 · **Estat:**
- **Blocs executats el 08/10/2026:**
  - bloc 1, protecció d'indexació, redireccions i línia base ([resultats](FASE6-bloc1-resultats.md));
  - bloc 2, rendiment mòbil ([resultats](FASE6-bloc2-rendiment.md));
  - bloc 3, SEO editorial d'Industrial i Capacitats ([resultats](FASE6-bloc3-proposta-editorial.md)). Està implementat i revisat per Codex, amb resultat favorable.
- **Implementats en local el 08/10/2026, pendents de revisió de Codex, commit i desplegament:**
  - bloc 4, tancament de les redireccions ([document](FASE6-bloc4-redireccions.md));
  - bloc 5, versió en castellà ([document](FASE6-bloc5-castella.md)). El web es publica en català i castellà des del primer dia (decisió del director, 08/10/2026); l'anglès queda ajornat.
- **Contingut públic:** s'han modificat només les metadades aprovades (títol i descripció d'Industrial i de Capacitats) i l'enllaç secundari aprovat de Capacitats. Els estats d'indexació continuen igual: cap pàgina no s'ha aprovat ni s'ha fet indexable.
- **La resta del pla** continua com a proposta.

**Eines acordades:** claude-seo i els scripts del projecte, sense instal·lar skills noves. La selecció i les fonts consultades són a [FASE6-skills-seo-proposta.md](FASE6-skills-seo-proposta.md) (08/10/2026).

**Fonts d'aquest pla:**
- [Pla d'acció de la Fase 6](FASE6-pla-accio.md) (02/10/2026, revisat el 08/10/2026);
- [dades del Perfil d'Empresa](FASE6-dades-google-business-profile.md) i les CSV de mètriques, ressenyes i cerques (maig a octubre del 2026);
- [auditoria SEO](auditoria-seo/FULL-AUDIT-REPORT.md) i rastreig de la web WordPress (`auditoria-seo/web-actual/raw/`);
- [SEO-F3](../fase-3/SEO-F3.md), [FASE5-indexacio](../fase-5/FASE5-indexacio.md), [FASE5-pendents](../fase-5/FASE5-pendents.md) i [FASE5-redireccions](../fase-5/FASE5-redireccions.md);
- [FASE7-qa](../fase-7/FASE7-qa.md), [FASE7-auditoria-integral-implementacio](../fase-7/FASE7-auditoria-integral-implementacio.md) i [FASE8-compliment-i-confianca](../fase-8/FASE8-compliment-i-confianca.md);
- comprovacions fetes avui: `npm run build` de `fase-7/qa` (`658428e` + documentació), lectura de l'HTML de `dist/`, i peticions de només lectura a la web WordPress, a `serralleriacarbo.netlify.app` i a la previsualització `revisio-client`.

**Convencions:**
- **P0:** abans de publicar. **P1:** primera setmana. **P2:** primer mes. **P3:** quan hi hagi temps.
- **Hipòtesi:** intenció o prioritat deduïda sense dades de Search Console. No hi ha cap volum de cerca en aquest document. Les xifres de cerques venen només del Perfil d'Empresa, on Google no dona el número per sota de 15.

---

## 1. Resum

1. **El SEO es pot començar ara**, sobre la previsualització, sense esperar la publicació: revisió tècnica, validació de dades estructurades, proves de redireccions i propostes de metadades.
2. **Hi havia un risc d'indexació actiu.** `serralleriacarbo.netlify.app` i la previsualització `revisio-client` no enviaven cap `X-Robots-Tag`, i Projectes i les tres pàgines legals hi eren indexables. **Bloc 1 (08/10/2026):** resolt a la previsualització. El subdomini principal queda pendent dels crèdits de Netlify.
3. **Indici de Search Console i Analytics.** La web WordPress porta **Site Kit by Google** (1.189.0), una etiqueta de Google `GT-T9H3C3ZW` i un contenidor de Tag Manager `GTM-TXQ24TCC`. **És un indici, no una confirmació** d'accés ni de dades: cal preguntar al client qui controla aquests comptes i demanar-hi accés **abans** de la migració ([preguntes](FASE6-bloc1-resultats.md#2-search-console-què-hem-de-demanar)). Les etiquetes no es copien al web nou.
4. **De les 15 URL de la web antiga, 13 tenen una regla llesta** i comprovada avui a la previsualització. Queden obertes les cinc de la decisió C2 i quatre adreces noves detectades avui (feeds i `/cat/`).
5. **Les propostes de contingut són poques i concretes:** els títols d'Industrial i Capacitats (C8), la descripció d'Industrial, perquè resumeixi l'oferta i deixi les dades tècniques a Capacitats, i, com a opció, el títol d'Estructures. **Actualització (08/10/2026):** E1–E5 aprovats i implementats, E6 ajornat ([bloc 3](FASE6-bloc3-proposta-editorial.md)).
6. **La publicació depèn de condicions que no són SEO:** el formulari (8.5), les imatges conceptuals (8.6), la seguretat (8.9), la revisió de l'assessor (8.10), les dades NAP (C3, C5), els crèdits de Netlify i el canvi de DNS.

---

## 2. Estat del pla d'acció

Contrast de cada punt de [FASE6-pla-accio.md](FASE6-pla-accio.md) amb el codi i les decisions posteriors, a data 08/10/2026.

**Categories:**
- **Resolt:** fet i comprovat.
- **Implementar:** pendent d'implementació, sense decisió pendent.
- **Decisió / accés:** pendent d'una decisió o d'un accés.
- **Ajornat:** ajornat expressament.
- **Obsolet:** superat per una decisió posterior.

### Bloc A · Implementat

| # | Estat | Comprovació (08/10/2026) |
|---|---|---|
| A1 Fitxer `_redirects` | Resolt | El build genera 13 regles llestes (abans 9: s'hi han afegit `/legal/`, `/empresa/` i les dues adreces dels textos legals). |
| A2 `/legal/` en espera | Resolt | La condició s'ha complert: la política de cookies està aprovada (06/10/2026) i la regla és llesta. |
| A3 Capçaleres | Resolt | A la previsualització hi ha `nosniff`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy` i memòria cau `immutable` a `/_astro/`. La CSP continua a B4. |
| A4 Open Graph | Resolt | Totes les pàgines tenen `og:*` i la imatge per defecte. Les imatges per branca són la C9. |
| A5 `LocalBusiness` | Resolt | A la Home i a Contacte, amb el mateix `@id`. Adreça i telèfon pendents de C3 i C5. |
| A6 `BreadcrumbList` | Resolt | A Estructures, Automatismes, Urgències, Projectes i Capacitats. |
| A7 Documentació | Resolt | — |

### Bloc B · Després del desplegament

| # | Estat | Comprovació i proposta |
|---|---|---|
| B1 Redireccions | Resolt (ampliat el 08/10/2026) | A `revisio-client`, les 13 regles llestes, amb barra final i sense, són correctes amb `npm run check:redirects:live`: 301 en un sol salt amb la `Location` exacta i 410 directe. S'ha de repetir al domini definitiu. |
| B2 Capçaleres | Resolt | Comprovat de nou avui. Netlify ja comprimeix amb Brotli (`Content-Encoding: br`): això tanca la proposta de compressió de la Fase 7. |
| B3 Dades estructurades i OG | Parcial (bloc 1) | Rich Results Test a la previsualització: `LocalBusiness` i `BreadcrumbList` vàlids. Només un avís opcional, `priceRange`, que no s'afegeix perquè no hi ha cap dada validada. Pendents: Open Graph i repetició al domini definitiu. |
| B4 CSP | Implementar (P0 per publicar) | És la tasca 8.9. Primer en `Report-Only` a la previsualització. No bloqueja el SEO, però sí la publicació. |
| B5 Nova auditoria | Parcial (bloc 1) | Auditoria tècnica i rendiment de laboratori sobre la previsualització. **Troballa de laboratori:** LCP mòbil limitat de 6,5 s a la Home i 4,2 s a Industrial, amb variabilitat alta. Causes corregides al [bloc 2](FASE6-bloc2-rendiment.md); els temps en mòbils reals queden pendents de dades de camp. Repetició al domini entre 2 i 4 setmanes després del llançament. |
| B6 Tall mensual del GBP | Decisió / accés | Cal accés al Perfil d'Empresa. |

### Bloc C · Decisions

| # | Estat | Detall actualitzat |
|---|---|---|
| C1 Aprovar continguts | Decisió (director) | Condicions de cada pàgina:<br>• **Contacte:** el formulari ha d'enviar (FASE5-indexacio, cas especial).<br>• **Automatismes:** té `reviewNeeded` sobre marques de motors. El text no publica cap marca, de manera que el director pot tancar-lo amb una decisió explícita.<br>• **Imatges conceptuals:** no s'han de presentar com a obra real (8.6). |
| C2 Redireccions pendents | Decisió (director i client) | Hi afegeixo quatre adreces noves de la web antiga (apartat 5). |
| C3 Telèfon principal | Decisió (client) | Sense canvis. |
| C4 Venda al taulell | Decisió (client) | Sense canvis. Afecta el perfil, no les rutes del web. |
| C5 Adreça 59 / 59-61 | Decisió (client) | Sense canvis. Bloqueja la coherència NAP del llançament. |
| C6 Categories del GBP | Decisió (client i director) | El canvi de categoria principal s'ha de fer amb el web nou ja publicat. |
| C7 Ressenyes | Decisió (client) | Sense canvis. |
| C8 Títols d'Industrial | Decisió (director) | Recomanada: apartat 3. |
| C9 Imatges per compartir | Decisió (director) | Depèn de les fotos reals autoritzades (8.6). |
| C10 Enllaços a `/empresa/` | Obsolet | Pàgina retirada el 06/10/2026. |
| C11 Versió en castellà | Decisió (director) | Cal decidir si el llançament és només en català. Si ho és, `/estructuras/` i `/motores/` necessiten la solució provisional de la C2. |
| C12 Ampliar pàgines curtes | Obsolet en el seu objectiu | El director ha reduït el text de tota la web (06/10/2026, [FASE7-menys-text](../fase-7/FASE7-menys-text.md)) i aquest encàrrec demana no allargar textos. Dues preguntes del client continuen sent útils com a dades, no per ampliar pàgines: municipis habituals (C12.3) i si fan duplicats de claus o venen comandaments (C12.8). |
| C13 Ressenyes al web | Decisió (client) | P3. |
| C14 `alt` d'obra real | Decisió (director) | Depèn de 8.6. Avui totes les imatges tenen `alt`. |
| C15 Facebook | Decisió (client) | P3. |

### Bloc D · Accions amb accés del client

| # | Estat | Detall actualitzat |
|---|---|---|
| D1.1–D1.11 Fitxa del perfil | Decisió / accés | Els textos de D1.1 i D1.9 es van actualitzar el 08/10/2026 i els ha de validar el director. La D1.4 (camp «Lloc web») és P0 per al dia del llançament. |
| D2, D3 Ressenyes i publicacions | Decisió / accés (client) | — |
| D4 Search Console | Accés (P0) | Site Kit, l'etiqueta de Google i Tag Manager de la web WordPress són un indici que pot existir una propietat, no una confirmació. Primer es pregunta al client; la propietat de domini per DNS és l'alternativa. |
| D5.1 Branca de producció | Resolt | És `main`. **Nou:** els desplegaments de producció s'estan saltant per falta de crèdits («credit usage exceeded»). Bloqueja la publicació. |
| D5.2 Build | Resolt | — |
| D5.3 Domini | Implementar (dia del llançament) | Vegeu l'apartat 5. Cal preservar els registres de correu de Microsoft 365 (MX, SPF, DKIM i DMARC) en canviar el DNS. |
| D5.4 Formularis | Implementar (8.5) | — |
| D6 Directoris | Decisió (client) | Després de C3 i C5. |
| D7 Clau d'API | Accés (opcional) | Sense clau es pot usar PageSpeed des del web. CrUX només tindrà dades amb trànsit real. |

---

## 3. Proposta SEO per ruta

Les intencions principals venen de [SEO-F3](../fase-3/SEO-F3.md). Les cerques relacionades venen del Perfil d'Empresa (maig a octubre del 2026): totes les de servei tenen menys de 15 cerques, i per això són **hipòtesis d'intenció, no demanda mesurada**.

**Regla de canvi:** només es proposa un canvi quan resol un problema concret. Els canvis de `seoTitle` o `seoDescription` són canvis de contingut: necessiten la validació del director i una entrada a `VALIDATED_REVISIONS` de `check-references`.

### `/` · Home

- **Públic i necessitat:**
  - qui cerca l'empresa pel nom o l'adreça;
  - qui busca una serralleria a Vilafranca i ha de triar entre Particulars i Industrial.
- **Intenció principal:** marca + serralleria a Vilafranca del Penedès.
- **Cerques relacionades:**
  - de marca: «serralleria carbó, carrer d'eugeni d'ors…» (61), «carbo» (44), «carbo vilafranca», «serralleria carbo»;
  - de servei: «serralleria vilafranca», «serrallers vilafranca del penedes», «serralleries a vilafranca del penedès».
- **Actual:**
  - title (56): «Serralleria a Vilafranca del Penedès | Serralleria Carbó»;
  - description (138): «Serralleria Carbó: des de 1989, treballs de serralleria per a particulars i fabricació metàl·lica per a empreses a Vilafranca del Penedès.»;
  - H1: «Serralleria Carbó,». La línia «a Vilafranca del Penedès des de 1989» és un paràgraf a part, a la dreta.
- **Proposta: cap canvi.**
  - El títol ja porta la intenció local.
  - Posar la ubicació dins l'H1 obligaria a reestructurar una composició aprovada pel director el 06/10/2026. El guany seria petit, perquè el títol i la línia del costat ja donen el context.
- **Enllaços interns:** correctes. La Home enllaça Particulars, Industrial, tres serveis i Contacte. Projectes queda a la capçalera, i Capacitats a dos clics, a través d'Industrial.
- **Solapaments:** amb Particulars, per «serralleria Vilafranca». La Home és la propietària genèrica i de marca; Particulars, de «serralleria per a particulars». Cal seguir-ho a Search Console.
- **Fora d'abast:** les cerques de «ferreteria» (74 % de les comptades) depenen de la categoria del perfil (C4). Cap ruta s'hi ha d'orientar.

### `/particulars/`

- **Públic i necessitat:** habitatges, comunitats i negocis que necessiten una instal·lació, una reparació o una feina a mida.
- **Intenció principal:** serralleria per a particulars; variants: serralleria per a habitatges, serveis de serralleria Vilafranca.
- **Actual:**
  - title (62): «Serralleria per a particulars a Vilafranca | Serralleria Carbó»;
  - description (141): «Baranes, estructures, portes i automatismes a mida per a habitatges i comunitats. Treballs reals de Serralleria Carbó a Vilafranca i rodalia.»;
  - H1: «Serralleria per a particulars a Vilafranca i rodalia».
- **Proposta: cap canvi ara.**
  - Els 62 caràcters poden fer que Google talli «Carbó», però totes les alternatives perden «Vilafranca» o la marca.
  - Es revisarà amb el CTR real de Search Console (P2).
- **Enllaços interns:** correctes. Enllaça els tres serveis, Projectes, Industrial i Contacte.
- **Solapaments:** Home (vegeu més amunt). Amb els serveis no n'hi ha: Particulars fa de concentrador i els serveis són les pàgines de detall.

### `/particulars/estructures/`

- **Públic i necessitat:** qui vol una barana, una escala, una passarel·la o una estructura a mida.
- **Intenció principal:** estructures metàl·liques a mida; variants: baranes metàl·liques a mida, passarel·les metàl·liques interiors; suport: baranes interiors de ferro.
- **Dades disponibles:**
  - les fotos més vistes del perfil són una barana d'inox (8.160 visualitzacions) i una escala amb barana de vidre (6.260);
  - al perfil apareix la cerca «vigas acero vilafranca» (<15).
- **Actual:**
  - title (51): «Estructures metàl·liques a mida | Serralleria Carbó»;
  - description (130): «Baranes, escales i passarel·les metàl·liques per a habitatges i espais compartits. Descobreix treballs reals de Serralleria Carbó.»;
  - H1: «Estructures metàl·liques a mida».
- **Proposta opcional (P2, hipòtesi):**
  - title: «Baranes i estructures metàl·liques | Serralleria Carbó» (54);
  - motiu: «baranes» és el treball més vist al perfil i la variant de SEO-F3, però avui només surt a la descripció;
  - l'H1 i el text no canvien.
  - Si el director prefereix esperar dades, es pot decidir amb les consultes de Search Console després del llançament.
- **Enllaços interns:** correctes (Projectes filtrat, Contacte, Industrial).
- **Solapaments:**
  - **Amb Industrial («estructures per a constructores i promotores»):** la separació per públic és clara al text i la pàgina enllaça Industrial per a obra. No cal canviar res.
  - **Observació editorial, no SEO:** hi ha dos H2 gairebé iguals, «Comencem per entendre l'espai» i «Comencem pel teu espai». No es toca sense una revisió editorial.

### `/particulars/automatismes/`

- **Públic i necessitat:** qui vol motoritzar o renovar una porta de garatge, de pàrquing, una persiana o un accés.
- **Intenció principal:** automatismes per a portes; variants: motorització de portes de garatge, portes automàtiques Vilafranca; suport: persianes metàl·liques motoritzades.
- **Dades disponibles:** cinc de les set fotos d'obra del perfil són portes (garatge, pàrquing, accés), amb més de 25.000 visualitzacions en total, i les ressenyes parlen sobretot de portes de pàrquing.
- **Actual:**
  - title (54): «Automatismes i motors per a portes | Serralleria Carbó»;
  - description (133): «Instal·lació i motorització de portes a Vilafranca del Penedès…»;
  - H1: «Automatismes per a portes».
- **Proposta:**
  - metadades: cap canvi;
  - publicació: tancar el `reviewNeeded` de marques amb una decisió explícita del director, «no es publica cap marca», sense tocar el text. Només fa falta si s'aprova la pàgina a C1.
- **Enllaços interns:** correctes (Urgències, Projectes filtrat, Contacte, Industrial).
- **Solapaments:**
  - Amb Urgències, per les reparacions. Automatismes és la propietària d'instal·lar i motoritzar; Urgències, de reparar una avaria.
  - Ara les dues descripcions ja ho separen. Si Search Console mostra cerques de reparació que arriben a Automatismes, primer es revisaran els enllaços i després el text.

### `/particulars/urgencies/`

- **Públic i necessitat:** qui té una porta, una persiana o un motor que ha deixat de funcionar.
- **Intenció principal:** reparació de portes Vilafranca; variant: avaries de portes automàtiques.
- **Límits:**
  - no prometre 24 h ni obertura de panys (SEO-F3);
  - «duplicado de llaves» (<15) no és un servei validat (C12.8).
- **Actual:**
  - title (52): «Reparació de portes a Vilafranca | Serralleria Carbó»;
  - description (135);
  - H1: «Reparació de portes i automatismes a Vilafranca».
- **Proposta: cap canvi.** Té 139 paraules, però el text no s'allarga.
- **Enllaços interns:** correctes. Té el telèfon i el WhatsApp a la primera pantalla.
- **Solapaments:** Automatismes (vegeu més amunt).

### `/particulars/projectes/` · ja aprovada i indexable

- **Públic i necessitat:** qui vol veure feines reals abans de demanar pressupost.
- **Intenció principal:** projectes de serralleria; variants: treballs de serralleria realitzats, exemples de baranes i portes.
- **Dades disponibles:** l'antiga `/projectes/` surt com a enllaç de lloc en la cerca de marca. Ja té una regla 301 cap aquí.
- **Actual:**
  - title (50): «Projectes de serralleria reals | Serralleria Carbó»;
  - description (151);
  - H1: «Projectes de serralleria».
- **Proposta: cap canvi.**
- **Enllaços interns:** correctes. Els filtres `?servei=` comparteixen el canonical sense paràmetres.
- **Solapaments:** amb les galeries dels serveis. Projectes mostra els casos complets, i els serveis, una selecció. És correcte.

### `/industrial/`

- **Públic i necessitat:** empreses, constructores i promotores que necessiten fabricació en sèrie o a mida, peces a plànol o carros industrials.
- **Intenció principal:**
  - fabricació metàl·lica per a tercers;
  - variants: subcontractació de fabricació metàl·lica, taller de soldadura industrial;
  - **fabricació en sèrie**, que ara és d'aquesta pàgina perquè `/industrial/series-curtes/` està ajornada i l'oferta ja no es limita a sèries curtes.
- **Actual:**
  - title (48): «Fabricació metàl·lica per a tercers | Industrial»;
  - description (141): «Fabricació metàl·lica per a tercers a Vilafranca del Penedès: fabricació en sèrie en acer al carboni i inox 304/316, soldadura MIG/MAG i TIG.»;
  - H1: «Fabricació en sèrie. Peces exigents. Resposta industrial.» (missatge validat; no es toca).
- **Proposta (P1, abans de C1):**
  - **title (C8):** «Fabricació metàl·lica per a tercers | Serralleria Carbó» (55). «Industrial» sol no identifica l'empresa als resultats, i la cerca de marca és la més clara del perfil (61 + 44).
  - **description:** «Fabricació metàl·lica per a tercers a Vilafranca del Penedès: estructures, portes, mobiliari, peces a plànol i carros industrials, en sèrie o a mida.» (149). Tot el text ve d'`industrial.md`.
  - **Motiu:** representar de manera fidel i diferenciada el que respon la pàgina. El director va decidir que Industrial resumeix l'oferta i Capacitats concentra les dades tècniques (06/10/2026). Que les dues descripcions s'assemblin no prova cap canibalització: només es podria observar amb Search Console.
  - **Implementat (08/10/2026):** [bloc 3](FASE6-bloc3-proposta-editorial.md).
- **Enllaços interns:** correctes (Capacitats, Particulars, Contacte amb el servei triat).
- **Solapaments:** amb Capacitats, possible i no demostrat. Les metadades noves diferencien oferta i taller, sense garantir quina pàgina mostrarà Google per a cada consulta.

### `/industrial/capacitats/`

- **Públic i necessitat:** un tècnic o comprador que vol comprovar materials, processos i maquinària abans d'enviar un plànol.
- **Intenció principal:** soldadura industrial MIG MAG TIG; variants: soldadura d'acer inoxidable, fabricació en inox 304 i 316; suport: soldadura TIG d'acer inoxidable, fabricació en acer al carboni.
- **Actual:**
  - title (49): «Capacitats de soldadura i fabricació | Industrial»;
  - description (123);
  - H1: «Capacitats del taller».
- **Proposta (P1):** title (C8): «Capacitats de soldadura i fabricació | Serralleria Carbó» (56). La descripció i l'H1 no canvien.
- **Implementat (08/10/2026), segons la decisió del director:** title «Soldadura i fabricació metàl·lica | Serralleria Carbó» i descripció amb la ubicació ([bloc 3](FASE6-bloc3-proposta-editorial.md)). L'H1 no canvia.
- **Enllaços interns:** correctes (Industrial, Contacte d'empresa).
- **Solapaments:** Industrial (vegeu més amunt).

### `/contacte/`

- **Públic i necessitat:** qui ja ha decidit consultar o demanar pressupost.
- **Intenció principal:** contacte Serralleria Carbó; variants: pressupost de serralleria Vilafranca, consulta de fabricació industrial.
- **Actual:**
  - title (43): «Contacte i pressupostos | Serralleria Carbó»;
  - description (126);
  - H1: «Contacte».
- **Proposta: cap canvi de metadades.** No es pot aprovar per indexar fins que el formulari enviï (8.5).
- **Enllaços interns:** correctes. L'antiga `/pressupost/` hi redirigeix i conserva els paràmetres.

### `/legal/*` i 404

- **Pàgines legals:**
  - estan aprovades, són indexables i surten al sitemap;
  - **proposta: cap canvi**; no tenen objectiu comercial, però no hi ha cap motiu per amagar-les;
  - abans del llançament, l'assessor les ha de revisar sobre la web completa (8.10).
- **404:** `noindex`, sense canonical i estat 404 real. És correcte.

### Rutes ajornades

- `/particulars/mobiliari/` i les quatre interiors d'Industrial no es generen. Els enllaços porten a Contacte o a les àncores d'Industrial (`deferredRoutes`).
- No hi ha cap acció SEO fins que el director decideixi publicar-les.
- No s'han de crear pàgines noves per captar cerques.

### Resum de solapaments

| Parella | Risc | Tractament |
|---|---|---|
| Home ↔ Particulars | Mitjà: «serralleria Vilafranca» | Propietats diferents (genèric i marca / particulars). Seguiment a Search Console. |
| Automatismes ↔ Urgències | Mitjà: reparació | Separació instal·lar / reparar. Seguiment a Search Console. |
| Industrial ↔ Capacitats | Possible, no demostrat: les descripcions anteriors compartien les dades tècniques | Metadades diferenciades (bloc 3, 08/10/2026). Seguiment amb Search Console |
| Estructures ↔ Industrial | Baix: separació per públic | Cap canvi. |
| Projectes ↔ galeries de servei | Baix | Cap canvi. |

---

## 4. Revisió tècnica

| # | Element | Estat comprovat (08/10/2026) | Acció | Quan | Criteri de comprovació |
|---|---|---|---|---|---|
| T1 | **Indexació fora del domini definitiu** | **Resolt al bloc 1:** `X-Robots-Tag: noindex` a tot build que no sigui la producció del domini definitiu, i regles de domini al build definitiu. Comprovat a `revisio-client`. | Pendent: `serralleriacarbo.netlify.app`, fins que es pugui desplegar la producció (crèdits). | Ara i dia del llançament | `npm run check:redirects:live -- <adreça>` |
| T2 | Indexació de producció | `noindex` per pàgina segons `status` (FASE5-indexacio). Indexables: Projectes i les tres legals. | Aprovar per C1. No es fa res fins a la decisió. | Abans de publicar | A `dist/`, cada ruta aprovada sense `noindex`, amb canonical i al sitemap. |
| T3 | Canonical | Absolut a `https://www.serralleriacarbo.com/…/`, amb barra final. Les rutes sense barra fan un sol salt 301. Els paràmetres `?servei=` comparteixen el canonical. | Cap. | Repetir al domini | Cada URL amb un sol canonical, igual a la seva URL final 200. |
| T4 | Sitemap | Generat amb `isIndexable` i `isPublishedRoute`. Avui té 4 URL (Projectes i les tres legals). Sense `lastmod`, que és opcional. | Cap. S'actualitza sol en aprovar. | Dia del llançament: enviar-lo a Search Console | Totes les URL donen 200, són indexables i canòniques. Cap redirecció ni 404. |
| T5 | robots.txt | `Allow: /` i la línia `Sitemap`. | Cap. **No** s'han de bloquejar les previsualitzacions per robots: Google no veuria el `noindex`. | — | — |
| T6 | Dades estructurades | `LocalBusiness` (Home i Contacte, mateix `@id`) amb horari, coordenades i `sameAs` del GBP. `BreadcrumbList` a 5 rutes. `logo` i `image` apunten a un fitxer amb empremta a `/_astro/`: és estable mentre no canviï el logotip. | B3: validar a la previsualització. Telèfon i adreça segons C3 i C5. Opcional (P3): servir el logotip des d'una URL fixa. | Ara i al domini | Rich Results Test sense errors i validador de Schema.org sense errors. NAP idèntic al GBP. |
| T7 | Redireccions | 13 llestes; a `revisio-client`, un sol salt, amb i sense barra, i conserven els paràmetres. Pendents: C2 i adreces noves (apartat 5). | Bloc 1: script de comprovació en viu, reutilitzable. | Ara, dia del llançament, +1 dia, +7 dies | Cada URL antiga: estat esperat, `Location` exacta i destí 200. |
| T8 | Metadades | Títols i descripcions únics, de 30 a 62 i de 90 a 151 caràcters. Un H1 per pàgina. Sense `hreflang` (només català: és correcte). | Propostes de l'apartat 3. | Abans de C1 | Revisió a `dist/`. |
| T9 | Imatges | AVIF i WebP amb reserva JPG, mides declarades, càrrega diferida i `alt` a totes. Hi ha imatges conceptuals (`src/config/photography.ts`). | 8.6: substituir-les o no presentar-les com a obra real. Imatge OG per branca (C9). | Abans de publicar | Inventari d'imatges conceptuals sense cap ús que documenti un cas. |
| T10 | Rendiment | Laboratori (Fase 7): LCP mòbil de 0,9 a 2,1 s i CLS ≤ 0,03. Netlify ja serveix Brotli. JS < 10 KB. | PageSpeed des del web sobre la previsualització (sense clau). CrUX quan hi hagi trànsit. | Ara i +28 dies | LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1 al percentil 75 quan hi hagi dades de camp. |
| T11 | HTTPS i HSTS | `netlify.app` envia HSTS. El domini encara serveix WordPress. | Comprovar HSTS, `http`→`https` i domini sense `www` → `www` al domini. | Dia del llançament | Un sol salt cap a `https://www.`. |
| T12 | 404 i 410 | 404 real amb `404.html`. Les 410 serveixen la mateixa pàgina amb estat 410. | Cap. | Repetir al domini | — |
| T13 | Desplegament | Producció pausada per falta de crèdits de Netlify. | Client o director: recuperar crèdits o canviar de pla. | Abans de publicar | Desplegament de `main` publicat. |

---

## 5. Pla de migració de la web WordPress

### 5.1 URL de la web antiga i valor conegut

**Inventari:**
- `sitemap_index.xml` de Yoast, consultat el 08/10/2026: 15 URL, les mateixes del rastreig del 02/10/2026;
- comprovació en directe de les variants de TranslatePress i dels feeds.

**Senyals de valor disponibles sense Search Console:**
- enllaços de lloc de la cerca de marca: HOME, CONTACTE, PROJECTES, «ESTRUCTURAS LANDING» i «MOTORES LANDING» ([dades del GBP §4](FASE6-dades-google-business-profile.md));
- 102 clics del perfil cap al web en sis mesos, que entren per la Home.

| URL antiga | Valor conegut | Destí | Estat |
|---|---|---|---|
| `/` | Alt (marca, GBP) | Es manté | Sense regla |
| `/contacte/` | Alt (enllaç de lloc) | Es manté | Sense regla |
| `/projectes/` | Alt (enllaç de lloc) | `/particulars/projectes/` | **Aprovada i comprovada** |
| `/pressupost/` | Mitjà | `/contacte/` | **Aprovada i comprovada** |
| `/legal/` | Baix | `/legal/cookies/` | **Aprovada i comprovada** |
| `/cat/estructuras/`, `/cat/motores/` | Baix (responen 200 a WordPress) | Estructures i Automatismes en català | **Aprovades i comprovades** |
| `/author/…`, `/elementor-hf/…` (5) | Cap | 410 | **Aprovades i comprovades** |
| `/empresa/`, `/politica-de-*` (3) | No existien a WordPress. Són adreces del web nou i dels textos legals. | `/`, `/legal/*` | **Aprovades i comprovades** |
| `/estructuras/`, `/motores/` | **Alt** (enllaços de lloc; probables campanyes) | Versió ES o solució provisional | **Decisió C2 i C11** |
| `/sample-page/`, `/hello-world/`, `/category/uncategorized/` | Cap | Proposta: 410 | **Decisió C2** |
| `/feed/`, `/comments/feed/` | Desconegut (responen 200 a WordPress) | Proposta: 410 | **Nova, per decidir** |
| `/cat/` | Desconegut (WordPress fa 301 a `/`) | Proposta: 301 a `/` | **Nova, per decidir** |
| `/es/` | Desconegut (WordPress fa 301 a `/`) | Proposta: cap regla. Un 301 quedaria a la memòria cau dels navegadors i xocaria amb la futura versió `/es/`. | **Nova, per decidir** |
| Resta de `/cat/*` i `/es/*` | Cap: WordPress ja fa 301 a la URL sense prefix | Cap regla | — |
| Pàgina «Disculpeu les molèsties» | Surt com a enllaç de lloc; URL desconeguda | Identificar-la amb Search Console | **Pendent de dades** |
| Fitxers `/wp-content/uploads/` | Desconegut | Sense regla, llevat que Search Console mostri trànsit d'imatges | **Pendent de dades** |

**Proposta per a `/estructuras/` i `/motores/`** (decisió del director, ja plantejada a la C2):
- si el llançament és només en català, 302 temporal a les pàgines catalanes equivalents, i 301 quan existeixi la versió ES;
- abans, el client ha de dir si alguna campanya d'Ads o de Meta hi apunta, i canviar-ne la URL de destinació.

### 5.2 Search Console abans de migrar

**Estat (08/10/2026):** no hi ha accés a Search Console, i la verificació del domini queda pendent. No bloqueja el treball tècnic ni el de rendiment.

Mentre no hi hagi accés:
- no es coneixen consultes, pàgines d'entrada, clics ni enllaços externs del web antic;
- la migració es basa en la [línia base de WordPress](linia-base-wordpress-2026-10-08/README.md) i en l'inventari de Yoast, amb el risc de perdre URL amb valor que només Search Console mostraria.

Que no hi hagi accés no demostra que no hi hagi dades: la web WordPress porta indicis de Search Console. Canviar el DNS o l'allotjament no esborra l'historial, que és de la propietat i es conserva mentre continuï verificada. El risc és perdre la verificació si depèn del WordPress, i que les dades més antigues surtin de la finestra de Search Console (com a màxim, uns 16 mesos). Recomanació: exportar les dades disponibles com més aviat millor i abans del canvi de DNS, i assegurar una verificació que sobrevisqui a la migració (registre TXT de domini). Detall a [FASE6-bloc2-rendiment.md](FASE6-bloc2-rendiment.md#6-search-console-i-dades-reals).

1. **Esbrinar el compte.** Preguntar al client (o a qui va fer la web WordPress) amb quin compte de Google es va configurar Site Kit.
2. **Demanar accés:**
   - usuari a la propietat de Search Console;
   - per a la línia base, lectura a la propietat de GA4 associada a `GT-T9H3C3ZW`.
   - Si no hi ha cap propietat, fer la D4: propietat de domini amb un registre TXT a mayasystems.net.
3. **Exportar les dades disponibles abans del canvi de DNS** (no es pot assegurar que hi hagi 16 mesos complets; depèn de quan es va crear la propietat):
   - consultes i pàgines del període disponible: clics, impressions, CTR i posició, també per tipus de cerca d'imatges;
   - informe de pàgines indexades;
   - enllaços externs principals.
   - Es desa a `fases/fase-6/` com a línia base.
4. **Preservar la verificació:** comprovar-ne el mètode abans del llançament i, si depèn del WordPress (etiqueta, fitxer o Site Kit), afegir-ne un de domini (TXT a mayasystems.net) perquè l'accés a l'historial continuï després de la migració.
5. **Contrastar l'export amb l'inventari:**
   - tota URL amb clics o enllaços externs ha de tenir una regla o continuar existint;
   - si n'apareix una de nova, s'afegeix al mapa com a decisió.

Sense accés a Search Console, la migració es pot fer igualment amb l'inventari de l'apartat 5.1, però amb un risc més alt de perdre URL desconegudes.

### 5.3 Verificacions

**Abans de publicar (P0)**
- `npm run check:redirects` sense errors i l'script en viu (bloc 1) contra la previsualització.
- Línia base de la web WordPress amb `seo-drift`: títols, canonical, estat i contingut de les URL de 5.1.
- Còpia de seguretat completa de WordPress (fitxers i base de dades). La fa el client o mayasystems.net.
- Inventari dels registres DNS actuals, en especial el correu de Microsoft 365 (MX, SPF, DKIM, DMARC, `autodiscover`), perquè el canvi només afecti el web.
- Decisions C2 resoltes i regles en estat «llesta».

**Dia de publicació**
1. Desplegament de producció de `main` amb crèdits disponibles.
2. A Netlify, `www.serralleriacarbo.com` com a domini principal. DNS a mayasystems.net segons Netlify.
3. Nou desplegament de producció, perquè el build reconegui el domini definitiu (bloc 1).
4. Comprovar:
   - certificat HTTPS, `http`→`https` i domini sense `www` → `www`, cada un en un sol salt;
   - **sense** `X-Robots-Tag` al domini; amb `X-Robots-Tag` a les previsualitzacions;
   - `serralleriacarbo.netlify.app` redirigeix al domini o porta `noindex`;
   - script en viu de redireccions contra el domini: totes correctes;
   - sitemap enviat a Search Console i inspecció de la Home, Particulars, Industrial i Projectes;
   - camp «Lloc web» del GBP actualitzat a `https://www.serralleriacarbo.com/` (D1.4);
   - correu del domini funcionant (enviament i recepció).

**Després**

| Quan | Comprovació |
|---|---|
| +1 dia | Script de redireccions. Search Console: errors de rastreig i URL no trobades. |
| +7 dies | Informe de pàgines: rutes aprovades indexades o en procés. URL antigues que donen 404. |
| +28 dies | Comparació amb la línia base: clics de marca, pàgines d'entrada i redireccions encara visitades. Auditoria claude-seo (B5). |
| +3 mesos | Decidir si `/estructuras/` i `/motores/` passen a 301 (si existeix la versió ES). |
| ≥ 1 any | Mantenir totes les redireccions 301 i 410. |

---

## 6. Requisits per començar i per publicar

### Per començar el SEO (ara)

| Requisit | Tipus | Imprescindible |
|---|---|---|
| Previsualització pública (`revisio-client`) | Ja disponible | Sí |
| Autorització per redesplegar la previsualització quan calgui comprovar canvis | Director | Sí |
| Accés a Search Console (via Site Kit o D4) | Client | Sí, per a la línia base i el seguiment |
| Accés de gestor al GBP | Client | Sí, per a B6 i D1 |
| Validació de les propostes de l'apartat 3 | Director | Sí, abans de C1 |
| Lectura de GA4 per a la línia base històrica | Client | Opcional |
| Clau d'API de PageSpeed i CrUX (D7) | Client | Opcional |

### Per publicar (condicionants del llançament)

Poden avançar en paral·lel al SEO, però tots s'han de complir abans del canvi de DNS:

| Condicionant | Referència | Responsable |
|---|---|---|
| Continguts aprovats per indexar | C1 | Director |
| Formulari operatiu i provat (condició per indexar Contacte) | 8.5 | Claude i director |
| Imatges conceptuals resoltes i drets d'imatge | 8.6 | Client i director |
| Seguretat: CSP i HSTS al domini | B4 / 8.9 | Claude |
| Revisió final de l'assessor | 8.10 | Assessor |
| Telèfon i adreça definitius (NAP) | C3, C5 | Client |
| Decisions de redirecció | C2, C11 i adreces noves | Director i client |
| Crèdits de Netlify | T13 | Client o director |
| Inventari DNS i finestra de canvi amb mayasystems.net | D5.3 | Client |
| Validació final del client sobre la web completa | — | Client |

---

## 7. Seguiment

**Sense analítica nova i sense eines de pagament.** Les fonts són Search Console, el Perfil d'Empresa, els enviaments del formulari quan funcioni, i el registre de contactes del client.

| Indicador | Font | Freqüència | Criteri |
|---|---|---|---|
| **Indexació** de les rutes aprovades | Search Console, informe de pàgines i inspecció | Setmanal el primer mes; després mensual | Les 9 rutes comercials aprovades i les legals, indexades. Cap «Rastrejada, no indexada» sense explicació. |
| **Errors** | Search Console: 404, errors de servidor, redireccions; script de redireccions | +1, +7, +28 dies; després mensual | Cap URL antiga amb valor en 404. Cap error 5xx. |
| **Cerques rellevants** | Search Console, consultes per pàgina | Mensual | Agrupades en marca, serralleria local, portes i automatismes, estructures i baranes, i Industrial. Cada grup ha d'arribar a la seva pàgina propietària (apartat 3). |
| **Clics** | Search Console; clics al web del GBP | Mensual | Comparar amb la línia base: 102 clics del GBP en sis mesos (uns 17 al mes) i l'export de Search Console. |
| **Contactes reals** | Enviaments del formulari (Netlify Forms, quan s'activi la 8.5); trucades i indicacions del GBP (B6); registre del client | Mensual | Tendència de consultes per branca. Les trucades des del web no es poden atribuir sense analítica: es proposa que el client anoti com l'han conegut. |
| Puntuació d'auditoria | claude-seo | Trimestral | Indicador secundari. No guia prioritats. |

**Opció per decidir (P2, sense galetes):** que el formulari enviï, en un camp ocult, la pàgina des d'on s'envia, per saber quines rutes generen consultes. Es valoraria amb la 8.5 i la revisió de l'assessor.

---

## 8. Bloc 1 · Proposta d'implementació (executat el 08/10/2026)

**Executat:** vegeu [FASE6-bloc1-resultats.md](FASE6-bloc1-resultats.md). Canvis respecte a la proposta: la condició d'indexació no depèn només del context de producció; s'hi afegeixen regles de domini per al subdomini de Netlify i per a la variant sense `www`; i les quatre URL descobertes queden registrades com a sense decisió.

**Abast:** tècnic, sense canvis de contingut públic ni d'estats d'indexació. Durada orientativa: una sessió.

| # | Tasca | Fitxers | Detall | Criteri de comprovació |
|---|---|---|---|---|
| 1.1 | **`noindex` fora del domini definitiu** | `src/integrations/netlify-files.mjs`; documentació a `fases/fase-5/FASE5-indexacio.md` | En acabar el build, s'afegeix a `dist/_headers` un bloc `/*` amb `X-Robots-Tag: noindex`, **tret que** `CONTEXT=production` i `URL` sigui el `site` d'`astro.config.mjs`. Netlify defineix totes dues variables al build. Els builds locals i els de l'àlies `revisio-client` sempre porten `noindex`. Ho indica un missatge al registre del build. | • Build local: `dist/_headers` conté la capçalera.<br>• Build amb `CONTEXT=production URL=https://www.serralleriacarbo.com`: no la conté.<br>• Amb autorització per redesplegar l'àlies: `curl -I` mostra `X-Robots-Tag: noindex`.<br>• Passen `npm run verify`, `check:links` i `check:redirects`. |
| 1.2 | **Comprovació en viu de redireccions** | `scripts/check-live-redirects.mjs` (nou, sense dependències); `package.json` (`check:redirects:live`) | Reutilitza `scripts/lib/redirect-plan.mjs`. Per a cada regla llesta, demana la URL antiga a una adreça base sense seguir redireccions. Comprova:<br>• l'estat;<br>• la `Location` exacta i en un sol salt;<br>• que el destí doni 200;<br>• les variants sense barra final;<br>• que `/` i `/contacte/` donin 200. | • `npm run check:redirects:live -- https://revisio-client--serralleriacarbo.netlify.app` surt amb 0 i llista les 13 regles.<br>• Un destí canviat a mà fa fallar l'script. |
| 1.3 | **Validació prèvia sobre la previsualització** (només lectura) | Informe a `fases/fase-6/` | B3 amb el Rich Results Test i el validador de Schema.org a la Home, Contacte i una pàgina amb molles de pa. PageSpeed des del web (mòbil) a la Home, Particulars i Industrial. `seo-technical` de claude-seo. | Informe amb resultats, errors i avisos, i les accions que se'n deriven. |
| 1.4 | **Línia base de la web WordPress** (només lectura) | `fases/fase-6/` | `seo-drift` sobre les URL de 5.1 i un export de les respostes actuals (estat, `Location`). Si ja hi ha accés a Search Console, també l'export de 5.2. | Fitxers de línia base desats i fets abans de cap canvi de DNS. |
| 1.5 | **Estats del pla** | `fases/fase-6/FASE6-pla-accio.md` | Actualitzar els estats segons l'apartat 2 d'aquest document (B1 ampliat, B2 i compressió, D4 amb Site Kit, D5 amb crèdits, C12 obsolet). | Cap punt contradiu el codi ni les decisions posteriors. |

**Dependències del bloc 1:**
- cap decisió de contingut;
- l'autorització del director per redesplegar l'àlies `revisio-client` (per comprovar 1.1);
- per al punt 1.4, l'accés a Search Console és opcional.

**Límits:** fins que no es recuperin els crèdits de Netlify, el punt 1.1 no arribarà a `serralleriacarbo.netlify.app`, que és producció. Mentrestant, aquella adreça continua sense `noindex` per a Projectes i les legals.

**Fora del bloc 1:**
- **Bloc 2:** contingut, amb validació del director. C8, la nova descripció d'Industrial i, si es vol, el títol d'Estructures. Inclou el registre a `VALIDATED_REVISIONS`.
- **Bloc 3:** quan es resolguin C1 i C2, aprovacions i noves regles de redirecció.
- **Llançament:** l'apartat 5.3.
