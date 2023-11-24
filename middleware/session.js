const { getSession } = require('../services/authentication')
const { getLogger } = require('../services/logger')

const logger = getLogger('middleware/session.js')

module.exports = function sessionMiddleware () {
  return (req, res, next) => {
    getSession(req, res)
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
