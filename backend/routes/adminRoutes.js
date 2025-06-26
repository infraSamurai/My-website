const express = require('express');
const router = express.Router();
const { 
    getPendingSubmissions, 
    getPublishedArticles, 
    approveArticle, 
    rejectArticle,
    getArticleBySlug,
    getArticlesByCategory
} = require('../controllers/adminController');

// Get all pending submissions
router.get('/submissions/pending', getPendingSubmissions);

// Get all published articles
router.get('/articles', getPublishedArticles);

// Get articles by category
router.get('/articles/category/:category', getArticlesByCategory);

// Get specific article by slug
router.get('/articles/:slug', getArticleBySlug);

// Approve an article submission
router.post('/submissions/:submissionId/approve', approveArticle);

// Reject an article submission
router.post('/submissions/:submissionId/reject', rejectArticle);

module.exports = router; 