// Adaptador de Netlify Blobs per a les dades temporals del formulari (pla 8.5, §4.5). Consistència
// forta: el comptador i les referències han de llegir l'última escriptura, no una còpia de la xarxa.
import { getStore } from '@netlify/blobs';
import type { KvStore } from './store.ts';

export function netlifyStore(name = 'formulari-contacte'): KvStore {
  const store = getStore({ name, consistency: 'strong' });
  return {
    async get<T>(key: string) {
      const entry = await store.getWithMetadata(key, { type: 'json' });
      return entry?.etag ? { data: entry.data as T, etag: entry.etag } : null;
    },
    async set(key, data, condition) {
      const { modified } = await store.setJSON(key, data, condition ?? {});
      return { modified };
    },
    delete: (key) => store.delete(key),
    async list(prefix) {
      const { blobs } = await store.list({ prefix });
      return blobs.map((blob) => blob.key);
    },
  };
}
