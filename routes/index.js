const { registerApiRoutes } = require('./api')
const { registerPageRoutes } = require('./pages')

module.exports = {
  registerRoutes: function registerRoutes (app) {
    registerPageRoutes(app)
    registerApiRoutes(app)
  }
}
