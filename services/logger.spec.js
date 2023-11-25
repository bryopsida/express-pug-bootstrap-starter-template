const { describe, it, expect } = require('@jest/globals')
const { getLogger } = require('./logger')

describe('services/logger.js', () => {
  describe('getLogger()', () => {
    it('should provide a logger', () => {
      expect(getLogger()).toBeDefined()
    })
  })
})
