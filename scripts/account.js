window.addEventListener('load', () => {
  let config = {
    apiKey: 'AIzaSyDHuGnlajKcr4s8_vn9XC5McqalXvWTBsg',
    authDomain: 'virtualskiareanavigation.firebaseapp.com',
    databaseURL: 'https://virtualskiareanavigation.firebaseio.com',
    projectId: 'virtualskiareanavigation',
    storageBucket: 'virtualskiareanavigation.appspot.com',
    messagingSenderId: '428865397333'
  };

  firebase.initializeApp(config);

  const emailTxt = document.getElementById('email');
  const passwordTxt = document.getElementById('password');
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const usernameField = document.getElementById('usernameField');
  const usernamePopUp = document.getElementById('usernamePopUp');
  const accountArrow = document.getElementById('accountArrow');
  const accountPopUp = document.getElementById('accPopUp');
  let vorname;
  let isAccountPopUpVisible = false;

  loginBtn.addEventListener('click', () => {
    console.log("login button pressed");
    const email = emailTxt.value;
    const password = passwordTxt.value;
    const auth = firebase.auth();

    resetErrorField();

    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch((error) => {

      const errField = document.getElementById('errField');

      errField.style.display = "block";
      errField.textContent = error.message;

    });
  });

  signupBtn.addEventListener('click', () => {
    console.log("signup button pressed");
    const email = emailTxt.value;
    const password = passwordTxt.value;
    const auth = firebase.auth();

    resetErrorField()

    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch((error) => {

      const errField = document.getElementById('errField');

      errField.style.display = "block";
      errField.textContent = error.message;

    });
  });

  logoutBtn.addEventListener('click', () => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      document.getElementById('usernameField').textContent = "";
    }).catch(function(error) {
      // An error happened.
    });
  });

  accountArrow.addEventListener('click', () => {

    if (!isAccountPopUpVisible) {
      accountPopUp.style.display = "block";
      accountPopUp.style.top = "2vw";
      accountPopUp.style.right = "10vw";
      isAccountPopUpVisible = true;
    } else {
      accountPopUp.style.display = "none";
      isAccountPopUpVisible = false;
    }
  });

// TODO:
  // accountPopUp.style.display = "none";
  // isAccountPopUpVisible = false;




  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      vorname = document.getElementById('firstname').value;
      document.getElementById('user').textContent = user.email;
      usernameField.textContent = vorname;
      usernamePopUp.textContent = vorname;
      accountArrow.style.display = "inline-block";
    } else {
      document.getElementById('user').textContent = "not logged in";
      accountArrow.style.display = "none";
    }
  });
});

function resetErrorField() {
  const errField = document.getElementById('errField');

  errField.style.display = "none";
  errField.textContent = "";
}
