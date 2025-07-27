import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    await sql`
      UPDATE articles 
      SET claps = claps + 1 
      WHERE id = ${id}
    `;
    
    const result = await sql`
      SELECT claps FROM articles WHERE id = ${id}
    `;
    
    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'Article not found' }, { status: 404 });
    }
    
    return NextResponse.json({ claps: result.rows[0].claps });
  } catch (error) {
    console.error('Error updating claps:', error);
    return NextResponse.json({ message: 'Failed to update claps' }, { status: 500 });
  }
}