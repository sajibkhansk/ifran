# 🎉 Admin Backend - Complete Setup

## ✅ What's Been Created

I've built a **complete admin backend API** for your Dematric Architects website that allows you to manage all database tables without authentication.

### 📁 New Files Created

1. **`server/admin.js`** - Main admin API server with full CRUD operations
2. **`ADMIN_API_DOCUMENTATION.md`** - Complete API documentation
3. **`ADMIN_QUICK_REFERENCE.md`** - Quick reference guide
4. **`postman_collection.json`** - Postman collection for testing

### 🔧 Modified Files

1. **`package.json`** - Added `admin` script
2. **`.env`** - Added `ADMIN_PORT=5002`

---

## 🚀 How to Use

### Start the Admin API
```bash
npm run admin
```

The admin API will be available at: **http://localhost:5002**

### Run Everything Together
```bash
npm run dev:all
```

This starts:
- **Frontend** on port 5173
- **Main API** on port 5001
- **Admin API** on port 5002

---

## 📊 Available Tables & Operations

All tables support **full CRUD** (Create, Read, Update, Delete):

### 1. **Hero Section** (`/api/admin/hero`)
- Manage hero section content (title, subtitle, description)

### 2. **About Section** (`/api/admin/about`)
- Manage about content, stats, and images

### 3. **Services** (`/api/admin/services`)
- Add, edit, delete services
- Control display order

### 4. **Projects** (`/api/admin/projects`)
- Manage portfolio projects
- Categories: Residential, Commercial, Interior, Masterplan

### 5. **Contact Info** (`/api/admin/contact-info`)
- Update contact details (email, phone, address)

### 6. **Contact Submissions** (`/api/admin/contact-submissions`)
- View and manage form submissions from users

### 7. **Gallery** (`/api/admin/gallery`)
- Manage gallery images for About section

---

## 🧪 Quick Test

Test if the API is working:

```bash
# Health check
curl http://localhost:5002/api/admin/health

# Get all services
curl http://localhost:5002/api/admin/services

# Get all tables
curl http://localhost:5002/api/admin/tables
```

---

## 📝 Example Operations

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

### Update Service
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

### Delete Service
```bash
curl -X DELETE http://localhost:5002/api/admin/services/5
```

---

## 🛠️ Testing Tools

### Option 1: Postman (Recommended)
1. Open Postman
2. Import `postman_collection.json`
3. All endpoints are pre-configured!

### Option 2: cURL (Command Line)
Use the examples in `ADMIN_QUICK_REFERENCE.md`

### Option 3: Browser Extensions
- Thunder Client (VS Code)
- REST Client (VS Code)

---

## 📖 Full Documentation

For complete details on all endpoints, request/response formats, and examples:

👉 **See `ADMIN_API_DOCUMENTATION.md`**

For quick commands and common use cases:

👉 **See `ADMIN_QUICK_REFERENCE.md`**

---

## 🌐 API Endpoints Summary

### Hero
- `GET /api/admin/hero` - List all
- `POST /api/admin/hero` - Create
- `PUT /api/admin/hero/:id` - Update
- `DELETE /api/admin/hero/:id` - Delete

### Services
- `GET /api/admin/services` - List all
- `POST /api/admin/services` - Create
- `PUT /api/admin/services/:id` - Update
- `DELETE /api/admin/services/:id` - Delete

### Projects
- `GET /api/admin/projects` - List all
- `POST /api/admin/projects` - Create
- `PUT /api/admin/projects/:id` - Update
- `DELETE /api/admin/projects/:id` - Delete

### Contact Info
- `GET /api/admin/contact-info` - List all
- `PUT /api/admin/contact-info/:id` - Update

### Contact Submissions
- `GET /api/admin/contact-submissions` - List all
- `DELETE /api/admin/contact-submissions/:id` - Delete

### Gallery
- `GET /api/admin/gallery` - List all
- `POST /api/admin/gallery` - Create
- `PUT /api/admin/gallery/:id` - Update
- `DELETE /api/admin/gallery/:id` - Delete

### Utilities
- `GET /api/admin/health` - Health check
- `GET /api/admin/tables` - List all tables
- `GET /api/admin/schema/:table` - Get table schema

---

## ⚠️ Important Notes

1. **No Authentication**: All routes are open - **use only in development**
2. **Port 5002**: Admin API runs separately from main API (port 5001)
3. **CORS Enabled**: All origins allowed for development
4. **Auto-timestamps**: `created_at` and `updated_at` are automatic

---

## 🎯 What You Can Do Now

✅ **View all data** in any table  
✅ **Create new records** (services, projects, etc.)  
✅ **Update existing records** (change titles, descriptions, etc.)  
✅ **Delete records** you don't need  
✅ **Manage display order** for services and projects  
✅ **View contact form submissions**  
✅ **Update contact information**  

---

## 🔐 For Production

Before deploying to production, you should:

1. ✅ Add authentication (JWT, API keys, etc.)
2. ✅ Add rate limiting
3. ✅ Add input validation
4. ✅ Use HTTPS
5. ✅ Restrict CORS to specific origins
6. ✅ Add logging and monitoring
7. ✅ Add request validation middleware

---

## 🚀 Next Steps

1. **Start the admin API**: `npm run admin`
2. **Test the endpoints**: Use cURL or Postman
3. **Import Postman collection**: `postman_collection.json`
4. **Read the docs**: `ADMIN_API_DOCUMENTATION.md`

---

## 📞 Support

All endpoints are documented with examples. If you need help:

1. Check `ADMIN_API_DOCUMENTATION.md` for detailed docs
2. Check `ADMIN_QUICK_REFERENCE.md` for quick commands
3. Import `postman_collection.json` for easy testing

---

**Happy coding! 🎉**
