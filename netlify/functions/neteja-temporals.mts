// Neteja horària de les dades temporals del formulari (pla 8.5, §4.5): comptadors de freqüència de les
// hores anteriors i referències de més d'una hora. Netlify només l'executa al desplegament publicat; a
// `revisio-client` cal executar-la amb «Run now» després de les proves.
import { netlifyStore } from '../../src/lib/contact/netlify-store.ts';
import { sweep } from '../../src/lib/contact/references.ts';

export default async () => {
  const removed = await sweep(netlifyStore(), Date.now());
  console.log(JSON.stringify({ event: 'neteja-temporals', ...removed }));
};

export const config = { schedule: '5 * * * *' };
