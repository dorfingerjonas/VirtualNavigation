window.addEventListener('load', () => {
  let navTag = document.getElementById('nav');

  let interval =  setInterval(() => {

    if (scrollY > 130) {
      navTag.style.boxShadow = '0px 7px 4px -2px rgba(184,184,184,1)';
    } else {
      navTag.style.boxShadow = '0px 0px 0px 0px rgba(184,184,184,1)';
    }
  }, 10);
});