import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { AuthUserContext } from '../../context/authUser'

class GoogleRedirect extends Component {
  static contextType = AuthUserContext

  state = { loading: true }

  async componentDidMount () {
    await axios.get('/auth/authCheck').then((res) => {
      const currentUser = res.data.user
      const { setContext } = this.context
      setContext(currentUser, 'Google+')
    })
    this.setState({ loading: false })
  }

  render () {
    if (!this.state.loading) {
      return (
        <Redirect to='/list' />
      )
    } else {
      return null
    }
  }
}

export default GoogleRedirect
