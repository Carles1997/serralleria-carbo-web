// Comprovació en viu de les redireccions i de la protecció d'indexació contra una adreça publicada
// (previsualització, domini definitiu o les comprovacions posteriors al llançament).
// Fa servir la mateixa avaluació que el build (scripts/lib/redirect-plan.mjs): només les regles
// «llestes» han de funcionar; les que estan en espera, per decidir o sense tractament es llisten com
// a informació, amb la resposta actual.
// Per a cada regla llesta, amb barra final i sense:
// - 301: una sola resposta 301, `Location` exacta cap al destí i destí que respon 200;
// - 410: resposta 410 directa, sense `Location`.
// Les URL que es mantenen (/ i /contacte/) han de respondre 200 sense redirecció.
// Indexació: al domini definitiu (site-url.mjs) no hi pot haver `X-Robots-Tag: noindex`; a qualsevol
// altra adreça hi ha de ser.
// Ús: npm run build && npm run check:redirects:live -- https://revisio-client--serralleriacarbo.netlify.app
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { undecided, unchanged } from '../src/config/redirects.mjs';
import { siteUrl } from '../src/config/site-url.mjs';
import { evaluateRedirects } from './lib/redirect-plan.mjs';

const MAX_HOPS = 5;
const base = process.argv[2];
if (!base || !/^https?:\/\//.test(base)) {
  console.error('Indica l\'adreça base, per exemple: npm run check:redirects:live -- https://revisio-client--serralleriacarbo.netlify.app');
  process.exit(2);
}
if (!existsSync(join('dist', 'index.html'))) {
  console.error('No hi ha build. Executa primer «npm run build».');
  process.exit(2);
}
const origin = new URL(base).origin;
const definitive = origin === new URL(siteUrl).origin;

/** Segueix la cadena manualment i en retorna cada resposta. */
async function chain(path) {
  const hops = [];
  let url = new URL(path, origin).href;
  for (let i = 0; i <= MAX_HOPS; i += 1) {
    const response = await fetch(url, { redirect: 'manual', headers: { 'User-Agent': 'serralleria-check-live-redirects' } });
    await response.body?.cancel();
    const location = response.headers.get('location');
    hops.push({ url, status: response.status, location: location ? new URL(location, url).href : null, robots: response.headers.get('x-robots-tag') });
    if (![301, 302, 307, 308].includes(response.status) || !location) break;
    url = hops.at(-1).location;
  }
  return hops;
}

const describe = (hops) => hops.map((hop) => `${hop.status}${hop.location ? ` → ${hop.location.replace(origin, '')}` : ''}`).join(' · ');

const failures = [];
const check = (ok, label, detail) => {
  console.log(`  ${ok ? 'ok   ' : 'FALLA'} ${label}  ${detail}`);
  if (!ok) failures.push(`${label}: ${detail}`);
};

const { rows, errors } = evaluateRedirects({ dist: 'dist' });
if (errors.length) {
  console.error(`El mapa de redireccions té errors (npm run check:redirects):\n${errors.join('\n')}`);
  process.exit(1);
}

console.log(`Adreça: ${origin} (${definitive ? 'domini definitiu' : 'adreça de prova'})`);
console.log('Regles llestes:');
for (const { rule, state, target } of rows.filter((row) => row.state === 'llesta')) {
  for (const path of [rule.from, rule.from.replace(/\/$/, '')]) {
    const hops = await chain(path);
    const first = hops[0];
    if (rule.status === 301) {
      const expected = new URL(target, origin).href;
      const last = hops.at(-1);
      const ok = first.status === 301 && first.location === expected && hops.length === 2 && last.status === 200;
      check(ok, `301 ${path}`, `${describe(hops)} (esperat: 301 → ${target} · 200, un salt)`);
    } else {
      check(first.status === 410 && !first.location, `410 ${path}`, describe(hops));
    }
  }
}

console.log('URL que es mantenen:');
for (const path of unchanged) {
  const hops = await chain(path);
  check(hops.length === 1 && hops[0].status === 200, `200 ${path}`, describe(hops));
}

console.log('Protecció d\'indexació (X-Robots-Tag):');
for (const path of ['/', '/particulars/projectes/', '/legal/privacitat/', '/comprovacio-indexacio-inexistent/']) {
  const [hop] = await chain(path);
  const noindex = /noindex/i.test(hop.robots ?? '');
  check(definitive ? !noindex : noindex, `${path}`, `${hop.status} · X-Robots-Tag: ${hop.robots ?? '(cap)'} (esperat: ${definitive ? 'cap noindex' : 'noindex'})`);
}

console.log('Informació (sense regla activa; no es valida):');
for (const { rule, state } of rows.filter((row) => row.state !== 'llesta')) {
  console.log(`  ${state.padEnd(7)} ${rule.status} ${rule.from}  ${describe(await chain(rule.from))}`);
}
for (const { from } of undecided) console.log(`  sense decisió ${from}  ${describe(await chain(from))}`);

if (failures.length) {
  console.error(`${failures.length} comprovacions fallides.`);
  process.exit(1);
}
console.log('Totes les comprovacions són correctes.');
