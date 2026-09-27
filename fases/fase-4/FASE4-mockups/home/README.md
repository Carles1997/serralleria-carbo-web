# Homepage · Fase 4 (iteració Stitch)

Obre index.html i actualitza la pestanya del navegador si ja tens la maqueta oberta. És una **maqueta navegable de revisió**, no una pàgina publicada.

## Direcció visual

Aquesta iteració parteix dels exports de la carpeta ../../stitch_serralleria_carbo_design_system i en conserva la fotografia protagonista, la paleta fosca, el contrast editorial, la divisió Particulars / Industrial i les xifres de taller. Els exports originals de Stitch no s'han modificat. La tipografia, el bordeus i els criteris de marca continuen venint de ../../../../DESIGN.md i ../../../../design/tokens.css.

Els canvis principals són una sola estructura responsive, formes més rectes, menys ombres i targetes, un menú web mòbil, accessos immediats a les dues branques i informació real de Fases 1–3. La home manté el títol i la descripció SEO aprovats, amb noindex propi de la maqueta.

## Contingut i límits

- Textos de content/ca/home.md; projectes documentats de content/ca/projects/.
- Les quatre xifres provenen de la informació confirmada pel client. No es publiquen promeses de servei 24 h, terminis de resposta, certificacions o especificacions de maquinària no confirmades.
- Les fotografies són **conceptuals** i no documenten el taller ni els projectes de Serralleria Carbó. Les originals continuen pendents. Els sis projectes es mostren per títol, sense atribuir-los cap fotografia conceptual.
- Els enllaços de les rutes que ja tenen maqueta obren la plantilla corresponent (Particulars, Industrial, projectes, estructures, capacitats i contacte). Les rutes que encara no tenen maqueta conserven un destí dins la pàgina per poder revisar el recorregut; l'atribut data-future-route n'indica la ruta final validada a la Fase 1. El formulari continua sent una simulació sense enviament.
- Telèfon, WhatsApp i correu obren els canals reals; la maqueta no envia cap consulta per si sola. Els textos legals continuen pendents del client.

## Revisió

El fitxer verify.cjs està preparat per generar captures a 1440, 768, 390 i 320 px i revisar desbordament, imatges, font, menú i interaccions. Les captures de la iteració anterior s'han conservat a preview-anterior/. La versió actual es valora obrint index.html; verify.cjs pot generar captures noves al directori.

La versió actual s'ha revisat a 1440, 768, 390 i 320 px, inclosos els enquadraments i els talls de titular. El detall és a ../../FASE4-QA-final.md. La Fase 4 s’ha tancat amb la validació del client el 25/09/2026.

## Segon mockup de les seccions

Serveis ara és un mosaic de quatre peces per a Particulars i una peça industrial amb el mateix llenguatge visual. Els esquemes de reparació i automatismes són genèrics, no fitxes de maquinària o obres reals.

Els sis treballs documentats es recorren en un visor manual. Sense JavaScript es poden llegir tots seguits. L'asset project-stage-concept-v2.png és una imatge conceptual nova i porta una atribució explícita a la maqueta. Les alternatives valorades, el criteri i la preparació per a l'animació estan a SECCIONS-v2.md.

Les captures arxivades a preview-anterior/ continuen sent de la iteració anterior. La passada transversal de les set plantilles a 1440, 768, 390 i 320 px queda documentada a ../../FASE4-QA-final.md. La Fase 4 ha quedat validada pel client el 25/09/2026; aquesta és la referència de disseny per al desenvolupament.
