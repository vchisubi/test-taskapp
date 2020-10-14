const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  google: {
    clientID: '440296499156-0tpkn6go5phop6iflb2uo46pv4r60qr8.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  },
  mongodb: {
    dbURI: process.env.MONGODB_URI
  },
  session: {
    cookieKey: process.env.COOKIE_KEY_SECRET
  },
  token: {
    tokenKey: process.env.TOKEN_KEY_SECRET
  }
}
