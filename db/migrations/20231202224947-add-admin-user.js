'use strict'
const { hashPassword } = require('../../services/authentication')
const { getLogger, getAuditLogger } = require('../../services/logger')
const { randomBytes } = require('node:crypto')

const loggerName = 'adminSeed'
const auditLogger = getAuditLogger(loggerName)
const logger = getLogger(loggerName)

function dualLog (msg) {
  logger.warn(msg)
  auditLogger.warn(msg)
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let password = process.env.ADMIN_PASSWORD
    if (password == null) {
      password = randomBytes(16).toString('hex')
      dualLog(`Generated a random admin password ${password}, change it ASAP!`)
    }
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'admin',
        lastName: 'admin',
        email: 'admin@localhost',
        username: 'admin',
        roleId: 0,
        password: await hashPassword(password),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.delete(null, 'Users', 'admin')
  }
}
