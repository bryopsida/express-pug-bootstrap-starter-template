const { describe, it, expect } = require('@jest/globals')
const { authorizationService } = require('./authorization')

describe('services/authorization.js', () => {
  describe('AuthorizationService', () => {
    describe('isAllowed()', () => {
      it('should allow a unauthenticated user to login', () => {
        expect(
          authorizationService.isAllowed({
            user: null,
            path: '/login',
            method: 'GET'
          })
        ).toBeTruthy()
      })
      it('should allow authenticated users to home', () => {
        expect(
          authorizationService.isAllowed({
            user: {
              username: 'test',
              role: 'user'
            },
            method: 'GET',
            path: '/'
          })
        ).toBeTruthy()
      })
      it('should allow authenticated users to about', () => {
        expect(
          authorizationService.isAllowed({
            user: {
              username: 'test',
              role: 'user'
            },
            path: '/about',
            method: 'GET'
          })
        ).toBeTruthy()
      })
      it('should not allow unauthenticated users to home', () => {
        expect(
          authorizationService.isAllowed({
            user: {},
            path: '/',
            method: 'GET'
          })
        ).toBeFalsy()
      })
      it('should not allow unauthenticated users to about', () => {
        expect(
          authorizationService.isAllowed({
            user: {},
            path: '/about',
            method: 'GET'
          })
        ).toBeFalsy()
      })
    })
  })
})
