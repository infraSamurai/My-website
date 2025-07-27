import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const result = await initializeDatabase();
    
    if (result.success) {
      return NextResponse.json({ message: 'Database initialized successfully' });
    } else {
      return NextResponse.json({ message: 'Database initialization failed', error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}