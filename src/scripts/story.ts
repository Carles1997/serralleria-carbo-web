// Història de casos destacats (plantilla P): el capítol més proper al centre de la zona de
// lectura marca la fotografia, el número i el progrés de l'escenari. A escriptori, l'escenari és al
// costat i la zona de lectura és la pantalla; a mòbil, l'escenari queda ancorat a dalt i la zona de
// lectura és l'espai que deixa a sota. Sense JavaScript, els capítols es llegeixen seguits i
// l'escenari mostra el primer cas.
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

document.querySelectorAll<HTMLElement>('[data-story]').forEach((story) => {
  const chapters = [...story.querySelectorAll<HTMLElement>('[data-story-chapter]')];
  const number = story.querySelector<HTMLElement>('[data-story-number]');
  const progress = story.querySelector<HTMLElement>('[data-story-progress]');
  const images = [...story.querySelectorAll<HTMLElement>('[data-story-image]')];
  const stage = story.querySelector<HTMLElement>('.p-story-stage');
  if (!chapters.length) return;

  let active = -1;
  let pending = false;

  const update = () => {
    pending = false;
    const bounds = story.getBoundingClientRect();
    if (bounds.top >= window.innerHeight || bounds.bottom <= 0) return;
    // Escenari apilat (mòbil): la lectura comença sota la fotografia ancorada.
    const stacked = stage !== null && stage.offsetWidth > story.offsetWidth * 0.9;
    const top = stacked ? Math.max(0, stage.getBoundingClientRect().bottom) : 0;
    const center = top + (window.innerHeight - top) * (stacked ? 0.45 : 0.52);
    let closest = 0;
    let distance = Infinity;
    chapters.forEach((chapter, index) => {
      const box = chapter.getBoundingClientRect();
      const gap = Math.abs(box.top + box.height / 2 - center);
      if (gap < distance) [distance, closest] = [gap, index];
    });
    if (closest === active) return;

    const first = active === -1;
    active = closest;
    chapters.forEach((chapter, index) => chapter.classList.toggle('is-active', index === active));
    images.forEach((image, index) => image.classList.toggle('is-active', index === active));
    progress?.style.setProperty('scale', `${(active + 1) / chapters.length} 1`);
    if (!number) return;
    number.textContent = String(active + 1).padStart(2, '0');
    if (!first && !reduced.matches) {
      number.animate(
        [
          { opacity: 0, translate: '0 0.08em', filter: 'blur(10px)' },
          { opacity: 1, translate: '0 0', filter: 'blur(0)' },
        ],
        { duration: 520, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' },
      );
    }
  };

  const schedule = () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(update);
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  update();
});

export {};
