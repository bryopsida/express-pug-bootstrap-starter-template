const { describe, it, expect } = require('@jest/globals')

const { getUser } = require('./users')

describe('services/users.js', () => {
  describe('getUser()', () => {
    it('should return a valid user', () => {
      expect(getUser('test')).toBeDefined()
    })
  })
})
