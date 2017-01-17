var express = require('express');
var path = require('path');
var firebase = require('firebase');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());
var router = express.Router();

  var config = {
    apiKey: "AIzaSyB89UfsZjSnvda76EdN4qwsjBfhvcqia78",
    authDomain: "libraryapplication-3e3d5.firebaseapp.com",
    databaseURL: "https://libraryapplication-3e3d5.firebaseio.com",
    storageBucket: "libraryapplication-3e3d5.appspot.com",
    messagingSenderId: "242818936620"
  };

  firebase.initializeApp(config);

const auth = firebase.auth();


app.use('/cssFiles', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/img'));
app.use('/jsFiles', express.static(__dirname + '/js'));

app.get('/', function (req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, './files')});
})

app.use('/forms', router);

app.post('/forms/userprocess', function (req, res) {
  var email = req.body.userEmail;
  var pass = req.body.userPassword;
  firebase.auth().createUserWithEmailAndPassword(email, pass)
    .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode == 'auth/weak-password') {
    res.send('The password is too weak.');
  } else {
  	res.send(errorMessage);
    console.log(errorMessage);
  }
});
})

app.post('/forms/loginprocess', function (req, res) {
  var email = req.body.userEmail;
  var password = req.body.userPassword;
  const promise = auth.signInWithEmailAndPassword(email, password);
  promise.catch(e => console.log(e.message))
})

router.get('/loginForm', function (req, res) {
  res.sendFile('loginForm.html', {root: path.join(__dirname, './files')});
})

router.get('/signupForm', function (req, res) {
  res.sendFile('signupForm.html', {root: path.join(__dirname, './files')});
})

app.listen(81, function () {
  console.log('Listening at port 81!')
})