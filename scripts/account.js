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

  const errFieldSignUp = document.getElementById('errFieldSignUp');
  const errFieldSignIn = document.getElementById('errFieldSignIn');
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const activateSignIn = document.getElementById('alreadySignedUp');
  const activateSignUp = document.getElementById('notSignedUp');
  const usernameField = document.getElementById('usernameField');
  const usernamePopUp = document.getElementById('usernamePopUp');
  const usernameWindow = document.getElementById('usernameWindow');
  const accountPopUp = document.getElementById('accPopUp');
  const accStatus = document.getElementById('accStatus')
  const settings = document.getElementById('settings');
  const accNav = document.getElementById('accountNav');
  const closeAccountWndw = document.getElementById('closeAccountWndw');
  const navigationBtn = document.getElementById('startNavigation');
  let isUserPopUpVisible = false;

  loginBtn.addEventListener('click', signIn);

  function signIn() {
    const email = document.getElementById('emailSignIn');
    const password = document.getElementById('passwordSignIn');
    const auth = firebase.auth();

    resetErrorField();

    if (email.value === '' || password.value === '') {
      changeDisplayProperty('errFieldSignIn', 'block');
      errFieldSignIn.textContent = 'Bitte überprüfen Sie Ihre Eingaben!';
    } else {
      changeDisplayProperty('errFieldSignIn', 'none');

        const promise = auth.signInWithEmailAndPassword(email.value, password.value);

        promise.catch((error) => {

          changeDisplayProperty('errFieldSignIn', 'block');
          errFieldSignIn.textContent = error.message;

        });

        promise.then(() => {
          changeDisplayProperty('accountWindow', 'none');
        });
      }
  }

  signupBtn.addEventListener('click', () => {
    const email = document.getElementById('emailSignUp');
    const password = document.getElementById('passwordSignUp');
    const firstname = document.getElementById('firstname');
    const lastname = document.getElementById('lastname');
    const username = document.getElementById('username');
    let containsAt = false;
    let isPasswordValid = false;
    let isEmailValid = false;
    let isFirstnameValid = false;
    let isLastnameValid = false;
    let isUsernameValid = false;
    let i = 0;
    const auth = firebase.auth();

    if (email.value === '' || password.value === '' || firstname.value === '' || lastname.value === '' || username.value === '') {
      changeDisplayProperty('errFieldSignUp', 'block');
      errFieldSignUp.textContent = 'Bitte überprüfen Sie Ihre Eingaben!';
    } else {

      do {
          if (email.value.charAt(i) === '@') {
            containsAt = true;
          }
          i++;
      } while (!containsAt || i < email.value.length);

      resetErrorField();
      changeDisplayProperty('errFieldSignUp', 'none');

      if (containsAt) {
        const splitEmail  = email.value.split('@');
        isPasswordValid = validatePassword(password);
        isEmailValid = validateEmail(email);
        isFirstnameValid = !/[^a-zäöüß ]/i.test(firstname.value) && firstname.value.length > 0;
        isLastnameValid = !/[^a-zäöüß ]/i.test(lastname.value) && lastname.value.length > 0;
        isUsernameValid = !/[^a-z0-9._]/i.test(username.value) && username.value.length > 0;
        }

      if (isPasswordValid && isEmailValid && isFirstnameValid && isLastnameValid && isUsernameValid) {
        const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
        promise.catch((error) => {

          changeDisplayProperty('errFieldSignUp', 'block');
          errFieldSignUp.textContent = error.message;
        });

        promise.then(() => {
          let userId = firebase.auth().currentUser.uid;
          writeUserToDatabase(firstname.value, lastname.value, username.value, email.value, userId);
        });
      }
    }
  });

  logoutBtn.addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      accountPopUp.style.display = 'none';
      document.getElementById('usernameField').textContent = '';
    }).catch((error) => {
      // An error happened.
    });
  });

  accNav.addEventListener('click', () => {
      changeDisplayProperty('accountWindow', 'flex');

      document.addEventListener('keypressed', (event) => {

        console.log(event.keyCode);

        if (event.keyCode === 13) {
          signIn();
        }

        if (event.keyCode === 27) {
          changeDisplayProperty('accountWindow', 'none');
          document.removeEventListener('keydown');
        }
      });

      closeAccountWndw.addEventListener('click', () => {
        changeDisplayProperty('accountWindow', 'none');
        document.removeEventListener('keydown');
    })
  });

  function closePopUp(){
    // usernameWindow.addEventListener('click', () => {
    //
    //   let addClickListener = () => {
    //     window.addEventListener('click', clickEvent);
    //     usernameWindow.removeEventListener('mouseup', addClickListener);
    //   }
    //
    //   let clickEvent = (event) => {
    //     let isChild = false;
    //
    //     for (let child of accountPopUp.childNodes) {
    //       if (event.target === child) {
    //         isChild = true;
    //       }
    //     }
    //
    //     if (!isChild) {
    //       accountPopUp.style.display = 'none';
    //       window.removeEventListener('click', clickEvent);
    //       isUserPopUpVisible = false;
    //     }
    //   };
    //
    //   usernameWindow.addEventListener('mouseup', addClickListener);
    }

  usernameWindow.addEventListener('click', () => {
    if (!isUserPopUpVisible) {
      accountPopUp.style.display = 'block';
      accountPopUp.style.top = '2vw';
      accountPopUp.style.right = '6.5vw';
     isUserPopUpVisible = true;
    } else {
      accountPopUp.style.display = 'none';
      isUserPopUpVisible = false;
    }
  });

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      changeDisplayProperty('accountWindow', 'none');
      changeDisplayProperty('accountNav', 'none');
      changeDisplayProperty('usernameWindow', 'inline-block')
      writefirstnameToPopUp(user);
      writeUsernameToPopUp(user);
      writeStatusToPopUp(user);
      loggedIn = true;
      document.getElementById('navigationRes').textContent = '';
    } else {
      changeDisplayProperty('usernameWindow', 'none');
      changeDisplayProperty('accountNav', 'inline-block');
      loggedIn = false;
    }
  });

  settings.addEventListener('click', () => {
      window.location.href = './settings';
  });

  function writeUserToDatabase(firstname, lastname, username, email, userId) {
    firebase.database().ref('users/' + userId + '/userdata').set({
      firstname: firstname,
      lastname: lastname,
      username: username,
      status: 'Skiing with love',
      email: email
    }, (error) => {
      if (error) {
        // The write failed...
      } else {
        // Data saved successfully!
      }
    });
  }

  function writeUsernameToPopUp(user) {
    let userId = user.uid;

    return firebase.database().ref('users/' + userId + '/userdata').once('value').then(function(snapshot) {
      let username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      usernamePopUp.textContent = username;
    });
  }

  function writefirstnameToPopUp(user) {
    let userId = user.uid;

    return firebase.database().ref('users/' + userId + '/userdata').once('value').then(function(snapshot) {
      let firstname = (snapshot.val() && snapshot.val().firstname) || 'Anonymous';
      usernameField.textContent = firstname;
    });
  }

  function writeStatusToPopUp(user) {
    let userId = user.uid;

    return firebase.database().ref('users/' + userId + '/userdata').once('value').then(function(snapshot) {
      let status = (snapshot.val() && snapshot.val().status) || 'Anonymous';
      accStatus.textContent = status;
    });
  }

  function setNewStatus(user, newStatus) {
    firebase.database().ref('users/' + user.uid + '/userdata').update({
      status: newStatus
    });
  }

  activateSignIn.addEventListener('click', () => {
    document.getElementById('signup').style.left = '-25vw';
    document.getElementById('signin').style.right = '0';
    resetErrorField();
  });

  activateSignUp.addEventListener('click', () => {
    document.getElementById('signup').style.left = '0';
    document.getElementById('signin').style.right = '-25vw';
    resetErrorField();
  });

  navigationBtn.addEventListener('click', () => {
    let respond = document.getElementById('navigationRes');

    if (loggedIn) {
      respond.textContent = '';
      setTimeout(() => {
        window.location.href = './navigation';
      }, 250);
    } else {
      respond.textContent = 'Sie müssen eingeloggt sein um die Simulation starten zu können.';
    }
  });
});

function resetErrorField() {
  const errFieldSignUp = document.getElementById('errFieldSignUp');
  const errFieldSignIn = document.getElementById('errFieldSignIn');

  errFieldSignUp.style.display = 'none';
  errFieldSignUp.textContent = '';

  errFieldSignIn.style.display = 'none';
  errFieldSignIn.textContent = '';
}

function changeDisplayProperty(id, property) {
  document.getElementById(id).style.display = property;
}

function validatePassword(password) {
  return /[a-z]/.test(password.value) && /[A-Z]/.test(password.value) && /[0-9]/.test(password.value) && /[^a-zA-Z0-9]/.test(password.value) && password.value.length > 7;
}

function validateEmail(email) {
  const splitEmail = email.value.split('@');
  return splitEmail.length === 2 && splitEmail[1].split('.').length === 2 && splitEmail[1].split('.')[1].length >= 2;
}
