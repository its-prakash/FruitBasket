const cartModel = require('../models/cart.model');
const productModel = require('../models/product.model');
const userModel = require('../models/user.model');
const mongoose = require('mongoose')

async function addToCart(req, res) {

    try {

        const userId = req.user.id;
        const { productId, quantity } = req.body;

        const product = await productModel.findById(productId);


        if (!product || product.stock < quantity) {
            return res.status(404).json({
                message: "Product not found"
            })
        }

        let cart = await cartModel.findOne({ userId: userId });

        if (!cart) {
            cart = await cartModel.create({
                userId: userId,
                products: [{ productId, quantity }]
            })
        }
        else {

            const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

            if (productIndex > -1) {
                const newQuantity = cart.products[productIndex].quantity + Number(quantity);

                if (product.stock < newQuantity) {
                    return res.status(400).json({
                        message: `Cannot add more. Maximum available stock reached.`
                    });
                }

                cart.products[productIndex].set('quantity', newQuantity);
                await cart.save()

            }
            else {
                cart.products.push({
                    productId,
                    quantity
                })

            }
            await cart.save();
        }

        return res.status(200).json({
            message: "Item added to cart successfully",
            cart
        })

    } catch (err) {
        console.error("Add to Cart Error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function getCart(req, res) {
    try {
        const userId = req.user.id;

        const cartData = await cartModel
            .findOne({ userId })
            .populate('products.productId');

        if (!cartData) {
            return res.status(200).json({
                message: "Cart is empty",
                cartItems: []
            });
        }

        return res.status(200).json({
            message: "Cart fetched successfully",
            cartItems: cartData.products
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch cart",
            error: error.message
        });
    }
}

async function updateQuantity(req, res) {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        if (!productId) {
            return res.status(400).json({
                message: "Product ID is required"
            });
        }

        if (quantity === undefined || quantity === null) {
            return res.status(400).json({
                message: "Quantity is required"
            });
        }

        const cartData = await cartModel.findOne({ userId });

        if (!cartData) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        const product = cartData.products.find(
            item => item.productId.toString() === productId
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }

        product.quantity = quantity;

        await cartData.save();

        return res.status(200).json({
            message: "Quantity updated successfully",
            cart: cartData
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to update quantity",
            error: error.message
        });
    }
}

const removeFromCart = async (req, res) => {

    try {

        const userId = req.user.id;
        const { productId } = req.params;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: 'Product ID is required in query parameters.'
            });
        }

        const userObjectId = new mongoose.Types.ObjectId(userId);
        const productObjectId = new mongoose.Types.ObjectId(productId);

        const updatedCart = await cartModel.findOneAndUpdate(
            { userId: userObjectId },
            { $pull: { products: { productId: productObjectId } } },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found for this user.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Item removed from cart successfully.',
            data: updatedCart
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message
        });
    }
};


module.exports = { addToCart, getCart, updateQuantity, removeFromCart };
