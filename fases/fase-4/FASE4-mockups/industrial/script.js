// El menú comparteix el comportament de la portada general.
// Aquesta pàgina amplia el punt de canvi de navegació per la quantitat d'enllaços industrials.
const industrialDesktop = window.matchMedia('(min-width: 1321px)');
industrialDesktop.addEventListener('change', (event) => {
  if (!event.matches) return;
  const button = document.querySelector('.menu-toggle');
  const nav = document.getElementById('mobile-nav');
  if (button && nav) {
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Obre el menú');
    nav.hidden = true;
  }
});


// La seqüència de sèries explica el mètode mentre entra al camp de visió.
// Sense JavaScript o amb moviment reduït, tots els passos continuen visibles.
const seriesSteps = document.querySelector('.i-series-steps');
if (seriesSteps) {
  const steps = [...seriesSteps.querySelectorAll('.i-series-step')];
  const method = document.getElementById('proces');
  const smallScreen = window.matchMedia('(max-width: 760px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (value) => Math.max(0, Math.min(1, value));
  let frame = 0;

  function updateSeries() {
    frame = 0;
    if (reducedMotion.matches) {
      document.documentElement.classList.remove('has-series-motion');
      seriesSteps.style.removeProperty('--series-progress');
      steps.forEach((step) => step.classList.add('is-visible'));
      return;
    }

    document.documentElement.classList.add('has-series-motion');
    const revealLine = window.innerHeight * (smallScreen.matches ? .88 : .76);
    let progress;
    if (smallScreen.matches) {
      const firstTop = steps[0].getBoundingClientRect().top;
      const lastTop = steps.at(-1).getBoundingClientRect().top;
      progress = clamp((revealLine - firstTop) / Math.max(1, lastTop - firstTop));
      steps.forEach((step) => {
        step.classList.toggle('is-visible', step.getBoundingClientRect().top <= revealLine);
      });
    } else {
      const top = method.getBoundingClientRect().top;
      const visibility = clamp((window.innerHeight * .8 - top) / (window.innerHeight * .7));
      progress = clamp((visibility - .12) / .72);
      steps.forEach((step, index) => {
        step.classList.toggle('is-visible', visibility >= .12 + index * .24);
      });
    }
    seriesSteps.style.setProperty('--series-progress', progress.toFixed(3));
  }

  function queueSeriesUpdate() {
    if (frame) return;
    frame = requestAnimationFrame(updateSeries);
  }

  window.addEventListener('scroll', queueSeriesUpdate, { passive: true });
  window.addEventListener('resize', queueSeriesUpdate);
  smallScreen.addEventListener('change', queueSeriesUpdate);
  reducedMotion.addEventListener('change', queueSeriesUpdate);
  updateSeries();
}
