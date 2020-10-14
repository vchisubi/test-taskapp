const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const keys = require('./config/keys')
const path = require('path')
  
  // in package.json, in scripts
  //"heroku-postbuild": "cd client && npm install && npm run build"

module.exports = function () {

  let server = express(),
    create,
    start;

  create = function() {
    // // Serve static files from the React frontend app
    const staticFiles = express.static(path.join(__dirname, '../../../client/build'))
    server.use(staticFiles)

    // // Anything that doesn't match the above, send back index.html
    server.get('*', (req, res) => {
      // res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
      res.sendFile(path.resolve(__dirname + '../../../client/build/index.html'))
    })

    // For Heroku
    server.enable('trust proxy')

    server.use(cookieParser())
    server.use(cors())
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({extended: false}))
    server.use(cookieSession({
      maxAge: 24 * 60 * 60 * 1000,
      keys: [keys.session.cookieKey],
      // For Heroku
      proxy: true,
      secret: keys.session.cookieKey
    }))
    // server.use(session({
    //   secret: keys.session.cookieKey,
    //   resave: true,
    //   saveUninitialized: true,
    //   proxy: true,
    //   cookie: {
    //     secure: false,
    //     maxAge: 3600000,
    //     keys: [keys.session.cookieKey]
    //   }
    // }))

    server.use(passport.initialize())
    server.use(passport.session())

    let routes = require('./routes')
    routes.init(server)
  }

  start = function() {
    const port = process.env.PORT || 4002

    mongoose.connect(keys.mongodb.dbURI, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false}, (err) => {
      if(err){
        console.log('Unable to connect to the database:')
        console.log(err)
        process.exit(1)
      }
      else{
        server.listen(port, () => {
          console.log(`Connection successful: Listening on port ${port}`)
        })
      }
    })
  }

  return {
    create: create,
    start: start
  }
}
