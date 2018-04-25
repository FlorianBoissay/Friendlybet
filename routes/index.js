var request = require('request');
var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var session = require("express-session");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/miser', function(req, res, next) {
  res.render('miser')
});

router.get('/inscription', function(req, res, next) {
  res.render('inscription')
});

router.get('/connexion', function(req, res, next) {
  res.render('connexion')
});

/*ATTENTE page. */
router.get('/attente', function(req, res, next) {
  res.render('attente')
});

/*partie page. */
router.get('/partie', function(req, res, next) {
  res.render('partie')
});

router.get('/envoiphoto', function(req, res, next) {
  res.render('envoiphoto')
});

router.get('/recap', function(req, res, next) {
  res.render('recap')
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard')
})

router.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('/florian/lacapsule/friendlybet/betapp/exemple.jpg', function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

var options = { server: { socketOptions: {connectTimeoutMS: 5000 } }};
mongoose.connect('mongodb://friendlybet:friendlybet@ds255329.mlab.com:55329/friendlybet',
    options,
    function(err) {
     console.log(err);
    }
);

var userSchema = mongoose.Schema({
    pseudo: String,
    email: String,
    password: String
});

var UserModel = mongoose.model('users', userSchema);

router.post('/inscription', function(req, res) {
var newUser = new UserModel ({
   pseudo: req.body.pseudo,
   email: req.body.email,
   password: req.body.password
  });
    newUser.save(
      function (error, user) {
        console.log(error);
        console.log(user);
        req.session.user = user;
        UserModel.find(
          {user_id: req.session.user._id},
          function(err, user){
            console.log(user);
            res.render('dashboard', {user: req.session.user});
          }
        )
      }
    );
});

router.post('/connexion', function(req, res, next) {

  UserModel.find(
      { email: req.body.email, password: req.body.password} ,
      function (err, users) {
        if(users.length > 0) {
          req.session.user = users[0];
          res.render('dashboard', { user : req.session.user });
        } else {
          res.render('connexion');
        }
      }
  );

});

module.exports = router;
