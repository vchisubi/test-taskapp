const googlePassport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const GoogleUser = require('../models/user-model')

// const keys = require('../config/keys')
const dotenv = require('dotenv')
dotenv.config()


let cbURL = '/auth/google/redirect'

if(process.env.NODE_ENV === 'production') {
  console.log(process.env.NODE_ENV)
  cbURL = 'http://test-taskapp.herokuapp.com:' + process.env.PORT + cbURL
  console.log(cbURL)
}

googlePassport.use(
  new GoogleStrategy({
  // clientID: keys.google.clientID,
  // clientSecret: keys.google.clientSecret,
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: cbURL
  // callbackURL: '/auth/google/redirect'
  //callbackURL: 'http://test-taskapp.herokuapp.com/auth/google/redirect'
  }, (accessToken, refreshToken, profile, done) => {
    GoogleUser.findOne({ googleId: profile.id }).then((currentUser) => {
      if(currentUser){
        done(null, currentUser)
      } else {
          new GoogleUser({
            username: profile.displayName,
            googleId: profile.id,
            thumbnail: profile._json.picture
          }).save().then((newUser) => {b
            console.log('New user created: ' + newUser)
            done(null, newUser)
          })
      }
    })
  }
))