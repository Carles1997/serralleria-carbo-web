// Protecció d'indexació per adreça (Fase 6, bloc 1, 08/10/2026). La comparteixen el generador dels
// fitxers de Netlify (src/integrations/netlify-files.mjs) i els validadors.
//
// Netlify serveix el mateix desplegament de producció a diverses adreces (el domini, el subdomini
// principal *.netlify.app i l'enllaç permanent de cada desplegament), i _headers no pot distingir
// adreces. Per això:
// - el build només és «definitiu» si és de producció a Netlify (CONTEXT=production) i l'adreça
//   principal del lloc (URL) és el `site` d'astro.config.mjs, és a dir, quan el domini ja és el
//   domini principal del lloc. Qualsevol altre build (local, àlies revisio-client, previsualitzacions,
//   branques o producció abans del llançament) porta `X-Robots-Tag: noindex` a totes les respostes;
// - en mode definitiu no hi ha capçalera global (cada pàgina decideix amb el seu `status`) i el
//   subdomini principal de Netlify i el domini sense www redirigeixen al domini amb una regla de
//   domini de _redirects, abans de les regles de camí.
// robots.txt no canvia: un bloqueig de rastreig impediria que Google llegís el noindex.

/**
 * @param {string | URL} site Adreça del lloc definitiu (`site` d'astro.config.mjs).
 * @param {NodeJS.ProcessEnv} env Variables del build (Netlify defineix CONTEXT, URL i SITE_NAME).
 * @returns {{ definitive: boolean, reason: string, site: string, siteName?: string }}
 */
export function indexingMode(site, env = process.env) {
  const origin = new URL(site).origin;
  const context = env.CONTEXT;
  const url = env.URL ? safeOrigin(env.URL) : undefined;
  if (context !== 'production') {
    return { definitive: false, reason: context ? `context de Netlify «${context}»` : 'build fora de Netlify (sense CONTEXT)', site: origin };
  }
  if (url !== origin) {
    return { definitive: false, reason: `producció amb adreça principal ${url ?? '(sense URL)'}, no ${origin}`, site: origin };
  }
  if (!env.SITE_NAME) throw new Error('Build de producció definitiu sense SITE_NAME: no es pot redirigir el subdomini de Netlify.');
  return { definitive: true, reason: `producció amb adreça principal ${origin}`, site: origin, siteName: env.SITE_NAME };
}

function safeOrigin(value) {
  try {
    return new URL(value).origin;
  } catch {
    return value;
  }
}

/** Bloc que s'afegeix a dist/_headers fora del mode definitiu. */
export function noindexHeaders() {
  return [
    '',
    '# Generat per src/integrations/netlify-files.mjs (scripts/lib/indexing-policy.mjs): aquest build no és',
    '# la producció del domini definitiu i cap adreça on se serveixi no s\'ha d\'indexar.',
    '/*',
    '  X-Robots-Tag: noindex',
    '',
  ].join('\n');
}

/**
 * Regles de domini del mode definitiu: el subdomini principal de Netlify i el domini sense www (o
 * amb www, si el principal no en porta) redirigeixen al domini definitiu conservant el camí.
 * @param {ReturnType<typeof indexingMode>} mode
 * @returns {string[]}
 */
export function domainRedirects(mode) {
  if (!mode.definitive) return [];
  const { host } = new URL(mode.site);
  const alternate = host.startsWith('www.') ? host.slice(4) : `www.${host}`;
  return [
    `https://${mode.siteName}.netlify.app/*  ${mode.site}/:splat  301!`,
    `http://${alternate}/*  ${mode.site}/:splat  301!`,
    `https://${alternate}/*  ${mode.site}/:splat  301!`,
  ];
}
