const { describe, it, expect } = require('@jest/globals')

const { getUser } = require('./users')
const { runMigrations } = require('../db/migrations')

describe('services/users.js', () => {
  beforeAll(async () => {
    await runMigrations()
  })
  describe('getUser()', () => {
    it('should return a valid user', () => {
      expect(getUser('test')).toBeDefined()
    })
  })
})
