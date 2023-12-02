const SQLite = require('sqlite3')
const config = require('config')

module.exports = {
  dialect: config.get('db.dialect'),
  storage: config.get('db.storage'),
  migrationStorageTableName: 'db_migration_history',
  seederStorageTableName: 'db_seed_history',
  dialectOptions: {
    mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX
  }
}
