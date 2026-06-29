const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage: storage });

const authMiddleware = require('../middleware/auth.middleware');
const productController = require('../controller/product.controller');

router.post('/add-product',uploadMiddleware.single('image'), productController.createProduct);
router.get('/products', productController.getAllProducts);

module.exports = router;