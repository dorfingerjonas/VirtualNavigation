window.addEventListener('load', () => {
  scrollTo(document.getElementById('nav').clientWidth / 2 - innerWidth / 2, 0);
});

window.addEventListener('keydown', (event) => {

  const distanceToGo = document.getElementById('nav').childNodes[0].clientWidth;

  console.log(parseInt(document.getElementById('nav').childNodes[0].clientWidth));

  if (event.key === 'ArrowRight') {
    let originalPosition = scrollX;

    event.preventDefault();

    let interval = setInterval(() => {
      scrollTo(scrollX + distanceToGo, 0);

      if (scrollX === originalPosition + innerWidth) {
        clearInterval(interval);
      }
    }, 10);
  } else if (event.key === 'ArrowLeft') {
    let originalPosition = scrollX;

    event.preventDefault();

    let interval = setInterval(() => {
      scrollTo(scrollX - distanceToGo, 0);

      if (scrollX === originalPosition + innerWidth) {
        clearInterval(interval);
      }
    }, 10);
  }
});
