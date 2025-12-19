import pkg from 'pg';
const { Pool } = pkg;

let pool;

function getPool() {
    if (!pool) {
        pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        });
    }
    return pool;
}

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Check if DATABASE_URL exists
    if (!process.env.DATABASE_URL) {
        return res.status(500).json({
            error: 'Database not configured',
            message: 'DATABASE_URL environment variable is missing'
        });
    }

    try {
        const db = getPool();

        // Parse the endpoint from the URL
        const path = req.url.split('/api/')[1]?.split('?')[0] || '';

        switch (path) {
            case 'hero':
                if (req.method === 'GET') {
                    const result = await db.query('SELECT * FROM hero LIMIT 1');
                    return res.status(200).json(result.rows[0] || {});
                }
                break;

            case 'about':
                if (req.method === 'GET') {
                    const result = await db.query('SELECT * FROM about LIMIT 1');
                    return res.status(200).json(result.rows[0] || {});
                }
                break;

            case 'services':
                if (req.method === 'GET') {
                    const result = await db.query('SELECT * FROM services ORDER BY display_order, id');
                    return res.status(200).json(result.rows);
                }
                break;

            case 'projects':
                if (req.method === 'GET') {
                    const result = await db.query('SELECT * FROM projects ORDER BY display_order, id');
                    return res.status(200).json(result.rows);
                }
                break;

            case 'contact':
                if (req.method === 'GET') {
                    const result = await db.query('SELECT * FROM contact_info LIMIT 1');
                    return res.status(200).json(result.rows[0] || {});
                }
                break;

            case 'gallery':
                if (req.method === 'GET') {
                    const result = await db.query('SELECT * FROM about_gallery ORDER BY display_order');
                    return res.status(200).json(result.rows);
                }
                break;

            case 'contact/submit':
                if (req.method === 'POST') {
                    const { name, email, project_type, message } = req.body;
                    const result = await db.query(
                        'INSERT INTO contact_submissions (name, email, project_type, message) VALUES ($1, $2, $3, $4) RETURNING *',
                        [name, email, project_type, message]
                    );
                    return res.status(200).json({ success: true, data: result.rows[0] });
                }
                break;

            default:
                return res.status(404).json({
                    error: 'Not found',
                    path: path,
                    availableEndpoints: ['hero', 'about', 'services', 'projects', 'gallery', 'contact', 'contact/submit']
                });
        }

        return res.status(405).json({ error: 'Method not allowed' });

    } catch (err) {
        console.error('API Error:', err);
        return res.status(500).json({
            error: 'Database error',
            message: err.message,
            code: err.code
        });
    }
}
