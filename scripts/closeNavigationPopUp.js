window.addEventListener('load', () => {

  const weather = document.getElementById('weatherNav');
  const data = document.getElementById('dataNav');
  const map = document.getElementById('mapNav');
  const emergency = document.getElementById('emergencyNav');
  const liftState = document.getElementById('liftNav');
  const slopeState = document.getElementById('slopeNav');

  const weatherArrow = document.getElementById('closeWeather');
  const dataArrow = document.getElementById('closeData');
  const mapArrow = document.getElementById('closeMap');
  const emergencyArrow = document.getElementById('closeEmergency');
  const liftStateArrow = document.getElementById('closeLift');
  const slopeStateArrow = document.getElementById('closeSlopes');

  let currentPopUp = '';

  weather.addEventListener('click', () => {
    if (currentPopUp !== '' && currentPopUp !== 'weather') fadeElementOut(currentPopUp);
    fadeElementIn('weather');
    currentPopUp = 'weather';
  });

  data.addEventListener('click', () => {
    if (currentPopUp !== '' && currentPopUp !== 'data') fadeElementOut(currentPopUp);
    fadeElementIn('data');
    currentPopUp = 'data';
  });

  map.addEventListener('click', () => {
    if (currentPopUp !== '' && currentPopUp !== 'map') fadeElementOut(currentPopUp);
    fadeElementIn('map');
    currentPopUp = 'map';
  });

  emergency.addEventListener('click', () => {
    if (currentPopUp !== '' && currentPopUp !== 'emergency') fadeElementOut(currentPopUp);
    fadeElementIn('emergency');
    currentPopUp = 'emergency';
  });

  liftState.addEventListener('click', () => {
    if (currentPopUp !== '' && currentPopUp !== 'liftState') fadeElementOut(currentPopUp);
    fadeElementIn('liftState');
    currentPopUp = 'liftState';
  });

  slopeState.addEventListener('click', () => {
    if (currentPopUp !== '' && currentPopUp !== 'slopeState') fadeElementOut(currentPopUp);
    fadeElementIn('slopeState');
    currentPopUp = 'slopeState';
  });

  weatherArrow.addEventListener('click', () => {
    fadeElementOut('weather');
    currentPopUp = '';
  });

  dataArrow.addEventListener('click', () => {
    fadeElementOut('data');
    currentPopUp = '';
  });

  mapArrow.addEventListener('click', () => {
    fadeElementOut('map');
    currentPopUp = '';
  });

  emergencyArrow.addEventListener('click', () => {
    fadeElementOut('emergency');
    currentPopUp = '';
  });

  liftStateArrow.addEventListener('click', () => {
    fadeElementOut('liftState');
    currentPopUp = '';
  });

  slopeStateArrow.addEventListener('click', () => {
    fadeElementOut('slopeState');
    currentPopUp = '';
  });
});

function fadeElementOut(id) {
  document.getElementById(id).style.opacity = '0';
  setTimeout(() => {
    document.getElementById(id).style.display = 'none';
  }, 520);
}

function fadeElementIn(id) {
  document.getElementById(id).style.display = 'block';
    setTimeout(() => {
      document.getElementById(id).style.opacity = '1';
    }, 100);
}
