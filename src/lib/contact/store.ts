// Magatzem de dades temporals del formulari (pla 8.5, §4.3, §4.5 i §4.6): comptadors de freqüència i
// referències d'enviament. A Netlify és Netlify Blobs amb consistència forta (netlify-store.ts); a les
// proves, aquesta implementació en memòria amb la mateixa semàntica d'escriptura condicional.

export interface StoredEntry<T> {
  data: T;
  etag: string;
}

/** `onlyIfNew`: només si la clau no existeix. `onlyIfMatch`: només si l'ETag actual coincideix. */
export type WriteCondition = { onlyIfNew: true } | { onlyIfMatch: string };

export interface KvStore {
  get<T>(key: string): Promise<StoredEntry<T> | null>;
  set(key: string, data: unknown, condition?: WriteCondition): Promise<{ modified: boolean }>;
  delete(key: string): Promise<void>;
  list(prefix: string): Promise<string[]>;
}

/** Magatzem en memòria. La comprovació de la condició i l'escriptura són indivisibles, com a Blobs. */
export function memoryStore(): KvStore & { size(): number; keys(): string[] } {
  const entries = new Map<string, { json: string; etag: string }>();
  let version = 0;
  // Cada operació cedeix el torn abans d'actuar, perquè les proves de simultaneïtat s'entrellacin.
  const tick = () => new Promise<void>((resolve) => setTimeout(resolve, 0));
  return {
    async get<T>(key: string) {
      await tick();
      const entry = entries.get(key);
      return entry ? { data: JSON.parse(entry.json) as T, etag: entry.etag } : null;
    },
    async set(key, data, condition) {
      await tick();
      const current = entries.get(key);
      if (condition && 'onlyIfNew' in condition && current) return { modified: false };
      if (condition && 'onlyIfMatch' in condition && current?.etag !== condition.onlyIfMatch) return { modified: false };
      entries.set(key, { json: JSON.stringify(data), etag: `"${++version}"` });
      return { modified: true };
    },
    async delete(key) {
      await tick();
      entries.delete(key);
    },
    async list(prefix) {
      await tick();
      return [...entries.keys()].filter((key) => key.startsWith(prefix));
    },
    size: () => entries.size,
    keys: () => [...entries.keys()],
  };
}
