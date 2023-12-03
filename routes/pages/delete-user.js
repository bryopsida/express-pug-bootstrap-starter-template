const { deleteUser } = require('../../services/users')

module.exports = {
  registerDeleteUserPage: function registerDeleteUserPage (app) {
    app.post('/delete-user', async (req, res) => {
      const userToDelete = req.query.username
      if (userToDelete === req.user.name) {
        res.redirect('/')
      } else {
        await deleteUser(userToDelete)
        res.redirect('/users')
      }
    })
    app.get('/delete-user', async (req, res) => {
      const userToDelete = req.query.username
      if (userToDelete === req.user.name) {
        res.redirect('/')
      }
      res.render('delete-user', {
        user: req.user,
        title: 'Delete User',
        item: {
          username: userToDelete
        }
      })
    })
  }
}
