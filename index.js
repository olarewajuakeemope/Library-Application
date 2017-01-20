var express = require('express');
var path = require('path');
var firebase = require('firebase');
var bodyParser = require('body-parser');
const adminID = 's9uc9dexFJXjEnmX3X52jY1YlG12';
var currID = '';

var bookCategories = [];
var allCats = [];
var catsAndBooks = [];


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
var router = express.Router();

 
var config = {   apiKey: "AIzaSyB89UfsZjSnvda76EdN4qwsjBfhvcqia78",   authDomain: "libraryapplication-3e3d5.firebaseapp.com",   databaseURL: "https://libraryapplication-3e3d5.firebaseio.com",   storageBucket: "libraryapplication-3e3d5.appspot.com",   messagingSenderId: "242818936620"  };

 
firebase.initializeApp(config);
var ref = firebase.database().ref();

const auth = firebase.auth();

//prepare the select for book categories
ref.child('category').once('value').then(function(snap) {
  var i = 0;


  snap.forEach(function(childSnap){
  allCats.push(childSnap.key);
  var tempbookarr = [];


     childSnap.forEach(function(childrenSnap){
     if(childrenSnap.val() !== true){
     tempbookarr.push(childrenSnap.val());
     console.log(childrenSnap.val());
        }
     });

  catsAndBooks.push(tempbookarr);
  console.log('catsAndBooks changed to array');
  console.log(catsAndBooks);
  i++;
  });

  console.log('catsAndBooks');
  console.log(catsAndBooks);

  for (var i=0; i < allCats.length; i++) {
	var currCat = {};
	currCat.cat = allCats[i];
	bookCategories[i] = currCat;
}
});

//end the select for book categories


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
    }).then(function(data) {
      console.log('data');
      firebase.auth().onAuthStateChanged((user) => {
        if(user){
          console.log(user.uid);
          res.json({});   
    }
      });
      
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
    }).then(function(data) {
      console.log('data');
      firebase.auth().onAuthStateChanged((user) => {
        if(user){
          var adminUrl = '/dashboard';
          if (user.uid === adminID) {
          adminUrl = '/controlpanel';
          console.log(user.uid);
        }
        res.json({url: adminUrl});
    }
      });
      
    });
})

//add book begins
app.post('/forms/addbook', function(req, res) {

	firebase.auth().onAuthStateChanged((user) => {
        if(user){
        	console.log('user.uid');
        	console.log(user.uid);
            
         }else{
         	console.log('/forms/loginForm');
         	return res.json({url: '/forms/loginForm'});
         }
      });
	console.log('running');
  var name = req.body.name;
  var cat = String(req.body.cat);
  var qty = parseInt(req.body.qty);

  var catref = ref.child('category');
  var catname = catref.child(cat);
  catname.push({
      name: name,
      quantity: qty
  });
  var data = {};
  res.send(data);
})
//add book ends


//add cat
app.post('/forms/addcat', function(req, res) {

	firebase.auth().onAuthStateChanged((user) => {
        if(user){
        	console.log('user.uid');
        	console.log(user.uid);
            
         }else{
         	console.log('/forms/loginForm');
         	return res.json({url: '/forms/loginForm'});
         }
      });
	console.log('running add cat');
  var name = req.body.name;
  var updates = {};
  console.log(name);
  name = String(name);
  updates['' + name] = true;
  var catref = ref.child('category').update(updates);
  var data = {};
  res.send(data);
})
//add cat


//my template engine begins
app.set('view engine', 'ejs');

app.get('/dashboard', function(req, res) {
	var bookCat = [];
	bookCat = bookCategories;
    res.render('pages/index', {bookCat: bookCat, catsAndBooks: catsAndBooks});
});

app.get('/controlpanel', function(req, res) {
	var bookCat = [];
	bookCat = bookCategories;

    console.log('catsAndBooks in render');
    console.log(bookCat);
    res.render('pages/admin', {bookCat: bookCat, catsAndBooks: catsAndBooks});
});
//my template engine ends


app.get('/forms/logout', function(req, res) {
  firebase.auth().signOut();
  res.json({});
})

router.get('/loginForm', function(req, res) {
  res.sendFile('loginForm.html', { root: path.join(__dirname, './files') });
})

router.get('/signupForm', function(req, res) {
  res.sendFile('signupForm.html', { root: path.join(__dirname, './files') });
})

app.listen(5000, function() {
  console.log('Listening at port 5000!')
})
