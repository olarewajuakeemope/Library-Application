var express = require('express');
var path = require('path');
var firebase = require('firebase');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());
var router = express.Router();

 
var config = {   apiKey: "AIzaSyB89UfsZjSnvda76EdN4qwsjBfhvcqia78",   authDomain: "libraryapplication-3e3d5.firebaseapp.com",   databaseURL: "https://libraryapplication-3e3d5.firebaseio.com",   storageBucket: "libraryapplication-3e3d5.appspot.com",   messagingSenderId: "242818936620"  };

 
firebase.initializeApp(config);

const auth = firebase.auth();


app.use('/cssFiles', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/img'));
app.use('/jsFiles', express.static(__dirname + '/js'));

app.get('/', function(req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, './files') });
})

app.use('/forms', router);

app.post('/forms/userprocess', function(req, res) {
  var email = req.body.email;
  var pass = req.body.pass;
  firebase.auth().createUserWithEmailAndPassword(email, pass)
    .catch(function(error) {
      // Handle Errors here.
      console.log('inside the catch');
      var errorCode = error.code;
      if (errorCode == 'auth/weak-password') {
        res.send('The password is too weak.');
      } else {
        res.json({ error: error });
        console.log('error');
        console.log(error);
      }
    }).then(function(data){
    	console.log('data');
    	res.json({});
    });
})

app.post('/forms/loginprocess', function(req, res) {
  var email = req.body.email;
  var pass = req.body.pass;
  firebase.auth().signInWithEmailAndPassword(email, pass)
    .catch(function(error) {
      // Handle Errors here.
      console.log('inside the catch');
      var errorCode = error.code;
      if (errorCode == 'auth/wrong-password') {
        res.send('The password is too weak.');
      } else {
        res.json({ error: error });
        console.log('error');
        console.log(error);
      }
    }).then(function(data){
    	console.log('data');
    	res.json({});
    });
})

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user.uid);
  }
});


router.get('/loginForm', function(req, res) {
  res.sendFile('loginForm.html', { root: path.join(__dirname, './files') });
})

router.get('/signupForm', function(req, res) {
  res.sendFile('signupForm.html', { root: path.join(__dirname, './files') });
})

app.listen(81, function() {
  console.log('Listening at port 81!')
})
