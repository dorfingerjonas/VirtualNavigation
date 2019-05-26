window.addEventListener('load', () => {

  const delay = Math.floor(Math.random() * 1500) + 1100;
  localStorage.setItem('loaderDelay', delay);

  setTimeout(() => {
    document.getElementById('loaderWrapper').style.display = 'none';
    document.getElementById('Home').style.opacity = 1;
    document.getElementById('Home').style.display = 'block';
  }, delay);
});
