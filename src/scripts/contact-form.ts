// Formulari de contacte (plantilla C). Millora progressiva: canvia els camps segons la branca,
// preselecciona des de la URL, valida al navegador i envia a /api/contacte amb fetch. Sense
// JavaScript, el formulari s'envia igual i la funció respon amb una pàgina (Fase 8, 8.5).
// La funció torna a validar-ho tot: aquesta validació només avança els errors.
// Redisseny del 06/10/2026: sense columna lateral per branca; les dades opcionals (població i, a
// Industrial, dades tècniques) són en un desplegable <details> que funciona sense JavaScript.
import { withViewTransition } from './view-transition';
import { REF_ALPHABET } from '../lib/contact/schema';

const form = document.querySelector<HTMLFormElement>('[data-contact-form]');

if (form) {
  // Amb JavaScript, l'ajuda de la descripció és el placeholder real (contact.css amaga la superposició).
  form.dataset.enhanced = '';
  const errors = JSON.parse(form.dataset.errors ?? '{}') as Record<'required' | 'email' | 'phone' | 'summary' | 'consent', string>;
  const messages = JSON.parse(form.dataset.messages ?? '{}') as Record<'sending' | 'failed' | 'rateLimited' | 'inProgress' | 'fileSize' | 'fileType', string>;
  const maxBytes = Number(form.dataset.maxBytes ?? '0');
  const refInput = form.querySelector<HTMLInputElement>('[data-ref]');
  const elapsedInput = form.querySelector<HTMLInputElement>('[data-elapsed]');
  const loadedAt = Date.now();
  const radios = [...form.querySelectorAll<HTMLInputElement>('input[name="tipus"]')];
  const fieldsets = [...form.querySelectorAll<HTMLFieldSetElement>('[data-branch]')];
  const fileInput = form.querySelector<HTMLInputElement>('#adjunt');
  const fileName = form.querySelector<HTMLElement>('#file-name');
  const description = form.querySelector<HTMLTextAreaElement>('#descripcio');
  const service = form.querySelector<HTMLSelectElement>('#servei');
  const status = form.querySelector<HTMLElement>('#form-status');
  const submit = form.querySelector<HTMLButtonElement>('[data-submit]');
  const noFile = fileName?.textContent ?? '';

  const errorFor = (input: HTMLElement) => document.getElementById(`${input.id}-error`);

  const clearError = (input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
    input.removeAttribute('aria-invalid');
    const error = errorFor(input);
    if (error) {
      error.textContent = '';
      error.hidden = true;
    }
    const describedBy = (input.getAttribute('aria-describedby') ?? '').split(' ').filter((id) => id && id !== `${input.id}-error`);
    if (describedBy.length) input.setAttribute('aria-describedby', describedBy.join(' '));
    else input.removeAttribute('aria-describedby');
  };

  const showError = (input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, message: string) => {
    const error = errorFor(input);
    if (!error) return;
    error.textContent = message;
    error.hidden = false;
    input.setAttribute('aria-invalid', 'true');
    const describedBy = new Set((input.getAttribute('aria-describedby') ?? '').split(' ').filter(Boolean));
    describedBy.add(error.id);
    input.setAttribute('aria-describedby', [...describedBy].join(' '));
  };

  const fieldsOf = (root: ParentNode) =>
    [...root.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea')].filter(
      (input) => input.type !== 'radio' && input.type !== 'file' && input.type !== 'hidden' && !input.closest('.form-trap'),
    );

  // Referència de la consulta (§4.6 del pla): es manté mentre no es canviï res, de manera que un
  // segon clic o un reenviament després d'un error no dupliquen el correu.
  const newReference = () => {
    const bytes = crypto.getRandomValues(new Uint8Array(10));
    if (refInput) refInput.value = [...bytes].map((byte) => REF_ALPHABET[byte % REF_ALPHABET.length]).join('');
  };
  newReference();
  let acceptedRef = '';
  const changed = () => {
    if (acceptedRef && refInput?.value === acceptedRef) newReference();
    acceptedRef = '';
  };

  // Canviar de branca amaga i desactiva els camps de l'altra i n'esborra els errors, però
  // conserva el que s'hi hagi escrit per si l'usuari hi torna (traspàs de Fase 4).
  const setBranch = (value: string | null) => {
    const selected = value === 'empresa' ? 'empresa' : 'particular';
    radios.forEach((radio) => (radio.checked = radio.value === selected));
    fieldsets.forEach((fieldset) => {
      const active = fieldset.dataset.branch === selected;
      fieldset.hidden = !active;
      fieldset.disabled = !active;
      if (!active) fieldsOf(fieldset).forEach(clearError);
    });
    // Les etiquetes i ajudes de cada branca les canvia el CSS (contact.css); aquí només el placeholder.
    if (description) description.placeholder = description.dataset[selected === 'empresa' ? 'placeholderEmpresa' : 'placeholderParticular'] ?? '';
    if (status) status.hidden = true;
  };

  // Preselecció: ?tipus=empresa|particular; sense paràmetre, arribar des d'Industrial obre Empresa.
  const params = new URLSearchParams(window.location.search);
  const requested = params.get('tipus');
  // La ruta d'Industrial de l'idioma de la pàgina (/industrial/, /es/industrial/) la dona el formulari.
  const fromIndustrial = document.referrer.startsWith(`${window.location.origin}${form.dataset.industrialPath ?? '/industrial/'}`);
  setBranch(requested ?? (fromIndustrial ? 'empresa' : 'particular'));
  // ?servei=… preselecciona el servei al desplegable de la branca activa (p. ex. mobiliari des de la
  // Home o carros des d'Industrial). Cada branca té el seu desplegable; només s'envia el de l'activa.
  const requestedService = params.get('servei');
  const activeBranch = radios.find((radio) => radio.checked)?.value === 'empresa' ? 'empresa' : 'particular';
  const branchService = activeBranch === 'empresa' ? form.querySelector<HTMLSelectElement>('#servei-empresa') : service;
  if (branchService && requestedService && [...branchService.options].some((option) => option.value === requestedService)) {
    branchService.value = requestedService;
  }
  // El canvi de branca es fon suaument (View Transition); sense suport, és immediat.
  radios.forEach((radio) => radio.addEventListener('change', () => withViewTransition(() => setBranch(radio.value))));

  fileInput?.addEventListener('change', () => {
    if (fileName) fileName.textContent = fileInput.files?.[0]?.name ?? noFile;
    clearError(fileInput);
    changed();
  });

  fieldsOf(form).forEach((input) => {
    input.addEventListener('input', () => {
      clearError(input);
      changed();
    });
    input.addEventListener('change', () => clearError(input));
  });
  radios.forEach((radio) => radio.addEventListener('change', changed));

  const showStatus = (message: string, state: string, focus = true) => {
    if (!status) return;
    status.textContent = message;
    status.dataset.state = state;
    status.hidden = false;
    if (focus) status.focus();
  };

  // El camp de cada error que torna la funció (`servei` a Particulars, `producte` a Industrial).
  const inputFor = (field: string) => {
    if (field === 'tipus') return undefined;
    return form.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(`[name="${field}"]`) ?? undefined;
  };

  let sending = false;
  const send = async () => {
    if (!submit || sending) return;
    sending = true;
    submit.disabled = true;
    submit.setAttribute('aria-busy', 'true');
    showStatus(messages.sending, 'sending', false);
    if (elapsedInput) elapsedInput.value = String(Date.now() - loadedAt);
    const sentRef = refInput?.value ?? '';
    try {
      const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { accept: 'application/json' } });
      const result = (await response.json().catch(() => undefined)) as { state?: string; message?: string; errors?: Record<string, string> } | undefined;
      if (!result?.message) {
        // Resposta que no és de la funció (per exemple, el límit de Netlify o un error de la xarxa).
        showStatus(response.status === 429 ? messages.rateLimited : response.status === 413 ? messages.fileSize : messages.failed, 'error');
        return;
      }
      if (result.errors && Object.keys(result.errors).length) {
        let first: HTMLElement | undefined;
        for (const [field, message] of Object.entries(result.errors)) {
          const input = inputFor(field);
          if (!input) continue;
          showError(input, message);
          first ??= input;
        }
        showStatus(result.message, 'error', !first);
        first?.focus();
        return;
      }
      if (response.ok) {
        acceptedRef = sentRef;
        showStatus(result.message, result.state === 'sent' ? 'sent' : 'not-sent');
        return;
      }
      showStatus(result.message, 'error');
    } catch {
      showStatus(messages.failed, 'error');
    } finally {
      sending = false;
      submit.disabled = false;
      submit.removeAttribute('aria-busy');
    }
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!status) return;
    status.hidden = true;
    let firstInvalid: HTMLElement | undefined;
    for (const input of fieldsOf(form).filter((field) => !field.matches(':disabled'))) {
      clearError(input);
      const value = input.value.trim();
      let message = '';
      // Casella de consentiment (si l'assessor la demana): el valor sempre és «on», cal mirar si està marcada.
      if (input.type === 'checkbox') message = input.required && !(input as HTMLInputElement).checked ? errors.consent : '';
      else if (input.required && !value) message = errors.required;
      else if (input.type === 'email' && value && !(input as HTMLInputElement).validity.valid) message = errors.email;
      else if (input.type === 'tel' && value && !/^[+()\d\s.-]{7,25}$/.test(value)) message = errors.phone;
      if (message) {
        showError(input, message);
        firstInvalid ??= input;
      }
    }
    const file = fileInput?.files?.[0];
    if (fileInput && file) {
      clearError(fileInput);
      const accepted = (fileInput.accept || '').split(',').some((type) => (type.startsWith('.') ? file.name.toLowerCase().endsWith(type) : false));
      const message = file.size > maxBytes ? messages.fileSize : accepted ? '' : messages.fileType;
      if (message) {
        showError(fileInput, message);
        firstInvalid ??= fileInput;
      }
    }
    if (firstInvalid) {
      status.textContent = errors.summary;
      status.dataset.state = 'error';
      status.hidden = false;
      firstInvalid.focus();
      return;
    }
    void send();
  });
}

export {};
