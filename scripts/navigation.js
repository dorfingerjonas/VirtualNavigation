window.addEventListener('load', () => {
  scrollTo(document.getElementById('nav').clientWidth / 2 - innerWidth / 2, 0);
});
window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    let originalPosition = scrollX;

    event.preventDefault();

    let interval = setInterval(() => {
      scrollTo(scrollX + 1, 0);

      if (scrollX === originalPosition + innerWidth) {
        clearInterval(interval);
      }
    }, 10);
  }
});
