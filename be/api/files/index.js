const fs = require('fs')
const homedir = require('os').homedir()
const path = require('path')

const mediaFolder = path.join(homedir, '/media')

module.exports.files = async function(req, res) {
  const files = []
  const fileList = await fs.readdirSync(mediaFolder)
  fileList.forEach(file => {
    const stat = fs.statSync(path.join(mediaFolder, file))
    files.push({
      name: file,
      type: file.split('.').pop(),
      size: stat.size,
      isdir: stat.isDirectory(),
      isplay: false
    })
  })
  return res.status(200).json(files)
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
