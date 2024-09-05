const express = require('express');
const nodemailer = require('nodemailer');
const Contact = require('./Schema'); // Ensure this is the correct path to your schema model
const router = express.Router();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jashuvamarri9154@gmail.com',
        pass: 'rywa caij ynfi btuy' // Use an App Password if 2FA is enabled
    }
});

// Route to handle form submission
router.post('/submit', async (req, res) => {
    console.log('Form submission received:', req.body);

    const { name, email, message } = req.body;

    // Validate incoming data
    if (!name || !email || !message) {
        console.log('Validation failed: Missing fields');
        return res.status(400).json({ error: 'Please fill in all fields' });
    }

    try {
        // Save to MongoDB
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        console.log('Message saved to MongoDB:', newContact);

        // Send confirmation email
        await sendConfirmationEmail(email, name);
        console.log('Confirmation email process complete');

        res.status(200).json({ message: 'Message submitted successfully' });
    } catch (error) {
        console.error('Error during form submission:', error);
        res.status(500).json({ error: 'Error saving message. Please try again later' });
    }
});


// Function to send confirmation email
async function sendConfirmationEmail(email, name) {
    try {
        const mailOptions = {
            from: 'jashuvamarri9154@gmail.com',
            to: email,
            subject: 'Message Received - Lakshadweep Islands',
            text: `Dear ${name},

Thank you for contacting us through our website. We have received your message and appreciate your interest in exploring Lakshadweep Islands with us.

Our team is currently reviewing your inquiry and will get back to you shortly. We aim to respond within 24-48 hours.

If you have any urgent questions or need immediate assistance, please feel free to reach out to us directly at +91 9154191234

Once again, thank you for reaching out. We look forward to assisting you in planning your visit to the beautiful Lakshadweep Islands.

Best regards,
[Lakshadweep Islands Customer Support]
[Tour Coordinator]
Lakshadweep Islands`
        };

        await transporter.sendMail(mailOptions);
        console.log('Confirmation email sent to:', email);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send confirmation email');
    }
}

module.exports = router;
