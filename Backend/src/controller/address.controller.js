const userModel = require('../models/user.model')

async function addAddress(req, res) {

    try {

        const userId = req.user.id

        const { addressType, area, landmark, city, state, pincode } = req.body;

        if (!addressType || !area || !city || !state || !pincode) {
            return res.status(400).json({
                success: false,
                message: "All required fields are mandatory."
            });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        if (!user.addresses) {
            user.addresses = [];
        }

        user.addresses.push({ addressType, area, landmark, city, state, pincode });

        await user.save();

        return res.status(201).json({
            success: true,
            message: "Address added successfully.",
            addresses: user.addresses
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
}

async function getAddresses(req, res) {

    try {

        const userId = req.user.id

        const user = await userModel.findById(userId).select("addresses");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        return res.status(200).json({
            success: true,
            addresses: user.addresses
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
}

async function deleteAddress(req, res) {

    try {

        const userId = req.user.id

        const { addressId } = req.params;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        user.addresses.pull(addressId);

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Address deleted successfully.",
            addresses: user.addresses
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

}

module.exports = { addAddress, getAddresses, deleteAddress }