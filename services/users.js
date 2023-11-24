const users = require('./users.json')

function getUser (userId) {
  return users[userId]
}

module.exports = {
  getUser
}
