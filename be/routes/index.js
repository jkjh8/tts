var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TTS Server' });
});

const user = require('./users')
const log = require('./logs')

router.use(user)
router.use(log)

module.exports = router;
