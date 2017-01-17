(function() {

  // Initialize Firebase
   
  var config = {   apiKey: "AIzaSyBR7vDeYtPTpR3VEATN-uX7U29lL7Dy7eI",   authDomain: "libapp-852f2.firebaseapp.com",   databaseURL: "https://libapp-852f2.firebaseio.com",   storageBucket: "libapp-852f2.appspot.com",   messagingSenderId: "900697377010"  }; 
  firebase.initializeApp(config);
  console.log('error');

  const inputEmail = document.getElementById('inputEmail');
  const inputPassword = document.getElementById('inputPassword');
  const login = document.getElementById('login');

  login.addEventListener('click', e => {
    console.log('error');
    const email = inputEmail.value;
    const pass = inputPassword.value;
    firebase.auth().signInWithEmailAndPassword(email, pass)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  });

})();
