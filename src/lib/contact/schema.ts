// Validació al servidor del formulari (pla 8.5, §4.2). La funció de Netlify la fa servir abans
// d'acceptar res; el navegador en reutilitza les constants. Cap regla no confia en el navegador.
import {
  ACCEPTED_FILES,
  BRANCHES,
  HONEYPOT_FIELD,
  INDUSTRIAL_PRODUCTS,
  LOCALES,
  MAX_ATTACHMENT_BYTES,
  PARTICULAR_SERVICES,
  type Branch,
  type FileKind,
  type FormLocale,
} from './config.ts';
import type { FieldError } from './messages.ts';

export type Field =
  | 'tipus' | 'nom' | 'empresa' | 'correu' | 'telefon' | 'servei' | 'producte' | 'descripcio' | 'adjunt'
  | 'ubicacio' | 'unitats' | 'material' | 'termini' | 'sector' | 'consentiment';

export interface Attachment {
  name: string;
  kind: FileKind;
  mime: string;
  size: number;
  bytes: Uint8Array;
}

export interface Submission {
  tipus: Branch;
  nom: string;
  empresa: string;
  correu: string;
  telefon: string;
  /** Particulars: el servei. Industrial: el producte (camp `producte`). */
  servei: string;
  serveiLabel: string;
  descripcio: string;
  ubicacio: string;
  unitats: string;
  material: string;
  termini: string;
  sector: string;
  comunicacions: boolean;
  idioma: FormLocale;
  origen: string;
  /** Referència enviada pel navegador; si no és vàlida, la funció en genera una. */
  ref: string | undefined;
  /** Mil·lisegons d'emplenament mesurats pel navegador (només amb JavaScript). */
  temps: number | undefined;
  adjunt: Attachment | undefined;
}

export interface ValidationResult {
  locale: FormLocale;
  /** El camp parany ve ple: no s'envia res, però es respon com si s'hagués acceptat. */
  honeypot: boolean;
  errors: Partial<Record<Field, FieldError>>;
  data: Submission | undefined;
}

/** Alfabet de les referències: sense 0, O, 1, I ni L, per poder-les dictar per telèfon. */
export const REF_ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
export const REF_PATTERN = /^[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{10}$/;

const EMAIL = /^[^\s@<>()[\]",;:\\]+@[^\s@<>()[\]",;:\\]+\.[^\s@<>()[\]",;:\\]{2,}$/;
const PHONE = /^[+()\d\s.-]{7,25}$/;
const LETTER = /\p{L}/u;
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

/** Etiqueta d'un valor permès. Només claus pròpies: «toString», «constructor» o «__proto__» no ho són. */
const allowed = (list: Readonly<Record<string, string>>, key: string) => (Object.hasOwn(list, key) ? list[key] : undefined);

const text = (form: FormData, name: string) => {
  const value = form.get(name);
  return typeof value === 'string' ? value.replace(CONTROL, '').trim() : '';
};
/** Una sola línia: sense salts, per als camps que van a l'assumpte o a capçaleres. */
const line = (form: FormData, name: string) => text(form, name).replace(/\s+/g, ' ');

/** Tipus real del fitxer pels primers bytes (no per l'extensió ni pel tipus que declara el navegador). */
export function detectKind(bytes: Uint8Array): FileKind | undefined {
  const starts = (...signature: number[]) => signature.every((byte, index) => bytes[index] === byte);
  if (starts(0xff, 0xd8, 0xff)) return 'jpeg';
  if (starts(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a)) return 'png';
  if (starts(0x25, 0x50, 0x44, 0x46, 0x2d)) return 'pdf';
  // HEIC/HEIF: caixa «ftyp» a la posició 4 amb una marca HEIF.
  const ascii = (from: number, to: number) => String.fromCharCode(...bytes.subarray(from, to));
  if (bytes.length >= 12 && ascii(4, 8) === 'ftyp' && ['heic', 'heix', 'hevc', 'hevx', 'heim', 'heis', 'hevm', 'hevs', 'mif1', 'msf1'].includes(ascii(8, 12))) return 'heic';
  return undefined;
}

async function readAttachment(value: FormDataEntryValue | null): Promise<{ file?: Attachment; error?: FieldError }> {
  if (!value || typeof value === 'string' || (value.size === 0 && !value.name)) return {};
  if (value.size > MAX_ATTACHMENT_BYTES) return { error: 'fileSize' };
  if (value.size === 0) return { error: 'fileType' };
  const name = value.name.replace(CONTROL, '').replace(/[\\/]/g, '_').slice(-120) || 'adjunt';
  const extension = name.includes('.') ? name.split('.').pop()!.toLowerCase() : '';
  const bytes = new Uint8Array(await value.arrayBuffer());
  const kind = detectKind(bytes);
  if (!kind || !(ACCEPTED_FILES[kind].extensions as readonly string[]).includes(extension)) return { error: 'fileType' };
  return { file: { name, kind, mime: ACCEPTED_FILES[kind].mime, size: bytes.byteLength, bytes } };
}

export async function validateSubmission(form: FormData): Promise<ValidationResult> {
  const requestedLocale = text(form, 'idioma');
  const locale: FormLocale = (LOCALES as readonly string[]).includes(requestedLocale) ? (requestedLocale as FormLocale) : 'ca';
  const errors: ValidationResult['errors'] = {};
  const honeypot = text(form, HONEYPOT_FIELD) !== '';

  const tipusValue = text(form, 'tipus');
  const tipus = (BRANCHES as readonly string[]).includes(tipusValue) ? (tipusValue as Branch) : undefined;
  if (!tipus) errors.tipus = 'choice';
  const branch = tipus ?? 'particular';

  const nom = line(form, 'nom');
  if (!nom) errors.nom = 'required';
  else if (nom.length < 2 || nom.length > 120) errors.nom = 'length';

  const correu = line(form, 'correu');
  if (!correu) errors.correu = 'required';
  else if (correu.length > 254 || !EMAIL.test(correu)) errors.correu = 'email';

  const telefon = line(form, 'telefon');
  if (telefon && !PHONE.test(telefon)) errors.telefon = 'phone';

  // Cada branca té el seu camp: `servei` (Particulars, obligatori) i `producte` (Industrial,
  // opcional). Sense JavaScript arriben tots dos; només compta el de la branca triada.
  let servei = '';
  let serveiLabel = '';
  if (branch === 'particular') {
    servei = line(form, 'servei');
    const label = allowed(PARTICULAR_SERVICES, servei);
    if (!servei) errors.servei = 'required';
    else if (label) serveiLabel = label;
    else errors.servei = 'choice';
  } else {
    servei = line(form, 'producte');
    const label = allowed(INDUSTRIAL_PRODUCTS, servei);
    if (servei && label) serveiLabel = label;
    else if (servei) errors.producte = 'choice';
  }

  const descripcio = text(form, 'descripcio').replace(/\r\n?/g, '\n');
  if (!descripcio) errors.descripcio = 'required';
  else if (descripcio.length < 10 || descripcio.length > 5000) errors.descripcio = 'length';
  else if (!LETTER.test(descripcio)) errors.descripcio = 'letters';

  const optional = (name: Field, max: number, onlyFor?: Branch) => {
    const value = line(form, name);
    if (onlyFor && branch !== onlyFor) return '';
    if (value.length > max) errors[name] = 'length';
    return value;
  };
  const empresa = optional('empresa', 120, 'empresa');
  const ubicacio = optional('ubicacio', 120);
  const unitats = optional('unitats', 120, 'empresa');
  const material = optional('material', 200, 'empresa');
  const termini = optional('termini', 120, 'empresa');
  const sector = optional('sector', 120, 'empresa');

  if (form.get('consentiment') !== 'on') errors.consentiment = 'consent';
  const comunicacions = form.get('comunicacions') === 'on';

  const origenValue = line(form, 'origen');
  const origen = /^\/[a-z0-9/_-]{0,120}$/.test(origenValue) ? origenValue : '';
  const refValue = line(form, 'ref').toUpperCase();
  const ref = REF_PATTERN.test(refValue) ? refValue : undefined;
  const tempsValue = Number.parseInt(text(form, 'temps'), 10);
  const temps = Number.isFinite(tempsValue) && tempsValue >= 0 ? tempsValue : undefined;

  const attachment = await readAttachment(form.get('adjunt'));
  if (attachment.error) errors.adjunt = attachment.error;

  const data: Submission | undefined =
    Object.keys(errors).length === 0 && tipus
      ? { tipus, nom, empresa, correu, telefon, servei, serveiLabel, descripcio, ubicacio, unitats, material, termini, sector, comunicacions, idioma: locale, origen, ref, temps, adjunt: attachment.file }
      : undefined;
  return { locale, honeypot, errors, data };
}

/** Referència aleatòria de 10 caràcters (el navegador fa servir el mateix alfabet). */
export function newReference(random: (size: number) => Uint8Array = (size) => crypto.getRandomValues(new Uint8Array(size))) {
  return [...random(10)].map((byte) => REF_ALPHABET[byte % REF_ALPHABET.length]).join('');
}
