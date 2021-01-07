const mediainfo = require('node-mediainfo')

module.exports.getMediaInfo = async function(req, res) {
  try {
    const result = await mediainfo(req.body.path)
    return res.status(200).json({ result: 'success', file: result.media.track[0] })
  } catch (err) {
    return res.status(500).json({ result: 'error', message: err })
  }
}