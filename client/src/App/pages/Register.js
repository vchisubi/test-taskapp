import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import { basic, home, login } from '../css/buttons'
import { registerContainer, inputContainer } from '../css/containers'
import { registerBorder, sekret } from '../css/visuals'
import { registerCol } from '../css/columns'

class Register extends Component {
  constructor () {
    super()
    this.state = {
      registerUsername: '',
      registerPassword: '',
      registerConfirmPassword: '',
      redirect: false
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { registerUsername, registerPassword, registerConfirmPassword } = this.state

    if (registerPassword !== registerConfirmPassword) {
      alert('Passwords do not match!')
      this.setState({ registerPassword: '', registerConfirmPassword: '' })
    } else {
      var data = { username: registerUsername, password: registerPassword }

      axios.post('/auth/register', data).then((result) => {
        if (result.data === true) {
          this.setState({ redirect: result.data })
        } else {
          console.log('An error occured creating new local user: ' + result.data)
          this.setState({ redirect: false })
        }
      })
    }
  }

  render () {
    const { registerUsername, registerPassword, registerConfirmPassword, redirect } = this.state

    if (redirect) {
      return <Redirect to='/login' />
    } else {
      return (
        <div className={registerContainer.registerContainer}>
          <div className={registerBorder.border} />
          <div className={registerCol.registerCol1}>
            <Link to='./'>
              <button className={home.homeButton} />
            </Link>
            <Link to='./login'>
              <button className={login.loginButton} />
            </Link>
          </div>
          <div className={registerCol.registerCol2}>
            <form onSubmit={this.onSubmit}>
              <h1>Register Account</h1>
              <div className={inputContainer.inputContainer}>
                <input
                  type='text'
                  name='registerUsername'
                  placeholder='Username'
                  value={registerUsername}
                  onChange={this.onChange}
                  required
                  autoFocus
                />
              </div>
              <div className={inputContainer.inputContainer}>
                <input
                  type='password'
                  name='registerPassword'
                  placeholder='Password'
                  value={registerPassword}
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className={inputContainer.inputContainer}>
                <input
                  type='password'
                  name='registerConfirmPassword'
                  placeholder='Confirm Password'
                  value={registerConfirmPassword}
                  onChange={this.onChange}
                  required
                />
              </div>
              <button className={basic.basicButton} type='submit'>Register</button>
            </form>
          </div>
          <div className={sekret.sekret} />
        </div>
      )
    }
  }
}

export default Register