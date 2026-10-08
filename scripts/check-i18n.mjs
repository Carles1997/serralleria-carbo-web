// Comprovació de les versions d'idioma sobre l'HTML generat (castellà afegit el 08/10/2026).
// Per a cada pàgina de dist/:
// - `lang` del document igual a l'idioma de la ruta (/es/… → es; la resta → ca);
// - canonical propi (absolut i igual a la ruta), si la pàgina en declara;
// - títol i meta description presents i únics dins de cada idioma;
// - selector d'idioma: cada enllaç [data-lang-switch] apunta a una pàgina generada d'un altre idioma,
//   amb hreflang i lang coherents, i la pàgina de destí torna a enllaçar la d'origen (recíproc),
//   excepte les 404, que porten a la portada;
// - hreflang del <head>: només entre pàgines generades i sempre recíproc;
// - cap enllaç intern d'una pàgina castellana porta a una ruta catalana (ni a l'inrevés), llevat del
//   selector d'idioma;
// - textos alternatius (09/10/2026): cap alt no buit es repeteix igual a la versió de l'altre idioma;
// - àncores del selector (09/10/2026): si el selector no porta mapa, totes les àncores de la pàgina
//   existeixen a la de destí (són de la plantilla); si en porta (legals), cada àncora del mapa existeix
//   a l'origen i la seva equivalent, a la de destí.
// Ús: npm run build && npm run check:i18n
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { siteUrl } from '../src/config/site-url.mjs';

const DIST = 'dist';
if (!existsSync(join(DIST, 'index.html'))) {
  console.error('No hi ha build. Executa primer «npm run build».');
  process.exit(2);
}
const site = new URL(siteUrl).origin;

const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      if (name !== '_astro') walk(path);
    } else if (name === 'index.html') files.push(path);
  }
};
walk(DIST);

const routeOf = (file) => `/${relative(DIST, file).split(sep).slice(0, -1).join('/')}${file === join(DIST, 'index.html') ? '' : '/'}`.replace('//', '/');
const langOfRoute = (route) => (route.startsWith('/es/') ? 'es' : 'ca');
const is404 = (route) => /^\/([a-z]{2}\/)?404\/$/.test(route);

const pages = new Map();
for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const route = routeOf(file);
  const attr = (tag, key, value, wanted) => {
    for (const element of html.match(new RegExp(`<${tag}\\b[^>]*>`, 'g')) ?? []) {
      if (element.includes(`${key}="${value}"`)) return element.match(new RegExp(`\\b${wanted}="([^"]*)"`))?.[1];
    }
    return undefined;
  };
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? '';
  const header = html.match(/<header[\s\S]*?<\/header>/)?.[0] ?? '';
  const footer = html.match(/<footer[\s\S]*?<\/footer>/)?.[0] ?? '';
  pages.set(route, {
    route,
    lang: html.match(/<html[^>]*\blang="([^"]+)"/)?.[1],
    title: html.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim(),
    description: attr('meta', 'name', 'description', 'content'),
    canonical: attr('link', 'rel', 'canonical', 'href'),
    noindex: /<meta name="robots" content="[^"]*noindex/.test(html),
    hreflang: [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(([, lang, href]) => ({ lang, href })),
    switches: [...header.matchAll(/<a\b([^>]*\bdata-lang-switch\b[^>]*)>/g)].map(([, attrs]) => ({
      href: attrs.match(/\bhref="([^"]+)"/)?.[1],
      hreflang: attrs.match(/\bhreflang="([^"]+)"/)?.[1],
      lang: attrs.match(/\blang="([^"]+)"/)?.[1],
      anchorMap: attrs.match(/\bdata-anchor-map="([^"]*)"/)?.[1]?.replace(/&quot;/g, '"').replace(/&amp;/g, '&'),
    })),
    ids: new Set([...main.matchAll(/\bid="([^"]+)"/g)].map(([, id]) => id)),
    alts: new Set([...main.matchAll(/<img\b[^>]*\balt="([^"]+)"/g)].map(([, alt]) => alt)),
    links: [...`${header}${main}${footer}`.matchAll(/<a\b([^>]*)>/g)]
      .filter(([, attrs]) => !/\bdata-lang-switch\b/.test(attrs))
      .map(([, attrs]) => attrs.match(/\bhref="(\/[^"]*)"/)?.[1])
      .filter(Boolean),
  });
}

const errors = [];
const fail = (route, message) => errors.push(`${route}: ${message}`);

for (const page of pages.values()) {
  const expected = langOfRoute(page.route);
  if (page.lang !== expected) fail(page.route, `lang="${page.lang}", s'esperava «${expected}»`);
  if (page.canonical && page.canonical !== `${site}${page.route}`) fail(page.route, `canonical ${page.canonical} no és la ruta pròpia`);
  if (!page.title) fail(page.route, 'sense <title>');
  if (!page.description) fail(page.route, 'sense meta description');

  for (const link of page.links) {
    const path = link.split(/[?#]/)[0];
    if (!path || path === '/' && expected === 'ca') continue;
    if (/^\/(_astro|og)\//.test(path) || /\.[a-z0-9]+$/i.test(path)) continue;
    if (langOfRoute(path) !== expected && !(expected === 'ca' && path === '/')) fail(page.route, `enllaç intern a una altra llengua: ${link}`);
  }

  for (const target of page.switches) {
    const path = target.href?.split(/[?#]/)[0];
    const other = path && pages.get(path);
    if (!other) {
      fail(page.route, `el selector d'idioma apunta a ${target.href}, que no es genera`);
      continue;
    }
    if (target.hreflang !== other.lang || target.lang !== other.lang) fail(page.route, `selector cap a ${path}: hreflang/lang (${target.hreflang}/${target.lang}) no coincideixen amb ${other.lang}`);
    if (other.lang === page.lang) fail(page.route, `el selector apunta al mateix idioma (${path})`);
    if (!is404(page.route) && !other.switches.some((back) => back.href?.split(/[?#]/)[0] === page.route)) fail(page.route, `${path} no torna a enllaçar aquesta pàgina (selector no recíproc)`);
    if (is404(page.route)) continue;
    // Textos alternatius: un alt idèntic a les dues versions és un text sense traduir.
    for (const alt of page.alts) if (other.alts.has(alt)) fail(page.route, `alt sense traduir (igual a ${path}): «${alt}»`);
    // Àncores que el selector pot copiar.
    if (target.anchorMap) {
      const map = JSON.parse(target.anchorMap);
      for (const [from, to] of Object.entries(map)) {
        if (!page.ids.has(from)) fail(page.route, `l'àncora «${from}» del mapa del selector no existeix a la pàgina`);
        if (!other.ids.has(to)) fail(page.route, `l'àncora equivalent «${to}» no existeix a ${path}`);
      }
    } else {
      const missing = [...page.ids].filter((id) => !other.ids.has(id));
      if (missing.length) fail(page.route, `àncores que el selector copiaria i no existeixen a ${path}: ${missing.join(', ')}`);
    }
  }
  if (!is404(page.route) && !page.switches.length) fail(page.route, 'sense selector d\'idioma');

  for (const alternate of page.hreflang) {
    if (alternate.lang === 'x-default') continue;
    const path = alternate.href.replace(site, '');
    const other = pages.get(path);
    if (!other) fail(page.route, `hreflang ${alternate.lang} cap a ${path}, que no es genera`);
    else if (!other.hreflang.some((back) => back.href === `${site}${page.route}`)) fail(page.route, `hreflang cap a ${path} no recíproc`);
  }
}

for (const lang of ['ca', 'es']) {
  for (const key of ['title', 'description']) {
    const seen = new Map();
    for (const page of [...pages.values()].filter((item) => item.lang === lang)) {
      const value = page[key];
      if (value && seen.has(value)) fail(page.route, `${key} repetit amb ${seen.get(value)}`);
      else if (value) seen.set(value, page.route);
    }
  }
}

const byLang = (lang) => [...pages.values()].filter((page) => page.lang === lang).length;
console.log(`Pàgines: ${pages.size} (ca ${byLang('ca')} · es ${byLang('es')}). Amb hreflang al <head>: ${[...pages.values()].filter((page) => page.hreflang.length).length}.`);
if (errors.length) {
  console.error(`${errors.length} errors:`);
  for (const error of errors) console.error(`  ${error}`);
  process.exit(1);
}
console.log('Idioma, canonical, títols, descripcions, selector, hreflang i enllaços interns coherents.');
