# Aprovació editorial de les pàgines · 20/10/2026

El director ha autoritzat aprovar les pàgines de contingut pendents després de la revisió de l’estat actual. Es registra l’aprovació de les versions existents en català, castellà i anglès, sense modificar textos, imatges, metadades SEO ni disseny.

## Abast

Nou pàgines per idioma: Home, Particulars, Estructures, Automatismes, Reparacions, Projectes de Particulars, Industrial, Capacitats i Contacte. Totes passen a `status: approved` (Projectes CA ja ho estava).

- **Contacte:** aprovació editorial amb `noindex: true` explícit als tres idiomes. Quan Microsoft 365 estigui configurat i l’enviament real comprovat, es podrà retirar aquest bloqueig en la tasca d’activació del formulari. L’avís de demostració continua.
- **Automatismes:** es tanca `reviewNeeded` de les marques perquè el contingut aprovat no en publica noms ni logotips. No s’autoritza afegir marques sense confirmació posterior.
- **Legals ES/EN:** conserven `draft-review` i la revisió jurídica pendent. Els legals CA no canvien.
- **404, rutes ajornades i fitxes internes de projectes:** fora de l’abast d’aquesta aprovació de pàgines; conserven els seus estats.

## Protecció i comprovacions

La capçalera global `X-Robots-Tag: noindex` continua en builds locals i previsualitzacions. No s’ha desplegat, canviat el DNS ni activat Microsoft 365.

S’esperen 27 URL al sitemap: 24 pàgines comercials (8 per idioma) i 3 legals CA. Contacte queda fora. Les 24 pàgines comercials aprovades poden declarar alternatives CA/ES/EN.

Els camps modificats (`status`, `noindex`, `reviewNeeded`) ja estan permesos a `APPROVAL_KEYS` de `check-references.mjs`; no cal canviar empremtes, excepcions ni la línia base.

## Resultat verificat

`verify`, `check:links`, `check:i18n` i `check:redirects` correctes. Sitemap: 27 URL; 24 pàgines amb hreflang. Capçalera global noindex conservada; Contacte conserva noindex en els tres idiomes. Cossos dels 26 fitxers modificats intactes. Persisteix l’avís preexistent del build sobre style-src/style-src-attr de la CSP. Sense commit, push ni desplegament en aquesta tasca.

## Aprovació posterior dels textos legals ES/EN (20/10/2026)

El director confirma expressament els documents legals en castellà i anglès. S’aproven vuit fitxers: avís legal, privacitat, cookies i informació de protecció de dades del formulari en cada idioma. Els textos no es reescriuen; s’actualitzen l’estat i l’anotació de procedència per reflectir aquesta decisió. És una aprovació del director, sense atribuir una nova revisió a l’advocat.

Aquesta decisió substitueix el pendent ES/EN dels apartats anteriors: les sis pàgines legals traduïdes s’incorporen al sitemap i als hreflang; els dos textos del formulari no tenen ruta pròpia. Resultat esperat: 33 URL al sitemap i 33 pàgines amb alternatives d’idioma. Contacte manté el noindex fins a la prova real i la previsualització manté el noindex global.

**Comprovació posterior:** verify, check:links i check:i18n correctes; 33 URL al sitemap i 33 pàgines amb hreflang. Cossos legals intactes; sis pàgines legals ES/EN sense meta noindex individual. Es conserva la capçalera global noindex de la previsualització. Sense commit, push ni desplegament.
