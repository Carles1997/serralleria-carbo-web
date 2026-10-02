// Formulari de contacte (plantilla C). Millora progressiva: activa el botó, canvia els camps
// segons la branca, preselecciona des de la URL i valida al navegador. NO envia res: sense
// backend, validació al servidor i textos legals no hi ha enviament ni cap estat d'èxit.
import { withViewTransition } from './view-transition';

const form = document.querySelector<HTMLFormElement>('[data-contact-form]');

if (form) {
  const errors = JSON.parse(form.dataset.errors ?? '{}') as Record<'required' | 'email' | 'phone' | 'summary' | 'consent', string>;
  const radios = [...form.querySelectorAll<HTMLInputElement>('input[name="tipus"]')];
  const fieldsets = [...form.querySelectorAll<HTMLFieldSetElement>('[data-branch]')];
  const asides = [...document.querySelectorAll<HTMLElement>('[data-aside]')];
  const upload = form.querySelector<HTMLElement>('[data-upload]');
  const uploadLabel = upload?.querySelector<HTMLLabelElement>('label:not(.upload-button)');
  const uploadHelp = upload?.querySelector<HTMLElement>('#upload-help');
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
      (input) => input.type !== 'radio' && input.type !== 'file',
    );

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
    asides.forEach((aside) => (aside.hidden = aside.dataset.aside !== selected));
    upload?.classList.toggle('is-industrial', selected === 'empresa');
    if (uploadLabel) uploadLabel.textContent = uploadLabel.dataset[selected === 'empresa' ? 'labelEmpresa' : 'labelParticular'] ?? '';
    if (uploadHelp) uploadHelp.textContent = uploadHelp.dataset[selected === 'empresa' ? 'helpEmpresa' : 'helpParticular'] ?? '';
    if (description) description.placeholder = description.dataset[selected === 'empresa' ? 'placeholderEmpresa' : 'placeholderParticular'] ?? '';
    if (status) status.hidden = true;
  };

  // Preselecció: ?tipus=empresa|particular; sense paràmetre, arribar des d'Industrial obre Empresa.
  const params = new URLSearchParams(window.location.search);
  const requested = params.get('tipus');
  const fromIndustrial = document.referrer.startsWith(`${window.location.origin}/industrial/`);
  setBranch(requested ?? (fromIndustrial ? 'empresa' : 'particular'));
  // ?servei=… preselecciona el servei si existeix al desplegable (p. ex. carros des de la Home).
  const requestedService = params.get('servei');
  if (service && requestedService && [...service.options].some((option) => option.value === requestedService)) {
    service.value = requestedService;
  }
  // El canvi de branca es fon suaument (View Transition); sense suport, és immediat.
  radios.forEach((radio) => radio.addEventListener('change', () => withViewTransition(() => setBranch(radio.value))));

  fileInput?.addEventListener('change', () => {
    if (fileName) fileName.textContent = fileInput.files?.[0]?.name ?? noFile;
  });

  fieldsOf(form).forEach((input) => {
    input.addEventListener('input', () => clearError(input));
    input.addEventListener('change', () => clearError(input));
  });

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
      else if (input.type === 'tel' && value && !/^[+()\d\s.-]{7,}$/.test(value)) message = errors.phone;
      if (message) {
        showError(input, message);
        firstInvalid ??= input;
      }
    }
    if (firstInvalid) {
      status.textContent = errors.summary;
      status.dataset.state = 'error';
      status.hidden = false;
      firstInvalid.focus();
      return;
    }
    // Dades correctes, però no hi ha enviament: ho diem clarament i oferim el contacte directe.
    status.textContent = form.dataset.notSent ?? '';
    status.dataset.state = 'not-sent';
    status.hidden = false;
    status.focus();
  });

  if (submit) submit.disabled = false;
}

export {};
