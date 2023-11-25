const { describe, it, expect } = require('@jest/globals')
const { authorizationService } = require('./authorization')

describe('services/authorization.js', () => {
  describe('AuthorizationService', () => {
    describe('isAllowed()', () => {
      it('should allow a unauthenticated user to login', () => {
        expect(
          authorizationService.isAllowed({
            user: null,
            originalUrl: '/login'
          })
        ).toBeTruthy()
      })
      it('should allow authenticated users to home', () => {
        expect(
          authorizationService.isAllowed({
            user: {
              username: 'test'
            },
            originalUrl: '/'
          })
        ).toBeTruthy()
      })
      it('should allow authenticated users to about', () => {
        expect(
          authorizationService.isAllowed({
            user: {
              username: 'test'
            },
            originalUrl: '/about'
          })
        ).toBeTruthy()
      })
      it('should not allow unauthenticated users to home', () => {
        expect(
          authorizationService.isAllowed({
            user: {},
            originalUrl: '/'
          })
        ).toBeFalsy()
      })
      it('should not allow unauthenticated users to about', () => {
        expect(
          authorizationService.isAllowed({
            user: {},
            originalUrl: '/about'
          })
        ).toBeFalsy()
      })
    })
  })
})
