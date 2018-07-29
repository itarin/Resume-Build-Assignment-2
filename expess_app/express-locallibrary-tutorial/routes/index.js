var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TITLE' });
}).get('/users/cool', function(req, res, next) {
  res.render('index', { title: 'ROSY TE AMO' });
});

module.exports = router;
