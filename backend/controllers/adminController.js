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
            INSERT INTO articles (submission_id, title, slug, content, author_name, author_email, category, file_name, file_size, mime_type, file_data)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
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
            submission.mime_type,
            submission.file_data
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

// Get categories with article counts
const getCategoryCounts = async (req, res) => {
    try {
        const query = `
            SELECT category, COUNT(*) as article_count
            FROM articles
            GROUP BY category
            ORDER BY category
        `;
        const result = await db.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching category counts:', error);
        res.status(500).json({ message: 'Failed to fetch category counts' });
    }
};

// Increment clap count for an article
const clapArticle = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'UPDATE articles SET claps = claps + 1 WHERE id = $1 RETURNING claps';
        const result = await db.query(query, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json({ claps: result.rows[0].claps });
    } catch (error) {
        console.error('Error clapping article:', error);
        res.status(500).json({ message: 'Failed to clap article' });
    }
};

// Get top 3 featured articles
const getFeaturedArticles = async (req, res) => {
    try {
        const query = `
            SELECT id, title, slug, category, author_name, published_at, content 
            FROM articles 
            ORDER BY claps DESC, published_at DESC 
            LIMIT 3
        `;
        const result = await db.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching featured articles:', error);
        res.status(500).json({ message: 'Failed to fetch featured articles' });
    }
};

// Serve uploaded file
const serveFile = async (req, res) => {
    const { submissionId } = req.params;

    try {
        // First try to get file from submissions table
        let query = 'SELECT file_data, mime_type, file_name FROM article_submissions WHERE id = $1';
        let result = await db.query(query, [submissionId]);
        
        // If not found in submissions, try articles table
        if (result.rows.length === 0) {
            query = 'SELECT file_data, mime_type, file_name FROM articles WHERE id = $1';
            result = await db.query(query, [submissionId]);
        }
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'File not found' });
        }

        const { file_data, mime_type, file_name } = result.rows[0];

        if (!file_data) {
            return res.status(404).json({ message: 'No file data found' });
        }

        // Set appropriate headers
        res.setHeader('Content-Type', mime_type);
        res.setHeader('Content-Disposition', `attachment; filename="${file_name}"`);
        res.setHeader('Cache-Control', 'public, max-age=3600');

        // Send the file data
        res.send(file_data);
    } catch (error) {
        console.error('Error serving file:', error);
        res.status(500).json({ message: 'Failed to serve file' });
    }
};

// Delete article by id
const deleteArticle = async (req, res) => {
    const { id } = req.params;
    try {
        // Delete the article
        const result = await db.query('DELETE FROM articles WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json({ message: 'Article deleted successfully' });
    } catch (error) {
        console.error('Error deleting article:', error);
        res.status(500).json({ message: 'Failed to delete article' });
    }
};

module.exports = {
    getPendingSubmissions,
    getPublishedArticles,
    approveArticle,
    rejectArticle,
    getArticleBySlug,
    getArticlesByCategory,
    getCategoryCounts,
    clapArticle,
    getFeaturedArticles,
    serveFile,
    deleteArticle
}; 