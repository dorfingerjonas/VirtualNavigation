window.addEventListener('load', () => {
      let data = [];

  data[0] = [ {name: 'Hornspitz-Express 1', number: 'G1', length: 1647, altitudedifference: 392, state: 'open', lifttype: '4er Sessellift', location: 'Hornspitz'},
              {name: 'Hornspitz-Express 2', number: 'G2', length: 1429, altitudedifference: 278, state: 'open', lifttype: '6er Sessellift', location: 'Hornspitz'},
              {name: 'Ötscherlift', length: 385, number: 'G3', altitudedifference: 190, state: 'open', lifttype: 'Schlepplift', location: 'Hornspitz'},
              {name: 'Brumsiland', number: 'G5-7', length: 150, altitudedifference: 36, state: 'open', lifttype: 'Zauberteppich', location: 'Hornspitz'},
            ];

  data[1] = [ {name: 'Hornbahn', number: 'R', length: 2654, altitudedifference: 607, state: 'open', lifttype: 'Kabinenbahn', location: 'Russbach'},
              {name: 'Hornbabylift', number: 'R4', length: 191, altitudedifference: 24, state: 'open', lifttype: 'Tellerlift', location: 'Russbach'},
              {name: 'Bärencamp', number: 'R6', length: 36, altitudedifference: 4, state: 'open', lifttype: 'Zauberteppich', location: 'Russbach'},
              {name: 'Gipfellift', number: 'R7', length: 177, altitudedifference: 19, state: 'open', lifttype: 'Tellerlift', location: 'Russbach'},
              {name: 'Ochsenkopflift', number: 'R8', length: 613, altitudedifference: 48, state: 'open', lifttype: 'Schlepplift', location: 'Russbach'},
              {name: 'Edtalmbahn', number: 'E1', length: 863, altitudedifference: 211, state: 'open', lifttype: '6er Sessellift', location: 'Russbach'},
              {name: 'Höhbühellift', number: 'E2', length: 487, altitudedifference: 169, state: 'open', lifttype: '6er Sessellift', location: 'Russbach'},
            ];

  data[2] = [ {name: 'Panorama-Jet-Zwieselalm', number: 'Z1', length: 2297, altitudedifference: 767, state: 'open', lifttype: 'Kabinenbahn', location: 'Zwieselalm'},
              {name: 'Törleck', number: 'Z2', length: 420, altitudedifference: 150, state: 'open', lifttype: '4er Sessellift', location: 'Zwieselalm'},
              {name: 'Aussichtsbergbahn', number: 'Z3', length: 258, altitudedifference: 150, state: 'open', lifttype: '4er Sessellift', location: 'Zwieselalm'},
              {name: 'Zwisiland', number: 'Z4-7', length: 100, altitudedifference: 75, state: 'open', lifttype: 'Zauberteppich', location: 'Zwieselalm'},
            ];

  data[3] = [ {name: 'Kopfbergbahn', number: 'A1', length: 1053, altitudedifference: 286, state: 'open', lifttype: '4er Sessellift', location: 'Annaberg'},
              {name: 'Astauwinkelbahn', number: 'A2', length: 948, altitudedifference: 213, state: 'open', lifttype: '4er Sessellift', location: 'Annaberg'},
              {name: 'Donnerkogelbahn 1', number: 'A3', length: 715, altitudedifference: 103, state: 'open', lifttype: 'Kabinenbahn', location: 'Annaberg'},
              {name: 'Donnerkogelbahn 2', number: 'A4', length: 1344, altitudedifference: 505, state: 'open', lifttype: 'Kabinenbahn', location: 'Annaberg'},
              {name: 'Angerlift', number: 'A5', length: 612, altitudedifference: 145, state: 'open', lifttype: 'Schlepplift', location: 'Annaberg'},
            ];

      // Write data to Website
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          const currentLift = data[i][j];

          let contentWrapper = document.getElementById('liftState').getElementsByClassName(`${currentLift.location.toLowerCase()}Wrapper`)[0];
          let newLift = document.createElement('tr');

          let typeBox = document.createElement('td');
          let nameBox = document.createElement('td');
          let stateBox = document.createElement('td');
          let iBox = document.createElement('i');

          let eintragData = [currentLift.name, currentLift.lifttype];
          let outputArr = [nameBox, typeBox];

          setTimeout(() => {
            for (let k = 0; k < outputArr.length; k++) {
              outputArr[k].textContent = eintragData[k];
              newLift.appendChild(outputArr[k]);
            }
            if (currentLift.state === 'closed') {
              iBox.classList.add('fas');
              iBox.classList.add('fa-times-circle');
              iBox.style.color = '#ff2f2f';
            } else {
              iBox.classList.add('fas');
              iBox.classList.add('fa-check-circle');
              iBox.style.color = '#81ff81';
            }
            newLift.appendChild(iBox);
            contentWrapper.appendChild(newLift);
          }, 100);
        }
      }
});
