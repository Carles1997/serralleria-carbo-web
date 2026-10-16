// Empremtes que Astro no calcula per a la Content-Security-Policy (tasca 8.9, 16/10/2026).
// El script inicial de BaseLayout (is:inline) s'insereix tal qual des de src/scripts/early-flags.inline.js;
// l'empremta es calcula del mateix fitxer, de manera que contingut i empremta no es poden desincronitzar.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

const earlyFlags = readFileSync(new URL('../scripts/early-flags.inline.js', import.meta.url), 'utf8');

/** @type {`sha256-${string}`} */
export const earlyFlagsHash = `sha256-${createHash('sha256').update(earlyFlags).digest('base64')}`;
