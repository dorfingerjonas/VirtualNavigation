window.addEventListener('load', () => {
      let data = [];

  data[0] = [ {number: '2', name: 'Talabfahrt Hornspitz 2', difficulty: 'red', state: 'open', location: 'Hornspitz'},
              {number: '2a', name: 'Familienabfahrt Hornspitz', difficulty: 'red', state: '', location: 'Hornspitz'},
              {number: '2b', name: 'Brumsiland', difficulty: 'blue', state: 'open', location: 'Hornspitz'},
              {number: '2c', name: 'Ötscher Abfahrt', difficulty: 'red', state: 'open', location: 'Hornspitz'},
              {number: '2e', name: 'Talabfahrt Hornspitz 1', difficulty: 'red', state: 'open', location: 'Hornspitz'},
              {number: '3', name: 'Falmbergabfahrt', difficulty: 'red', state: '', location: 'Hornspitz'},
              {number: '3a', name: 'Ochsenkopf', difficulty: 'blue', state: 'open', location: 'Hornspitz'},
              {number: '3b', name: 'Gipfellift', difficulty: 'blue', state: 'open', location: 'Hornspitz'}
            ];

  data[1] = [ {number: '1', name: 'Talabfahrt Russbach Sektion 1', difficulty: 'red', state: '', location: 'Russbach'},
              {number: '1a', name: 'Talabfahrt Russbach', difficulty: 'red', state: 'open', location: 'Russbach'},
              {number: '1b', name: 'Triebenegg', difficulty: 'blue', state: 'open', location: 'Russbach'},
              {number: '1c', name: 'Bärencamp', difficulty: 'blue', state: 'open', location: 'Russbach'},
              {number: '1d', name: 'Hornbaby', difficulty: 'blue', state: 'open', location: 'Russbach'},
              {number: '1e', name: 'Hornbaby', difficulty: 'blue', state: '', location: 'Russbach'},
              {number: '1g', name: 'Talabfahrt Russbach', difficulty: 'red', state: '', location: 'Russbach'},
              {number: '4', name: 'Edtalm', difficulty: 'red', state: 'open', location: 'Russbach'},
              {number: '5', name: 'Höhbühel', difficulty: 'red', state: '', location: 'Russbach'},
              {number: '5a', name: 'Höhbühel', difficulty: 'red', state: 'open', location: 'Russbach'},
              {number: '5b', name: 'Skiweg Gletscherblick', difficulty: 'red', state: '', location: 'Russbach'},
              {number: '5c', name: 'Blockleitn', difficulty: 'red', state: 'open', location: 'Russbach'}
            ];

  data[2] = [ {number: '9', name: 'Familienabfahrt Zwieselalm', difficulty: 'blue', state: '', location: 'Zwieselalm'},
              {number: '9a', name: 'Talabfahrt Zwieselalm', difficulty: 'blue', state: 'open', location: 'Zwieselalm'},
              {number: '9b', name: 'Kanonenrohr', difficulty: 'black', state: 'open', location: 'Zwieselalm'},
              {number: '9c', name: 'Hohkögelabfahrt', difficulty: 'red', state: 'open', location: 'Zwieselalm'},
              {number: '9d', name: 'Hängleitn', difficulty: 'red', state: 'open', location: 'Zwieselalm'},
              {number: '10', name: 'Talabfahrt Russbach', difficulty: 'red', state: '', location: 'Zwieselalm'},
              {number: '10b', name: 'Donnergroll', difficulty: 'black', state: 'open', location: 'Zwieselalm'},
              {number: '11', name: 'Riedlkarabfahrt 1', difficulty: 'red', state: '', location: 'Zwieselalm'},
              {number: '11a', name: 'Riedlkarabfahrt 2', difficulty: 'red', state: 'open', location: 'Zwieselalm'},
              {number: '12', name: 'Aussichtsbergabfahrt', difficulty: 'red', state: 'open', location: 'Zwieselalm'}
            ];

  data[3] = [ {number: '14a', name: 'Skiweg Rottenhofhütte', difficulty: 'blue', state: 'open', location: 'Annaberg'},
              {number: '16', name: 'Angerabfahrt Zwieselalm', difficulty: 'red', state: 'open', location: 'Annaberg'},
              {number: '17', name: 'Talabfahrt Astauwinkel', difficulty: 'black', state: 'open', location: 'Annaberg'},
              {number: '17a', name: 'Übungswiese', difficulty: 'blue', state: 'open', location: 'Annaberg'},
              {number: '18', name: 'Astauwinkelabfahrt', difficulty: 'red', state: 'open', location: 'Annaberg'},
              {number: '18a', name: 'Skicross Astauwinkel', difficulty: 'red', state: 'open', location: 'Annaberg'},
              {number: '18b', name: 'Marcel Hirscher Rennstrecke', difficulty: 'black', state: 'open', location: 'Annaberg'},
              {number: '19', name: 'Kopfbergabfahrt', difficulty: 'red', state: 'open', location: 'Annaberg'},
              {number: '19a', name: 'Harreit leicht', difficulty: 'blue', state: 'open', location: 'Annaberg'},
              {number: '19b', name: 'Jagaschuss Speed Check', difficulty: 'red', state: 'open', location: 'Annaberg'}
            ];

      // Write data to Website
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          const currentSlope = data[i][j];

          let contentWrapper = document.getElementById('slopeState').getElementsByClassName(`${currentSlope.location.toLowerCase()}Wrapper`)[0];
          let newSlope = document.createElement('tr');

          let numberBox = document.createElement('td');
          let nameBox = document.createElement('td');
          let stateBox = document.createElement('td');
          let iBox = document.createElement('i');

          const eintragData = [currentSlope.number, currentSlope.name];
          const outputArr = [numberBox, nameBox];

          setTimeout(() => {
            for (let k = 0; k < outputArr.length; k++) {
              outputArr[k].textContent = eintragData[k];
              newSlope.appendChild(outputArr[k]);
            }
            if (currentSlope.state === 'closed') {
              iBox.classList.add('fas');
              iBox.classList.add('fa-times-circle');
              iBox.style.color = '#ff2f2f';
            } else {
              iBox.classList.add('fas');
              iBox.classList.add('fa-check-circle');
              iBox.style.color = '#81ff81';
            }
            newSlope.appendChild(iBox);
            contentWrapper.appendChild(newSlope);
          }, 100);
        }
      }
});
