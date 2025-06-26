const express = require('express');
const router = express.Router();
const { 
    getPendingSubmissions, 
    getPublishedArticles, 
    approveArticle, 
    rejectArticle,
    getArticleBySlug,
    getArticlesByCategory,
    getCategoryCounts,
    clapArticle,
    getFeaturedArticles,
    serveFile
} = require('../controllers/adminController');

// Get all pending submissions
router.get('/submissions/pending', getPendingSubmissions);

// Get all published articles
router.get('/articles', getPublishedArticles);

// Get top 3 featured articles
router.get('/articles/featured', getFeaturedArticles);

// Get articles by category
router.get('/articles/category/:category', getArticlesByCategory);

// Get categories with counts
router.get('/categories/counts', getCategoryCounts);

// Get specific article by slug
router.get('/articles/:slug', getArticleBySlug);

// Increment clap count for an article
router.post('/articles/:id/clap', clapArticle);

// Delete article by id
router.delete('/articles/:id', require('../controllers/adminController').deleteArticle);

// Serve uploaded file
router.get('/files/:submissionId', serveFile);

// Approve an article submission
router.post('/submissions/:submissionId/approve', approveArticle);

// Reject an article submission
router.post('/submissions/:submissionId/reject', rejectArticle);

module.exports = router; 