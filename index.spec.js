const { describe, expect, it } = require('@jest/globals')
const { bootstrap } = require('./index')

describe('index.js', () => {
  it('should start app', () => {
    const app = {
      use: jest.fn(() => {}),
      get: jest.fn(() => {}),
      post: jest.fn(() => {}),
      listen: jest.fn(() => {}),
      set: jest.fn(() => {})
    }
    bootstrap(app)
    expect(app.listen.mock.calls.length).toBe(1)
  })
})
