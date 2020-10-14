import axios from 'axios'

export default class Controllers {
  updateAndSort = async (ownerId) => {
    const resultArray = await fetch('/api/todos/' + ownerId).then(res =>
      res.json()
    )
    const sortedArray = resultArray.sort((a, b) => {
      return a._id - b._id
    })
    return sortedArray
  }

  postTodo = (inputTask, ownerId) => {
    const data = {
      title: inputTask,
      ownerid: ownerId,
      completed: false
    }
    axios.post('/api/todos', data)
      .then((res) => {
        console.log('Added task: ' + data.title)
      })
  }

  obliterateTask = (id) => {
    axios.delete('api/todos/' + id).then((res) => {
      console.log('Deleting: ' + id)
    })
      .catch(function (error) {
        console.log(error)
      }).then(
        this.updateAndSort())
  }

  obliterateAll = async (ownerId) => {
    axios.delete('api/todos/clear/' + ownerId).then((res) => {
      console.log(res.data)
    })
      .catch(function (error) {
        console.log(error)
      })
  }

  patchTask = (id, toggle) => {
    const data = {}
    data.id = id
    data.completed = toggle
    axios.patch('api/todos/' + id, data).then((res) => {
    })
      .catch(function (error) {
        console.log(error)
      }).then(
        this.updateAndSort())
  }
}
