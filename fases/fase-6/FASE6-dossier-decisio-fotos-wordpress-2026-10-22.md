# Dossier de decisió del client · Adreça i coherència NAP (P7 / C5)

**Referència:** STUDIO-PILOT-SC-2026-01/nap. **Estat:** pendent de confirmació de l'adreça. **Responsable:** Client. **Data d'evidència:** no assignada; vegeu les dates de les fonts. El nom del fitxer respon a la ruta prevista; aquest dossier tracta exclusivament les dades de negoci.

## Context i criteri

P7 de `fases/fase-9/FASE9-manual-publicacio.md` recull el telèfon fix decidit el 13/10/2026 i l'adreça pendent. C3 i C5 de `fases/fase-6/FASE6-pla-accio.md` defineixen les decisions NAP (nom, adreça i telèfon); C5 de `fases/fase-6/FASE6-pla-executable.md` condiciona la coherència del llançament.

`fases/fase-7/FASE7-brief-millores-ux-i-continguts.md` demana confirmar separadament taller/visites i domicili social, sense unificar-los per suposició. Aquest dossier no escull cap opció ni modifica dades del web o de serveis externs. La importació retrospectiva no atribueix cap execució històrica a Studio OS.

## Telèfon: decisió ja registrada

El telèfon principal és el **fix 93 890 27 94**, per decisió del director del **13/10/2026**. El **630 661 908** queda com a mòbil secundari; WhatsApp continua al mòbil. Ho acrediten `src/config/site.ts` i l'apartat 9 de `fases/fase-7/CANVIS-CLIENT-2026-10-12-implementacio.md`. La decisió posterior resol el pendent històric C3 dels plans de Fase 6.

El Perfil d'Empresa recollit a `fases/fase-6/FASE6-dades-google-business-profile.md` ja mostra el fix. **D1.3**, segons el pla d'acció, és l'acció de telèfons: el client ha de verificar el fix com a principal i afegir el mòbil a «Otros números de teléfono». No consta aquí com a executada. La revisió de l'adreça del perfil és una acció separada derivada de C5.

## Adreça: estat documentat

La localitat és 08720 Vilafranca del Penedès, Barcelona. Les dades del Perfil d'Empresa i dels directoris són les documentades a les fonts locals, sense comprovació externa nova.

| Lloc o ús | Valor documentat | Font local |
|---|---|---|
| Web: contacte, mapes i dades estructurades | Carrer d'Eugeni d'Ors, **59** | `src/config/site.ts` (address, postalAddress, mapUrl i mapEmbedUrl) |
| Web: pàgina Empresa (CA), adreça escrita a mà en text visible | Carrer d'Eugeni d'Ors, **59** | `content/ca/empresa.md` |
| Perfil d'Empresa de Google | Carrer d'Eugeni d'Ors, **59** | `fases/fase-6/FASE6-dades-google-business-profile.md` |
| Textos legals CA: domicili social | C/ Eugeni d'Ors, **59-61** | `content/ca/legal-avis-legal.md`, `content/ca/legal-privacitat.md`, `content/ca/legal-cookies.md` |
| Textos legals ES: domicili social | C/ Eugeni d'Ors, **59-61** | `content/es/legal-avis-legal.md`, `content/es/legal-privacitat.md`, `content/es/legal-cookies.md` |
| Textos legals EN: domicili social | C/ Eugeni d'Ors, **59-61** | `content/en/legal-avis-legal.md`, `content/en/legal-privacitat.md`, `content/en/legal-cookies.md` |
| Antic WordPress: pàgina de manteniment `/sample-page/` (evidència històrica) | c/ Eugeni d'Ors, **59-61** | `fases/fase-6/linia-base-wordpress-2026-10-08/fitxers/pagina-sample-page.html` |
| eInforma | Calle Eugeni d'Ors, **59 - 61** | Apartat 4 de `fases/fase-6/FASE6-dades-google-business-profile.md` |

`fases/fase-8/FASE8-compliment-i-confianca.md` també documenta el domicili social 59-61 i deixa pendent si el contacte ha d'adoptar aquest número. L'apartat 5.6 de la font del Perfil d'Empresa completa el context de coherència de les citacions. La diferència pot correspondre a usos diferents; cal confirmació del client.

## Opcions i canvis posteriors a la confirmació

Els «nou textos legals» esmentats a continuació són els nou fitxers CA/ES/EN de la taula anterior. Qualsevol canvi del domicili social requereix que el client n'acrediti el valor abans d'editar-los.

| Opció (cap seleccionada) | Fitxers del web que caldria tractar després | Acció del client al Perfil d'Empresa i directoris |
|---|---|---|
| **a) Tot 59**: contacte/taller i domicili social al 59 | Canviar el domicili als nou textos legals, després de validar-lo. Mantenir el 59 al text visible de `content/ca/empresa.md`. Mantenir el 59 a address i postalAddress de `src/config/site.ts`; verificar que mapUrl i mapEmbedUrl continuen apuntant al taller correcte. | Confirmar el 59 al perfil. Aplicar/verificar D1.3 per als telèfons. A D6, demanar la correcció d'eInforma i revisar QDQ, Empresite, Comga i DatosCif amb el mateix nom, adreça i fix. |
| **b) Tot 59-61**: contacte/taller i domicili social al 59-61 | Canviar l'adreça escrita a mà de `content/ca/empresa.md` a 59-61. Canviar address i postalAddress a `src/config/site.ts` i ajustar mapUrl i mapEmbedUrl comprovant la ubicació. Els nou textos legals ja indiquen 59-61: conservar-los i revisar-ne la coherència. | Canviar l'adreça del perfil a 59-61 i verificar el marcador. Aplicar/verificar D1.3 per als telèfons. A D6, revisar QDQ, eInforma, Empresite, Comga i DatosCif; eInforma ja recull 59-61. |
| **c) Usos diferenciats**: 59 per a contacte/taller/visites; 59-61 com a domicili social | Mantenir el 59 a `content/ca/empresa.md` i, si escau, etiquetar-lo com a taller/visites. Mantenir address i postalAddress al 59 a `src/config/site.ts` i revisar mapUrl i mapEmbedUrl. Conservar el 59-61 als nou textos legals, etiquetat com a domicili social. Revisar la presentació del contacte per etiquetar el 59 com a taller/visites, segons el brief de Fase 7; concretar els fitxers de presentació en la implementació posterior. | Confirmar el 59 com a establiment al perfil i verificar el marcador. Aplicar/verificar D1.3 per als telèfons. A D6 (QDQ, eInforma, Empresite, Comga i DatosCif), usar el 59 en citacions de contacte i el 59-61 en fitxes de domicili social, amb l'ús explícit; confirmar quin tipus de dada recull cada directori abans de demanar canvis. |

D6 i la llista de directoris consten a `fases/fase-6/FASE6-pla-accio.md`. En tots els casos, la comprovació posterior ha d'incloure web visible, dades estructurades, mapes, Perfil d'Empresa i citacions, distingint el domicili social si s'aprova l'opció c. No s'ha executat cap d'aquests canvis.

## Confirmació pendent del client

- [ ] Seleccionar l'opció **a / b / c**, o descriure una alternativa acreditada: __________.
- [ ] Confirmar l'adreça de contacte, taller i visites (59 o 59-61): __________.
- [ ] Confirmar el domicili social i aportar-ne l'evidència (59 o 59-61): __________.
- [ ] Confirmar la coherència amb el Perfil d'Empresa: adreça d'establiment, marcador i fix principal; indicar si s'ha completat D1.3 per al mòbil secundari: __________.
- [ ] Registrar responsable de la confirmació, data i evidència, i autoritzar els canvis posteriors que corresponguin: __________.

**Responsable de la decisió:** Client. **Data d'evidència de la confirmació:** no assignada. P7/C5 continuen pendents fins que aquesta confirmació quedi registrada i se'n comprovi la coherència.
