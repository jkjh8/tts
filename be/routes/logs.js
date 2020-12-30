var express = require('express');
var router = express.Router();

const log = require('../api/log')

/* GET log listing. */
router.get('/api/log/logs/:page/:limit', log.logs)
router.get('/api/log/del', log.delLog)

module.exports = router;
