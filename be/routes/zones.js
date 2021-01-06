var express = require('express');
var router = express.Router();

const zones = require('../api/zones')

/* GET status listing. */
router.get('/api/zones/getzones', zones.getZones)

module.exports = router;
