const {
  authenticate,
  createSession,
  logout
} = require('../services/authentication')
const { getLogger } = require('../services/logger')
const { rateLimit } = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => res.render('429')
})

const logger = getLogger('routes/pages.js')

function buildCardRows () {
  const rows = []
  for (let i = 0; i < 5; i++) {
    const row = []
    for (let j = 0; j < 5; j++) {
      row.push({
        title: `Row ${i} Card ${j}`,
        description: `Row ${i} Description ${j}`
      })
    }
    rows.push(row)
  }
  return rows
}

function buildAboutItems () {
  const items = []
  for (let i = 0; i < 5; i++) {
    const item = {
      title: `Item ${i}`,
      content: `Item ${i} content`,
      id: i
    }
    items.push(item)
  }
  return items
}

module.exports = {
  registerPageRoutes: function registerPageRoutes (app) {
    app.get('/logout', async (req, res) => {
      await logout(req, res)
      res.redirect('/login')
    })
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
          await createSession(req, res, req.body.username)
          res.redirect('/')
        }
      } catch (err) {
        logger.error('Error while logging in', err)
        res.render('login', { title: 'Login Failed', loginError: true })
      }
    })
    app.get('/', (req, res) => {
      res.render('index', {
        user: req.user,
        title: 'Home',
        cardRows: buildCardRows()
      })
    })
    app.get('/about', (req, res) => {
      res.render('about', {
        user: req.user,
        title: 'About',
        items: buildAboutItems()
      })
    })
  }
}
