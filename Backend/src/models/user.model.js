const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    addressType: { type: String, enum: ["Home", "Work", "Other"], default: "Home" },
    area: { type: String, required: true },
    landmark: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
});

const userSchema = new mongoose.Schema({

    userName: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    addresses : [addressSchema]
})

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;