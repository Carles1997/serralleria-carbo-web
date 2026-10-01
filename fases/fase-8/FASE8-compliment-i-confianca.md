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
| **Copyright de les imatges** | Fotografies recuperades de la web antiga. Imatges conceptuals generades amb IA, sense indicar-ho. Font amb llicència OFL inclosa. | **Pendent** | (1) Confirmació escrita del client que les fotografies són seves o que té drets per usar-les. (2) **Consentiment de dret d'imatge** de les persones identificables (operaris, per exemple a la foto de reparació). (3) Substituir les imatges conceptuals per fotografies pròpies, pendent ja obligatori. |

## 3. El que el vídeo no diu i també cal per a una web definitiva

| Àmbit | Element | Estat |
|---|---|---|
| Seguretat | HTTPS, redirecció del domini sense `www`, capçaleres de seguretat (HSTS, CSP, `X-Content-Type-Options`, `Referrer-Policy` i `Permissions-Policy`) | Pendent de l'allotjament |
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
4. **Drets de les imatges:** propietat de les fotografies, consentiment de les persones identificables i substitució de les imatges conceptuals.
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
| 8.2 | Redactar o validar l'avís legal, la privacitat i les cookies | Client o assessor | 8.1 i allotjament triat |
| 8.3 | Plantilla de pàgina legal i publicació de les tres pàgines (sense `noindex` en aprovar-les); enllaços del peu actius | Claude | 8.2 |
| 8.4 | Informació de privacitat de primera capa al formulari i enllaç a la política (casella només si ho indica l'assessor) | Claude | 8.2 |
| 8.5 | Formulari operatiu: servei triat, validació al servidor, antispam sense galetes, límit d'adjunt, correu del domini (SPF, DKIM i DMARC) i prova real | Claude i director | Allotjament |
| 8.6 | Drets d'imatge: confirmació de propietat, consentiments de les persones identificables i substitució de les imatges conceptuals | Client i director | — |
| 8.7 | Consentiment de cookies i analítica (només si s'activa la Fase 6): bloqueig previ, «Acceptar» i «Rebutjar» igual de visibles, opció de canviar | Claude | Fase 6 |
| 8.8 | Accessibilitat: prova amb lector de pantalla, revisió del text sobre fotografia i, si es vol, declaració d'accessibilitat | Claude i director | Fotografies definitives |
| 8.9 | Capçaleres de seguretat i HTTPS a l'allotjament | Claude | Allotjament |
| 8.10 | Revisió final de l'assessor sobre la web completa | Assessor | 8.3–8.9 |

**Criteri de sortida:**

- tots els bloquejants del punt 4 resolts;
- `npm run verify` i `npm run check:links` en verd;
- cap enllaç legal marcat «(pendent)»;
- l'assessor dona el vistiplau.
