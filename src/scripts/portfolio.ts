// Filtres del portafoli (plantilla PP). Sense JavaScript, la barra de filtres queda amagada i
// els casos es veuen tots. `?servei=estructures|automatismes` obre el filtre corresponent i la
// URL es manté sincronitzada amb replaceState, sense crear rutes noves (traspàs de Fase 4).
import { canTransition, withViewTransition } from './view-transition';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

document.querySelectorAll<HTMLElement>('[data-filters]').forEach((bar) => {
  const buttons = [...bar.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  const list = document.getElementById(bar.dataset.filters ?? '');
  const cases = [...(list?.querySelectorAll<HTMLElement>('[data-category]') ?? [])];
  const status = bar.querySelector<HTMLElement>('[data-filter-status]');
  const indicator = bar.querySelector<HTMLElement>('[data-filter-indicator]');
  if (!list || !buttons.length || !cases.length) return;

  const valid = new Set(buttons.map((button) => button.dataset.filter));
  const statusTemplate = bar.dataset.status ?? '{n}';

  const placeIndicator = () => {
    const active = buttons.find((button) => button.getAttribute('aria-pressed') === 'true');
    if (!active || !indicator) return;
    indicator.style.width = `${active.offsetWidth}px`;
    indicator.style.translate = `${active.offsetLeft}px 0`;
  };

  // viaTransition: el canvi el mostra la View Transition (els casos es recol·loquen); si no n'hi
  // ha, els casos visibles tornen a entrar breument (alternativa anterior).
  const apply = (value: string | null, initial = false, viaTransition = false) => {
    const filter = value && valid.has(value) ? value : 'tots';
    const shown = cases.filter((item) => filter === 'tots' || item.dataset.category === filter);
    cases.forEach((item) => (item.hidden = !shown.includes(item)));
    buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
    placeIndicator();
    if (status) status.textContent = statusTemplate.replace('{n}', String(shown.length));
    if (initial) return;

    const url = new URL(window.location.href);
    if (filter === 'tots') url.searchParams.delete('servei');
    else url.searchParams.set('servei', filter);
    window.history.replaceState(null, '', url);

    if (!reduced.matches && !viaTransition) {
      shown.forEach((item, index) => {
        item.classList.remove('is-entering');
        void item.offsetWidth; // reinicia l'animació d'entrada
        item.style.setProperty('--enter-i', String(index));
        item.classList.add('is-entering');
      });
    }
    // Si la llista ha quedat per sobre de la barra fixa, torna a l'inici dels casos.
    const gap = list.getBoundingClientRect().top - bar.getBoundingClientRect().bottom;
    if (gap < 0) window.scrollBy({ top: gap, behavior: reduced.matches || viaTransition ? 'instant' : 'smooth' });
  };

  cases.forEach((item) =>
    item.addEventListener('animationend', (event) => {
      if (event.target === item) item.classList.remove('is-entering');
    }),
  );
  buttons.forEach((button) =>
    button.addEventListener('click', () => {
      const value = button.dataset.filter ?? null;
      if (canTransition()) withViewTransition(() => apply(value, false, true), cases, 'folio-case');
      else apply(value);
    }),
  );

  bar.hidden = false;
  bar.classList.add('has-indicator');
  apply(new URLSearchParams(window.location.search).get('servei'), true);
  // Primer posicionament sense transició; després, la barra llisca entre filtres.
  document.fonts.ready.then(() => {
    placeIndicator();
    requestAnimationFrame(() => indicator?.classList.add('is-ready'));
  });
  window.addEventListener('resize', placeIndicator);
});

export {};
