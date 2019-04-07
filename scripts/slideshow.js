window.addEventListener('load', () => {
  const arrowLeft = document.getElementById('arrowLeft');
  const arrowRight = document.getElementById('arrowRight');
  const imageBox = document.getElementById('images');
  const howmany = 8;
  let images = [];
  let src = [];

  for (let i = 0; i < howmany; i++) {
    src[i] = `img/slideshow/slideshow (${i+1}).jpg`;
  }

  for(let i = 0; i < src.length; i++) {
		images[i] = document.createElement("img");
		images[i].src = src[i];
    images[i].alt = i + ". Bild";
		imageBox.appendChild(images[i]);
    images[i].style.display = "none";
	}
  images[0].style.display = "block";

  arrowLeft.addEventListener('click', () => {
    let rack = images[0].src;

    for (let i = 0; i < images.length - 1; i++) {
      images[i].src = images[i+1].src;
      images[i].style.display = "none"
    }
    images[images.length-1].src = rack;
    images[0].style.display = "block";
  });

  arrowRight.addEventListener('click', () => {
    let rack = images[images.length-1].src;

    for (let i = images.length - 1; i > 0; i--) {
      images[i].src = images[i-1].src;
      images[i].style.display = "none";
    }
    images[0].src = rack;
    images[0].style.display = "block";
  });
});
