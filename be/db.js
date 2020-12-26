const mongoose = require('mongoose')
const dbLogs = require('./models/Logs')

mongoose.connect('mongodb://localhost/TtsServer', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  connectTimeoutMS: 1000
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'db Connection Error:'))

db.once('open', () => {
  const startLog = new dbLogs({
    type: 'Info',
    priority: 'Low',
    message: 'Server Start!'
  })
  startLog.save()
  console.log('MongoDB connected...')
})

module.exports = db
