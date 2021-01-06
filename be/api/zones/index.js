const dbZones = require('../../models/Zones')

module.exports.getZones = async function(req, res) {
  const zones = await dbZones.find({})
  console.log(zones)
  return res.status(200).json(zones)
}
