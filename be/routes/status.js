var express = require('express');
var router = express.Router();

const status = require('../api/status')

/* GET status listing. */
router.get('/api/status/checkdiskusage', status.checkDiskUsage)

module.exports = router;
