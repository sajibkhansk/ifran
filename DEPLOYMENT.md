# Deployment Guide - Dematric Architects Website

## Prerequisites
- GitHub account
- Vercel account (sign up at vercel.com)
- Git installed locally

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `dematric-architects` (or your preferred name)
3. Description: `Modern architecture portfolio website with database integration`
4. Choose: **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license
6. Click **Create repository**

## Step 2: Push Code to GitHub

Run these commands in your terminal:

```bash
# Initialize git (if not already initialized)
cd /Users/pathaoltd/ifran
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Dematric Architects website with database integration"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/dematric-architects.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Select your GitHub repository: `dematric-architects`
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. **Add Environment Variables**:
   Click **Environment Variables** and add:
   ```
   DATABASE_URL = postgresql://neondb_owner:npg_XNCHe4pqsQ9d@ep-soft-art-a4c5t370-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

6. Click **Deploy**

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name? dematric-architects
# - Directory? ./
# - Override settings? No

# Add environment variable
vercel env add DATABASE_URL
# Paste: postgresql://neondb_owner:npg_XNCHe4pqsQ9d@ep-soft-art-a4c5t370-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
# Select: Production

# Deploy to production
vercel --prod
```

## Step 4: Verify Deployment

1. Visit your Vercel deployment URL (e.g., `https://dematric-architects.vercel.app`)
2. Check that:
   - ✅ Homepage loads correctly
   - ✅ All sections display (Hero, About, Services, Portfolio, Contact)
   - ✅ Carousel in About section works
   - ✅ Contact form submits successfully
   - ✅ All data loads from database

## Environment Variables

### Production (Vercel)
Set in Vercel Dashboard → Project Settings → Environment Variables:
```
DATABASE_URL = postgresql://neondb_owner:npg_XNCHe4pqsQ9d@ep-soft-art-a4c5t370-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### Development (Local)
Already configured in `.env` file

## Project Structure

```
ifran/
├── api/                    # Serverless API functions for Vercel
│   └── index.js           # Main API handler
├── server/                # Local development server
│   ├── index.js          # Express server
│   ├── schema.sql        # Database schema
│   └── init-db.js        # Database initialization
├── src/                   # Frontend React app
│   ├── api/
│   │   └── client.js     # API client
│   ├── components/       # React components
│   └── assets/           # Images and static files
├── vercel.json           # Vercel configuration
└── package.json          # Dependencies and scripts
```

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (usually 24-48 hours)

## Troubleshooting

### API not working
- Check environment variables are set in Vercel
- Check Vercel Functions logs in Dashboard

### Database connection issues
- Verify DATABASE_URL is correct
- Check NeonDB is accessible
- Review Vercel Function logs

### Build failures
- Check build logs in Vercel Dashboard
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility

## Updating the Deployment

```bash
# Make changes to your code
git add .
git commit -m "Your commit message"
git push

# Vercel will automatically deploy the changes
```

## Support

For issues:
1. Check Vercel deployment logs
2. Review browser console for errors
3. Check database connection in Vercel Functions

## URLs

- **GitHub Repository**: https://github.com/YOUR_USERNAME/dematric-architects
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Production URL**: Will be provided after deployment
