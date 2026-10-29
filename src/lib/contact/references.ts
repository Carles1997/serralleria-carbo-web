// Prevenció de duplicats (pla 8.5, §4.7) i neteja de les dades temporals (§4.6).
// Cada consulta porta una referència. Abans d'enviar, la funció la reserva amb onlyIfNew; un reenviament
// amb la mateixa referència i en el mateix àmbit no torna a enviar el correu.
//
// Àmbit = mode + entorn (per exemple «live/production» o «dry-run/branch-deploy»). Les referències
// d'un àmbit no es veuen des d'un altre: una consulta de demostració o de prova mai no pot justificar
// la confirmació d'un enviament real.
import { IN_PROGRESS_MS, REFERENCE_TTL_MS } from './config.ts';
import type { FormMode } from './mail.ts';
import type { KvStore } from './store.ts';
import { hourKey } from './throttle.ts';

export type ReferenceState = 'sending' | 'sent' | 'dry-run' | 'error';
interface ReferenceRecord {
  state: ReferenceState;
  mode: FormMode;
  at: number;
}

export type ClaimResult =
  | { kind: 'new' }
  | { kind: 'done' }
  | { kind: 'in-progress' }
  | { kind: 'unavailable' };

/** Àmbit d'un mode en un entorn. L'entorn és el context del desplegament de Netlify. */
export function referenceScope(mode: FormMode, environment: string) {
  return `${mode}/${environment.toLowerCase().replace(/[^a-z0-9-]/g, '-').slice(0, 40) || 'desconegut'}`;
}

/** L'únic estat final que confirma una consulta en cada mode. */
export const doneState = (mode: FormMode): ReferenceState => (mode === 'dry-run' ? 'dry-run' : 'sent');

const keyOf = (scope: string, ref: string) => `sub/${scope}/${ref}`;

/**
 * Reserva la referència dins de l'àmbit. «done»: ja s'havia acceptat en aquest mode; «in-progress»:
 * una altra petició l'està enviant. Un registre d'un altre mode (que no hauria d'existir dins de
 * l'àmbit) no es considera mai una confirmació: es reserva de nou.
 */
export async function claim(store: KvStore, mode: FormMode, scope: string, ref: string, now: number): Promise<ClaimResult> {
  const key = keyOf(scope, ref);
  const fresh: ReferenceRecord = { state: 'sending', mode, at: now };
  try {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const entry = await store.get<ReferenceRecord>(key);
      if (!entry) {
        if ((await store.set(key, fresh, { onlyIfNew: true })).modified) return { kind: 'new' };
        continue;
      }
      const { state, at, mode: recordedMode } = entry.data;
      if (recordedMode === mode && state === doneState(mode)) return { kind: 'done' };
      // Un «sending» recent és una altra petició en curs. Un de més antic que el límit de la funció
      // (60 s) vol dir que es va interrompre: es pot tornar a provar, amb risc de duplicat (§4.7).
      if (recordedMode === mode && state === 'sending' && now - at < IN_PROGRESS_MS) return { kind: 'in-progress' };
      if ((await store.set(key, fresh, { onlyIfMatch: entry.etag })).modified) return { kind: 'new' };
    }
    return { kind: 'in-progress' };
  } catch {
    return { kind: 'unavailable' };
  }
}

export async function settle(store: KvStore, mode: FormMode, scope: string, ref: string, state: ReferenceState, now: number) {
  try {
    await store.set(keyOf(scope, ref), { state, mode, at: now } satisfies ReferenceRecord);
  } catch {
    // Sense magatzem, la referència no es pot tancar; el registre de la funció ho anota.
    return false;
  }
  return true;
}

/**
 * Neteja (§4.6): esborra els comptadors de les hores anteriors a l'actual i les referències de més
 * d'una hora. Amb una execució cada hora (minut 5), un comptador dura com a màxim 1 h 5 min i una
 * referència, menys de 2 h. Cada execució que falli hi afegeix una hora.
 */
export async function sweep(store: KvStore, now: number) {
  const currentHour = hourKey(now);
  let counters = 0;
  let references = 0;
  for (const key of await store.list('rl/')) {
    if (key.split('/')[1] < currentHour) {
      await store.delete(key);
      counters += 1;
    }
  }
  for (const key of await store.list('sub/')) {
    const entry = await store.get<ReferenceRecord>(key);
    if (!entry || now - entry.data.at >= REFERENCE_TTL_MS) {
      await store.delete(key);
      references += 1;
    }
  }
  return { counters, references };
}
