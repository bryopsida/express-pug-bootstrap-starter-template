'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate (models) {
      this.belongsTo(models.Role)
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      password: DataTypes.STRING,
      roleId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'User'
    }
  )
  return User
}
