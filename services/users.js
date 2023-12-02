const users = require('./users.json')

function fromDB (user) {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role
  }
}

function toDTO (user) {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role
  }
}

function getUser (userId) {
  return users[userId]
}

function getUsers (offset, count) {
  const keys = Object.keys(users)
  const selectedKeys = keys.slice(offset, count)
  return Promise.resolve(selectedKeys.map((k) => toDTO(users[k])))
}

function getUserCount () {
  return Promise.resolve(Object.keys(users).length)
}

module.exports = {
  getUser,
  getUsers,
  getUserCount,
  toDTO
}
