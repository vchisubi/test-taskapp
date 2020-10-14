import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Clock from 'react-live-clock'
import DateStamp from '../components/DateStamp'
import axios from 'axios'
import { AuthUserContext } from '../context/authUser'
import { homeBorder } from '../css/visuals'
import { homeContainer } from '../css/containers'
import { list, login, logout } from '../css/buttons'
import { homeCol } from '../css/columns'
import divider from '../assets/images/divider.png'

export default class Home extends Component {
  static contextType = AuthUserContext

  constructor () {
    super()
    this.state = {
      loggedOut: false
    }
  }

  componentDidMount () {
    if (this.context.loggedIn) {
      setInterval(() => {
        axios.get('/auth/tokenCheck').then((res) => {
          if (res.data === false) {
            this.handleLogout()
          }
        })
      }, 900000)
    }
  }

  handleLogout = () => {
    axios.get('/auth/logout').then((res) => {
      if (res.data) {
        this.context.setContext({ username: 'No User' }, '')
        this.setState({ loggedOut: true })
      }
    })
  }

  render () {
    let viewButton

    if (!this.context.loggedIn) {
      viewButton =
        <Link to='./login'>
          <button className={login.loginButton} />
        </Link>
    } else {
      if (this.context.profileType === 'local') {
        viewButton =
          <div>
            <Link to='./list'>
              <button className={list.listButton} />
            </Link>
            <button className={logout.logoutButton} onClick={this.handleLogout} />
          </div>
      } else {
        viewButton =
          <div>
            <Link to='./list'>
              <button className={list.listButton} />
            </Link>
            <button className={logout.logoutButton} onClick={this.handleLogout} />
          </div>
      }
    }

    if (this.state.loggedOut) {
      return (
        <Redirect to='/login' />
      )
    } else {
      return (
        <div>
          <div className={homeBorder.border} />
          <div className={homeContainer.homeContainer}>
            <div className={homeCol.homeCol1}>
              <Clock
                format='hh:mm:ss'
                timezone='US/Pacific'
                style={{ fontSize: '200px' }}
              />
            </div>
            <div className={homeCol.homeCol2}>
              <img src={divider} width='15px' height='550px' />
            </div>
            <div className={homeCol.homeCol3}>
              {viewButton}
            </div>
            <div className={homeCol.homeCol4}>
              <DateStamp />
            </div>
          </div>
        </div>
      )
    }
  }
}
