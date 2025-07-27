import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    
    const result = await sql`
      SELECT * FROM articles 
      WHERE slug = ${slug}
    `;
    
    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'Article not found' }, { status: 404 });
    }
    
    // Increment view count
    await sql`
      UPDATE articles 
      SET view_count = view_count + 1 
      WHERE slug = ${slug}
    `;
    
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json({ message: 'Failed to fetch article' }, { status: 500 });
  }
}