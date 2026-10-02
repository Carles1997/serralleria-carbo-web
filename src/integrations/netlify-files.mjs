// Fitxers de Netlify generats al final del build (allotjament decidit pel director el 02/10/2026).
// - dist/_redirects: només les regles «llestes» del mapa src/config/redirects.mjs, amb la mateixa
//   avaluació que npm run check:redirects (scripts/lib/redirect-plan.mjs). Les regles en espera o
//   per decidir s'hi afegeixen soles quan es resolen.
// Les capçaleres (memòria cau i seguretat) són estàtiques: public/_headers.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { evaluateRedirects, netlifyRedirects } from '../../scripts/lib/redirect-plan.mjs';

/** @returns {import('astro').AstroIntegration} */
export default function netlifyFiles() {
  return {
    name: 'serralleria-netlify-files',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const dist = fileURLToPath(dir);
        const { rows, errors } = evaluateRedirects({ dist });
        if (errors.length) throw new Error(`Mapa de redireccions amb errors:\n${errors.join('\n')}`);
        writeFileSync(new URL('_redirects', dir), netlifyRedirects(rows));
        logger.info(`_redirects: ${rows.filter((row) => row.state === 'llesta').length} regles llestes`);
      },
    },
  };
}
