const fs = require('fs')
const { parse } = require('path')
const homedir = require('os').homedir()
const path = require('path')

const basePath = path.join(homedir, '/audio')
!fs.existsSync(basePath) && fs.mkdirSync(basePath)

function getDir (folder) {
  if (folder) {
    return path.join(basePath, folder)
  } else {
    return basePath
  }
}

module.exports.files = async function(req, res) {
  try {
    const folders= []
    const files = []
    const folder = await getDir(req.body.folder)
    const list = await fs.readdirSync(folder)
    list.forEach(file => {
      const Path = path.join(folder, file)
      const parsed = path.parse(Path)
      const state = fs.statSync(Path)
      const obj = {
        name: parsed.name,
        basename: parsed.base,
        type: parsed.ext.replace('.', ''),
        path: Path,
        relativepath: Path.replace(basePath, ''),
        isdir: state.isDirectory(),
        size: state.size,
        isplay: false,
        isabsolute: true,
        dir: req.body.folder
      }
      if (obj.iddir) { folders.push(obj) }
      else { files.push(obj) }
    })
    return res.status(200).json({ result: 'success', folders: folders, files: files })
  } catch (err) {
    return res.status(500).json({ result: 'error', message: err })
  }
}

module.exports.upload = async function(req, res) {
  let uploadFile = Object.values(req.files)[0]
  const uploadPath = path.join(basePath, req.body.folder)
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
    const files = req.body.files
    files.forEach(async (file) => {
      if (file.isdir) {
        fs.rmdirSync(file.path, { recursive: true })
      } else {
        fs.unlinkSync(file.path)
      }
    })
    res.status(200).json({ result: 'success' })
  } catch (err) {
    res.status(500).json({ result: 'failed', message: err })
  }
}

module.exports.createdir = function(req, res) {
  try {
    const getdir = path.join(basePath, req.body.dir)
    fs.mkdirSync(getdir)
    res.status(200).json({ result: 'success' })
  } catch (err) {
    res.status(500).json({ result: 'failed', message: err })
  }
}