# Fotografies recuperades de la web antiga

**Data:** 27/09/2026  
**Fonts:** `Fotos web antiga/` (22 miniatures conservades sense canvis) i mediateca pública de WordPress (17 versions de més resolució, inclosa una foto de baranes que faltava)  
**Catàleg traçable:** `assets/fotografies-recuperades/cataleg.csv`  
**Origen de les versions recuperades:** `assets/fotografies-recuperades/origen-wordpress.csv`

**Vista ràpida:** [planxa 01](../../assets/fotografies-recuperades/inventari/planxa-01.jpg) (fotos 01–11) i [planxa 02](../../assets/fotografies-recuperades/inventari/planxa-02.jpg) (fotos 12–22). Els números coincideixen amb la columna `id` del catàleg.

**Versions de més resolució:** [planxa 01](../../assets/fotografies-recuperades/inventari/planxa-originals-01.jpg) i [planxa 02](../../assets/fotografies-recuperades/inventari/planxa-originals-02.jpg), amb la foto addicional 23.

## Resultat de la classificació

S'han identificat 17 fotografies que corresponen visualment als sis projectes ja documentats. Setze constaven a la carpeta local i la dissetena, una altra vista de les baranes interiors, s'ha recuperat de la [pàgina antiga de projectes](https://www.serralleriacarbo.com/projectes/). També hi ha dues fotografies de l'equip o d'una intervenció que poden funcionar com a recurs general, dues de soldadura que requereixen confirmar autoria i dret d'ús, i dues imatges que no convé incorporar. Les versions de més resolució són a `projectes/`; els retalls de 716 px s'han conservat a `miniatures-web/`. El catàleg relaciona cada arxiu amb el seu origen i SHA-256. L'associació visual dels projectes s'ha de confirmar amb el client abans de publicar-la.

| Projecte documentat | Còpies classificades | Ús recomanat | Límit visual |
| --- | ---: | --- | --- |
| Persianes motoritzades d'un negoci (`persianes-negoci`) | 3 | Fitxa del cas i miniatures d'automatismes | Façana de carrer poc controlada; capçalera gran no recomanada. |
| Estructura per a ascensor (`estructura-ascensor`) | 4 | Fitxa del cas i detall d'estructures | L'angle picat/vertical explica l'obra però no ofereix una imatge principal neta. |
| Deu gàbies per a un client industrial (`gavia-industrial`) | 3 | Evidència real de taller, peça i transport; candidat al cas industrial | Fons de taller i aparcament carregats. No usar com a hero a tota pantalla. |
| Porta de pàrquing (`porta-parquing`) | 3 | Fitxa del cas i automatismes | Il·luminació irregular i algunes zones fosques o cremades. |
| Baranes interiors d'habitatge (`baranes-interior-casa`) | 2 | Exemple de feina en curs, amb aquest context explícit | Falta fotografia de l'acabat final; no presentar-les com a resultat acabat. |
| Passarel·la interior (`passarella-interior`) | 2 | Fitxa del cas i targeta de treball real | Les més llegibles del grup particular; comprovar el retall horitzontal. |

### Recursos transversals

| Fitxer classificat | Ús possible | Estat |
| --- | --- | --- |
| `recursos/equip/equip-furgoneta-intervencio.png` | Equip, desplaçament i servei | Candidat; confirmar autorització de la imatge de l'operari. |
| `recursos/servei/reparacio-persiana-comercial.jpg` | Urgències o automatismes | Candidat; confirmar autorització de la imatge de l'operari. No associar-lo al projecte de persianes sense confirmació. |
| `pendents-drets/soldadura-muntatge-obra.png` | Soldadura o muntatge | No publicar fins a confirmar que és una foto pròpia o que es pot reutilitzar. |
| `pendents-drets/soldadura-espurnes.png` | Ambient de soldadura | No publicar fins a confirmar drets. |

**Descartades del conjunt per a la nova web:** `Rectangle-100.png` mostra un trepant sobre fusta i no representa clarament la serralleria; `Rectangle-39.png` mostra metall incandescent, un procés que no consta a les capacitats documentades. Consten igualment al catàleg, sense còpia a la biblioteca d'ús.

## Qualitat i millora possible

- Les 16 fotos que hi havia a la carpeta són retalls web JPG de **716 × 495 px**. S'han localitzat a la mediateca de WordPress les **17 versions abans del retall**, de **1200 × 1600**, **1600 × 1200/1204** o **1500 × 2000 px** segons la fotografia, entre **163 i 591 KB**. Són els assets principals; la qualitat i l'enquadrament són clarament millors que les miniatures. Les versions verticals permeten una fitxa de projecte o un retall mòbil, però no sempre un hero horitzontal net.
- Els dos recursos propis són de **716 × 441 px**. Les dues imatges pendents de drets fan **1512 × 472 px** i **716 × 441 px** respectivament. La primera és panoràmica però estreta d'alçada.
- S'ha provat una restauració generativa sobre la foto de la gàbia al camió. Tot i augmentar la resolució aparent, ha canviat detalls del fons i ha inventat rètols. **Prova rebutjada: no és un substitut fiable de la documentació real.** No hi ha cap fotografia de projecte retocada amb IA a la biblioteca classificada.
- No reexportar els JPG repetidament: cada compressió amb pèrdua empitjora el fitxer. Quan s'integrin al web, Astro pot generar les mides i formats de lliurament a partir dels JPG de més resolució. No s'han canviat encara les imatges de `src/` ni les maquetes aprovades.

## Instruccions per a la integració web

1. Fer servir les fotos de `projectes/` només als casos que corresponen. El catàleg manté la relació amb els originals. No convertir una foto generada o de banc en un «treball real» de Carbó.
2. Importar les versions de `projectes/` com a assets d'Astro i lliurar variants adaptades al contenidor (`sizes`, WebP/AVIF quan compensi). Fer variants fins a l'amplada nativa real de cada foto, sense ampliar-la artificialment. Carregar diferidament les galeries; només la imatge visible a l'obertura de la pàgina pot ser prioritària.
3. Afegir text alternatiu literal, per exemple: «Gàbia metàl·lica fabricada al taller» o «Passarel·la interior amb baranes de ferro». No repetir paraules clau ni descriure detalls no verificats.
4. Aplicar l'estètica de marca amb enquadrament, fons de la interfície i tractament del text. Evitar filtres agressius que ocultin l'estat real de l'obra o introdueixin inconsistència entre projectes.
5. Marcar com a conceptual qualsevol fotografia creada per IA que s'utilitzi per ambientar Home, Particulars o Industrial. No usar-la per substituir els sis casos documentats.

## Fotografies que convé demanar o produir

**Prioritat 1 — completar la documentació real.** Les versions de la mediateca ja s'han recuperat. Encara convé demanar, si existeixen, arxius de càmera no comprimits i sobretot una foto frontal neta de les gàbies, una foto acabada de les baranes de l'habitatge i una vista general de l'ascensor. Les fotos actuals no cobreixen aquests enquadraments.

**Prioritat 2 — sessió pròpia.** Fotografiar el taller, l'equip i les màquines confirmades (plegadora, cisalla i punxonadora), materials de ferro i inoxidable, soldadura TIG/MIG/MAG i una intervenció residencial. Preparar enquadraments horitzontals per als heros i verticals per a les targetes mòbils, amb espai per al text i autorització de les persones que hi surtin.

**Prioritat 3 — imatges conceptuals.** Crear només recursos d'ambient (detalls de metall, llum al taller, textures o mans treballant sense atributs no verificats) per omplir buits editorials. Cal identificar-los com a conceptuals fins a substituir-los per fotos pròpies. Evitar generar peces, projectes, certificacions, instal·lacions o equips inexistents.

**Pendent de validació del client:** associació visual dels grups amb els sis projectes, autorització de les dues imatges amb operaris i drets de les dues fotografies de soldadura. Aquestes qüestions no impedeixen començar el disseny amb les 17 fotos de projecte com a materials provisionals.


## Dues mostres conceptuals per cobrir buits visuals

S'han creat amb la *skill* `imagegen` de Codex, sense partir de cap projecte real, i **no s'han incorporat encara a la web**:

- `assets/imatges-conceptuals/industrial-soldadura-conceptual-v1.png` — escena editorial de soldadura sobre perfil metàl·lic, amb espai fosc per al text. Prompt: soldadura en un taller genèric, mans amb guants, perfils d'acer, paleta carbó/plata, composició horitzontal, sense marca ni instal·lacions identificables.
- `assets/imatges-conceptuals/particulars-barana-conceptual-v1.png` — interior residencial amb barana de ferro, composició clara i zona fosca per al titular. Prompt: habitatge genèric contemporani, barana negra i llum natural, sense marca ni elements impossibles.

Totes dues són **ambientació generada**, no evidència de treballs executats per Serralleria Carbó. Cal revisar-ne l'encaix en els heros i el retall mòbil abans de fer-les servir. Les còpies PNG es mantenen com a màster; Astro pot generar WebP/AVIF i variants responsives quan s'integrin.
