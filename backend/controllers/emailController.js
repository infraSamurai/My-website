const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendAdmissionEmail = async (req, res) => {
  const { parentName, parentEmail, parentPhone, studentName, studentAge, grade, message } = req.body;

  // Basic validation
  if (!parentName || !parentEmail || !parentPhone || !studentName || !studentAge || !grade) {
    return res.status(400).json({ message: 'Please fill out all required fields.' });
  }

  // IMPORTANT: Replace with your actual email service provider's settings.
  // It's highly recommended to use environment variables for these sensitive values.
  // For example: process.env.EMAIL_HOST, process.env.EMAIL_USER, etc.
  const mailOptions = {
    from: `"Akshararambh School Admission" <${process.env.EMAIL_USER}>`,
    to: 'devansh.prakhar@gmail.com', // The email address to receive the applications
    subject: `New Admission Inquiry from ${parentName}`,
    html: `
      <h2>New Admission Application Received</h2>
      <p><strong>Parent's Name:</strong> ${parentName}</p>
      <p><strong>Parent's Email:</strong> ${parentEmail}</p>
      <p><strong>Parent's Phone:</strong> ${parentPhone}</p>
      <hr>
      <p><strong>Student's Name:</strong> ${studentName}</p>
      <p><strong>Student's Age:</strong> ${studentAge}</p>
      <p><strong>Applying for Grade:</strong> ${grade}</p>
      <hr>
      <p><strong>Additional Message:</strong></p>
      <p>${message || 'No message provided.'}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Application submitted successfully.' });
  } catch (error) {
    console.error('Error sending admission email:', error);
    // Provide a generic error to the client for security
    res.status(500).json({ message: 'Failed to submit application. Please try again later.' });
  }
};

const sendVisitEmail = async (req, res) => {
  const { parentName, parentEmail, parentPhone, preferredDate, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'New School Visit Request',
    html: `
      <h1>New School Visit Request</h1>
      <p><strong>Parent's Name:</strong> ${parentName}</p>
      <p><strong>Parent's Email:</strong> ${parentEmail}</p>
      <p><strong>Parent's Phone:</strong> ${parentPhone}</p>
      <p><strong>Preferred Date:</strong> ${preferredDate}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Visit request sent successfully');
  } catch (error) {
    console.error('Error sending visit request email:', error);
    res.status(500).send('Something went wrong');
  }
};

const sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'devansh.prakhar@gmail.com', // Destination email
    subject: `New Contact Message from ${name}`,
    html: `
      <h2>New Message from Contact Form</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending contact email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
};

module.exports = {
  sendAdmissionEmail,
  sendVisitEmail,
  sendContactEmail,
}; 