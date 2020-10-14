import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import List from './pages/List'
import GoogleRedirect from './components/GoogleRedirect/'
import ProtectedRoute from './components/ProtectedRoute/'
import AuthUserContextProvider from './context/authUser'
import './css/visuals'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: false
    }
  }

  render () {
    return (
      <Switch>
        <AuthUserContextProvider>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/redirect' component={GoogleRedirect} />
          <ProtectedRoute path='/list' component={List} />
        </AuthUserContextProvider>
      </Switch>
    )
  }
}

export default App
