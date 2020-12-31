const dbPlaylistName = require('../../models/PlaylistName')
const dbPlaylistItem = require('../../models/PlaylistItem')

function delAllPlaylistItems (listname) {
  dbPlaylistItem.deleteMany({ listname: listname }, (err, result) => {
    if (err) {
      return err
    } else {
      return result
    }
  })
}

module.exports.getPlaylistName = async function(req, res) {
  const playlistNames = await dbPlaylistName.find({})
  return res.status(200).json(playlistNames)
}

module.exports.addPlaylistName = function(req, res) {
  dbPlaylistName.create(req.body, (err, result) => {
    if (err) {
      res.status(500).json({ message: err })
    } else {
      res.status(200).json({ message: "success", data: result })
    }
  })
}

module.exports.delPlaylistName = async function(req, res) {
  try {
    const result_1 = await dbPlaylistName.findByIdAndRemove(req.body._id)
    const result_2 = await delAllPlaylistItems(req.body.name)
    return res.status(200).json({ message: "success", result: [result_1, result_2] })
  } catch (err) {
    return res.status(500).json({ message: "error", result: err })
  }
}

module.exports.getPlaylistItem = async function(req, res) {
  try {
    const playlistItems = await dbPlaylistItem.find({ listname: req.params.listname })
    return res.status(200).json(playlistItems)
  } catch (err) {
    return res.status(500).json({ message: "error", result: err })
  }
}

module.exports.delPlaylistItem = function(req, res) {
  dbPlaylistItem.findByIdAndRemove(req.body._id).then((result) => {
    return res.status(200).json({ message: 'success', result: result })
  }).catch(err => {
    return res.status(500).json({ message: "error", result: err})
  })
}

module.exports.delAllPlaylistItems = async function(req, res) {
  try {
    const result = await delAllPlaylistItems(req.body.name)
    return res.status(200).json({ message: 'success', result: result })
  } catch (err) {
    return res.status(500).json({ message: 'error', result: err })
  }
}

module.exports.addPlaylistItem = async function(req, res) {
  const items = req.body
  console.log(items)
  dbPlaylistItem.insertMany(items, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'error', result: err })
    } else {
      res.status(200).json({ message: "success", data: result })
    }
  })
}
