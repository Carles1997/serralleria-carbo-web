// Protegeix les referències validades durant la Fase 5 comparant-les amb la línia
// base de la Fase 4, no amb HEAD: un commit no pot «legitimar» un canvi accidental.
//
// - Estrictes (idèntics a la línia base, sense fitxers nous ni eliminats):
//   fases/fase-1 … fase-4 (inclosos els mockups) i design/.
// - content/: el cos i el frontmatter dels fitxers validats han de coincidir, excepte
//   els camps de la porta de publicació (APPROVAL_KEYS). Es poden afegir fitxers nous
//   (per exemple content/es/ i content/en/).
//
// Canviar BASELINE només quan el director de projecte validi una nova revisió de
// referències; vegeu fases/fase-5/FASE5-indexacio.md.
//
// Revisions editorials validades del contingut (VALIDATED_REVISIONS): el cos d'un fitxer pot
// diferir de la línia base si coincideix amb l'empremta registrada per a una revisió validada pel
// director. Així la validació queda al mateix commit que el canvi. Una revisió també pot admetre
// metadades noves o canviades (frontmatter: títol, descripció, data…). Per obtenir les empremtes:
// node scripts/check-references.mjs --hashes
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';

const BASELINE = '5e0ffc9'; // Finalize phase 4 mockups and prepare Claude phase 5 (27/09/2026)
const STRICT_PATHS = ['fases/fase-1', 'fases/fase-2', 'fases/fase-3', 'fases/fase-4', 'design'];
const CONTENT_PATH = 'content';
const APPROVAL_KEYS = new Set(['status', 'publishReady', 'noindex', 'reviewNeeded']);
/** Revisions validades: fitxer → empremta SHA-256 del cos (sense frontmatter, amb salts LF). */
const VALIDATED_REVISIONS = [
  {
    // Alineació del text visible amb content/ca/ (fases/fase-5/FASE5-revisio-editorial.md).
    label: 'revisió editorial validada pel director el 30/09/2026',
    bodies: {
      'content/ca/contacte.md': '5a51aa82a36b1d5a67e5eaea505a7db13e476d5226af07e154135d28e97e7f9a',
      'content/ca/home.md': '9a45f7c4d19ee10efff81809cfe1957b773013c522f2825b691e179155e33827',
      'content/ca/industrial-capacitats.md': 'c12ba268538f4ea8883895ecd78922feb68ef94397de038a10ffb79781d74e12',
      'content/ca/industrial.md': '0b94b1d9abebd992944f669dc1f4b641f7fedbd1a853a91734f22a07bc80938e',
      'content/ca/particulars-automatismes.md': '75762acea060ca9d463b922637a3aa929034ca50efefef2e8c533566a9e91035',
      'content/ca/particulars-estructures.md': 'a8d44cbfb2d50972d36fd24f3003d2a6d518d2aaa6f8b3854ff4fe19120620ed',
      'content/ca/particulars-mobiliari.md': '0b007ee2200723d4172b41e4610ea55821db932c4237eb2a56875da04e7dc9ca',
      'content/ca/particulars-projectes.md': '5fbee9dde1ce6287809575f5a60dfb0b078cc00e0d71b9376bbf85718f761da6',
      'content/ca/particulars-urgencies.md': 'e0bd8500bf500e94d3ab296b2c0c3c3b98ada43e04910b59b0feefbcd68e4e25',
      'content/ca/particulars.md': '4ae7478c14d659d5ba506842ca20e1054b16e5280f164acb7f7be7c5207a4950',
    },
  },
  {
    // Mobiliari deriva al formulari, com Carros; automatització i robotització de processos.
    label: 'indicació del director del 01/10/2026',
    bodies: {
      'content/ca/home.md': '17930545a80204aa514b1f6469c1f0b2f056aa6a5df7a2e6164d59c2fa1dc024',
      'content/ca/industrial-capacitats.md': 'b2f87d513e2d6c840bfb6bb5f643f530c24fe8099a8bcd275aa06d870ee6c68e',
      'content/ca/particulars.md': '35af8c38479231b6b1b101b438d23bdafcc5aaae4f02064f46a02cad879d8c76',
    },
  },
  {
    // Esborranys de l'avís legal, la privacitat i les cookies redactats per encàrrec del director,
    // per a la revisió del client i del seu advocat (fases/fase-8/FASE8-compliment-i-confianca.md).
    label: 'textos legals en revisió jurídica (02/10/2026)',
    bodies: {
      'content/ca/legal-avis-legal.md': 'a02d026f8d62e30af96ceddd908ece530665167884374e38fd18d34ac16e8d77',
      'content/ca/legal-cookies.md': 'cdf3d084073ff4b4c84254fc70410218c590c2342751b66b05529430ea0ad871',
      'content/ca/legal-privacitat.md': '1028ac427c424fe7568174d3b5e3e539a79b91f47eb57437a0ce6588fe4731d6',
    },
    frontmatter: {
      'content/ca/legal-avis-legal.md': '70f913c52e41b6d903baa978336bb7e2b7a4326903d9b3a4b5ccaac9afb47853',
      'content/ca/legal-cookies.md': '3b319798d769cde83afe186a4b8555c2ba60328ff557463b855ce4c329295ea4',
      'content/ca/legal-privacitat.md': '267c9e7f66bb8df3939530b6c290d77bc3e84f50b8f1bf93f0aac595d510507c',
    },
  },
];
const printHashes = process.argv.includes('--hashes');
const bodyHash = (body) => createHash('sha256').update(body).digest('hex');
/** Empremta del frontmatter sense els camps de la porta de publicació (ordre de claus estable). */
const frontmatterHash = (keys) =>
  bodyHash([...keys].filter(([key]) => !APPROVAL_KEYS.has(key)).sort(([a], [b]) => a.localeCompare(b)).map(([, line]) => line).join('\n'));

const git = (args, input) => execFileSync('git', args, { encoding: 'utf8', input, maxBuffer: 64 * 1024 * 1024 });
const list = (output) => output.split('\0').filter(Boolean);

try {
  git(['cat-file', '-e', `${BASELINE}^{commit}`]);
} catch {
  console.error(`No es troba el commit de referència ${BASELINE}. Cal l'historial complet de Git (no un clon superficial).`);
  process.exit(2);
}

/** Fitxers de la línia base: camí → blob. */
function baselineFiles(paths) {
  const files = new Map();
  for (const line of list(git(['ls-tree', '-r', '-z', BASELINE, '--', ...paths]))) {
    const [meta, path] = line.split('\t');
    files.set(path, meta.split(' ')[2]);
  }
  return files;
}

/** Fitxers actuals, versionats o nous, respectant .gitignore. */
function workingFiles(paths) {
  return new Set(list(git(['ls-files', '-z', '--cached', '--others', '--exclude-standard', '--', ...paths])).filter(existsSync));
}

/** Blob que tindria el fitxer actual, amb els filtres de .gitattributes (eol). */
function workingBlobs(paths) {
  if (!paths.length) return new Map();
  const hashes = git(['hash-object', '--stdin-paths'], paths.join('\n') + '\n').trim().split('\n');
  return new Map(paths.map((path, index) => [path, hashes[index]]));
}

/** Frontmatter en blocs per clau de primer nivell, i cos del document. */
function parseMarkdown(text) {
  const normalized = text.replace(/\r\n/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { keys: new Map(), body: normalized };
  const keys = new Map();
  let current;
  for (const line of match[1].split('\n')) {
    const key = line.match(/^([A-Za-z][\w-]*):/)?.[1];
    if (key) keys.set((current = key), line);
    else if (current) keys.set(current, `${keys.get(current)}\n${line}`);
  }
  return { keys, body: match[2] };
}

const errors = [];
const notes = [];

// 1. Referències estrictes.
const strictBase = baselineFiles(STRICT_PATHS);
const strictNow = workingFiles(STRICT_PATHS);
const strictBlobs = workingBlobs([...strictNow].filter((path) => strictBase.has(path)));
for (const [path, blob] of strictBase) {
  if (!strictNow.has(path)) errors.push(`eliminat: ${path}`);
  else if (strictBlobs.get(path) !== blob) errors.push(`modificat: ${path}`);
}
for (const path of strictNow) if (!strictBase.has(path)) errors.push(`fitxer nou en una referència validada: ${path}`);

// 2. Continguts validats.
const contentBase = baselineFiles([CONTENT_PATH]);
const contentNow = workingFiles([CONTENT_PATH]);
for (const path of contentBase.keys()) {
  if (!contentNow.has(path)) {
    errors.push(`contingut eliminat: ${path}`);
    continue;
  }
  const before = parseMarkdown(git(['show', `${BASELINE}:${path}`]));
  const after = parseMarkdown(readFileSync(path, 'utf8'));
  if (before.body !== after.body) {
    const hash = bodyHash(after.body);
    const revision = VALIDATED_REVISIONS.find(({ bodies }) => bodies[path] === hash);
    if (printHashes) console.log(`    '${path}': '${hash}',`);
    else if (revision) notes.push(`${path}: ${revision.label}`);
    else errors.push(`text modificat: ${path}`);
  }
  // Camps de metadades (títol, descripció, data…): només canvien dins d'una revisió validada.
  const fmHash = frontmatterHash(after.keys);
  const fmRevision = VALIDATED_REVISIONS.find(({ frontmatter }) => frontmatter?.[path] === fmHash);
  let fmPrinted = false;
  for (const key of new Set([...before.keys.keys(), ...after.keys.keys()])) {
    if (before.keys.get(key) === after.keys.get(key)) continue;
    if (APPROVAL_KEYS.has(key)) notes.push(`${path}: ${after.keys.get(key)?.replace(/\n\s*/g, ' ') ?? `${key} eliminat`}`);
    else if (printHashes) {
      if (!fmPrinted) console.log(`    frontmatter '${path}': '${fmHash}',`);
      fmPrinted = true;
    } else if (fmRevision) notes.push(`${path}: ${key} (${fmRevision.label})`);
    else errors.push(`frontmatter modificat (${key}): ${path}`);
  }
}
for (const path of contentNow) if (!contentBase.has(path)) notes.push(`contingut nou: ${path}`);

if (printHashes) process.exit(0);
if (notes.length) console.log(`Canvis permesos respecte a ${BASELINE}:\n  ${notes.join('\n  ')}`);
if (errors.length) {
  console.error(`Referències validades alterades respecte a ${BASELINE}:\n  ${errors.join('\n  ')}`);
  process.exit(1);
}
console.log(`Referències intactes respecte a ${BASELINE} (${strictBase.size} fitxers estrictes, ${contentBase.size} continguts).`);
