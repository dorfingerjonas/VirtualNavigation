
window.addEventListener('load', () => {
  let navTag = document.getElementById('nav');

  // let interval =  setInterval(() => {
  //   console.log(scrollY);
  //
  //   if (scrollY > 168.8) {
  //     navTag.style.position = "sticky";
  //   } else {
  //     navTag.style.position = "relative"
  //   }
  // }, 10);

  setInterval(function () {
    scrollY += 20;
    console.log(scrollY);
  }, 250);

});
