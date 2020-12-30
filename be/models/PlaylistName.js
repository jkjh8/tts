const mongoose = require('mongoose')

const playlistName = new mongoose.Schema({
  name: { type: String, requird: true }
})


const PlaylistName = mongoose.model('PlaylistName', playlistName)
module.exports = PlaylistName