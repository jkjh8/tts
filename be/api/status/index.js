const checkDiskSpace = require('check-disk-space')

module.exports.checkDiskUsage = function(req, res) {
  checkDiskSpace('C:/').then((diskSpace) => {
    return res.status(200).json({ diskSpace })
  })
}