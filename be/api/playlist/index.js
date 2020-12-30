const dbPlaylistName = require('../../models/PlaylistName')
const dbPlaylistItem = require('../../models/PlaylistItem')

module.exports.getPlaylistName = async function(req, res) {
  const playlistNames = await dbPlaylistName.find({})
  return res.status(200).json(playlistNames)
}

module.exports.addPlaylistName = function(req, res) {
  const newPlaylist = new dbPlaylistName({
    name: req.body.name
  })
  newPlaylist.save().then((result) => {
    return res.status(200).json({ message: "success", data: result })
  }).catch(err => { res.status(500).json({ message: err }) })
}

module.exports.delPlaylistName = async function(req, res) {
  console.log(req.body)
  await dbPlaylistName.findByIdAndRemove(req.body._id)
  res.status(200).json({ message: "success" })
}

module.exports.getPlaylistItem = async function(req, res) {
  const playlistItems = await dbPlaylistItem.find({ listname: req.params.listname })
  return res.status(200).json(playlistItems)
}

module.exports.addPlaylistItem = function(req, res) {
  const items = req.body
  items.forEach((item) => {
    const addItem = new dbPlaylistItem(item)
    addItem.save().then((result) => {
      return res.status(200).json({ message: "success", data: result })
    }).catch(err => { res.status(500).json({ message: err }) })
  })
}
