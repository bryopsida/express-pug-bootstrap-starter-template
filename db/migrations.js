const { Umzug, SequelizeStorage } = require('umzug')
const { getQueryLogger } = require('../services/logger')
const db = require('./models')

const logger = getQueryLogger('umzug')

const umzug = new Umzug({
  migrations: {
    glob: './db/migrations/*.js',
    resolve: ({ name, path, context }) => {
      const migration = require(path)
      return {
        name,
        up: async () => migration.up(context, db.Sequelize),
        down: async () => migration.down(context, db.Sequelize)
      }
    }
  },
  context: db.sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize: db.sequelize }),
  logger
})

module.exports = {
  runMigrations: async () => {
    await umzug.up()
  }
}
