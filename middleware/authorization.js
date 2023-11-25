const { getLogger } = require('../services/logger')

const logger = getLogger('middleware/authorization.js')

module.exports = function authorizationMiddleware (options) {
  return (req, res, next) => {
    if (!options.authorizationService.isAllowed(req)) {
      logger.info('User is not authenticated, redirecting to login')
      return res.redirect('/login')
    }
    next()
  }
}
