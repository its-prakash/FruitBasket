const contactModel = require('../models/contact.model');

async function getContactMessage(req, res) {

    try {

        const userId = req.user.id;

        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required.'
            });
        }

        const newContactmessage = await contactModel.create({
            userId: userId,
            messageDetails: { name, email, phone, message }
        });

        return res.status(201).json({
            success: true,
            message: 'Your message has been sent successfully!'
        });

    } catch (error) {
        console.error('Contact Submission Server Error:', error);

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: 'Database schema validation failed',
                errors: messages
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Internal server processing error. Please try again later.'
        });
    }
};

module.exports = { getContactMessage }
