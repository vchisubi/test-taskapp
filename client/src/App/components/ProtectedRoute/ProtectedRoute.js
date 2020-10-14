import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthUserContext } from '../../context/authUser'

class ProtectedRoute extends Component {
  static contextType = AuthUserContext

  render () {
    const { component: Component, ...rest } = this.props

    return (
      <Route
        {...rest}
        render={props => {
          return this.context.loggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login'
              }}
            />
          )
        }}
      />
    )
  }
}

export default ProtectedRoute
