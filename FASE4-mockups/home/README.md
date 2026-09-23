# Mockup de la home · Fase 4

Obre `index.html` al navegador. És una **maqueta navegable de revisió**, no codi de producció ni una pàgina publicada.

## Fonts de projecte

- Arquitectura i recorreguts: `../../FASE1-arquitectura-serralleria-carbo.md`.
- Direcció visual A i comportament del doble accés: `../../DESIGN.md` i `../../FASE2-propostes/index.html`.
- Text català: `../../content/ca/home.md` i contingut de les pàgines de branca i projectes quan cal identificar els enllaços.
- Colors, tipografia i espaiat: `../../design/tokens.css`.
- Direcció editorial d'aquesta iteració: `../../Referencies/Landing page layout Inspo(Mobile and web).jpeg` i `../../Referencies/QUARRA STONE COMPANY _ corporate website redesign - Tony Che.jpeg`. Són referències de ritme, contrast i escala; no s'han incorporat com a assets.

## Direcció visual d'aquesta iteració

La revisió del director de projecte demanava una home menys genèrica i més sòbria. La maqueta adopta un fons carbó predominant, una entrada tipogràfica de gran escala, fotografia monocroma integrada en la composició, separadors fins, dades amb jerarquia editorial i un tancament en el bordeus de marca. Els dos camins inicials conserven el mateix pes i funcionen sense hover. La tipografia continua sent Source Sans 3 i el color d'accent continua sent `#7c2a30`.

## Límits del mockup

- Les dues fotografies de la primera secció provenen de la prova conceptual de Fase 2. No mostren el taller ni treballs reals de l'empresa. Cal substituir-les per fotografies aprovades.
- `metal-detail-concept.png` és una tercera fotografia conceptual generada amb el mode integrat d'ImageGen per estudiar material, llum i enquadrament. No s'ha de presentar com una fotografia del taller. Prompt final: «A precise close-up of clean fabricated steel elements in a contemporary metal workshop, showing a crafted joint, brushed stainless steel and dark painted steel; asymmetrical architectural photography, controlled side light, deep shadows and silver highlights; charcoal and steel palette; believable fabrication details; no people, logos, text, sparks, rust, gears or watermark.»
- Els enllaços interns porten a seccions de la mateixa maqueta perquè es pugui comprovar el recorregut sense pàgines interiors dissenyades. L'atribut `data-future-route` indica la ruta final del sitemap.
- Els accessos de telèfon, WhatsApp i correu són reals i no envien cap missatge automàticament.
- El selector CA / ES / EN mostra la posició prevista, però encara no canvia d'idioma. Les traduccions continuen pendents.
- Les pàgines de projectes i Contacte s'il·lustraran amb les seves plantilles pròpies. Aquest mockup només fixa la home.

## Què cal validar

1. Equilibri visual i comprensió dels dos camins inicials, amb i sense hover.
2. Jerarquia de les xifres, serveis, projectes i contacte en escriptori i mòbil.
3. Visibilitat de la trucada per a una avaria i de l'accés a la branca industrial.
4. Comportament del menú mòbil, focus de teclat, contrast i lectura a 320 px.

En mòbil, una parella d'accessos ràpids manté les dues opcions visibles abans dels panells apilats; els panells continuen sent enllaços complets.

La comprovació automatitzada de `verify.cjs` genera les captures a 1440, 768, 390 i 320 px i revisa desbordament horitzontal, font, fotografies del doble accés, hover, focus, menú mòbil, tacte i moviment reduït. Aquesta maqueta continua pendent de validació visual per part del director de projecte i del client.

L'aprovació d'aquest mockup permetrà derivar-ne els components per a la resta de plantilles de la Fase 4. No tanca la Fase 4 per si sola.
