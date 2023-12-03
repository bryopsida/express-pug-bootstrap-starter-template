const { rateLimit } = require('express-rate-limit')
const { authenticate, hashPassword } = require('../../services/authentication')
const { getAuditLogger } = require('../../services/logger')
const { getUser, updatePassword } = require('../../services/users')
const { passwordMeetsRequirements } = require('../../services/passwordPolicy')

const logger = getAuditLogger('change-password')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => res.render('429')
})

module.exports = {
  registerChangePasswordPage: function registerChangePasswordPage (app) {
    app.post('/change-password', limiter, async (req, res) => {
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
      const validationResult = passwordMeetsRequirements(newPasswordValue)
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
        logger.info(`User ${req.user.username} changed their password`)
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
