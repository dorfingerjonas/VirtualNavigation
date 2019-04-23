window.addEventListener('load', () => {
  const navTag = document.getElementById('nav');
  const accWndw = document.getElementById('accountWindow');

  let interval =  setInterval(() => {

    if (scrollY > 130) {
      navTag.style.boxShadow = '2px 2px 8px rgba(0,0,0,0.5)';
      accWndw.style.top = "0";
    } else {
      navTag.style.boxShadow = 'none';
      accWndw.style.top = '5vw';
    }

    if (scrollY > 880) {
      document.getElementById('navigationRes').textContent = '';
    }
  }, 10);
});
