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

  const strongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  const mediumPassword = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
  const emailValidation = new RegExp("/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/");

  const body = document.getElementById('body');
  const errField = document.getElementById('errField');
  const anmelden = document.getElementById('anmelden'); // jetzt class: accountForm
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const activateSignIn = document.getElementById('alreadySignedUp');
  const activateSignUp = document.getElementById('notSignedUp');
  const usernameField = document.getElementById('usernameField');
  const usernamePopUp = document.getElementById('usernamePopUp');
  const usernameWindow = document.getElementById('usernameWindow');
  const accountPopUp = document.getElementById('accPopUp');
  const statusTxT = document.getElementById('statusField');
  const accStatus = document.getElementById('accStatus');
  const saveBtn = document.getElementById('saveBtn');
  const settings = document.getElementById('settings');
  const accNav = document.getElementById('accountNav');
  const accWindow = document.getElementById('accountWindow');
  const closeAccountWndw = document.getElementById('closeAccountWndw');
  const resetPassword = document.getElementById('forgotPassword');
  let isUserPopUpVisible = false;

  loginBtn.addEventListener('click', () => {
    console.log();
    console.log("login button pressed");
    const email = document.getElementById('emailSignIn');
    const password = document.getElementById('passwordSignIn');
    let containsAt = false;
    let isPasswordValid = false;
    let isEmailValid = false;
    let i = 0;
    const auth = firebase.auth();

    do {
        if (email.value.charAt(i) === '@') {
          containsAt = true;
        }
        i++;
    } while (!containsAt || i < email.value.length);

    if (containsAt) {
      const splitEmail  = email.value.split('@');
      isPasswordValid = validatePassword(password);
      isEmailValid = validateEmail(email);
      console.log(isPasswordValid);
      console.log(isEmailValid);
    } else {
      console.log("no @");
    }

    resetErrorField();
    changeDisplayProperty('errField', 'none');

    if (isPasswordValid && isEmailValid) {
      const promise = auth.signInWithEmailAndPassword(email.value, password.value);

      promise.catch((error) => {

        changeDisplayProperty('errField', 'block');
        errField.textContent = error.message;

      });
      console.log("logged in");
    }
    console.log();
  });

  signupBtn.addEventListener('click', () => {
    console.log("signup button pressed");

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

    do {
        if (email.value.charAt(i) === '@') {
          containsAt = true;
        }
        i++;
    } while (!containsAt || i < email.value.length);

    resetErrorField();
    changeDisplayProperty('errField', 'none');

    if (containsAt) {
      const splitEmail  = email.value.split('@');
      isPasswordValid = validatePassword(password);
      isEmailValid = validateEmail(email);
      isFirstnameValid = !/[^a-zäöüß ]/i.test(firstname.value) && firstname.value.length > 0;
      isLastnameValid = !/[^a-zäöüß ]/i.test(lastname.value) && lastname.value.length > 0;
      isUsernameValid = !/[^a-z0-9._]/i.test(username.value) && username.value.length > 0;

      console.log(isPasswordValid);
      console.log(isEmailValid);
      console.log(isFirstnameValid);
      console.log(isLastnameValid);
      console.log(isUsernameValid);
    } else {
      console.log("no @");
    }

    if (isPasswordValid && isEmailValid && isFirstnameValid && isLastnameValid && isUsernameValid) {
      const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
      promise.catch((error) => {

        changeDisplayProperty('errField', 'block');
        errField.textContent = error.message;
      });

      promise.then(() => {
        let userId = firebase.auth().currentUser.uid;
        console.log(userId);
        writeUserToDatabase(firstname.value, lastname.value, username.value, email.value, userId);
      });
    }
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

  accNav.addEventListener('click', () => {
      changeDisplayProperty('accountWindow', 'flex');
      closeAccountWndw.addEventListener('click', () => {
        changeDisplayProperty('accountWindow', 'none');
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
    //       accountPopUp.style.display = "none";
    //       window.removeEventListener('click', clickEvent);
    //       isUserPopUpVisible = false;
    //     }
    //   };
    //
    //   usernameWindow.addEventListener('mouseup', addClickListener);
    }

  usernameWindow.addEventListener('click', () => {
    if (!isUserPopUpVisible) {
      accountPopUp.style.display = "block";
      accountPopUp.style.top = "2vw";
      accountPopUp.style.right = "6.5vw";
     isUserPopUpVisible = true;
    } else {
      accountPopUp.style.display = "none";
      isUserPopUpVisible = false;
    }
  });

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user.email);
        changeDisplayProperty('accountWindow', 'none');
        changeDisplayProperty('accountNav', 'none');
        changeDisplayProperty('usernameWindow', 'inline-block')
        writefirstnameToPopUp(user);
        writeUsernameToPopUp(user);
        writeStatusToPopUp(user);
    } else {
      console.log("not logged in");
      changeDisplayProperty('usernameWindow', 'none');
      changeDisplayProperty('accountNav', 'inline-block');
    }
  });

  accStatus.addEventListener('click', () => {
      const user = firebase.auth().currentUser;
      const statusWrapper = document.getElementById('statusWrapper');
      const statusRes = document.getElementById('statusRes');
      changeDisplayProperty('statusWrapper', 'flex');
      console.log('state list opened');

      statusRes.textContent = '';

      saveBtn.addEventListener('click', () => {
        statusInput = statusTxT.value;
        if (statusInput !== '') {
          console.log(statusInput);
          setNewStatus(user, statusInput);
          statusRes.textContent = 'Neuer Status wurde erfolgreich gespeichert.';
          console.log("changed state");
          writeStatusToPopUp(user);
        } else {
          statusRes.textContent = 'Eingegebener Status ist ungültig.';
        }
      });

      document.getElementById('closeStatus').addEventListener('click', () => {
        changeDisplayProperty('statusWrapper', 'none');
        console.log("closed state list");
      });
  });

  resetPassword.addEventListener('click', () => {
      const auth = firebase.auth();
      const passwordWrapper = document.getElementById('passwordWrapper');
      const passwordRes = document.getElementById('passwordRes');
      const send = document.getElementById('sendPWReset');

      changeDisplayProperty('passwordWrapper', 'flex');

      send.addEventListener('click', () => {
        const emailAdress = document.getElementById('passwordField').value;

        if (emailAdress !== '') {
          console.log("senden");
          auth.sendPasswordResetEmail(emailAdress);

          setTimeout(function () {
            changeDisplayProperty('passwordWrapper', 'none');
          }, 2500);
        }
      });

      document.getElementById('closePassword').addEventListener('click', () => {
        changeDisplayProperty('passwordWrapper', 'none');
      });
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

  activateSignIn.addEventListener('click', () => {
    document.getElementById('signup').style.left = '-25vw';
    document.getElementById('signin').style.right = '0';
  });

  activateSignUp.addEventListener('click', () => {
    document.getElementById('signup').style.left = '0';
    document.getElementById('signin').style.right = '-25vw';
  })
});

function resetErrorField() {
  const errField = document.getElementById('errField');

  errField.style.display = "none";
  errField.textContent = "";
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
