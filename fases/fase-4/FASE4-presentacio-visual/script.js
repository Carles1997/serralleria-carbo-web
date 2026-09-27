const progressFill = document.querySelector('#progress-fill');
const sectionLinks = [...document.querySelectorAll('.deck-nav a')];
const sections = sectionLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
let ticking = false;
function updateReadingPosition() {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progressFill.style.width = `${total > 0 ? Math.min(100, Math.max(0, window.scrollY / total * 100)) : 100}%`;
  const marker = window.scrollY + window.innerHeight * .38;
  let current = sections[0]?.id;
  for (const section of sections) if (section.offsetTop <= marker) current = section.id;
  for (const link of sectionLinks) {
    if (link.getAttribute('href') === `#${current}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
  ticking = false;
}
window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(updateReadingPosition); } }, { passive: true });
window.addEventListener('resize', updateReadingPosition);
updateReadingPosition();
