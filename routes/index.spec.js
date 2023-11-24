const { describe, expect, it } = require('@jest/globals')

const mockRegisterPageRoutes = jest.fn(() => {})

jest.mock('./pages', () => {
  return {
    registerPageRoutes: mockRegisterPageRoutes
  }
})

const { registerRoutes } = require('./index')

describe('routes/index.js', () => {
  it('should register page routes', () => {
    const app = {
      use: jest.fn(() => {}),
      get: jest.fn(() => {})
    }
    registerRoutes(app)
    expect(mockRegisterPageRoutes.mock.calls.length).toBe(1)
  })
})
