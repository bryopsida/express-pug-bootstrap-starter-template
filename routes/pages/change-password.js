const { authenticate, hashPassword } = require('../../services/authentication')
const { getUser, updatePassword } = require('../../services/users')

const passwordComplexity = require('joi-password-complexity')

const complexityOptions = {
  min: 10,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2
}

module.exports = {
  registerChangePasswordPage: function registerChangePasswordPage (app) {
    app.post('/change-password', async (req, res) => {
      const username = req.user.username
      const user = await getUser(username)
      // check error conditions first
      let currentPasswordError = false
      let currentPasswordErrorMessage = ''
      let confirmPasswordError = false
      let confirmPasswordErrorMessage = ''
      let newPasswordError = false
      let newPasswordErrorMessage = ''
      const currentPasswordValue = req.body.currentPassword
      const newPasswordValue = req.body.newPassword
      const confirmPasswordValue = req.body.confirmPassword
      const authenticated = await authenticate(username, currentPasswordValue)
      if (!authenticated) {
        currentPasswordError = true
        currentPasswordErrorMessage =
          'You must provide a valid current password'
      }
      const validationResult =
        passwordComplexity(complexityOptions).validate(newPasswordValue)
      if (validationResult.error) {
        newPasswordError = true
        newPasswordErrorMessage = validationResult.error.message
      }

      if (confirmPasswordValue !== newPasswordValue) {
        confirmPasswordError = true
        confirmPasswordErrorMessage =
          'New password and password confirmation must match!'
      }
      if (currentPasswordError || newPasswordError || confirmPasswordError) {
        res.render('change-password', {
          user: req.user,
          title: 'Change Password',
          item: user,
          currentPasswordError,
          currentPasswordErrorMessage,
          confirmPasswordError,
          confirmPasswordErrorMessage,
          newPasswordError,
          newPasswordErrorMessage,
          currentPasswordValue,
          confirmPasswordValue,
          newPasswordValue
        })
      } else {
        const hash = await hashPassword(newPasswordValue)
        await updatePassword(username, hash)
        res.redirect('/')
      }
    })

    app.get('/change-password', async (req, res) => {
      const username = req.user.username
      const user = await getUser(username)
      if (user == null) {
        res.render('404')
      } else {
        res.render('change-password', {
          user: req.user,
          title: 'Change Password',
          item: user,
          currentPasswordValue: null,
          newPasswordValue: null,
          confirmPasswordValue: null,
          currentPasswordError: false,
          confirmPasswordError: false,
          newPasswordError: false
        })
      }
    })
  }
}
