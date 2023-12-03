const { getUser, addUser } = require('../../services/users')
const { passwordMeetsRequirements } = require('../../services/passwordPolicy')
const { hashPassword } = require('../../services/authentication')

module.exports = {
  registerAddUserPage: function registerAddUserPage (app) {
    app.post('/add-user', async (req, res) => {
      let passwordError = false
      let confirmPasswordError = false
      let usernameError = false
      const firstNameError = false
      const lastNameError = false
      const emailError = false

      let passwordErrorMessage = ''
      let confirmPasswordErrorMessage = ''
      let usernameErrorMessage = ''
      const firstNameErrorMessage = ''
      const lastNameErrorMessage = ''
      const emailErrorMessage = ''

      const passwordValue = req.body.password
      const confirmPasswordValue = req.body.confirmPassword
      const usernameValue = req.body.username
      const firstNameValue = req.body.firstName
      const lastNameValue = req.body.lastName
      const emailValue = req.body.email
      const roleValue = req.body.role

      const validationResult = passwordMeetsRequirements(passwordValue)
      if (validationResult.error) {
        passwordError = true
        passwordErrorMessage = validationResult.error.message
      }

      const existingUser = await getUser(usernameValue)
      if (existingUser != null) {
        usernameError = true
        usernameErrorMessage = 'This username is already in use!'
      }
      if (confirmPasswordValue !== passwordValue) {
        confirmPasswordError = true
        confirmPasswordErrorMessage =
          'password and password confirmation must match!'
      }
      if (confirmPasswordError || passwordError || usernameError) {
        res.render('add-user', {
          user: req.user,
          title: 'Add User',
          passwordValue,
          passwordError,
          passwordErrorMessage,
          confirmPasswordError,
          confirmPasswordErrorMessage,
          confirmPasswordValue,
          usernameError,
          usernameErrorMessage,
          usernameValue,
          firstNameError,
          firstNameErrorMessage,
          firstNameValue,
          lastNameError,
          lastNameErrorMessage,
          lastNameValue,
          emailError,
          emailErrorMessage,
          emailValue
        })
      } else {
        const hash = await hashPassword(passwordValue)
        await addUser({
          username: usernameValue,
          firstName: firstNameValue,
          lastName: lastNameValue,
          email: emailValue,
          role: roleValue.toLowerCase(),
          password: hash
        })
        res.redirect('/users')
      }
    })

    app.get('/add-user', async (req, res) => {
      res.render('add-user', {
        user: req.user,
        title: 'Add User',
        usernameError: false,
        firstNameError: false,
        lastNameError: false,
        emailError: false,
        passwordError: false,
        confirmPasswordError: false
      })
    })
  }
}
