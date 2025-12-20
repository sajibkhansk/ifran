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
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
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
        // URL format: /api/admin/hero or /api/admin/hero/1
        const urlParts = req.url.split('/api/admin/')[1]?.split('?')[0].split('/') || [];
        const table = urlParts[0];
        const id = urlParts[1];

        // Health check
        if (table === 'health') {
            return res.status(200).json({ status: 'ok', message: 'Admin API is running' });
        }

        // Get all tables
        if (table === 'tables') {
            const result = await db.query(`
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_type = 'BASE TABLE'
                ORDER BY table_name
            `);
            return res.status(200).json(result.rows);
        }

        // Get table schema
        if (table === 'schema' && id) {
            const result = await db.query(`
                SELECT column_name, data_type, is_nullable, column_default
                FROM information_schema.columns
                WHERE table_name = $1
                ORDER BY ordinal_position
            `, [id]);
            return res.status(200).json(result.rows);
        }

        // Map friendly names to actual table names
        const tableMap = {
            'hero': 'hero',
            'about': 'about',
            'services': 'services',
            'projects': 'projects',
            'contact-info': 'contact_info',
            'contact-submissions': 'contact_submissions',
            'gallery': 'about_gallery'
        };

        const actualTable = tableMap[table];
        if (!actualTable) {
            return res.status(404).json({ error: 'Table not found' });
        }

        // GET - List all or get single record
        if (req.method === 'GET') {
            if (id) {
                const result = await db.query(`SELECT * FROM ${actualTable} WHERE id = $1`, [id]);
                if (result.rows.length === 0) {
                    return res.status(404).json({ error: 'Record not found' });
                }
                return res.status(200).json(result.rows[0]);
            } else {
                const orderBy = ['services', 'projects', 'about_gallery'].includes(actualTable)
                    ? 'ORDER BY display_order, id'
                    : 'ORDER BY id';
                const result = await db.query(`SELECT * FROM ${actualTable} ${orderBy}`);
                return res.status(200).json(result.rows);
            }
        }

        // POST - Create new record
        if (req.method === 'POST') {
            const data = req.body;
            const columns = Object.keys(data);
            const values = Object.values(data);
            const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');

            const query = `INSERT INTO ${actualTable} (${columns.join(', ')}) VALUES (${placeholders}) RETURNING *`;
            const result = await db.query(query, values);
            return res.status(201).json(result.rows[0]);
        }

        // PUT - Update record
        if (req.method === 'PUT') {
            if (!id) {
                return res.status(400).json({ error: 'ID is required for update' });
            }

            const data = req.body;
            const columns = Object.keys(data);
            const values = Object.values(data);

            const setClause = columns.map((col, i) => `${col} = $${i + 1}`).join(', ');
            const query = `UPDATE ${actualTable} SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $${columns.length + 1} RETURNING *`;

            const result = await db.query(query, [...values, id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Record not found' });
            }
            return res.status(200).json(result.rows[0]);
        }

        // DELETE - Delete record
        if (req.method === 'DELETE') {
            if (!id) {
                return res.status(400).json({ error: 'ID is required for delete' });
            }

            const result = await db.query(`DELETE FROM ${actualTable} WHERE id = $1 RETURNING *`, [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Record not found' });
            }
            return res.status(200).json({
                message: 'Record deleted successfully',
                data: result.rows[0]
            });
        }

        return res.status(405).json({ error: 'Method not allowed' });

    } catch (err) {
        console.error('Admin API Error:', err);
        return res.status(500).json({
            error: 'Database error',
            message: err.message,
            code: err.code
        });
    }
}
