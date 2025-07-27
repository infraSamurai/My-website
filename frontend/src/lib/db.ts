import { sql } from '@vercel/postgres';

// Database initialization - run this once to set up tables
export async function initializeDatabase() {
  try {
    // Enable UUID extension
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Simplified admission applications table for immediate use
    await sql`
      CREATE TABLE IF NOT EXISTS admission_applications (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        parent_name VARCHAR(100) NOT NULL,
        parent_email VARCHAR(255) NOT NULL,
        parent_phone VARCHAR(20) NOT NULL,
        student_name VARCHAR(100) NOT NULL,
        student_age INTEGER NOT NULL,
        grade VARCHAR(20) NOT NULL,
        message TEXT,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Contact submissions table
    await sql`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(200) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        subject VARCHAR(200),
        message TEXT NOT NULL,
        submission_type VARCHAR(50) DEFAULT 'general',
        status VARCHAR(20) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Article submissions table
    await sql`
      CREATE TABLE IF NOT EXISTS article_submissions (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title VARCHAR(200) NOT NULL,
        content TEXT,
        author_name VARCHAR(100) NOT NULL,
        author_email VARCHAR(255) NOT NULL,
        category VARCHAR(50) NOT NULL,
        file_name VARCHAR(255),
        file_url VARCHAR(500),
        file_size INTEGER,
        mime_type VARCHAR(100),
        status VARCHAR(20) DEFAULT 'pending',
        admin_notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Published articles table
    await sql`
      CREATE TABLE IF NOT EXISTS articles (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        submission_id UUID UNIQUE,
        title VARCHAR(200) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        content TEXT,
        author_name VARCHAR(100) NOT NULL,
        author_email VARCHAR(255) NOT NULL,
        category VARCHAR(50) NOT NULL,
        file_name VARCHAR(255),
        file_url VARCHAR(500),
        view_count INTEGER DEFAULT 0,
        claps INTEGER DEFAULT 0,
        is_featured BOOLEAN DEFAULT false,
        published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('Database initialized successfully');
    return { success: true };
  } catch (error) {
    console.error('Database initialization error:', error);
    return { success: false, error };
  }
}

// Helper function to generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}