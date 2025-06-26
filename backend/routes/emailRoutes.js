const express = require('express');
const router = express.Router();
const { sendAdmissionEmail, sendVisitEmail, sendContactEmail } = require('../controllers/emailController');

// @route   POST /api/send-admission-email
// @desc    Sends an admission inquiry email
// @access  Public
router.post('/send-admission-email', sendAdmissionEmail);

// @route   POST /api/send-visit-email
// @desc    Sends a visit inquiry email
// @access  Public
router.post('/send-visit-email', sendVisitEmail);

// @route   POST /api/send-contact-email
// @desc    Sends a contact inquiry email
// @access  Public
router.post('/send-contact-email', sendContactEmail);

// @route   POST /api/send-article-submission
// @desc    Receives article submissions with optional file and emails them to admin
// @access  Public
router.post('/send-article-submission', require('../controllers/emailController').sendArticleSubmission);

module.exports = router; 