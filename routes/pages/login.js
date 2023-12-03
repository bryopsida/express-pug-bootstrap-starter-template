const {
  authenticate,
  createSession,
  logout
} = require('../../services/authentication')
const { getLogger } = require('../../services/logger')
const { rateLimit } = require('express-rate-limit')
const { getUser } = require('../../services/users')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => res.render('429')
})

const logger = getLogger('routes/pages.js')

module.exports = {
  registerLoginPage: function registerLoginPage (app) {
    app.get('/login', limiter, (req, res) => {
      res.render('login', {
        title: 'Login',
        message: 'Login',
        loginError: false
      })
    })
    app.post('/login', limiter, async (req, res) => {
      // a post means credentials are passed, try to authenticate
      // if all goes well set their session and redirect either to /
      // or extract last location from their standard cookie
      // if it fails render the login page with an error message
      try {
        const result = await authenticate(req.body.username, req.body.password)
        if (!result) {
          await logout(req, res)
          res.render('login', { title: 'Login Failed', loginError: true })
        } else {
          // user authenticated lets get the session object and persist it to their cookie
          const user = await getUser(req.body.username)
          await createSession(req, res, user)
          res.redirect('/')
        }
      } catch (err) {
        logger.error('Error while logging in', err)
        res.render('login', { title: 'Login Failed', loginError: true })
      }
    })
  }
}
