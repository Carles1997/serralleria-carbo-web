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
    label: 'presentació de fabricació i muntatge a la Home, aprovada pel director (06/10/2026)',
    bodies: {
      'content/ca/home.md': '9a9db87e7790c6781122747e3a3683cf0cd2bcd16d6d0ad6851111c409571f61',
    },
  },
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
  {
    // Separació entre Particulars i Industrial per tipus d'encàrrec; carros a Industrial i
    // reparacions a Particulars (alternativa A de fases/fase-7/FASE7-proposta-dos-camins.md).
    label: 'reunió del director amb el client, alternativa A (03/10/2026)',
    bodies: {
      'content/ca/contacte.md': 'fc28e443714ebf8bb95e9fe08a5ca2e33bd12be61399a8974eb3035b7eb5dab4',
      'content/ca/home.md': '145244865ba7f5ea0fe26379919c447266568b400938e9da8328007fa0b68d70',
      'content/ca/industrial.md': '1db21a9bada1504e23d315f3777823bb65a5e6dcc280bfaa915d381fccc3c607',
      'content/ca/particulars.md': '30eb39f11faa50c5adf75a423ba1a1e27e3157dbcfb6b6064228ccdcad091de1',
      'content/ca/ui.md': '99128a1d6207ca2e79dab8362b876115b82af686976076a7128104bfaece1c6a',
    },
  },
  {
    // Textos de l'advocat del client (versió de maig de 2025), adaptats al lloc web nou i aprovats
    // pel director (fases/fase-8/FASE8-compliment-i-confianca.md, tasques 8.2 i 8.4).
    label: "textos legals de l'advocat, adaptats i aprovats (06/10/2026)",
    bodies: {
      'content/ca/legal-avis-legal.md': '7c9dd1050d6f40784439c5902fa5263be914fd0813a6063520b1d0b80e1246f5',
      'content/ca/legal-cookies.md': 'ddfb52346aa1ac374544d2a8f2d66bb83ac061f168cf55b6baaeca9e6d4907bf',
      'content/ca/legal-privacitat.md': '1c2b34bb191615225d25d44e631d1b49891ad3c2fd227f3d107c19e91b9118c4',
    },
    frontmatter: {
      'content/ca/legal-avis-legal.md': '827d29465dbc65d05f986f15e162155436b5d7c3fb66662f5e2d433c29c8bbe7',
      'content/ca/legal-cookies.md': '699852d5d3c8ec22fd764d93fe04be74bc1ecd4c6595fc1d93232fb1ce62ed74',
      'content/ca/legal-privacitat.md': 'd588b73dacea37b3c7c4fcb602cfa103830d342ee1d24be0a271ca3f26616d27',
    },
  },
  {
    // Criteri únic entre camins, «Què fabriquem», formulari transversal, Industrial a Empresa i
    // «d'Industrial» (fases/fase-7/FASE7-brief-millores-ux-i-continguts.md).
    label: 'brief de millores UX i continguts del director (06/10/2026)',
    bodies: {
      'content/ca/contacte.md': 'fe819dff452de8fb331e60d050919aa0cf709aecbe00bfac80ca168ba1cfde90',
      'content/ca/empresa.md': 'da6c8d208dd73abf70e658c4eb434ce93e6caeb75c066cd8aadf84e3580b66b8',
      'content/ca/home.md': '0653f75aa1a217d2eb35efede6ad710be0cf48ecf4beb1ed61b861238867cfb7',
      'content/ca/industrial-capacitats.md': 'a5c08c12b75b75eac3edf46a5b0d17858fb7382c214446ff60abd40d3db05874',
      'content/ca/industrial-proces.md': '6775c5c6075512a542331ebb22325ec871555aad9cfab8b2364d74ec97ab1760',
      'content/ca/industrial-projectes.md': '815431bfe937f6b61aea1ad41fd39ea01f7a6deac33956947573382ca5fc7176',
      'content/ca/industrial.md': '4e8b7cf5722b3db4e9329f21e9061ce442d7ed2ca5b82dcc3dff4c32ef691896',
      'content/ca/particulars.md': 'd83de121b8e94d772cf60bf152fc1cedbe7886cc38579142a5d360da5493f14a',
      'content/ca/ui.md': '2cea4eec2ab999f71e36961705a07bf61c4e806ab6dcec95429c1ce5daa5a09d',
    },
    frontmatter: {
      'content/ca/industrial-proces.md': '5e0a2ad0aafcaef9f86f699804a5a99372791b81978923cd632a3a240ab0df19',
      'content/ca/industrial-projectes.md': '12109a4db5f577d78357328033fa6c8734ffb9ecffe122a50027ebd6e2ef6d8a',
    },
  },
  {
    label: 'ajustos de la Home del director (06/10/2026)',
    bodies: {
      'content/ca/home.md': '7ec28e78b375bdc4211217ce2945f075a4cf5963ec8668664288e41b4e63e67f',
    },
  },
  {
    label: "menys text i retirada de la pàgina d'empresa, indicació del director (06/10/2026)",
    bodies: {
      'content/ca/home.md': 'c04647b36a4f5953c5274f90f56f4bbbc3c28c26933e5138479bb04a3c94d762',
      'content/ca/industrial.md': 'a04a6d6577769603c4fbd6a1e458459d689f678796ae369c06a034fb1daa3f9f',
    },
  },
  {
    // Només els canvis concrets autoritzats pel brief (fases/fase-7/FASE7-brief-refinament-global-i-contacte.md
    // §4.4 i §10): «Fabricació en sèrie», taller «al nostre taller / al teu projecte», mètode «segons els
    // requisits acordats», descripció SEO d'Industrial i Contacte sense introducció ni explicacions de branca.
    // Les reescriptures addicionals de FASE7-revisio-editorial-refinament.md no hi consten.
    label: 'refinament global i Contacte del director (06/10/2026)',
    bodies: {
      'content/ca/contacte.md': '86e5cb93c87809d173439ff4e2e3ffd49f28b384f3bc0b5d2a5393c023e36f2a',
      'content/ca/home.md': '4f55ebe38fa1a365162c37728653dd9bd5228d3b3b56b2d2e6d48307c1f10ae2',
      'content/ca/industrial.md': '3146c09507120b2c4c69fbbb39a884d1d037394a4d7c70ce5d293a75acfc2cfe',
      'content/ca/ui.md': 'ac16a26f3bd3178b8653cf4b413260745a50110713babbda45918e8dff2e5743',
    },
    frontmatter: {
      'content/ca/industrial.md': '1496d3a2040d6fd3df29eaf019dde74491d462ddb5e86a4d641621e8338c9d80',
    },
  },
  {
    // Selecció del revisor aprovada pel director: fases/fase-7/FASE7-valoracio-propostes-editorials.md
    // (§2, C-1, versions revisades del §3, ajustos del §4–5). Substitueix, per a aquests fitxers,
    // l'empremta de la revisió anterior del mateix dia.
    label: 'propostes editorials valorades i aprovades pel director (06/10/2026)',
    bodies: {
      'content/ca/contacte.md': '75ee2ea22176e198d1ce61aa4023e4bca28a69a9bb3335a22dfe4670ccf481b7',
      'content/ca/home.md': '74fe4370d0821d4575673e2b4f5e837ac26571f2ad8bd019b1ec76f16254ef6f',
      'content/ca/industrial-capacitats.md': '26890575db0df8a3e76b411ba92cadaa05bd6793619072aeccdf35801330d74a',
      'content/ca/industrial.md': 'd352c37e73d42e797d7fb2ff66642eab52bcac5f2fcab9661031e50a2e57f9f4',
      'content/ca/particulars-automatismes.md': '2e1262ca4592bacea451c254be3bcbd06503c79441592f49c0d22d9a663228f5',
      'content/ca/particulars-estructures.md': '1b0e55e77e8fe172f2d098233511aa83fb8f259dcea2941b091f4ff19c508c68',
      'content/ca/particulars-urgencies.md': '0032be54faf257672a88696ef879496ce2a64f35f3367d3defe7e33435e7e9cf',
      'content/ca/particulars.md': '3e309383aa5e1264b463a88c8fa7ddf231d157947b3d57cd504da76bfe75073c',
      'content/ca/ui.md': '98b41c80a4bf37c61788a8613a6a81d905f99898e7a6f606884d0e374809ea95',
    },
    frontmatter: {
      'content/ca/industrial.md': '1496d3a2040d6fd3df29eaf019dde74491d462ddb5e86a4d641621e8338c9d80',
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
