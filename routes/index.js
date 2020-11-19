const route = require('express').Router()
const userController = require('../controllers/userController')
const productController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const cartController = require('../controllers/cartController')

route.get('/', (req,res) => {res.send('Ecommerce CMS')})
route.post('/login', userController.login)
route.post('/register', userController.register)
route.get('/products', productController.getAll)
route.use(authentication)
// route.post('/carts/:ProductId', cartController.addCart)
// route.patch('/carts/:id', cartController.updateCart)
// route.delete('/carts/:id', cartController.delete)
route.post('/products', productController.create)
route.put('/products/:id', productController.update)
route.delete('/products/:id', productController.delete)

module.exports = route