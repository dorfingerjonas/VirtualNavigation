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
  const deleteBtn = document.getElementById('deleteBtn');

  usernameBtn.addEventListener('click', () => {

    const newUsername = document.getElementById('username');
    const fdb = document.getElementById('usernameFDB');

    if (newUsername.value !== '') {
      setNewUsername(firebase.auth().currentUser, newUsername.value);
      fdb.style.color = 'black';
      fdb.textContent = 'Neuer Username wude erfolgreich gespeichert.';
    } else {
      newUsername.style.borderBottom = 'red 2px solid';
      fdb.style.color = 'red';
      fdb.textContent = 'Der eingegebene Username ist ungültig.'
    }
    setTimeout(() => {
      fdb.style.color = 'white';
      newUsername.style.borderBottom = 'lightgray 2px solid';
    }, 6500);
  });

  stateBtn.addEventListener('click', () => {

    const newStatus = document.getElementById('state');
    const fdb = document.getElementById('stateFDB');

    if (newStatus.value !== '') {
      setNewStatus(firebase.auth().currentUser, newStatus.value);
      fdb.style.color = 'black';
      fdb.textContent = 'Neuer Status wude erfolgreich gespeichert.';
    } else {
      newStatus.style.borderBottom = 'red 2px solid';
      fdb.style.color = 'red';
      fdb.textContent = 'Der eingegebene Status ist ungültig.'
    }
    setTimeout(() => {
      fdb.style.color = 'white';
      newStatus.style.borderBottom = 'lightgray 2px solid';
    }, 6500);
  });

  verifyBtn.addEventListener('click', () => {

    const user = firebase.auth().currentUser;
    const fdb = document.getElementById('verifyFDB');

    if (!user.emailVerified) {
      user.sendEmailVerification();
      fdb.style.color = 'black';
      fdb.textContent = 'Es wurde eine Bestätigungsemail an "' + user.email + '" gesendet.'
    } else {
      fdb.style.color = 'red';
      fdb.textContent = 'Die aktuelle E-Mail Adresse wurde bereits bestätigt.'
    }
    setTimeout(() => {
      fdb.style.color = 'white';
    }, 6500);
  });

  emailBtn.addEventListener('click', () => {
    const user = firebase.auth().currentUser;
    const newEmail = document.getElementById('email');
    const fdb = document.getElementById('emailFDB');

    if (newEmail.value !== '') {
      setNewEmail(user, newEmail.value);
      user.updateEmail(newEmail.value);
      fdb.style.color = 'black';
      fdb.textContent = 'Die E-Mail Adresse wurde erfolgreich geändert.'
    } else {
      fdb.style.color = 'red';
      newEmail.style.borderBottom = 'red 2px solid';
      fdb.textContent = 'Die eingegebene E-Mail Adresse ist ungültig.'
    }
    setTimeout(() => {
      fdb.style.color = 'white';
      newEmail.style.borderBottom = 'lightgray 2px solid';
    }, 6500);
  });

  passwordBtn.addEventListener('click', () => {
    const user = firebase.auth().currentUser;
    const newPW = document.getElementById('newPW')
    const confirmedPW = document.getElementById('CfmNewPW');
    const fdb = document.getElementById('pwFDB');
    let isPasswordValid = validatePassword(newPW);

    if (!isPasswordValid) {
      fdb.style.color = 'red';
      newPW.style.borderBottom = 'red 2px solid';
      confirmedPW.style.borderBottom = 'red 2px solid';
      fdb.textContent = 'Die Passwörter erfüllen nicht alle Sicherheitsbedinungen (Sonderzeichen, Groß-Kleinbuchstaben, Zahlen, mind. 8 Zeichen lang)';
    } else if (newPW.value === '' || confirmedPW.value === '') {
      fdb.style.color = 'red';
      newPW.style.borderBottom = 'red 2px solid';
      confirmedPW.style.borderBottom = 'red 2px solid';
      fdb.textContent = 'Es darf kein Feld leer bleiben.';
    } else if (newPW.value !== confirmedPW.value) {
      fdb.style.color = 'red';
      newPW.style.borderBottom = 'red 2px solid';
      confirmedPW.style.borderBottom = 'red 2px solid';
      fdb.textContent = 'Die eingegebenen Passwörter stimmen nicht überein.';
    } else {
      user.updatePassword(newPW.value);
      fdb.style.color = 'black';
      fdb.textContent = 'Passwort wurde erfolgreich geändert.';
    }
    setTimeout(function () {
      fdb.style.color = 'white';
      newPW.style.borderBottom = 'lightgray 2px solid';
      confirmedPW.style.borderBottom = 'lightgray 2px solid';
    }, 6500);
  });

  deleteBtn.addEventListener('click', firebase.auth().currentUser.delete());

  document.getElementById('back').addEventListener('click', () => {
    window.location.href = '../';
  });
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

  function validatePassword(password) {
    return /[a-z]/.test(password.value) && /[A-Z]/.test(password.value) && /[0-9]/.test(password.value) && /[^a-zA-Z0-9]/.test(password.value) && password.value.length > 7;
  }
