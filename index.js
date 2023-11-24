const Express = require('express')
const expressWinston = require('express-winston')
const helmet = require('helmet')
const config = require('config')
const bodyParser = require('body-parser')

const { getLogger } = require('./services/logger')
const { resolve, join } = require('node:path')
const { registerRoutes } = require('./routes')
const sessionMiddleware = require('./middleware/session')

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
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  app.use(bodyParser.json())

  if (process.env.NODE_ENV === 'production') {
    app.use(helmet())
  }

  app.use(sessionMiddleware())

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
