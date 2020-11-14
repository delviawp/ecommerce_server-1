const express = require('express')
const app = express()
const port = process.env.PORT || 3000 
const route = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')


app.use(cors())
app.use(express.urlencoded( { extended: false }))
app.use(express.json())
app.use(route)
app.use(errorHandler)


module.exports = app