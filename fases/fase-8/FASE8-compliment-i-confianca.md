# Fase 8 · Compliment legal, privacitat i accessibilitat

**Data:** 02/10/2026 · **Estat:** validada pel director el 02/10/2026; la publicació passa a ser la Fase 9 · **Origen:** auditoria a partir d'un vídeo de referència aportat pel director, contrastada amb l'estat real de la web.

> Aquest document no és assessorament jurídic. Ordena què cal tenir abans de publicar i qui ho ha d'aportar. Els textos legals els ha de redactar o validar el client o el seu assessor (`CLAUDE.md`: no s'inventen textos legals).

## 1. El vídeo

- **Fitxa:** vídeo de TikTok de @davidcossios, de 48 s.
- **Format:** un *prompt* a Claude («Ey, Claude, no quiero que demanden mi sitio web vibecodeado; por favor, agrega:»). En acabar la frase, apareix a la pantalla una llista de 19 punts, que es tanca amb «No cometas errores». La resta de la locució no porta subtítols i no s'ha transcrit; aquest document es basa en la frase inicial i en els 19 punts de la pantalla.
- **Valoració del vídeo:** és una llista genèrica pensada per a webs fetes amb IA. Barreja obligacions reals de la Unió Europea (privacitat, cookies, dades de l'empresa) amb punts propis d'altres mercats o de botigues en línia (reemborsaments, ressenyes, «lleis locals»). L'hem adaptat al cas de Serralleria Carbó: empresa catalana, web informativa sense venda en línia i un formulari de contacte.

**Els 19 punts:**

| | | |
|---|---|---|
| Política de privacidad | Términos y condiciones | Política de cookies |
| Consentimiento de cookies | Solo datos necesarios | Consentimiento en formularios |
| Política de reembolsos | Seguimiento de analíticas | Integraciones de terceros |
| Sitio accesible | Contraste de colores | Texto alternativo |
| Formularios por teclado | Etiquetas claras | Eliminar reseñas falsas |
| Afirmaciones sin respaldo | Datos del negocio | Copyright de imágenes |
| Leyes locales | | |

## 2. Auditoria punt per punt

**Llegenda:**

- **Fet:** ja està resolt a la web.
- **Pendent:** cal fer-ho abans de publicar.
- **Condicionat:** només cal si s'activa alguna cosa (analítica, ressenyes…).
- **No aplica:** no correspon a aquesta web.

### Legal i privacitat

| Punt | Estat actual | Valoració | Què cal fer |
|---|---|---|---|
| **Política de privacitat** | Ruta `/legal/privacitat/` prevista; text bloquejat a l'espera del client. Enllaç del peu marcat «(pendent)». | **Pendent, obligatori** (RGPD i LOPDGDD) | Text del client o de l'assessor. Ha d'incloure: responsable, finalitats (respondre consultes), base legal, conservació, destinataris (allotjament i servei del formulari), drets i reclamació davant l'APDCAT o l'AEPD. Jo el publico amb la plantilla legal. |
| **Dades de l'empresa** | Es mostren raó social, adreça, telèfons i correu (pàgines de Contacte i Empresa, i dades estructurades). **Falten el NIF i les dades registrals.** | **Pendent, obligatori** (LSSI, art. 10) | El client aporta el NIF i les dades del Registre Mercantil. Van a l'avís legal i, si es vol, al peu. |
| **Termes i condicions** | No n'hi ha. Avís legal previst a `/legal/avis-legal/` (bloquejat). | **L'avís legal és obligatori; uns termes de venda no aplicarien** | No hi ha venda en línia, així que no calen condicions de contractació. Les condicions d'ús de la web poden anar dins de l'avís legal. Text del client o de l'assessor. |
| **Política de cookies** | Ruta `/legal/cookies/` prevista; text en revisió. Avui **la web no instal·la cap galeta ni desa res al navegador**: font local i cap script de tercers. | **Condicionat, però recomanat** | El mapa de Google només es carrega quan el visitant el demana, i aleshores Google pot desar galetes. Recomano publicar la política de cookies amb el mapa i qualsevol analítica futura. |
| **Consentiment de cookies (bàner)** | No n'hi ha, perquè avui no hi ha galetes que el requereixin. El mapa es carrega amb una acció explícita i un avís. | **Condicionat** | Obligatori si s'activen Google Analytics, Tag Manager o Clarity (Fase 6). Ha de bloquejar-los fins que el visitant accepti, amb «Acceptar» i «Rebutjar» igual de visibles i l'opció de canviar d'opinió. Si no s'activa l'analítica, no cal. |
| **Consentiment als formularis** | El formulari no envia. Hi ha un avís que diu que el text de privacitat s'afegirà abans d'activar-lo. | **Pendent, obligatori abans d'activar-lo** | Informació bàsica de privacitat al costat del botó (primera capa) i enllaç a la política. Com que la base legal és respondre la consulta, normalment n'hi ha prou d'informar, sense casella obligatòria; que ho decideixi l'assessor. Cap casella marcada per defecte ni cap ús comercial sense consentiment a part. |
| **Només dades necessàries** | Obligatoris: nom, correu, servei (o tipus de peça) i descripció. Opcionals: telèfon, població i adjunt. Res a l'adreça web. | **Fet** | Revisar-ho amb la política de privacitat: conservació i esborrat dels adjunts. |
| **Seguiment d'analítica** | No n'hi ha cap instal·lada. | **Condicionat** (Fase 6) | Quan hi hagi accés: carregar-la només amb consentiment, configurar-la de manera que respecti la privacitat i declarar-la a la política de cookies. |
| **Integracions de tercers** | WhatsApp (només un enllaç), Google Maps (a petició) i dades estructurades. No hi ha fonts, scripts ni píxels externs. | **Fet a la web; pendent a la documentació** | Declarar a la privacitat els encarregats del tractament que es triïn (allotjament, servei del formulari) i signar-hi el contracte corresponent. |
| **Política de reemborsaments** | No n'hi ha. | **No aplica** | No es ven res en línia. Si algun dia hi ha botiga, caldria (dret de desistiment). |
| **Lleis locals** | Web en català (Codi de consum de Catalunya). Dades de contacte visibles. | **Parcialment fet** | Confirmar amb l'assessor l'encaix amb la LSSI, el RGPD, la LOPDGDD i el Codi de consum. Accessibilitat: vegeu el bloc següent. |

### Accessibilitat

| Punt | Estat actual | Valoració | Què cal fer |
|---|---|---|---|
| **Web accessible** | Auditoria estructural feta (Fase 7): una H1, encapçalaments sense salts, landmarks, noms accessibles, focus visible, moviment reduït i ús sense JavaScript. | **Fet en l'estructura; falta la prova manual** | Prova amb lector de pantalla (NVDA i VoiceOver) i amb fotografies definitives. Valorar una **declaració d'accessibilitat** (vegeu la nota). |
| **Contrast de colors** | Correcte sobre fons sòlids. La coma bordeus de la Home és un signe de marca. El text sobre fotografia porta ombra de lectura. | **Fet; queda revisar el text sobre fotografia** | Revisar-lo amb les fotografies definitives. |
| **Text alternatiu** | Totes les imatges en tenen; les decoratives, buit. | **Fet; queda revisar-lo** | Revisar els textos alternatius quan entrin les fotografies pròpies. |
| **Formularis per teclat** | Provat: fletxes per triar la branca, focus visible, errors associats i focus al primer error. | **Fet** | — |
| **Etiquetes clares** | Tots els camps tenen etiqueta visible, ajuda i error associats. | **Fet** | — |

**Nota sobre la normativa d'accessibilitat.** La Llei europea d'accessibilitat (EAA), traslladada a Espanya per la Llei 11/2023, obliga des del 28/06/2025 sobretot a productes i serveis com el comerç electrònic. Una web informativa amb formulari de contacte segurament no hi entra, però amb 12 persones l'empresa no és microempresa. Cal que ho confirmi l'assessor. Igualment, complir WCAG 2.1 AA és el criteri de qualitat que ja apliquem.

### Confiança i continguts

| Punt | Estat actual | Valoració | Què cal fer |
|---|---|---|---|
| **Eliminar ressenyes falses** | No hi ha ressenyes ni testimonis. La norma del projecte prohibeix inventar-ne. | **No aplica** | Si algun dia s'hi mostren ressenyes de Google, que siguin reals, sense filtrar-les per nota, i amb la font indicada (Directiva Òmnibus). |
| **Afirmacions sense suport** | Totes les xifres es comproven al build contra `content/ca/`. Les ISO consten «en procés, no certificacions vigents». L'horari està confirmat. | **Fet** | Es manté: cap dada nova sense font (`CLAUDE.md`). |
| **Copyright de les imatges** | Fotografies recuperades de la web antiga. Imatges conceptuals generades amb IA, sense indicar-ho. Font amb llicència OFL inclosa. | **Pendent** (excepte els punts 1 i 3) | (1) ~~Confirmació escrita del client que les fotografies són seves o que té drets per usar-les.~~ **Confirmats pel director els permisos d'ús de les fotografies actuals (15/10/2026)**; les imatges no es modifiquen. (2) **Consentiment de dret d'imatge** de les persones identificables (operaris, per exemple a la foto de reparació). (3) ~~Substituir les imatges conceptuals per fotografies pròpies.~~ **Tancat per decisió del director (09/10/2026): les fotografies visibles actuals són definitives** (vegeu 8.6). |

## 3. El que el vídeo no diu i també cal per a una web definitiva

| Àmbit | Element | Estat |
|---|---|---|
| Seguretat | HTTPS, redirecció del domini sense `www`, capçaleres de seguretat (HSTS, CSP, `X-Content-Type-Options`, `Referrer-Policy` i `Permissions-Policy`) | **Capçaleres implementades i comprovades a `revisio-client` (16/10/2026, apartat 7).** Pendent a producció: HSTS al domini propi, HTTPS i redirecció del domini |
| Formulari | Enviament real; validació al servidor; antispam sense galetes (camp parany i límit d'enviaments); límit d'adjunt; correu del domini amb SPF, DKIM i DMARC perquè no vagi a correu brossa | Pendent de l'allotjament |
| Migració | Redireccions 301/410 de la web antiga, generades del mapa i provades després del desplegament | Mapa preparat |
| SEO | Search Console, sitemap enviat, fitxa de Google Business Profile coherent amb la web | Fase 6 |
| Idiomes | Castellà i anglès validats, si es publiquen | Pendent |
| Operació | Còpies de seguretat del repositori; actualització de dependències; responsable de mantenir els textos legals; revisió anual | Per definir |

## 4. Valoració sincera

**Cal implementar abans de publicar** (bloquejants):

1. **Avís legal** amb el NIF i les dades registrals. Obligatori per a qualsevol web d'empresa.
2. **Política de privacitat**, amb la informació al formulari i els encarregats del tractament declarats.
3. **Formulari operatiu i segur:** allotjament, servidor, antispam, correu del domini i prova real amb adjunt. O bé no oferir-lo com a funcional.
4. **Drets de les imatges:** propietat de les fotografies i consentiment de les persones identificables. La substitució de les imatges conceptuals ja no cal: les fotografies visibles actuals són definitives (director, 09/10/2026).
5. **Seguretat bàsica de l'allotjament:** HTTPS i capçaleres.

**Cal si s'activa** (condicionats):

- **Política de cookies:** recomanada ja ara per Google Maps.
- **Bàner de consentiment:** només amb analítica.
- **Analítica configurada amb privacitat:** Fase 6.

**Recomanat, no bloquejant:**

- Prova amb lector de pantalla.
- Declaració d'accessibilitat.
- Revisió del text sobre fotografia.
- Pla de manteniment.

**No cal:**

- Política de reemborsaments.
- Termes i condicions de venda.
- Gestió de ressenyes falses.

Mentre no hi hagi venda en línia ni ressenyes, només afegirien text que no correspon a cap servei de l'empresa.

La major part del que ens falta **no és desenvolupament, sinó documentació i decisions del client**. El que és tècnic és acotat i ja té el lloc preparat (rutes legals, avís del formulari, mapa a petició).

## 5. Proposta de fase

Proposo una **Fase 8 · Compliment legal, privacitat i accessibilitat** abans de la publicació. La publicació passaria a ser la Fase 9. És el pas que converteix «web acabada» en «web publicable».

| # | Tasca | Qui | Depèn de |
|---|---|---|---|
| 8.1 | Recollir les dades obligatòries: NIF, Registre Mercantil, responsable del tractament i delegat de protecció de dades si n'hi ha | Client | — |
| 8.2 | Redactar o validar l'avís legal, la privacitat i les cookies | Client o assessor | **Fet (06/10/2026):** textos de l'advocat adaptats i aprovats (apartat 6). Historial: **Esborranys redactats per Claude per encàrrec del director (02/10/2026)**, per a la revisió del client i del seu advocat: avís legal (LSSI-CE, art. 10), política de privacitat (RGPD, art. 13), política de cookies (inventari real: cap cookie pròpia; Google Maps només a petició) i informació de primera capa del formulari (sense casella; base precontractual). Només dades confirmades; les que falten, marcades «[PENDENT: …]» (NIF, Registre Mercantil, delegat de protecció de dades, proveïdors i transferències). Es publiquen amb l'avís «Text pendent de revisió jurídica» i `noindex`; el build no deixa aprovar un text que encara tingui «[PENDENT». **Discrepància amb `CLAUDE.md`** («no inventis textos legals»): s'aplica la indicació posterior del director; són esborranys sense valor de text definitiu fins que l'advocat els validi. |
| 8.3 | Plantilla de pàgina legal i publicació de les tres pàgines (sense `noindex` en aprovar-les); enllaços del peu actius | Claude | 8.2 · **Plantilla feta (02/10/2026):** `src/templates/LegalTemplate.astro` i `src/pages/legal/[page].astro`. El build només genera les pàgines aprovades; en desenvolupament es veuen els esborranys amb un avís. Camp opcional `updated` per mostrar la data de revisió. Provat en una còpia: en aprovar un text, la pàgina es genera, entra al sitemap i el peu l'enllaça. Falta: els textos (8.2). |
| 8.4 | Informació de privacitat de primera capa al formulari i enllaç a la política (casella només si ho indica l'assessor) | Claude | **Fet (06/10/2026):** caselles i informació bàsica del redactat de l'advocat (apartat 6). Historial: **Lloc preparat (02/10/2026):** el text va a `content/ca/legal-formulari.md` (ara bloquejat, sense cap text legal). En aprovar-lo, el formulari mostra el bloc abans del botó d'enviar i l'avís deixa de dir que la privacitat és pendent. Si l'assessor demana casella, `consent: true` i el text a `consentLabel`: el formulari no deixa continuar fins que es marca. Provat en una còpia: bloc, casella, error i focus, 48 px de tacte, i `check:links` atura un enllaç a la política de privacitat mentre no estigui publicada. Falta: el text (8.2). |
| 8.5 | Formulari operatiu: servei triat, validació al servidor, antispam sense galetes, límit d'adjunt, correu del domini (SPF, DKIM i DMARC) i prova real | Claude i director | Allotjament · **Decisió del director (09/10/2026): Microsoft 365** (funció de Netlify + Microsoft Graph), que substitueix Netlify Forms. `carbo@serralleriacarbo.com` és remitent i destinatari (subjecte a l'administrador), el Reply-To és el correu validat del visitant i el destinatari està fixat al servidor. **Implementat en local en mode de demostració i provat (55 proves unitàries i 31 de navegador, incloses les correccions de la revisió de Codex: referències per mode i entorn, serveis amb claus pròpies, Industrial sense JavaScript i `RL_SECRET` obligatori en `test` i `live`)**. **Desplegat a `revisio-client` en mode de demostració (09/10/2026, commit `8ba62b0`)**, comprovat a Netlify (formularis català i castellà, adjunts, límits, duplicats i neteja; pla, §6.1). Cap correu enviat. Pendents: administrador de Microsoft 365 (missatge definitiu al pla, §10), `RL_SECRET`, DKIM i DMARC, prova real. [FASE8-formulari-real-pla.md](FASE8-formulari-real-pla.md) |
| 8.6 | Drets d'imatge: confirmació de propietat i consentiments de les persones identificables | Client i director | **Decisió del director (09/10/2026): les fotografies visibles actuals són definitives.** No se substitueixen les imatges conceptuals. **Continua vigent:** cap text no pot presentar una imatge conceptual com a obra real de l'empresa (`CLAUDE.md`). **Permisos d'ús de les fotografies actuals: confirmats pel director el 15/10/2026** (registre sense cap canvi a les imatges). **Continuen pendents:** (2) els consentiments de dret d'imatge de les persones identificables, que la confirmació dels permisos d'ús no cobreix expressament; (3) si cal indicar que algunes imatges són generades, ho decideix l'assessor a 8.10. **Pendent separat:** què fer amb les URL antigues de les 12 fotografies de WordPress ([FASE6-bloc4-redireccions.md](../fase-6/FASE6-bloc4-redireccions.md), apartat 2). Aquesta decisió no el resol |
| 8.7 | Consentiment de cookies i analítica (només si s'activa la Fase 6): bloqueig previ, «Acceptar» i «Rebutjar» igual de visibles, opció de canviar | Claude | Fase 6 |
| 8.8 | Accessibilitat: prova amb lector de pantalla, revisió del text sobre fotografia i, si es vol, declaració d'accessibilitat | Claude i director | Fotografies definitives · **En curs (16/10/2026, apartat 8):** auditoria automàtica de les 38 pàgines, correccions sense canvi visual i vel reforçat al text sobre fotografia (tot el text mesurat compleix). «1989» en bordeus mantingut per decisió del director. **Pendent:** prova manual amb lector de pantalla i decisió sobre la declaració |
| 8.9 | Capçaleres de seguretat i HTTPS a l'allotjament | Claude | Allotjament · **Implementat i comprovat a `revisio-client` (16/10/2026, apartat 7):** CSP amb empremtes a totes les pàgines, `frame-ancestors`, CSP de les respostes del formulari i la resta de capçaleres ja existents. **Pendent a producció:** HSTS al domini propi, HTTPS i redirecció de `www` |
| 8.10 | Revisió final de l'assessor sobre la web completa | Assessor | 8.3–8.9 |

**Criteri de sortida:**

- tots els bloquejants del punt 4 resolts;
- `npm run verify` i `npm run check:links` en verd;
- cap enllaç legal marcat «(pendent)»;
- l'assessor dona el vistiplau.

## 6. Textos legals de l'advocat (06/10/2026)

El client va lliurar els textos revisats pel seu advocat (versió de maig de 2025): nota legal, política de cookies, política de privacitat i redactat del formulari de contacte. Substitueixen els esborranys de la tasca 8.2. Queden publicats com a `approved`, indexables i sense l'avís de revisió jurídica. Amb això es tanquen la tasca 8.2 i la 8.4 (formulari), i la 8.3 queda activa amb els tres enllaços del peu.

### Dades que aporten els textos

| Dada | Valor |
|---|---|
| Registre Mercantil | Barcelona, tom 24959, foli 101, secció 8, full B 33238, inscripció 17 |
| Domicili social | C/ Eugeni d'Ors, 59-61, 08720 Vilafranca del Penedès |
| Delegat de protecció de dades | No n'hi ha. Hi ha una persona de contacte interna, a carbo@serralleriacarbo.com |
| Base legal del formulari | Consentiment de l'interessat. Per això hi ha la casella obligatòria |

### Adaptacions al lloc web nou (a confirmar per l'advocat)

Els textos eren els del web antic (WordPress). S'ha conservat la redacció de l'advocat i només s'ha canviat el que no corresponia al web nou:

| Text | Adaptació | Motiu |
|---|---|---|
| Tots | Enllaços a `/legal/privacitat/` i `/legal/cookies/` | Les adreces `/politica-de-privacitat/` i `/politica-de-cookies/` no existeixen al web nou. A més, s'hi han afegit redireccions 301 |
| Tots | Correccions tipogràfiques i de format: majúscules, puntuació, «LSSI», un element de llista que en tenia dos d'enganxats, un paràgraf repetit a «Contingut i ús» | Llegibilitat |
| Avís legal i privacitat | Apartat de cookies d'acord amb el funcionament real del web | El text deia que el web fa servir cookies per optimitzar la navegació. El web nou no n'instal·la cap de pròpia |
| Cookies | La taula de cookies es substitueix per l'inventari real: cap cookie pròpia i Google Maps només a petició de l'usuari | La taula descrivia el web antic (Google Analytics, CookieYes, Clarity, reCAPTCHA, Google Ads, Microsoft), cap d'ells actiu al web nou. Publicar-la seria inexacte |
| Cookies | Enllaços dels navegadors actualitzats (Chrome, Firefox, Safari, Safari per a iOS, Edge, Opera) | Internet Explorer ja no existeix i l'enllaç d'Opera era de la versió 11 |
| Cookies | Sense panell de consentiment (capa 1) | El web no instal·la cookies que el requereixin. El mapa de Google només es carrega quan l'usuari ho demana, amb l'avís al costat del botó. Si s'activa l'analítica (Fase 6), cal el panell (tasca 8.7) i actualitzar la taula |
| Privacitat | Llista de proveïdors que tracten dades per compte de l'empresa: Netlify (allotjament i formularis), Microsoft 365 (correu) i mayasystems.net (domini i DNS) | Informació obligatòria (art. 13 del RGPD) que el text no incloïa |
| Privacitat | Garanties de transferència: Marc de privacitat de dades UE-EUA o clàusules contractuals tipus, en lloc del «Privacy Shield» | El Tribunal de Justícia de la UE va anul·lar el «Privacy Shield» el 2020 (sentència Schrems II). Netlify és als Estats Units |
| Privacitat | Autoritat de control: Agència Espanyola de Protecció de Dades (www.aepd.es) | El text deia «l'autoritat de protecció de dades» sense concretar-la |
| Formulari | «Altres mitjans de comunicació electrònics» en lloc d'«ofimàtics» | Terminologia de l'art. 21 de la LSSI |

### Formulari

Segueix l'opció B del redactat:
1. Casella obligatòria «He llegit, entès i accepto la política de privacitat», amb enllaç a la política. El formulari no deixa continuar sense marcar-la.
2. Informació bàsica de protecció de dades (responsable, finalitat, legitimació, destinataris i drets).
3. Casella voluntària i desmarcada de comunicacions comercials, amb la nota per revocar-les («BAIXA»).

Les caselles s'envien amb els noms `consentiment` i `comunicacions`. El formulari encara no envia: queda pendent de la tasca 8.5.

### Versions en castellà (08/10/2026)

El web es publica també en castellà. No hi ha cap versió castellana aprovada dels textos de l'advocat. S'han preparat traduccions fidels de l'avís legal, la privacitat, les cookies i el text del formulari (`content/es/legal-*.md`). Es mostren amb l'avís «Traducción pendiente de revisión jurídica» i `noindex` fins que el client i el seu advocat les validin. Cal fer-ho abans del llançament. Detall: [FASE6-bloc5-castella](../fase-6/FASE6-bloc5-castella.md#4-textos-legals).

### Punts per confirmar amb el client o l'advocat

- **Empreses del grup:** la política diu que les dades «podran ser compartides amb altres empreses del grup». Si Serralleria Carbó no forma part de cap grup, convé treure aquesta frase.
- **Finalitats genèriques:** la política inclou finalitats que el web nou no fa servir (pagaments, concursos i sortejos, valoracions automàtiques i perfils). No és incorrecte, però l'advocat pot decidir si les manté.
- **Domicili:** el domicili social és el 59-61. El web i el Perfil d'Empresa mostren el 59 com a adreça de contacte. Cal confirmar si el contacte també ha de dir 59-61 (decisió C5 de la Fase 6).
- **Comunicacions comercials:** si es marquen consentiments de màrqueting, l'empresa ha de conservar la prova del consentiment i atendre les baixes.

## 7. Capçaleres de seguretat (tasca 8.9, 16/10/2026)

### 7.1 Estat de partida

Capçaleres de la previsualització (`revisio-client`), consultades el 16/10/2026:

| Capçalera | Valor | Origen |
|---|---|---|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` | Netlify, al domini `netlify.app` |
| `X-Content-Type-Options` | `nosniff` | `public/_headers` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | `public/_headers` |
| `Permissions-Policy` | Càmera, micròfon, ubicació, pagaments, USB i `interest-cohort` desactivats | `public/_headers` |
| `X-Frame-Options` | `SAMEORIGIN` | `public/_headers` |
| `X-Robots-Tag` | `noindex` | Build no definitiu (`netlify-files.mjs`) |
| `Content-Security-Policy` | **No n'hi havia** | Pendent: calia provar-la abans d'activar-la |

### 7.2 Implementació

**Content-Security-Policy de les pàgines** (`astro.config.mjs`, `security.csp` d'Astro 7):
- **Generació:** cada pàgina porta un `<meta http-equiv="content-security-policy">`.
- **`script-src 'self'` més l'empremta SHA-256 de cada script de la pàgina.** **Sense `'unsafe-inline'`:** un script injectat no s'executa.
- **Script inicial de `BaseLayout`** (marques `js` i `motion-ready` abans del primer pintat):
  - és ara a `src/scripts/early-flags.inline.js` i la plantilla l'insereix tal qual com a **primer element del `<body>`**;
  - Astro no en calcula l'empremta: la calcula `src/config/csp-hashes.mjs` a partir del mateix fitxer i s'afegeix amb `scriptDirective.hashes`.
- **Correcció de la revisió de Codex (16/10/2026):** el script era al `<head>`, abans del `<meta>` que Astro insereix al final del `<head>`, i un `<meta>` només s'aplica als elements posteriors. Per tant, aquell script s'executava fora de la política.
  - **Efecte del canvi:** en moure'l sota la política va quedar bloquejat, i això va revelar que no en tenia l'empremta.
  - **Ara:** cap pàgina no té cap script executable abans de la política, i la comprovació `check-csp.py` ho vigila.
- **`style-src 'self'` més les empremtes dels estils de la pàgina.**
- **`style-src-attr 'unsafe-inline'`:** és l'única excepció. Les plantilles fan servir atributs `style` amb variables CSS (`--i` per a les entrades escalonades, `--chars` per als titulars ajustats, etc.). Només afecta estils i no permet executar codi.
- **Resta de directives:**
  - `default-src 'self'`, `img-src 'self'`, `font-src 'self'`, `connect-src 'self'` i `manifest-src 'self'`;
  - `media-src 'none'` i `object-src 'none'`;
  - `form-action 'self'` i `base-uri 'self'`;
  - `upgrade-insecure-requests`.
- **`frame-src https://www.google.com https://maps.google.com`:** el mapa de Google, que només es carrega si el visitant el demana.
- **Shiki desactivat** (`markdown.syntaxHighlight: false`). Cap contingut no té blocs de codi, i Shiki fa servir estils en línia incompatibles amb la CSP.

**`frame-ancestors 'self'`** (`public/_headers`):
- un `<meta>` no admet aquesta directiva, per això va en una capçalera `Content-Security-Policy` que no restringeix res més;
- `X-Frame-Options: SAMEORIGIN` es manté per als navegadors antics.

**Respostes de la funció del formulari** (`src/lib/contact/handler.ts`):
- **JSON:** `default-src 'none'; frame-ancestors 'none'`.
- **Pàgina sense JavaScript:** `default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'`. Només hi ha el bloc d'estil fix de la pàgina i enllaços: cap script, imatge ni formulari.
- **A totes dues:** `X-Content-Type-Options: nosniff`.

### 7.3 Comprovacions (local, 16/10/2026)

| Prova | Resultat |
|---|---|
| `scripts/qa/check-csp.py` (Chromium, amb JavaScript) | **41/41.** Les 38 pàgines tenen la CSP sense `'unsafe-inline'` a `script-src` i sense cap script executable abans de la política; cap bloqueig (esdeveniments `securitypolicyviolation` ni consola); els scripts s'executen i els atributs `style` s'apliquen. Les tres interaccions passen sense bloquejos: menú mòbil, desplegable d'idioma, mapa de Google sota demanda i filtres del portafoli |
| **Control negatiu** | Un script inserit i una imatge externa afegits des de la consola de proves **es bloquegen** (`script-src-elem` i `img-src`), i la prova ho detecta |
| `check-contact-form.py` | **37/37** amb la CSP activa, amb JavaScript i sense |
| `check-language-switcher.py` | **15/15** |
| `npm run test:contact` | **58/58**, amb comprovacions noves de la CSP de les respostes |
| `npm run verify`, `check:i18n` i `check:links` | Correctes |

**Incidència aliena a la CSP:**
- **Símptoma:** la prova del formulari sense JavaScript s'aturava en marcar el consentiment amb `page.check()` (element «no estable»).
- **Causa:** el mateix error es va reproduir amb la CSP desactivada. És la limitació coneguda de Playwright sense JavaScript.
- **Correcció:** la funció d'emplenar la prova ara marca la casella amb el teclat, com la resta de proves sense JavaScript.

**A Netlify** (desplegament `6ad2056351da11907bfdc55c` a `revisio-client`, sense `--prod`, autoritzat pel director):

| Comprovació | Resultat |
|---|---|
| **Capçaleres d'una pàgina** | `Content-Security-Policy: frame-ancestors 'self'`, `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy` i `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` (de Netlify, al domini `netlify.app`). `X-Robots-Tag: noindex` es manté |
| **Respostes de la funció** | Una petició il·legible respon `400` amb `Content-Security-Policy: default-src 'none'; frame-ancestors 'none'` i `nosniff`. No envia cap correu: el mode continua sent `dry-run` |
| **`check-csp.py` contra la previsualització** | **41/41.** Netlify no injecta cap codi que la política bloquegi |

**Revisió de Codex (16/10/2026):**
- **Troballa:** el script inicial s'executava abans de la política (apartat 7.2).
- **Correcció:** s'ha mogut sota la política i se n'ha afegit l'empremta. La comprovació `check-csp.py` vigila que cap script executable no quedi abans de la política.
- **Comprovacions posteriors:** totes s'han tornat a passar.
- **Desplegament intermedi:** el `6ad201fafd30f66b43f838ec` tenia la versió anterior a la correcció i ha quedat substituït.

### 7.4 Pendent

1. **Producció:**
   - HSTS al domini propi (Netlify l'activa amb HTTPS; cal comprovar el valor);
   - certificat HTTPS;
   - redirecció entre `www` i el domini sense `www`;
   - capçaleres a la resposta real.
2. **Si s'activa l'analítica (8.7) o s'afegeix algun recurs extern,** cal ampliar la CSP de manera explícita i tornar a passar `check-csp.py`.

## 8. Accessibilitat (tasca 8.8, 16/10/2026)

### 8.1 Eines i mètode

**`scripts/qa/check-a11y.py`** (Chromium):
- **axe-core 4.14.0:** dependència de desenvolupament amb versió fixa. No té dependències pròpies i no arriba a la web publicada.
- **Pàgines i amplades:** les 38 pàgines, a 1280 i 390 px.
- **Regles:** WCAG 2.0, 2.1 i 2.2, nivells A i AA.
- **Mode ràpid:** `… - axe` només passa axe.

**Text sobre fotografia:** axe no pot calcular el contrast quan el fons és una imatge. Per a aquests textos, la prova:
1. fa una captura amb el text i una altra sense;
2. pren com a lletres els píxels que canvien, amb un marge de 2 px;
3. calcula el contrast del color del text amb el fons real que hi ha just sota les lletres (fotografia i vels).
- **Criteri:** el 95 % d'aquest fons ha d'arribar a 4,5:1, o a 3:1 en text gran. Es mesura sense l'ombra del text.
- **Dues versions anteriors del mètode** donaven falsos positius i es van descartar:
  - als titulars amb reflex (degradat retallat), el text no s'amagava;
  - les vores o línies del fons allunyades de les lletres (per exemple, el quadrat de la fletxa del peu) penalitzaven la mesura.

**Arbre d'accessibilitat** (el que anuncia un lector de pantalla) de sis pàgines clau:
- encapçalaments;
- regions;
- noms dels enllaços;
- imatges;
- idioma;
- enllaç per saltar al contingut.

### 8.2 Correccions fetes (sense canvi visual)

| Troballa | Criteri | Correcció |
|---|---|---|
| Selector d'idioma: el botó mostra «CA», però el nom accessible era «Idioma: Català» | WCAG 2.5.3 (el nom ha de contenir el text visible) | Nom accessible «CA, Idioma: Català» (codi visible i text només per al lector). Prova del selector actualitzada |
| Logotip d'Industrial: mostra «Industrial», però el nom era «Serralleria Carbó, torna a l'inici» | WCAG 2.5.3 | «Serralleria Carbó Industrial, torna a l'inici» (`brandHomeIndustrial`, en els tres idiomes) |
| H1 de la Home: el lector només anunciava «Serralleria Carbó,» | WCAG 1.3.1 i 2.4.6 | L'H1 inclou, només per al lector, «a Vilafranca del Penedès des de 1989». El paràgraf visual de la ubicació queda amagat per al lector, perquè no es llegeixi dues vegades |
| Titulars partits en línies sense el punt del text original | Llegibilitat amb lector | Punt només per al lector entre línies: Home («Fabriquem al nostre taller. Muntem al teu projecte»), Industrial (H1 i «Un encàrrec real. Deu gàbies») i Particulars («Feines a mida. Respostes clares») |

**Resultat de l'arbre d'accessibilitat:**
- un H1 per pàgina i encapçalaments sense salts;
- regions;
- enllaç per saltar al contingut (`#contingut`);
- cap enllaç sense nom;
- `lang` correcte;
- imatges decoratives amb `alt` buit i imatges de projectes amb text alternatiu;
- les fletxes `↗` dels enllaços estan amagades per al lector.

Dos noms d'enllaç es repeteixen amb destins diferents, però el context els distingeix: «Formulari de contacte» (Particulars) i «Contacte» (Industrial).

**Comprovacions posteriors:**
- **axe:** 70/76 (les 6 restants són el «1989»);
- **`check-csp.py`:** 41/41;
- **formulari:** 37/37;
- **selector:** 15/15;
- **projecte:** `verify`, `check:i18n` i `check:links` correctes.

### 8.3 Decisions del director i vel reforçat (16/10/2026)

**1. «1989» de l'entrada de la Home: es manté en bordeus** (decisió del director).
- **Contrast:** bordeus `#7c2a30` sobre grafit `#2b2b2b`, 1,5:1. Incompleix la WCAG 1.4.3: és un **incompliment conegut i acceptat**.
- **Lector de pantalla:** l'any hi és igualment, dins de l'H1 complet («… des de 1989»).
- **Prova:** `check-a11y.py` el registra com a excepció acceptada (taula `ACCEPTED`). Surt a la sortida de cada execució, però no fa fallar la prova. Qualsevol altra infracció de contrast continua fallant.
- **Declaració d'accessibilitat:** si se'n fa, l'ha d'esmentar com a limitació.

**2. Text sobre fotografia: vel reforçat.**

Cap fotografia, color de la paleta ni composició no canvia. Només s'enfosqueix el vel de grafit **a la zona on hi ha text**, i la resta de la fotografia es manté com estava:

| Component | Canvi |
|---|---|
| **Home:** targetes dels camins | Vel més dens des del terç superior i cap a l'esquerra, on hi ha el text; la fotografia queda clara a dalt a la dreta. En mòbil, una mica més dens |
| **Home:** mosaic de serveis i targeta d'Industrial | Vel inferior més dens sota el títol i el text |
| **Particulars:** entrada | Franja fosca a dalt per a la frase d'accés a Industrial (escriptori i mòbil) |
| **Particulars:** targetes de serveis | Vel inferior més dens |
| **Serveis:** entrada | Franja a dalt per a les molles de pa i base més fosca per al botó de WhatsApp |
| **Serveis:** panells d'abast | Fosc a dalt (etiqueta) i a baix (títol i text); en mòbil, més uniforme |
| **Projectes:** entrada | Franja a dalt per a les molles de pa; en mòbil, vel central més dens per al títol |
| **Industrial:** entrada (mòbil) | Franja a dalt per a l'etiqueta i vel central més dens per al titular amb reflex |
| **Industrial:** capacitats | Fosc a dalt (etiquetes) i a baix (títol i text); en mòbil, més dens |
| **Industrial:** mètode (mòbil) | Vel més dens |
| **Capacitats:** entrada i producció (mòbil), plaques de materials | Vel més dens |

**Comprovació:** s'ha anat mesurant amb `check-a11y.py` fins que tots els textos sobre fotografia arriben al criteri.

| Pas | Textos per sota del criteri |
|---|---|
| Inicial (38 pàgines × 2 amplades) | 147 de 945 |
| Primera passada (pàgines en català) | 13 de 281 |
| Segona passada | 4 de 281 |
| Tercera passada | 0 de 161, a les quatre pàgines on en quedaven |
| Auditoria completa (38 × 2) | 3 de 898: textos més llargs en anglès i castellà, que ocupen més línies |
| Correcció final | 0 de 438, a les nou pàgines afectades. Els vels només s'han enfosquit, de manera que els textos que ja complien no poden empitjorar |

**Mesura afinada:**
- **Text centrat a la pantalla:** la prova el centra abans de capturar-lo.
- **Text tapat:** si un altre element el tapa, es descarta.
- **Exemple:** la fotografia enganxada de la història de Particulars, a 390 px, tapava els capítols mentre es fa desplaçament, i això donava falsos positius.

**Resultat final:**
- **axe:** 76/76, amb l'excepció del «1989» declarada;
- **`check-csp.py`:** 41/41;
- **formulari:** 37/37;
- **selector:** 15/15;
- **proves unitàries:** 58/58;
- **projecte:** `verify`, `check:i18n` i `check:links` correctes.

### 8.4 Prova manual amb lector de pantalla (director)

NVDA no és instal·lat en aquest equip, i una prova real l'ha de fer una persona. És gratuït per a Windows (nvaccess.org) i el pot instal·lar el director si ho decideix.

**Configuracions:**
- NVDA amb Chrome o Firefox a l'ordinador;
- VoiceOver a l'iPhone (Safari).

**Tasques, a la Home, a Particulars, a Industrial i a Contacte:**
1. **Encapçalaments:** recórrer-los (NVDA: `H`; VoiceOver: rotor «Encapçalaments»). Han de tenir sentit en ordre i fora de context.
2. **Regions** (NVDA: `D`): capçalera, navegació, contingut i peu.
3. **Enllaç per saltar al contingut:** amb el tabulador des de l'inici, el primer element ha de ser «Salta al contingut», i ha de funcionar.
4. **Menú mòbil i selector d'idioma:** s'anuncien com a botó i com a desplegable (amb l'estat obert o tancat), i Escape els tanca.
5. **Formulari de contacte:**
   - cada camp anuncia l'etiqueta i l'ajuda;
   - en enviar-lo buit, s'anuncien els errors i el focus va al primer;
   - en enviar-lo bé, s'anuncia el missatge final (regió d'estat).
6. **Mapa:** el botó «Veure el mapa» s'anuncia, i en activar-lo el mapa té títol.
7. **Imatges:** les de projectes s'anuncien amb el text alternatiu, i les decoratives no s'anuncien.

**Registre de resultats:** a cada tasca, «correcte» o la frase exacta que s'ha sentit.

### 8.5 Declaració d'accessibilitat

**Esborrany preparat el 20/10/2026:** [FASE8-declaracio-accessibilitat.md](FASE8-declaracio-accessibilitat.md), en català, amb les decisions pendents (on es publica, quan i termini de resposta) i les dades marcades «[PENDENT …]». Pendent del director i de l'advocat.

**És opcional** (vegeu la nota de l'apartat 2). Si el director la vol, es pot preparar una pàgina de declaració amb:
- el nivell que es pretén (WCAG 2.1 AA, 2.2 AA com a referència);
- les limitacions conegudes;
- la data de l'última revisió;
- un contacte per notificar problemes d'accessibilitat.

La declaració hauria d'esmentar l'excepció del «1989» (apartat 8.3) i el resultat de la prova manual amb lector de pantalla.
