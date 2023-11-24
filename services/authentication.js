const argon2 = require('argon2')
const { getUser } = require('./users')
const { getLogger, getAuditLogger } = require('./logger')

const logger = getLogger('authentication.js')
const audit = getAuditLogger('authentication.js')

function dualLog (level, msg) {
  logger[level](msg)
  audit[level](msg)
}

function hashPassword (password) {
  return argon2.hash(password)
}

function verifyPassword (password, hash) {
  return argon2.verify(hash, password)
}

async function authenticate (user, password) {
  const userObj = getUser(user)
  if (userObj == null) throw new Error(`User ${user} does not exist!`)
  if (userObj.passwordHash == null) {
    throw new Error(`User ${user} does not have a password!`)
  }
  const result = await verifyPassword(password, userObj.passwordHash)
  if (result) {
    dualLog('info', `User ${user} successfully authenticated`)
  } else {
    dualLog('warn', `Failed authentication attempt for user ${user}`)
  }
}

module.exports = {
  hashPassword,
  verifyPassword,
  authenticate
}
