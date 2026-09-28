// Rutes del sitemap de Fase 1 ajornades en aquesta entrega (FASE5-pla-millora-integral.md §2.1,
// decisió del 27/09/2026). No es generen com a pàgines, no van al sitemap XML ni s'indexen; els
// esborranys de content/ca/ es conserven. Mentre no tinguin contingut propi, els enllaços que hi
// apunten porten a la secció corresponent de la portada d'Industrial.
export const deferredRoutes: Record<string, string> = {
  '/industrial/series-curtes/': '/industrial/#series',
  '/industrial/sectors/': '/industrial/#sectors',
  '/industrial/proces/': '/industrial/#proces',
  '/industrial/projectes/': '/industrial/#projectes',
};

/** Destí real d'un enllaç: la ruta mateixa o, si està ajornada, la seva àncora provisional. */
export const resolveRoute = (href: string) => deferredRoutes[href] ?? href;

// Rutes que generen de debò les pàgines .astro del projecte (src/pages/**/index.astro → /…/).
const builtRoutes = new Set(
  Object.keys(import.meta.glob('../pages/**/*.astro'))
    .filter((file) => !file.includes('['))
    .map((file) => file.replace(/^\.\.\/pages/, '').replace(/index\.astro$/, '').replace(/\.astro$/, '/'))
    .filter((route) => route !== '/404/'),
);

/**
 * Una ruta és publicada si una pàgina la genera en aquest build i no està ajornada. Només les
 * rutes publicades poden sortir al sitemap o com a alternativa hreflang: una traducció o una
 * legal aprovades sense pàgina pròpia no han d'apuntar a un 404.
 */
export const isPublishedRoute = (route: string | undefined) => Boolean(route) && builtRoutes.has(route as string) && !((route as string) in deferredRoutes);
