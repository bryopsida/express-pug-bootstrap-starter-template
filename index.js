const Express = require('express')
const helmet = require('helmet')
const { resolve, join } = require('node:path')
const { registerRoutes } = require('./routes')

function bootstrap (app) {
  app.use(Express.static('public'))
  app.use(
    '/bootstrap',
    Express.static(resolve(join('node_modules', 'bootstrap', 'dist')))
  )
  app.set('view engine', 'pug')

  if (process.env.NODE_ENV === 'production') {
    app.use(helmet())
  }

  registerRoutes(app)

  app.listen(3000, () => {
    console.log('Example app listening on port 3000')
  })
}

if (require.main === module) {
  const app = new Express()
  bootstrap(app)
}

module.exports = {
  bootstrap
}
