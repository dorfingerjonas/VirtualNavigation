window.addEventListener('load', () => {
      let data = [];

      /* Hornspitz */ data[0] = [ {number: '2', name: 'Talabfahrt Hornspitz 2', difficulty: 'red', state: 'closed', location: 'Hornspitz'},
                                  {number: '2a', name: 'Familienabfahrt Hornspitz', difficulty: 'red', state: 'closed', location: 'Hornspitz'},
                                  {number: '2b', name: 'Brumsiland', difficulty: 'blue', state: 'closed', location: 'Hornspitz'},
                                  {number: '2c', name: 'Ötscher Abfahrt', difficulty: 'red', state: 'closed', location: 'Hornspitz'},
                                  {number: '2e', name: 'Talabfahrt Hornspitz 1', difficulty: 'red', state: 'closed', location: 'Hornspitz'},
                                  {number: '3', name: 'Falmbergabfahrt', difficulty: 'red', state: 'closed', location: 'Hornspitz'},
                                  {number: '3a', name: 'Ochsenkopf', difficulty: 'blue', state: 'closed', location: 'Hornspitz'},
                                  {number: '3b', name: 'Gipfellift', difficulty: 'blue', state: 'closed', location: 'Hornspitz'}
                                ];

      /* Russbach */ data[1] = [ {number: '1', name: 'Talabfahrt Russbach Sektion 1', difficulty: 'red', state: 'closed', location: 'Russbach'},
                                 {number: '1a', name: 'Talabfahrt Russbach', difficulty: 'red', state: 'closed', location: 'Russbach'},
                                 {number: '1b', name: 'Triebenegg', difficulty: 'blue', state: 'closed', location: 'Russbach'},
                                 {number: '1c', name: 'Bärencamp', difficulty: 'blue', state: 'closed', location: 'Russbach'},
                                 {number: '1d', name: 'Hornbaby', difficulty: 'blue', state: 'closed', location: 'Russbach'},
                                 {number: '1e', name: 'Hornbaby', difficulty: 'blue', state: 'closed', location: 'Russbach'},
                                 {number: '1g', name: 'Talabfahrt Russbach', difficulty: 'red', state: 'closed', location: 'Russbach'},
                                 {number: '4', name: 'Edtalm', difficulty: 'red', state: 'closed', location: 'Russbach'},
                                 {number: '5', name: 'Höhbühel', difficulty: 'red', state: 'closed', location: 'Russbach'},
                                 {number: '5a', name: 'Höhbühel', difficulty: 'red', state: 'closed', location: 'Russbach'},
                                 {number: '5b', name: 'Skiweg Gletscherblick', difficulty: 'red', state: 'closed', location: 'Russbach'},
                                 {number: '5c', name: 'Blockleitn', difficulty: 'red', state: 'closed', location: 'Russbach'}
                               ];

      /* Zwieselalm */ data[2] = [ {number: '9', name: 'Familienabfahrt Zwieselalm', difficulty: 'blue', state: 'closed', location: 'Zwieselalm'},
                                   {number: '9a', name: 'Talabfahrt Zwieselalm', difficulty: 'blue', state: 'closed', location: 'Zwieselalm'},
                                   {number: '9b', name: 'Kanonenrohr', difficulty: 'black', state: 'closed', location: 'Zwieselalm'},
                                   {number: '9c', name: 'Hohkögelabfahrt', difficulty: 'red', state: 'closed', location: 'Zwieselalm'},
                                   {number: '9d', name: 'Hängleitn', difficulty: 'red', state: 'closed', location: 'Zwieselalm'},
                                   {number: '10', name: 'Talabfahrt Russbach', difficulty: 'red', state: 'closed', location: 'Zwieselalm'},
                                   {number: '10b', name: 'Donnergroll', difficulty: 'black', state: 'closed', location: 'Zwieselalm'},
                                   {number: '11', name: 'Riedlkarabfahrt 1', difficulty: 'red', state: 'closed', location: 'Zwieselalm'},
                                   {number: '11a', name: 'Riedlkarabfahrt 2', difficulty: 'red', state: 'closed', location: 'Zwieselalm'},
                                   {number: '12', name: 'Aussichtsbergabfahrt', difficulty: 'red', state: 'closed', location: 'Zwieselalm'}
                                 ];

      /* Annaberg */ data[3] = [ {number: '14a', name: 'Skiweg Rottenhofhütte', difficulty: 'blue', state: 'closed', location: 'Annaberg'},
                                 {number: '16', name: 'Angerabfahrt Zwieselalm', difficulty: 'red', state: 'closed', location: 'Annaberg'},
                                 {number: '17', name: 'Talabfahrt Astauwinkel', difficulty: 'black', state: 'closed', location: 'Annaberg'},
                                 {number: '17a', name: 'Übungswiese', difficulty: 'blue', state: 'closed', location: 'Annaberg'},
                                 {number: '18', name: 'Astauwinkelabfahrt', difficulty: 'red', state: 'closed', location: 'Annaberg'},
                                 {number: '18a', name: 'Skicross Astauwinkel', difficulty: 'red', state: 'closed', location: 'Annaberg'},
                                 {number: '18b', name: 'Marcel Hirscher Rennstrecke', difficulty: 'black', state: 'closed', location: 'Annaberg'},
                                 {number: '19', name: 'Kopfbergabfahrt', difficulty: 'red', state: 'closed', location: 'Annaberg'},
                                 {number: '19a', name: 'Harreit leicht', difficulty: 'blue', state: 'closed', location: 'Annaberg'},
                                 {number: '19b', name: 'Jagaschuss Speed Check', difficulty: 'red', state: 'closed', location: 'Annaberg'}
                               ];

      // Write data to Website
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          const currentSlope = data[i][j];

          let contentWrapper = document.getElementById(`${currentSlope.location.toLowerCase()}Wrapper`);
          let newSlope = document.createElement('tr');

          let numberBox = document.createElement('td');
          let nameBox = document.createElement('td');
          let stateBox = document.createElement('td');

          let eintragData = [currentSlope.number, currentSlope.name, currentSlope.state];
          let outputArr = [numberBox, nameBox, stateBox];

          // for (let k = 0; i < outputArr.length; k++) {
          //     setTimeout(() => {
          //       outputArr[k].textContent = eintragData[k];
          //       newSlope.appendChild(outputArr[k]);
          //     }, 10);
          // }
          contentWrapper.appendChild(newSlope);
        }
      }
});
