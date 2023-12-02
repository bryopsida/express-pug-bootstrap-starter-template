const Express = require('express')
const expressWinston = require('express-winston')
const helmet = require('helmet')
const config = require('config')
const bodyParser = require('body-parser')

const { getLogger } = require('./services/logger')
const { resolve, join } = require('node:path')
const { registerRoutes } = require('./routes')
const { authorizationService } = require('./services/authorization')
const { getSession } = require('./services/authentication')
const { runMigrations } = require('./db/migrations')
const sessionMiddleware = require('./middleware/session')
const authorizationMiddleware = require('./middleware/authorization')
const errorHandler = require('./middleware/error')

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
  app.use(
    '/bootstrap-icons',
    Express.static(resolve(join('node_modules', 'bootstrap-icons', 'font')))
  )
  app.set('view engine', 'pug')
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  app.use(bodyParser.json())

  if (process.env.NODE_ENV === 'production') {
    app.use(helmet())
  }

  app.use(
    sessionMiddleware({
      getSession
    })
  )
  app.use(
    authorizationMiddleware({
      authorizationService
    })
  )

  registerRoutes(app)
  app.use(errorHandler())
  const port = config.get('server.port')
  app.listen(port, () => {
    logger.info(`App listening on port ${port}`)
  })
}

if (require.main === module) {
  runMigrations()
    .then(() => {
      const app = new Express()
      bootstrap(app)
    })
    .catch((err) => {
      logger.error('Error while starting application', err)
      process.exit(1)
    })
}

module.exports = {
  bootstrap
}
