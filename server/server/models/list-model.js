const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  id: Number,
  ownerid: String,
  title: String,
  completed: Boolean
})

const TodoList = mongoose.model('todolist', userSchema)

module.exports = TodoList