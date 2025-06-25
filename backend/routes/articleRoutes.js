const express = require('express');
const router = express.Router();
const { createArticle, getAllArticles, getArticleBySlug } = require('../controllers/articleController');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   POST /api/articles
// @desc    Create a new article
// @access  Private/Admin
router.post('/', protect, admin, createArticle);

// @route   GET /api/articles
// @desc    Get all published articles (with optional filters)
// @access  Public
router.get('/', getAllArticles);

// @route   GET /api/articles/:slug
// @desc    Get a single article by its slug
// @access  Public
router.get('/:slug', getArticleBySlug);

module.exports = router; 