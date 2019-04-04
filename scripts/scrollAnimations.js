window.addEventListener('load', () => {
  const navTag = document.getElementById('nav');
  const accWndw = document.getElementById('accountWindow');

  let interval =  setInterval(() => {

    if (scrollY > 130) {
      navTag.style.boxShadow = '0px 7px 4px -2px rgba(184,184,184,1)';
      accWndw.style.top = "0";
    } else {
      navTag.style.boxShadow = '0px 0px 0px 0px rgba(184,184,184,1)';
      accWndw.style.top = '5vw';
    }
  }, 10);
});
