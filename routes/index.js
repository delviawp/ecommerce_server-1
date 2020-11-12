const route = require('express').Router()
const userController = require('../controllers/userController')
const productController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

route.post('/login', userController.login)
route.use(authentication)
route.post('/products', authorization, productController.create)
route.put('/products/:id', authorization, productController.update)
route.delete('/products/:id', authorization, productController.delete)

module.exports = route