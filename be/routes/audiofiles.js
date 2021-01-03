var express = require('express');
var router = express.Router();

const files = require('../api/files')

/* GET log listing. */
router.get('/api/audiofiles', files.files)
router.post('/api/audiofiles', files.files)
router.post('/api/uploadfiles', files.upload)
router.post('/api/delfiles', files.del)
router.post('/api/createdir', files.createdir)

module.exports = router;
