window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loaderWrapper').style.display = 'none';
    document.getElementById('Home').style.opacity = 1;
  }, Math.floor(Math.random() * 1500) + 1100);
});
