// Mètode de sèries (plantilla I), portat de fases/fase-4/FASE4-mockups/industrial/script.js:
// la línia avança amb el desplaçament i cada node s'encén quan la línia hi arriba.
// Indicació del director (29/09/2026): la línia comença a omplir-se quan la lectura ja és dins
// la secció, no en entrar-hi. Per això l'aparició de cada pas (is-visible, en entrar a la pantalla)
// queda separada del node encès (is-lit, quan la línia hi arriba).
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

  // Rendiment (Fase 6, bloc 2, 08/10/2026): les lectures de geometria es fan totes abans de cap
  // escriptura, perquè alternar-les forçava un recàlcul complet del layout a cada pas; i el mètode
  // no es prepara fins que s'acosta a la pantalla. Abans, la crida inicial bloquejava el primer
  // pintat d'Industrial en mòbil (fases/fase-6/FASE6-bloc2-rendiment.md).
  const update = () => {
    frame = 0;
    if (reducedMotion.matches) {
      list.classList.remove('has-series-motion');
      list.style.removeProperty('--series-progress');
      steps.forEach((step) => {
        step.classList.add('is-visible', 'is-lit');
        step.style.removeProperty('--fill');
      });
      return;
    }
    list.classList.add('has-series-motion');
    const viewport = window.innerHeight;
    if (smallScreen.matches) {
      // En columna: cada tram s'omple entre dos nodes quan la línia de lectura (60 % de la
      // pantalla) els travessa; el text de cada pas apareix abans, en entrar a la pantalla.
      const readLine = viewport * 0.6;
      const tops = steps.map((step) => step.getBoundingClientRect().top);
      // Centre del node de cada pas (en columna, --dot-y dins del pas).
      const nodes = steps.map((step, index) => tops[index] + (parseFloat(getComputedStyle(step, '::before').top) || 0));
      steps.forEach((step, index) => {
        step.classList.toggle('is-visible', tops[index] <= viewport * 0.88);
        step.classList.toggle('is-lit', nodes[index] <= readLine);
        const next = nodes[index + 1];
        if (next !== undefined) step.style.setProperty('--fill', clamp((readLine - nodes[index]) / Math.max(1, next - nodes[index])).toFixed(3));
      });
      return;
    }
    // En fila: els passos apareixen en entrar el mètode a la pantalla; la línia comença quan el
    // mètode ja és dins la lectura (75 % de la pantalla) i acaba quan la seva part alta arriba al
    // 30 %. Mètode compacte (refinament del 06/10/2026): tot el recorregut passa amb el bloc visible.
    const top = method.getBoundingClientRect().top;
    const visibility = clamp((viewport * 0.85 - top) / (viewport * 0.6));
    const progress = clamp((viewport * 0.75 - top) / (viewport * 0.45));
    steps.forEach((step, index) => {
      step.classList.toggle('is-visible', visibility >= 0.12 + index * 0.24);
      step.classList.toggle('is-lit', progress > 0 && progress >= index / Math.max(1, steps.length - 1) - 0.001);
    });
    list.style.setProperty('--series-progress', progress.toFixed(3));
  };

  const queue = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  const start = () => {
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    smallScreen.addEventListener('change', queue);
    reducedMotion.addEventListener('change', queue);
    update();
  };

  // Fins que el mètode és a menys d'una pantalla de distància, es veu complet (estat sense
  // JavaScript); en acostar-s'hi, pren l'estat inicial de l'animació abans que sigui visible.
  const near = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      near.disconnect();
      start();
    },
    { rootMargin: '100% 0px 100% 0px' },
  );
  near.observe(method);
}

export {};
