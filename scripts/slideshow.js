window.addEventListener('load', () => {
  const arrowLeft = document.getElementById('arrowLeft');
  const arrowRight = document.getElementById('arrowRight');
  const imageBox = document.getElementById('images');
  const howmany = 11;
  let images = [];
  let src = [];

setTimeout(function () {
  document.getElementById('iconWrapper').style.height = document.images[0].clientHeight + 'px';
}, 50);

  for (let i = 0; i < howmany; i++) {
    src[i] = `img/slideshow/slideshow (${i + 1}).jpg`;
  }

  for(let i = 0; i < src.length; i++) {
		images[i] = document.createElement('img');
		images[i].src = src[i];
    images[i].alt = (i + 1) + '. Bild';
		imageBox.appendChild(images[i]);
    images[i].style.display = 'none';
	}
  images[0].style.display = 'block';

  arrowLeft.addEventListener('click', goLeft);

  arrowRight.addEventListener('click', goRight);

  setTimeout(function () {
    setInterval(function () {
      goRight();
    }, 7000);
  }, 5000);

  function goRight() {
    let rack = images[images.length-1].src;

    for (let i = images.length - 1; i > 0; i--) {
      images[i].src = images[i-1].src;
      images[i].style.display = 'none';
    }
    images[0].src = rack;
    images[0].style.display = 'block';
  }

  function goLeft() {
    let rack = images[0].src;

    for (let i = 0; i < images.length - 1; i++) {
      images[i].src = images[i+1].src;
      images[i].style.display = 'none'
    }
    images[images.length-1].src = rack;
    images[0].style.display = 'block';
  }

});
