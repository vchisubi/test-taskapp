import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import { AuthUserContext } from '../context/authUser'
import { basic, home, register, google } from '../css/buttons'
import { loginBorder } from '../css/visuals'
import { loginContainer, inputContainer } from '../css/containers'
import { loginCol } from '../css/columns'

class Login extends Component {
  static contextType = AuthUserContext

  constructor (props) {
    super(props)
    this.state = {
      loginUsername: '',
      loginPassword: '',
      redirect: false
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = async (e) => {
    e.preventDefault()

    const { loginUsername, loginPassword } = this.state
    var data = { username: loginUsername, password: loginPassword }

    axios.post('/auth/login', data).then(async (result) => {
      if (result.data.success === true) {
        const { setContext } = this.context
        await setContext(result.data.user, 'local')
        this.setState({ redirect: true })
      } else {
        console.log('An error occured logging in as a local user: ' + result.data)
        this.setState({ redirect: false })
      }
    })
  }

  render () {
    const { loginUsername, loginPassword, redirect } = this.state

    let googleButton

    // if(process.env.NODE_ENV === 'production') {
    //   googleButton = <a className={google.googleButton} href='https://test-taskapp.herokuapp.com/auth/google' />
    // } else {
        googleButton = <a className={google.googleButton} href='/auth/google' />
    // }


    if (redirect) {
      return (
        <Redirect to='/list' />
      )
    } else {
      return (
        <div className={loginContainer.loginContainer}>
          <div className={loginBorder.border}>
            <div className={loginCol.loginCol1}>
              <Link to='./'>
                <button className={home.homeButton} />
              </Link>
              <Link to='./register'>
                <button className={register.registerButton} />
              </Link>
            </div>
            <div className={loginCol.loginCol2}>
              <form onSubmit={this.onSubmit}>
                <h1>Sign In</h1>
                <div className={inputContainer.inputContainer}>
                  <input
                    type='text'
                    name='loginUsername'
                    placeholder='Username'
                    value={loginUsername}
                    onChange={this.onChange}
                    autoFocus
                    required
                  />
                </div>
                <div className={inputContainer.inputContainer}>
                  <input
                    type='password'
                    name='loginPassword'
                    placeholder='Password'
                    value={loginPassword}
                    onChange={this.onChange}
                    required
                  />
                </div>
                <button className={basic.basicButton} type='submit'>Login</button>
              </form>
              <br />
              {googleButton}
              {/* <a className={google.googleButton} href='http://localhost:4002/auth/google' /> */}
              {/* <a className={google.googleButton} href='http://vchi-todoapp-server.herokuapp.com/auth/google' /> */}
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Login
