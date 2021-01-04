const mongoose = require('mongoose')

const playlistitem = new mongoose.Schema({
  name: { type: String, requird: true },
  isdir: { type: Boolean, default: false },
  isplay: { type: Boolean, default: false },
  listname: { type: String, required: true },
  size: { type: Number },
  type: { type: String },
  path: { type: String },
  dir: { type: String }
})

const PlaylistItem = mongoose.model('PlaylistItem', playlistitem)
module.exports = PlaylistItem