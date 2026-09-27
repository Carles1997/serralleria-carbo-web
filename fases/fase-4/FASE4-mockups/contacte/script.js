const contactForm = document.getElementById('contact-form');
const branchInputs = [...contactForm.querySelectorAll('input[name="tipus"]')];
const branches = {
  particular: {
    fields: document.getElementById('fields-particular'),
    aside: document.getElementById('aside-particular')
  },
  empresa: {
    fields: document.getElementById('fields-empresa'),
    aside: document.getElementById('aside-empresa')
  }
};
const uploadArea = document.querySelector('.upload-area');
const uploadLabel = document.querySelector('.upload-area label');
const uploadHelp = document.getElementById('upload-help');
const fileInput = document.getElementById('adjunt');
const fileName = document.getElementById('file-name');
const description = document.getElementById('descripcio');
const formStatus = document.getElementById('form-status');

function clearError(input) {
  input.removeAttribute('aria-invalid');
  const error = document.getElementById(input.id + '-error');
  if (error) {
    error.textContent = '';
    error.hidden = true;
  }
  const describedBy = (input.getAttribute('aria-describedby') || '').split(' ').filter(id => id && id !== input.id + '-error');
  if (describedBy.length) input.setAttribute('aria-describedby', describedBy.join(' '));
  else input.removeAttribute('aria-describedby');
}

function showError(input, message) {
  const error = document.getElementById(input.id + '-error');
  if (!error) return;
  error.textContent = message;
  error.hidden = false;
  input.setAttribute('aria-invalid', 'true');
  const describedBy = new Set((input.getAttribute('aria-describedby') || '').split(' ').filter(Boolean));
  describedBy.add(error.id);
  input.setAttribute('aria-describedby', [...describedBy].join(' '));
}

function setBranch(value) {
  const selected = value === 'empresa' ? 'empresa' : 'particular';
  branchInputs.find(input => input.value === selected).checked = true;
  for (const [name, branch] of Object.entries(branches)) {
    const active = name === selected;
    branch.fields.hidden = !active;
    branch.fields.disabled = !active;
    branch.aside.hidden = !active;
    if (!active) branch.fields.querySelectorAll('input, select, textarea').forEach(clearError);
  }
  const industrial = selected === 'empresa';
  uploadArea.classList.toggle('is-industrial', industrial);
  uploadLabel.textContent = industrial ? 'Plànol o documentació tècnica' : 'Fotografia, esbós o document';
  uploadHelp.textContent = industrial
    ? 'Adjunta la documentació disponible. El fitxer no s’enviarà des d’aquest mockup.'
    : 'Adjunta una fotografia o document si en tens. El fitxer no s’enviarà des d’aquest mockup.';
  description.placeholder = industrial
    ? 'Descriu la peça, l’aplicació i els requisits que ja coneixes.'
    : 'Descriu la feina o la incidència amb les teves paraules.';
  formStatus.hidden = true;
}

const requestedType = new URLSearchParams(window.location.search).get('tipus');
const fromIndustrial = document.referrer.includes('/industrial/');
setBranch(requestedType === 'empresa' || (!requestedType && fromIndustrial) ? 'empresa' : 'particular');
const requestedService = new URLSearchParams(window.location.search).get('servei');
if (requestedService === 'carros') {
  const serviceSelect = document.getElementById('servei');
  if (serviceSelect) serviceSelect.value = 'carros';
}
branchInputs.forEach(input => input.addEventListener('change', () => setBranch(input.value)));

fileInput.addEventListener('change', () => {
  fileName.textContent = fileInput.files.length ? fileInput.files[0].name : 'Cap fitxer seleccionat';
});

contactForm.querySelectorAll('input, select, textarea').forEach(input => {
  if (input.type === 'radio' || input.type === 'file') return;
  input.addEventListener('input', () => clearError(input));
  input.addEventListener('change', () => clearError(input));
});

contactForm.addEventListener('submit', event => {
  event.preventDefault();
  formStatus.hidden = true;
  const fields = [...contactForm.querySelectorAll('input, select, textarea')]
    .filter(input => !input.matches(':disabled') && input.type !== 'radio' && input.type !== 'file');
  let firstInvalid = null;

  for (const input of fields) {
    clearError(input);
    const value = input.value.trim();
    let message = '';
    if (input.required && !value) message = 'Falta informació en aquest camp.';
    else if (input.type === 'email' && value && !input.validity.valid) message = 'Revisa el format del correu electrònic.';
    else if (input.type === 'tel' && value && !/^[+()\d\s.-]{7,}$/.test(value)) message = 'Revisa el format del telèfon.';
    if (message) {
      showError(input, message);
      firstInvalid ||= input;
    }
  }

  if (firstInvalid) {
    formStatus.textContent = 'Revisa els camps marcats per continuar.';
    formStatus.hidden = false;
    firstInvalid.focus();
    return;
  }

  formStatus.innerHTML = 'Aquesta és una maqueta: la consulta no s’ha enviat. Pots contactar directament per <a href="mailto:carbo@serralleriacarbo.com">correu</a> o per <a href="tel:+34630661908">telèfon</a>.';
  formStatus.hidden = false;
  formStatus.focus();
});