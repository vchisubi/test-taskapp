const apiRoute = require('./apis')

function init(server) {
  server.use('/', apiRoute)
}

module.exports = {
  init: init
};