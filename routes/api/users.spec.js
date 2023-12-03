const request = require('supertest')
const express = require('express')
const { describe, it, beforeEach } = require('@jest/globals')
const { registerUserApiRoutes } = require('./users')
const { runMigrations } = require('../../db/migrations')

describe('routes/api/users.js', () => {
  let app = null
  let agent = null
  beforeEach(async () => {
    await runMigrations()
    app = express()
    registerUserApiRoutes(app)
    agent = request.agent(app)
  })
  describe('/users', () => {
    describe('GET', () => {
      it('should provide a list of users', (done) => {
        agent.get('/users?offset=0&count=10').expect(200, done)
      })
      it('should reject invalid offset', (done) => {
        agent.get('/users?offset=-1&count=10').expect(400, done)
      })
      it('should reject invalid count', (done) => {
        agent.get('/users?offset=0&count=-10').expect(400, done)
      })
      it('should reject count larger than max', (done) => {
        agent.get('/users?offset=0&count=101').expect(400, done)
      })
    })
  })
})
