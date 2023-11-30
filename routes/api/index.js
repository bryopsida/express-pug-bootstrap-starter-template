const { registerUserApiRoutes } = require('./users')
const express = require('express')

module.exports = {
  registerApiRoutes: function registerApiRoutes (app) {
    const apiRouter = express.Router()
    registerUserApiRoutes(apiRouter)
    app.use('/api', apiRouter)
  }
}
