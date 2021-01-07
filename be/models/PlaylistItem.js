const mongoose = require('mongoose')

const playlistitem = new mongoose.Schema({
  name: { type: String, requird: true },
  basename: { type: String, required: true },
  type: { type: String },
  path: { type: String, required: true },
  relativepath: { type: String, require: true },
  isdir: { type: Boolean, default: false },
  size: { type: Number },
  isplay: { type: Boolean, default: false },
  isabsolite: { type: Boolean, default: true },
  listname: { type: String, required: true },
  dir: { type: String }
})

const PlaylistItem = mongoose.model('PlaylistItem', playlistitem)
module.exports = PlaylistItem