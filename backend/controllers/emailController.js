const nodemailer = require('nodemailer');
const multer = require('multer');
const upload = multer();
const db = require('../config/db');

// Create transporter with more robust Gmail configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    // Add these options for better Gmail compatibility
    secure: true,
    port: 465,
    tls: {
        rejectUnauthorized: false
    }
});

// Verify transporter connection
transporter.verify(function(error, success) {
    if (error) {
        console.error('Email transporter verification failed:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
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
    to: 'devansh.prakhar@gmail.com', // Destination email
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

const sendArticleSubmission = async (req, res) => {
  // For multipart/form-data, use multer to parse
  upload.single('file')(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ message: 'File upload error' });
    }
    
    const { name, email, title, content, category } = req.body;
    const file = req.file;
    
    if (!name || !email || !title || (!content && !file)) {
      return res.status(400).json({ message: 'Please fill out all required fields.' });
    }

    try {
      // Save to database
      const query = `
        INSERT INTO article_submissions (title, content, author_name, author_email, category, file_name, file_size, mime_type)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id
      `;
      
      const values = [
        title,
        content || null,
        name,
        email,
        category,
        file ? file.originalname : null,
        file ? file.size : null,
        file ? file.mimetype : null
      ];
      
      const result = await db.query(query, values);
      const submissionId = result.rows[0].id;

      // Send email notification
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'devansh.prakhar@gmail.com',
        subject: `New Article Submission: ${title} (${category})`,
        html: `
          <h2>New Article Submission</h2>
          <p><strong>Submission ID:</strong> ${submissionId}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Category:</strong> ${category}</p>
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Content:</strong></p>
          <div style="white-space: pre-line;">${content || 'No content provided (see attachment).'}</div>
          <hr>
          <p><strong>Admin Actions:</strong></p>
          <p>Approve: <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/admin/articles/${submissionId}/approve">Approve Article</a></p>
          <p>Reject: <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/admin/articles/${submissionId}/reject">Reject Article</a></p>
        `,
        attachments: file ? [{
          filename: file.originalname,
          content: file.buffer
        }] : []
      };
      
      try {
        await transporter.sendMail(mailOptions);
        console.log('Email notification sent successfully');
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
        console.error('Error details:', {
          code: emailError.code,
          command: emailError.command,
          response: emailError.response,
          responseCode: emailError.responseCode
        });
        // Continue with the process even if email fails
      }
      
      res.status(200).json({ message: 'Article submitted successfully.' });
    } catch (error) {
      console.error('Error processing article submission:', error);
      res.status(500).json({ message: 'Failed to submit article. Please try again later.' });
    }
  });
};

module.exports = {
  sendAdmissionEmail,
  sendVisitEmail,
  sendContactEmail,
  sendArticleSubmission,
}; 