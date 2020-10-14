const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  password: String,
  userid: String
})

const LocalUser = mongoose.model('localuser', userSchema)

module.exports = LocalUser