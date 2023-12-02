const db = require('../db/db')

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

async function getUser (userId) {
  const user = await db.User.findOne({
    where: {
      username: userId
    }
  })
  if (user == null) return null
  return fromDB(user)
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
