module.exports = {
  registerPageRoutes: function registerPageRoutes (app) {
    app.get('/', (req, res) => {
      res.render('index', { title: 'Home', message: 'Hello there!' })
    })
    app.get('/about', (req, res) => {
      res.render('about', { title: 'About', message: 'About' })
    })
    app.get('/login', (req, res) => {
      res.render('login', { title: 'Login', message: 'Login' })
    })
  }
}
