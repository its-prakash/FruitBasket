const express = require('express')
const router = express.Router()

const cartController = require('../controller/cart.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post("/add-cart", authMiddleware, cartController.addToCart)
router.put("/updateQuantity", authMiddleware, cartController.updateQuantity)
router.get("/getCart", authMiddleware, cartController.getCart)
router.delete('/removeFromCart/:productId',authMiddleware, cartController.removeFromCart)


module.exports = router