const winston = require('winston')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.splat(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'error'
    }),
    new winston.transports.File({ filename: './logs/combined.log' })
  ]
})

const auditLogger = winston.createLogger({
  level: 'silly',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.splat(),
    winston.format.json()
  ),
  transports: [new winston.transports.File({ filename: './logs/audit.log' })]
})

const queryLogger = winston.createLogger({
  level: 'silly',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.File({ filename: './logs/query.log' })]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console())
}

function buildChildLogger (loggerNameOrMeta, loggerInstance) {
  let meta = {}
  if (typeof loggerNameOrMeta === 'string') {
    meta.logger = loggerNameOrMeta
  } else {
    meta = {
      ...loggerNameOrMeta
    }
  }
  return loggerInstance.child({
    meta
  })
}

function getLogger (loggerNameOrMeta) {
  return buildChildLogger(loggerNameOrMeta, logger)
}

function getAuditLogger (loggerNameOrMeta) {
  return buildChildLogger(loggerNameOrMeta, auditLogger)
}

function getQueryLogger (loggerNameOrMeta) {
  return buildChildLogger(loggerNameOrMeta, queryLogger)
}

module.exports = {
  getLogger,
  getAuditLogger,
  getQueryLogger
}
