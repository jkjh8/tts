var express = require('express');
var router = express.Router();

const info = require('../api/mediainfo')

/* GET log listing. */
router.post('/api/getMediaInfo', info.getMediaInfo)

module.exports = router;
