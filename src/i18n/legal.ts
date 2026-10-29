// Rutes de les pàgines legals d'un idioma (Fase 8, tasca 8.3; castellà afegit el 08/10/2026). Les
// fan servir src/pages/legal/[page].astro i src/pages/es/legal/[page].astro.
// Es generen les que el contingut marca com a visibles (isLegalVisible: aprovades, o en revisió
// jurídica amb publishReady: true, aquestes amb avís i noindex); la resta no es publica i el peu
// les mostra com a «pendent». En desenvolupament (astro dev) es generen totes, per revisar-les.
import { getCollection } from 'astro:content';
import type { Locale } from './config';
import { useUi } from './ui';
import { isLegalVisible } from './pages';

export async function legalPaths(locale: Locale) {
  const prefix = useUi(locale).routes.home.replace(/\/$/, '');
  const legal = (await getCollection('pages', ({ data }) => data.lang === locale && data.pageId.startsWith('legal-') && Boolean(data.route)))
    .filter((page) => import.meta.env.DEV || isLegalVisible(page));
  const labels = useUi(locale).footer.legal as Record<string, string>;
  // Mateix ordre que el peu: avís legal, privacitat, cookies.
  const order = Object.keys(labels);
  legal.sort((a, b) => order.indexOf(a.data.pageId) - order.indexOf(b.data.pageId));
  return legal.map((page) => {
    const route = page.data.route as string;
    const slug = route.replace(new RegExp(`^${prefix}/legal/`), '').replace(/\/$/, '');
    if (!slug || slug.includes('/')) throw new Error(`Ruta legal no admesa: ${route}`);
    const siblings = legal.map((other) => ({
      label: labels[other.data.pageId] ?? other.data.pageId,
      href: other.data.route as string,
      current: other.id === page.id,
    }));
    return { params: { page: slug }, props: { page, siblings } };
  });
}
