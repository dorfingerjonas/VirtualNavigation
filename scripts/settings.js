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

  const usernameBtn = document.getElementById('usernameBtn');
  const stateBtn = document.getElementById('stateBtn');
  const emailBtn = document.getElementById('emailBtn');
  const verifyBtn = document.getElementById('verifyBtn');
  const passwordBtn = document.getElementById('passwordBtn');

  usernameBtn.addEventListener('click', () => {

    const newUsername = document.getElementById('username').value;
    const fdb = document.getElementById('usernameFDB');

    if (newUsername !== '') {
      setNewUsername(firebase.auth().currentUser, newUsername);
      fdb.textContent = 'Neuer Username wude erfolgreich gespeichert.';
    } else {
      fdb.textContent = 'Der eingegebene Username ist ungültig.'
    }
    setTimeout(function () {
      fdb.textContent = '';
    }, 2500);
  });

  stateBtn.addEventListener('click', () => {

    const newStatus = document.getElementById('state').value;
    const fdb = document.getElementById('stateFDB');

    if (newStatus !== '') {
      setNewStatus(firebase.auth().currentUser, newStatus);
      fdb.textContent = 'Neuer Status wude erfolgreich gespeichert.';
    } else {
      fdb.textContent = 'Der eingegebene Status ist ungültig.'
    }
    setTimeout(function () {
      fdb.textContent = '';
    }, 2500);
  });

  verifyBtn.addEventListener('click', () => {

    const user = firebase.auth().currentUser;
    const fdb = document.getElementById('verifyFDB');

    if (!user.emailVerified) {
      user.sendEmailVerification();
    } else {
      fdb.textContent = 'Die aktuelle E-Mail Adresse wurde bereits bestätigt.'
    }
    setTimeout(function () {
      fdb.textContent = '';
    }, 2500);
  });

  emailBtn.addEventListener('click', () => {
    const user = firebase.auth().currentUser;
    const newEmail = document.getElementById('email').value;
    const fdb = document.getElementById('emailFDB');

    if (newEmail !== '') {
      setNewEmail(user, newEmail);
      user.updateEmail(newEmail);
    } else {
      fdb.textContent = 'Die eingegebene E-Mail Adresse ist ungültig.'
    }
    setTimeout(function () {
      fdb.textContent = '';
    }, 2500);
  });

  passwordBtn.addEventListener('click', () => {
    const user = firebase.auth().currentUser;
    const oldPW = document.getElementById('oldPW').value;
    const newPW = document.getElementById('newPW').value;
    const confirmedPW = document.getElementById('CfmNewPW').value;
    const fdb = document.getElementById('pwFDB');

    if (oldPW !== '' && newPW !== '' && confirmedPW !== '') {
      user.updatePassword(newPW);
      fdb.textContent = 'Passwort wurde erfolgreich geändert.';
    } else {
      fdb.textContent = 'Die eingebenen Passwörter sind ungültig.';
    }
    setTimeout(function () {
      fdb.textContent = '';
    }, 2500);
  });

  for (let input of document.getElementsByTagName('input')) {

    input.addEventListener('focus', () => {
      let text = document.getElementById(`${input.id}Txt`).style;

        text.fontSize = '8pt';
        text.top = '0';

        input.addEventListener('blur', () => {
          if (input.value === '') {
            text.fontSize = '12pt';
            text.top = '1.25vw';
          }
        });
    });
  }



});

  function setNewStatus(user, newStatus) {
    firebase.database().ref('/users/' + user.uid).update({
      status: newStatus
    });
  }

  function setNewUsername(user, newUsername) {
    firebase.database().ref('/users/' + user.uid).update({
      username: newUsername
    });
  }

  function setNewEmail(user, newEmail) {
    firebase.database().ref('/users/' + user.uid).update({
      email: newEmail
    });
  }
