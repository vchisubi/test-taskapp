const express = require('express')
const todoService = require('../../../services/todos')
const tokenUtil = require('../../../utils/tokenUtil')
let router = express.Router()

router.get('/:ownerid', tokenUtil.authenticateToken, (req,res) => {
  todoService.getList(req.params.ownerid).then(result => {
    res.json(result);
  })
})

// Create new task
router.post('', tokenUtil.authenticateToken, (req,res) => {
  const userInput = req.body
  const task = userInput.title
  const ownerid = userInput.ownerid
  const taskObject = {'ownerid': ownerid, 'id': Date.now(), 'title': task, 'completed': false}
  todoService.createTask(taskObject).then(result => {
    res.send(result);
  })
})

// Update existing task
router.patch('/:id', tokenUtil.authenticateToken, (req,res) => {
  let taskId = parseInt(req.params.id)
  let userInput = req.body
  const toggle = userInput.completed
  todoService.updateTask(taskId, toggle).then(result => {
    res.json(result)
  })
})

// Delete all existing tasks
router.delete('/clear/:ownerid', tokenUtil.authenticateToken, (req,res) => {
  todoService.deleteAllTasks(req.params.ownerid).then(result => {
    res.json(result)
  })
})

// Delete existing task
router.delete('/:id', tokenUtil.authenticateToken, (req,res) => {
  let taskId = parseInt(req.params.id)
  todoService.deleteTask(taskId).then(result => {
    res.json(result)
  })
})

module.exports = router