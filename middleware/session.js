const { getLogger } = require('../services/logger')

const logger = getLogger('middleware/session.js')

module.exports = function sessionMiddleware (options) {
  return (req, res, next) => {
    options
      .getSession(req, res)
      .then((session) => {
        req.user = session
        next()
      })
      .catch((err) => {
        logger.error('Error while populating session', err)
        res.send(500)
      })
  }
}
