
window.addEventListener('load', () => {
  let navTag = document.getElementById('nav');
  
  let interval =  setInterval(() => {
    console.log(scrollY);

    if (scrollY > 168.8) {
      navTag.style.position = "fixed";
    } else {
      navTag.style.position = "relative"
    }
  }, 10);
});
