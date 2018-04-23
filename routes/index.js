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

module.exports = router;
