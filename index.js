const Express = require('express')
const expressWinston = require('express-winston')
const helmet = require('helmet')
const config = require('config')
const { getLogger } = require('./services/logger')
const { resolve, join } = require('node:path')
const { registerRoutes } = require('./routes')

const logger = getLogger('index.js')

function bootstrap (app) {
  logger.info('Starting app')

  app.use(
    expressWinston.logger({
      winstonInstance: logger
    })
  )

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
  const port = config.get('server.port')
  app.listen(port, () => {
    logger.info(`App listening on port ${port}`)
  })
}

if (require.main === module) {
  const app = new Express()
  bootstrap(app)
}

module.exports = {
  bootstrap
}
