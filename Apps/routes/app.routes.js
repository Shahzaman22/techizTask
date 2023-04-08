const express = require('express')
const router = express.Router()

//USERS
router.use('/users', require('./user.routes'))

//CATEGORIES
router.use('/categories', require('./category.routes'))

//PRODUCTS
router.use('/products', require('./product.routes'))

//ORDERS
router.use('/orders', require('./order.routes'))

module.exports = router