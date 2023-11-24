const {
  authenticate,
  createSession,
  logout
} = require('../services/authentication')
const { getLogger } = require('../services/logger')

const logger = getLogger('routes/pages.js')

module.exports = {
  registerPageRoutes: function registerPageRoutes (app) {
    app.get('/', (req, res) => {
      res.render('index', { title: 'Home', message: 'Hello there!' })
    })
    app.get('/about', (req, res) => {
      res.render('about', { title: 'About', message: 'About' })
    })
    app.get('/login', (req, res) => {
      res.render('login', {
        title: 'Login',
        message: 'Login',
        loginError: false
      })
    })
    app.post('/login', async (req, res) => {
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
          await createSession(req, res, req.body.username)
          res.redirect('/')
        }
      } catch (err) {
        logger.error('Error while logging in', err)
        res.render('login', { title: 'Login Failed', loginError: true })
      }
    })
  }
}
