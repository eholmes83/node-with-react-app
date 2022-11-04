if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod')
  console.log('using prod...')
} else {
  module.exports = require('./dev')
  console.log('using dev...')
}