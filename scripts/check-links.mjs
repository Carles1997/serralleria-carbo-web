// Comprova que tots els enllaços interns (<a href>) del build resolen: rutes a pàgines
// generades a dist/ i àncores (#id) a elements existents. També valida dist/sitemap.xml. Pendent global de navegació
// (fases/fase-5/FASE5-pendents.md): cal que surti net abans de la previsualització per al client.
// Ús: npm run build && npm run check:links
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = 'dist';
if (!existsSync(DIST)) {
  console.error('No hi ha build. Executa primer «npm run build».');
  process.exit(2);
}

const pages = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith('.html')) pages.push(path);
  }
})(DIST);

/** Ruta pública d'un fitxer del build: dist/a/b/index.html → /a/b/ */
const routeOf = (file) => {
  const rel = relative(DIST, file).split(sep).join('/');
  return rel === 'index.html' ? '/' : `/${rel.replace(/index\.html$/, '').replace(/\.html$/, '')}`;
};

if (!pages.length) {
  console.error('El build no té cap pàgina: comprova que «npm run build» hagi acabat bé.');
  process.exit(2);
}

const html = new Map(pages.map((file) => [routeOf(file), readFileSync(file, 'utf8')]));
const idsOf = (source) => new Set([...source.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));

/** Fitxer del build que serviria una ruta interna. */
function resolves(pathname) {
  if (pathname === '/') return existsSync(join(DIST, 'index.html'));
  const clean = decodeURIComponent(pathname).replace(/^\//, '');
  if (pathname.endsWith('/')) return existsSync(join(DIST, clean, 'index.html'));
  return existsSync(join(DIST, clean)) && statSync(join(DIST, clean)).isFile();
}

const broken = new Map(); // destí → pàgines que hi enllacen
let checked = 0;
for (const [route, source] of html) {
  if (route === '/404') continue; // La pàgina d'error només enllaça a destins ja comprovats des d'altres pàgines.
  const ids = idsOf(source);
  for (const [, raw] of source.matchAll(/<a\b[^>]*?\shref="([^"]+)"/g)) {
    const href = raw.replaceAll('&amp;', '&');
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;
    checked++;
    const url = new URL(href, `https://local${route}`);
    const samePage = href.startsWith('#');
    const ok = samePage
      ? !url.hash || ids.has(decodeURIComponent(url.hash.slice(1)))
      : resolves(url.pathname) && (!url.hash || idsOf(html.get(url.pathname) ?? '').has(decodeURIComponent(url.hash.slice(1))));
    if (ok) continue;
    const target = samePage ? `${route}${href}` : href;
    broken.set(target, [...(broken.get(target) ?? []), route]);
  }
}

console.log(`${pages.length} pàgines, ${checked} enllaços interns comprovats.`);
if (broken.size) {
  console.error(`${broken.size} destins trencats:`);
  for (const [target, from] of [...broken].sort()) console.error(`  ${target}  ← ${[...new Set(from)].join(', ')}`);
}

// Sitemap (FASE5-indexacio.md): cada URL ha d'existir al build, ser indexable (sense noindex) i
// declarar-se a si mateixa com a canonical; les alternatives hreflang també han d'existir.
const sitemapIssues = [];
const sitemapFile = join(DIST, 'sitemap.xml');
let sitemapUrls = 0;
if (!existsSync(sitemapFile)) sitemapIssues.push('falta dist/sitemap.xml');
else {
  const xml = readFileSync(sitemapFile, 'utf8');
  for (const [, loc] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    sitemapUrls++;
    const { pathname } = new URL(loc);
    const source = html.get(pathname);
    if (!source) { sitemapIssues.push(`${loc}: no existeix al build`); continue; }
    if (/<meta name="robots" content="[^"]*noindex/.test(source)) sitemapIssues.push(`${loc}: porta noindex`);
    const canonical = source.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    if (canonical !== loc) sitemapIssues.push(`${loc}: canonical ${canonical ?? 'absent'}`);
  }
  for (const [, href] of xml.matchAll(/hreflang="[^"]+" href="([^"]+)"/g)) {
    if (!html.has(new URL(href).pathname)) sitemapIssues.push(`${href}: alternativa hreflang sense pàgina`);
  }
}
console.log(`Sitemap: ${sitemapUrls} URL${sitemapUrls === 1 ? '' : 's'} indexable${sitemapUrls === 1 ? '' : 's'}.`);
for (const issue of sitemapIssues) console.error(`  Sitemap: ${issue}`);

if (!broken.size && !sitemapIssues.length) {
  console.log('Tots els destins resolen.');
  process.exit(0);
}
process.exit(1);
