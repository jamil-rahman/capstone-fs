const { User } = require('../models/User');
const sgMail = require('@sendgrid/mail');
const mongoose = require('mongoose');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const emailController = async (req, res) => {
    try {
        const { recipientId, subject, message } = req.body;
        const senderId = req.user.uid; // Firebase UID

        console.log('Authenticated user:', req.user);
        console.log('Sender ID:', senderId);
        console.log('Recipient ID:', recipientId);

        // Validate recipientId
        if (!recipientId || !mongoose.Types.ObjectId.isValid(recipientId)) {
            return res.status(400).json({ message: 'Invalid recipient ID' });
        }

        // Fetch sender and recipient
        const [sender, recipient] = await Promise.all([
            User.findOne({ firebaseUid: senderId }),
            User.findById(recipientId)
        ]);

        if (!sender) {
            console.error(`Sender not found with Firebase UID: ${senderId}`);
            return res.status(404).json({ message: 'Sender not found' });
        }

        if (!recipient) {
            console.error(`Recipient not found with ID: ${recipientId}`);
            return res.status(404).json({ message: 'Recipient not found' });
        }

        console.log('Sender:', sender);
        console.log('Recipient:', recipient);

        const trueMessage = `From: ${sender.email}\n\n
    Subject: ${subject}\n\n
    Message: ${message}
    `;

        // Prepare email
        const msg = {
            to: recipient.email,
            from: {
                email: 'dev.jr722@gmail.com',
                name: 'When in Roam'
            },
            subject,
            text: trueMessage,
            replyTo: sender.email
        };

        // Send email
        await sgMail.send(msg);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('SendGrid error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { emailController };
