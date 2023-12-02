const { join, resolve } = require('node:path')
const SQLite = require('sqlite3')
const config = require('config')

module.exports = {
  dialect: 'sqlite',
  storage: resolve(join(config.get('db.path'), 'database.sqlite')),
  migrationStorageTableName: 'db_migration_history',
  seederStorageTableName: 'db_seed_history',
  dialectOptions: {
    mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX,
  }
}