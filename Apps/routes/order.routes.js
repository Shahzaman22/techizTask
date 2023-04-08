const express = require('express')
const router = express.Router()
const controller = require('../controller/order.controller')
const authMiddleware = require('../middleware/auth')

//GET ALL ORDERS
router.get('/getAll', controller.get)

//CREATE ORDER
router.post('/create', [authMiddleware] , controller.create)

module.exports = router;