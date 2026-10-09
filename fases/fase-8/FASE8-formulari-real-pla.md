# Fase 8 · Tasca 8.5 · Formulari real amb Microsoft 365

**Data:** 09/10/2026 (tercera versió del dia, amb les correccions de la revisió de Codex).

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
| **Netlify** | El 09/10/2026 els desplegaments de producció s'ometien per manca de crèdits, però el desplegament no productiu a `revisio-client` es va completar i el lloc responia: **no hi havia una pausa completa**. El saldo, el pla i el motiu del bloqueig estan pendents de confirmar al panell. La recàrrega automàtica és opcional |

## 2. Condicions del contracte

| Condició (`CLAUDE.md` i FASE8 8.5) | Estat |
|---|---|
| Backend real | Funció de Netlify implementada; no desplegada |
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

**Credencials:**
- **Certificat (recomanat):** `M365_CERT_THUMBPRINT` (empremta SHA-1 que mostra Entra) i `M365_PRIVATE_KEY_PEM` (clau privada **PKCS#8**, `BEGIN PRIVATE KEY`).
- **Alternativa:** `M365_CLIENT_SECRET`, amb una durada proposada de 12 mesos (el portal permet fins a 24).
- **Altres variables:**
  - `M365_TENANT_ID`;
  - `M365_CLIENT_ID`;
  - `FORM_MODE`, que continua sent `dry-run` fins a l'autorització;
  - `RL_SECRET`: valor aleatori **estable** d'almenys 32 caràcters, compartit per totes les instàncies. Obligatori en `test` i `live`. No és una credencial de Microsoft 365: el genera i l'introdueix a Netlify el propietari de l'equip.
- **Com s'introdueixen:** l'administrador les escriu **directament a Netlify**, mai per xat ni per correu.
- **Renovació:** un canvi de variable requereix un desplegament nou. Cada desplegament de producció costa 15 crèdits.

| Tasca | Responsable |
|---|---|
| Crear, renovar i revocar la credencial; mantenir l'àmbit d'Exchange | Administrador de Microsoft 365 (**persona pendent de designar**) |
| Introduir la credencial a Netlify | L'administrador, amb un accés que permeti editar variables d'entorn, o el propietari de l'equip de Netlify amb ell |
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

**Missatge a l'usuari quan s'accepta:** «La consulta s'ha enviat (ref. …). Et respondrem… Si no tens resposta, truca al 630 661 908 i indica la referència.»
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
| Error d'enviament | Missatge amb el correu i el WhatsApp |
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

**No comprovat a Netlify:**
- **Pujada en xarxa lenta:** el temps mesurat inclou les pauses de la prova i no és fiable.
- **«Run now» de la funció programada:** cal fer-ho des del panell; s'ha substituït per la neteja oportunista i la CLI.
- **Comptador compartit entre instàncies amb `RL_SECRET`:** requereix configurar la variable a Netlify, i aquest canvi no està autoritzat.

**Pendents (requereixen autorització):**

| Fase | Prova | Criteri |
|---|---|---|
| **5.2 bis** (opcional) | Configurar `RL_SECRET` (abast «Branch deploys») i repetir el límit horari amb diverses instàncies; pujada en xarxa lenta; «Run now» de `neteja-temporals` | Un sol comptador per IP i hora; la sisena consulta, `429` |
| ~~**5.2 `dry-run` a `revisio-client`**~~ **Fet el 09/10/2026 (§6.1)**, excepte els punts de 5.2 bis | Repetir les proves de navegador contra Netlify; adjunt d'exactament 3.000.000 bytes i de 3.000.001; petició de més de 6 MB sense JavaScript; `429` de la capa 1; pujada en xarxa lenta; adaptador de Blobs; «Run now» de la neteja i comprovació que el magatzem queda buit | Mateixos resultats que en local. Documentar què mostra Netlify amb més de 6 MB i amb el `429` de la capa 1 |
| **Comprovació de l'administrador** | `Test-ServicePrincipalAuthorization` amb `carbo@` i amb una altra bústia | `True` i `False` |
| **5.3 `test` a `revisio-client`** (correus «[PROVA]» a `carbo@`, amb autorització del director i del client) | 4 enviaments: Particulars i Industrial, en català i castellà. Un porta un adjunt d'**exactament 3.000.000 bytes** | A la safata d'entrada de `carbo@`, no a la brossa ni a la quarantena; traça del missatge per referència; Reply-To, accents, adjunt íntegre, consentiment, data i referència correctes; cap còpia a Enviats. Si Graph rebutja els 3.000.000 bytes, es baixa el límit i es repeteixen el màxim exacte, un byte per sota i un per sobre |
| **5.4 Resposta** | Respondre una consulta de prova amb «Respon» | La resposta va al correu del visitant de prova |
| **5.5 Producció** | `FORM_MODE=live`, un enviament real, i registres i rebots la primera setmana | Recepció confirmada; registres sense dades personals |

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
- **Neteja programada:** Netlify no l'executa en desplegaments no publicats. Funcionen la neteja oportunista i la del panell o la CLI (§6.1).
- **Regla de Netlify amb un POST:** pot tallar la connexió en lloc de respondre `429` (§6.1).
- **En `dry-run` sense `RL_SECRET`,** el límit horari és per instància (§6.1).
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
4. Certificat o secret? Quina durada? Qui la renova, qui la introdueix a Netlify i qui avisa per desplegar?
5. Pot revisar els inicis de sessió de l'aplicació i la traça de missatges si se sospita un ús anòmal? Qui revocaria la credencial?
6. Es pot aplicar una retenció a les consultes web de `carbo@` (termini pendent de l'advocat), o es farà manualment?
7. Pot activar el DKIM de Microsoft 365 quan el client autoritzi el canvi de DNS?

## 10. Missatge definitiu per a l'administrador de Microsoft 365

Versió definitiva del 09/10/2026, per enviar-la tal com és.

> **Assumpte:** Serralleria Carbó · Autorització d'enviament del formulari web des de carbo@serralleriacarbo.com
>
> Bon dia,
>
> El nou web de Serralleria Carbó té un formulari de contacte que enviarà cada consulta per correu amb Microsoft Graph. El remitent i el destinatari seran sempre `carbo@serralleriacarbo.com`, i el Reply-To serà el correu del visitant. El destinatari està fixat al codi del servidor: el formulari no el pot canviar.
>
> Us demanem que autoritzeu aquest enviament amb un permís **limitat exclusivament a la bústia carbo@**:
>
> **1. Aplicació a Microsoft Entra**
> - Registreu una aplicació, per exemple «Formulari web Serralleria Carbó», d'un sol inquilí.
> - **No hi concediu cap permís d'aplicació de Microsoft Graph amb consentiment de l'administrador** (ni `Mail.Send` ni cap altre). Els permisos d'Entra s'afegirien a l'àmbit d'Exchange i donarien accés a totes les bústies.
> - **Credencial:** preferiblement un certificat (a l'aplicació només s'hi carrega la part pública). Si no és possible, un secret de 12 mesos com a màxim.
>
> **2. Permís limitat a carbo@ (RBAC per a aplicacions d'Exchange Online, PowerShell)**
> ```powershell
> New-ServicePrincipal -AppId <Application (client) ID> -ObjectId <Object ID de l'aplicació a Enterprise applications> -DisplayName "Formulari web Serralleria Carbó"
> New-ManagementScope -Name "Formulari web - carbo" -RecipientRestrictionFilter "PrimarySmtpAddress -eq 'carbo@serralleriacarbo.com'"
> New-ManagementRoleAssignment -App <Object ID> -Role "Application Mail.Send" -CustomResourceScope "Formulari web - carbo"
> ```
> Fan falta el rol *Exchange Administrator* a Entra i la pertinença a *Organization Management* a Exchange Online. Els canvis poden trigar fins a 2 hores a aplicar-se.
>
> **3. Comprovació**
> ```powershell
> Test-ServicePrincipalAuthorization -Identity <Object ID> -Resource carbo@serralleriacarbo.com
> Test-ServicePrincipalAuthorization -Identity <Object ID> -Resource <una altra bústia>
> ```
> El primer ha de donar `InScope = True` i el segon, `False`. Envieu-nos només aquest resultat.
>
> **4. Credencials, directament a Netlify**
> Quan acordem el moment, introduïu-les **vosaltres mateixos** a les variables d'entorn del projecte de Netlify `serralleriacarbo`, marcades com a secretes i amb l'abast «Functions»:
> - `M365_TENANT_ID` i `M365_CLIENT_ID`;
> - amb certificat: `M365_CERT_THUMBPRINT` (empremta SHA-1 que mostra Entra) i `M365_PRIVATE_KEY_PEM` (clau privada en format PKCS#8, «BEGIN PRIVATE KEY»);
> - amb secret: `M365_CLIENT_SECRET`.
>
> **No ens envieu cap secret, contrasenya, clau privada ni certificat per correu, per xat ni per cap altre canal.** Si cal accés a Netlify, el propietari de l'equip us el facilitarà.
>
> **5. El que no cal fer**
> - No cal crear cap bústia nova.
> - No cal bloquejar els enviaments externs de carbo@: la bústia ha de continuar funcionant amb normalitat.
>
> **6. Ens podeu confirmar, si us plau:**
> 1. si carbo@ té alguna regla de flux de correu, quarantena, filtre o límit de mida que afecti un missatge que la bústia s'envia a si mateixa amb un adjunt de fins a 3 MB;
> 2. la data de caducitat de la credencial i qui la renovarà; i qui la revocaria en cas d'incidència (eliminant-la a Entra);
> 3. si podreu revisar els inicis de sessió de l'aplicació i la traça dels missatges de prova;
> 4. si es pot aplicar una retenció a les consultes web de carbo@ (el termini el fixarà l'assessor) o si es gestionarà manualment;
> 5. si podreu activar el DKIM de Microsoft 365 quan el client autoritzi el canvi de DNS.
>
> El formulari és ara en mode de demostració i **no envia cap correu**. Només s'activarà amb l'autorització del director. Les primeres proves arribaran a carbo@ amb «[PROVA]» a l'assumpte.
>
> Moltes gràcies.
