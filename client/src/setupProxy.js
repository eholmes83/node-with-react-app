const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  app.use('/api', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }))
  app.use('/auth/google', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }))
}