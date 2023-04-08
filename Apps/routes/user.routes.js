const express = require('express')
const router = express.Router()
const controller = require('../controller/user.controller')

//CREATE USER
router.post('/create', controller.create)
//LOGIN USER
router.post('/login', controller.login)

module.exports = router