const mongoose = require('mongoose')

const zoneSchema = new mongoose.Schema({
  name: { type: String, requird: true },
  id: { type: Number, required: true, unique: true },
  status: { type: Number, default: 0 }
})

const Zone = mongoose.model('Zones', zoneSchema)

module.exports = Zone
