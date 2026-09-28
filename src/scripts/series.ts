// Mètode de sèries (plantilla I), portat de fases/fase-4/FASE4-mockups/industrial/script.js:
// la línia avança amb el desplaçament i cada pas s'encén quan la línia hi arriba.
// Millora progressiva: sense JavaScript o amb moviment reduït, tots els passos són visibles
// i la línia és completa.
const list = document.querySelector<HTMLElement>('[data-series]');
const method = list?.closest<HTMLElement>('.i-series-method');

if (list && method && document.documentElement.classList.contains('motion-ready')) {
  const steps = [...list.querySelectorAll<HTMLElement>('.i-series-step')];
  const smallScreen = window.matchMedia('(max-width: 760px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (value: number) => Math.max(0, Math.min(1, value));
  let frame = 0;

  const update = () => {
    frame = 0;
    if (reducedMotion.matches) {
      list.classList.remove('has-series-motion');
      list.style.removeProperty('--series-progress');
      steps.forEach((step) => step.classList.add('is-visible'));
      return;
    }
    list.classList.add('has-series-motion');
    let progress: number;
    if (smallScreen.matches) {
      // En columna, la línia segueix els nodes: cada pas s'encén en creuar el llindar.
      const revealLine = window.innerHeight * 0.88;
      const firstTop = steps[0].getBoundingClientRect().top;
      const lastTop = steps[steps.length - 1].getBoundingClientRect().top;
      progress = clamp((revealLine - firstTop) / Math.max(1, lastTop - firstTop));
      steps.forEach((step) => step.classList.toggle('is-visible', step.getBoundingClientRect().top <= revealLine));
    } else {
      const top = method.getBoundingClientRect().top;
      const visibility = clamp((window.innerHeight * 0.8 - top) / (window.innerHeight * 0.7));
      progress = clamp((visibility - 0.12) / 0.72);
      steps.forEach((step, index) => step.classList.toggle('is-visible', visibility >= 0.12 + index * 0.24));
    }
    list.style.setProperty('--series-progress', progress.toFixed(3));
  };

  const queue = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', queue);
  smallScreen.addEventListener('change', queue);
  reducedMotion.addEventListener('change', queue);
  update();
}

export {};
