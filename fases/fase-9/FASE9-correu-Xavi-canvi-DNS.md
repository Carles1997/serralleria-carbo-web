# Correu preparat per a Xavi · canvi de DNS

Estat: esborrany, no enviat. Enviar quan el desplegament de producció superi les comprovacions.

A: xavi@maya.cat
Assumpte: Publicació de la nova web de Serralleria Carbó

Bona tarda Xavi,

Ja hem comprovat amb la Laura que el formulari funciona: rep els correus, pot obrir els adjunts i les respostes arriben al remitent correcte. Gràcies per la gestió.

La nova web està preparada a Netlify, amb www.serralleriacarbo.com com a domini principal. Per posar-la en línia, necessitem aquests canvis a la zona DNS actual:

- www: CNAME a serralleriacarbo.netlify.app.
- Domini arrel (@): A a 75.2.60.5. Si el vostre panell admet ALIAS/ANAME, es pot utilitzar apex-loadbalancer.netlify.com en lloc d’aquest A.

Cal conservar els servidors DNS actuals i tots els registres de correu de Microsoft 365 (MX, SPF, DKIM, DMARC i autodiscover).

Abans del canvi, ens pots confirmar que conserveu una còpia completa del WordPress i de la base de dades, i mantenir l’allotjament antic disponible per si cal tornar enrere?

Ens aniria bé fer el canvi avui. Digues-me quan el puguis aplicar i, tan bon punt estigui fet, comprovaré el certificat HTTPS, les redireccions i el formulari al domini definitiu.

Gràcies!
Carles
