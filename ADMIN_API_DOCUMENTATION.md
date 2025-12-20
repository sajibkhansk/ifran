# Admin API Documentation

## Overview
This is a comprehensive admin API for managing the Dematric Architects database. It provides full CRUD (Create, Read, Update, Delete) operations for all tables.

**Base URL**: `http://localhost:5002/api/admin`

**Note**: No authentication required - all routes are open.

---

## Quick Start

### Start the Admin Server
```bash
npm run admin
```

The admin API will run on **port 5002** (separate from the main API on port 5001).

---

## API Endpoints

### 🏠 Hero Section

#### Get All Hero Records
```http
GET /api/admin/hero
```

#### Get Single Hero Record
```http
GET /api/admin/hero/:id
```

#### Create Hero Record
```http
POST /api/admin/hero
Content-Type: application/json

{
  "company_name": "Dematric Architects",
  "main_title": "Real Reflection",
  "subtitle": "Of Thought.",
  "description": "We don't just design buildings..."
}
```

#### Update Hero Record
```http
PUT /api/admin/hero/:id
Content-Type: application/json

{
  "company_name": "Updated Name",
  "main_title": "Updated Title",
  "subtitle": "Updated Subtitle",
  "description": "Updated description"
}
```

#### Delete Hero Record
```http
DELETE /api/admin/hero/:id
```

---

### 📖 About Section

#### Get All About Records
```http
GET /api/admin/about
```

#### Get Single About Record
```http
GET /api/admin/about/:id
```

#### Create About Record
```http
POST /api/admin/about
Content-Type: application/json

{
  "title": "About Our Company",
  "description": "First paragraph...",
  "description_2": "Second paragraph...",
  "years_of_experience": 15,
  "projects_completed": 250,
  "design_awards": 12,
  "image_url": "https://example.com/image.jpg"
}
```

#### Update About Record
```http
PUT /api/admin/about/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description...",
  "description_2": "Updated second paragraph...",
  "years_of_experience": 20,
  "projects_completed": 300,
  "design_awards": 15,
  "image_url": "https://example.com/new-image.jpg"
}
```

#### Delete About Record
```http
DELETE /api/admin/about/:id
```

---

### 🛠️ Services

#### Get All Services
```http
GET /api/admin/services
```

#### Get Single Service
```http
GET /api/admin/services/:id
```

#### Create Service
```http
POST /api/admin/services
Content-Type: application/json

{
  "icon": "Home",
  "title": "Residential Design",
  "description": "Luxury homes tailored to your lifestyle...",
  "display_order": 1
}
```

**Available Icons**: `Home`, `Building2`, `PencilRuler`, `Layout`

#### Update Service
```http
PUT /api/admin/services/:id
Content-Type: application/json

{
  "icon": "Building2",
  "title": "Updated Service",
  "description": "Updated description...",
  "display_order": 2
}
```

#### Delete Service
```http
DELETE /api/admin/services/:id
```

---

### 🏗️ Projects

#### Get All Projects
```http
GET /api/admin/projects
```

#### Get Single Project
```http
GET /api/admin/projects/:id
```

#### Create Project
```http
POST /api/admin/projects
Content-Type: application/json

{
  "title": "Eco-Luxe Villa",
  "category": "Residential",
  "image_url": "https://example.com/project.jpg",
  "description": "Optional project description",
  "display_order": 1
}
```

**Categories**: `Residential`, `Commercial`, `Interior`, `Masterplan`

#### Update Project
```http
PUT /api/admin/projects/:id
Content-Type: application/json

{
  "title": "Updated Project",
  "category": "Commercial",
  "image_url": "https://example.com/new-image.jpg",
  "description": "Updated description",
  "display_order": 2
}
```

#### Delete Project
```http
DELETE /api/admin/projects/:id
```

---

### 📞 Contact Info

#### Get All Contact Info Records
```http
GET /api/admin/contact-info
```

#### Get Single Contact Info Record
```http
GET /api/admin/contact-info/:id
```

#### Create Contact Info Record
```http
POST /api/admin/contact-info
Content-Type: application/json

{
  "title": "Let's Build Your Vision Together.",
  "subtitle": "Whether you have a specific project...",
  "email": "hello@dematric.com",
  "phone": "+1 (555) 123-4567",
  "address": "123 Design District, NY"
}
```

#### Update Contact Info Record
```http
PUT /api/admin/contact-info/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "subtitle": "Updated subtitle",
  "email": "newemail@dematric.com",
  "phone": "+1 (555) 999-8888",
  "address": "456 New Address"
}
```

#### Delete Contact Info Record
```http
DELETE /api/admin/contact-info/:id
```

---

### 📧 Contact Submissions

#### Get All Contact Submissions
```http
GET /api/admin/contact-submissions
```

#### Get Single Contact Submission
```http
GET /api/admin/contact-submissions/:id
```

#### Create Contact Submission (Manual Entry)
```http
POST /api/admin/contact-submissions
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "project_type": "Residential",
  "message": "I'm interested in building a new home..."
}
```

#### Update Contact Submission
```http
PUT /api/admin/contact-submissions/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "updated@example.com",
  "project_type": "Commercial",
  "message": "Updated message"
}
```

#### Delete Contact Submission
```http
DELETE /api/admin/contact-submissions/:id
```

---

### 🖼️ Gallery (About Section Images)

#### Get All Gallery Images
```http
GET /api/admin/gallery
```

#### Get Single Gallery Image
```http
GET /api/admin/gallery/:id
```

#### Create Gallery Image
```http
POST /api/admin/gallery
Content-Type: application/json

{
  "image_url": "https://example.com/gallery-image.jpg",
  "alt_text": "Beautiful architecture",
  "display_order": 1
}
```

#### Update Gallery Image
```http
PUT /api/admin/gallery/:id
Content-Type: application/json

{
  "image_url": "https://example.com/new-image.jpg",
  "alt_text": "Updated alt text",
  "display_order": 2
}
```

#### Delete Gallery Image
```http
DELETE /api/admin/gallery/:id
```

---

### 🔧 Utility Endpoints

#### Get All Tables
```http
GET /api/admin/tables
```
Returns a list of all database tables.

#### Get Table Schema
```http
GET /api/admin/schema/:table
```
Returns the schema (columns, data types) for a specific table.

Example:
```http
GET /api/admin/schema/hero
```

#### Health Check
```http
GET /api/admin/health
```
Returns the API status.

---

## Testing with cURL

### Example: Get All Services
```bash
curl http://localhost:5002/api/admin/services
```

### Example: Create a New Service
```bash
curl -X POST http://localhost:5002/api/admin/services \
  -H "Content-Type: application/json" \
  -d '{
    "icon": "Home",
    "title": "New Service",
    "description": "This is a new service",
    "display_order": 5
  }'
```

### Example: Update a Service
```bash
curl -X PUT http://localhost:5002/api/admin/services/1 \
  -H "Content-Type: application/json" \
  -d '{
    "icon": "Building2",
    "title": "Updated Service",
    "description": "Updated description",
    "display_order": 1
  }'
```

### Example: Delete a Service
```bash
curl -X DELETE http://localhost:5002/api/admin/services/5
```

---

## Testing with Postman

1. **Import Collection**: Create a new collection in Postman
2. **Set Base URL**: `http://localhost:5002/api/admin`
3. **Create Requests**: Add requests for each endpoint
4. **Test**: Send requests and verify responses

---

## Response Format

### Success Response
```json
{
  "id": 1,
  "field1": "value1",
  "field2": "value2",
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

### Error Response
```json
{
  "error": "Error message here"
}
```

### Delete Response
```json
{
  "message": "Record deleted successfully",
  "data": {
    "id": 1,
    "field1": "value1"
  }
}
```

---

## Database Tables

1. **hero** - Hero section content
2. **about** - About section content
3. **services** - Services/expertise listings
4. **projects** - Portfolio projects
5. **contact_info** - Contact information
6. **contact_submissions** - Form submissions
7. **about_gallery** - Gallery images for About section

---

## Environment Variables

Add to your `.env` file:
```env
DATABASE_URL=your_database_connection_string
ADMIN_PORT=5002
```

---

## Security Note

⚠️ **WARNING**: This API has no authentication. It's designed for internal use only.

**For production**, you should:
1. Add authentication (JWT, API keys, etc.)
2. Add rate limiting
3. Add input validation
4. Use HTTPS
5. Restrict CORS to specific origins
6. Add logging and monitoring

---

## Running Both APIs

You can run both the main API and admin API simultaneously:

```bash
# Terminal 1: Main API (port 5001)
npm run server

# Terminal 2: Admin API (port 5002)
npm run admin

# Terminal 3: Frontend (port 5173)
npm run dev
```

Or use a process manager like `concurrently`:
```bash
npm install --save-dev concurrently
```

Then add to `package.json`:
```json
"scripts": {
  "dev:all": "concurrently \"npm run server\" \"npm run admin\" \"npm run dev\""
}
```

---

## Support

For issues or questions, refer to the main project documentation or contact the development team.
