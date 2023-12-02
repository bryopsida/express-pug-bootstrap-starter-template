const { describe, it, expect } = require('@jest/globals')
const {
  verifyPassword,
  hashPassword,
  authenticate,
  createSession,
  logout,
  deleteSession
} = require('./authentication')
const { getMockReq, getMockRes } = require('@jest-mock/express')

describe('services/authentication.js', () => {
  describe('hashPassword()', () => {
    it('should hash a password that can be verified', async () => {
      const hash = await hashPassword('test')
      const result = await verifyPassword('test', hash)
      expect(result).toBeTruthy()
    })
  })
  describe('verifyPassword()', () => {
    it('should verify a hashed password', async () => {
      const hash = await hashPassword('test')
      const result = await verifyPassword('test', hash)
      expect(result).toBeTruthy()
    })
  })
  describe('authenticate()', () => {
    it('should authenticate valid credentials', async () => {
      expect(await authenticate('test', 'admin')).toBeTruthy()
    })
    it('should not authenticate invalid credentials', async () => {
      let thrownErr = null
      try {
        await authenticate('admin', 'admin')
      } catch (err) {
        thrownErr = err
      }
      expect(thrownErr).not.toBeNull()
    })
  })
  describe('createSession()', () => {
    it('should create a user session', async () => {
      const mockReq = getMockReq()
      const mockRes = getMockRes()
      mockRes.getHeader = jest.fn()
      mockRes.setHeader = jest.fn()
      await createSession(mockReq, mockRes, 'test')
      expect(mockRes.setHeader.mock.calls.length).toBe(1)
      expect(
        mockRes.setHeader.mock.calls.some((c) => {
          return c[0] === 'set-cookie'
        })
      ).toBeTruthy()
    })
  })
  describe('deleteSession()', () => {
    it('should remove the cookie', async () => {
      const mockReq = getMockReq()
      const mockRes = getMockRes()
      mockRes.getHeader = jest.fn()
      mockRes.setHeader = jest.fn()
      await deleteSession(mockReq, mockRes, 'test')
      expect(mockRes.setHeader.mock.calls.length).toBe(1)
      expect(
        mockRes.setHeader.mock.calls.some((c) => {
          return c[0] === 'set-cookie' && c[1][0].indexOf('Max-Age=0') !== -1
        })
      ).toBeTruthy()
    })
  })
  describe('logout()', () => {
    it('should remove the cookie', async () => {
      const mockReq = getMockReq()
      const mockRes = getMockRes()
      mockRes.getHeader = jest.fn()
      mockRes.setHeader = jest.fn()
      await logout(mockReq, mockRes)
      expect(mockRes.setHeader.mock.calls.length).toBe(1)
      expect(
        mockRes.setHeader.mock.calls.some((c) => {
          return c[0] === 'set-cookie' && c[1][0].indexOf('Max-Age=0') !== -1
        })
      ).toBeTruthy()
    })
  })
})
