# Admin Backend - Quick Reference

## 🚀 Start the Admin Server

```bash
npm run admin
```

The admin API will be available at: **http://localhost:5002**

---

## 📋 All Available Endpoints

### Hero Section
- `GET    /api/admin/hero` - Get all hero records
- `GET    /api/admin/hero/:id` - Get single hero record
- `POST   /api/admin/hero` - Create hero record
- `PUT    /api/admin/hero/:id` - Update hero record
- `DELETE /api/admin/hero/:id` - Delete hero record

### About Section
- `GET    /api/admin/about` - Get all about records
- `GET    /api/admin/about/:id` - Get single about record
- `POST   /api/admin/about` - Create about record
- `PUT    /api/admin/about/:id` - Update about record
- `DELETE /api/admin/about/:id` - Delete about record

### Services
- `GET    /api/admin/services` - Get all services
- `GET    /api/admin/services/:id` - Get single service
- `POST   /api/admin/services` - Create service
- `PUT    /api/admin/services/:id` - Update service
- `DELETE /api/admin/services/:id` - Delete service

### Projects
- `GET    /api/admin/projects` - Get all projects
- `GET    /api/admin/projects/:id` - Get single project
- `POST   /api/admin/projects` - Create project
- `PUT    /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project

### Contact Info
- `GET    /api/admin/contact-info` - Get all contact info
- `GET    /api/admin/contact-info/:id` - Get single contact info
- `POST   /api/admin/contact-info` - Create contact info
- `PUT    /api/admin/contact-info/:id` - Update contact info
- `DELETE /api/admin/contact-info/:id` - Delete contact info

### Contact Submissions
- `GET    /api/admin/contact-submissions` - Get all submissions
- `GET    /api/admin/contact-submissions/:id` - Get single submission
- `POST   /api/admin/contact-submissions` - Create submission
- `PUT    /api/admin/contact-submissions/:id` - Update submission
- `DELETE /api/admin/contact-submissions/:id` - Delete submission

### Gallery
- `GET    /api/admin/gallery` - Get all gallery images
- `GET    /api/admin/gallery/:id` - Get single gallery image
- `POST   /api/admin/gallery` - Create gallery image
- `PUT    /api/admin/gallery/:id` - Update gallery image
- `DELETE /api/admin/gallery/:id` - Delete gallery image

### Utilities
- `GET /api/admin/tables` - List all database tables
- `GET /api/admin/schema/:table` - Get table schema
- `GET /api/admin/health` - Health check

---

## 🧪 Quick Test Commands

### Test Health
```bash
curl http://localhost:5002/api/admin/health
```

### Get All Services
```bash
curl http://localhost:5002/api/admin/services
```

### Create New Service
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

### Update Service (ID 1)
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

### Delete Service (ID 5)
```bash
curl -X DELETE http://localhost:5002/api/admin/services/5
```

---

## 🎯 Common Use Cases

### 1. Update Hero Title
```bash
curl -X PUT http://localhost:5002/api/admin/hero/1 \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "Dematric Architects",
    "main_title": "New Title",
    "subtitle": "New Subtitle",
    "description": "New description"
  }'
```

### 2. Add New Project
```bash
curl -X POST http://localhost:5002/api/admin/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Modern Office Complex",
    "category": "Commercial",
    "image_url": "https://example.com/image.jpg",
    "description": "A stunning modern office",
    "display_order": 5
  }'
```

### 3. View All Contact Submissions
```bash
curl http://localhost:5002/api/admin/contact-submissions
```

### 4. Update Contact Information
```bash
curl -X PUT http://localhost:5002/api/admin/contact-info/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Get In Touch",
    "subtitle": "We would love to hear from you",
    "email": "contact@dematric.com",
    "phone": "+1 (555) 123-4567",
    "address": "123 Design Street, NY"
  }'
```

---

## 🔄 Running All Services

### Option 1: Run All Together
```bash
npm run dev:all
```
This starts:
- Frontend (port 5173)
- Main API (port 5001)
- Admin API (port 5002)

### Option 2: Run Separately
```bash
# Terminal 1
npm run dev

# Terminal 2
npm run server

# Terminal 3
npm run admin
```

---

## 📊 Database Tables

1. **hero** - Hero section (company name, title, subtitle)
2. **about** - About section (description, stats, image)
3. **services** - Services list (icon, title, description)
4. **projects** - Portfolio projects (title, category, image)
5. **contact_info** - Contact details (email, phone, address)
6. **contact_submissions** - Form submissions from users
7. **about_gallery** - Gallery images for About section

---

## 🛠️ Tools for Testing

### Browser-Based
- **Postman** - https://www.postman.com/
- **Insomnia** - https://insomnia.rest/
- **Thunder Client** (VS Code Extension)

### Command Line
- **curl** (built-in on Mac/Linux)
- **httpie** - `brew install httpie`

---

## ⚠️ Important Notes

1. **No Authentication**: All routes are open - use only in development
2. **Port 5002**: Admin API runs on a different port than main API
3. **CORS Enabled**: All origins allowed for development
4. **Auto-timestamps**: `created_at` and `updated_at` are automatic
5. **Display Order**: Use `display_order` field to control item ordering

---

## 📖 Full Documentation

For complete API documentation with all request/response examples, see:
**ADMIN_API_DOCUMENTATION.md**
