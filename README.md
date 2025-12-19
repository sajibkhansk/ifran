# Dematric Architects Website

A modern, database-driven architecture portfolio website built with React, Vite, and PostgreSQL (NeonDB).

## Features

- 🎨 Modern, premium UI with glassmorphism effects
- 🗄️ Database-driven content management
- 📱 Fully responsive design
- ⚡ Fast performance with Vite
- 🎭 Smooth animations with Framer Motion
- 🌐 RESTful API backend

## Tech Stack

### Frontend
- React 19
- Vite
- Framer Motion
- Lucide React (icons)
- Custom CSS

### Backend
- Node.js
- Express.js
- PostgreSQL (NeonDB)
- dotenv

## Database Schema

The application uses the following tables:
- `hero` - Hero section content
- `about` - About section content
- `services` - Services/expertise listings
- `projects` - Portfolio projects
- `contact_info` - Contact information
- `contact_submissions` - Form submissions

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

The `.env` file is already configured with your NeonDB connection string.

### 3. Initialize Database

Run the database initialization script to create tables and seed data:

```bash
node server/init-db.js
```

### 4. Run the Application

#### Option A: Run Frontend and Backend Separately

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
npm run server
```

#### Option B: Run Both Concurrently

```bash
npm run dev:all
```

### 5. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## API Endpoints

- `GET /api/hero` - Get hero section content
- `GET /api/about` - Get about section content
- `GET /api/services` - Get all services
- `GET /api/projects` - Get all projects
- `GET /api/contact` - Get contact information
- `POST /api/contact/submit` - Submit contact form

## Managing Content

You can manage website content directly in your NeonDB database. Connect to your database using:

```bash
psql 'postgresql://neondb_owner:npg_XNCHe4pqsQ9d@ep-soft-art-a4c5t370-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
```

### Example: Update Hero Content

```sql
UPDATE hero SET 
  main_title = 'Your New Title',
  description = 'Your new description'
WHERE id = 1;
```

### Example: Add a New Service

```sql
INSERT INTO services (icon, title, description, display_order) 
VALUES ('Building2', 'New Service', 'Service description', 5);
```

### Example: Add a New Project

```sql
INSERT INTO projects (title, category, image_url, display_order) 
VALUES ('Project Name', 'Category', 'https://image-url.com', 5);
```

## Project Structure

```
ifran/
├── server/
│   ├── index.js          # Express server
│   ├── init-db.js        # Database initialization
│   └── schema.sql        # Database schema
├── src/
│   ├── api/
│   │   └── client.js     # API client functions
│   ├── assets/           # Images and static files
│   ├── components/       # React components
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── Portfolio.jsx
│   │   └── Services.jsx
│   ├── App.jsx
│   ├── index.css         # Global styles
│   └── main.jsx
├── .env                  # Environment variables
└── package.json
```

## Color Theme

The website uses colors from the Dematric Architects logo:
- Primary (Slate): `#4A5661`
- Secondary (Sage): `#98A393`
- Accent (Vibrant Sage): `#A8C5A0`

## Development

- Frontend runs on port 5173 (Vite default)
- Backend runs on port 5000
- Hot reload enabled for both frontend and backend

## Production Build

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Support

For issues or questions, please check the database connection and ensure all environment variables are properly configured.
