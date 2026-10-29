# Preparació del llançament · 29/10/2026

## Fet

- Continguts i legals CA/ES/EN aprovats; formulari real provat amb el client (4 correus, PDF, JPG 3 MB i resposta al visitant).
- Adreça definitiva 59-61 ja integrada a la branca.
- Contacte aprovat per indexar: es retira el noindex individual dels tres idiomes.
- Avís de demostració condicionat: només s’amaga al build definitiu amb FORM_MODE=live; les previsualitzacions el conserven.
- Sitemap: 36 URL. Hreflang: 36 pàgines. 23 regles de migració vàlides.
- Conservades 23 URL de les 12 fotografies antigues i les miniatures conegudes, amb els mateixos bytes; manifest verificat.
- DNS públic i captura pública de WordPress desats. La captura no substitueix una còpia del servidor i de la base de dades.
- Compte Netlify Personal comprovat, sense operational mode ni usos excedits. No s’ha canviat la subscripció.
- verify, check:links, check:i18n, check:redirects i 58 proves del formulari correctes.
- Build definitiu simulat només en local: sense noindex global, Contacte sense avís, regles de domini presents. La carpeta dist de preview conserva noindex i avís.

## Producció publicada a Netlify · 29/10/2026

El director ha autoritzat explícitament els secrets de producció, FORM_MODE=live, l’associació dels dos dominis i la publicació. Després de l’autorització s’ha executat la configuració i comprovat per API.

- Secrets Microsoft 365 i RL_SECRET presents al context production; cap valor secret queda al repositori. FORM_MODE=live a production i dry-run a revisio-client.
- Domini principal: www.serralleriacarbo.com; àlies: serralleriacarbo.com.
- PR #10 integrada; PR #11 resol la coincidència de Client ID i empremta del certificat en la documentació que aturava el control de secrets. No s’ha desactivat el control ni afegit exclusions.
- Desplegament publicat: **6ae36ff8594fe3f80209a4e5**, commit **136ac24913485c511f0cf2259967b6a73e8e67b5**, estat ready. Publicació a les 17:15:26 (Barcelona).
- Funcions contacte i neteja-temporals desplegades. Neteja programada: minut 5 de cada hora; primera execució automàtica posterior a aquest desplegament pendent d’observar.
- **66/66 controls HTTP correctes:** 36 pàgines, 23 fotografies amb els bytes esperats i 7 comprovacions de migració/404. Sitemap de 36 URL i Contacte sense avís de demostració en CA/ES/EN.
- Netlify afegeix noindex automàtic als enllaços immutables. L’HTML aprovat no té noindex individual; l’àlies main confirma l’absència de capçalera noindex global. Al domini definitiu s’ha de tornar a comprovar després del DNS.
- **Prova única de producció BGFD9SBT6T:** HTTP 200, state sent; registre de Blobs verificat en sub/live/production amb mode live i estat sent. Microsoft ha acceptat l’enviament. Recepció humana d’aquesta última prova pendent; els quatre correus d’integració anteriors i els adjunts ja estan confirmats per Laura.
- Previsualització habitual conservada a https://revisio-client--serralleriacarbo.netlify.app/.
- **No s’ha canviat cap DNS.** Consulta pública posterior: l’arrel encara apunta a 213.158.86.105. Netlify encara no ha emès el certificat del domini; cal comprovar-lo després del tall.

Comprovants: FASE9-produccio-comprovacions-2026-10-29.json, FASE9-produccio-desplegament-2026-10-29.json i FASE9-produccio-formulari-2026-10-29.json. No contenen secrets.

## Dades per coordinar amb Xavi

| Registre | Estat actual | Destí previst per Netlify Standard |
| --- | --- | --- |
| @ A | 213.158.86.105, TTL 900 observat | 75.2.60.5 si no hi ha ALIAS/ANAME |
| www CNAME | serralleriacarbo.com, TTL 900 observat | serralleriacarbo.netlify.app |
| @ ALIAS/ANAME | no comprovat | Alternativa a l’A: apex-loadbalancer.netlify.com |

No s’han d’aplicar A i ALIAS alhora. Confirmar el destí amb el projecte de Netlify abans del tall. Els nameservers actuals de CDmon, MX, SPF, autodiscover, DKIM i DMARC es conserven. No s’ha modificat cap DNS.

Font oficial: https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/

Xavi ha de confirmar que conserva una còpia completa de l’allotjament antic i de la base de dades i acordar el moment del canvi. Guardar l’estat de la zona abans de tocar-lo i mantenir el WordPress antic disponible per tornar enrere.

## Pendent per completar la publicació al domini

HTTPS emès i vàlid, domini arrel cap a www, redireccions antigues, 23 imatges amb 200, sitemap de 36 URL, noindex retirat només de producció, formulari en live i una consulta real confirmada pel client. Revisar la neteja programada després de l’hora següent. Confirmar que el correu corporatiu continua operatiu. Search Console i directoris es poden completar després del tall.

## Pendents documentals

La confirmació general de permisos d’ús de les fotos està registrada. No s’han aportat en aquesta tasca documents nous de consentiment de persones identificables ni un informe jurídic independent nou; no es dona per acreditat allò que no s’ha rebut. Els textos legals publicables ja consten aprovats pel director.

## Comprovació de navegador

84/84 comprovacions en Chrome headless correctes: 36 pàgines a 1440 i 390 px, i Contacte CA/ES/EN a 1440/768/390/320 px. Sense errors JS no previstos, violacions CSP o desbordaments; H1 únic, camps visibles, menú mòbil funcional i avisos de demostració correctes segons el build. No s’han fet enviaments en aquesta prova local. Informe JSON al mateix directori.

## Actualitzacions de seguretat

L’auditoria del 29/10 ha detectat cinc dependències transitives amb avisos high. S’ha executat npm audit fix --ignore-scripts, sense --force ni canviar les versions directes de package.json. S’han actualitzat 12 paquets de la resolució del lockfile; l’auditoria posterior retorna zero vulnerabilitats conegudes. verify, enllaços, idiomes, redireccions, 58 proves del formulari, build definitiu simulat i 84 comprovacions de navegador correctes després de l’actualització.
