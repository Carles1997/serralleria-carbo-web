// Enviament amb Microsoft Graph (pla 8.5, §4.4 i §4.6). Només s'executa en els modes «test» i «live»;
// en «dry-run» la funció no hi arriba. Les credencials vénen de les variables d'entorn de Netlify, on
// les introdueix l'administrador de Microsoft 365: mai del repositori ni del formulari.
import { MAILBOX } from './config.ts';
import { base64url, fromBase64, fromHex, utf8 } from './encoding.ts';

export interface GraphConfig {
  tenantId: string;
  clientId: string;
  /** Secret de client, o bé certificat (empremta SHA-1 en hexadecimal i clau privada PEM en format PKCS#8). */
  clientSecret?: string;
  certThumbprint?: string;
  privateKeyPem?: string;
}

export interface GraphDeps {
  fetch: typeof fetch;
  now: () => number;
  sleep: (ms: number) => Promise<void>;
  /** Temps màxim de cada petició a Graph. */
  timeoutMs?: number;
}

export type SendResult =
  | { ok: true; attempts: number }
  | { ok: false; code: string; status?: number; attempts: number };

export function readGraphConfig(env: Record<string, string | undefined>): GraphConfig | undefined {
  const tenantId = env.M365_TENANT_ID;
  const clientId = env.M365_CLIENT_ID;
  if (!tenantId || !clientId) return undefined;
  const config: GraphConfig = { tenantId, clientId, clientSecret: env.M365_CLIENT_SECRET, certThumbprint: env.M365_CERT_THUMBPRINT, privateKeyPem: env.M365_PRIVATE_KEY_PEM };
  return config.clientSecret || (config.certThumbprint && config.privateKeyPem) ? config : undefined;
}

/** Asserció de client signada amb el certificat (RS256), segons la plataforma d'identitat de Microsoft. */
export async function clientAssertion(config: GraphConfig, now: number) {
  const audience = `https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/token`;
  const header = { alg: 'RS256', typ: 'JWT', x5t: base64url(fromHex(config.certThumbprint!)) };
  const seconds = Math.floor(now / 1000);
  const claims = { aud: audience, iss: config.clientId, sub: config.clientId, jti: crypto.randomUUID(), nbf: seconds, iat: seconds, exp: seconds + 600 };
  const unsigned = `${base64url(utf8(JSON.stringify(header)))}.${base64url(utf8(JSON.stringify(claims)))}`;
  const der = fromBase64((config.privateKeyPem ?? '').replace(/-----(BEGIN|END) PRIVATE KEY-----|\s/g, ''));
  const key = await crypto.subtle.importKey('pkcs8', der, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, utf8(unsigned));
  return `${unsigned}.${base64url(new Uint8Array(signature))}`;
}

let cachedToken: { key: string; token: string; expires: number } | undefined;
export const resetTokenCache = () => (cachedToken = undefined);

async function token(config: GraphConfig, deps: GraphDeps): Promise<{ token?: string; code?: string }> {
  const key = `${config.tenantId}/${config.clientId}`;
  if (cachedToken?.key === key && cachedToken.expires - 60_000 > deps.now()) return { token: cachedToken.token };
  const body = new URLSearchParams({ client_id: config.clientId, scope: 'https://graph.microsoft.com/.default', grant_type: 'client_credentials' });
  try {
    if (config.certThumbprint && config.privateKeyPem) {
      body.set('client_assertion_type', 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer');
      body.set('client_assertion', await clientAssertion(config, deps.now()));
    } else body.set('client_secret', config.clientSecret ?? '');
    const response = await deps.fetch(`https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/token`, {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(deps.timeoutMs ?? 8_000),
    });
    if (!response.ok) return { code: response.status === 400 || response.status === 401 ? 'auth_failed' : 'auth_unavailable' };
    const json = (await response.json()) as { access_token?: string; expires_in?: number };
    if (!json.access_token) return { code: 'auth_failed' };
    cachedToken = { key, token: json.access_token, expires: deps.now() + (json.expires_in ?? 3600) * 1000 };
    return { token: json.access_token };
  } catch {
    return { code: 'auth_unavailable' };
  }
}

const NO_RETRY: Record<number, string> = { 400: 'bad_request', 401: 'auth_failed', 403: 'forbidden', 404: 'mailbox_not_found', 413: 'too_large' };
const BACKOFF_MS = [500, 1_500];
const BUDGET_MS = 15_000;

/**
 * `sendMail` amb reintents limitats (§4.6). Un 202 vol dir que Microsoft 365 ha acceptat el missatge,
 * no que s'hagi lliurat. Un error de xarxa o un temps esgotat pot haver arribat igualment: es torna a
 * provar (millor un duplicat identificable per la referència que una consulta perduda).
 */
export async function sendMail(config: GraphConfig, payload: unknown, deps: GraphDeps): Promise<SendResult> {
  const started = deps.now();
  const auth = await token(config, deps);
  if (!auth.token) return { ok: false, code: auth.code ?? 'auth_failed', attempts: 0 };
  const url = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(MAILBOX)}/sendMail`;
  let attempts = 0;
  let retries = 0;
  let timeouts = 0;
  for (;;) {
    attempts += 1;
    let status = 0;
    let retryAfterMs = 0;
    try {
      const response = await deps.fetch(url, {
        method: 'POST',
        headers: { authorization: `Bearer ${auth.token}`, 'content-type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(deps.timeoutMs ?? 8_000),
      });
      status = response.status;
      if (status === 202) return { ok: true, attempts };
      if (status === 401) resetTokenCache();
      if (NO_RETRY[status]) return { ok: false, code: NO_RETRY[status], status, attempts };
      if (status === 429) {
        retryAfterMs = Number.parseInt(response.headers.get('retry-after') ?? '', 10) * 1000;
        if (!(retryAfterMs >= 0 && retryAfterMs <= 5_000)) return { ok: false, code: 'throttled', status, attempts };
      } else if (![500, 502, 503, 504].includes(status)) return { ok: false, code: 'unexpected', status, attempts };
    } catch (error) {
      // Temps esgotat: resultat ambigu, un sol reintent. Altres errors de xarxa: els reintents normals.
      if ((error as Error).name === 'TimeoutError' && (timeouts += 1) > 1) return { ok: false, code: 'timeout', attempts };
    }
    if (retries >= BACKOFF_MS.length) return { ok: false, code: status ? 'unavailable' : 'network', status: status || undefined, attempts };
    const wait = Math.max(retryAfterMs, BACKOFF_MS[retries]);
    if (deps.now() - started + wait > BUDGET_MS) return { ok: false, code: 'budget', status: status || undefined, attempts };
    retries += 1;
    await deps.sleep(wait);
  }
}
