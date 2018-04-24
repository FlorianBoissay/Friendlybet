var express = require('express');
var router = express.Router();

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

router.get('/envoiphoto', function(req, res, next) {
  res.render('envoiphoto')
});

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

module.exports = router;
