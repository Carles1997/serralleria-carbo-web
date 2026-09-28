// Revelació en entrar al viewport i comptadors de xifres. Millora progressiva:
// sense JavaScript o amb moviment reduït, el contingut i les xifres finals ja són a l'HTML.
const root = document.documentElement;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

function revealOnScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -6% 0px' },
  );
  document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
}

// Desacceleració forta: la xifra arriba de pressa a prop del valor i s'hi assenta.
const easeOutQuart = (t: number) => 1 - (1 - t) ** 4;

function countUp(element: HTMLElement, delay: number) {
  const target = Number(element.dataset.count);
  const duration = 1100;
  let start: number | undefined;
  element.textContent = '0';
  const frame = (now: number) => {
    start ??= now + delay;
    const progress = Math.min(Math.max((now - start) / duration, 0), 1);
    element.textContent = String(Math.round(target * easeOutQuart(progress)));
    if (progress < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

function countersOnScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.querySelectorAll<HTMLElement>('[data-count]').forEach((counter, index) => countUp(counter, index * 90));
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.35 },
  );
  document.querySelectorAll('[data-counters]').forEach((group) => observer.observe(group));
}

if (root.classList.contains('motion-ready') && !reduced.matches) {
  root.classList.add('motion-live');
  revealOnScroll();
  countersOnScroll();
}

export {};
