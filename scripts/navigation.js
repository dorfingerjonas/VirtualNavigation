let positionCounter = 0;

window.addEventListener('load', () => {

    const config = {
      apiKey: 'AIzaSyDHuGnlajKcr4s8_vn9XC5McqalXvWTBsg',
      authDomain: 'virtualskiareanavigation.firebaseapp.com',
      databaseURL: 'https://virtualskiareanavigation.firebaseio.com',
      projectId: 'virtualskiareanavigation',
      storageBucket: 'virtualskiareanavigation.appspot.com',
      messagingSenderId: '428865397333'
    };

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

  const distanceToGo = document.getElementById('weatherNav').clientWidth;

  if (event.key === 'ArrowRight') {
    let originalPosition = scrollX;

    event.preventDefault();

    let interval = setInterval(() => {
      scrollTo(scrollX + 10, 0);

      if (scrollX === originalPosition + distanceToGo || positionCounter === 6) {
        clearInterval(interval);
      }
    }, 10);

    if (positionCounter < 5) positionCounter++;
    console.log(positionCounter);
  } else if (event.key === 'ArrowLeft') {
    let originalPosition = scrollX;

    event.preventDefault();

    if (positionCounter > 0) positionCounter--;
    console.log(positionCounter);

    let interval = setInterval(() => {
      scrollTo(scrollX - 10, 0);

      if (scrollX === originalPosition - distanceToGo || scrollX === 0) {
        clearInterval(interval);
      }
    }, 10);
  }
});

function fadeElementOut(id) {
  document.getElementById(id).style.opacity = '0';
  setTimeout(() => {
    document.getElementById(id).style.display = 'none';
  }, 520);
}
