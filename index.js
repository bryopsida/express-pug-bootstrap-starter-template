const express = require('express')
const helmet = require('helmet')
const { resolve, join } = require('node:path')
const { registerRoutes } = require('./routes')

const app = express()

app.use(express.static('public'))
app.use(
  '/bootstrap',
  express.static(resolve(join('node_modules', 'bootstrap', 'dist')))
)
app.set('view engine', 'pug')

if (process.env.NODE_ENV === 'production') {
  app.use(helmet())
}

registerRoutes(app)

app.listen(3000, () => {
  console.log('Example app listening on port 3000')
})
