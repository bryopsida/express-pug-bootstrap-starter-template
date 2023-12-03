const db = require('../db/db')

function fromDB (user, includePassword) {
  const retUser = {
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.Role?.role
  }
  if (includePassword) {
    retUser.password = user.password
  }
  return retUser
}

function toDTO (user) {
  return {
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role
  }
}

async function saveUser (userObj) {
  const modelInstance = await db.User.findOne({
    where: {
      username: userObj.username
    }
  })
  modelInstance.firstName = userObj.firstName
  modelInstance.lastName = userObj.lastName
  modelInstance.email = userObj.email
  await modelInstance.save()
}

async function deleteUser (username) {
  const modelInstance = await db.User.findOne({
    where: {
      username
    }
  })
  await modelInstance.destroy()
}

async function updatePassword (username, hash) {
  const modelInstance = await db.User.findOne({
    where: {
      username
    }
  })
  modelInstance.password = hash
  await modelInstance.save()
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
    limit: count,
    include: db.Role
  })
  return users.map(fromDB)
}

async function addUser (userObj) {
  const role = await db.Role.findOne({
    where: {
      role: userObj.role
    }
  })
  userObj.roleId = role.id
  const user = db.User.build(userObj)
  await user.save()
}

function getUserCount () {
  return db.User.count()
}

module.exports = {
  getUser,
  getUsers,
  getUserCount,
  toDTO,
  saveUser,
  updatePassword,
  addUser,
  deleteUser
}
