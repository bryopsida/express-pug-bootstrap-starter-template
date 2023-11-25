const { describe, expect, it } = require('@jest/globals')
const { registerPageRoutes } = require('./pages')

describe('routes/pages.js', () => {
  it('should register page routes', () => {
    const app = {
      use: jest.fn(() => {}),
      get: jest.fn(() => {}),
      post: jest.fn(() => {})
    }
    registerPageRoutes(app)
    expect(
      app.get.mock.calls.some((call) => {
        return call[0] === '/'
      })
    ).toBeTruthy()
    expect(
      app.get.mock.calls.some((call) => {
        return call[0] === '/about'
      })
    ).toBeTruthy()
    expect(
      app.get.mock.calls.some((call) => {
        return call[0] === '/login'
      })
    ).toBeTruthy()
    expect(
      app.post.mock.calls.some((call) => {
        return call[0] === '/login'
      })
    ).toBeTruthy()
  })
})
