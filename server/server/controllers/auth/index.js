const router = require('express').Router()
const passport = require('passport')
const tokenUtil = require('../../utils/tokenUtil')

require('../../utils/googlePassport-setup')
require('../../utils/localPassport-setup')

const googleUser = require('../../models/user-model')
const localUser = require('../../models/local-user-model')

let userType

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  if(userType === 'local-login') {
    localUser.findById(id).then(user => {
      done(null, user)
    })
  } else {
    googleUser.findById(id).then(user => {
      done(null, user)
    })
  }
})

// Returns true if JWT in browser is still valid
router.get('/tokenCheck', (req,res) => {
  // prints localhost
  // console.log(req.hostname)
  if (!req.cookies.jwt) {
    res.send(false)
  } else { res.send(true) }
})

// Returns logged in user object and true as a flag
router.get('/authCheck', (req,res) => {
  if (req.isAuthenticated()) {
    const authData = {user: req.user, loggedIn: req.isAuthenticated()}
    res.send(authData)
  } else {
    res.send('No user logged in.')
  }
})

// router.get('/login', (req, res) => {
//   res.redirect('http://localhost:3000/login')
// })

router.get('/logout', (req, res) => {
  userType = ''
  req.logOut()
  res.clearCookie('jwt')
  res.send(true)
})

router.get('/google', passport.authenticate('google', {
  // scope: ['profile']
  scope: ['https://www.googleapis.com/auth/userinfo.profile']
}))

router.get('/google/redirect', passport.authenticate('google'), async (req, res) => {
  try {
    const jwtToken = await tokenUtil.generateAccessToken(req.user)
    // Creates a cookie that store the JSON web token, which lasts 1 hour
    res.cookie('jwt', jwtToken, { httpOnly: true, secure: false, maxAge: 3600000 })

    // Added for Heroku---------------------------------------------------------------------------------
    if((req.headers['x-forwarded-proto'] !== 'https') && (process.env.NODE_ENV === 'production')) {
      res.redirect('https://test-taskapp.heroku.com/redirect')
    } else {
        res.redirect('http://localhost:3000/redirect')
    }
    // Added for Heroku---------------------------------------------------------------------------------
    // res.redirect('http://localhost:3000/redirect')

  } catch (e) {
      console.log(e)
  }
})

router.post('/register', function(req, res, next) {
  passport.authenticate('register', function(err, user, info) {
    if (err) { 
      console.log(err)
      return res.send(err)
    }
    else {
      return res.send(true)
    }
  }) (req, res, next)
})

router.post('/login', function(req, res, next) {
  passport.authenticate('local-login', async function(err, user, info) {
    if (err) { 
      console.log(err)
      return res.send(err)
    }
    if (!user) {
      return res.send(false)
    } 
    req.logIn(user, async function(err) {
      userType = 'local-login'
      if (err) {
        return res.send(err)
      }

      try {
        const jwtToken = await tokenUtil.generateAccessToken(user)
        res.cookie('jwt', jwtToken, { httpOnly: true, secure: false, maxAge: 3600000 })
        let data = {user, success: true }
        res.send(data)
      } catch (e) {
          console.log(e)
      }
    })
  }) (req, res, next)
})

module.exports = router

