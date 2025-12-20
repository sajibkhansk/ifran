import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.ADMIN_PORT || 5002;

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

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('✅ Admin API - Database connected successfully');
    }
});

// ==================== HERO ROUTES ====================

// Get all hero records
app.get('/api/admin/hero', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM hero ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Get single hero record
app.get('/api/admin/hero/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM hero WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Hero record not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Create hero record
app.post('/api/admin/hero', async (req, res) => {
    try {
        const { company_name, main_title, subtitle, description } = req.body;
        const result = await pool.query(
            'INSERT INTO hero (company_name, main_title, subtitle, description) VALUES ($1, $2, $3, $4) RETURNING *',
            [company_name, main_title, subtitle, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Update hero record
app.put('/api/admin/hero/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { company_name, main_title, subtitle, description } = req.body;
        const result = await pool.query(
            'UPDATE hero SET company_name = $1, main_title = $2, subtitle = $3, description = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
            [company_name, main_title, subtitle, description, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Hero record not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Delete hero record
app.delete('/api/admin/hero/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM hero WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Hero record not found' });
        }
        res.json({ message: 'Hero record deleted successfully', data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// ==================== ABOUT ROUTES ====================

// Get all about records
app.get('/api/admin/about', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM about ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Get single about record
app.get('/api/admin/about/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM about WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'About record not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Create about record
app.post('/api/admin/about', async (req, res) => {
    try {
        const { title, description, description_2, years_of_experience, projects_completed, design_awards, image_url } = req.body;
        const result = await pool.query(
            'INSERT INTO about (title, description, description_2, years_of_experience, projects_completed, design_awards, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [title, description, description_2, years_of_experience, projects_completed, design_awards, image_url]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Update about record
app.put('/api/admin/about/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, description_2, years_of_experience, projects_completed, design_awards, image_url } = req.body;
        const result = await pool.query(
            'UPDATE about SET title = $1, description = $2, description_2 = $3, years_of_experience = $4, projects_completed = $5, design_awards = $6, image_url = $7, updated_at = CURRENT_TIMESTAMP WHERE id = $8 RETURNING *',
            [title, description, description_2, years_of_experience, projects_completed, design_awards, image_url, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'About record not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Delete about record
app.delete('/api/admin/about/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM about WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'About record not found' });
        }
        res.json({ message: 'About record deleted successfully', data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// ==================== SERVICES ROUTES ====================

// Get all services
app.get('/api/admin/services', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM services ORDER BY display_order, id');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Get single service
app.get('/api/admin/services/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM services WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Service not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Create service
app.post('/api/admin/services', async (req, res) => {
    try {
        const { icon, title, description, display_order } = req.body;
        const result = await pool.query(
            'INSERT INTO services (icon, title, description, display_order) VALUES ($1, $2, $3, $4) RETURNING *',
            [icon, title, description, display_order || 0]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Update service
app.put('/api/admin/services/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { icon, title, description, display_order } = req.body;
        const result = await pool.query(
            'UPDATE services SET icon = $1, title = $2, description = $3, display_order = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
            [icon, title, description, display_order, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Service not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Delete service
app.delete('/api/admin/services/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM services WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Service not found' });
        }
        res.json({ message: 'Service deleted successfully', data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// ==================== PROJECTS ROUTES ====================

// Get all projects
app.get('/api/admin/projects', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM projects ORDER BY display_order, id');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Get single project
app.get('/api/admin/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Create project
app.post('/api/admin/projects', async (req, res) => {
    try {
        const { title, category, image_url, description, display_order } = req.body;
        const result = await pool.query(
            'INSERT INTO projects (title, category, image_url, description, display_order) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, category, image_url, description, display_order || 0]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Update project
app.put('/api/admin/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, category, image_url, description, display_order } = req.body;
        const result = await pool.query(
            'UPDATE projects SET title = $1, category = $2, image_url = $3, description = $4, display_order = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
            [title, category, image_url, description, display_order, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Delete project
app.delete('/api/admin/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully', data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// ==================== CONTACT INFO ROUTES ====================

// Get all contact info records
app.get('/api/admin/contact-info', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM contact_info ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Get single contact info record
app.get('/api/admin/contact-info/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM contact_info WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Contact info not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Create contact info record
app.post('/api/admin/contact-info', async (req, res) => {
    try {
        const { title, subtitle, email, phone, address } = req.body;
        const result = await pool.query(
            'INSERT INTO contact_info (title, subtitle, email, phone, address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, subtitle, email, phone, address]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Update contact info record
app.put('/api/admin/contact-info/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, subtitle, email, phone, address } = req.body;
        const result = await pool.query(
            'UPDATE contact_info SET title = $1, subtitle = $2, email = $3, phone = $4, address = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
            [title, subtitle, email, phone, address, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Contact info not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Delete contact info record
app.delete('/api/admin/contact-info/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM contact_info WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Contact info not found' });
        }
        res.json({ message: 'Contact info deleted successfully', data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// ==================== CONTACT SUBMISSIONS ROUTES ====================

// Get all contact submissions
app.get('/api/admin/contact-submissions', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM contact_submissions ORDER BY submitted_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Get single contact submission
app.get('/api/admin/contact-submissions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM contact_submissions WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Contact submission not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Create contact submission (manual entry)
app.post('/api/admin/contact-submissions', async (req, res) => {
    try {
        const { name, email, project_type, message } = req.body;
        const result = await pool.query(
            'INSERT INTO contact_submissions (name, email, project_type, message) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, project_type, message]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Update contact submission
app.put('/api/admin/contact-submissions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, project_type, message } = req.body;
        const result = await pool.query(
            'UPDATE contact_submissions SET name = $1, email = $2, project_type = $3, message = $4 WHERE id = $5 RETURNING *',
            [name, email, project_type, message, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Contact submission not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Delete contact submission
app.delete('/api/admin/contact-submissions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM contact_submissions WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Contact submission not found' });
        }
        res.json({ message: 'Contact submission deleted successfully', data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// ==================== GALLERY ROUTES ====================

// Get all gallery images
app.get('/api/admin/gallery', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM about_gallery ORDER BY display_order, id');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Get single gallery image
app.get('/api/admin/gallery/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM about_gallery WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Gallery image not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Create gallery image
app.post('/api/admin/gallery', async (req, res) => {
    try {
        const { image_url, alt_text, display_order } = req.body;
        const result = await pool.query(
            'INSERT INTO about_gallery (image_url, alt_text, display_order) VALUES ($1, $2, $3) RETURNING *',
            [image_url, alt_text, display_order || 0]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Update gallery image
app.put('/api/admin/gallery/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { image_url, alt_text, display_order } = req.body;
        const result = await pool.query(
            'UPDATE about_gallery SET image_url = $1, alt_text = $2, display_order = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
            [image_url, alt_text, display_order, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Gallery image not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Delete gallery image
app.delete('/api/admin/gallery/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM about_gallery WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Gallery image not found' });
        }
        res.json({ message: 'Gallery image deleted successfully', data: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// ==================== UTILITY ROUTES ====================

// Get all tables info
app.get('/api/admin/tables', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_type = 'BASE TABLE'
            ORDER BY table_name
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Get table schema
app.get('/api/admin/schema/:table', async (req, res) => {
    try {
        const { table } = req.params;
        const result = await pool.query(`
            SELECT column_name, data_type, is_nullable, column_default
            FROM information_schema.columns
            WHERE table_name = $1
            ORDER BY ordinal_position
        `, [table]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Health check
app.get('/api/admin/health', (req, res) => {
    res.json({ status: 'ok', message: 'Admin API is running' });
});

app.listen(PORT, () => {
    console.log(`🔧 Admin API running on http://localhost:${PORT}`);
    console.log(`📝 Access admin routes at http://localhost:${PORT}/api/admin/`);
});
