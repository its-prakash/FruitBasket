const express = require('express');
const router = express.Router();

const userController = require('../controller/auth.controller');
const addressController = require('../controller/address.controller')
const contactController = require('../controller/contact.controller')

const authMiddleware = require('../middleware/auth.middleware')

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser)
router.post('/getCurrentUser', userController.getCurrentUser)
router.delete('/deleteAccount/:id', userController.deleteAccount)

router.post('/addAddress',authMiddleware,addressController.addAddress)
router.get('/getUserAddress',authMiddleware,addressController.getAddresses)
router.delete('/removeAddress/:addressId',authMiddleware,addressController.deleteAddress)

router.post('/getContactMessage',authMiddleware,contactController.getContactMessage)

module.exports = router;