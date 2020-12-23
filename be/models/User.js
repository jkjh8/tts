const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const userSchema = new mongoose.Schema({
  name: { type: String, requird: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, bcrypt: true},
  admin: { type: Boolean, default: false}
})
userSchema.plugin(require('mongoose-bcrypt')), { rounds: 10 }
const User = mongoose.model('User', userSchema)

module.exports = User
