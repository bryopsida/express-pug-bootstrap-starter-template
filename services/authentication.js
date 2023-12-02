const argon2 = require('argon2')
const config = require('config')

const { getIronSession } = require('iron-session')
const { getUser } = require('./users')
const { getLogger, getAuditLogger } = require('./logger')

const DEFAULT_PASSWORD = '16662956379127212881668216927771'
const logger = getLogger('authentication.js')
const audit = getAuditLogger('authentication.js')
const password = config.get('authentication.cookiePassword')
const cookieName = config.get('authentication.cookieName')
const cookieOptions = {
  secure: process.env.NODE_ENV === 'production'
}

if (
  password === DEFAULT_PASSWORD &&
  process.env.NODE_ENV === 'production' &&
  process.env.ALLOW_DEFAULT_COOKIE !== 'true'
) {
  throw new Error(
    'The cookie password was not changed from default and NODE_ENV is production!'
  )
}
if (password === DEFAULT_PASSWORD) {
  console.warn(
    'The cookie password has been left default, this is not secure and should never be done in a prod environment!'
  )
}

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
  const userObj = await getUser(user, true)
  if (userObj == null) throw new Error(`User ${user} does not exist!`)
  if (userObj.password == null) {
    throw new Error(`User ${user} does not have a password!`)
  }
  const result = await verifyPassword(password, userObj.password)
  if (result) {
    dualLog('info', `User ${user} successfully authenticated`)
  } else {
    dualLog('warn', `Failed authentication attempt for user ${user}`)
  }
  return result
}

async function createSession (req, res, user) {
  const session = await getIronSession(req, res, {
    password,
    cookieName,
    cookieOptions
  })
  dualLog('info', `Creating session for ${user.username}`)
  session.username = user.username
  session.role = user.role
  session.authenticated = true
  await session.save()
}

function getSession (req, res) {
  return getIronSession(req, res, {
    password,
    cookieName,
    cookieOptions
  })
}

async function deleteSession (req, res) {
  const session = await getIronSession(req, res, {
    password,
    cookieName,
    cookieOptions
  })
  dualLog('info', `Destroying session for ${session.username}`)
  session.destroy()
}

function logout (req, res) {
  return deleteSession(req, res)
}

module.exports = {
  hashPassword,
  verifyPassword,
  authenticate,
  createSession,
  deleteSession,
  getSession,
  logout
}
