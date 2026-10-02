# Pla d'acció SEO

Ordenat per prioritat. Prové de [FULL-AUDIT-REPORT.md](FULL-AUDIT-REPORT.md) i de les [dades del Perfil d'Empresa](../FASE6-dades-google-business-profile.md). Cap acció s'ha aplicat. Les que toquen continguts o dades validades necessiten l'aprovació del director o del client.

## Crític: abans de publicar

| # | Acció | Qui | On |
|---|---|---|---|
| 1 | Aprovar els continguts que han de sortir indexables (avui només ho són `/empresa/` i `/particulars/projectes/`) i comprovar que el `sitemap.xml` els inclou | Director | `content/ca/*.md` (`status`) |
| 2 | Crear `_redirects` amb les 301 i 410 del mapa de la Fase 5. Decidir `/estructuras/` i `/motores/` | Desenvolupament i director | `public/_redirects` |
| 3 | Verificar Search Console del domini (DNS a mayasystems.net) abans del canvi, per conservar l'històric i seguir la migració | Client | Search Console |
| 4 | Comprovar quin desplegament serveix Netlify: les pàgines legals fusionades a `main` hi responen 404 | Desenvolupament | Netlify |

## Alt: primera setmana

| # | Acció | Qui |
|---|---|---|
| 5 | Open Graph i targeta social al layout, amb una imatge per branca | Desenvolupament (aprovar les imatges) |
| 6 | Completar `LocalBusiness`: horari verificat, `geo`, `hasMap`, `image`/`logo`, `sameAs` | Desenvolupament |
| 7 | Decidir el telèfon principal (mòbil o fix) i unificar-lo al web, a l'schema i al Perfil d'Empresa | Client |
| 8 | Perfil d'Empresa: lloc web amb https i UTM, revisar categories (afegir serralleria, portes o automatismes; revisar «Proveedor de metales»), ampliar la descripció | Client, amb la proposta de textos del director |
| 9 | Respondre les 58 ressenyes, començant per les negatives recents | Client |

## Mitjà: primer mes

| # | Acció | Qui |
|---|---|---|
| 10 | `_headers` amb memòria cau `immutable` per a `/_astro/*` i capçaleres de seguretat | Desenvolupament |
| 11 | `BreadcrumbList` a les pàgines amb molles de pa | Desenvolupament |
| 12 | Versió en castellà, començant per Particulars i les landings antigues | Director (traducció) i desenvolupament |
| 13 | Ampliar les pàgines curtes (urgències, automatismes, estructures) amb dades reals del client: tipus de portes i motors, zona de servei, procés i preguntes freqüents | Client i director |
| 14 | Pla de ressenyes: enllaç «Pedir una reseña» després de cada feina acabada | Client |
| 15 | Fotos reals del taller, de l'exterior i d'obra al web (amb `alt` descriptiu) i al Perfil d'Empresa | Client |
| 16 | Unificar el nom, l'adreça i el telèfon a QDQ, eInforma, Empresite, Comga i DatosCif | Client |

## Baix: quan hi hagi temps

| # | Acció | Qui |
|---|---|---|
| 17 | Marca «Serralleria Carbó» als títols d'Industrial | Director |
| 18 | Més enllaços interns cap a `/empresa/` | Desenvolupament |
| 19 | Schema `Service` per pàgina de servei | Desenvolupament |
| 20 | Clau d'API de Google per a PageSpeed i CrUX, i un tall mensual de les mètriques del Perfil d'Empresa | Director |
