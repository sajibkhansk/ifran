# Admin API Deployment Guide

## 🚀 Deploying Admin API to Vercel

The admin API has been configured to deploy alongside your main application to Vercel.

---

## 📋 What's Been Set Up

### 1. Serverless Function
- **File**: `api/admin.js`
- **Route**: `/api/admin/*`
- **Methods**: GET, POST, PUT, DELETE
- **CORS**: Enabled for all origins

### 2. Vercel Configuration
- **File**: `vercel.json`
- **Admin Routes**: `/api/admin/:path*` → `/api/admin`
- **Main Routes**: `/api/:path*` → `/api/index`

---

## 🌐 Production URLs

After deployment, your admin API will be available at:

```
https://your-app.vercel.app/api/admin/{endpoint}
```

### Example URLs:
- `https://your-app.vercel.app/api/admin/health`
- `https://your-app.vercel.app/api/admin/services`
- `https://your-app.vercel.app/api/admin/projects`
- `https://your-app.vercel.app/api/admin/hero`

---

## 📝 Deployment Steps

### Option 1: Deploy via GitHub (Recommended)

1. **Commit and push your changes:**
   ```bash
   git add .
   git commit -m "Add admin API for deployment"
   git push
   ```

2. **Vercel will automatically deploy** (if already connected)
   - Go to https://vercel.com/dashboard
   - Check deployment status
   - Wait for deployment to complete

3. **Test the admin API:**
   ```bash
   curl https://your-app.vercel.app/api/admin/health
   ```

### Option 2: Deploy via Vercel CLI

```bash
# Make sure you're in the project directory
cd /Users/pathaoltd/ifran

# Deploy to production
vercel --prod

# Test the deployment
curl https://your-app.vercel.app/api/admin/health
```

---

## 🧪 Testing Production Admin API

### Health Check
```bash
curl https://your-app.vercel.app/api/admin/health
```

Expected response:
```json
{"status":"ok","message":"Admin API is running"}
```

### Get All Services
```bash
curl https://your-app.vercel.app/api/admin/services
```

### Create New Service
```bash
curl -X POST https://your-app.vercel.app/api/admin/services \
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
curl -X PUT https://your-app.vercel.app/api/admin/services/1 \
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
curl -X DELETE https://your-app.vercel.app/api/admin/services/5
```

---

## 📊 Available Endpoints (Production)

All endpoints follow this pattern:
```
https://your-app.vercel.app/api/admin/{table}
https://your-app.vercel.app/api/admin/{table}/{id}
```

### Tables:
- `/api/admin/hero`
- `/api/admin/about`
- `/api/admin/services`
- `/api/admin/projects`
- `/api/admin/contact-info`
- `/api/admin/contact-submissions`
- `/api/admin/gallery`

### Utilities:
- `/api/admin/health` - Health check
- `/api/admin/tables` - List all tables
- `/api/admin/schema/{table}` - Get table schema

---

## 🔐 Environment Variables

Make sure `DATABASE_URL` is set in Vercel:

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Verify `DATABASE_URL` is set:
   ```
   DATABASE_URL = postgresql://neondb_owner:npg_XNCHe4pqsQ9d@ep-soft-art-a4c5t370-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

---

## 📱 Update Postman Collection

After deployment, update your Postman collection:

1. **Duplicate the collection**
2. **Rename** to "Dematric Architects - Admin API (Production)"
3. **Replace all URLs**:
   - From: `http://localhost:5002/api/admin`
   - To: `https://your-app.vercel.app/api/admin`

---

## 🎯 Differences: Local vs Production

| Feature | Local | Production |
|---------|-------|------------|
| **Base URL** | `http://localhost:5002` | `https://your-app.vercel.app` |
| **Server Type** | Express.js | Vercel Serverless |
| **Port** | 5002 | N/A (HTTPS) |
| **CORS** | All origins | All origins |
| **Database** | Same NeonDB | Same NeonDB |

---

## ⚠️ Important Security Notes

### Current Setup (Development)
- ✅ No authentication
- ✅ CORS enabled for all origins
- ✅ All HTTP methods allowed

### For Production (Recommended)
Before making this public, you should:

1. **Add Authentication**
   ```javascript
   // Example: API Key authentication
   const apiKey = req.headers['x-api-key'];
   if (apiKey !== process.env.ADMIN_API_KEY) {
       return res.status(401).json({ error: 'Unauthorized' });
   }
   ```

2. **Restrict CORS**
   ```javascript
   res.setHeader('Access-Control-Allow-Origin', 'https://your-admin-panel.com');
   ```

3. **Add Rate Limiting**
   - Use Vercel's built-in rate limiting
   - Or implement custom rate limiting

4. **Add Input Validation**
   - Validate all input data
   - Sanitize SQL inputs (already using parameterized queries)

5. **Add Logging**
   - Log all admin actions
   - Monitor for suspicious activity

---

## 🔧 Troubleshooting

### Admin API not working
1. Check Vercel deployment logs
2. Verify `DATABASE_URL` environment variable
3. Test with health endpoint: `/api/admin/health`

### CORS errors
- Admin API has CORS enabled for all origins
- Check browser console for specific errors

### Database connection issues
- Verify NeonDB is accessible
- Check DATABASE_URL format
- Review Vercel Function logs

---

## 📈 Monitoring

### Vercel Dashboard
1. Go to your project in Vercel
2. Click **Functions** tab
3. Monitor `/api/admin` function
4. Check logs for errors

### Database Monitoring
1. Go to NeonDB dashboard
2. Check connection count
3. Monitor query performance

---

## 🚀 Quick Deploy Commands

```bash
# 1. Commit changes
git add .
git commit -m "Deploy admin API to production"

# 2. Push to GitHub
git push

# 3. Vercel auto-deploys

# 4. Test production API
curl https://dematricarchitects.vercel.app/api/admin/health
```

---

## 📖 Next Steps

1. ✅ Deploy to Vercel
2. ✅ Test all endpoints in production
3. ✅ Update Postman collection with production URLs
4. ⚠️ Add authentication (recommended)
5. ⚠️ Restrict CORS (recommended)
6. ⚠️ Add rate limiting (recommended)

---

## 🌐 Your Deployed URLs

Based on your existing deployment:

- **Frontend**: https://dematricarchitects.vercel.app
- **Main API**: https://dematricarchitects.vercel.app/api/*
- **Admin API**: https://dematricarchitects.vercel.app/api/admin/*

---

## 📞 Support

For deployment issues:
1. Check Vercel deployment logs
2. Review browser console
3. Test with health endpoint
4. Check database connection

---

**Ready to deploy! 🚀**
