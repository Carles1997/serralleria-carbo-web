// Missatges del formulari real en català, castellà i anglès (pla 8.5, §4.8; propostes per validar).
// Font única per al navegador (src/i18n/ui.ts els reutilitza) i per a la funció de Netlify.
import { company } from '../../config/site.ts';
import { MAX_ATTACHMENT_BYTES, type FormLocale } from './config.ts';

const phone = company.phone.display;
const mb = (locale: FormLocale) => (MAX_ATTACHMENT_BYTES / 1_000_000).toLocaleString({ ca: 'ca-ES', es: 'es-ES', en: 'en-GB' }[locale]);

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
  failed: `No hem pogut enviar la consulta. Torna-ho a provar o escriu-nos a ${company.email} o truca al ${phone}.`,
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
  failed: `No hemos podido enviar la consulta. Vuelve a intentarlo o escríbenos a ${company.email} o llama al ${phone}.`,
  badRequest: `No hemos podido leer la consulta. Vuelve a intentarlo desde el formulario o escríbenos a ${company.email}.`,
  page: {
    title: 'Consulta',
    errorsTitle: 'Hay que revisar estos campos:',
    backHint: 'Vuelve atrás con el navegador para corregirlos; normalmente los datos se conservan.',
    back: 'Volver al formulario de contacto',
  },
};

// Anglès (director, 12/10/2026): traducció dels missatges catalans, pendent d'aprovació.
const en: typeof ca = {
  contactPath: '/en/contact/',
  fieldLabels: {
    tipus: 'Type of enquiry',
    nom: 'Full name',
    empresa: 'Company',
    correu: 'Email',
    telefon: 'Phone',
    servei: 'Service',
    producte: 'Type of job',
    descripcio: 'Description',
    adjunt: 'Attachment',
    ubicacio: 'Town',
    unitats: 'Expected units',
    material: 'Material',
    termini: 'Desired lead time',
    sector: 'Sector',
    consentiment: 'Privacy policy',
  },
  errors: {
    required: 'This field is missing information.',
    email: 'Check the email address format.',
    phone: 'Check the phone number format.',
    summary: 'Check the highlighted fields to continue.',
    consent: 'Tick this box to continue.',
    length: 'The text is too short or too long.',
    choice: 'Choose one of the options in the list.',
    letters: 'Describe your enquiry in words.',
    fileSize: `The file is larger than ${mb('en')} MB. Attach a smaller one or send it to ${company.email}.`,
    fileType: 'This file type is not accepted. Attach an image (JPG, PNG or HEIC) or a PDF.',
  },
  fileHint: `JPG, PNG, HEIC or PDF, up to ${mb('en')} MB.`,
  honeypot: 'Leave this field empty',
  sending: 'Sending your enquiry…',
  notSent: `Your enquiry has not been sent: the form is not active yet. Message us on WhatsApp or call ${phone}.`,
  sent: (ref: string) => `Your enquiry has been sent (ref. ${ref}). We will reply to the email address you gave us. If you do not hear from us, call ${phone} and quote the reference.`,
  inProgress: 'Your enquiry is being sent. Please wait a few seconds.',
  rateLimited: `We have received several enquiries in a row from this connection. Try again in a while or call ${phone}.`,
  failed: `We could not send your enquiry. Try again or email us at ${company.email} or call ${phone}.`,
  badRequest: `We could not read your enquiry. Try again from the form or email us at ${company.email}.`,
  page: {
    title: 'Enquiry',
    errorsTitle: 'Please check these fields:',
    backHint: 'Go back with your browser to correct them; your data is usually kept.',
    back: 'Back to the contact form',
  },
};

export const contactMessages = { ca, es, en } as const;
export type ContactMessages = typeof ca;

/** Missatges que el navegador necessita sense passar pel servidor (data-messages del formulari). */
export function clientMessages(locale: FormLocale) {
  const m = contactMessages[locale];
  return { sending: m.sending, failed: m.failed, rateLimited: m.rateLimited, inProgress: m.inProgress, fileSize: m.errors.fileSize, fileType: m.errors.fileType };
}
