import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: NextRequest) {
  try {
    const { parentName, parentEmail, parentPhone, studentName, studentAge, grade, message } = await request.json();

    // Basic validation
    if (!parentName || !parentEmail || !parentPhone || !studentName || !studentAge || !grade) {
      return NextResponse.json({ message: 'Please fill out all required fields.' }, { status: 400 });
    }

    // Insert admission application into database
    await sql`
      INSERT INTO admission_applications 
      (parent_name, parent_email, parent_phone, student_name, student_age, grade, message, created_at, status)
      VALUES (${parentName}, ${parentEmail}, ${parentPhone}, ${studentName}, ${studentAge}, ${grade}, ${message}, NOW(), 'pending')
    `;

    return NextResponse.json({ message: 'Admission application submitted successfully!' });
  } catch (error) {
    console.error('Error submitting admission application:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}