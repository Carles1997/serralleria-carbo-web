# Auditoria de la integració Microsoft 365 · 22/10/2026

## Objectiu i conclusió

El director demana comprovar la implementació abans de contactar de nou amb l’administrador. S’ha revisat el codi i s’ha fet una diagnosi dins del runtime real de Netlify, amb la mateixa funció `sendMail` i les credencials desplegades.

**Resultat:** autenticació de certificat correcta a Netlify (HTTP 200) i rebuig de Graph sobre sendMail de carbo@ (HTTP 403, ErrorAccessDenied). No s’ha detectat un error de format de petició o càrrega de credencials que expliqui aquest bloqueig. Cal una comprovació administrativa de l’autorització i de la identitat exacta de la bústia. No es declara la integració completament validada ni es garanteix el lliurament.

## Comprovacions del nostre abast

| Comprovació | Evidència |
| --- | --- |
| Tenant i aplicació | Coincideixen a les variables del runtime i a les claims del token amb els identificadors lliurats per l’administrador |
| Certificat | Empremta esperada; la clau privada carregada a Netlify és idèntica a l’original local (comparació SHA-256; només es retorna el booleà) |
| Mètode d’autenticació | Certificat seleccionat; no hi ha M365_CLIENT_SECRET configurat |
| OAuth real a Netlify | HTTP 200, token destinat a https://graph.microsoft.com, aplicació sense usuari delegat |
| API d’enviament | POST https://graph.microsoft.com/v1.0/users/carbo%40serralleriacarbo.com/sendMail, Authorization Bearer i Content-Type application/json |
| Format del missatge | message, body, toRecipients, replyTo, attachments i saveToSentItems:false, d’acord amb el contracte Graph; remitent implícit en la bústia de la ruta |
| Gestió del rebuig | El codi real retorna forbidden/status 403/attempts 1; no reintenta aquest error |
| Variables de Netlify | Quatre secrets M365, limitats a branch:revisio-client; abastos builds/functions/runtime; sense variables M365 globals o de producció |
| Exposició pública | Cap marcador de clau privada ni contingut de la clau als fitxers públics de dist |
| Proves prèvies vigents | 58 proves unitàries, verify, check:links i check:i18n superats abans de la prova real; no hi ha canvis en el transport d’enviament des d’aquella execució |

## Diagnosi real dins de Netlify

Funció temporal amb ruta aleatòria, protegida per una capçalera secreta aleatòria, només POST i resposta no-store/noindex. La clau de diagnosi no es publica a la web ni als informes. Utilitza readGraphConfig i sendMail del projecte. Impedeix enviar una petició amb destinataris, CC o BCC; la petició a Graph no té destinataris i no pot lliurar cap correu.

- Desplegament d’auditoria: 6ada3d003cb39133a03dbf75.
- FORM_MODE es manté dry-run al formulari normal.
- OAuth: 200.
- Token: tenant i client correctes; audience https://graph.microsoft.com; sense scopes delegats; roles buit. Un token sense roles no descarta RBAC d’Exchange: aquest mecanisme s’avalua separadament.
- Graph: 403 ErrorAccessDenied.
- Request ID Microsoft: 5f61d529-0a60-4d68-9d7f-9ce8c19bbd56.
- Retorn del codi real: ok=false, code=forbidden, status=403, attempts=1.

Aquesta prova confirma el rebuig des de Netlify, independentment dels logs buits de la primera consulta. No prova per si sola que el 502 anterior tingués exactament aquest mateix codi intern, però reprodueix un bloqueig real amb la configuració desplegada.

## Què només pot confirmar l’administrador

1. L’assignació Application Mail.Send a l’Enterprise Application correcta i el resultat de Test-ServicePrincipalAuthorization sobre carbo@ i una bústia fora de l’abast.
2. Que carbo@serralleriacarbo.com és el userPrincipalName de la bústia a Graph, o facilitar-ne l’Object ID si és una adreça SMTP/àlies diferent. La ruta Graph admet Object ID o UPN; no es pot comprovar aquesta identitat amb els permisos d’enviament rebuts.
3. Si la configuració s’ha canviat recentment, quan s’ha aplicat: Microsoft documenta memòria cau de permisos entre 30 minuts i 2 hores. No s’atribueix la causa a propagació sense aquesta dada.

No s’han sol·licitat permisos globals ni accessos de lectura addicionals per investigar. No s’ha utilitzat el secret de client compartit per correu.

## Fonts contrastades

- Microsoft Graph sendMail: https://learn.microsoft.com/en-us/graph/api/user-sendmail?view=graph-rest-1.0
- Exchange Application RBAC: https://learn.microsoft.com/en-us/exchange/permissions-exo/application-rbac

## Límits

Encara no s’ha validat l’enviament d’un missatge complet amb autorització efectiva, el límit d’adjunts contra Microsoft, la recepció, la quarantena ni el Reply-To en una resposta real. Aquests passos es reprenen quan el rebuig estigui resolt. L’auditoria no és una garantia d’absència de qualsevol defecte futur.

## Tancament de l’auditoria

Funcions normals restaurades al desplegament 6ada3d654064a673f45c3210. Desplegament de diagnosi eliminat, endpoint temporal inactiu i fitxers temporals retirats. Mode dry-run i noindex conservats. Cap canvi a producció, DNS o permisos de Microsoft.
