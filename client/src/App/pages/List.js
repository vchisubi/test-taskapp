import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import Controllers from '../controllers/controllers'
import InputField from '../components/inputField'
import TodoItem from '../components/taskItem'
import ViewAllButton from '../components/Buttons/viewAllButton'
import ViewActiveButton from '../components/Buttons/viewActiveButton'
import ViewCompletedButton from '../components/Buttons/viewCompletedButton'
import ClearAllButton from '../components/Buttons/clearAllButton'
import { AuthUserContext } from '../context/authUser'
import { home, logout } from '../css/buttons'
import { listContainer, todolistContainer, navContainer } from '../css/containers'
import { listCol } from '../css/columns'
import divider from '../assets/images/divider.png'

class List extends Component {
  static contextType = AuthUserContext

  constructor (props) {
    super(props)
    this.state = {
      inputfield: '',
      todos: [],
      loggingOut: false
    }

    this.myController = new Controllers()
    this.onCheckboxChange = this.handleChange.bind(this)
    this.onDeleteTask = this.handleClick.bind(this)
  }

  componentDidMount () {
    this.getTodoList()

    setInterval(() => {
      axios.get('/auth/tokenCheck').then((res) => {
        if (res.data === false) {
          this.handleLogout()
        }
      })
    }, 900000)
  }

  getTodoList = () => {
    this.myController.updateAndSort(this.context.user._id)
      .then(result => {
        this.setState({ todos: result })
      })
  }

  showAll = () => {
    this.getTodoList()
  }

  showActive = () => {
    const updatedTodos = []
    this.myController.updateAndSort(this.context.user._id)
      .then(result => {
        result.map(todo => {
          if (todo.completed === false) {
            updatedTodos.push(todo)
          }
          this.setState({ todos: updatedTodos })
        })
      })
  }

  showComplete = () => {
    const updatedTodos = []
    this.myController.updateAndSort(this.context.user._id)
      .then(result => {
        result.map(todo => {
          if (todo.completed === true) {
            updatedTodos.push(todo)
          }
          this.setState({ todos: updatedTodos })
        })
      })
  }

  // Handles checkbox toggle for tasks
  handleChange = (inputId) => {
    this.setState(prevState => {
      const updatedTodos = prevState.todos.map(todo => {
        if (todo.id === inputId) {
          todo.completed = !todo.completed
          this.myController.patchTask(inputId, todo.completed)
        }
        return todo
      })
      return { todos: updatedTodos }
    })
  }

  // Handles deletion of a task
  handleClick = (inputId) => {
    const updatedTodos = []
    this.setState(prevState => {
      prevState.todos.map(todo => {
        if (todo.id === inputId) {
          this.myController.obliterateTask(inputId)
        } else {
          updatedTodos.push(todo)
        }
        return todo
      })
      return { todos: updatedTodos }
    })
  }

  handleClear = () => {
    this.myController.obliterateAll(this.context.user._id)
    this.setState({ todos: [] })
  }

  handleInput = (e) => {
    this.setState({ inputfield: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.inputfield === '') {
      alert('Please enter a task!')
    } else {
      this.myController.postTodo(this.state.inputfield, this.context.user._id)
      this.myController.updateAndSort(this.context.user._id).then(result => {
        this.setState({ inputfield: '', todos: result })
        this.getTodoList()
      })
    }
  }

  handleLogout = () => {
    axios.get('/auth/logout').then((res) => {
      if (res.data) {
        this.context.setContext({ username: 'No User' }, '')
        this.setState({ loggingOut: true })
      }
    })
  }

  render () {
    const todoItems = this.state.todos.map(item =>
      <TodoItem
        key={item._id}
        item={item}
        handleChange={this.onCheckboxChange}
        handleClick={this.onDeleteTask}
      />)

    if (this.state.loggingOut) {
      return (
        <Redirect to='/login' />
      )
    }
    return (
      <div className={listContainer.listContainer}>
        <div className={listCol.listCol1}>
          <InputField
            handleSubmit={this.handleSubmit}
            handleInput={this.handleInput}
            data={this.state.inputfield}
          />
        </div>

        <div className={listCol.listCol2}>
          <img src={divider} width='15px' height='550px' />
        </div>

        <div className={listCol.listCol3}>
          <div className={todolistContainer.todolistContainer}>
            <ul>
              {todoItems}
            </ul>
          </div>
          <div className={navContainer.navContainer}>
            <Link to='./'>
              <button className={home.homeButton} />
            </Link>
            <button className={logout.logoutButton} onClick={this.handleLogout} />
          </div>
        </div>

        <div className={listCol.listCol4}>
          <img src={divider} width='15px' height='550px' />
        </div>

        <div className={listCol.listCol5}>
          <ViewAllButton handleShowAll={this.showAll} />
          <ViewActiveButton handleShowActive={this.showActive} />
          <ViewCompletedButton handleShowComplete={this.showComplete} />
          <ClearAllButton handleClearAll={this.handleClear} />
        </div>
      </div>
    )
  }
}

export default List
