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
// const loginBtn = document.getElementById('loginBtn');
// const signupBtn = document.getElementById('signupBtn');

function loginBtn() {
  const email = emailTxt.value;
  const password = passwordTxt.value;
  const auth = firebase.auth();

  const promise = auth.signInWithEmailAndPassword(email, password);
  promise.catch(e => console.log(e.message));
}

function signupBtn() {
  const email = emailTxt.value;
  const password = passwordTxt.value;
  const auth = firebase.auth();

  const promise = auth.createrUserWithEmailAndPassword(email, password);
  promise.catch(e => console.log(e.message));
}

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser);
  } else {
    console.log('not logged in');
  }
});
