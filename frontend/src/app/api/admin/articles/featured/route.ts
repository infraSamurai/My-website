import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: NextRequest) {
  try {
    const result = await sql`
      SELECT * FROM articles 
      WHERE is_featured = true
      ORDER BY claps DESC, published_at DESC
      LIMIT 3
    `;
    
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching featured articles:', error);
    return NextResponse.json({ message: 'Failed to fetch featured articles' }, { status: 500 });
  }
}