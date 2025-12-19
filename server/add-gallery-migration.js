import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function addGallery() {
    try {
        console.log('🔄 Adding gallery table...');

        const migration = readFileSync(join(__dirname, 'add-gallery.sql'), 'utf-8');

        await pool.query(migration);

        console.log('✅ Gallery table added successfully!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error adding gallery:', error);
        process.exit(1);
    }
}

addGallery();
