// Recorregut d'una consulta a la funció de Netlify (pla 8.5, §4.1): validar, antispam, reservar la
// referència, comptar la freqüència i, segons el mode, enviar o no. Respon en JSON a l'enviament amb
// JavaScript i en HTML a l'enviament nadiu. No depèn de Netlify: les dependències arriben per `deps`.
import { FAST_SUBMIT_MS, LOCALES, MAX_LINKS, MAX_REQUEST_BYTES, MIN_RL_SECRET_LENGTH, RATE_LIMIT_PER_HOUR, type FormLocale } from './config.ts';
import { graphMessage, type FormMode, type Signal } from './mail.ts';
import { contactMessages } from './messages.ts';
import { claim, doneState, referenceScope, settle } from './references.ts';
import { newReference, validateSubmission, type Field, type Submission } from './schema.ts';
import type { SendResult } from './graph.ts';
import type { KvStore } from './store.ts';
import { consume, fingerprint } from './throttle.ts';

export interface HandlerDeps {
  mode: FormMode;
  /** Sense magatzem (o si falla) no hi ha control de freqüència ni de duplicats: s'accepta igualment. */
  store: KvStore | undefined;
  /** Context del desplegament (production, branch-deploy, deploy-preview…). Separa referències i comptadors. */
  environment: string;
  ip: string;
  /** Secret estable de l'empremta (resolveFingerprintSecret). Sense secret, en «test» i «live» no s'accepta res. */
  fingerprintSecret: string | undefined;
  now: () => number;
  /** Enviament real (modes «test» i «live»). En «dry-run» no es crida mai. */
  send?: (payload: ReturnType<typeof graphMessage>) => Promise<SendResult>;
  log: (entry: Record<string, unknown>) => void;
}

export type State = 'dry-run' | 'sent' | 'invalid' | 'too-large' | 'file-type' | 'in-progress' | 'rate-limited' | 'failed' | 'bad-request';

interface Outcome {
  status: number;
  state: State;
  message: string;
  ref?: string;
  duplicate?: boolean;
  errors?: Partial<Record<Field, string>>;
}

export function antispamSignals(data: Pick<Submission, 'temps' | 'descripcio'>): Signal[] {
  const signals: Signal[] = [];
  if (data.temps !== undefined && data.temps < FAST_SUBMIT_MS) {
    signals.push({ code: 'rapid', detail: `enviament ràpid (${(data.temps / 1000).toLocaleString('ca-ES', { maximumFractionDigits: 1 })} s)` });
  }
  const links = data.descripcio.match(/\bhttps?:\/\/|\bwww\./gi)?.length ?? 0;
  if (links > MAX_LINKS) signals.push({ code: 'enllacos', detail: `${links} enllaços a la descripció` });
  return signals;
}

const escape = (value: string) => value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

function htmlPage(locale: FormLocale, outcome: Outcome) {
  const m = contactMessages[locale];
  const errors = Object.entries(outcome.errors ?? {});
  const list = errors.length
    ? `<p><strong>${escape(m.page.errorsTitle)}</strong></p><ul>${errors.map(([field, message]) => `<li><strong>${escape(m.fieldLabels[field as Field])}:</strong> ${escape(message!)}</li>`).join('')}</ul><p>${escape(m.page.backHint)}</p>`
    : '';
  return `<!doctype html>
<html lang="${locale}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${escape(m.page.title)} · Serralleria Carbó</title>
<style>
:root { color-scheme: light; }
body { margin: 0; background: #ffffff; color: #2b2b2b; font: 1.0625rem/1.55 "Source Sans 3", system-ui, sans-serif; }
main { max-width: 40rem; margin: 0 auto; padding: 3rem 1rem; }
h1 { margin: 0 0 1rem; font-size: 1.75rem; line-height: 1.2; }
.status { margin: 0 0 1.5rem; padding: .8rem 1rem; border-left: 4px solid #7c2a30; background: #ffffff; }
a { color: #7c2a30; text-underline-offset: .2em; }
a:focus-visible { outline: 3px solid #7c2a30; outline-offset: 3px; }
</style>
</head>
<body>
<main>
<h1>Serralleria Carbó</h1>
<p class="status" role="status">${escape(outcome.message)}</p>
${list}
<p><a href="${m.contactPath}">${escape(m.page.back)}</a></p>
</main>
</body>
</html>`;
}

// Content-Security-Policy de les respostes de la funció (tasca 8.9, 16/10/2026). El JSON no carrega res. La
// pàgina sense JavaScript només té el bloc <style> fix d'htmlPage() i enllaços: cap script, imatge,
// font ni formulari, i no es pot incrustar en cap marc.
const CSP_JSON = "default-src 'none'; frame-ancestors 'none'";
const CSP_HTML = "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'";

function respond(request: Request, locale: FormLocale, outcome: Outcome) {
  const headers = new Headers({ 'cache-control': 'no-store', 'x-robots-tag': 'noindex', 'x-content-type-options': 'nosniff' });
  if (outcome.status === 405) headers.set('allow', 'POST');
  if ((request.headers.get('accept') ?? '').includes('application/json')) {
    headers.set('content-type', 'application/json; charset=utf-8');
    headers.set('content-security-policy', CSP_JSON);
    const { status, ...body } = outcome;
    return new Response(JSON.stringify({ ok: status === 200, ...body }), { status, headers });
  }
  headers.set('content-type', 'text/html; charset=utf-8');
  headers.set('content-security-policy', CSP_HTML);
  return new Response(htmlPage(locale, outcome), { status: outcome.status, headers });
}

export async function handleContact(request: Request, deps: HandlerDeps): Promise<Response> {
  const queryLocale = new URL(request.url).searchParams.get('idioma');
  let locale: FormLocale = (LOCALES as readonly string[]).includes(queryLocale ?? '') ? (queryLocale as FormLocale) : 'ca';
  let m = contactMessages[locale];
  const log = (entry: Record<string, unknown>) => deps.log({ event: 'contacte', mode: deps.mode, ...entry });

  if (request.method !== 'POST') return respond(request, locale, { status: 405, state: 'bad-request', message: m.badRequest });
  // Configuració incompleta (§4.4): sense un RL_SECRET estable, el comptador no es comparteix entre
  // instàncies. Error controlat, abans de llegir la consulta i sense enviar res.
  if (!deps.fingerprintSecret) {
    log({ result: 'failed', code: 'rl_secret_missing' });
    return respond(request, locale, { status: 503, state: 'failed', message: m.failed });
  }
  const length = Number(request.headers.get('content-length') ?? '0');
  if (length > MAX_REQUEST_BYTES) {
    log({ result: 'too-large', bytes: length });
    return respond(request, locale, { status: 413, state: 'too-large', message: m.errors.fileSize, errors: { adjunt: m.errors.fileSize } });
  }
  const type = request.headers.get('content-type') ?? '';
  if (!type.startsWith('multipart/form-data') && !type.startsWith('application/x-www-form-urlencoded')) {
    return respond(request, locale, { status: 400, state: 'bad-request', message: m.badRequest });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    log({ result: 'bad-request' });
    return respond(request, locale, { status: 400, state: 'bad-request', message: m.badRequest });
  }

  const result = await validateSubmission(form);
  locale = result.locale;
  m = contactMessages[locale];
  const now = deps.now();
  const accepted = (ref: string, duplicate = false): Outcome =>
    deps.mode === 'dry-run'
      ? { status: 200, state: 'dry-run', message: m.notSent, ref, duplicate }
      : { status: 200, state: 'sent', message: m.sent(ref), ref, duplicate };

  // Camp parany ple: es respon com una consulta acceptada, però no es desa ni s'envia res.
  if (result.honeypot) {
    log({ result: 'honeypot' });
    return respond(request, locale, accepted(newReference()));
  }

  if (!result.data) {
    const errors = Object.fromEntries(Object.entries(result.errors).map(([field, code]) => [field, m.errors[code!]])) as Outcome['errors'];
    const fields = Object.keys(result.errors);
    const fileOnly = fields.length === 1 && fields[0] === 'adjunt';
    const status = fileOnly ? (result.errors.adjunt === 'fileSize' ? 413 : 415) : 400;
    const state: State = fileOnly ? (result.errors.adjunt === 'fileSize' ? 'too-large' : 'file-type') : 'invalid';
    log({ result: state, fields });
    return respond(request, locale, { status, state, message: fileOnly ? errors!.adjunt! : m.errors.summary, errors });
  }

  const data = result.data;
  const ref = data.ref ?? newReference();
  const scope = referenceScope(deps.mode, deps.environment);
  const signals = antispamSignals(data);
  const base = { ref, fileBytes: data.adjunt?.size ?? 0, signals: signals.map((signal) => signal.code) };

  if (deps.store) {
    const reservation = await claim(deps.store, deps.mode, scope, ref, now);
    if (reservation.kind === 'done') {
      log({ ...base, result: 'duplicate' });
      return respond(request, locale, accepted(ref, true));
    }
    if (reservation.kind === 'in-progress') {
      log({ ...base, result: 'in-progress' });
      return respond(request, locale, { status: 409, state: 'in-progress', message: m.inProgress, ref });
    }
    if (reservation.kind === 'unavailable') log({ ...base, warning: 'store_unavailable' });
    else {
      const throttle = await consume(deps.store, scope, await fingerprint(deps.ip, deps.fingerprintSecret, now), now, RATE_LIMIT_PER_HOUR);
      if (throttle === 'limited' || throttle === 'conflict') {
        await settle(deps.store, deps.mode, scope, ref, 'error', now);
        log({ ...base, result: 'rate-limited', reason: throttle });
        return respond(request, locale, { status: 429, state: 'rate-limited', message: m.rateLimited, ref });
      }
      if (throttle === 'unavailable') log({ ...base, warning: 'throttle_unavailable' });
    }
  }

  if (deps.mode === 'dry-run') {
    if (deps.store) await settle(deps.store, deps.mode, scope, ref, doneState(deps.mode), now);
    log({ ...base, result: 'dry-run' });
    return respond(request, locale, accepted(ref));
  }

  const sent: SendResult = deps.send ? await deps.send(graphMessage(data, ref, deps.mode, now, signals)) : { ok: false, code: 'not_configured', attempts: 0 };
  if (deps.store) await settle(deps.store, deps.mode, scope, ref, sent.ok ? 'sent' : 'error', deps.now());
  if (!sent.ok) {
    log({ ...base, result: 'failed', code: sent.code, status: sent.status, attempts: sent.attempts });
    return respond(request, locale, { status: 502, state: 'failed', message: m.failed, ref });
  }
  log({ ...base, result: 'sent', attempts: sent.attempts });
  return respond(request, locale, accepted(ref));
}

/**
 * Mode efectiu (§4.1). Per defecte, «dry-run». «live» només al desplegament de producció; qualsevol
 * altre valor o context torna a «dry-run». «test» envia a la mateixa bústia amb «[PROVA]».
 */
export function resolveMode(requested: string | undefined, deployContext: string | undefined): FormMode {
  if (requested === 'live' && deployContext === 'production') return 'live';
  if (requested === 'test') return 'test';
  return 'dry-run';
}

/**
 * Secret de l'empremta (§4.4). En «test» i «live» cal un RL_SECRET estable d'almenys 32 caràcters,
 * compartit per totes les instàncies; si falta, no hi ha secret i la funció respon amb un error
 * controlat. Només en «dry-run» s'admet el secret provisional de la instància.
 */
export function resolveFingerprintSecret(mode: FormMode, configured: string | undefined, instanceFallback: string) {
  if (configured && configured.length >= MIN_RL_SECRET_LENGTH) return configured;
  return mode === 'dry-run' ? instanceFallback : undefined;
}
