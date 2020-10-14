const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:4002',
      changeOrigin: true
    })
  )
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'http://localhost:4002',
      changeOrigin: true
    })
  )
}

// module.exports = function (app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'http://vchi-todoapp-server.herokuapp.com',
//       changeOrigin: true
//     })
//   )
//   app.use(
//     '/auth',
//     createProxyMiddleware({
//       target: 'http://vchi-todoapp-server.herokuapp.com',
//       changeOrigin: true
//     })
//   )
// }
