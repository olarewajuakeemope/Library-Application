var express = require('express');
var path = require('path');
var firebase = require('firebase-admin');
var bodyParser = require('body-parser');


var serviceAccount = require('./libapp-852f2-firebase-adminsdk-0zzwv-10b597e1f3.json');

var app = express();
app.use(bodyParser());
var router = express.Router();

firebase.initializeApp({
	credential: firebase.credential.cert(serviceAccount),
	databaseURL: 'https://libapp-852f2.firebaseio.com/'
});

const auth = firebase.auth();


app.use('/cssFiles', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/img'));
app.use('/jsFiles', express.static(__dirname + '/js'));

app.get('/', function (req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, './files')});
})

app.use('/forms', router);

app.post('/forms/userprocess', function (req, res) {
  res.end(JSON.stringify(req.body));
  console.log(JSON.stringify(req.body));
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