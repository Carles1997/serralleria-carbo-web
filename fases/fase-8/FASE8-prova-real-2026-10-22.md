# Prova real del formulari · 22/10/2026

## Autorització i abast

El director autoritza fer la prova real mentre espera la resposta de l’administrador sobre l’abast RBAC. Només la previsualització `revisio-client`; remitent i destinatari fixats a carbo@serralleriacarbo.com, amb prefix [PROVA]. La limitació dels permisos sobre altres bústies continua sense confirmar.

## Resultat observat

- `FORM_MODE=test` exclusiu de revisio-client; desplegament temporal `6ada3ab4b88b0418428cec38`.
- Primera consulta: Particulars CA, sense adjunt, referència **FYWZEJ6428**, 22/10/2026 16:33:03 UTC (18:33:03 Barcelona).
- La funció respon **HTTP 502, state=failed**. Request ID Netlify: `01M5J7AY8GXS194237CBB9FH6N`.
- S’atura la seqüència: no s’envien les proves del JPG de 3.000.000 bytes, PDF ni anglès. No es repeteix la consulta fallida.
- Els logs històrics de Netlify mostren l’entrada i el request ID, però el camp message continua buit. No s’atribueix un codi intern a la funció a partir d’aquest registre.

## Diagnòstic addicional sense lliurament

S’obté un token de Microsoft amb el mateix certificat i els mateixos identificadors: autenticació correcta. Una petició a Graph sendMail sobre carbo@ **sense cap destinatari**, no apta per lliurar correus, respon **HTTP 403, ErrorAccessDenied**, missatge «Access is denied. Check credentials and try again.».

Request ID Microsoft: `637108fe-d8b8-448d-a60c-a8e2d61510cd`.

Aquesta resposta evidencia un rebuig d’autorització a Graph. És compatible amb el problema observat al formulari, però el log buit de Netlify impedeix assegurar que el seu 502 tingui exactament aquest mateix codi intern. Cal que l’administrador revisi Application Mail.Send i l’abast RBAC sobre la bústia. No s’han ampliat permisos ni s’ha fet servir el secret de client. No es declara cap correu lliurat.

## Restauració comprovada

- FORM_MODE torna a **dry-run** a revisio-client.
- Desplegament de retorn: `6ada3ad77f41cd1ff7000fb3`.
- El desplegament temporal que permetia enviar en test s’ha eliminat després de restaurar l’àlies, evitant mantenir activa aquella URL immutable.
- Consulta de comprovació: HTTP 200, state=dry-run, referència **EMMHJV5TXQ**, X-Robots-Tag=noindex. Cap correu en aquesta comprovació.
- Els registres temporals de les consultes segueixen la política de caducitat existent; no s’ha buidat el magatzem ni s’han eliminat claus d’altres consultes.
- Producció, DNS i permisos de Microsoft no modificats. Les credencials es mantenen secretes i restringides a revisio-client.

## Pendent

1. Administrador: revisar el rebuig ErrorAccessDenied i confirmar l’autorització limitada a carbo@, aportant Test-ServicePrincipalAuthorization sobre carbo@ i una altra bústia.
2. Després de la correcció: repetir la prova real controlada, inclosos els adjunts, i confirmar recepció, obertura i Reply-To amb el client.

Les peticions d’aquesta sessió s’han fet per HTTP al backend real. No constitueixen una nova prova de navegació, d’emplenament amb JavaScript o de clics al navegador. La prova d’adjunts i el lliurament continuen pendents. No s’ha afegit cap dependència per fer aquesta comprovació.
