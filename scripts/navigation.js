let positionCounter = 0;

window.addEventListener('keydown', (event) => {

  const distanceToGo = document.getElementById('weatherNav').clientWidth;

  if (event.key === 'ArrowRight') {
    let originalPosition = scrollX;

    event.preventDefault();

    let interval = setInterval(() => {
      scrollTo(scrollX + 10, 0);

      if (scrollX === originalPosition + distanceToGo || positionCounter === 6) {
        clearInterval(interval);
      }
    }, 10);

    if (positionCounter < 5) positionCounter++;
    console.log(positionCounter);
  } else if (event.key === 'ArrowLeft') {
    let originalPosition = scrollX;

    event.preventDefault();

    if (positionCounter > 0) positionCounter--;
    console.log(positionCounter);

    let interval = setInterval(() => {
      scrollTo(scrollX - 10, 0);

      if (scrollX === originalPosition - distanceToGo || scrollX === 0) {
        clearInterval(interval);
      }
    }, 10);
  }
});
