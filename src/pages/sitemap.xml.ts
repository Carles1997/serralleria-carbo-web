// sitemap.xml de publicació (FASE5-indexacio.md i SEO-F3 §3). Només hi entren URL canòniques de
// pàgines que (1) són indexables segons la mateixa regla que el <head> (isIndexable: contingut
// aprovat, sense noindex ni publishReady: false) i (2) són rutes publicades (isPublishedRoute: es
// generen de debò i no estan ajornades): una ruta ajornada o sense plantilla (p. ex. legals o una
// traducció encara sense pàgina) no hi apareix mai, encara que se n'aprovi el contingut. Sense
// cap llista manual. Amb més d'una versió d'idioma indexable, cada URL declara les alternatives
// (hreflang) i x-default cap al català.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { defaultLocale } from '../i18n/config';
import { isIndexable } from '../i18n/pages';
import { isPublishedRoute } from '../config/routes';

const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://www.serralleriacarbo.com');
  const pages = (await getCollection('pages')).filter(
    (page) => isIndexable(page) && isPublishedRoute(page.data.route),
  );

  const byPage = new Map<string, typeof pages>();
  for (const page of pages) byPage.set(page.data.pageId, [...(byPage.get(page.data.pageId) ?? []), page]);

  const urls = pages
    .map((page) => {
      const loc = new URL(page.data.route as string, base).href;
      const versions = byPage.get(page.data.pageId) ?? [];
      const alternates =
        versions.length > 1
          ? [
              ...versions.map((version) => `    <xhtml:link rel="alternate" hreflang="${version.data.lang}" href="${escape(new URL(version.data.route as string, base).href)}" />`),
              ...versions
                .filter((version) => version.data.lang === defaultLocale)
                .map((version) => `    <xhtml:link rel="alternate" hreflang="x-default" href="${escape(new URL(version.data.route as string, base).href)}" />`),
            ]
          : [];
      return [`  <url>`, `    <loc>${escape(loc)}</loc>`, ...alternates, `  </url>`].join('\n');
    })
    .sort();

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
