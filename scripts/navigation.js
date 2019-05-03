window.addEventListener('load', () => {
  scrollTo(document.getElementById('nav').clientWidth / 2 - innerWidth / 2, 0);
});

window.addEventListener('keydown', (event) => {

  const distanceToGo = document.getElementById('weatherNav').clientWidth;

  console.log(parseInt(document.getElementById('weatherNav').clientWidth));

  if (event.key === 'ArrowRight') {
    let originalPosition = scrollX;

    event.preventDefault();

    let interval = setInterval(() => {
      scrollTo(scrollX + 10, 0);

      if (scrollX === originalPosition + distanceToGo) {
        clearInterval(interval);
      }
    }, 10);
  } else if (event.key === 'ArrowLeft') {
    let originalPosition = scrollX;

    event.preventDefault();

    let interval = setInterval(() => {
      scrollTo(scrollX - 10, 0);

      if (scrollX === originalPosition - distanceToGo) {
        clearInterval(interval);
      }
    }, 10);
  }
});
