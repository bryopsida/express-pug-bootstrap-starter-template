const { getLogger } = require('../services/logger')

const logger = getLogger('middleware/error.js')

module.exports = function errorHandler () {
  return (error, req, res, next) => {
    logger.error('Error during request handling', req, error)
    if (res.headersSent) {
      return next(error)
    }
    if (error.status === 401) {
      res.status(401)
      res.render('401')
    } else if (error.status === 403) {
      res.status(403)
      res.render('403')
    } else if (error.status === 404) {
      res.status(404)
      res.render('404')
    } else if (error.status === 429) {
      res.status(429)
      res.render('429')
    } else {
      res.status(500)
      res.render('500')
    }
  }
}
