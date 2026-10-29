# Prova real amb la nova aplicació Microsoft 365 · 29/10/2026

## Configuració i abast

L’administrador comunica la creació d’una aplicació empresarial nova amb RBAC operatiu. S’utilitza el mateix tenant i el mateix certificat. Nou Client ID: `f915260d-6409-4a77-ac5c-7468a3b61e23`. Autenticació comprovada amb el certificat existent: HTTP 200, tenant i aplicació correctes, audience Graph i sense rols globals declarats. Això no prova per si sol l’exclusió d’altres bústies del scope RBAC.

M365_CLIENT_ID actualitzat com a secret només de branch:revisio-client. Producció i DNS no modificats. La prova real estava autoritzada pel director en aquesta conversa.

## Enviaments acceptats

Les quatre peticions al backend real de Netlify responen HTTP 200 i la funció d’enviament confirma acceptació de Microsoft Graph. Remitent/destinatari fixos: carbo@serralleriacarbo.com; assumpte amb [PROVA].

| Cas | Referència | Hora UTC | Adjunt (bytes) | Estat |
| --- | --- | --- | --- | --- |
| CA Particulars sense adjunt | 4QJEZNPGVW | 2026-10-29T15:10:40.368517+00:00 | 0 | Rebut i respost per Laura |
| ES Industrial JPG maxim | W92Z8V6BZF | 2026-10-29T15:11:07.985607+00:00 | 3000000 | Rebut i respost per Laura |
| CA Industrial PDF resposta HTML | 984TX4VHD2 | 2026-10-29T15:11:38.038811+00:00 | 614 | Rebut i respost per Laura |
| EN Particulars sense adjunt | 5TDCB3QYBH | 2026-10-29T15:12:04.211651+00:00 | 0 | Rebut i respost per Laura |

El JPG és una imatge JPEG vàlida del build amb dades de farciment després del final per arribar exactament a 3.000.000 bytes. El PDF és un document de prova de 614 bytes. La resposta HTML s’ha sol·licitat amb Accept:text/html; no s’ha repetit la prova interactiva de navegador amb JavaScript o sense JavaScript.

## Restauració

Desplegament test: `6ae361d7051967d38a463296`. Desplegament de retorn a demostració: `6ae3625189baba65fd94e32c`. FORM_MODE torna a dry-run i el desplegament temporal amb enviament real s’ha eliminat per retirar-ne també la URL immutable. Comprovació posterior del formulari: HTTP 200/state=dry-run i capçalera noindex.

Les referències i comptadors temporals segueixen la política de caducitat existent; no s’han esborrat registres d’altres consultes.

## Confirmació del client (29/10/2026)

El director aporta les quatre respostes de Laura, des de carbo@serralleriacarbo.com al correu de prova del director. Aquesta és evidència humana de recepció efectiva i de funcionament del Reply-To; no és només acceptació de Graph.

- 4QJEZNPGVW (CA Particulars): «Rebut, gràcies», resposta de les 16:16.
- 5TDCB3QYBH (EN Particulars): «Rebut, gràcies», resposta de les 16:16.
- 984TX4VHD2 (CA Industrial): confirma el correu i el PDF adjunt, resposta de les 16:17.
- W92Z8V6BZF (ES Industrial): confirma el correu i la fotografia adjunta, resposta de les 16:18.

Les quatre respostes van dirigides a carlesserramaza@gmail.com, l’adreça del visitant de prova. Queden acreditats enviament, recepció i circuit de resposta per a les quatre consultes, i recepció dels dos adjunts. El director confirma posteriorment que Laura ha pogut obrir correctament tant el PDF com la fotografia JPG de 3.000.000 bytes. La prova funcional de la integració a la previsualització queda completada: enviament, recepció, obertura dels adjunts i resposta al visitant.

No es desen aquí el cos complet dels correus, la signatura ni les dades personals addicionals. La traça administrativa Delivered és una comprovació complementària encara no aportada; la recepció ja queda acreditada per les respostes del client.

## Pendent per tancar

1. Confirmació administrativa de l’abast RBAC limitat a carbo@ (la prova no intenta accedir a altres bústies).
2. Preparació del llançament: configurar producció amb autorització, retirar l’avís de demostració i el noindex individual de Contacte després de completar les validacions, i fer la comprovació final al domini real.

La previsualització continua en dry-run. El rebuig 403 anterior no s’ha reproduït amb la nova aplicació. No ha calgut modificar el transport d’enviament.
