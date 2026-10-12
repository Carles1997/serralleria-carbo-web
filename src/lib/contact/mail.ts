// Correu que rep el taller (pla 8.5, §4.7). Remitent i destinatari: la bústia fixada al servidor
// (config.ts, MAILBOX). Reply-To: el correu validat del visitant. L'assumpte porta la referència i no
// el nom, perquè el nom no quedi a la traça del missatge de Microsoft 365 (§4.5).
import { CONSENT_VERSION, MAILBOX } from './config.ts';
import { base64 } from './encoding.ts';
import type { Submission } from './schema.ts';

export type FormMode = 'dry-run' | 'test' | 'live';

export interface Signal {
  code: 'rapid' | 'enllacos';
  detail: string;
}

const LOCALE_NAMES = { ca: 'català', es: 'castellà' } as const;

const madridTime = (now: number) =>
  new Intl.DateTimeFormat('ca-ES', { dateStyle: 'short', timeStyle: 'short', timeZone: 'Europe/Madrid' }).format(new Date(now));

const kilobytes = (bytes: number) => `${(bytes / 1000).toLocaleString('ca-ES', { maximumFractionDigits: 0 })} kB`;

export function mailSubject(data: Submission, ref: string, mode: FormMode) {
  const branch = data.tipus === 'empresa' ? 'Industrial' : 'Particulars';
  const parts = ['Consulta web', branch, data.serveiLabel, `Ref. ${ref}`].filter(Boolean);
  return `${mode === 'test' ? '[PROVA] ' : ''}${parts.join(' · ')}`;
}

export function mailBody(data: Submission, ref: string, now: number, signals: Signal[]) {
  const rows: [string, string][] = [
    ['Tipus de consulta', data.tipus === 'empresa' ? 'Industrial' : 'Particulars'],
    ['Nom i cognoms', data.nom],
    ['Empresa', data.empresa],
    ['Correu electrònic', data.correu],
    ['Telèfon', data.telefon],
    [data.tipus === 'empresa' ? "Tipus d'encàrrec" : 'Servei', data.serveiLabel],
    ['Població', data.ubicacio],
    ['Unitats previstes', data.unitats],
    ['Material', data.material],
    ['Termini desitjat', data.termini],
    ['Sector', data.sector],
  ];
  const lines = rows.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`);
  lines.push('', 'Descripció:', data.descripcio, '');
  lines.push(`Fitxer adjunt: ${data.adjunt ? `${data.adjunt.name} (${kilobytes(data.adjunt.size)})` : 'cap'}`);
  lines.push(`Idioma de la consulta: ${LOCALE_NAMES[data.idioma]}`);
  if (data.origen) lines.push(`Pàgina d'origen: ${data.origen}`);
  lines.push(`Data: ${madridTime(now)} (hora de Barcelona)`);
  lines.push(`Referència: ${ref}`, '');
  lines.push(`Política de privacitat acceptada: sí (${CONSENT_VERSION[data.idioma]})`);
  lines.push(`Comunicacions comercials: ${data.comunicacions ? 'sí' : 'no'}`);
  for (const signal of signals) lines.push(`Senyal antispam: ${signal.detail}`);
  lines.push('', 'Per respondre, fes servir «Respon»: la resposta va al correu del visitant.');
  return lines.join('\n');
}

/** Missatge per a Microsoft Graph (`POST /users/{bústia}/sendMail`). */
export function graphMessage(data: Submission, ref: string, mode: FormMode, now: number, signals: Signal[]) {
  return {
    message: {
      subject: mailSubject(data, ref, mode),
      body: { contentType: 'Text', content: mailBody(data, ref, now, signals) },
      toRecipients: [{ emailAddress: { address: MAILBOX } }],
      replyTo: [{ emailAddress: { address: data.correu, name: data.nom } }],
      internetMessageHeaders: [{ name: 'X-Carbo-Ref', value: ref }],
      attachments: data.adjunt
        ? [{ '@odata.type': '#microsoft.graph.fileAttachment', name: data.adjunt.name, contentType: data.adjunt.mime, contentBytes: base64(data.adjunt.bytes) }]
        : [],
    },
    // Remitent i destinatari són la mateixa bústia: sense còpia a Elements enviats (§4.4).
    saveToSentItems: false,
  };
}
