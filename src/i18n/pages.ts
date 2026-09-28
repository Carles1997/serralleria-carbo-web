import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLocale, type Locale } from './config';
import { isPublishedRoute } from '../config/routes';

export type Page = CollectionEntry<'pages'>;

/** Pàgina d'un idioma pel seu pageId del frontmatter. */
export async function getPage(pageId: string, locale: Locale = defaultLocale): Promise<Page> {
  const pages = await getCollection('pages', ({ data }) => data.pageId === pageId && data.lang === locale);
  if (pages.length !== 1) throw new Error(`Cal exactament una pàgina "${pageId}" en ${locale}; n'hi ha ${pages.length}.`);
  return pages[0];
}

/** Només el contingut aprovat i sense bloqueig es pot indexar (vegeu FASE5-indexacio.md). */
export function isIndexable(page: Page) {
  const { status, noindex, publishReady, route } = page.data;
  return status === 'approved' && noindex !== true && publishReady !== false && Boolean(route);
}

/**
 * Versions d'idioma per a hreflang. Una pàgina no indexable no en declara cap, i
 * només s'hi inclouen les traduccions indexables: mai una URL noindex o esborrany.
 * Amb una sola versió no cal hreflang.
 */
export async function getAlternates(page: Page) {
  if (!isIndexable(page) || !isPublishedRoute(page.data.route)) return [];
  const versions = await getCollection('pages', (entry) => entry.data.pageId === page.data.pageId && isIndexable(entry) && isPublishedRoute(entry.data.route));
  if (versions.length < 2) return [];
  return versions.map(({ data }) => ({ lang: data.lang, route: data.route as string }));
}
