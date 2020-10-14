const jwt = require('jsonwebtoken')
const keys = require('../config/keys')

module.exports = {
  // Creates the JWT for a logged in user
  generateAccessToken: function(user) {
    const accessToken = jwt.sign(user.toJSON(), keys.token.tokenKey, { expiresIn: '24h' })
    return accessToken
  },
  // Middleware function used to authorize API calls
  authenticateToken: function(req, res, next) {
    let jwtCookie = req.cookies.jwt
  
    if (jwtCookie) {
      jwt.verify(jwtCookie, keys.token.tokenKey, (err, user) => {
        if (err) { return res.sendStatus(403) }
        req.user = user
        next()
      })
    } else { return res.sendStatus(401) }
  }
}