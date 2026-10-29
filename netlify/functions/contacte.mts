// Funció del formulari de contacte (Fase 8, tasca 8.5): fases/fase-8/FASE8-formulari-real-pla.md.
// Per defecte, mode «dry-run»: valida i respon, però no envia res. Les credencials de Microsoft 365 les
// introdueix l'administrador a les variables d'entorn de Netlify (mai al repositori ni per xat).
import { readGraphConfig, sendMail } from '../../src/lib/contact/graph.ts';
import { handleContact, resolveFingerprintSecret, resolveMode } from '../../src/lib/contact/handler.ts';
import { netlifyStore } from '../../src/lib/contact/netlify-store.ts';
import { sweep } from '../../src/lib/contact/references.ts';

interface NetlifyContext {
  ip?: string;
  deploy?: { context?: string };
  waitUntil?: (promise: Promise<unknown>) => void;
}

// Només en «dry-run»: sense RL_SECRET, l'empremta fa servir un secret de la instància (el límit per
// connexió no es comparteix entre instàncies). En «test» i «live», RL_SECRET és obligatori.
const fallbackSecret = `${crypto.randomUUID()}${crypto.randomUUID()}`;
// Identificador aleatori d'aquesta instància (no és cap dada personal ni deriva del secret). Va als
// registres, amb l'origen del secret de l'empremta, per saber quines instàncies han atès les peticions
// i si comparteixen el secret estable (proves de 8.5 a Netlify, 15/10/2026).
const instance = crypto.randomUUID().slice(0, 8);
// Neteja oportunista (§4.5), com a molt cada 10 minuts per instància. La programada és neteja-temporals.
let lastSweep = 0;

export default async (request: Request, context: NetlifyContext) => {
  const env = process.env;
  const mode = resolveMode(env.FORM_MODE, context.deploy?.context);
  const graph = readGraphConfig(env);
  const store = netlifyStore();
  if (Date.now() - lastSweep > 10 * 60_000) {
    lastSweep = Date.now();
    const cleaning = sweep(store, Date.now()).catch(() => undefined);
    if (context.waitUntil) context.waitUntil(cleaning);
    else await cleaning;
  }
  const fingerprintSecret = resolveFingerprintSecret(mode, env.RL_SECRET, fallbackSecret);
  // Origen del secret, mai el valor: «estable» (RL_SECRET), «instancia» (provisional, només dry-run) o «cap».
  const secret = fingerprintSecret === undefined ? 'cap' : fingerprintSecret === fallbackSecret ? 'instancia' : 'estable';
  return handleContact(request, {
    mode,
    store,
    environment: context.deploy?.context ?? 'desconegut',
    ip: context.ip ?? '0.0.0.0',
    fingerprintSecret,
    now: Date.now,
    send: graph ? (payload) => sendMail(graph, payload, { fetch, now: Date.now, sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)) }) : undefined,
    log: (entry) => console.log(JSON.stringify({ ...entry, instance, secret })),
  });
};

export const config = {
  path: '/api/contacte',
  // Capa 1 del control de freqüència (§4.3): aproximada, la gestiona Netlify abans d'executar la funció.
  rateLimit: { windowLimit: 5, windowSize: 60, aggregateBy: ['ip', 'domain'] },
};
