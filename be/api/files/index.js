const fs = require('fs')
const homedir = require('os').homedir()
const path = require('path')

const mediaFolder = path.join(homedir, '/media')
!fs.existsSync(mediaFolder) && fs.mkdirSync(mediaFolder)

function getDir (folder) {
  if (folder) {
    return path.join(mediaFolder, folder)
  } else {
    return mediaFolder
  }
}

module.exports.files = async function(req, res) {
  try {
    const getFolder = await getDir(req.body.folder)
    const folders= []
    const files = []
    const fileList = await fs.readdirSync(getFolder)
    fileList.forEach(file => {
      const filePath = path.join(getFolder, file)
      const stat = fs.statSync(filePath)
      if (stat.isDirectory()) {
        folders.push({
          name: file,
          path: filePath,
          type: "Dir",
          size: stat.size,
          isdir: stat.isDirectory()
        })
      } else {
        files.push({
          name: file,
          path: filePath,
          type: file.split('.').pop(),
          isdir: stat.isDirectory(),
          size: stat.size,
          isplay: false
        })
      }
    })
    return res.status(200).json({ result: 'success', folders: folders, files: files })
  } catch (err) {
    return res.status(500).json({ result: 'error', message: err })
  }
}

module.exports.upload = async function(req, res) {
  let uploadFile = Object.values(req.files)[0]
  const uploadPath = path.join(mediaFolder, req.body.folder)
  await uploadFile.mv(`${uploadPath}/${uploadFile.name}`,
  function (err) {
    if (err) {
      return res.status(500).json({ result: 'error', message: err })
    }
  })
  return res.status(200).json({ result: 'success' })
}

module.exports.del = function(req, res) {
  try {
    const getDir = path.join(mediaFolder, req.body.folder)
    const files = req.body.files
    files.forEach(async (file) => {
      if (file.isdir) {
        const dir = path.join(getDir, file.name)
        fs.rmdirSync(dir, { recursive: true })
      } else {
        fs.unlinkSync(path.join(getDir, file.name))
      }
    })
    res.status(200).json({ result: 'success' })
  } catch (err) {
    res.status(500).json({ result: 'failed', message: err })
  }
  // return res.status(500).json({ result: 'failed' })
}

module.exports.createdir = function(req, res) {
  try {
    const getdir = path.join(mediaFolder, req.body.dir)
    fs.mkdirSync(getdir)
    res.status(200).json({ result: 'success' })
  } catch (err) {
    res.status(500).json({ result: 'failed', message: err })
  }
}