const orderModel = require('../models/order.model')
const cartModel = require('../models/cart.model');

async function orderConfirm(req, res) {

    try {

        const userId = req.user.id
        const { totalAmount, paymentStatus , paymentMethod } = req.body;

        const cart = await cartModel.findOne({ userId: userId })

        if (!cart || cart.products.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Your cart is empty.'
            });
        }


        const newOrder = await orderModel.create({
            userId: userId,
            products: cart.products,
            totalAmount: totalAmount,
            paymentStatus: paymentStatus || 'Pending',
            paymentMethod : paymentMethod 
        })

        if (paymentStatus !== 'Failed') {
            cart.products = [];
            await cart.save();
        }

        return res.status(201).json({
            success: true,
            message: 'Order created successfully. Ready for payment.',
            orderId: newOrder._id,
            data: newOrder
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error during checkout.',
            error: error.message
        });
    }

}


async function getOrders(req, res) {
    try {
        const userId = req.user.id;

        const orders = await orderModel.find({ userId: userId }).populate('products.productId');

        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully.",
            orders: orders
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal server error while fetching orders.",
            error: error.message
        });
    }
}

module.exports = { orderConfirm, getOrders }