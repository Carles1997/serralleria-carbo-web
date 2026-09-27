# Fase 5 · Entorn de Claude i flux de desenvolupament

**Estat inicial:** preparació de l'entorn. La Fase 4 està validada; encara no s'ha creat l'aplicació Astro de producció. Les maquetes i els documents de les fases continuen com a referència, no són el codi final.

## Eines i responsabilitats

| Eina | Ús previst |
|---|---|
| Claude Code a l'escriptori | Sessió principal per implementar, revisar diffs i contrastar la web al navegador. |
| claude a PowerShell | La mateixa base de Claude Code per a diagnòstic, scripts, Git i continuïtat des del terminal. És complementària, no un motor diferent. |
| CLAUDE.md | Regles persistents, curtes i versionades que Claude llegeix a cada sessió. |
| Skill de projecte | Flux sota demanda per a una ruta o component; el context estable és a CLAUDE.md. |
| Impeccable | Auditoria visual manual i informe. Cap edició, inicialització ni hook automàtic. |
| Skills d'Emil | Criteri selectiu: detall d'interacció, revisió de moviment i QA mòbil. emil-design-eng i review-animations ja estan instal·lades localment amb invocació manual; mobile-native s'afegirà quan hi hagi interaccions mòbils per provar. |

## Posada en marxa

1. Obrir aquesta carpeta arrel a Claude Code. La CLI nativa ha de respondre a claude --version i claude doctor. Cal iniciar sessió amb el compte Claude abans de la primera tasca.
2. Llegir CLAUDE.md i fases/fase-4/FASE4-traspas-desenvolupament.md. Confirmar amb git status que els canvis anteriors de Fase 4 no es perden ni es barregen amb la implementació.
3. Començar per un scaffold Astro mínim en una branca de desenvolupament, preservant content/, design/ i fases/. No donar per existent cap package.json anterior.
4. Fixar versions compatibles de Node, Astro i Tailwind en instal·lar; registrar-les al manifest i al lockfile. Comprovar l'estat actual de les dependències amb fonts oficials abans de triar versions.
5. Integrar tokens, font local i layout compartit; després construir Home, Particulars, Industrial i Contacte segons les set plantilles. Derivar els serveis i les rutes interiors de les plantilles aprovades amb contingut propi.
6. Connectar SEO tècnic, idiomes i redireccions; el formulari real requereix backend i textos legals abans de publicar. Fer QA transversal al final de cada plantilla, no només al final del projecte.

## Bucle per a cada ruta

**Entrada:** traspàs de Fase 4, fitxer content/ca/, fitxa SEO, maqueta representativa i tokens.

**Treball:** estructura semàntica → contingut i navegació → responsive i accessibilitat → interacció i moviment justificats → SEO i i18n → comprovacions.

**Sortida:** diff acotat, captura o revisió visual quan escau, proves fetes, dades pendents i següent tasca concreta. Per a una nova plantilla, validar l'execució abans de replicar-la a la resta de rutes.

## Política de skills

- serralleria-carbo-project: invocar per a treball de Fase 5. Les regles essencials també consten a CLAUDE.md perquè no depenguin d'una invocació automàtica.
- Impeccable: es pot demanar una auditoria de només lectura d'una pàgina o diff. Revisar les conclusions manualment. Evitar ordres init, craft, shape, adapt, polish, harden i qualsevol instal·lador que activi hooks. La còpia local actual de la skill queda ignorada per Git.
- emil-design-eng: consultar quan una interacció o acabat necessiti criteri addicional. review-animations: després d'implementar moviment, per a revisió sense canvis. Aquestes dues skills ja són disponibles localment i només s'invoquen manualment. mobile-native: instal·lar-la selectivament abans d'acceptar navegació i gestos mòbils, verificant-ne permisos i efectes.
- La proposta externa esmenta DESIGN-2.md, Taste Skill i nou skills funcionals: DESIGN-2.md no existeix; Taste i els nou embolcalls addicionals no són necessaris per iniciar. No executar una cadena de comandes d'Impeccable que alteri els mockups validats.

## Punts de control

| Punt | Condició per avançar |
|---|---|
| Entorn | Claude autenticat; versions, git status i instruccions de projecte comprovats. |
| Base | Astro arrenca, tokens i font local es carreguen, rutes de prova resolen. |
| Cada plantilla | Contingut real, jerarquia visual fidel, enllaços, responsive, teclat i tacte, moviment reduït, SEO propi. |
| Formulari | Validació i enviament reals, errors i confirmació accessibles, privacitat revisada. |
| Publicació | Dades pendents i fotos autoritzades resoltes; ES/EN revisats; textos legals, redireccions, sitemap i QA completats. |

El projecte pot avançar en la base i les plantilles mentre el client completa dades pendents. Els elements no confirmats no s'han de presentar com a fets ni publicar com a pàgines finals.
