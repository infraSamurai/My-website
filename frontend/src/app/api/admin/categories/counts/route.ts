import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: NextRequest) {
  try {
    const result = await sql`
      SELECT category, COUNT(*) as count 
      FROM articles 
      GROUP BY category 
      ORDER BY count DESC
    `;
    
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching category counts:', error);
    return NextResponse.json({ message: 'Failed to fetch category counts' }, { status: 500 });
  }
}