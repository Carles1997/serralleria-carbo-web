// Valida el mapa de redireccions (src/config/redirects.mjs) contra el contingut i el build, i en
// mostra l'estat de cada regla. L'avaluació és a scripts/lib/redirect-plan.mjs, la mateixa que fa
// servir el generador del `_redirects` de Netlify (src/integrations/netlify-files.mjs); aquí també es
// comprova que el fitxer generat a dist/ conté exactament les regles llestes.
// Errors (surt amb codi 1): URL d'origen mal formades o repetides, un origen que taparia una pàgina
// generada, cadenes (el destí és l'origen d'una altra regla), destins inexistents al contingut
// català, regles 301/410 incompletes i un dist/_redirects desfasat.
// Un destí encara en esborrany (noindex) s'indica, però no bloqueja: l'estat de publicació de les
// pàgines el controlen el sitemap i check:links.
// Ús: npm run build && npm run check:redirects
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { redirects, unchanged } from '../src/config/redirects.mjs';
import { evaluateRedirects, netlifyRedirects } from './lib/redirect-plan.mjs';

const DIST = 'dist';
if (!existsSync(join(DIST, 'index.html'))) {
  console.error('No hi ha build. Executa primer «npm run build».');
  process.exit(2);
}

const { rows, errors } = evaluateRedirects({ dist: DIST });

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

const generated = join(DIST, '_redirects');
if (!existsSync(generated)) errors.push('dist/_redirects no existeix: el build no ha generat el fitxer de Netlify');
else if (readFileSync(generated, 'utf8') !== netlifyRedirects(rows)) errors.push('dist/_redirects no coincideix amb les regles llestes: torna a fer el build');
else console.log(`dist/_redirects: ${tally('llesta')} regles llestes (Netlify).`);

if (errors.length) {
  console.error(`${errors.length} errors:`);
  for (const error of errors) console.error(`  ${error}`);
  process.exit(1);
}
console.log('Sense errors: cap origen repetit ni que tapi una pàgina, cap cadena i tots els destins identificats.');
