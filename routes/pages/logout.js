const { logout } = require('../../services/authentication')
module.exports = {
  registerLogoutPage: function registerLogoutPage (app) {
    app.get('/logout', async (req, res) => {
      await logout(req, res)
      res.redirect('/login')
    })
  }
}
