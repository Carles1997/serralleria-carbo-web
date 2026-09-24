const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobile-nav');

function closeMenu(restoreFocus = false) {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Obre el menú');
  mobileNav.hidden = true;
  if (restoreFocus) menuButton.focus();
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  if (isOpen) {
    closeMenu();
  } else {
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Tanca el menú');
    mobileNav.hidden = false;
    mobileNav.querySelector('a').focus();
  }
});

mobileNav.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) closeMenu(true);
});

window.matchMedia('(min-width: 1001px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

const projectSlides = [...document.querySelectorAll('.project-slide')];
const projectButtons = [...document.querySelectorAll('[data-project]')];
const projectNavigator = document.querySelector('.project-navigator');
const projectCurrent = document.querySelector('.project-current');
const projectMediaNumber = document.querySelector('.project-media-number');

if (projectSlides.length === projectButtons.length && projectSlides.length > 0 && projectNavigator) {
  let activeProject = 0;

  function showProject(index, focusButton = false) {
    activeProject = (index + projectSlides.length) % projectSlides.length;
    projectSlides.forEach((slide, slideIndex) => {
      slide.hidden = slideIndex !== activeProject;
    });
    projectButtons.forEach((button, buttonIndex) => {
      button.setAttribute('aria-pressed', String(buttonIndex === activeProject));
    });
    const count = String(activeProject + 1).padStart(2, '0');
    projectCurrent.textContent = count + ' / ' + String(projectSlides.length).padStart(2, '0');
    projectMediaNumber.textContent = count;
    if (focusButton) projectButtons[activeProject].focus();
  }

  showProject(0);
  projectNavigator.hidden = false;

  projectButtons.forEach((button, index) => {
    button.addEventListener('click', () => showProject(index));
    button.addEventListener('keydown', event => {
      const offset = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
      if (offset) {
        event.preventDefault();
        showProject(index + offset, true);
      } else if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault();
        showProject(event.key === 'Home' ? 0 : projectSlides.length - 1, true);
      }
    });
  });

  document.querySelector('.project-prev').addEventListener('click', () => showProject(activeProject - 1));
  document.querySelector('.project-next').addEventListener('click', () => showProject(activeProject + 1));
}
