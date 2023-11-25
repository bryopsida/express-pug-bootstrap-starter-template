const { getLogger } = require('../services/logger')
const { authorizationService } = require('../services/authorization')

const logger = getLogger('middleware/authorization.js')

module.exports = function sessionMiddleware () {
  return (req, res, next) => {
    if (!authorizationService.isAllowed(req)) {
      logger.info('User is not authenticated, redirecting to login')
      return res.redirect('/login')
    }
    next()
  }
}
