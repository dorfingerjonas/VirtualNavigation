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

  const body = document.getElementById('body');
  const errField = document.getElementById('errField');
  const emailTxt = document.getElementById('email');
  const passwordTxt = document.getElementById('password');
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const usernameField = document.getElementById('usernameField');
  const usernamePopUp = document.getElementById('usernamePopUp');
  const usernameWindow = document.getElementById('usernameWindow');
  const accountPopUp = document.getElementById('accPopUp');
  const statusTxT = document.getElementById('statusField');
  const accStatus = document.getElementById('accStatus');
  const saveBtn = document.getElementById('saveBtn');
  const settings = document.getElementById('settings');
  const firstnameTxt = document.getElementById('firstname');
  const lastnameTxt = document.getElementById('lastname');
  const usernameTxt = document.getElementById('username');
  let isAccountPopUpVisible = false;

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
    console.log("logged in");
  });

  signupBtn.addEventListener('click', () => {

    console.log("signup button pressed");
    const email = emailTxt.value;
    const password = passwordTxt.value;
    const firstname = firstnameTxt.value;
    const lastname = lastnameTxt.value;
    const username = usernameTxt.value;
    const auth = firebase.auth();

    resetErrorField();
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch((error) => {

      errField.style.display = "block";
      errField.textContent = error.message;
    });

    setTimeout(function () {
      let userId = firebase.auth().currentUser.uid;
      console.log(userId);
      writeUserToDatabase(firstname, lastname, username, email, password, userId);
    }, 2000);
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

  usernameWindow.addEventListener('click', () => {

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
      setTimeout(function () {
        usernameWindow.style.display = "inline-block";
        writefirstnameToPopUp(user);
        writeUsernameToPopUp(user);
        writeStatusToPopUp(user);
      }, 2500);
    } else {
      document.getElementById('user').textContent = "not logged in";
      usernameWindow.style.display = "none";
    }
  });

  accStatus.addEventListener('click', () => {
      const user = firebase.auth().currentUser;
      const statusWrapper = document.getElementById('statusWrapper');
      changeDisplayProperty('statusWrapper', 'flex');
      console.log('state list opened');

      saveBtn.addEventListener('click', () => {
        statusInput = statusTxT.value;
        console.log(statusInput);
        setNewStatus(user, statusInput);
        console.log("changed state");
        writeStatusToPopUp(user);
      });

      document.getElementById('closeStatus').addEventListener('click', () => {
        changeDisplayProperty('statusWrapper', 'none');
        console.log("closed state list");
      });
  });

  settings.addEventListener('click', () => {
      window.location.href='./settings';
      console.log('settings page opened');
  });

  function writeUserToDatabase(firstname, lastname, username, email, password, userId) {
    firebase.database().ref('users/' + userId).set({
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      status: 'Skiing with love', // TODO: Deutschen Status als default setzen!
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

  function writeUsernameToPopUp(user) {
    let userId = user.uid;

    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      let username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      usernamePopUp.textContent = username;
      console.log(username);
    });
  }

  function writefirstnameToPopUp(user) {
    let userId = user.uid;

    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      let firstname = (snapshot.val() && snapshot.val().firstname) || 'Anonymous';
      usernameField.textContent = firstname;
      console.log(firstname);
    });
  }

  function writeStatusToPopUp(user) {
    let userId = user.uid;

    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      let status = (snapshot.val() && snapshot.val().status) || 'Anonymous';
      accStatus.textContent = status;
      console.log(status);
    });
  }

  function setNewStatus(user, newStatus) {
    firebase.database().ref('/users/' + user.uid).update({
      status: newStatus
    });
  }
});

function resetErrorField() {
  const errField = document.getElementById('errField');

  errField.style.display = "none";
  errField.textContent = "";
}

function changeDisplayProperty(id, property) {
  document.getElementById(id).style.display = property;
}
