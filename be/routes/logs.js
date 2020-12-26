var express = require('express');
var router = express.Router();

const log = require('../api/log')

/* GET log listing. */
router.get('/api/log/logs/:page/:limit', log.logs)

module.exports = router;
