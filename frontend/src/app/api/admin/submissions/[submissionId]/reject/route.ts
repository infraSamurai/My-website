import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: NextRequest, { params }: { params: { submissionId: string } }) {
  try {
    const { submissionId } = params;
    const { adminNotes } = await request.json();

    // Get the submission
    const submissionResult = await sql`
      SELECT * FROM article_submissions WHERE id = ${submissionId}
    `;
    
    if (submissionResult.rows.length === 0) {
      return NextResponse.json({ message: 'Submission not found' }, { status: 404 });
    }

    const submission = submissionResult.rows[0];

    // Update submission status
    await sql`
      UPDATE article_submissions 
      SET status = 'rejected', admin_notes = ${adminNotes}, reviewed_at = NOW()
      WHERE id = ${submissionId}
    `;

    // Send rejection email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: submission.author_email,
      subject: `Article Submission Update: ${submission.title}`,
      html: `
        <h2>Article Submission Update</h2>
        <p>Dear ${submission.author_name},</p>
        <p>Thank you for submitting your article "<strong>${submission.title}</strong>" to Akshararambh School.</p>
        <p>After careful review, we're unable to publish this article at this time.</p>
        ${adminNotes ? `<p><strong>Feedback:</strong> ${adminNotes}</p>` : ''}
        <p>We encourage you to continue writing and submitting articles. Please feel free to submit revised versions or new content in the future.</p>
        <p>Best regards,<br>Akshararambh School Team</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Failed to send rejection email:', emailError);
    }

    return NextResponse.json({ message: 'Article submission rejected.' });
  } catch (error) {
    console.error('Error rejecting article:', error);
    return NextResponse.json({ message: 'Failed to reject article' }, { status: 500 });
  }
}