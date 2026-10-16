// Marques abans del primer pintat: «js» (menú) i «motion-ready» (revelacions).
// Si el mòdul de moviment no arriba a activar-se, es retira i tot queda visible.
// BaseLayout l'insereix tal qual (is:inline); astro.config.mjs en calcula l'empremta per a la CSP a partir
// d'aquest mateix fitxer. No l'importeu des d'un altre script: el text ha de ser idèntic.
(() => {
  const root = document.documentElement;
  root.classList.add('js');
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    root.classList.add('motion-ready');
    setTimeout(() => root.classList.contains('motion-live') || root.classList.remove('motion-ready'), 2500);
  }
})();
