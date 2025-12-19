import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();

// Database connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// API Routes

// Get hero content
app.get('/api/hero', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM hero LIMIT 1');
        res.json(result.rows[0] || {});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get about content
app.get('/api/about', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM about LIMIT 1');
        res.json(result.rows[0] || {});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all services
app.get('/api/services', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM services ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all projects
app.get('/api/projects', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM projects ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get contact info
app.get('/api/contact', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM contact_info LIMIT 1');
        res.json(result.rows[0] || {});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get gallery images for About section
app.get('/api/gallery', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM about_gallery ORDER BY display_order');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Submit contact form
app.post('/api/contact/submit', async (req, res) => {
    try {
        const { name, email, project_type, message } = req.body;
        const result = await pool.query(
            'INSERT INTO contact_submissions (name, email, project_type, message) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, project_type, message]
        );
        res.json({ success: true, data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

export default app;
