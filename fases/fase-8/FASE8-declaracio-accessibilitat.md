# Fase 8 · Tasca 8.8 · Declaració d'accessibilitat (esborrany)

**Data:** 20/10/2026 · **Estat:** esborrany per al director i l'advocat. No s'ha publicat i no s'ha creat cap pàgina ni cap adreça nova.

## 1. Context i decisions pendents

**Caràcter voluntari:**
- La declaració d'accessibilitat és obligatòria per al sector públic (RD 1112/2018). Per a aquesta web és **voluntària**.
- La Llei 11/2023 (que trasllada la Llei europea d'accessibilitat) obliga sobretot el comerç electrònic, i una web informativa amb formulari de contacte segurament no hi entra. **Ho ha de confirmar l'advocat** (8.10), com ja recull [FASE8-compliment-i-confianca.md](FASE8-compliment-i-confianca.md), apartat 2.

**Per què val la pena:**
- explica què compleix la web;
- diu quina limitació coneguda té;
- dona un canal per avisar de problemes.

**Base:**
- el model de la Comissió Europea (Decisió d'execució (UE) 2018/1523), adaptat a una empresa privada;
- sense el procediment de reclamació davant l'administració, que només és del sector públic.

**Decisions del director:**
1. **On es publica:**
   - **(a) Pàgina pròpia, recomanada:** `/legal/accessibilitat/`, `/es/legal/accesibilidad/` i `/en/legal/accessibility/`, enllaçada al peu amb les altres pàgines legals. Suposa tres adreces noves al sitemap i a l'enllaçat del peu.
   - **(b) Apartat dins de l'Avís legal:** sense adreces noves, però modifica un text aprovat de l'advocat.
2. **Quan es publica:**
   - **amb la web,** amb el resultat de la prova manual amb lector de pantalla (§8.4 de FASE8);
   - **o després,** amb la prova marcada com a pendent.
   - Recomanació: publicar-la quan la prova estigui feta, per no declarar una revisió incompleta.
3. **Termini de resposta** per als avisos d'accessibilitat (per exemple, 20 dies laborables). És un compromís de l'empresa; no s'hi posa cap xifra sense la confirmació del client.

**Dades pendents** (marcades «[PENDENT …]» a l'esborrany):
- data i resultat de la prova amb lector de pantalla;
- termini de resposta;
- data de publicació.

## 2. Esborrany en català

> # Declaració d'accessibilitat
>
> Serralleria Carbó, S.L. vol que el lloc web www.serralleriacarbo.com es pugui fer servir per tothom, també per les persones que naveguen amb lector de pantalla, només amb el teclat, amb ampliació o amb altres tecnologies de suport.
>
> ## Situació de compliment
>
> Prenem com a referència les Pautes d'accessibilitat per al contingut web (WCAG) 2.2, nivell AA, que també recull la norma europea EN 301 549.
>
> Aquest lloc web és **parcialment conforme** amb aquestes pautes, a causa de l'excepció que s'indica a continuació.
>
> ## Contingut que no és accessible
>
> - **Contrast de l'any de fundació a la pàgina d'inici.** A l'entrada de la pàgina d'inici, l'any «1989» es mostra en color bordeus sobre fons gris fosc, amb un contrast inferior al mínim que demanen les pautes (criteri 1.4.3).
>   - Es tracta d'un element de la imatge de marca.
>   - La mateixa informació apareix amb un contrast correcte a la secció de xifres de la mateixa pàgina («1989 · Any de fundació»).
>   - Els lectors de pantalla la llegeixen com a part del títol de la pàgina.
>
> ## Contingut de tercers
>
> - **Mapa de Google** (pàgina de contacte).
>   - Només es carrega si es demana.
>   - El seu contingut depèn de Google.
>   - Com a alternativa, l'adreça és en text a la mateixa pàgina, amb un enllaç directe per obrir-la a Google Maps.
>
> ## Com s'ha avaluat
>
> Aquesta declaració es va preparar el [PENDENT: data de publicació] a partir d'una autoavaluació feta per l'equip del projecte:
> - **Revisió automàtica** de totes les pàgines, en pantalla d'ordinador i de mòbil, amb l'eina axe-core, sobre els criteris WCAG 2.0, 2.1 i 2.2 de nivells A i AA (16/10/2026).
> - **Text sobre fotografia:** mesura del contrast real de tots els textos que hi apareixen. Tots compleixen el criteri.
> - **Estructura:** revisió de l'estructura que llegeixen els lectors de pantalla (encapçalaments, regions, noms d'enllaços i botons, textos alternatius i idioma) i de l'ús amb teclat.
> - **Prova manual amb lector de pantalla** (NVDA a l'ordinador i VoiceOver al mòbil): [PENDENT: data i resultat].
>
> També hem tingut en compte que la web es pugui fer servir sense JavaScript i respecti la preferència de moviment reduït.
>
> ## Comentaris i contacte
>
> Si trobeu algun problema d'accessibilitat en aquest lloc web, o necessiteu algun contingut en un altre format, us podeu adreçar a nosaltres:
> - **Correu electrònic:** carbo@serralleriacarbo.com
> - **Telèfon:** 93 890 27 94 (de dilluns a divendres, de 8:00 a 13:00 i de 15:00 a 18:00)
>
> Us respondrem en un termini de [PENDENT: termini de resposta].
>
> ## Revisió
>
> Aquesta declaració es va revisar per última vegada el [PENDENT: data]. La revisarem quan hi hagi canvis importants al lloc web, i com a mínim una vegada l'any.

**Notes de redacció:**
- **Dades confirmades:**
  - **telèfon i horari:** `src/config/site.ts`. El fix com a telèfon principal és una decisió del director del 13/10/2026;
  - **correu:** la bústia de contacte del formulari;
  - **dates de l'autoavaluació:** les de l'apartat 8 de FASE8.
- **No es declara** cap certificació, auditoria externa ni compliment total.
- **Castellà i anglès:** es traduiran quan el director i l'advocat aprovin el text català, amb el mateix procediment que els altres textos legals.

## 3. Implementació (quan s'aprovi)

**Opció (a):**
- contingut a `content/{ca,es,en}/legal-accessibilitat.md`, amb la plantilla legal existent (`LegalTemplate.astro`);
- enllaç al peu, al costat d'«Avís legal», «Privacitat» i «Cookies»;
- rutes a `src/config/routes.ts`;
- comprovació amb `check:links` i `check:i18n` i amb la porta de publicació dels textos legals (`publishReady`).

**En tots els casos:**
- l'excepció del «1989» es manté sincronitzada amb `scripts/qa/check-a11y.py` (taula `ACCEPTED`): si el director la treu, la declaració ha de canviar;
- abans de cada revisió de la declaració, s'executa `check-a11y.py` complet.
