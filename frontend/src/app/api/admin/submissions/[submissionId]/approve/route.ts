import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { generateSlug } from '@/lib/db';
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

    // Generate slug from title
    const slug = generateSlug(submission.title);

    // Move to published articles
    await sql`
      INSERT INTO articles (
        submission_id, title, slug, content, author_name, author_email, 
        category, file_name, file_size, mime_type, published_at
      )
      VALUES (
        ${submissionId}, ${submission.title}, ${slug}, ${submission.content},
        ${submission.author_name}, ${submission.author_email}, ${submission.category},
        ${submission.file_name}, ${submission.file_size}, ${submission.mime_type}, NOW()
      )
    `;

    // Update submission status
    await sql`
      UPDATE article_submissions 
      SET status = 'approved', admin_notes = ${adminNotes}, reviewed_at = NOW()
      WHERE id = ${submissionId}
    `;

    // Send approval email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: submission.author_email,
      subject: `Article Approved: ${submission.title}`,
      html: `
        <h2>Your Article Has Been Approved!</h2>
        <p>Dear ${submission.author_name},</p>
        <p>We're pleased to inform you that your article "<strong>${submission.title}</strong>" has been approved and published.</p>
        <p>You can view it at: <a href="${process.env.NEXT_PUBLIC_SITE_URL}/articles/${slug}">${process.env.NEXT_PUBLIC_SITE_URL}/articles/${slug}</a></p>
        ${adminNotes ? `<p><strong>Admin Notes:</strong> ${adminNotes}</p>` : ''}
        <p>Thank you for your contribution!</p>
        <p>Best regards,<br>Akshararambh School Team</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Failed to send approval email:', emailError);
    }

    return NextResponse.json({ message: 'Article approved and published successfully!' });
  } catch (error) {
    console.error('Error approving article:', error);
    return NextResponse.json({ message: 'Failed to approve article' }, { status: 500 });
  }
}