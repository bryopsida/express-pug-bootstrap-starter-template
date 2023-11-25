const { describe, it, expect } = require('@jest/globals')

jest.mock('./users.json', () => {
  return {
    test: {
      test: 'test'
    }
  }
})

const { getUser } = require('./users')

describe('services/users.js', () => {
  describe('getUser()', () => {
    it('should return a valid user', () => {
      expect(getUser('test')).toBeDefined()
    })
  })
})
