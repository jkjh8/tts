const dbLogs = require('../../models/Logs')

module.exports.logs = function(req, res) {
  const options = {
    page: req.query.page,
    limit: req.query.limit
  }
  dbLogs.paginate({}, options, (err, result) =>{
    if (err) return res.status(500).json({ status: 'Error' })
    return res.status(200).json(result)
  })
}

module.exports.delLog = async function(req, res) {
  await dbLogs.deleteMany({})
  const options = {
    page: 1,
    limit: 10
  }
  dbLogs.paginate({}, options, (err, result) =>{
    if (err) return res.status(500).json({ status: 'Error' })
    return res.status(200).json(result)
  })
}