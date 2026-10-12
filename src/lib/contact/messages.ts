// Missatges del formulari real en català i castellà (pla 8.5, §4.8; propostes per validar).
// Font única per al navegador (src/i18n/ui.ts els reutilitza) i per a la funció de Netlify.
import { company } from '../../config/site.ts';
import { MAX_ATTACHMENT_BYTES, type FormLocale } from './config.ts';

const phone = company.phone.display;
const mb = (locale: FormLocale) => (MAX_ATTACHMENT_BYTES / 1_000_000).toLocaleString(locale === 'es' ? 'es-ES' : 'ca-ES');

export type FieldError = 'required' | 'email' | 'phone' | 'length' | 'choice' | 'consent' | 'letters' | 'fileSize' | 'fileType';

const ca = {
  /** Ruta de la pàgina de contacte (es comprova al build contra ui.routes.contact). */
  contactPath: '/contacte/',
  fieldLabels: {
    tipus: 'Tipus de consulta',
    nom: 'Nom i cognoms',
    empresa: 'Empresa',
    correu: 'Correu electrònic',
    telefon: 'Telèfon',
    servei: 'Servei',
    producte: "Tipus d'encàrrec",
    descripcio: 'Descripció',
    adjunt: 'Fitxer adjunt',
    ubicacio: 'Població',
    unitats: 'Unitats previstes',
    material: 'Material',
    termini: 'Termini desitjat',
    sector: 'Sector',
    consentiment: 'Política de privacitat',
  },
  errors: {
    required: 'Falta informació en aquest camp.',
    email: 'Revisa el format del correu electrònic.',
    phone: 'Revisa el format del telèfon.',
    summary: 'Revisa els camps marcats per continuar.',
    consent: 'Marca aquesta casella per continuar.',
    length: 'El text és massa curt o massa llarg.',
    choice: 'Tria una de les opcions de la llista.',
    letters: 'Descriu la consulta amb paraules.',
    fileSize: `El fitxer supera els ${mb('ca')} MB. Adjunta'n un de més petit o envia'l a ${company.email}.`,
    fileType: 'Aquest tipus de fitxer no s\'admet. Adjunta una imatge (JPG, PNG o HEIC) o un PDF.',
  },
  fileHint: `JPG, PNG, HEIC o PDF, fins a ${mb('ca')} MB.`,
  honeypot: 'Deixa aquest camp buit',
  sending: 'Enviant la consulta…',
  /** Mode de demostració (dry-run): les dades són vàlides, però no s'envia res. */
  notSent: `La consulta no s'ha enviat: el formulari encara no està actiu. Escriu-nos per WhatsApp o truca al ${phone}.`,
  sent: (ref: string) => `La consulta s'ha enviat (ref. ${ref}). Et respondrem al correu que ens has indicat. Si no tens resposta, truca al ${phone} i indica la referència.`,
  inProgress: 'La consulta s\'està enviant. Espera uns segons.',
  rateLimited: `Hem rebut diverses consultes seguides des d'aquesta connexió. Torna-ho a provar d'aquí a una estona o truca al ${phone}.`,
  failed: `No hem pogut enviar la consulta. Torna-ho a provar o escriu-nos a ${company.email} o per WhatsApp al ${phone}.`,
  badRequest: `No hem pogut llegir la consulta. Torna-ho a provar des del formulari o escriu-nos a ${company.email}.`,
  page: {
    title: 'Consulta',
    errorsTitle: 'Cal revisar aquests camps:',
    backHint: 'Torna enrere amb el navegador per corregir-los; normalment les dades es conserven.',
    back: 'Tornar al formulari de contacte',
  },
};

const es: typeof ca = {
  contactPath: '/es/contacto/',
  fieldLabels: {
    tipus: 'Tipo de consulta',
    nom: 'Nombre y apellidos',
    empresa: 'Empresa',
    correu: 'Correo electrónico',
    telefon: 'Teléfono',
    servei: 'Servicio',
    producte: 'Tipo de encargo',
    descripcio: 'Descripción',
    adjunt: 'Archivo adjunto',
    ubicacio: 'Población',
    unitats: 'Unidades previstas',
    material: 'Material',
    termini: 'Plazo deseado',
    sector: 'Sector',
    consentiment: 'Política de privacidad',
  },
  errors: {
    required: 'Falta información en este campo.',
    email: 'Revisa el formato del correo electrónico.',
    phone: 'Revisa el formato del teléfono.',
    summary: 'Revisa los campos marcados para continuar.',
    consent: 'Marca esta casilla para continuar.',
    length: 'El texto es demasiado corto o demasiado largo.',
    choice: 'Elige una de las opciones de la lista.',
    letters: 'Describe la consulta con palabras.',
    fileSize: `El archivo supera los ${mb('es')} MB. Adjunta uno más pequeño o envíalo a ${company.email}.`,
    fileType: 'Este tipo de archivo no se admite. Adjunta una imagen (JPG, PNG o HEIC) o un PDF.',
  },
  fileHint: `JPG, PNG, HEIC o PDF, hasta ${mb('es')} MB.`,
  honeypot: 'Deja este campo vacío',
  sending: 'Enviando la consulta…',
  notSent: `La consulta no se ha enviado: el formulario todavía no está activo. Escríbenos por WhatsApp o llama al ${phone}.`,
  sent: (ref: string) => `La consulta se ha enviado (ref. ${ref}). Te responderemos al correo que nos has indicado. Si no tienes respuesta, llama al ${phone} e indica la referencia.`,
  inProgress: 'La consulta se está enviando. Espera unos segundos.',
  rateLimited: `Hemos recibido varias consultas seguidas desde esta conexión. Vuelve a intentarlo dentro de un rato o llama al ${phone}.`,
  failed: `No hemos podido enviar la consulta. Vuelve a intentarlo o escríbenos a ${company.email} o por WhatsApp al ${phone}.`,
  badRequest: `No hemos podido leer la consulta. Vuelve a intentarlo desde el formulario o escríbenos a ${company.email}.`,
  page: {
    title: 'Consulta',
    errorsTitle: 'Hay que revisar estos campos:',
    backHint: 'Vuelve atrás con el navegador para corregirlos; normalmente los datos se conservan.',
    back: 'Volver al formulario de contacto',
  },
};

export const contactMessages = { ca, es } as const;
export type ContactMessages = typeof ca;

/** Missatges que el navegador necessita sense passar pel servidor (data-messages del formulari). */
export function clientMessages(locale: FormLocale) {
  const m = contactMessages[locale];
  return { sending: m.sending, failed: m.failed, rateLimited: m.rateLimited, inProgress: m.inProgress, fileSize: m.errors.fileSize, fileType: m.errors.fileType };
}
