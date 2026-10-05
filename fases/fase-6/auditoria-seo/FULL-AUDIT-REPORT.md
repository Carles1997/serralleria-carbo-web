# Auditoria SEO · web nou (staging de Netlify) i web actual

Auditoria del 02/10/2026 amb la skill claude-seo v2.4.1, aplicada en mode de només lectura, i amb eines pròpies (rastreig, mesura de rendiment amb el Chromium de la skill). No s'ha corregit res.

- **Web nou:** `https://serralleriacarbo.netlify.app/`. És una còpia de proves no publicada: el `noindex` i el canonical cap a `https://www.serralleriacarbo.com/` són intencionats.
- **Web actual:** `https://www.serralleriacarbo.com/` (WordPress amb Yoast i Elementor). Serveix de línia base i de llista d'URL a redirigir.
- **Dades del Perfil d'Empresa:** [FASE6-dades-google-business-profile.md](../FASE6-dades-google-business-profile.md).
- **Dades en brut:** `netlify/raw/` i `web-actual/raw/` (rastreig, sitemaps, rendiment).

## Límits

- **PageSpeed Insights:** sense clau d'API, Google rebutja la consulta per quota. El rendiment s'ha mesurat amb Chromium sobre Netlify i el mateix perfil mòbil de la Fase 7 (dades de laboratori, no de camp). No hi ha dades CrUX perquè el domini nou no té trànsit.
- **No hi ha Search Console, Analytics, DataForSEO, Ahrefs ni Moz.** Per tant, no hi ha posicions, volums de cerca ni backlinks. Les ordres que en depenen (`/seo backlinks`, `/seo maps` amb graella, `/seo google`) no s'han executat.
- **Puntuació:** és una estimació amb els pesos de la skill. El web nou es puntua com si es publiqués tal com està, sense comptar el `noindex` de proves com a error.

## Resum executiu

**Puntuació estimada del web nou: 71/100.** El web actual no arriba al nivell mínim: no té cap H1 ni cap meta descripció, i declara l'idioma castellà en continguts en català.

**Tipus de negoci:** servei local (taller a Vilafranca del Penedès, amb atenció a domicili) amb dues branques, Particulars (B2C) i Industrial (B2B).

| Categoria | Pes | Nota | Comentari |
|---|---|---|---|
| SEO tècnic | 22 % | 70 | Base sòlida. Falten la indexació de llançament, la memòria cau, les capçaleres i les redireccions |
| Qualitat del contingut | 23 % | 65 | Contingut real i local, però curt. Falten castellà i anglès |
| SEO a la pàgina | 20 % | 78 | Títols i descripcions únics, un H1. Falten l'Open Graph i la marca als títols d'Industrial |
| Dades estructurades | 10 % | 55 | `LocalBusiness` correcte però incomplet. Sense molles de pa ni serveis |
| Rendiment | 10 % | 92 | LCP ≤ 1,8 s en mòbil lent i CLS 0 |
| Preparació per a cerca amb IA | 10 % | 65 | Fets clars, però hi ha variants del nom i dades incoherents entre fonts |
| Imatges | 5 % | 75 | AVIF amb mides declarades. Molt `alt` buit en fotos de feina |

### 5 problemes crítics o d'impacte alt

1. **8 de les 10 pàgines porten `noindex`** perquè el seu contingut encara és `status: draft`. Només `/empresa/` i `/particulars/projectes/` són indexables, i el sitemap només en conté 2. Si es publica així, el domini perdria la indexació de la Home i dels serveis. Cal aprovar els continguts abans del llançament.
2. **Les redireccions no estan desplegades.** El mapa de [FASE5-redireccions.md](../../fase-5/FASE5-redireccions.md) cobreix les 15 URL del sitemap actual, però el fitxer `_redirects` encara no existeix. `/estructuras/` i `/motores/` (antigues landings en castellà) no tenen destí fins que hi hagi la versió en castellà.
3. **No hi ha metadades Open Graph ni de targeta social a cap pàgina.** Quan algú comparteix un enllaç per WhatsApp (un canal principal del negoci), surt sense imatge ni descripció controlada.
4. **Les dades estructurades no tenen horari, coordenades, logotip ni `sameAs`.** L'horari ja està verificat: el web i el Perfil d'Empresa coincideixen (dilluns a divendres, de 8 a 13 h i de 15 a 18 h). Era la condició que `StructuredData.astro` posava per incloure'l.
5. **El telèfon principal no coincideix entre fonts.** El web i l'schema usen el mòbil 630 661 908, mentre que el Perfil d'Empresa i els directoris usen el fix 93 890 27 94. A més, el nom apareix en cinc variants a internet.

### 5 millores ràpides

1. Afegir `og:title`, `og:description`, `og:image` i `twitter:card` a `BaseLayout.astro`, amb una imatge per branca.
2. Completar `LocalBusiness` amb `openingHoursSpecification`, `geo`, `image`/`logo`, `hasMap` i `sameAs` (fitxa de Google Maps).
3. Afegir `BreadcrumbList` a les pàgines que ja mostren molles de pa.
4. Configurar al `_headers` de Netlify una memòria cau d'un any i `immutable` per a `/_astro/*`, i les capçaleres de seguretat que hi falten.
5. Que les pàgines d'Industrial acabin amb «Serralleria Carbó», per coherència de marca als resultats; ara acaben amb «| Industrial». És una decisió de contingut.

## SEO tècnic (70)

**Funciona bé:**
- HTTPS amb HSTS preload. Compressió Brotli del document, el CSS i el JS.
- `robots.txt` correcte i URLs netes amb barra final.
- La 404 respon 404 i porta `noindex`.
- Canonical a totes les pàgines. Les variants amb paràmetres (`/contacte/?tipus=…`, `/particulars/projectes/?servei=…`) apunten a la URL neta.
- `lang="ca"` a totes les pàgines. El JavaScript és mínim.

| Troballa | Gravetat | Evidència | Recomanació |
|---|---|---|---|
| `noindex` a 8 de 10 pàgines | Crítica (al llançament) | `content/ca/*.md` amb `status: draft`: home, particulars, estructures, automatismes, urgencies, industrial, capacitats, contacte | Aprovar els continguts o decidir quines pàgines surten indexables el primer dia. Comprovar-ho al `sitemap.xml` abans de publicar |
| Sitemap amb 2 URL | Alta | `netlify.app/sitemap.xml` només conté `/empresa/` i `/particulars/projectes/` | Es resol amb el punt anterior; el sitemap ja filtra bé |
| Redireccions no desplegades | Alta | 15 URL al sitemap de Yoast, sense `_redirects` al repositori | Generar `_redirects` des del mapa de la Fase 5, amb 301 i 410. Decidir `/estructuras/` i `/motores/` (vegeu les opcions de la Fase 5) |
| Fitxers amb empremta sense memòria cau | Mitjana | `/_astro/*.css` i `.avif` amb `Cache-Control: public,max-age=0,must-revalidate` | `_headers`: `/_astro/*` amb `Cache-Control: public, max-age=31536000, immutable` |
| Falten capçaleres de seguretat | Mitjana | Només hi ha HSTS. No hi ha CSP, `X-Content-Type-Options`, `Referrer-Policy` ni `Permissions-Policy` | Afegir-les a `_headers`. Ja era un pendent de Netlify |
| Pàgines legals en 404 a Netlify | Mitjana | `/legal/avis-legal/`, `/legal/privacitat/` i `/legal/cookies/` responen 404, però existeixen al repositori (fusionades a `main`) | Comprovar quina branca o quin desplegament serveix Netlify i tornar a desplegar |
| Sense versions en castellà ni anglès | Mitjana | Només existeix `content/ca/`; `/es/` i `/en/` responen 404; no hi ha `hreflang` | Previst al contracte i18n. Prioritzar el castellà (cerques de «herrero», «ferretería», «vigas acero» i les landings antigues en castellà) |

## Qualitat del contingut (65)

**Funciona bé:**
- Experiència i dades reals: fundada el 1989, taller de 950 m², 12 persones, materials i processos concrets a Industrial, cinc projectes reals.
- Ancoratge local constant: «Vilafranca del Penedès» al títol o la descripció de cada pàgina.
- Dos camins clars, Particulars i Industrial, i camins de contacte segmentats.

| Troballa | Gravetat | Evidència | Recomanació |
|---|---|---|---|
| Pàgines curtes | Mitjana | Paraules al `main`: urgències 176, automatismes 207, estructures 246, home 261, capacitats 262, projectes 269 | Ampliar només amb dades validades pel client: tipus de portes i motors que s'instal·len, zones on es treballa, preguntes freqüents reals, procés de pressupost. No inventar dades |
| No hi ha veu de clients al web | Mitjana | 41 ressenyes de 4 o 5 estrelles al Perfil d'Empresa, cap al web | Si el client hi està d'acord, citar ressenyes reals amb permís i enllaçar a la fitxa. No marcar valoracions pròpies amb schema |
| Mobiliari ajornat | Info | `/particulars/mobiliari/` és un 404 i el menú porta al formulari | Correcte segons la decisió del director |
| Cerques de «ferreteria» | Info | El 74 % de les cerques que mostren el perfil són «ferreteria» | No és un problema del web. Depèn de la confirmació del client (vegeu l'informe del Perfil d'Empresa) |

## SEO a la pàgina (78)

**Funciona bé:**
- Títols (43–62 caràcters) i descripcions (123–151) únics, amb servei i lloc.
- Un sol H1 per pàgina, jerarquia sense salts i molles de pa visibles.

| Troballa | Gravetat | Evidència | Recomanació |
|---|---|---|---|
| Sense Open Graph ni targeta social | Alta | No hi ha cap `og:*` a les 10 pàgines | Afegir-los al layout amb les dades que ja hi ha a `seoTitle` i `seoDescription`, i una imatge per branca |
| Marca absent als títols d'Industrial | Baixa | «Fabricació metàl·lica per a tercers \| Industrial»; «Capacitats de soldadura i fabricació \| Industrial» | Proposta: «… \| Serralleria Carbó». Decisió del director |
| H1 d'Industrial sense terme de cerca | Baixa | H1 = «Sèries curtes. Peces exigents. Resposta industrial.» | És el missatge validat i es conserva. El terme ja és al títol i a la descripció. Es podria reforçar al primer paràgraf o a l'H2 |
| Títol de `/particulars/` de 62 caràcters | Baixa | Ja anotat a la Fase 7 | Decisió del director |
| `/empresa/` poc enllaçada | Baixa | Només 2 pàgines hi enllacen | Enllaçar-la des de la Home i de la secció «Qui som» de contacte, si escau |

## Dades estructurades (55)

**Funciona bé:** `LocalBusiness` vàlid a la Home, Empresa i Contacte, amb nom, raó social, adreça, telèfons, correu, data de fundació i plantilla. Les dades coincideixen amb `src/config/site.ts` i no inclouen valoracions pròpies.

| Troballa | Gravetat | Recomanació |
|---|---|---|
| Sense horari | Alta | `openingHoursSpecification`: dilluns a divendres, de 08:00 a 13:00 i de 15:00 a 18:00. Verificat amb el Perfil d'Empresa el 02/10/2026 |
| Sense `geo` ni `hasMap` | Mitjana | Coordenades 41.3424819, 1.6916747 (fitxa de Google) i URL de la fitxa de Maps |
| Sense `image` ni `logo` | Mitjana | Google les recomana per a `LocalBusiness` |
| Sense `sameAs` | Mitjana | Fitxa de Google Maps. La pàgina de Facebook (2 «m'agrada») només si es manté activa |
| Tipus genèric | Baixa | Es pot mantenir `LocalBusiness`. No fer servir `Locksmith`: és enganyós per a una serralleria metàl·lica |
| Sense `BreadcrumbList` | Mitjana | A les pàgines amb molles de pa |
| Sense `Service` | Baixa | Opcional: un `Service` per pàgina de servei, amb `areaServed` només quan la zona estigui validada |

## Rendiment (92)

Mesura de laboratori a Netlify, amb memòria cau desactivada, mòbil 390 px a 2×, CPU 4 vegades més lenta i 4G lenta:

| Ruta | LCP mòbil | LCP escriptori | CLS | Pes mòbil |
|---|---|---|---|---|
| `/` | 1,2 s* | 1,37 s | 0 | 230 KB |
| `/particulars/` | 1,01 s | 0,52 s | 0 | 174 KB |
| `/particulars/estructures/` | 0,94 s | 0,80 s | 0 | 286 KB |
| `/particulars/automatismes/` | 1,14 s | 0,86 s | 0 | 249 KB |
| `/particulars/urgencies/` | 1,05 s | 0,82 s | 0 | 117 KB |
| `/particulars/projectes/` | 1,77 s | 0,88 s | 0 | 294 KB |
| `/industrial/` | 1,33 s | 0,71 s | 0 | 201 KB |
| `/industrial/capacitats/` | 0,93 s | 0,79 s | 0 | 272 KB |
| `/empresa/` | 1,32 s | 1,03 s | 0,001 | 231 KB |
| `/contacte/` | 1,15 s | 1,28 s | 0 | 100 KB |

\* La primera mesura de la Home va donar 4,34 s, amb un temps fins al primer byte de 3,1 s per l'arrencada en fred de la xarxa de Netlify. Amb les repeticions, el primer byte baixa a 0,13–0,46 s.

Totes les rutes compleixen els llindars de Google (LCP ≤ 2,5 s, CLS ≤ 0,1). El pes mòbil ha baixat entre un 28 % i un 62 % respecte de la mesura local de la Fase 7 gràcies a la compressió Brotli de Netlify. L'única millora pendent és la memòria cau dels fitxers amb empremta, que ajuda en les visites repetides.

## Imatges (75)

- **Funciona bé:** AVIF amb WebP i JPG de reserva, `srcset`, amplada i alçada declarades, càrrega diferida fora de la primera pantalla.
- **`alt` buit a la majoria d'imatges:** Home 8 de 8, Particulars 8 de 8, Industrial 11 de 12, Capacitats 8 de 8, Estructures 4 de 4, Automatismes 4 de 4. Té sentit per a les imatges decoratives o conceptuals, que no s'han de presentar com a obra real. **Recomanació:** quan hi hagi les fotografies definitives d'obra real, donar-los un `alt` descriptiu (què és i on és), com ja passa a Projectes (5 de 6).

## Preparació per a cerca amb IA (65)

- **Funciona bé:** el `robots.txt` no bloqueja cap rastrejador d'IA. Els fets són concrets i fàcils de citar: any de fundació, superfície del taller, materials, processos. Entitat única amb `@id`.
- **Coherència de l'entitat:**
  - Nom: «Serralleria Carbó», «Serralleria Carbo», «Serralleries Carbó» (meta del web actual), «Serrallería Carbo, S.L.» (QDQ) i «SERRALLERIA CARBO SL».
  - Adreça: «59», «59 - 61» (eInforma) o sense número (QDQ).
  - Telèfon: mòbil al web i fix al Perfil d'Empresa.
  Cal unificar-ho, perquè els motors d'IA i Google ho creuen.
- **`llms.txt`:** és opcional i Google l'ignora. No és prioritari.

## SEO local (en combinació amb el Perfil d'Empresa)

| Senyal | Estat | Recomanació |
|---|---|---|
| Fitxa verificada | Sí | — |
| Categories | Principal «Carpintería metálica y de aluminio»; secundàries sense serralleria, portes ni automatismes; «Proveedor de metales» probablement atrau les cerques de «ferreteria» | Revisar-les amb el client |
| Descripció | Una frase | Ampliar-la amb el missatge validat de les dues branques |
| Lloc web | `http://serralleriacarbo.com/` | Al llançament: `https://www.serralleriacarbo.com/` amb UTM |
| Ressenyes | 3,8 de mitjana, 0 respostes, 3 en 12 mesos | Respondre-les i demanar-ne de noves |
| Fotos | 8 i el logotip, sense portada ni exterior | Afegir fotos reals del taller i de l'exterior |
| Serveis, productes, publicacions, atributs | Buits | Completar-los amb dades validades |
| Coherència del nom, l'adreça i el telèfon | Desigual als directoris | Unificar-los |
| Competència visible al perfil | Cerrajería Masip 4,9 (125), Metálicas Urbano 4,6 (54), Ferros Pujadó 4,0 (19) | Referència de reputació |

## Web actual (línia base, WordPress)

| Ruta | Títol | Descripció | H1 | Paraules |
|---|---|---|---|---|
| `/` | «HOME - Serralleria Carbó» | Cap | Cap | 190 |
| `/projectes/` | «PROJECTES - Serralleria Carbó» | Cap | Cap | 253 |
| `/pressupost/` | «PRESSUPOST - Serralleria Carbó» | Cap | Cap | 69 |
| `/contacte/` | «CONTACTE - Serralleria Carbó» | Cap | Cap | 181 |
| `/legal/` | «Legal - Serralleria Carbó» | Cap | Cap | 296 |

A més:
- Totes les pàgines declaren `lang="es"` amb text en català.
- El sitemap de Yoast publica pàgines de prova (`/hello-world/`, `/sample-page/`), plantilles d'Elementor i l'arxiu d'autor.
- `serralleriacarbo.com` i `http://` redirigeixen bé cap a `https://www.` amb un 301, però tarden de 4 a 6 s.

**Conclusió:** el web nou és una millora clara en tots els aspectes. El risc no és perdre posicions per qualitat, sinó per la migració: indexació, redireccions i Search Console.

## Pendents per completar l'auditoria

- Clau d'API de Google (gratuïta) per a PageSpeed Insights i CrUX quan el domini tingui trànsit.
- Search Console del domini, per a l'històric de consultes de fins a 16 mesos i per inspeccionar URL al llançament.
- Opcional: DataForSEO, Moz o Ahrefs, per a volums de paraules clau, rànquing local en graella i backlinks.
