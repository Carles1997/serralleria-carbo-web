const chapters = [...document.querySelectorAll('[data-story-chapter]')];
const storyNumber = document.querySelector('[data-story-number]');
const storyProgress = document.querySelector('[data-story-progress]');
const story = document.querySelector('.p-project-story');

if (chapters.length && storyNumber && storyProgress && story) {
  let activeIndex = -1;
  let framePending = false;

  function updateStory() {
    framePending = false;
    const storyBounds = story.getBoundingClientRect();
    if (storyBounds.top >= window.innerHeight || storyBounds.bottom <= 0) return;
    const viewportCenter = window.innerHeight * 0.52;
    let closestIndex = 0;
    let closestDistance = Infinity;

    chapters.forEach((chapter, index) => {
      const bounds = chapter.getBoundingClientRect();
      const center = bounds.top + bounds.height / 2;
      const distance = Math.abs(center - viewportCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex === activeIndex) return;
    activeIndex = closestIndex;
    chapters.forEach((chapter, index) => chapter.classList.toggle('is-active', index === activeIndex));
    storyNumber.textContent = String(activeIndex + 1).padStart(2, '0');
    storyProgress.style.width = String(((activeIndex + 1) / chapters.length) * 100) + '%';
  }

  function scheduleStoryUpdate() {
    if (framePending) return;
    framePending = true;
    requestAnimationFrame(updateStory);
  }

  window.addEventListener('scroll', scheduleStoryUpdate, { passive: true });
  window.addEventListener('resize', scheduleStoryUpdate);
  updateStory();
}
