// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Initialize Express
const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// SMTP transporter configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com', // Your SMTP server hostname
  port: 465, // Your SMTP port (typically 587 for TLS, 465 for SSL)
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'info@drgebril.com', // Your email address
    pass: '33Osman//33333' // Your email password or application-specific password
  },
  tls: {
    rejectUnauthorized: false // Only necessary if using a self-signed certificate
  }
});

// Function to send email using Nodemailer
const sendMail = async (toEmail, subject, htmlContent) => {
  const mailOptions = {
    from: 'info@drgebril.com', // Replace with your email
    to: toEmail,
    subject: subject,
    html: htmlContent
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Endpoint to handle appointment form submission
app.post('/sendAppointmentEmail', async (req, res) => {
  const { name, email, phone, date, reson, bestTime, message } = req.body;

  // Create email HTML content
  const htmlContent = `
    <h3>Appointment Request Details</h3>
    <ul>
      <li>Name: ${name}</li>
      <li>Email: ${email}</li>
      <li>Phone: ${phone}</li>
      <li>Appointment Date: ${date}</li>
      <li>Reason For Visit: ${reson}</li>
      <li>Best Time: ${bestTime}</li>
      <li>Message: ${message}</li>
    </ul>
  `;

  // Send email
  await sendMail('info@drgebril.com', 'Appointment Request', htmlContent);

  // Respond to client
  res.send('Appointment request submitted successfully');
});

// Endpoint to handle referral form submission
app.post('/sendReferralEmail', async (req, res) => {
  const { date, patient_name, age, patient_address, patient_phone, medical_conditions, reason_for_referral, special_requests, referring_dentist, dentist_address, dentist_phone, rediographs } = req.body;

  // Create email HTML content
  const htmlContent = `
    <h3>Doctor's Referral Details</h3>
    <ul>
      <li>Date: ${date}</li>
      <li>Patient Name: ${patient_name}</li>
      <li>Age: ${age}</li>
      <li>Patient Address: ${patient_address}</li>
      <li>Patient Phone: ${patient_phone}</li>
      <li>Medical Conditions: ${medical_conditions}</li>
      <li>Reason for Referral: ${reason_for_referral}</li>
      <li>Special Requests: ${special_requests}</li>
      <li>Referring Dentist: ${referring_dentist}</li>
      <li>Dentist Address: ${dentist_address}</li>
      <li>Dentist Phone: ${dentist_phone}</li>
      <li>Rediographs: ${rediographs}</li>
    </ul>
  `;

  // Send email
  await sendMail('info@drgebril.com', "Doctor's Referral Request", htmlContent);

  // Respond to client
  res.send('Referral request submitted successfully');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
