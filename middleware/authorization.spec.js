const { describe, it, expect } = require('@jest/globals')
const { getMockReq, getMockRes } = require('@jest-mock/express')

const authorizationMiddleware = require('./authorization')

describe('middleware/authorization.js', () => {
  it('should redirect to login when user is not allowed', () => {
    const mockReq = getMockReq()
    const mockRes = getMockRes()
    mockRes.redirect = jest.fn()
    const mockNext = jest.fn()
    const middleware = authorizationMiddleware({
      authorizationService: {
        isAllowed: () => {
          return false
        }
      }
    })
    middleware(mockReq, mockRes, mockNext)
    expect(mockRes.redirect.mock.calls.length).toBe(1)
  })
  it('should proceed with filter chain when user is allowed', () => {
    const mockReq = getMockReq()
    const mockRes = getMockRes()
    const mockNext = jest.fn()
    const middleware = authorizationMiddleware({
      authorizationService: {
        isAllowed: () => {
          return true
        }
      }
    })
    middleware(mockReq, mockRes, mockNext)
    expect(mockNext.mock.calls.length).toBe(1)
  })
})
