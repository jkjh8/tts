var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TTS Server' });
});

const user = require('./users')
const log = require('./logs')
const audiofiles = require('./audiofiles')
const playlist = require('./playlist')
const status = require('./status')
const zones = require('./zones')

router.use(user)
router.use(log)
router.use(audiofiles)
router.use(playlist)
router.use(status)
router.use(zones)

module.exports = router;
