const db = require('../config/db');

// Slugify function to create a URL-friendly slug
const slugify = (text) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

// @desc    Create a new article
// @route   POST /api/articles
// @access  Private/Admin
const createArticle = async (req, res) => {
  const { title, content, excerpt, subject, tags, is_published } = req.body;
  // In a real app, author_id would come from the authenticated user (req.user.id)
  const author_id = req.user.id; 
  
  if (!title || !content || !subject || !author_id) {
    return res.status(400).json({ message: 'Please provide title, content, subject, and author ID.' });
  }

  const slug = slugify(title);
  const published_at = is_published ? new Date() : null;

  const query = `
    INSERT INTO articles (title, slug, content, excerpt, author_id, subject, tags, is_published, published_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
  `;

  try {
    const client = await db.getClient();
    try {
      const { rows } = await client.query(query, [title, slug, content, excerpt, author_id, subject, tags, is_published, published_at]);
      res.status(201).json(rows[0]);
    } finally {
      client.release();
    }
  } catch (error) {
    // Check for unique constraint violation for the slug
    if (error.code === '23505' && error.constraint === 'articles_slug_key') {
      return res.status(409).json({ message: 'An article with this title already exists.' });
    }
    console.error('Error creating article:', error);
    res.status(500).json({ message: 'Server error while creating article.' });
  }
};

// @desc    Get all articles (with filtering)
// @route   GET /api/articles
// @access  Public
const getAllArticles = async (req, res) => {
  const { subject, tag } = req.query;

  let query = 'SELECT a.id, a.title, a.slug, a.excerpt, a.subject, a.tags, a.cover_image_url, a.created_at, u.name as author_name FROM articles a LEFT JOIN users u ON a.author_id = u.id WHERE a.is_published = true';
  const queryParams = [];

  if (subject) {
    queryParams.push(subject);
    query += ` AND a.subject = $${queryParams.length}`;
  }

  if (tag) {
    queryParams.push(tag);
    query += ` AND $${queryParams.length} = ANY(a.tags)`;
  }
  
  query += ' ORDER BY a.published_at DESC;';

  try {
    const client = await db.getClient();
    try {
      const { rows } = await client.query(query, queryParams);
      res.status(200).json(rows);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: 'Server error while fetching articles.' });
  }
};

// @desc    Get a single article by slug
// @route   GET /api/articles/:slug
// @access  Public
const getArticleBySlug = async (req, res) => {
  const { slug } = req.params;
  const query = 'SELECT a.*, u.name as author_name FROM articles a LEFT JOIN users u ON a.author_id = u.id WHERE a.slug = $1 AND a.is_published = true;';

  try {
    const client = await db.getClient();
    try {
      const { rows } = await client.query(query, [slug]);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Article not found.' });
      }
      res.status(200).json(rows[0]);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error(`Error fetching article with slug ${slug}:`, error);
    res.status(500).json({ message: 'Server error while fetching the article.' });
  }
};

module.exports = {
  createArticle,
  getAllArticles,
  getArticleBySlug,
}; 