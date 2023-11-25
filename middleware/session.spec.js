const { describe, it, expect } = require('@jest/globals')
const { getMockReq, getMockRes } = require('@jest-mock/express')

const sessionMiddleware = require('./session')

describe('middleware/session.js', () => {
  it('should add req.user', (done) => {
    const mockRes = getMockRes()
    const mockReq = getMockReq()
    const next = () => {
      expect(mockReq.user).toBeDefined()
      expect(mockReq.user.username).toEqual('test')
      done()
    }

    const middleware = sessionMiddleware({
      getSession: () => {
        return Promise.resolve({
          username: 'test'
        })
      }
    })
    middleware(mockReq, mockRes, next)
  })
})
