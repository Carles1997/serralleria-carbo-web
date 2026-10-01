# Fase 5 · URL per idioma

**Actualitzat:** 28/09/2026 · **Estat:** convenció decidida; slugs proposats, pendents de validació.

## Decisió del director (28/09/2026)

- **Català:** sense prefix, amb les rutes del sitemap de Fase 1 tal com són.
- **Castellà i anglès:** prefix d'idioma (`/es/`, `/en/`) i slugs traduïts.
- Es manté el sitemap lògic de Fase 1: la mateixa jerarquia i una pàgina per ruta i idioma. Cada versió té títol, descripció i contingut propis i `hreflang` recíproc. Cap traducció es canonitza cap al català (SEO-F3, contracte 1).

## Proposta de slugs (per validar)

Criteris:

- Els slugs parteixen de l'expressió principal de SEO-F3 en cada idioma.
- Van en minúscules, sense accents i amb guionets.
- La branca Industrial es diu igual en els tres idiomes.

| Català (actual) | Castellà (proposta) | Anglès (proposta) | Base a SEO-F3 |
|---|---|---|---|
| `/` | `/es/` | `/en/` | — |
| `/empresa/` | `/es/empresa/` | `/en/company/` | «metalworking company Vilafranca» |
| `/particulars/` | `/es/particulares/` | `/en/residential/` | «cerrajería para particulares» · «residential metalwork» |
| `/particulars/urgencies/` | `/es/particulares/urgencias/` | `/en/residential/repairs/` | «urgencias de cerrajería» · «metal door repairs» |
| `/particulars/estructures/` | `/es/particulares/estructuras/` | `/en/residential/structures/` | «estructuras metálicas a medida» · «custom metal structures» |
| `/particulars/automatismes/` | `/es/particulares/automatismos/` | `/en/residential/door-automation/` | «automatismos para puertas» · «door automation» |
| `/particulars/mobiliari/` | `/es/particulares/mobiliario/` | `/en/residential/furniture/` | «mobiliario metálico a medida» · «custom metal furniture» |
| `/particulars/projectes/` | `/es/particulares/proyectos/` | `/en/residential/projects/` | «proyectos de cerrajería» · «metalwork projects» |
| `/industrial/` | `/es/industrial/` | `/en/industrial/` | Nom de la branca |
| `/industrial/capacitats/` | `/es/industrial/capacidades/` | `/en/industrial/capabilities/` | — |
| `/industrial/sectors/` | `/es/industrial/sectores/` | `/en/industrial/sectors/` | — |
| `/industrial/series-curtes/` | `/es/industrial/series-cortas/` | `/en/industrial/small-batch/` | «series cortas metálicas» · «small batch metal fabrication» |
| `/industrial/proces/` | `/es/industrial/proceso/` | `/en/industrial/process/` | — |
| `/industrial/projectes/` | `/es/industrial/proyectos/` | `/en/industrial/projects/` | — |
| `/contacte/` | `/es/contacto/` | `/en/contact/` | — |
| `/legal/avis-legal/` | `/es/legal/aviso-legal/` | `/en/legal/legal-notice/` | — |
| `/legal/privacitat/` | `/es/legal/privacidad/` | `/en/legal/privacy/` | — |
| `/legal/cookies/` | `/es/legal/cookies/` | `/en/legal/cookies/` | — |

Punts a validar:

- **Branca Particulars en anglès.** La proposta és `residential` (SEO-F3: «residential metalwork»). La branca també atén comunitats i negocis. L'alternativa neutra seria `private-clients`.
- **Urgències en anglès.** La proposta és `repairs` en lloc de `urgent`. SEO-F3 avisa que «urgent» només és una traducció d'intenció i que cal especial prudència si es publica.
- **Empresa en anglès.** `company`, segons SEO-F3. L'alternativa habitual és `about`.
- Les quatre interiors d'Industrial estan ajornades també en català. Les seves traduccions no es generaran fins que es recuperin les rutes.
- La ruta ES d'Estructures i la d'Automatismes són el destí de les landings antigues `/estructuras/` i `/motores/` ([FASE5-redireccions.md](FASE5-redireccions.md)).

## Estat tècnic

**Ja preparat:**

- `astro.config.mjs` defineix els tres idiomes, amb el català per defecte i sense prefix.
- L'esquema de contingut (`src/content.config.ts`) rebutja una ruta ES o EN sense el seu prefix, o una ruta catalana amb prefix. S'ha provat en una còpia fora del projecte.
- `hreflang` i el sitemap només inclouen una traducció quan està aprovada, és indexable i es genera (`isIndexable` + `isPublishedRoute`). Una traducció pendent no pot apuntar a un 404.
- El mapa de redireccions resol els destins ES per `pageId`, de manera que agafarà la ruta que es validi.

**Pendent (quan hi hagi la primera traducció validada):**

- Contingut `content/es/` i `content/en/` amb `lang`, la ruta validada i `status: draft` fins a la validació.
- Textos d'interfície ES i EN a `src/i18n/ui.ts`. `useUi` falla expressament si falten. Les plantilles comproven que els titulars d'interfície coincideixin amb el contingut de cada idioma.
- Generar les pàgines `/es/…` i `/en/…`. Ara cada ruta catalana té la seva pàgina `.astro`, i `isPublishedRoute` només reconeix pàgines estàtiques.
- **Enllaços per idioma.** Els enllaços de `ui.ts` i del menú són rutes catalanes. Caldrà resoldre'ls per `pageId` i idioma, perquè una pàgina ES no enllaci a la versió catalana.
- Selector d'idioma a la capçalera (Fase 1), visible només quan existeixi la traducció publicada de la pàgina.
- Pàgina 404 per idioma, sense indexar.
