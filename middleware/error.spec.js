const { describe, it, expect } = require('@jest/globals')
const { getMockReq, getMockRes } = require('@jest-mock/express')

const errorMiddleWare = require('./error')

describe('middleware/error.js', () => {
  it('should render 404', () => {
    const mockRes = getMockRes()
    mockRes.status = jest.fn()
    mockRes.render = jest.fn()
    const mockReq = getMockReq()

    const middleware = errorMiddleWare()
    middleware(
      {
        status: 404
      },
      mockReq,
      mockRes
    )
    expect(mockRes.render.mock.calls.some((call) => call === '404'))
  })
  it('should render 403', () => {
    const mockRes = getMockRes()
    mockRes.status = jest.fn()
    mockRes.render = jest.fn()
    const mockReq = getMockReq()

    const middleware = errorMiddleWare()
    middleware(
      {
        status: 403
      },
      mockReq,
      mockRes
    )
    expect(mockRes.render.mock.calls.some((call) => call === '403'))
  })
  it('should render 401', () => {
    const mockRes = getMockRes()
    mockRes.status = jest.fn()
    mockRes.render = jest.fn()
    const mockReq = getMockReq()

    const middleware = errorMiddleWare()
    middleware(
      {
        status: 401
      },
      mockReq,
      mockRes
    )
    expect(mockRes.render.mock.calls.some((call) => call === '401'))
  })
  it('should render 429', () => {
    const mockRes = getMockRes()
    mockRes.status = jest.fn()
    mockRes.render = jest.fn()
    const mockReq = getMockReq()

    const middleware = errorMiddleWare()
    middleware(
      {
        status: 429
      },
      mockReq,
      mockRes
    )
    expect(mockRes.render.mock.calls.some((call) => call === '429'))
  })
  it('should render 500', () => {
    const mockRes = getMockRes()
    mockRes.status = jest.fn()
    mockRes.render = jest.fn()
    const mockReq = getMockReq()

    const middleware = errorMiddleWare()
    middleware(
      {
        status: 500
      },
      mockReq,
      mockRes
    )
    expect(mockRes.render.mock.calls.some((call) => call === '500'))
  })
})
