const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const logsSchema = new mongoose.Schema({
  type: { type: String, requird: true },
  priority: { type: String, required: true, default: 'Low' },
  date: { type: Date, required: true, default: Date.now },
  source: { type: String, default: 'Server' },
  email: { type: String },
  message: { type: String, required: true }
})

logsSchema.plugin(mongoosePaginate)

const Logs = mongoose.model('Logs', logsSchema)
module.exports = Logs