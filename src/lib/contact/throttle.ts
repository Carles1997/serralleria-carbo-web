// Capa 2 del control de freqüència (pla 8.5, §4.3): comptador horari per connexió amb escriptura
// condicional, perquè dues peticions simultànies no es trepitgin el compte. Blobs aplica «l'última
// escriptura guanya» i no té increments atòmics; onlyIfNew i onlyIfMatch fan de comparar i canviar.
import { hex, utf8 } from './encoding.ts';
import type { KvStore } from './store.ts';

/** Hora UTC (AAAAMMDDHH): forma part de la clau perquè la neteja pugui esborrar per hores senceres. */
export const hourKey = (now: number) => new Date(now).toISOString().slice(0, 13).replace(/[-T]/g, '');

/**
 * Empremta pseudonimitzada de la IP: HMAC-SHA256 amb un secret i la data del dia. Canvia cada dia i no
 * es pot revertir sense el secret. És una dada personal pseudonimitzada, no anònima (§4.5).
 */
export async function fingerprint(ip: string, secret: string, now: number) {
  const key = await crypto.subtle.importKey('raw', utf8(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', key, utf8(`${new Date(now).toISOString().slice(0, 10)}|${ip}`));
  return hex(signature).slice(0, 32);
}

export type ThrottleResult = 'ok' | 'limited' | 'conflict' | 'unavailable';

interface Counter {
  count: number;
}

/**
 * Suma una consulta al comptador de l'hora dins de l'àmbit (mode i entorn, com les referències).
 * «conflict»: tres intents perduts davant d'escriptures simultànies.
 */
export async function consume(store: KvStore, scope: string, print: string, now: number, limit: number, attempts = 3): Promise<ThrottleResult> {
  const key = `rl/${hourKey(now)}/${scope}/${print}`;
  try {
    for (let attempt = 0; attempt < attempts; attempt += 1) {
      const entry = await store.get<Counter>(key);
      if (!entry) {
        if ((await store.set(key, { count: 1 }, { onlyIfNew: true })).modified) return 'ok';
        continue;
      }
      if (entry.data.count >= limit) return 'limited';
      if ((await store.set(key, { count: entry.data.count + 1 }, { onlyIfMatch: entry.etag })).modified) return 'ok';
    }
    return 'conflict';
  } catch {
    return 'unavailable';
  }
}
