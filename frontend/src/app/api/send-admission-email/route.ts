import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  secure: true,
  port: 465,
  tls: {
    rejectUnauthorized: false
  }
});

export async function POST(request: NextRequest) {
  try {
    const { parentName, parentEmail, parentPhone, studentName, studentAge, grade, message } = await request.json();

    // Basic validation
    if (!parentName || !parentEmail || !parentPhone || !studentName || !studentAge || !grade) {
      return NextResponse.json({ message: 'Please fill out all required fields.' }, { status: 400 });
    }

    const mailOptions = {
      from: `"Akshararambh School Admission" <${process.env.EMAIL_USER}>`,
      to: 'devansh.prakhar@gmail.com',
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

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Application submitted successfully.' });
  } catch (error) {
    console.error('Error sending admission email:', error);
    return NextResponse.json({ message: 'Failed to submit application. Please try again later.' }, { status: 500 });
  }
}