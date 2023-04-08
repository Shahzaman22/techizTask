const express = require('express')
const router = express.Router()
const controller = require('../controller/categories.controller')

//CREATE CATEGORY
router.post('/create', controller.create)

//GET ALL CATEGORIES
router.get('/getAll', controller.get)

module.exports = router