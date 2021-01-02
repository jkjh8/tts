const fs = require('fs')
const homedir = require('os').homedir()
const path = require('path')

const mediaFolder = path.join(homedir, '/media')
!fs.existsSync(mediaFolder) && fs.mkdirSync(mediaFolder)

module.exports.files = async function(req, res) {
  const folders= []
  const files = []
  const fileList = await fs.readdirSync(mediaFolder)
  fileList.forEach(file => {
    const stat = fs.statSync(path.join(mediaFolder, file))
    if (stat.isDirectory()) {
      folders.push({
        name: file,
        type: "Dir",
        size: stat.size,
        isdir: stat.isDirectory()
      })
    } else {
      files.push({
        name: file,
        type: file.split('.').pop(),
        isdir: stat.isDirectory(),
        size: stat.size,
        isplay: false
      })
    }
  })
  return res.status(200).json({ folders: folders, files: files })
}

module.exports.upload = async function(req, res) {
  let uploadFile = Object.values(req.files)[0]
  await uploadFile.mv(`${mediaFolder}/${uploadFile.name}`,
  function (err) {
    if (err) {
      return res.status(500).json({ message: 'upload err' })
    }
  })
  return res.status(200).json({ success: true })
}

module.exports.del = function(req, res) {
  const files = req.body
  files.forEach(async (file) => {
    fs.unlinkSync(path.join(mediaFolder, file.name))
  })
  res.status(200).json({ result: 'success' })
  // return res.status(500).json({ result: 'failed' })
}
