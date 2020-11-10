const route = require('express').Router()
const userController = require('../controllers/userController')

route.post('/login', userController.login)

module.exports = route