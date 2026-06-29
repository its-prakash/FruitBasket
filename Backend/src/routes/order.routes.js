const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/auth.middleware')
const orderController  = require('../controller/order.controller')

router.post("/orderConfirm",authMiddleware , orderController.orderConfirm)
router.get("/getOrders",authMiddleware , orderController.getOrders)

module.exports  = router
