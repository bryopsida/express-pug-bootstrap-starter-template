const { defineAbility } = require('@casl/ability')

const unauthenticatedAbility = defineAbility((can) => {
  can('visit', '/login')
})

const authenticatedAbility = defineAbility((can) => {
  can('visit', '/login')
  can('visit', '/')
  can('visit', '/about')
})

class AuthorizationService {
  isAllowed (req) {
    const user = req.user
    const ability =
      user.username == null ? unauthenticatedAbility : authenticatedAbility
    const isAllowed = ability.can('visit', req.originalUrl)
    return isAllowed
  }
}

const authzService = new AuthorizationService()

module.exports = {
  authorizationService: authzService
}
