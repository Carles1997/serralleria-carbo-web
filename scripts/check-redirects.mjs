// Valida el mapa de redireccions independent del proveïdor (src/config/redirects.mjs) contra el
// contingut i el build, i en mostra l'estat de cada regla. No genera cap fitxer de proveïdor.
// Errors (surt amb codi 1): URL d'origen mal formades o repetides, un origen que taparia una pàgina
// generada, cadenes (el destí és l'origen d'una altra regla), destins inexistents al contingut
// català i regles 301/410 incompletes. Estats de cada regla:
// - llesta: el destí es genera al build i no queda cap comprovació ni decisió pendent;
// - espera: falta la pàgina de destí (traducció, legal pendent…) o una comprovació humana;
// - decidir: tria pendent del director.
// Un destí encara en esborrany (noindex) s'indica, però no bloqueja: l'estat de publicació de les
// pàgines el controlen el sitemap i check:links.
// Ús: npm run build && npm run check:redirects
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { redirects, unchanged } from '../src/config/redirects.mjs';

const DIST = 'dist';
if (!existsSync(join(DIST, 'index.html'))) {
  console.error('No hi ha build. Executa primer «npm run build».');
  process.exit(2);
}

// pageId + idioma → ruta, llegit del frontmatter de content/{idioma}/*.md.
const routes = new Map();
for (const lang of readdirSync('content', { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name)) {
  for (const file of readdirSync(join('content', lang)).filter((name) => name.endsWith('.md'))) {
    const frontmatter = readFileSync(join('content', lang, file), 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
    const field = (name) => frontmatter.match(new RegExp(`^${name}:\\s*["']?(.+?)["']?\\s*$`, 'm'))?.[1];
    const pageId = field('pageId');
    if (pageId) routes.set(`${field('lang') ?? lang}:${pageId}`, field('route'));
  }
}

const builtPage = (route) => {
  const file = join(DIST, route.replace(/^\//, ''), 'index.html');
  return existsSync(file) ? readFileSync(file, 'utf8') : undefined;
};

const errors = [];
const sources = new Set();
for (const rule of redirects) {
  if (!/^\/([a-z0-9_-]+\/)*$/.test(rule.from)) errors.push(`${rule.from}: l'origen ha de ser un camí en minúscules que comenci i acabi amb «/»`);
  if (sources.has(rule.from)) errors.push(`${rule.from}: origen repetit`);
  sources.add(rule.from);
  if (unchanged.includes(rule.from)) errors.push(`${rule.from}: és una URL que es manté i no pot portar regla`);
  if (builtPage(rule.from) !== undefined) errors.push(`${rule.from}: el build ja hi genera una pàgina; la regla la taparia`);
  if (rule.status === 301 && !rule.to) errors.push(`${rule.from}: un 301 necessita destí`);
  if (rule.status === 410 && 'to' in rule) errors.push(`${rule.from}: un 410 no porta destí`);
  if (![301, 410].includes(rule.status)) errors.push(`${rule.from}: estat ${rule.status} no previst (301 o 410)`);
}
for (const route of unchanged) if (builtPage(route) === undefined) errors.push(`${route}: es manté la URL, però el build no hi genera cap pàgina`);

const rows = [];
for (const rule of redirects) {
  const pending = [...(rule.requires ?? [])];
  let target = '—';
  let draft = false;
  if (rule.status === 301 && rule.to) {
    const { pageId, lang } = rule.to;
    const route = routes.get(`${lang}:${pageId}`);
    target = route ?? `[${lang}] ${pageId}`;
    if (!routes.has(`${lang}:${pageId}`) && lang === 'ca') errors.push(`${rule.from}: no hi ha cap pàgina «${pageId}» a content/ca/`);
    else if (!route) pending.unshift(`falta la versió ${lang.toUpperCase()} de «${pageId}»`);
    else {
      if (sources.has(route)) errors.push(`${rule.from}: cadena, el destí ${route} és l'origen d'una altra regla`);
      const html = builtPage(route);
      if (html === undefined) pending.unshift(`la pàgina ${route} encara no es genera`);
      else draft = /<meta name="robots" content="[^"]*noindex/.test(html);
    }
  }
  const state = errors.some((error) => error.startsWith(`${rule.from}:`)) ? 'error' : rule.decision ? 'decidir' : pending.length ? 'espera' : 'llesta';
  rows.push({ rule, state, target, draft, pending });
}

const count = (status) => redirects.filter((rule) => rule.status === status).length;
console.log(`Mapa de redireccions: ${redirects.length} URL antigues (${count(301)} × 301, ${count(410)} × 410); es mantenen ${unchanged.join(' i ')}.`);
for (const { rule, state, target, draft, pending } of rows) {
  const arrow = rule.status === 301 ? ` → ${target}` : '';
  console.log(`  ${state.padEnd(8)} ${rule.status} ${rule.from}${arrow}${draft ? ' (destí en esborrany, noindex)' : ''}`);
  for (const item of pending) console.log(`             · ${item}`);
  if (rule.decision) console.log(`             · ${rule.decision}`);
}
const tally = (state) => rows.filter((row) => row.state === state).length;
console.log(`Llestes: ${tally('llesta')} · En espera: ${tally('espera')} · Per decidir: ${tally('decidir')}.`);

if (errors.length) {
  console.error(`${errors.length} errors:`);
  for (const error of errors) console.error(`  ${error}`);
  process.exit(1);
}
console.log('Sense errors: cap origen repetit ni que tapi una pàgina, cap cadena i tots els destins identificats.');
