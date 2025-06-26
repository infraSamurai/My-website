const db = require('../config/db');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Get all pending article submissions
const getPendingSubmissions = async (req, res) => {
    try {
        const query = `
            SELECT * FROM article_submissions 
            WHERE status = 'pending' 
            ORDER BY created_at DESC
        `;
        const result = await db.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching pending submissions:', error);
        res.status(500).json({ message: 'Failed to fetch submissions' });
    }
};

// Get all published articles
const getPublishedArticles = async (req, res) => {
    try {
        const query = `
            SELECT * FROM articles 
            ORDER BY published_at DESC
        `;
        const result = await db.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching published articles:', error);
        res.status(500).json({ message: 'Failed to fetch articles' });
    }
};

// Approve an article submission
const approveArticle = async (req, res) => {
    const { submissionId } = req.params;
    const { adminNotes } = req.body;

    try {
        // Get the submission
        const submissionQuery = 'SELECT * FROM article_submissions WHERE id = $1';
        const submissionResult = await db.query(submissionQuery, [submissionId]);
        
        if (submissionResult.rows.length === 0) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        const submission = submissionResult.rows[0];

        // Generate slug from title
        const slug = submission.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') + '-' + Date.now();

        // Insert into articles table
        const articleQuery = `
            INSERT INTO articles (submission_id, title, slug, content, author_name, author_email, category, file_name, file_size, mime_type)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING id
        `;
        
        const articleValues = [
            submissionId,
            submission.title,
            slug,
            submission.content,
            submission.author_name,
            submission.author_email,
            submission.category,
            submission.file_name,
            submission.file_size,
            submission.mime_type
        ];

        await db.query(articleQuery, articleValues);

        // Update submission status
        const updateQuery = `
            UPDATE article_submissions 
            SET status = 'approved', admin_notes = $1, reviewed_at = CURRENT_TIMESTAMP
            WHERE id = $2
        `;
        await db.query(updateQuery, [adminNotes || 'Approved', submissionId]);

        // Send approval email to author
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: submission.author_email,
            subject: `Your Article "${submission.title}" has been approved!`,
            html: `
                <h2>Congratulations! Your article has been approved.</h2>
                <p><strong>Title:</strong> ${submission.title}</p>
                <p><strong>Category:</strong> ${submission.category}</p>
                <p>Your article is now live on our website!</p>
                <p>View it here: <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/articles/${submission.category.toLowerCase().replace(' ', '-')}/${slug}">Read Article</a></p>
                <p>Thank you for contributing to our community!</p>
            `
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: 'Article approved successfully' });
    } catch (error) {
        console.error('Error approving article:', error);
        res.status(500).json({ message: 'Failed to approve article' });
    }
};

// Reject an article submission
const rejectArticle = async (req, res) => {
    const { submissionId } = req.params;
    const { adminNotes } = req.body;

    try {
        // Get the submission
        const submissionQuery = 'SELECT * FROM article_submissions WHERE id = $1';
        const submissionResult = await db.query(submissionQuery, [submissionId]);
        
        if (submissionResult.rows.length === 0) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        const submission = submissionResult.rows[0];

        // Update submission status
        const updateQuery = `
            UPDATE article_submissions 
            SET status = 'rejected', admin_notes = $1, reviewed_at = CURRENT_TIMESTAMP
            WHERE id = $2
        `;
        await db.query(updateQuery, [adminNotes || 'Rejected', submissionId]);

        // Send rejection email to author
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: submission.author_email,
            subject: `Update on your article submission: "${submission.title}"`,
            html: `
                <h2>Article Submission Update</h2>
                <p>Thank you for submitting your article "${submission.title}" to our website.</p>
                <p>After careful review, we regret to inform you that we are unable to publish this article at this time.</p>
                ${adminNotes ? `<p><strong>Feedback:</strong> ${adminNotes}</p>` : ''}
                <p>We encourage you to submit other articles in the future!</p>
                <p>Best regards,<br>The Editorial Team</p>
            `
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: 'Article rejected successfully' });
    } catch (error) {
        console.error('Error rejecting article:', error);
        res.status(500).json({ message: 'Failed to reject article' });
    }
};

// Get article by slug
const getArticleBySlug = async (req, res) => {
    const { slug } = req.params;

    try {
        const query = 'SELECT * FROM articles WHERE slug = $1';
        const result = await db.query(query, [slug]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // Increment view count
        await db.query('UPDATE articles SET view_count = view_count + 1 WHERE slug = $1', [slug]);

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching article:', error);
        res.status(500).json({ message: 'Failed to fetch article' });
    }
};

// Get articles by category
const getArticlesByCategory = async (req, res) => {
    const { category } = req.params;

    try {
        const query = `
            SELECT * FROM articles 
            WHERE LOWER(category) = LOWER($1)
            ORDER BY published_at DESC
        `;
        const result = await db.query(query, [category]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching articles by category:', error);
        res.status(500).json({ message: 'Failed to fetch articles' });
    }
};

module.exports = {
    getPendingSubmissions,
    getPublishedArticles,
    approveArticle,
    rejectArticle,
    getArticleBySlug,
    getArticlesByCategory
}; 