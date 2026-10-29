// Servidor local de proves del formulari (Fase 8, 8.5): serveix dist/ i envia POST /api/contacte al
// mateix codi de la funció de Netlify, amb un magatzem en memòria. No envia cap correu: en mode
// «dry-run» no s'envia res i en mode «test» l'enviador és fals (només compta).
// Ús: npm run build && node scripts/qa/serve-contact.mjs [port] [dry-run|test]
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { handleContact } from '../../src/lib/contact/handler.ts';
import { memoryStore } from '../../src/lib/contact/store.ts';

const root = fileURLToPath(new URL('../../dist/', import.meta.url));
const port = Number(process.argv[2] ?? 4330);
const mode = process.argv[3] === 'test' ? 'test' : 'dry-run';
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.xml': 'application/xml', '.txt': 'text/plain' };

let store = memoryStore();
let sent = [];
let logs = [];

async function file(pathname) {
  const target = normalize(join(root, decodeURIComponent(pathname)));
  if (!target.startsWith(normalize(root))) return undefined;
  try {
    const info = await stat(target);
    const path = info.isDirectory() ? join(target, 'index.html') : target;
    return { body: await readFile(path), type: types[extname(path)] ?? 'application/octet-stream' };
  } catch {
    return undefined;
  }
}

createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  if (url.pathname === '/__qa/state') {
    res.writeHead(200, { 'content-type': 'application/json' });
    // Només local i amb l'enviador fals: l'últim correu, per comprovar-ne el contingut.
    const last = sent.at(-1)?.message;
    return res.end(JSON.stringify({ mode, sent: sent.length, logs, keys: store.keys(), last: last ? { subject: last.subject, body: last.body.content } : null }));
  }
  if (url.pathname === '/__qa/reset') {
    store = memoryStore();
    sent = [];
    logs = [];
    res.writeHead(204);
    return res.end();
  }
  if (url.pathname === '/api/contacte') {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = chunks.length ? Buffer.concat(chunks) : undefined;
    const request = new Request(url, { method: req.method, headers: req.headers, body: req.method === 'GET' || req.method === 'HEAD' ? undefined : body });
    const response = await handleContact(request, {
      mode,
      store,
      environment: 'local',
      ip: req.socket.remoteAddress ?? '127.0.0.1',
      fingerprintSecret: 'qa-local-secret-estable-de-proves-0123456789',
      now: Date.now,
      send: async (payload) => {
        sent.push(payload);
        return { ok: true, attempts: 1 };
      },
      log: (entry) => logs.push(entry),
    });
    res.writeHead(response.status, Object.fromEntries(response.headers));
    return res.end(Buffer.from(await response.arrayBuffer()));
  }
  const found = await file(url.pathname);
  if (found) {
    res.writeHead(200, { 'content-type': found.type });
    return res.end(found.body);
  }
  const notFound = await file(url.pathname.startsWith('/es/') ? '/es/404/index.html' : '/404.html');
  res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
  res.end(notFound?.body ?? 'Not found');
}).listen(port, () => console.log(`Formulari de proves a http://localhost:${port} (mode ${mode}, sense correus reals)`));
