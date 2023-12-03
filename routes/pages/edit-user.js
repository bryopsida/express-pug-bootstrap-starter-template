const { getUser, saveUser } = require('../../services/users')

module.exports = {
  registerEditUserPage: function registerEditUserPage (app) {
    app.post('/edit-user', async (req, res) => {
      const username = req.query.username
      const savedUser = await getUser(username)
      const updatedUser = req.body
      savedUser.email = updatedUser.email
      savedUser.firstName = updatedUser.firstName
      savedUser.lastName = updatedUser.lastName
      await saveUser(savedUser)
      res.redirect('/edit-user?username=' + username)
    })

    app.get('/edit-user', async (req, res) => {
      const username = req.query.username
      const user = await getUser(username)
      if (user == null) {
        res.render('404')
      } else {
        res.render('edit-user', {
          user: req.user,
          title: 'Edit User',
          item: user
        })
      }
    })
  }
}
