const filterBar = document.querySelector('.folio-filters');
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const cases = [...document.querySelectorAll('.folio-case[data-category]')];
const filterStatus = document.querySelector('.folio-filter-status');

if (filterBar && filterButtons.length && cases.length && filterStatus) {
  const validFilters = new Set(['tots', 'estructures', 'automatismes']);

  function setFilter(value) {
    const filter = validFilters.has(value) ? value : 'tots';
    let visibleCount = 0;

    cases.forEach(item => {
      const visible = filter === 'tots' || item.dataset.category === filter;
      item.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    filterButtons.forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.filter === filter));
    });
    filterStatus.textContent = `${visibleCount} projectes visibles`;
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => setFilter(button.dataset.filter));
  });

  filterBar.hidden = false;
  setFilter(new URLSearchParams(window.location.search).get('servei'));
}
