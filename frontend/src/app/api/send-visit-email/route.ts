import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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
    const { parentName, parentEmail, parentPhone, preferredDate, message } = await request.json();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'devansh.prakhar@gmail.com',
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

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Visit request sent successfully' });
  } catch (error) {
    console.error('Error sending visit request email:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}