// Mapa de la ubicació (plantilla C). Indicació del director (01/10/2026): mapa interactiu de Google
// Maps amb el taller. Per privacitat i rendiment, la pàgina no connecta amb Google fins que el
// visitant ho demana: abans es mostra una vista estàtica amb l'adreça. Sense JavaScript, queda la
// vista estàtica i l'enllaç «Obrir a Google Maps».
document.querySelectorAll<HTMLElement>('[data-map]').forEach((map) => {
  const enhanced = map.querySelector<HTMLElement>('[data-map-enhanced]');
  const button = map.querySelector<HTMLButtonElement>('[data-map-load]');
  const src = map.dataset.src;
  if (!enhanced || !button || !src) return;
  enhanced.hidden = false;

  button.addEventListener(
    'click',
    () => {
      const frame = document.createElement('iframe');
      frame.src = src;
      frame.title = map.dataset.title ?? '';
      frame.referrerPolicy = 'no-referrer-when-downgrade';
      frame.allowFullscreen = true;
      map.classList.add('is-loading');
      frame.addEventListener('load', () => map.classList.replace('is-loading', 'is-loaded'), { once: true });
      map.append(frame);
      // El focus passa al mapa perquè el teclat no quedi en un botó que desapareix.
      frame.focus();
    },
    { once: true },
  );
});

export {};
