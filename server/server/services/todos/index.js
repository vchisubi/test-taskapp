const TodoList = require('../../models/list-model')

// const todoListResponse = (err, res) => {
//   if (err){
//     reject(err)
//   } else { resolve(res || {}) }
// }

const getList = async (ownerId) => {
  return new Promise((resolve, reject) => {
    TodoList.find({ "ownerid": ownerId }, (err, documents) => {
      if (err)
        reject(err);
      else {
        resolve(documents || {});
      }
    })
  })
}

const getTask = (taskId) => {
  return new Promise((resolve, reject) => {
    TodoList.find({ "id": taskId }, (err, document) => {
      if (err)
        reject(err)
      else
        resolve(document || {})
    })
  })
}

const createTask = (task) => {
  return new Promise((resolve, reject) => {
    new TodoList(task).save().then((err,result) => {
      if (err)
        reject(err)
      else {
        resolve(result || {})
      }
    })
  })
}

const updateTask = async (taskId, toggle) => {
  return new Promise((resolve, reject) => {
    TodoList.findOneAndUpdate({ "id": taskId }, { "completed": toggle }, (err, result) => {
      if (err)
        reject(err);
      else
        resolve(result || {})
    })
  })
}

const deleteAllTasks = async (ownerId) => {
  return new Promise((resolve, reject) => {
    TodoList.deleteMany({ "ownerid": ownerId }, (err, result) => {
      if (err)
        reject(err)
      else
      resolve(result || {})
    })
  })
}

const deleteTask = async (taskId) => {
  return new Promise((resolve, reject) => {
    TodoList.findOneAndDelete({ "id": taskId }, (err, result) => {
      if(err)
        reject(err)
      else
        resolve(result || {})
    })
  })
}

module.exports = {
  getList: getList,
  getTask: getTask,
  createTask: createTask,
  updateTask: updateTask,
  deleteAllTasks: deleteAllTasks,
  deleteTask: deleteTask,
}