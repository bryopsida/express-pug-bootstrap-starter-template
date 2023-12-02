const db = require('../db/db')

function fromDB (user, includePassword) {
  const retUser = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.Role.role
  }
  if (includePassword) {
    retUser.password = user.password
  }
  return retUser
}

function toDTO (user) {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role
  }
}

async function getUser (userId, includePassword) {
  const user = await db.User.findOne({
    where: {
      username: userId
    },
    include: db.Role
  })
  if (user == null) return null
  return fromDB(user, includePassword)
}

async function getUsers (offset, count) {
  const users = await db.User.findAll({
    offset,
    limit: count
  })
  return users.map(fromDB)
}

function getUserCount () {
  return db.User.count()
}

module.exports = {
  getUser,
  getUsers,
  getUserCount,
  toDTO
}
