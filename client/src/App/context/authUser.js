import React, { Component, createContext } from 'react'

export const AuthUserContext = createContext()

class AuthUserContextProvider extends Component {
  state = {
    user: {},
    loggedIn: false,
    profileType: 'unknown'
  }

  setContext = (userObject, profType) => {
    this.setState({ user: userObject, loggedIn: !this.state.loggedIn, profileType: profType })
  }

  render () {
    return (
      <AuthUserContext.Provider value={{ ...this.state, setContext: this.setContext }}>
        {this.props.children}
      </AuthUserContext.Provider>
    )
  }
}

export default AuthUserContextProvider
