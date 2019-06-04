window.addEventListener('load', () => {

  const config = {
  apiKey: 'AIzaSyDHuGnlajKcr4s8_vn9XC5McqalXvWTBsg',
  authDomain: 'virtualskiareanavigation.firebaseapp.com',
  databaseURL: 'https://virtualskiareanavigation.firebaseio.com',
  projectId: 'virtualskiareanavigation',
  storageBucket: 'virtualskiareanavigation.appspot.com',
  messagingSenderId: '428865397333'
  };

  document.getElementById('backBtn').addEventListener('click', () => {
    window.location.href='../';
  });

  firebase.initializeApp(config);

  let database = firebase.database();

  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      window.location.href='../';
    }
  });

  let currentScroll = scrollX;

  setInterval(() => {
    if (currentScroll !== scrollX) {
      currentScroll = scrollX;
      fadeElementOut('weather');
      fadeElementOut('route');
      fadeElementOut('data');
      fadeElementOut('map');
      fadeElementOut('emergency');
      fadeElementOut('liftState');
      fadeElementOut('slopeState');
    }
  }, 10);
});

  window.addEventListener('keydown', (event) => {

    const distanceToGo = scrollX + document.getElementById('weatherNav').clientWidth + (innerWidth / 100) * 1.5;
    const margin = (document.body.clientWidth - document.getElementById('nav').clientWidth) / 2;
    const originalPosition = scrollX;

    if (event.key === 'ArrowRight') {
      event.preventDefault();

      let interval = setInterval(() => {
        scrollTo(scrollX + 10, 0);

        if ((originalPosition === 0 && scrollX >= distanceToGo + margin) || (originalPosition !== 0 && scrollX >= distanceToGo) || scrollX - innerWidth >= document.body.clientWidth) {
          clearInterval(interval);
        }
      }, 10);
    } else if (event.key === 'ArrowLeft') {
      let originalPosition = scrollX;

      event.preventDefault();

      let interval = setInterval(() => {
        scrollTo(scrollX - 10, 0);

        if (scrollX === originalPosition - distanceToGo || scrollX === 0) {
          clearInterval(interval);
        }
      }, 10);
    } else if (event.key === 'Escape') {
      fadeElementOut('weather');
      fadeElementOut('route');
      fadeElementOut('data');
      fadeElementOut('map');
      fadeElementOut('emergency');
      fadeElementOut('liftState');
      fadeElementOut('slopeState');
    }
  });

  function fadeElementOut(id) {
    document.getElementById(id).style.opacity = '0';

    setTimeout(() => {
      document.getElementById(id).style.display = 'none';
    }, 520);
  }
