// Canvis d'estat dins la pàgina amb la View Transitions API (Bloc 4 del pla d'afinament).
// El canvi del DOM és el mateix amb o sense transició: sense suport o amb moviment reduït, s'aplica
// immediatament. Els elements indicats reben un nom propi només durant la transició, de manera que
// es desplacen fins a la posició nova en lloc de desaparèixer i reaparèixer.
type ViewTransition = { finished: Promise<void> };
type DocumentWithTransitions = Document & { startViewTransition?: (update: () => void) => ViewTransition };

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

export const canTransition = () =>
  !reduced.matches && typeof (document as DocumentWithTransitions).startViewTransition === 'function';

export function withViewTransition(update: () => void, named: HTMLElement[] = [], group = 'vt') {
  const doc = document as DocumentWithTransitions;
  if (!canTransition() || !doc.startViewTransition) {
    update();
    return;
  }
  named.forEach((element, index) => {
    element.style.setProperty('view-transition-name', `${group}-${index + 1}`);
    element.style.setProperty('view-transition-class', group);
  });
  const transition = doc.startViewTransition(update);
  transition.finished.finally(() =>
    named.forEach((element) => {
      element.style.removeProperty('view-transition-name');
      element.style.removeProperty('view-transition-class');
    }),
  );
}
