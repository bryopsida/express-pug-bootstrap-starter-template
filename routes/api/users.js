const express = require('express')
const { getUsers, getUserCount } = require('../../services/users')
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})

const getUsersQuerySchema = Joi.object({
  offset: Joi.number().integer().min(0).required(),
  count: Joi.number().integer().min(1).max(100).required()
})

module.exports = {
  registerUserApiRoutes: function registerUserApiRoutes (app) {
    const apiRouter = express.Router()

    apiRouter.get(
      '/',
      validator.query(getUsersQuerySchema),
      async (req, res, next) => {
        const offset = req.query.offset
        const count = req.query.count
        try {
          const users = await getUsers(offset, count)
          const totalCount = await getUserCount()
          const resp = {
            offset,
            totalCount,
            users
          }
          res.json(resp)
        } catch (err) {
          next(err)
        }
      }
    )

    apiRouter.get('/:username', async (req, res) => {})

    apiRouter.put('/:username', async (req, res) => {})

    apiRouter.delete('/:username', async (req, res) => {})

    app.use('/users', apiRouter)
  }
}
