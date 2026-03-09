# 🚀 Supabase Deployment Guide

## Mental Health Companion - Complete Deployment Instructions

This guide walks you through deploying the Mental Health Companion app to production using Supabase as your database and backend hosting services.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Set Up Supabase Project](#step-1-set-up-supabase-project)
3. [Step 2: Configure Database](#step-2-configure-database)
4. [Step 3: Deploy Backend](#step-3-deploy-backend)
5. [Step 4: Deploy Frontend](#step-4-deploy-frontend)
6. [Step 5: Verification & Testing](#step-5-verification--testing)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

**You will need accounts on:**
- [Supabase](https://supabase.com) - Free tier available
- [Vercel](https://vercel.com) - For hosting frontend & backend
- [GitHub](https://github.com) - For version control

**Local tools:**
- Node.js v18+ and npm
- Git
- A terminal/command line

---

## Step 1: Set Up Supabase Project

### 1.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Fill in the project details:
   - **Name**: `mental-health-companion` (or your preferred name)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose the closest to your location
4. Click **"Create new project"** and wait ~2 minutes for setup

### 1.2 Get Your Credentials

1. Once your project is ready, go to **Settings → API**
2. Copy these values and save them:
   - **Project URL** → `SUPABASE_URL`
   - **anon (public) key** → `SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_KEY`

Example:
```
SUPABASE_URL=https://abcdefgh.supabase.co
SUPABASE_ANON_KEY=eyJhbGciz...
SUPABASE_SERVICE_KEY=eyJhbGciz...
```

---

## Step 2: Configure Database

### 2.1 Create Database Tables

1. In Supabase Dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Copy the entire contents of [backend/migrations/001_initial_schema.sql](backend/migrations/001_initial_schema.sql)
4. Paste into the SQL Editor
5. Click **"Run"** (or press `Cmd+Enter`)
6. You should see a success message

**Tables created:**
- `users` - Stores user accounts
- `conversations` - Stores chat history
- `mood_entries` - Stores mood tracking data

### 2.2 Verify Tables Were Created

1. Go to the **"Table Editor"** (left sidebar)
2. You should see three tables listed:
   - `users`
   - `conversations`
   - `mood_entries`

If all are there, you're good to go! ✅

---

## Step 3: Deploy Backend

### 3.1 Prepare Repository

1. Push your code to GitHub:
```bash
cd /home/rikyrabha/MentalHealthApp
git init
git add .
git commit -m "Initial commit: Mental Health Companion"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mental-health-companion.git
git push -u origin main
```

### 3.2 Deploy to Vercel

**Option A: Using Vercel CLI (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Navigate to backend folder
cd backend

# Deploy
vercel --prod
```

**Option B: Connect GitHub to Vercel**

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"New Project"**
3. Click **"Import Git Repository"**
4. Select your GitHub repo
5. Configure:
   - **Root Directory**: `backend`
   - **Framework Preset**: `Other`
   - **Build Command**: `npm install`
   - **Output Directory**: `.`
6. Add **Environment Variables**:
   - `SUPABASE_URL`: Your Supabase URL
   - `SUPABASE_ANON_KEY`: Your ANON key
   - `JWT_SECRET`: Generate a random string
   - `USE_SUPABASE`: `true`
7. Click **"Deploy"**

### 3.3 Update Backend Environment

Create `.env` file in backend folder:

```env
USE_SUPABASE=true
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
JWT_SECRET=your-jwt-secret-key-here
PORT=5000
NODE_ENV=production
```

### 3.4 Install Dependencies

```bash
cd backend
npm install
```

This installs `@supabase/supabase-js` and other dependencies.

---

## Step 4: Deploy Frontend

### 4.1 Update API Configuration

Update [frontend/.env](frontend/.env):

```env
REACT_APP_API_URL=https://your-vercel-deployment.vercel.app
```

Replace with your actual Vercel backend URL.

### 4.2 Deploy to Vercel

**Option A: Vercel CLI**

```bash
cd frontend
vercel --prod
```

**Option B: GitHub Connection**

1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Import your GitHub repo again
4. Configure:
   - **Root Directory**: `frontend`
   - **Framework**: `Create React App`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
5. Add **Environment Variables**:
   - `REACT_APP_API_URL`: Your backend Vercel URL
6. Click **"Deploy"**

### 4.3 Update Frontend Environment

Create [frontend/.env.local](frontend/.env.local):

```env
REACT_APP_API_URL=https://your-backend-deployment.vercel.app
```

---

## Step 5: Verification & Testing

### 5.1 Test the Application

1. Open your frontend URL in a browser
2. Create an account (use any nickname)
3. Send a test message
4. Check if you get a response

### 5.2 Verify Database

1. Go to Supabase Dashboard
2. Open **"Table Editor"**
3. Click on `users` table
4. You should see your test user!

### 5.3 Check Backend Logs

**In Vercel:**
1. Go to your backend deployment
2. Click **"Deployments"** → Latest
3. Click **"Logs"** to see API activity

---

## Performance Optimization

### Frontend (Vercel)

- Build optimization happens automatically
- Use `vercel env` for different environments
- Enable **Gzip compression** (automatic)

### Backend (Vercel)

- Use Node.js 18 runtime
- API routes scale automatically
- Monitor usage on Vercel dashboard

### Database (Supabase)

Supabase Free tier includes:
- 500 MB storage
- Up to 2 concurrent connections
- Unlimited API requests (rate limited)

**For production, consider:**
- Upgrading to Pro tier ($25/month)
- Adding replication for backup
- Enabling point-in-time recovery

---

## Environment Variables Summary

### Backend (.env)
```
USE_SUPABASE=true
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJ...
JWT_SECRET=random-long-string
PORT=5000
NODE_ENV=production
```

### Frontend (.env.local)
```
REACT_APP_API_URL=https://backend-url.vercel.app
```

---

## Troubleshooting

### Issue: "Cannot connect to database"

**Solution:**
1. Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correct
2. Check Supabase dashboard is accessible
3. Ensure tables were created (check SQL Editor)

### Issue: "CORS errors"

**Solution:**
1. Backend must use CORS headers
2. Check `cors()` middleware is enabled in `server.js`
3. Verify frontend URL in CORS configuration

### Issue: "Authentication failing"

**Solution:**
1. Check `JWT_SECRET` is set on both frontend and backend
2. Verify token is being sent in request headers
3. Check backend logs for error messages

### Issue: "Database tables not found"

**Solution:**
1. Re-run the SQL migration:
   - Go to SQL Editor → New Query
   - Paste [backend/migrations/001_initial_schema.sql](backend/migrations/001_initial_schema.sql)
   - Click "Run"
2. Verify no errors in SQL output

### Issue: "Vercel deployment fails"

**Solution:**
1. Check build logs in Vercel dashboard
2. Ensure Node.js version is 18+
3. Verify all dependencies in `package.json`
4. Run `npm install` locally first

---

## Local Development

### Test Backend with Supabase

```bash
# 1. Create .env file
cd backend
cp .env.example .env

# 2. Add your Supabase credentials
# Edit .env and set:
# USE_SUPABASE=true
# SUPABASE_URL=...
# SUPABASE_ANON_KEY=...

# 3. Install dependencies
npm install

# 4. Start server
npm run dev
```

### Test Frontend

```bash
cd frontend

# Create .env.local
cp .env.example .env.local

# Update API URL if backend is local:
# REACT_APP_API_URL=http://localhost:5000

# Start development
npm start
```

---

## Production Best Practices

1. **Security**
   - Use strong `JWT_SECRET` (64+ characters)
   - Enable RLS (Row-Level Security) in Supabase
   - Never commit `.env` files
   - Rotate passwords regularly

2. **Monitoring**
   - Enable Supabase error logging
   - Monitor Vercel deployment metrics
   - Set up alerts for failed requests

3. **Scaling**
   - Use Supabase connection pooling
   - Implement caching strategy
   - Consider CDN for frontend assets

4. **Backups**
   - Enable automatic Supabase backups
   - Test restore procedures
   - Keep backups in multiple regions

---

## Support & Resources

- **Supabase Docs**: https://supabase.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Project Repo**: Your GitHub repository
- **Mental Health Resources**: Crisis hotlines in your region

---

## Next Steps

After deployment:

1. ✅ Share the live URL with users
2. ✅ Monitor analytics in Supabase
3. ✅ Collect user feedback
4. ✅ Plan feature enhancements
5. ✅ Set up automated backups

---

*Deployment guide created: March 9, 2026*
*Last updated: March 9, 2026*
