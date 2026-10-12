// Formulari real (Fase 8, tasca 8.5): constants compartides pel navegador i la funció de Netlify.
// Pla: fases/fase-8/FASE8-formulari-real-pla.md. Microsoft 365 substitueix Netlify Forms (director,
// 09/10/2026). Aquest mòdul no importa res: el carreguen la funció, les proves de Node i Astro.

/** Mida màxima de l'adjunt, en bytes (3.000.000 = 3 MB decimals). §4.1 del pla: es prova el valor exacte. */
export const MAX_ATTACHMENT_BYTES = 3_000_000;
/** Marge per als camps de text i les capçaleres multipart. La petició queda lluny dels 6 MB de Netlify. */
export const MAX_REQUEST_BYTES = MAX_ATTACHMENT_BYTES + 100_000;
/** Consultes vàlides per hora i per connexió (capa 2 del control de freqüència). */
export const RATE_LIMIT_PER_HOUR = 5;
/** Per sota d'aquest temps d'emplenament la consulta es marca, no es rebutja. */
export const FAST_SUBMIT_MS = 3_000;
/** A partir de més enllaços que aquests, la consulta es marca. */
export const MAX_LINKS = 3;
/** Una referència en estat «enviant» més antiga que això es considera interrompuda (límit de la funció: 60 s). */
export const IN_PROGRESS_MS = 60_000;
/** Longitud mínima de RL_SECRET (secret estable de l'empremta). Obligatori en els modes «test» i «live». */
export const MIN_RL_SECRET_LENGTH = 32;
/** Les referències es conserven el temps just per detectar reenviaments. */
export const REFERENCE_TTL_MS = 60 * 60 * 1000;

/** Remitent i destinatari fixats al servidor (director, 09/10/2026). El formulari no els pot canviar. */
export const MAILBOX = 'carbo@serralleriacarbo.com';

export const HONEYPOT_FIELD = 'nota_interna';

export const BRANCHES = ['particular', 'empresa'] as const;
export type Branch = (typeof BRANCHES)[number];

// Valors dels desplegables (src/i18n/ui.ts). ContactTemplate comprova al build que coincideixen.
// Les etiquetes en català són les del correu que rep el taller.
export const PARTICULAR_SERVICES = {
  // Valor intern antic conservat (enllaços amb servei=urgencies); etiqueta pública des del 12/10/2026.
  urgencies: 'Reparacions',
  estructures: 'Estructures',
  automatismes: 'Automatismes, portes i motors',
  mobiliari: 'Mobiliari a mida',
} as const;
/** Tipus d'encàrrec d'Industrial (camp «producte»): els cinc productes i el manteniment (client, 12/10/2026). */
export const INDUSTRIAL_PRODUCTS = {
  estructures: 'Estructures, baranes i escales',
  portes: 'Portes i tancaments, amb instal·lació',
  mobiliari: 'Mobiliari',
  carros: 'Carros industrials',
  peces: 'Peces i conjunts a mida',
  manteniment: 'Manteniment industrial',
} as const;

/** Tipus admesos: extensions i tipus MIME. El contingut es comprova pels primers bytes. DWG i DXF, pendents del client. */
export const ACCEPTED_FILES = {
  jpeg: { extensions: ['jpg', 'jpeg'], mime: 'image/jpeg' },
  png: { extensions: ['png'], mime: 'image/png' },
  heic: { extensions: ['heic', 'heif'], mime: 'image/heic' },
  pdf: { extensions: ['pdf'], mime: 'application/pdf' },
} as const;
export type FileKind = keyof typeof ACCEPTED_FILES;
export const ACCEPT_ATTRIBUTE = Object.values(ACCEPTED_FILES)
  .flatMap((kind) => [...kind.extensions.map((extension) => `.${extension}`), kind.mime])
  .join(',');

/** Versió del text de consentiment que consta al correu (FASE8, apartat 6). */
export const CONSENT_VERSION = {
  ca: 'text del formulari en català aprovat el 06/10/2026',
  es: 'traducció castellana del 08/10/2026, pendent de validació jurídica',
  en: 'traducció anglesa del 12/10/2026, pendent de validació jurídica',
} as const;

export const LOCALES = ['ca', 'es', 'en'] as const;
export type FormLocale = (typeof LOCALES)[number];
