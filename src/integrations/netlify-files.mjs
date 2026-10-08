// Fitxers de Netlify generats al final del build (allotjament decidit pel director el 02/10/2026).
// - dist/_redirects: només les regles «llestes» del mapa src/config/redirects.mjs, amb la mateixa
//   avaluació que npm run check:redirects (scripts/lib/redirect-plan.mjs). Les regles en espera o
//   per decidir s'hi afegeixen soles quan es resolen.
// - Protecció d'indexació (scripts/lib/indexing-policy.mjs, Fase 6, 08/10/2026): fora del build
//   definitiu, dist/_headers rep `X-Robots-Tag: noindex` per a totes les respostes; al build
//   definitiu, _redirects comença amb les regles de domini (subdomini de Netlify i variant www).
// Les capçaleres de memòria cau i seguretat són estàtiques: public/_headers.
import { appendFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { evaluateRedirects, netlifyRedirects } from '../../scripts/lib/redirect-plan.mjs';
import { domainRedirects, indexingMode, noindexHeaders } from '../../scripts/lib/indexing-policy.mjs';

/** @returns {import('astro').AstroIntegration} */
export default function netlifyFiles() {
  /** @type {URL | undefined} */
  let site;
  return {
    name: 'serralleria-netlify-files',
    hooks: {
      'astro:config:done': ({ config }) => {
        site = config.site ? new URL(config.site) : undefined;
      },
      'astro:build:done': ({ dir, logger }) => {
        if (!site) throw new Error('Cal `site` a astro.config.mjs per decidir la protecció d\'indexació.');
        const dist = fileURLToPath(dir);
        const { rows, errors } = evaluateRedirects({ dist });
        if (errors.length) throw new Error(`Mapa de redireccions amb errors:\n${errors.join('\n')}`);

        const mode = indexingMode(site);
        const domainRules = domainRedirects(mode);
        writeFileSync(new URL('_redirects', dir), netlifyRedirects(rows, domainRules));
        logger.info(`_redirects: ${rows.filter((row) => row.state === 'llesta').length} regles llestes${domainRules.length ? ` i ${domainRules.length} de domini` : ''}`);

        if (mode.definitive) {
          logger.info(`indexació: build definitiu (${mode.reason}); cada pàgina segueix el seu estat`);
        } else {
          appendFileSync(new URL('_headers', dir), noindexHeaders());
          logger.info(`indexació: X-Robots-Tag noindex a tot el build (${mode.reason})`);
        }
      },
    },
  };
}
