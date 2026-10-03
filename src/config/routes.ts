// Rutes del sitemap de Fase 1 ajornades en aquesta entrega. No es generen com a pàgines, no van al
// sitemap XML ni s'indexen; els esborranys de content/ca/ es conserven. Mentre no tinguin contingut
// propi, els enllaços que hi apunten porten al destí provisional:
// - interiors d'Industrial (FASE5-pla-millora-integral.md §2.1, 27/09/2026): secció de la portada;
// - Mobiliari (indicació del director, 01/10/2026: encara no hi ha exemples): el formulari amb el
//   servei preseleccionat, com Carros industrials.
export const deferredRoutes: Record<string, string> = {
  // Sèries curtes → «Què fabriquem en sèrie» (03/10/2026): és on es llisten els productes en sèrie.
  '/industrial/series-curtes/': '/industrial/#produccio',
  '/industrial/sectors/': '/industrial/#sectors',
  '/industrial/proces/': '/industrial/#proces',
  '/industrial/projectes/': '/industrial/#projectes',
  '/particulars/mobiliari/': '/contacte/?tipus=particular&servei=mobiliari',
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

// Pàgines legals: les genera src/pages/legal/[page].astro, però només si el contingut és publicable
// (status: approved, sense publishReady: false). Com que isPublishedRoute sempre es combina amb
// isIndexable (que exigeix aquest mateix estat), una ruta legal compta com a publicada.
const legalRoute = /^\/legal\/[a-z0-9-]+\/$/;

/**
 * Una ruta és publicada si una pàgina la genera en aquest build i no està ajornada. Només les
 * rutes publicades poden sortir al sitemap o com a alternativa hreflang: una traducció
 * aprovada sense pàgina pròpia no ha d'apuntar a un 404.
 */
export const isPublishedRoute = (route: string | undefined) =>
  Boolean(route) && (builtRoutes.has(route as string) || legalRoute.test(route as string)) && !((route as string) in deferredRoutes);
