import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
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
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const category = formData.get('category') as string;
    const file = formData.get('file') as File;

    if (!name || !email || !title || (!content && !file)) {
      return NextResponse.json({ message: 'Please fill out all required fields.' }, { status: 400 });
    }

    // Handle file upload to Vercel Blob (for now, store filename only)
    let fileName = null;
    let fileSize = null;
    let mimeType = null;

    if (file) {
      fileName = file.name;
      fileSize = file.size;
      mimeType = file.type;
    }

    // Save to database
    const result = await sql`
      INSERT INTO article_submissions (title, content, author_name, author_email, category, file_name, file_size, mime_type)
      VALUES (${title}, ${content || null}, ${name}, ${email}, ${category}, ${fileName}, ${fileSize}, ${mimeType})
      RETURNING id
    `;

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
        <p><strong>File:</strong> ${fileName || 'No file attached'}</p>
        <p><strong>Admin Actions:</strong></p>
        <p>Review at: <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/submissions">Admin Panel</a></p>
      `,
      attachments: file && file.size > 0 ? [{
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer())
      }] : []
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email notification sent successfully');
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
    }

    return NextResponse.json({ 
      message: 'Article submission successful!',
      submissionId: submissionId
    });

  } catch (error) {
    console.error('Error processing article submission:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}