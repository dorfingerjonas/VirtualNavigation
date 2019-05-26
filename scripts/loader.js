window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loaderWrapper').style.display = 'none';
    document.getElementById('Home').style.opacity = 1;
    document.getElementById('Home').style.display = 'block';
  }, Math.floor(Math.random() * 1500) + 1100);
});
