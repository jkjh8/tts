var express = require('express');
var router = express.Router();

const playlist = require('../api/playlist')

/* GET log listing. */
router.get('/api/playlist/getplaylistname', playlist.getPlaylistName)
router.post('/api/playlist/addplaylistname', playlist.addPlaylistName)
router.post('/api/playlist/delplaylistname', playlist.delPlaylistName)

router.get('/api/playlist/getplaylistitems/:listname', playlist.getPlaylistItem)
router.post('/api/playlist/addplaylistitems', playlist.addPlaylistItem)

module.exports = router
