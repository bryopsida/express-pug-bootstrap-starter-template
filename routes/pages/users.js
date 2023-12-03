const { getUsers } = require('../../services/users')

module.exports = {
  registerUsersPage: function registerUsersPage (app) {
    app.get('/users', async (req, res) => {
      const offset = req.query.offset < 0 ? 0 : req.query.offset
      const count = req.query.count > 100 ? 0 : req.query.count
      const users = await getUsers(offset, count)
      res.render('users', {
        user: req.user,
        title: 'Users',
        items: users
      })
    })
  }
}
