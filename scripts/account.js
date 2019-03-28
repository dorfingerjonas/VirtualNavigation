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

  const errField = document.getElementById('errField');
  const emailTxt = document.getElementById('email');
  const passwordTxt = document.getElementById('password');
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const usernameField = document.getElementById('usernameField');
  const usernamePopUp = document.getElementById('usernamePopUp');
  const accountArrow = document.getElementById('accountArrow');
  const accountPopUp = document.getElementById('accPopUp');
  const settings = document.getElementById('settings');
  let isAccountPopUpVisible = false;
  let username;
  let vorname;
  let lastname;

  loginBtn.addEventListener('click', () => {
    console.log("login button pressed");
    const email = emailTxt.value;
    const password = passwordTxt.value;
    const auth = firebase.auth();

    resetErrorField();

    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch((error) => {

      errField.style.display = "block";
      errField.textContent = error.message;

    });
  });

  signupBtn.addEventListener('click', () => {
    console.log("signup button pressed");
    const email = emailTxt.value;
    const password = passwordTxt.value;
    const auth = firebase.auth();
    firstname = document.getElementById('firstname').value;
    lastname = document.getElementById('lastname').value;
    username = document.getElementById('username').value;

    resetErrorField();
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch((error) => {

      errField.style.display = "block";
      errField.textContent = error.message;
    });

    let userId = firebase.auth().currentUser.uid;

    console.log(userId);

    writeUserToDatabase(firstname, lastname, username, email, userId);
  });

  logoutBtn.addEventListener('click', () => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      accountPopUp.style.display = 'none';
      document.getElementById('usernameField').textContent = "";
    }).catch(function(error) {
      // An error happened.
    });
  });

  accountArrow.addEventListener('click', () => {

    if (!isAccountPopUpVisible) {
      accountPopUp.style.display = "block";
      accountPopUp.style.top = "2vw";
      accountPopUp.style.right = "12vw";
      isAccountPopUpVisible = true;
    } else {
      accountPopUp.style.display = "none";
      isAccountPopUpVisible = false;
    }
  });

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      document.getElementById('user').textContent = user.email;
      getFirstname();
      getUsername();

      accountArrow.style.display = "inline-block";
    } else {
      document.getElementById('user').textContent = "not logged in";
      accountArrow.style.display = "none";
    }
  });

  settings.addEventListener('click', () => {
      window.location.href='./settings';
      console.log('settings page opened');
  });

  function writeUserToDatabase(firstname, lastname, username, email, userId) {
    firebase.database().ref('users/' + userId).set({
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email
    }, (error) => {
      if (error) {
        // The write failed...
        console.log("failed");
      } else {
        // Data saved successfully!
        console.log('successful');
      }
    });
  }

  function getUsername() {
    let userId = firebase.auth().currentUser.uid;

    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      usernamePopUp.textContent = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    });
  }

  function getFirstname() {
    let userId = firebase.auth().currentUser.uid;

    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      usernameField.textContent = (snapshot.val() && snapshot.val().firstname) || 'Anonymous';
    });
  }

  function getLastname() {
    let userId = firebase.auth().currentUser.uid;

    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      let lastname = (snapshot.val() && snapshot.val().lastname) || 'Anonymous';
    });
  }

  function getEmail() {
    let userId = firebase.auth().currentUser.uid;

    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      let email = (snapshot.val() && snapshot.val().email) || 'Anonymous';
    });
  }
});

function resetErrorField() {  const errField = document.getElementById('errField');

  errField.style.display = "none";
  errField.textContent = "";
}
