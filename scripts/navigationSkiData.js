window.addEventListener('load', () => {

  setTimeout(() => {
    firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/skidata').once('value').then((snapshot) => {
      const content = snapshot.val();
      let data = [];

      // Fill Array with Database Content
      for (let index in content) {
        data[data.length] = content[index];
      }

      // Sort Array by date
      for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
          const iTimestamp = new Date(data[i].date).getTime();
          const jTimestamp = new Date(data[j].date).getTime();

          if (iTimestamp > jTimestamp) {
            let help = data[j];
            data[j] = data[i];
            data[i] = help;
          }
        }
      }

      // Convert Date Format
      for (let i = 0; i < data.length; i++) {
          let parts = data[i].date.split('-');
          let tempYear = parts[0];
          let tempMonth = parts[1];
          let tempDay = parts[2];

          data[i].date = `${tempDay}.${tempMonth}.${tempYear}`;
      }

      // Write data to Website
      for (let i = 0; i < data.length; i++) {
        let date = data[i].date;
        let distance = data[i].distance + 'km';
        let lifts = data[i].lifts + ' Liftfahrten';
        let altitudedifference = data[i].altitudedifference + 'hm';

        altitudedifference = altitudedifference.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

        let contentWrapper = document.getElementById('dataContentWrapper');
        let newSkiday = document.createElement('tr');

        let dateBox = document.createElement('td');
        let distanceBox = document.createElement('td');
        let liftsBox = document.createElement('td');
        let adBox = document.createElement('td');

        let eintragData = [date, distance, lifts, altitudedifference];
        let outputArr = [dateBox, distanceBox, liftsBox, adBox];


        for (let i = 0; i < outputArr.length; i++) {
          setTimeout(() => {
            outputArr[i].textContent = eintragData[i];
            newSkiday.appendChild(outputArr[i]);
          }, 100);
        }
        contentWrapper.appendChild(newSkiday);
      }
    });
  }, 750);
});
