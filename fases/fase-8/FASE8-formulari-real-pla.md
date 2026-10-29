# Fase 8 · Tasca 8.5 · Formulari real amb Microsoft 365

**Data:** 09/10/2026 (tercera versió del dia, amb les correccions de la revisió de Codex). **Actualitzat el 15/10/2026** (proves pendents a Netlify; preparació de Microsoft 365 i de la prova real).

## Actualització del 29/10/2026 · Nova aplicació i quatre enviaments acceptats

Nou Client ID facilitat per l’administrador: [M365_CLIENT_ID configurat a Netlify]. Certificat existent acceptat i variable secreta de revisio-client actualitzada. Quatre enviaments reals [PROVA] acceptats per Microsoft, inclosos JPG de 3.000.000 bytes, PDF i versions CA/ES/EN. No ha calgut canviar el transport d’enviament. El 403 anterior no s’ha reproduït.

Previsualització restaurada a dry-run, noindex conservat i desplegament test eliminat. **Confirmació posterior de Laura aportada pel director:** els quatre correus rebuts i respostos al correu del visitant de prova; PDF i fotografia adjunts rebuts. El director confirma també que Laura ha pogut obrir els dos adjunts. **Prova funcional a la previsualització completada:** enviament, recepció, adjunts (inclòs JPG de 3 MB) i Reply-To. Pendent: confirmar l’abast RBAC i preparar l’activació de producció. La traça Delivered és complementària; no s’ha aportat. Resultats i referències: [FASE8-prova-real-2026-10-29.md](FASE8-prova-real-2026-10-29.md).

## Actualització del 22/10/2026 · Connexió amb Microsoft 365

Autorització del director: implementar la configuració amb els identificadors rebuts de l’administrador i el certificat existent.

- **Autenticació real comprovada:** Microsoft Entra accepta l’assertió signada amb el certificat del 15/10/2026 i retorna un access token per a Microsoft Graph. Tenant i aplicació coincideixen amb els identificadors rebuts. Ni la clau ni el token es mostren o es desen al repositori.
- **Permisos:** el token no declara rols globals (`roles` buit). Això no prova l’abast RBAC sobre Exchange. Continua pendent la confirmació de l’administrador o el resultat de `Test-ServicePrincipalAuthorization` per a carbo@ i una altra bústia.
- **Netlify:** `M365_TENANT_ID`, `M365_CLIENT_ID`, `M365_CERT_THUMBPRINT` i `M365_PRIVATE_KEY_PEM` desats com a secrets exclusius de la branca `revisio-client`. Abastos builds/functions/runtime, segons el pla disponible. No s’ha configurat producció ni s’ha utilitzat el secret de client rebut per correu.
- **Mode:** `FORM_MODE=dry-run`, RL_SECRET existent i protecció noindex conservats. Cap correu real enviat.
- **Registre del consentiment:** les versions ES/EN de `CONSENT_VERSION` reflecteixen l’aprovació del director del 20/10/2026, sense canviar les caselles ni el text visible del formulari.
- **Clau local:** es conserva l’original fora del repositori perquè encara s’ha de preparar la configuració de producció i no s’ha comprovat cap enviament real. No s’elimina l’única còpia en aquesta fase.

**Per activar la prova:** confirmar els permisos limitats a carbo@ i coordinar la recepció amb Jordi; habilitar temporalment `FORM_MODE=test` només a la previsualització, redesplegar, executar la prova controlada del §11 i tornar a dry-run. Autenticació correcta no equival a permís d’enviament ni a lliurament del correu.

## Estat actual (15/10/2026)

**Previsualització:** https://revisio-client--serralleriacarbo.netlify.app/:
- desplegament `6ad06234e068abb8a07f67ad` (15/10/2026, amb `RL_SECRET` secreta);
- `FORM_MODE=dry-run`, `noindex` i avís de demostració;
- **cap correu enviat** i cap credencial de Microsoft 365 a Netlify.

**Fora d'abast:** producció, DNS i registres de correu no s'han tocat.

**Implementat (codi del repositori):**
- **Funció `/api/contacte`:** validació al servidor, antispam, límits de freqüència en dues capes, referències i duplicats, adjunts de fins a 3.000.000 bytes, i enviament amb Microsoft Graph per certificat o secret, amb reintents. Modes `dry-run`, `test` i `live`; `live` només funciona en producció (§4, §5).
- **Neteja:** funció programada `neteja-temporals` i neteja oportunista.
- **Registres de la funció:** sense dades personals; identifiquen la instància i l'origen del secret.
- **Proves:**
  - **unitàries:** 58;
  - **de navegador en local:** 37;
  - **a Netlify en `dry-run`:** `check-contact-form-remote.py` i `check-contact-form-remote-limits.py`.
- **Eina per desar variables a Netlify des d'un fitxer**, sense mostrar-ne el valor: `scripts/netlify/set-env-from-file.py` (§6.4).

**Comprovat:**

| On | Què | Quan |
|---|---|---|
| **Local** | Validació, antispam, adjunts al màxim exacte, duplicats, errors, modes, Graph fals (`202`, reintents, credencial rebutjada, asserció RS256), conservació. Amb JavaScript i sense | 09/10/2026 (§6) |
| **Netlify, `dry-run`** | Pàgines, `405`, validació, adjunts de 3.000.000 i 3.000.001 bytes, petició de 7 MB, Industrial sense JavaScript, duplicats, capa 1, neteja oportunista | 09/10/2026 (§6.1) |
| **Netlify, `dry-run`, amb `RL_SECRET`** | Comptador únic per IP i hora, compartit per quatre instàncies observades; cinc acceptacions; concurrència; pujada lenta; tall de connexió | 15/10/2026 (§6.2 A i B). **No es repeteixen** si no canvia el codi relacionat |
| **Netlify** | Neteja programada amb «Run now» a la previsualització (registres caducats i vigents): elimina només els caducats | 15/10/2026 (§6.2 C) |
| **Netlify** | `RL_SECRET` convertida en secreta sense canviar-ne el valor: la mateixa IP i el mateix dia donen la mateixa empremta (`4e7629b4…`) després del redesplegament `6ad06234e068abb8a07f67ad` | 15/10/2026 (§6.4) |
| **Local** | Generació del certificat (`scripts/m365/generate-certificate.py`) amb un certificat d'un sol ús: PKCS#8, parella clau-certificat, empremta, rebuig d'una carpeta dins del repositori. `clientAssertion()` de `graph.ts` signa amb aquesta clau: signatura RS256 verificada amb la part pública i `x5t` igual a l'empremta. Els fitxers d'un sol ús s'han esborrat | 15/10/2026 (§6.5) |
| **Producció** | Execució automàtica de `neteja-temporals` segons l'horari | **Pendent:** només es pot comprovar al desplegament publicat (§11.6) |
| **Microsoft Graph real** | Cap prova | Pendent de l'administrador i de l'autorització (§11) |

**Depèn de l'administrador de Microsoft 365** (missatge del §10):
- registrar l'aplicació sense permisos de Graph d'abast general;
- carregar-hi la part pública del certificat;
- limitar `Application Mail.Send` a `carbo@` amb RBAC d'Exchange;
- enviar el resultat de `Test-ServicePrincipalAuthorization` i els identificadors (no secrets);
- respondre les preguntes sobre la bústia.

**Depèn del director:**
1. ~~Prémer «Run now» de `neteja-temporals` (§6.2 C).~~ Fet el 15/10/2026.
2. ~~Decidir si `RL_SECRET` passa a ser secreta.~~ Autoritzat i fet el 15/10/2026 (§6.4).
3. ~~Generar el certificat amb `scripts/m365/generate-certificate.py`.~~ Fet el 15/10/2026: caduca el 15/10/2027 (§6.5).
4. Enviar el missatge del §10 a l'administrador, amb `formulari-web-20261015.cer.pem` adjunt.
5. Quan l'administrador respongui, autoritzar que es desin les credencials a Netlify, només per a `revisio-client` i com a secretes (§6.5).
6. Autoritzar, amb el client, la data de la prova real. Jordi confirma la recepció (§11).
7. Confirmar el saldo de crèdits per a producció.

**Altres pendents:**
- l'aprovació editorial dels textos (client);
- la validació jurídica dels textos castellans i anglesos;
- DKIM i DMARC;
- els consentiments de dret d'imatge de les persones identificables. Els permisos d'ús de les fotografies ja estan confirmats.

**Decisions del director (09/10/2026):**
1. **Microsoft 365 és l'opció escollida** i substitueix Netlify Forms (decisió del 02/10/2026).
2. **No es crea cap bústia `web@`.** `carbo@serralleriacarbo.com` és el remitent i el destinatari, **subjecte a la comprovació de l'administrador** de Microsoft 365.
3. **El Reply-To és el correu validat del visitant.**
4. **El destinatari queda fixat al servidor.** El formulari no el pot canviar.
5. **No es bloquegen globalment els enviaments externs de `carbo@`.** La bústia ha de continuar funcionant amb normalitat.

**Estat:**
- **Implementat i desplegat a `revisio-client` en mode de demostració (`dry-run`)**:
  - commit `8ba62b0`;
  - desplegament `6ac86ffaa8239704b9ab5d2d`, 09/10/2026, 06:40 (hora de Barcelona);
  - resultats al §6.1.
- **Cap correu real.** No s'ha fet cap petició a Microsoft 365 i no s'han modificat el DNS, la producció, la indexació ni les variables d'entorn de Netlify.
- **L'avís «Formulari de demostració» i el `noindex` es mantenen.**

**Actualització del 15/10/2026 (proves pendents a Netlify, §6.2):**
- **Configuració:** `RL_SECRET` (32 bytes aleatoris) i `FORM_MODE=dry-run` creats **només per a la branca `revisio-client`**. Producció continua sense cap variable. El valor del secret no consta enlloc.
- **Previsualització:** redesplegament `6ad02e32041dc6f8e15c72ba` a `revisio-client`, sense `--prod`. Els registres de la funció porten ara l'identificador aleatori de la instància i l'origen del secret, mai el valor.
- **Superades:**
  - **Límit horari amb el secret estable:** un sol comptador per IP i hora, compartit per quatre instàncies observades. Cinc acceptacions i la sisena, `429`; en concurrència, mai més de cinc.
  - **Pujada amb la xarxa limitada.**
  - **Tall de connexió durant la pujada.**
- **Pendent:** la prova manual de la neteja programada amb «Run now». El panell de Netlify no és accessible des de l'entorn de proves (§6.2 C).
- **Sense correus:** `dry-run` a tots els registres, i cap credencial de Microsoft 365 a Netlify.
- **Fotografies:** el director confirma els permisos d'ús de les fotografies actuals. Queda registrat a [FASE8-compliment-i-confianca.md](FASE8-compliment-i-confianca.md) i no es modifica cap imatge.
- **Aprovació editorial dels textos:** continua pendent.

**Canvis respecte a la segona versió:**
- S'han eliminat la bústia `web@` i la regla que bloquejava els enviaments externs de la bústia remitent.
- La conservació de les dades temporals es basa ara en hores. La neteja diària de registres de més de 24 h no garantia el màxim de 25 h que s'anunciava (§4.6).
- El límit dels adjunts es defineix en bytes i es prova el màxim exacte (§4.1).
- S'ha afegit l'estat de la implementació (§5), les proves executades (§6) i el missatge per a l'administrador (§10).

**Correccions després de la revisió de Codex** (Codex va executar les 45 proves unitàries, que passaven, i va reproduir dos errors). Totes queden cobertes per proves noves (§6):
1. **Referències entre modes.** Una consulta en `dry-run` seguida d'una petició `live` amb la mateixa referència retornava `state=sent` i `duplicate=true` sense enviar.
   - Ara les referències i els comptadors es desen per **àmbit**, que combina el mode i l'entorn (per exemple, `live/production`).
   - Una referència només es dona per confirmada si el registre és del mateix mode i té l'estat final d'aquest mode: `dry-run` en demostració, `sent` en `test` i `live`. Una demostració o una prova mai no justifiquen la confirmació d'un enviament real.
2. **Serveis.** `servei=toString` s'acceptava perquè la comprovació consultava propietats heretades. Ara només s'accepten claus pròpies de les llistes (`Object.hasOwn`), tant a Particulars com a Industrial.
3. **Industrial sense JavaScript.** Els camps d'Industrial sortien `hidden` i `disabled` a l'HTML.
   - Ara surten actius, i el CSS (`:has`) mostra els de la branca marcada.
   - El producte té camp propi (`producte`), de manera que Industrial no obliga a triar cap servei de Particulars.
4. **Secret del control de freqüència.** En `test` i `live` és obligatori un `RL_SECRET` estable d'almenys 32 caràcters. Si falta, la funció respon amb un error controlat (`503`) abans de llegir la consulta i sense enviar ni desar res. El secret provisional de cada instància només s'admet en `dry-run`.

**Fonts consultades el 09/10/2026:**
- **Netlify:** [Functions configuration](https://docs.netlify.com/build/functions/configuration/) · [Function logs](https://docs.netlify.com/build/functions/logs/) · [Scheduled functions](https://docs.netlify.com/build/functions/scheduled-functions/) · [Netlify Blobs](https://docs.netlify.com/build/data-and-storage/netlify-blobs/) · [Rate limiting](https://docs.netlify.com/manage/security/secure-access-to-sites/rate-limiting/) · [Resume paused projects](https://docs.netlify.com/manage/accounts-and-billing/billing/resume-paused-projects/)
- **Microsoft Graph:** [user: sendMail](https://learn.microsoft.com/graph/api/user-sendmail) · [Attach large files](https://learn.microsoft.com/graph/outlook-large-attachments) · [Send mail process](https://learn.microsoft.com/graph/outlook-things-to-know-about-send-mail) · [Throttling limits (Outlook)](https://learn.microsoft.com/graph/throttling-limits)
- **Exchange Online:** [RBAC for Applications](https://learn.microsoft.com/exchange/permissions-exo/application-rbac) · [Exchange Online limits](https://learn.microsoft.com/office365/servicedescriptions/exchange-online-service-description/exchange-online-limits)

---

## 1. Punt de partida

| Element | Estat |
|---|---|
| **Formulari** | Un sol formulari en català i castellà, amb les branques Particulars i Industrial. Ara envia a `/api/contacte`, amb JavaScript i sense. En mode `dry-run` respon «La consulta no s'ha enviat: el formulari encara no està actiu…» i no envia res |
| **Privacitat** | Primera capa i caselles de l'advocat, aprovades en català el 06/10/2026. El castellà està pendent de validació jurídica. La política cita Netlify (allotjament i recepció dels formularis) i Microsoft 365 (correu) com a encarregats |
| **Correu del domini** | MX i SPF de Microsoft 365. **Sense DKIM ni DMARC** (consulta de només lectura, 09/10/2026) |
| **Netlify** | **Pla Free** (compte `carles1997`, un sol membre; consulta de l'API, 15/10/2026). El desplegament publicat de producció és del 06/10/2026 i **no té cap funció**. El 09/10/2026 els desplegaments de producció s'ometien per manca de crèdits; el saldo està pendent de confirmar al panell. Les opcions de les variables d'entorn són al §6.4 |

## 2. Condicions del contracte

| Condició (`CLAUDE.md` i FASE8 8.5) | Estat |
|---|---|
| Backend real | Funció implementada i desplegada a `revisio-client` en `dry-run` |
| Validació al servidor | Implementada i provada (§4.3) |
| Antispam sense galetes | Implementat i provat (§4.4) |
| Límit d'adjunt | 3.000.000 bytes, provat al servidor i al navegador. **Pendent de validar amb Microsoft Graph** (§4.1) |
| Correu del domini amb SPF, DKIM i DMARC | SPF, sí. **DKIM i DMARC pendents** (canvi de DNS no autoritzat) |
| Prova real d'enviament | **Pendent** (§6, 5.3 i 5.4) |
| Avís de demostració fins aleshores | Es manté |

## 3. Per què Microsoft 365

Decisió del director del 09/10/2026, després de comparar Netlify Forms, Microsoft 365 i un proveïdor transaccional (segona versió d'aquest pla).

Avantatges de Microsoft 365:
- Valida al servidor abans d'acceptar.
- No afegeix cap encarregat del tractament.
- No deixa cap còpia de les consultes ni dels fitxers a Netlify.
- El fitxer arriba adjunt.
- El correu no surt de Microsoft 365.

Inconvenients assumits:
- Depèn d'una credencial que caduca i que ha de mantenir l'administrador.
- No té Akismet.

## 4. Disseny

### 4.1 Adjunts: límit en bytes i recorregut

**Límit: `MAX_ATTACHMENT_BYTES = 3_000_000` bytes** (3 MB decimals, a `src/lib/contact/config.ts`). El navegador, el servidor, el text d'ajuda («fins a 3 MB») i el missatge d'error fan servir aquesta constant.

| Tram | Límit documentat | Estat de la prova |
|---|---|---|
| **Navegador** | Comprova `file.size > 3.000.000` abans d'enviar | **Provat:** 3.000.000 i 2.999.999 bytes passen; 3.000.001 bytes es rebutgen sense fer cap petició |
| **Navegador → funció de Netlify** | Petició de 6 MB com a màxim. Netlify codifica el cos binari en base64, i en queden uns 4,5 MB útils. La funció rebutja abans de llegir-la qualsevol petició que declari més de `MAX_REQUEST_BYTES` (3.100.000 bytes) | **Provat en local:** 3.000.000 bytes, `200`; 3.000.001 bytes, `413`, amb JavaScript i sense. **Pendent a Netlify:** la funció no s'ha desplegat. Cal comprovar el mateix màxim exacte a `revisio-client` en mode `dry-run` |
| **Funció → Microsoft Graph** (`sendMail` amb l'adjunt dins del JSON) | Microsoft documenta 3 MB com a llindar per adjuntar un fitxer amb una sola petició. Un fitxer de 3.000.000 bytes ocupa 4.000.000 caràcters en base64; amb el cos, la petició fa uns 4,01 MB. La pàgina de `sendMail` no publica cap límit de mida de la petició | **Provat en local amb un Graph fals:** el fitxer de 3.000.000 bytes arriba íntegre al JSON. **No validat amb Microsoft Graph.** Es valida a la prova 5.3 amb un fitxer d'exactament 3.000.000 bytes. Si Graph el rebutja, el límit baixa i es torna a provar amb el nou màxim exacte, un byte per sota i un per sobre |
| **Exchange Online** | 35 MB en enviament i 36 MB en recepció, si l'administrador no ho ha canviat | Pregunta a l'administrador (§9, pregunta 2) |

**Tipus admesos:** JPG, PNG, HEIC/HEIF i PDF. Es validen per extensió **i** pels primers bytes del contingut. DWG i DXF continuen pendents de la decisió del client.

**Fitxers més grans:** el missatge d'error ofereix enviar-los a `carbo@serralleriacarbo.com`.

### 4.2 Recorregut i modes

1. **Formulari:**
   - atributs: `method="post"`, `action="/api/contacte?idioma=ca|es"` i `enctype="multipart/form-data"`;
   - camps ocults: `idioma`, `origen`, `ref` i `temps`, a més del camp parany.
   - **Amb JavaScript:** validació al navegador i enviament amb `fetch` (`Accept: application/json`). Els errors del servidor es mostren sota cada camp.
   - **Sense JavaScript:** enviament nadiu i pàgina HTML de resposta en l'idioma de la pàgina, amb `noindex`, la llista d'errors i un enllaç al formulari.
2. **Funció `netlify/functions/contacte.mts`:**
   - porta el control de freqüència de Netlify (capa 1) a la configuració;
   - fa servir el codi comú de `src/lib/contact/`.
3. **Respostes:**

   | Codi | Situació |
   |---|---|
   | `200` | Acceptada (o demostració) |
   | `400` | Errors de camps o petició il·legible |
   | `405` | Mètode no permès |
   | `409` | Ja s'està enviant |
   | `413` | Fitxer o petició massa grans |
   | `415` | Tipus de fitxer |
   | `429` | Massa enviaments |
   | `502` | No s'ha pogut enviar |
4. **Mode** (`FORM_MODE`; `resolveMode` a `handler.ts`):
   - **`dry-run`** (per defecte): valida i respon sense enviar.
   - **`test`:** envia a la bústia fixada amb «[PROVA]» a l'assumpte. Ja no hi ha cap adreça de prova configurable.
   - **`live`:** només si el context del desplegament és `production`. En qualsevol altre context, la funció torna a `dry-run`.
5. **Secret de l'empremta** (`resolveFingerprintSecret`): en `test` i `live`, `RL_SECRET` (almenys 32 caràcters) és obligatori; sense aquest secret, la funció respon `503` amb el missatge d'error d'enviament. En `dry-run` s'admet un secret provisional de la instància.

### 4.3 Validació al servidor (`src/lib/contact/schema.ts`)

| Camp | Regla |
|---|---|
| `tipus` | `particular` o `empresa` |
| `nom` | Obligatori; de 2 a 120 caràcters; una sola línia |
| `correu` | Obligatori; format vàlid; fins a 254 caràcters; sense salts de línia. És l'únic valor que va al Reply-To |
| `telefon` | Opcional; `[+()\d\s.-]`, de 7 a 25 caràcters |
| `servei` | Particulars: obligatori i de la llista de Particulars. Només es llegeix a Particulars |
| `producte` | Industrial: opcional i de la llista d'Industrial. Només es llegeix a Industrial |

Per als dos camps, només s'accepten claus pròpies de la llista: «toString», «constructor» o «__proto__» es rebutgen.
| `empresa`, `unitats`, `material`, `termini`, `sector` | Opcionals; fins a 120–200 caràcters; només es tenen en compte a Industrial |
| `ubicacio` | Opcional; fins a 120 caràcters |
| `descripcio` | Obligatòria; de 10 a 5.000 caràcters; ha de contenir lletres |
| `consentiment` | Obligatori |
| `comunicacions` | Opcional; «sí» o «no» |
| `adjunt` | §4.1 |

**Coherència amb la plantilla:** el build falla si els valors i les etiquetes dels desplegables, les etiquetes dels camps o la ruta de contacte de `ui.ts` no coincideixen amb `src/lib/contact/`.

### 4.4 Antispam sense galetes

- **Camp parany** (`nota_interna`):
  - és fora de la vista, té `tabindex="-1"` i està dins d'un contenidor `aria-hidden`;
  - si ve ple, es respon com una consulta acceptada, però no es desa ni s'envia res.
- **Temps d'emplenament: senyal, no bloqueig.**
  - Amb JavaScript, per sota de 3 s la consulta s'envia igual, amb «Senyal antispam: enviament ràpid (… s)» al cos del correu.
  - Sense JavaScript no hi ha mesura, i l'absència de mesura no penalitza.
- **Més de 3 enllaços:** es marca la consulta, però no es rebutja.
- **Control de freqüència en dues capes:**
  1. **Regla de Netlify:** 5 peticions per minut i per IP. És aproximada i no s'ha pogut provar en local.
  2. **Comptador horari amb escriptura condicional:** 5 consultes **vàlides** per hora i per connexió.
     - **Clau:** `rl/{hora UTC}/{mode}/{entorn}/{empremta}`. L'empremta és un HMAC-SHA256 de la IP amb `RL_SECRET` i la data del dia. Les proves d'una previsualització no gasten el límit de producció.
     - **Escriptura:** amb `onlyIfNew` o `onlyIfMatch` (ETag), amb un màxim de 3 intents. Si després dels 3 intents encara hi ha conflicte, la funció respon `429`.
     - **Si el magatzem no respon,** la consulta s'accepta i l'error queda al registre.
- **Comprovat:**
  - 10 peticions simultànies des de la mateixa connexió: mai se n'accepten més de 5 i no es perd cap increment;
  - 20 escriptures simultànies amb prou intents: el comptador acaba exactament a 20;
  - els errors de validació no gasten el límit;
  - els comptadors d'un àmbit no afecten els d'un altre.

### 4.5 Microsoft 365: `carbo@` com a remitent i destinatari

**Configuració** (`src/lib/contact/config.ts`, `MAILBOX`):
- **Remitent i destinatari:** `carbo@serralleriacarbo.com`, fixats al codi del servidor. Cap camp del formulari ni cap variable d'entorn no els canvia. Una prova envia camps com `toRecipients` i `destinatari` i comprova que s'ignoren.
- **Reply-To:** el correu validat del visitant, amb el seu nom.
- **`saveToSentItems: false`.** Remitent i destinatari són la mateixa bústia: sense aquest paràmetre, cada consulta quedaria dues vegades a `carbo@`.
- **Rebots:** arriben a la mateixa bústia `carbo@`.
- **Subjecte a la comprovació de l'administrador:**
  - tipus de bústia;
  - mida màxima;
  - regles o quarantena que afectin un missatge que la bústia s'envia a si mateixa amb un adjunt (§9).

**Permís limitat a `carbo@` amb RBAC per a aplicacions d'Exchange Online:**
1. **Registrar l'aplicació a Microsoft Entra sense consentir cap `Mail.Send` d'aplicació.** Els permisos d'Entra i d'Exchange se sumen: un `Mail.Send` d'Entra donaria accés a totes les bústies.
2. **Exchange Online PowerShell:**
   - `New-ServicePrincipal`;
   - `New-ManagementScope` amb `PrimarySmtpAddress -eq 'carbo@serralleriacarbo.com'`;
   - `New-ManagementRoleAssignment -Role "Application Mail.Send" -CustomResourceScope …`.
3. **Comprovació:** `Test-ServicePrincipalAuthorization` dona `InScope = True` per a `carbo@` i `False` per a qualsevol altra bústia.
4. **Retard:** els canvis triguen entre 30 minuts i 2 hores a aplicar-se.

**Risc que queda obert per decisió:** el permís permet enviar **com a `carbo@`** a qualsevol destinatari. El codi només hi envia la consulta, però si la credencial es filtrés, es podria enviar correu en nom de la bústia principal de l'empresa. La regla que bloquejava els enviaments externs es descarta perquè `carbo@` ha de funcionar amb normalitat.

**Mitigacions:**
- certificat en lloc de secret;
- accés a les variables d'entorn de Netlify limitat a les persones imprescindibles;
- cap consentiment d'abast general a Entra;
- revisió dels inicis de sessió de l'aplicació (Entra) i de la traça de missatges si se sospita un abús;
- procediment de revocació: eliminar la credencial a Entra (pregunta 5).

**Credencials (revisat el 15/10/2026):**
- **Certificat (recomanat):** `M365_CERT_THUMBPRINT` (empremta SHA-1) i `M365_PRIVATE_KEY_PEM` (clau privada **PKCS#8**, `BEGIN PRIVATE KEY`).
  - **El parell de claus el genera el director a la seva màquina, fora del repositori** (§6.5).
  - L'administrador només en rep la **part pública** (`.cer` o `.pem`), que no és secreta, i la carrega a Entra.
  - La clau privada va directament del fitxer local a Netlify com a variable secreta i després s'esborra.
  - **Cap secret no passa per correu, xat ni repositori**, i l'administrador no ha d'accedir a Netlify. El pla Free té un sol membre.
- **Alternativa:** `M365_CLIENT_SECRET`, amb una durada proposada de 12 mesos (el portal permet fins a 24).
  - El secret el crea l'administrador i l'ha d'escriure ell mateix a Netlify, per exemple en una sessió compartida amb el director. Mai per correu ni per xat.
  - Per això és l'opció menys recomanable.
- **Altres variables:**
  - `M365_TENANT_ID`;
  - `M365_CLIENT_ID`;
  - `FORM_MODE`, que continua sent `dry-run` fins a l'autorització;
  - `RL_SECRET`: valor aleatori **estable** d'almenys 32 caràcters, compartit per totes les instàncies. Obligatori en `test` i `live`. No és una credencial de Microsoft 365: el genera i l'introdueix a Netlify el propietari de l'equip.
    - **Configurat el 15/10/2026 per a `revisio-client`:** 32 bytes del generador criptogràfic del sistema (64 caràcters hexadecimals), amb un valor específic de la branca. Per a producció se n'haurà de generar un altre quan s'autoritzi.
- **Pla actual de Netlify (Free; detall i proves al §6.4):**
  - **Abast:** no es pot limitar una variable a l'abast «Functions» (`403`). Requereix el pla Pro.
  - **Variable secreta:** **sí que es pot crear**, si s'hi declaren els abastos `builds`, `functions` i `runtime`. Sense abastos explícits, Netlify la rebutja (`422`) perquè els secrets no poden tenir el de postprocessament. Aquesta correcció és de la segona sessió del 15/10/2026; la primera havia conclòs que no era possible.
  - **`RL_SECRET`:** variable secreta des del 15/10/2026, amb el mateix valor (§6.4).
  - **`FORM_MODE`:** variable normal. No és cap secret.
  - Totes dues només per a la branca `revisio-client`.
- **Com s'introdueixen:** amb el procediment del §6.4, directament a Netlify, mai per xat, per correu ni al repositori. Els identificadors (`M365_TENANT_ID`, `M365_CLIENT_ID` i l'empremta) no són secrets.
- **Renovació:** un canvi de variable requereix un desplegament nou. Cada desplegament de producció costa 15 crèdits.

| Tasca | Responsable |
|---|---|
| Crear, renovar i revocar la credencial; mantenir l'àmbit d'Exchange | Administrador de Microsoft 365 (**persona pendent de designar**) |
| Generar el certificat i desar la clau privada a Netlify | Director (propietari de l'equip de Netlify), §6.4. Amb un secret de client, l'administrador l'escriu ell mateix a Netlify |
| Desplegar després de renovar i fer un enviament de prova | Director o desenvolupament, amb autorització |
| Recordatori de caducitat | Client: avís 30 dies abans. La data es registra en aquest document (no el valor de la credencial) |

**Si la credencial caduca:**
- la funció respon `502`;
- l'usuari veu el missatge amb el telèfon i el correu;
- el registre anota `auth_failed`.

No hi ha cap avís automàtic.

### 4.6 Dades temporals: termini real

**Correcció:** la segona versió proposava una neteja diària de les entrades de més de 24 h i anunciava un màxim de 25 h. No era cert: una entrada creada just després d'una neteja podia durar gairebé 48 h. El mecanisme nou es basa en hores i el termini s'ha comprovat amb una simulació (§6).

| Dada | On | Termini real | Mecanisme |
|---|---|---|---|
| **Consulta i fitxer en trànsit** | Memòria de la funció | Segons | No es desen |
| **Comptador de freqüència** (empremta pseudonimitzada, hora, nombre) | Netlify Blobs, consistència forta | **Fins a 1 h 5 min** si la neteja horària s'executa. **Cada execució fallida hi afegeix 1 h** | La clau porta l'hora. La neteja programada `neteja-temporals` (cada hora, al minut 5) esborra les hores anteriors |
| **Referència de l'enviament** (sense dades personals) | Netlify Blobs | **Menys de 2 h**. Cada execució fallida hi afegeix 1 h | La mateixa neteja esborra les referències de més d'1 h (`REFERENCE_TTL_MS`) |
| **Registres de la funció** | Netlify | Mínim 24 h; 7 dies en alguns plans | Només hi consten la referència, el resultat, el codi, la mida del fitxer i els senyals. Una prova comprova que no hi ha cap nom, correu, telèfon, IP ni text |
| **Consulta rebuda** | `carbo@` | Proposta: 12 mesos sense relació comercial (pendent de l'advocat) | Manual o política de retenció (pregunta 6) |
| **Còpia a Enviats** | Cap | — | `saveToSentItems: false` |

**Límit de la neteja programada:** Netlify només executa les funcions programades al desplegament publicat. A `revisio-client`:
- la funció de contacte també neteja de manera oportunista, com a molt cada 10 minuts per instància, però només quan rep peticions. **Comprovat a Netlify el 09/10/2026** (§6.1);
- després de cada sessió de proves cal executar `neteja-temporals` amb «Run now» o esborrar les entrades amb `netlify blobs:delete`. El 09/10/2026 es van esborrar amb la CLI (14 entrades).

**Regió per defecte:** les funcions s'executen a `cmh` (Ohio, EUA) i Blobs, a `us-east-2`. L'advocat ho ha de confirmar.

### 4.7 Acceptació, lliurament, errors i duplicats

**Estats:**
1. **Acceptat per Microsoft 365:** Graph respon `202`. No vol dir que el missatge s'hagi lliurat.
2. **Lliurat a `carbo@`:** es confirma amb la traça del missatge. Si falla, el rebot arriba a `carbo@`.
3. **Atès:** fora del sistema.

**Missatge a l'usuari quan s'accepta:** «La consulta s'ha enviat (ref. …). Et respondrem… Si no tens resposta, truca al 93 890 27 94 i indica la referència.» El telèfon és el fix des del 13/10/2026.
- No promet la recepció.
- En mode `dry-run`, la resposta és la de demostració.

**Duplicats:**
- **Àmbit:** les referències es guarden a `sub/{mode}/{entorn}/{referència}`, amb el mode registrat.
  - Una referència de `dry-run` o de `test` no confirma mai un enviament `live`.
  - Un registre d'un altre mode dins de l'àmbit tampoc no es pren com a confirmació.
- **Amb JavaScript,** el navegador genera la referència i la manté mentre no canviï res. Un doble clic o un reenviament sense canvis no torna a enviar.
- **Al servidor,** la reserva amb `onlyIfNew` fa que 5 enviaments simultanis amb la mateixa referència produeixin un sol correu.
- **Si una referència fa més de 60 s que està «enviant»,** es considera interrompuda i es pot tornar a provar, amb risc de duplicat.
- **Sense JavaScript,** cada enviament té una referència nova del servidor. Pot haver-hi duplicats, identificables per la referència.

**Reintents a Graph** (`graph.ts`; pressupost de 15 s):

| Resposta | Acció |
|---|---|
| `400`, `401`, `403`, `404`, `413` | Sense reintent |
| `429` | Es respecta `Retry-After` si és ≤ 5 s |
| `500`, `502`, `503`, `504` i errors de xarxa | Fins a 2 reintents (0,5 s i 1,5 s) |
| Temps esgotat | Un sol reintent: es prefereix un duplicat identificable a una pèrdua |

**Identificació:** cada correu porta la referència a l'assumpte, al cos i a la capçalera `X-Carbo-Ref`.

### 4.8 Correu que rep `carbo@`

- **Assumpte:** `Consulta web · Particulars · Estructures · Ref. 7F3K2QHM9A`, sense el nom del visitant, perquè no quedi a la traça del missatge. En mode `test` porta «[PROVA]» al davant.
- **Cos en català:**
  - les dades de la consulta;
  - la descripció;
  - el nom i la mida de l'adjunt;
  - l'idioma i la pàgina d'origen;
  - la data (Europe/Madrid) i la referència;
  - el consentiment, amb la versió del text;
  - les comunicacions comercials;
  - els senyals antispam.
- **Adjunt:** el fitxer original.

### 4.9 Missatges

Font única: `src/lib/contact/messages.ts`, en català i castellà. `ui.ts` la reutilitza. Són propostes pendents de validació.

| Situació | Text |
|---|---|
| Enviant | «Enviant la consulta…» |
| Demostració | Missatge actual de no enviament |
| Acceptada | Vegeu §4.7 |
| Ja s'està enviant | Avís de consulta en curs |
| Errors de camp | Missatge sota cada camp |
| Fitxer massa gran o tipus no admès | Missatge amb el límit o els tipus admesos |
| Massa enviaments | Avís de massa consultes seguides |
| Error d'enviament | Missatge amb el correu i el telèfon |
| Petició il·legible | Missatge d'error de lectura |

## 5. Implementació (commit `8ba62b0`, desplegada a `revisio-client` en `dry-run`)

| Fitxer | Contingut |
|---|---|
| `src/lib/contact/config.ts` | Constants: límit en bytes, bústia fixada, llistes de serveis, tipus admesos, freqüència i terminis |
| `src/lib/contact/messages.ts` | Missatges en català i castellà |
| `src/lib/contact/schema.ts` | Validació al servidor i detecció del tipus de fitxer |
| `src/lib/contact/throttle.ts` | Empremta i comptador amb escriptura condicional |
| `src/lib/contact/references.ts` | Reserva de referències i neteja |
| `src/lib/contact/store.ts` | Interfície del magatzem i implementació en memòria per a les proves |
| `src/lib/contact/netlify-store.ts` | Adaptador de Netlify Blobs (consistència forta) |
| `src/lib/contact/mail.ts` | Missatge per a Graph |
| `src/lib/contact/graph.ts` | Testimoni OAuth (secret o certificat) i `sendMail` amb reintents. **Només s'ha provat amb un `fetch` fals** |
| `src/lib/contact/encoding.ts` | base64 i hexadecimal amb APIs web |
| `src/lib/contact/handler.ts` | Recorregut complet i respostes JSON o HTML |
| `netlify/functions/contacte.mts` | Funció `/api/contacte` (capa 1 de freqüència i neteja oportunista) |
| `netlify/functions/neteja-temporals.mts` | Neteja programada cada hora |
| `src/templates/ContactTemplate.astro`, `contact.css`, `src/scripts/contact-form.ts`, `src/i18n/ui.ts` | Formulari amb `action` i camps ocults; botó actiu sense JavaScript; enviament amb `fetch`; errors del servidor per camp; límit i tipus al camp |
| `scripts/test-contact.mjs` (`npm run test:contact`) | 55 proves unitàries |
| `scripts/qa/serve-contact.mjs` i `scripts/qa/check-contact-form.py` | Servidor local (dry-run o enviador fals) i 31 proves de navegador |
| `scripts/qa/check-contact-form-remote.py` | Proves a Netlify del 09/10/2026. Des del 15/10/2026, una sisena consulta acceptada és una falla, no un avís |
| `scripts/qa/check-contact-form-remote-limits.py` (15/10/2026) | Proves pendents a Netlify: límit horari i concurrència amb `RL_SECRET`, xarxa lenta, registres sintètics per a la neteja programada (amb marge d'unes 22 h i comprovació a partir de l'hora real de l'execució) i esborrat selectiu de les claus de la prova |
| `scripts/netlify/set-env-from-file.py` (15/10/2026) | Desa una variable de Netlify, normal o secreta, d'un context o d'una branca, llegint-ne el valor d'un fitxer local i sense mostrar-lo mai |
| `netlify/functions/contacte.mts` (15/10/2026) | Els registres hi afegeixen `instance` (identificador aleatori de la instància) i `secret` («estable», «instancia» o «cap»), sense cap valor del secret ni dades personals |

**Dependència nova: `@netlify/blobs` 10.7.13** (client oficial de Netlify Blobs).
- **Justificació:** és la manera documentada d'accedir al magatzem des de la funció.
- **Versió:** la 11 entra en conflicte amb el rang que accepta `unstorage`, una dependència d'Astro.
- **Pes:** afegeix 48 paquets indirectes al `package-lock.json`, sobretot de l'entorn de desenvolupament de Netlify. La funció empaquetada amb esbuild ocupa uns 59 KB.
- **Auditoria:** `npm audit` mostra 3 avisos alts a `sharp` i `source-map-js`, que arriben per Astro i no pel paquet nou.

**Sense dependències de Node al codi compartit:** HMAC, la signatura RS256 i base64 fan servir Web Crypto i `btoa`, disponibles a Node i a Netlify.

## 6. Proves

**Executades el 09/10/2026, en local:**

| Prova | Resultat |
|---|---|
| `npm run test:contact` | **55/55**:<br>• validació: camps obligatoris, formats, longituds, valors, branques, consentiment, i `toString`, `constructor`, `__proto__`, `hasOwnProperty`, `valueOf` i `isPrototypeOf` rebutjats a `servei` i a `producte`; producte d'Industrial amb camp propi;<br>• àmbits: `dry-run` → `live`, `dry-run` → `test` i `test` → `live` envien; duplicat dins del mateix mode i entorn (els tres modes); mateix mode en un altre entorn; registre d'un altre mode o antic sense mode; comptadors per àmbit;<br>• secret: `RL_SECRET` obligatori en `test` i `live` (`503` controlat, en català i castellà, JSON i HTML), provisional només en `dry-run`;<br>• adjunts: 3.000.000 bytes i 2.999.999 bytes acceptats, 3.000.001 bytes rebutjat, fitxer íntegre al JSON, tipus falsos, fitxer buit, petició declarada massa gran;<br>• peticions incorrectes;<br>• antispam: parany, temps, enllaços;<br>• freqüència: límit, simultaneïtat, increments sense pèrdues, empremta;<br>• duplicats: seqüencials, simultanis, reintent després d'un error, «enviant» interromput;<br>• errors: magatzem caigut, mode real sense credencials, registres sense dades personals;<br>• correu: destinatari fixat, Reply-To, assumpte sense nom, «[PROVA]»;<br>• modes;<br>• Graph fals: `202`, reintents, errors definitius, `429`, temps esgotat, credencial rebutjada, asserció RS256 verificable;<br>• conservació: simulació de la neteja horària, amb comptadors ≤ 1 h 5 min i referències < 2 h |
| `scripts/qa/check-contact-form.py` (Chromium) | **31/31**:<br>• **amb JavaScript:** Industrial amb producte (castellà; el servei de Particulars queda desactivat), català i castellà en demostració, errors al navegador i del servidor, adjunts de 3.000.000 / 2.999.999 / 3.000.001 bytes, tipus (navegador i servidor), camp parany, reenviament sense canvis (un sol correu fals), doble clic, xarxa caiguda, `502`, `429` i `413` de la plataforma, sisena consulta de l'hora (`429`), cap error de JavaScript;<br>• **a 390 i 320 px:** missatge visible, sense desbordament;<br>• **sense JavaScript:** enviament nadiu en català i castellà, pàgina `noindex`, llista d'errors, adjunts al màxim exacte i per sobre, **Industrial amb empresa, producte i dades tècniques sense triar cap servei de Particulars** (camps visibles i actius; correu fals amb totes les dades), tornada a Particulars (el servei hi torna a ser obligatori), duplicats |
| `npm run verify`, `check:i18n`, `check:links`, `check:redirects` | Correctes |
| Captures sense JavaScript, Industrial, a 1280 i 390 px | Camps d'Industrial visibles, sense desbordament |
| Selector d'idioma (`check-language-switcher.py`) | 12/12 |
| Empaquetat de les dues funcions amb esbuild | Correcte |

### 6.1 Resultats a `revisio-client` (Netlify, `dry-run`, 09/10/2026)

**Mètode:**
- **Prova:** `scripts/qa/check-contact-form-remote.py` (Chromium i peticions HTTP directes), executada contra https://revisio-client--serralleriacarbo.netlify.app.
- **Magatzem:** consultat amb `netlify blobs:list` i `netlify blobs:get` (store `formulari-contacte`).
- **Sense correus:** la funció és en `dry-run`.
- **Context de Netlify:** el desplegament amb àlies és `branch-deploy`. Les claus queden a l'àmbit `dry-run/branch-deploy`.

| Comprovació | Resultat |
|---|---|
| **Pàgines** `/contacte/` i `/es/contacto/` | `200`, `X-Robots-Tag: noindex`, `meta robots noindex`, avís de demostració visible, `action` correcte, botó actiu |
| **Funció** `/api/contacte` (GET) | `405` amb `Allow: POST`, `Cache-Control: no-store` i `X-Robots-Tag: noindex` |
| **Validació al servidor** (JavaScript, català) | `400`; «Descriu la consulta amb paraules.» sota el camp |
| **Adjunt d'exactament 3.000.000 bytes** (JavaScript, català) | `200`, `state=dry-run` |
| **Adjunt de 3.000.001 bytes** | Aturat al navegador. Petició directa: `413` JSON de la funció (`too-large`) |
| **Adjunt de 2.999.999 bytes** (sense JavaScript, castellà) | `200`; pàgina en castellà amb `noindex` |
| **Petició de 7 MB** | Netlify la rebutja abans de la funció: `413` amb cos buit (`text/plain`). En una execució, mentre la regla de Netlify bloquejava la connexió, la connexió es va tallar. Amb JavaScript, el navegador ho atura abans d'enviar |
| **Industrial sense JavaScript** | Empresa, producte i dades tècniques visibles i actius; servei de Particulars amagat. `200` sense triar cap servei de Particulars |
| **Duplicats** | Reenviament sense canvis: `duplicate=true`, mateixa referència. 3 peticions simultànies amb la mateixa referència: una acceptació nova i dues `duplicate=true` |
| **Errors de JavaScript** | Cap |
| **Límit horari (capa 2)** | **Mateixa instància:** la sisena consulta vàlida de l'hora rep `429` JSON (`rate-limited`). El comptador era exactament `{"count":5}`.<br>**Diverses instàncies:** en una altra execució, la sisena consulta va arribar a una altra instància i es va acceptar. Al magatzem hi havia dos comptadors per a la mateixa IP en la mateixa hora (`5` i `1`). És el comportament esperat en `dry-run` sense `RL_SECRET`, perquè cada instància té un secret provisional, i confirma que `RL_SECRET` és imprescindible en `test` i `live`. La prova ho marca com a avís |
| **Regla de Netlify (capa 1)** | En dues ràfegues de 10 peticions (una cada 1,5 s), les 6–7 primeres reben `405` i les següents, `429` amb cos buit. És aproximada, com diu la documentació |
| **Regla de Netlify amb un POST** | Mentre la regla bloqueja, un POST amb cos pot rebre una **connexió tallada** en lloc d'un `429`. Amb JavaScript, el formulari mostra el missatge d'error amb el telèfon i el correu. Sense JavaScript, el navegador mostraria el seu error de connexió. Només afecta qui fa més de ~5 peticions per minut des de la mateixa IP. Va passar dues vegades en aquestes proves, perquè el ritme de la prova era massa ajustat: ara la prova espera 20 s entre peticions |
| **Neteja horària oportunista** | Abans de la primera petició es van plantar dues entrades velles: un comptador d'una hora anterior i una referència de més d'1 h. Totes dues van desaparèixer amb la primera petició a la instància nova. Després del canvi d'hora UTC, el comptador de les 04 (`rl/2026100904/…`) es va esborrar amb la primera petició de les 05 |
| **Neteja final** | Les 14 entrades de les proves (comptadors i referències) es van esborrar amb `netlify blobs:delete`. El magatzem va quedar buit a les 07:11 (hora de Barcelona) |

**No comprovat a Netlify el 09/10/2026** (estat actual al §6.2):
- **Pujada en xarxa lenta:** el temps mesurat inclou les pauses de la prova i no és fiable. **Superada el 15/10/2026.**
- **«Run now» de la funció programada:** cal fer-ho des del panell; s'ha substituït per la neteja oportunista i la CLI. **Continua pendent.**
- **Comptador compartit entre instàncies amb `RL_SECRET`:** requeria configurar la variable a Netlify. **Superada el 15/10/2026.**

**Pendents (requereixen autorització):**

| Fase | Prova | Criteri |
|---|---|---|
| **5.2 bis** | ~~Configurar `RL_SECRET` i repetir el límit horari amb diverses instàncies; pujada en xarxa lenta~~ **Fet el 15/10/2026 (§6.2)**, inclòs el «Run now» de `neteja-temporals` amb registres sintètics (§6.2 C) | Un sol comptador per IP i hora; la sisena consulta, `429`. La neteja esborra els caducats i conserva els vigents |
| ~~**5.2 `dry-run` a `revisio-client`**~~ **Fet el 09/10/2026 (§6.1)**, excepte els punts de 5.2 bis | Repetir les proves de navegador contra Netlify; adjunt d'exactament 3.000.000 bytes i de 3.000.001; petició de més de 6 MB sense JavaScript; `429` de la capa 1; pujada en xarxa lenta; adaptador de Blobs; «Run now» de la neteja i comprovació que el magatzem queda buit | Mateixos resultats que en local. Documentar què mostra Netlify amb més de 6 MB i amb el `429` de la capa 1 |
| **Comprovació de l'administrador** | `Test-ServicePrincipalAuthorization` amb `carbo@` i amb una altra bústia | `True` i `False` |
| **5.3 `test` a `revisio-client`** (correus «[PROVA]» a `carbo@`, amb autorització del director i del client) | 4 enviaments: Particulars i Industrial, en català i castellà. Un porta un adjunt d'**exactament 3.000.000 bytes** | A la safata d'entrada de `carbo@`, no a la brossa ni a la quarantena; traça del missatge per referència; Reply-To, accents, adjunt íntegre, consentiment, data i referència correctes; cap còpia a Enviats. Si Graph rebutja els 3.000.000 bytes, es baixa el límit i es repeteixen el màxim exacte, un byte per sota i un per sobre |
| **5.4 Resposta** | Respondre una consulta de prova amb «Respon» | La resposta va al correu del visitant de prova |
| **5.5 Producció** | `FORM_MODE=live`, un enviament real, i registres i rebots la primera setmana | Recepció confirmada; registres sense dades personals |

### 6.2 Proves pendents a `revisio-client` (Netlify, `dry-run`, 15/10/2026)

**Configuració aplicada (sense secrets):**

| Element | Valor |
|---|---|
| `RL_SECRET` | Creada amb l'API de Netlify per a la branca `revisio-client`: `secrets.token_hex(32)`, 32 bytes aleatoris i 64 caràcters. El valor no s'ha mostrat en cap sortida, registre, document ni commit. Abans no existia cap variable al projecte |
| `FORM_MODE` | `dry-run`, explícit, per a la branca `revisio-client` |
| Abast i secret | No disponibles en el pla actual (§4.5): variables normals amb tots els abastos, limitades a la branca |
| Producció i altres contextos | Sense cap variable (comprovat després de la configuració i al final) |
| Desplegament | `6ad02e32041dc6f8e15c72ba`, àlies `revisio-client`, sense `--prod`. Codi de `contacte.mts` amb `instance` i `secret` als registres |

**Mètode:**
- **Prova:** `scripts/qa/check-contact-form-remote-limits.py`, contra https://revisio-client--serralleriacarbo.netlify.app.
- **Magatzem:** `formulari-contacte`, consultat i netejat amb `netlify blobs`. Era buit abans de les proves.
- **Registres:** `netlify logs --source functions --deploy-id …`.
- **Empremta:** les claus del comptador es mostren escurçades, perquè l'empremta és un pseudònim de la IP.
- **Capa 1 de Netlify:** com a molt una petició cada 21 s i 65 s de silenci abans de les peticions simultànies, perquè la regla no emmascari el límit horari.

#### A. Control de freqüència amb el secret estable (01:39–01:45 UTC, una sola hora UTC)

| Comprovació | Resultat |
|---|---|
| **A1. Sis consultes vàlides seqüencials** (mateixa IP i hora, referències diferents) | Les cinc primeres, `200` `dry-run`; la sisena, `429` `rate-limited` de la funció. **Superada** |
| **A1. Magatzem** | Un sol comptador `rl/2026101501/dry-run/branch-deploy/4e7629b4…` amb `{"count":5}`. **Superada** |
| **A2. Concurrència** (comptador a zero; tres seqüencials; 65 s de silenci; cinc peticions simultànies amb una barrera) | Les tres seqüencials, acceptades. De les cinc simultànies, 2 acceptades i 3 `429` de la funció: **5 acceptacions en total, mai més**. Cap resposta de la capa 1 (`429` sense cos o connexió tallada). **Superada** |
| **A2. Magatzem** | Un sol comptador, la mateixa clau, `{"count":5}`. **Superada** |
| **Secret als registres** | Les 14 peticions: `secret: "estable"` |

La prova falla si s'accepten més de cinc consultes o si la capa 1 n'emmascara alguna. Ja no hi ha cap avís.

**Instàncies.** Només es compten les que consten als registres de la funció, amb la referència de cada petició:

| Instància | Peticions | Resultats |
|---|---|---|
| `0a24f1a4` | 11: les 6 de A1, les 3 seqüencials de A2 i 2 de les simultànies | `dry-run` i `rate-limited` |
| `348ccd82` | 1 simultània | `rate-limited` |
| `274782b9` | 1 simultània | `rate-limited` |
| `87b7698d` | 1 simultània; després, les pujades de B | `rate-limited` i `dry-run` |

Quatre instàncies diferents van llegir i escriure **el mateix comptador**: les quatre calculen la mateixa empremta, i això demostra que comparteixen el secret estable. Els registres de les peticions simultànies van trigar uns 4 minuts a aparèixer. Al principi la CLI en mostrava les línies amb el missatge buit. Sense aquests registres no es pot afirmar quina instància va atendre cada petició, i no s'ha deduït del temps de resposta.

#### B. Connexió lenta

| Comprovació | Resultat |
|---|---|
| **Limitació aplicada** | CDP de Chromium (`Network.emulateNetworkConditions`), només per a l'enviament: pujada de 512 kbit/s, baixada d'1,6 Mbit/s i latència de 300 ms |
| **B1. Adjunt JPG vàlid de 1.000.000 bytes** (JavaScript, català) | `200` `dry-run`. Missatge final: «La consulta no s'ha enviat: el formulari encara no està actiu. Escriu-nos per WhatsApp o truca al 93 890 27 94.» **Superada** |
| **B1. Temps real de la petició** | **16,3 s** segons el Resource Timing del navegador, de l'inici de la petició a l'últim byte de la resposta (16,31 s fins a la resposta i 0,01 s de descàrrega). Mínim teòric de la pujada: 15,6 s. No inclou les esperes entre proves ni l'emplenament |
| **B2. Tall de connexió durant la pujada** | Missatge: «No hem pogut enviar la consulta. Torna-ho a provar o escriu-nos a carbo@serralleriacarbo.com o truca al 93 890 27 94.» Es conserven el nom, el correu, el servei, la descripció, el fitxer (`plànol.jpg`, 1.000.000 bytes) i el consentiment, i el botó torna a estar actiu. **Superada** |

**Sobre B2:** amb CDP, posar el navegador fora de línia no talla una petició que ja s'està enviant. En el primer intent, la pujada va arribar sencera i es va acceptar (`48UUAVGMG3`, a la instància `87b7698d`). La prova definitiva injecta el tall al navegador: Playwright reté la petició 8 s, la meitat de la pujada de B1, i la talla amb `connectionreset`. Aquesta petició no arriba a Netlify. Comprova la resposta del formulari a un tall, no la xarxa real.

#### C. Neteja programada: **superada** (15/10/2026, «Run now» del director)

**Primer intent (15/10/2026, 01:51 UTC):** registres sintètics creats, però «Run now» no es va poder executar.
- Netlify no permet invocar les funcions programades amb una URL i no les executa als desplegaments no publicats.
- El panell no és accessible des de l'entorn de proves: es queda en blanc, amb la verificació reCAPTCHA i sense sessió.
- Els sintètics es van esborrar sense haver provat la neteja.
- No s'ha creat cap punt d'accés públic.

**Procediment actual (15/10/2026, segona sessió):**
1. **Registres sintètics.** Es creen amb la part `plantar`, amb el format real de la funció:
   - **caducats:** un comptador de fa dues hores i una referència de fa dues hores;
   - **vigents amb marge:** un comptador d'una hora futura i una referència amb data futura. Continuen vigents unes 22 h, perquè «Run now» no s'hagi de prémer dins de la mateixa hora;
   - **recents:** un comptador de l'hora actual i una referència d'ara. El resultat esperat depèn de l'hora de l'execució.
2. **«Run now».** El prem el director:
   - al panell de Netlify, a la funció `neteja-temporals` del desplegament `6ad02e32041dc6f8e15c72ba` (`revisio-client`);
   - **no** a producció: el desplegament publicat no té funcions;
   - sense cap enviament del formulari mentrestant.
3. **Comprovació.** La fa la part `neteja`:
   - localitza l'execució al registre de `neteja-temporals` (esdeveniment i hora exacta);
   - comprova que no hi ha cap petició a `contacte` entre els registres i l'execució, perquè la neteja oportunista no hi intervingui;
   - calcula, amb l'hora de l'execució i les mateixes regles que `sweep()`, quins sintètics havien de desaparèixer;
   - comprova que han desaparegut els caducats, que es conserven els vigents i que el registre en compta almenys els caducats.
   - **No és vàlid executar la funció amb el magatzem buit:** la prova exigeix registres caducats i vigents presents abans de l'execució.
4. **Neteja final.** La part `netejar` esborra només els sintètics que quedin.

**Diferència amb la neteja oportunista:**
- **Oportunista:** la fa la funció de contacte, i ja es va comprovar el 09/10/2026 (§6.1).
- **Programada:** aquesta prova verifica la funció `neteja-temporals`, i el registre ho identifica amb l'esdeveniment `neteja-temporals`.

**Registres sintètics actuals:** creats el **15/10/2026 a les 03:20 UTC (05:20, hora de Barcelona)** amb el magatzem buit:
- **caducats:** `rl/2026101501/…/sintetic-caducat` i `sub/…/SINTCADUCAT`;
- **vigents amb marge:** `rl/2026101602/…/sintetic-vigent-marge` i `sub/…/SINTVIGENTMARGE`;
- **recents:** `rl/2026101503/…/sintetic-recent` i `sub/…/SINTRECENT`. S'han de conservar si «Run now» es prem abans de les 04:00 UTC; després, també han de desaparèixer.

**Termini per prémer «Run now»:** fins al 16/10/2026 a les 01:20 UTC (03:20, hora de Barcelona).

**Resultat:**

| Comprovació | Resultat |
|---|---|
| **Execució** | El director va prémer «Run now» al desplegament `6ad02e32041dc6f8e15c72ba`. El registre de `neteja-temporals` mostra l'execució el **15/10/2026 a les 04:32:11 UTC** (693 ms): `{"event":"neteja-temporals","counters":2,"references":2}` |
| **Sense neteja oportunista entremig** | Cap petició a `contacte` entre els registres sintètics i l'execució |
| **Esborrats** (caducats a l'hora de l'execució) | `rl/2026101501/…/sintetic-caducat`, `sub/…/SINTCADUCAT` i, en ser més de les 04:00 UTC, també `rl/2026101503/…/sintetic-recent` i `sub/…/SINTRECENT` (72 minuts d'antiguitat). **Superada** |
| **Conservats** (vigents) | `rl/2026101602/…/sintetic-vigent-marge` i `sub/…/SINTVIGENTMARGE`. **Superada** |
| **Recompte del registre** | 2 comptadors i 2 referències: exactament els quatre sintètics caducats. El magatzem no tenia res més |
| **Neteja final** | Els dos sintètics vigents s'han esborrat amb la part `netejar`. El magatzem ha quedat buit, com abans de la prova |

**Detall:** el registre de l'execució va trigar uns minuts a mostrar el missatge. Al principi la CLI en mostrava la línia buida, com amb les peticions simultànies de la prova A.

**Revisió de Codex (16/10/2026) i prova decisiva.**

Troballa: la comprovació només buscava l'esdeveniment `contacte`. Una petició a `/api/contacte` que no el deixa, com un GET (`405`) o un cos il·legible, també pot llançar la neteja oportunista.

Correccions de l'script:
- ara compta qualsevol línia del registre de la funció de contacte;
- falla si no pot llegir els registres.

Els registres del 15/10 ja no es poden tornar a consultar: la finestra de control amb peticions conegudes també surt buida, perquè Netlify en conserva aproximadament un dia. El resultat, però, no en depèn:
- `neteja-temporals` va registrar l'esborrat de 2 comptadors i 2 referències, exactament els quatre sintètics caducats;
- el magatzem era buit abans de crear-los;
- si una neteja oportunista els hagués esborrat abans, l'execució programada no els hauria pogut comptar.

La comprovació de l'script ara es presenta com aquesta prova. **La prova continua superada.**

**Lliçó:** els registres de les funcions s'han de llegir el mateix dia de la prova.

#### Tancament

| Comprovació | Resultat |
|---|---|
| **Dades de les proves** | 22 claus: 17 referències, 1 comptador (recreat després de cada esborrat) i 4 sintètiques. S'han esborrat una per una a partir de la llista de la prova i dels registres; la referència del primer intent de B2 es va identificar als registres. **El magatzem ha quedat buit, com abans de les proves.** No s'ha buidat el magatzem sencer |
| **Mode** | `dry-run` a totes les entrades dels registres; `FORM_MODE=dry-run` explícit a la branca |
| **Correus** | Cap: en `dry-run` no s'envia res, i a Netlify no hi ha cap credencial de Microsoft 365 |
| **Pàgines** | `/contacte/`, `/es/contacto/` i `/en/contact/`: `X-Robots-Tag: noindex`, `meta robots noindex` i avís de demostració |
| **No repetides** | Les proves superades el 09/10/2026 (§6.1). La sisena consulta de `check-contact-form-remote.py` ara falla en lloc d'avisar; no s'ha tornat a executar perquè A1 en cobreix el cas |

### 6.3 Següent pas per connectar Microsoft 365

Ordre proposat:
1. ~~**Director:** «Run now» de la neteja (§6.2 C).~~ Fet el 15/10/2026.
2. **Director:** enviar el missatge del §10 a l'administrador. Abans, generar el certificat i adjuntar-ne la part pública (§6.5).
3. **Administrador:** configuració a Entra i a Exchange. Respon amb `Test-ServicePrincipalAuthorization` i els identificadors.
4. **Director:** desar les credencials a Netlify **només per a la branca `revisio-client`** i com a secretes (§6.5). Encara no s'incorporen a producció.
5. **Director i client:** acordar la prova real controlada (§11).
6. **Producció**, després de la prova:
   - un altre `RL_SECRET` i les credencials al context de producció;
   - saldo de crèdits;
   - autorització de `live`.

### 6.4 Opcions del pla de Netlify per a les variables d'entorn

**Dades del compte** (API de Netlify, 15/10/2026):
- **Pla:** Free, amb un sol membre.
- **Capacitats:** `env_var_scopes` no inclòs; `env_var_secrets` inclòs; `shared_env_variables` no inclòs.

**Proves fetes:**
- amb variables temporals `QA_PROBE_*`, sense cap valor real, només per a la branca `revisio-client`, esborrades tot seguit;
- amb les variables reals del 15/10/2026.

| Opció | Disponible al pla Free | Què protegeix | Limitacions reals |
|---|---|---|---|
| **Variable normal** | Sí (creada: `RL_SECRET`, `FORM_MODE`) | Es pot limitar a un context de desplegament o a una branca concreta | Té **tots els abastos**: compilacions, funcions, execució i postprocessament (injecció de fragments). El valor es pot tornar a llegir al panell, a l'API i a la CLI, per qualsevol persona amb accés al projecte |
| **Restricció d'abast a «Functions»** | **No**: `403 Forbidden`, tant per a una variable normal com per a una de secreta | Només la llegeixen les funcions | Requereix el **pla Pro** (documentació de Netlify i prova de l'API). No impedeix que algú amb accés al projecte llegeixi el valor si no és secret |
| **Variable secreta** (Secrets Controller) | **Sí, amb els abastos `builds`, `functions` i `runtime`**: creada i esborrada amb èxit. Sense abastos explícits, `422`: Netlify obliga a excloure el postprocessament | El valor és **només d'escriptura**: després de desar-lo, no es pot llegir al panell, a l'API ni a la CLI. Només el codi que s'executa a Netlify llegeix el valor real. Es pot limitar a una branca | També arriba a les compilacions i a l'execució, no només a les funcions. Aquest projecte es desplega amb la CLI i sense compilacions remotes, i no té funcions Edge. El marcatge **no es pot desfer**. L'escaneig de secrets de Netlify atura el desplegament si troba el valor als fitxers publicats. La documentació no diu que el valor s'emmascari als registres; la funció no el registra mai |

**Altres comprovacions:**
- **Mida:** les funcions d'aquest projecte fan servir el format modern de Netlify. El límit de 4 KB del total de variables només s'aplica al mode de compatibilitat amb Lambda, i una clau RSA de 2048 bits fa uns 1,7 KB.
- **Canvis de valor:** requereixen un desplegament nou.
- **CLI:** `netlify env:set` va retornar èxit sense desar res en aquest projecte. Per això `scripts/netlify/set-env-from-file.py` fa servir l'API. L'eina s'ha provat amb una variable temporal: creació i actualització d'una variable secreta d'una branca sense mostrar-ne el valor; després es va esborrar.

**Recomanació:**
- **No cal ampliar el pla.** Les credencials de Microsoft 365 es desen com a **variables secretes** (abastos `builds`, `functions` i `runtime`) i limitades primer a la branca `revisio-client` i, després, a producció.
- Només caldria el pla Pro si es vol la restricció estricta a «Functions», que aquí no afegeix protecció real perquè no hi ha compilacions remotes ni funcions Edge.
- **`RL_SECRET` convertida en secreta (autorització del director, 15/10/2026):**
  - **Mètode:** el valor es va llegir dins del procés, sense mostrar-lo, i es va reescriure igual amb `updateEnvVar`: `is_secret: true`, abastos `builds`, `functions` i `runtime`, i el mateix context exclusiu (`branch:revisio-client`).
  - **Després del canvi:** l'API ja no en retorna el valor.
  - **Redesplegament:** `6ad06234e068abb8a07f67ad`, sense `--prod`.
  - **Comprovació del valor:** una consulta `dry-run` va generar la mateixa clau de comptador que les proves de les 01:39 UTC (`4e7629b4…`, mateixa IP i mateix dia). Amb un valor diferent, l'empremta hauria canviat. Les dues claus de la consulta es van esborrar.
- **No s'ha incorporat cap credencial de Microsoft 365.**

### 6.5 Certificat de l'aplicació: generació, caducitat i renovació

**Paràmetres:**
- **Clau:** RSA de 2048 bits, en PKCS#8 (`BEGIN PRIVATE KEY`), el format que llegeix `graph.ts`.
- **Certificat:** X.509 autosignat, amb SHA-256 i el subjecte `CN=Formulari web Serralleria Carbo`.
- **Caducitat: 365 dies** des de la generació. Entra admet certificats autosignats per a la credencial de l'aplicació.

**Generació** (la llança el director; la clau privada no surt de la seva màquina):

```bash
python -I scripts/m365/generate-certificate.py
```

- **Carpeta:** crea `~/m365-formulari/` i hi deixa `formulari-web-AAAAMMDD.cer.pem` (part pública) i `formulari-web-AAAAMMDD.key.pem` (clau privada).
- **Seguretat:**
  - es nega a escriure dins de qualsevol repositori Git;
  - no sobreescriu fitxers;
  - restringeix els permisos de la clau a l'usuari actual i s'atura si no ho aconsegueix. Correcció de la revisió de Codex del 16/10/2026: abans se n'ignorava el resultat. La clau del 15/10/2026 té els permisos correctes: només hi té accés l'usuari del director, sense herència (`icacls`, consultat sense llegir-ne el contingut);
  - no en mostra mai el contingut.
- **Sortida:** només dades públiques:
  - el fitxer que s'ha d'adjuntar;
  - la data de caducitat i la data a partir de la qual cal renovar;
  - l'empremta SHA-1 (`M365_CERT_THUMBPRINT`);
  - la comprovació que la clau és PKCS#8 i que fa parella amb el certificat.

**Desar les credencials a Netlify** (quan l'administrador hagi retornat els identificadors, i amb l'autorització del director):

```bash
python -I scripts/netlify/set-env-from-file.py M365_PRIVATE_KEY_PEM ~/m365-formulari/formulari-web-AAAAMMDD.key.pem branch:revisio-client --secret
```

- **Identificadors:** `M365_TENANT_ID`, `M365_CLIENT_ID` i `M365_CERT_THUMBPRINT` es desen de la mateixa manera des d'un fitxer de text. No són secrets, però es poden marcar com a tals.
- **Comprovació:** l'eina només mostra la clau, el marcatge, els abastos i els contextos.
- **Desplegament:** cal un desplegament nou de `revisio-client`, sense `--prod`. `FORM_MODE` es manté a `dry-run` fins a la prova (§11).
- **Clau local:** quan la variable és a Netlify, s'esborra. Netlify no la torna a mostrar. Si mai cal, es genera un parell nou: no se'n guarda cap còpia.

**Certificat vigent** (generat pel director el 15/10/2026; dades públiques llegides del `.cer.pem`):

| Dada | Valor |
|---|---|
| Fitxer públic | `~/m365-formulari/formulari-web-20261015.cer.pem` |
| Subjecte | `CN=Formulari web Serralleria Carbo` |
| Clau i signatura | RSA de 2048 bits, `sha256WithRSAEncryption` |
| Vàlid | Del 15/10/2026, 05:28 UTC, al **15/10/2027, 05:28 UTC** (07:28, hora de Barcelona) |
| Empremta SHA-1 (`M365_CERT_THUMBPRINT`) | `[M365_CERT_THUMBPRINT configurat a Netlify]` |
| Avís de renovació | **15/09/2027** |
| Clau privada | `~/m365-formulari/formulari-web-20261015.key.pem`: no s'ha llegit, no s'ha copiat i no és al repositori. Es desarà a Netlify quan l'administrador acabi |

**Renovació** (anual; responsables: el director i l'administrador):
1. **Avís:** 30 dies abans de la caducitat, al calendari del director i del client. La data es registra en aquest document quan es generi el certificat. El valor no es registra mai.
2. **Nou parell:** el director genera un parell nou amb el mateix script. El nom porta la data, i no trepitja l'anterior.
3. **Entra:** l'administrador **afegeix** la part pública nova a la mateixa aplicació sense treure l'antiga. Entra admet diversos certificats alhora. L'àmbit d'Exchange no canvia.
4. **Netlify:** el director actualitza `M365_PRIVATE_KEY_PEM` i `M365_CERT_THUMBPRINT` amb `set-env-from-file.py` (el valor d'un secret es pot substituir) i redesplega.
5. **Comprovació:** un enviament de prova autoritzat, o la primera consulta real, amb resultat `sent`.
6. **Retirada:** l'administrador treu el certificat antic d'Entra i el director esborra la clau nova del seu disc.

**Si caduca sense renovar:**
- la funció respon `502`;
- el registre anota `auth_failed`;
- el visitant veu el missatge amb el telèfon i el correu.

**Revocació en cas d'incidència:** l'administrador treu el certificat de l'aplicació a Entra o l'assignació de rol a Exchange. La funció deixa d'enviar a l'instant.

## 7. Dades i accessos necessaris

1. **Administrador de Microsoft 365:** missatge de §10 i preguntes de §9.
2. **DNS** (mayasystems.net, quan el client ho autoritzi): DKIM de Microsoft 365 (dos CNAME) i DMARC inicial (`p=none`).
3. **Adjunts:** DWG i DXF (client).
4. **Advocat:**
   - conservació;
   - empremta de la IP;
   - regió de la funció i de Blobs;
   - textos castellans.
5. **Netlify** (propietari de l'equip): saldo, pla i motiu del bloqueig dels desplegaments de producció. La recàrrega automàtica és opcional.
6. **Autoritzacions:** desplegament a `revisio-client` en mode `dry-run`; després, la prova 5.3.

## 8. Límits i riscos

- **Sense JavaScript, a Industrial:**
  - **Textos d'ajuda:** el text d'ajuda de la descripció, l'etiqueta de l'adjunt i el títol del desplegable continuen sent els de Particulars, perquè els canvia el JavaScript. Els camps i el producte sí que són els d'Industrial.
  - **Navegadors sense `:has()`:** es veuen els camps de les dues branques. La funció només llegeix els de la branca triada.
- **Proves sense JavaScript:** Playwright no pot comprovar l'estabilitat dels elements (en aquest context no avancen els fotogrames d'animació), així que els enviaments es fan amb el teclat. No afecta els usuaris.
- **El màxim de 3.000.000 bytes no està validat amb Graph** fins a la prova 5.3.
- **Neteja programada:** Netlify no l'executa en desplegaments no publicats. A `revisio-client` funcionen la neteja oportunista (§6.1) i «Run now» (§6.2 C). En producció s'executarà cada hora.
- **Regla de Netlify amb un POST:** pot tallar la connexió en lloc de respondre `429` (§6.1).
- **En `dry-run` sense `RL_SECRET`,** el límit horari és per instància (§6.1). A `revisio-client` ja hi ha `RL_SECRET`, i el comptador es comparteix (§6.2).
- **Pla actual de Netlify:** no permet l'abast exclusiu «Functions». Les credencials es desen com a secretes amb els abastos `builds`, `functions` i `runtime` (§6.4).
- **Credencial de `carbo@`:** permet enviar com la bústia principal (§4.5).
- **Correu brossa:** sense Akismet en pot arribar més. Es revisarà el primer mes.
- **Duplicats:** són possibles en errors ambigus i en reenviaments nadius, i es poden identificar per la referència.
- **Un `202` no garanteix el lliurament.**

## 9. Preguntes per a l'administrador de Microsoft 365

Cap resposta no ha d'incloure secrets ni contrasenyes.

1. Qui administra el tenant? Té els rols *Exchange Administrator* (Entra) i *Organization Management* (Exchange Online), i pot fer servir Exchange Online PowerShell?
2. `carbo@serralleriacarbo.com` pot ser remitent i destinatari alhora?
   - És una bústia d'usuari o compartida?
   - Quina mida màxima té en enviament i en recepció?
   - Hi ha regles de flux de correu, quarantena o filtres que afectin un missatge que la bústia s'envia a si mateixa amb un adjunt?
3. Pot registrar l'aplicació **sense** consentir `Mail.Send` a Entra i assignar el rol `Application Mail.Send` amb un àmbit d'Exchange limitat a `carbo@`? Pot compartir el resultat de `Test-ServicePrincipalAuthorization` per a `carbo@` i per a una altra bústia?
4. Accepta el certificat que li enviem (només la part pública, 365 dies)? Qui el carregarà a Entra quan s'hagi de renovar? Si prefereix un secret de client, l'haurà d'escriure ell mateix a Netlify (§4.5).
5. Pot revisar els inicis de sessió de l'aplicació i la traça de missatges si se sospita un ús anòmal? Qui revocaria la credencial?
6. Es pot aplicar una retenció a les consultes web de `carbo@` (termini pendent de l'advocat), o es farà manualment?
7. Pot activar el DKIM de Microsoft 365 quan el client autoritzi el canvi de DNS?

## 10. Missatge per a l'administrador de Microsoft 365

Versió del 15/10/2026: substitueix la del 09/10/2026.

**Canvis:**
- el certificat el genera el director i l'administrador només en rep la part pública;
- l'administrador ja no ha d'entrar a Netlify;
- el missatge diu exactament què cal retornar.

**Abans d'enviar-lo:**
- generar el certificat (§6.5);
- adjuntar només `formulari-web-20261015.cer.pem`, la part pública que va crear l'script a `~/m365-formulari/`. **Mai el `.key.pem`.**

> **Assumpte:** Serralleria Carbó · Microsoft Graph per al formulari web, limitat a carbo@serralleriacarbo.com
>
> Bon dia,
>
> El nou web de Serralleria Carbó té un formulari de contacte que enviarà cada consulta per correu amb Microsoft Graph (`sendMail`).
> - **Remitent i destinatari:** sempre `carbo@serralleriacarbo.com`.
> - **Reply-To:** el correu que el visitant escriu al formulari, validat al servidor.
> - **Destinatari fixat:** és al codi del servidor; el formulari no el pot canviar.
>
> Us demanem una configuració que permeti a l'aplicació enviar **exclusivament des de la bústia carbo@**.
>
> **1. Aplicació a Microsoft Entra**
> - Registreu una aplicació d'un sol inquilí, per exemple «Formulari web Serralleria Carbó».
> - **No hi afegiu cap permís de Microsoft Graph** ni hi concediu consentiment d'administrador: ni `Mail.Send` ni cap altre, ni d'aplicació ni delegat. Un permís d'Entra s'afegiria a l'àmbit d'Exchange i donaria accés a totes les bústies.
> - **Credencial:** carregueu el certificat adjunt (`formulari-web-20261015.cer.pem`) a «Certificats i secrets → Certificats».
>   - És només la part pública. La clau privada no surt de la nostra màquina i la desem directament al nostre allotjament (Netlify) com a valor secret de només escriptura.
>   - Caduca el 15/10/2027. Empremta SHA-1 esperada: `[M365_CERT_THUMBPRINT configurat a Netlify]`. Si la que mostra Entra no coincideix, no continueu i aviseu-nos.
>   - No cal crear cap secret de client.
>
> **2. Permís limitat a carbo@** (RBAC per a aplicacions d'Exchange Online, Exchange Online PowerShell):
> ```powershell
> New-ServicePrincipal -AppId <Application (client) ID> -ObjectId <Object ID de l'aplicació a Enterprise applications> -DisplayName "Formulari web Serralleria Carbó"
> New-ManagementScope -Name "Formulari web - carbo" -RecipientRestrictionFilter "PrimarySmtpAddress -eq 'carbo@serralleriacarbo.com'"
> New-ManagementRoleAssignment -App <Object ID> -Role "Application Mail.Send" -CustomResourceScope "Formulari web - carbo"
> ```
> - **Rols necessaris:** *Exchange Administrator* a Entra i pertinença a *Organization Management* a Exchange Online.
> - **Temps:** els canvis poden trigar fins a 2 hores a aplicar-se.
>
> **3. Comprovació**
> ```powershell
> Test-ServicePrincipalAuthorization -Identity <Object ID> -Resource carbo@serralleriacarbo.com
> Test-ServicePrincipalAuthorization -Identity <Object ID> -Resource <una altra bústia del domini>
> ```
> El primer ha de donar `InScope = True` i el segon, `False`.
>
> **4. Què ens heu de retornar** (cap d'aquestes dades no és secreta; es poden enviar per correu):
> - l'identificador de l'inquilí (*Directory (tenant) ID*);
> - l'identificador de l'aplicació (*Application (client) ID*);
> - l'empremta del certificat que mostra Entra (*Thumbprint*), per comprovar que coincideix amb la nostra;
> - el resultat de les dues ordres `Test-ServicePrincipalAuthorization`.
>
> **No ens envieu cap secret, contrasenya, clau privada ni testimoni**, ni per correu, ni per xat, ni per cap altre canal. No en necessitem cap, i no cal que accediu a Netlify.
>
> **5. El que no cal fer**
> - No cal crear cap bústia nova.
> - No cal bloquejar els enviaments externs de carbo@: la bústia ha de continuar funcionant amb normalitat.
>
> **6. Ens podeu confirmar, si us plau:**
> 1. si carbo@ és una bústia d'usuari o compartida, i la mida màxima en enviament i en recepció;
> 2. si hi ha alguna regla de flux de correu, quarantena o filtre que afecti un missatge que carbo@ s'envia a si mateixa amb un adjunt de fins a 3 MB (uns 4 MB codificat);
> 3. qui podrà consultar la traça dels missatges (*message trace*) el dia de la prova;
> 4. com es revocaria l'accés en cas d'incidència (treure el certificat de l'aplicació o l'assignació de rol) i qui ho faria;
> 5. si es pot aplicar una retenció a les consultes web de carbo@ (el termini el fixarà l'assessor) o si es gestionarà manualment;
> 6. si podreu activar el DKIM de Microsoft 365 quan el client autoritzi el canvi de DNS.
>
> **7. Prova controlada.** Quan ho tingueu, acordarem una data per enviar 4 o 5 consultes de prova amb «[PROVA]» a l'assumpte i comprovar-ne la recepció i la traça.
>
> El formulari és ara en mode de demostració i **no envia cap correu**.
>
> Moltes gràcies.

## 11. Procediment de la prova real controlada (preparat, no executat)

**Objectiu:** comprovar que una consulta arriba de veritat a `carbo@`, amb adjunt i sense, i que la resposta va al visitant. Sense tocar producció ni el DNS.

**Dues comprovacions diferents:**
- **Acceptació:** la funció respon `state: "sent"` amb una referència. Vol dir que **Microsoft Graph ha retornat `202 Accepted`**: Exchange ha acceptat el missatge per processar-lo. **No vol dir que s'hagi lliurat.**
- **Recepció efectiva:** es confirma a la bústia `carbo@`, a la safata d'entrada i no a la brossa ni a la quarantena, i a la traça del missatge (*message trace*) amb l'estat «Delivered». Només això compta com a recepció.

### 11.1 Condicions prèvies

| Condició | Responsable |
|---|---|
| `Test-ServicePrincipalAuthorization`: `True` per a `carbo@` i `False` per a una altra bústia | Administrador |
| Data i hora acordades. El client sap que arribaran 4 o 5 correus «[PROVA]» a `carbo@` | Director i client |
| Jordi, amb accés a `carbo@`, disponible per confirmar la recepció; l'administrador, per a la traça | Client i administrador |
| Una adreça de prova del director (visitant de prova) per comprovar el Reply-To | Director |
| Neteja programada comprovada (§6.2 C) | **Fet** el 15/10/2026 |

### 11.2 Configuració (només la branca `revisio-client`)

1. **Credencials secretes**, desades amb `scripts/netlify/set-env-from-file.py … branch:revisio-client --secret` (§6.5):
   - `M365_TENANT_ID`;
   - `M365_CLIENT_ID`;
   - `M365_CERT_THUMBPRINT`;
   - `M365_PRIVATE_KEY_PEM`.
2. **`FORM_MODE=test`** per a la branca `revisio-client` (modificar el valor existent).
   - `live` no és possible fora de producció: el codi torna a `dry-run`.
3. **`RL_SECRET`:** ja hi és (§6.2).
4. **Redesplegament:** a `revisio-client`, **sense `--prod`**. Les funcions llegeixen les variables al moment del desplegament.
5. **Abans d'enviar res:**
   - les pàgines continuen amb `noindex`;
   - producció continua sense variables.
   - L'avís de demostració es manté durant la prova: només es retira quan l'enviament real està implementat i provat (`CLAUDE.md`).

### 11.3 Enviaments

Com a màxim cinc consultes vàlides per hora i connexió, i com a mínim 21 s entre peticions. Per a cada enviament es registren la referència, l'hora, l'estat de la resposta i el resultat del registre de la funció (`sent`, intents).

| # | Formulari | Adjunt |
|---|---|---|
| 1 | Català, Particulars, amb JavaScript | Sense adjunt |
| 2 | Castellà, Industrial amb producte, amb JavaScript | JPG d'**exactament 3.000.000 bytes** |
| 3 | Català, Industrial, **sense JavaScript** | PDF petit |
| 4 | Anglès, Particulars, amb JavaScript | Sense adjunt |

**Si Graph rebutja l'adjunt de 3.000.000 bytes:**
- s'atura la prova;
- es rebaixa el límit (§4.1);
- es tornen a provar el màxim exacte, un byte per sota i un per sobre.

**Si hi ha un `502` o un `auth_failed`:** s'atura la prova i es torna a `dry-run` (§11.5).

### 11.4 Comprovacions de recepció i de resposta

1. **Recepció:** cada correu és a la safata d'entrada de `carbo@`, no a la brossa ni a la quarantena. Es busca per «Ref. …» a l'assumpte.
2. **Traça:** l'administrador hi troba cada referència amb l'estat «Delivered» (remitent `carbo@`, hora de la prova).
3. **Contingut:**
   - accents correctes;
   - totes les dades de la consulta;
   - data en hora de Barcelona i referència (també a la capçalera `X-Carbo-Ref`);
   - consentiment i versió del text;
   - comunicacions comercials;
   - assumpte amb «[PROVA]» i sense el nom del visitant.
4. **Adjunt:** s'obre, i el de la prova 2 fa exactament 3.000.000 bytes.
5. **Enviats:** cap còpia a la carpeta Enviats de `carbo@` (`saveToSentItems: false`).
6. **Resposta al visitant:**
   - des de `carbo@`, «Respon» a la prova 1;
   - el camp «Per a» ha de ser l'adreça de prova del director, amb el nom de la consulta;
   - la resposta arriba a aquesta adreça.

### 11.5 Retorn a `dry-run`

1. **`FORM_MODE=dry-run`** per a la branca `revisio-client` i redesplegament sense `--prod`.
2. **Comprovació:** una consulta vàlida respon `state: "dry-run"` i el registre de la funció diu `mode: "dry-run"`.
3. **Credencials:** decidir si es conserven a la branca o si s'esborren fins a producció. **Proposta:** esborrar-les de la branca i tornar-les a desar, amb un certificat nou si cal, al context de producció quan s'autoritzi `live`.
4. **Neteja de dades:** esborrar només les claus de la prova (referències i comptador) del magatzem `formulari-contacte`.
5. **Registre de resultats:** al §6, sense dades personals: referències, estats, «Delivered», mida de l'adjunt i incidències.

### 11.6 Comprovacions que només es poden fer a producció

Es fan quan s'autoritzi el pas a producció. No formen part de la prova controlada.

1. **Neteja automàtica:** el registre de `neteja-temporals` mostra una execució cada hora (minut 5) al desplegament publicat, i el magatzem no conserva comptadors d'hores anteriors ni referències de més de 2 hores. A la previsualització només s'ha pogut comprovar amb «Run now» (§6.2 C).
2. **Secret de producció:** un `RL_SECRET` nou, secret i limitat a producció, diferent del de `revisio-client`.
3. **Credencials:** desades al context de producció (§6.5) i `FORM_MODE=live`, amb autorització. `live` només s'activa al context `production`.
4. **Primera consulta real:** recepció confirmada i registres sense dades personals la primera setmana.

## Resultat de la configuració i redesplegament (22/10/2026)

- Desplegament de `revisio-client`: `6ada38f18834defee20d0d88`, amb les credencials de certificat configurades; sense --prod.
- Comprovacions locals: `test:contact` 58/58, `verify`, `check:links` i `check:i18n` correctes; sitemap de 33 URL.
- Comprovació en viu: Home i Contacte CA/ES/EN responen 200 amb noindex; avís de demostració conservat; GET /api/contacte respon 405.
- Autenticació amb Microsoft comprovada des de l’equip local amb el mateix codi `clientAssertion`; la configuració s’ha carregat en un nou desplegament de Netlify. No s’ha fet cap enviament real des de la funció ni es declara provat el lliurament.
- Pendents: confirmació de l’abast RBAC i prova real coordinada amb Jordi. Producció i DNS no modificats. Canvis de codi i documentació encara sense commit.

## Prova real autoritzada del 22/10/2026: aturada per error

Primera consulta HTTP 502 (Ref. FYWZEJ6428). Comprovació directa de Graph sense destinataris: autenticació correcta, però 403 ErrorAccessDenied. No es confirma lliurament i no es proven els adjunts. Previsualització restaurada a dry-run al desplegament 6ada3ad77f41cd1ff7000fb3 i desplegament temporal test eliminat. Detall i límits de la prova a [FASE8-prova-real-2026-10-22.md](FASE8-prova-real-2026-10-22.md). Cal revisió de l’administrador abans de repetir.

## Auditoria posterior del bloqueig (22/10/2026)

Diagnosi protegida des del runtime de Netlify amb el codi real: credencials coincidents, OAuth 200 i Graph 403 ErrorAccessDenied. Cal revisar RBAC i confirmar UPN/Object ID de la bústia amb l’administrador. No hi ha enviament a destinataris en aquesta diagnosi. Evidències i límits a [FASE8-auditoria-M365-2026-10-22.md](FASE8-auditoria-M365-2026-10-22.md).
