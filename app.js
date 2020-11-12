const express = require('express')
const app = express()
const port = 3000
const route = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.urlencoded( { extended: false }))
app.use(express.json())
app.use(route)
app.use(errorHandler)

module.exports = app