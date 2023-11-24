#!/usr/bin/env node
const { resolve } = require('node:path')
const { readFileSync } = require('node:fs')
const { hashPassword } = require('../services/authentication')

const pathToPassword = process.argv[2]
const password = readFileSync(resolve(pathToPassword))
hashPassword(password)
  .then((hash) => {
    process.stdout.write(hash)
  })
  .catch((err) => {
    console.error('Error hashing password', err)
  })
