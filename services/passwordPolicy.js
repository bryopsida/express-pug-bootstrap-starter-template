const passwordComplexity = require('joi-password-complexity')
const config = require('config')
const complexityOptions = config.get('passwordPolicy.complexityRequirements')

function passwordMeetsRequirements (password) {
  return passwordComplexity(complexityOptions).validate(password)
}

module.exports = {
  passwordMeetsRequirements
}
