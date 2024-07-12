const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',  // Update with your SMTP server host
  port: 587,  // Update with your SMTP port
  secure: false,  // Set to true if using SSL/TLS
  auth: {
    user: 'info@drgeebril.com',  // Update with your email address
    pass: '33Osman//33333'  // Update with your email password or app password
  }
});

// Define a route to handle form submissions
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Email message options
  const mailOptions = {
    from: 'your-email@example.com',  // Sender address
    to: 'recipient@example.com',  // List of recipients
    subject: 'New Contact Form Submission',  // Subject line
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`  // Plain text body
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Failed to send email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
