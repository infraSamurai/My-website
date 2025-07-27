import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: NextRequest) {
  try {
    const result = await sql`
      SELECT * FROM articles 
      ORDER BY published_at DESC
    `;
    
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching published articles:', error);
    return NextResponse.json({ message: 'Failed to fetch articles' }, { status: 500 });
  }
}