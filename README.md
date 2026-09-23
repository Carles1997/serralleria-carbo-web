# Serralleria Carbó · redisseny web

Repositori de treball del redisseny. Les fases 1 i 2 estan validades; la base catalana i SEO de la fase 3 està acceptada provisionalment per dissenyar. La fase 4 conté **mockups**, encara no una web de producció ni contingut aprovat per publicar.

## Provar la homepage actual

`node scripts/serve-mockup.cjs` inicia un servidor local sense dependències. En un entorn amb npm operatiu, `npm run dev` fa el mateix. Obre `http://localhost:3000/`. També pots obrir `FASE4-mockups/home/index.html` directament al navegador.

El servidor només facilita la previsualització de la maqueta. La pila prevista per al desenvolupament posterior és **Astro + Tailwind CSS** segons `CONTEXT-serralleria-carbo.md`.

## Provar una alternativa amb v0

1. Importa aquest repositori a v0 mitjançant **Git Import**.
2. Usa el prompt de [`PROMPT-v0-homepage.md`](PROMPT-v0-homepage.md).
3. Demana que la nova proposta vagi a `FASE4-mockups/home-v0/` i a una branca separada. La proposta actual és a [`FASE4-mockups/home/`](FASE4-mockups/home/).

Les imatges a `Referencies/` són només inspiració i no són assets per publicar. Les fotografies de les maquetes també són conceptuals i s'han de substituir o validar abans de producció. Els textos legals, les traduccions i altres dades pendents estan registrats a `FASE3-revisio.md`.

Aquest repositori s'ha de mantenir **privat** mentre contingui documentació interna del projecte. No despleguis els mockups públicament.
