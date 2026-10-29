// Avaluació del mapa de redireccions (src/config/redirects.mjs) contra el contingut i el build.
// La comparteixen el validador (scripts/check-redirects.mjs) i el generador del fitxer de Netlify
// (src/integrations/netlify-files.mjs), de manera que «llesta» vol dir el mateix als dos llocs.
// Estats de cada regla:
// - llesta: el destí es genera al build i no queda cap comprovació ni decisió pendent;
// - espera: falta la pàgina de destí (traducció, legal pendent…) o una comprovació humana;
// - decidir: tria pendent del director.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { redirects, unchanged } from '../../src/config/redirects.mjs';

/** pageId + idioma → ruta, llegit del frontmatter de content/{idioma}/*.md. */
function contentRoutes(contentDir) {
  const routes = new Map();
  for (const lang of readdirSync(contentDir, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name)) {
    for (const file of readdirSync(join(contentDir, lang)).filter((name) => name.endsWith('.md'))) {
      const frontmatter = readFileSync(join(contentDir, lang, file), 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
      const field = (name) => frontmatter.match(new RegExp(`^${name}:\\s*["']?(.+?)["']?\\s*$`, 'm'))?.[1];
      const pageId = field('pageId');
      if (pageId) routes.set(`${field('lang') ?? lang}:${pageId}`, field('route'));
    }
  }
  return routes;
}

/**
 * @param {{ dist: string, contentDir?: string }} options
 * @returns {{ rows: { rule: any, state: string, target: string, draft: boolean, pending: string[] }[], errors: string[] }}
 */
export function evaluateRedirects({ dist, contentDir = 'content' }) {
  const routes = contentRoutes(contentDir);
  const builtPage = (route) => {
    const file = join(dist, route.replace(/^\//, ''), 'index.html');
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
  return { rows, errors };
}

/**
 * Fitxer `_redirects` de Netlify amb només les regles llestes. Els 410 serveixen la pàgina 404 del
 * build amb l'estat 410 (reescriptura amb estat propi, admesa per Netlify).
 */
/**
 * 404 de cada idioma amb prefix (08/10/2026): Netlify serveix la del seu idioma a les adreces
 * inexistents de /es/…; la resta fa servir la 404.html arrel. Regles al final del fitxer, sense
 * forçar, perquè només s'apliquin quan no hi ha cap fitxer.
 * @param {string} dist
 * @returns {string[]}
 */
export function localeNotFoundRules(dist) {
  if (!existsSync(dist)) return [];
  return readdirSync(dist, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^[a-z]{2}$/.test(entry.name) && existsSync(join(dist, entry.name, '404', 'index.html')))
    .map((entry) => `/${entry.name}/*  /${entry.name}/404/index.html  404`)
    .sort();
}

export function netlifyRedirects(rows, domainRules = [], notFoundRules = []) {
  const ready = rows.filter((row) => row.state === 'llesta');
  const lines = [
    '# Generat per src/integrations/netlify-files.mjs a partir de src/config/redirects.mjs.',
    '# Només hi entren les regles «llestes» (npm run check:redirects). No editar a mà.',
  ];
  if (domainRules.length) {
    lines.push('# Regles de domini (scripts/lib/indexing-policy.mjs): només al build definitiu, abans de les de camí.');
    lines.push(...domainRules);
  }
  for (const { rule, target } of ready) {
    lines.push(rule.status === 301 ? `${rule.from}  ${target}  301` : `${rule.from}  /404.html  410`);
  }
  if (notFoundRules.length) {
    lines.push('# 404 per idioma: només quan no hi ha cap fitxer a l\'adreça demanada.');
    lines.push(...notFoundRules);
  }
  return `${lines.join('\n')}\n`;
}
