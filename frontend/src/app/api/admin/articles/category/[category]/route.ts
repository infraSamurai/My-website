import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: NextRequest, { params }: { params: { category: string } }) {
  try {
    const { category } = params;
    
    const result = await sql`
      SELECT * FROM articles 
      WHERE category = ${category}
      ORDER BY published_at DESC
    `;
    
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    return NextResponse.json({ message: 'Failed to fetch articles' }, { status: 500 });
  }
}