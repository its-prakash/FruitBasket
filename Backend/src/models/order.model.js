const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending'
    },
    paymentMethod : {
        type : String ,
        enum : ['COD', 'UPI' , 'netBanking'],
        default : 'cod'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

const orderModel = mongoose.model("order", orderSchema)

module.exports = orderModel