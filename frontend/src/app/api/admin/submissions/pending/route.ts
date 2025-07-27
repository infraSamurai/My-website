import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: NextRequest) {
  try {
    const result = await sql`
      SELECT * FROM article_submissions 
      WHERE status = 'pending' 
      ORDER BY created_at DESC
    `;
    
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching pending submissions:', error);
    return NextResponse.json({ message: 'Failed to fetch submissions' }, { status: 500 });
  }
}