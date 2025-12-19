import pkg from 'pg';
const { Pool } = pkg;

// Database connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Get the path from URL
    const urlPath = req.url.replace('/api/', '');

    try {
        // Route handling
        if (urlPath === 'hero' && req.method === 'GET') {
            const result = await pool.query('SELECT * FROM hero LIMIT 1');
            return res.status(200).json(result.rows[0] || {});
        }

        if (urlPath === 'about' && req.method === 'GET') {
            const result = await pool.query('SELECT * FROM about LIMIT 1');
            return res.status(200).json(result.rows[0] || {});
        }

        if (urlPath === 'services' && req.method === 'GET') {
            const result = await pool.query('SELECT * FROM services ORDER BY id');
            return res.status(200).json(result.rows);
        }

        if (urlPath === 'projects' && req.method === 'GET') {
            const result = await pool.query('SELECT * FROM projects ORDER BY id');
            return res.status(200).json(result.rows);
        }

        if (urlPath === 'contact' && req.method === 'GET') {
            const result = await pool.query('SELECT * FROM contact_info LIMIT 1');
            return res.status(200).json(result.rows[0] || {});
        }

        if (urlPath === 'gallery' && req.method === 'GET') {
            const result = await pool.query('SELECT * FROM about_gallery ORDER BY display_order');
            return res.status(200).json(result.rows);
        }

        if (urlPath === 'contact/submit' && req.method === 'POST') {
            const { name, email, project_type, message } = req.body;
            const result = await pool.query(
                'INSERT INTO contact_submissions (name, email, project_type, message) VALUES ($1, $2, $3, $4) RETURNING *',
                [name, email, project_type, message]
            );
            return res.status(200).json({ success: true, data: result.rows[0] });
        }

        // 404 for unknown routes
        return res.status(404).json({ error: 'Not found', path: urlPath });

    } catch (err) {
        console.error('API Error:', err);
        return res.status(500).json({
            error: 'Server error',
            details: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
}
