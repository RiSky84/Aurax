# 🚀 Quick Supabase Deployment Checklist

Complete this checklist to deploy your Mental Health Companion app to production.

## Pre-Deployment

- [ ] Have accounts created:
  - [ ] Supabase
  - [ ] Vercel
  - [ ] GitHub

- [ ] Code is ready:
  - [ ] All changes committed
  - [ ] Tests passing locally
  - [ ] No hardcoded credentials

## Supabase Setup (10 minutes)

- [ ] Create new Supabase project
- [ ] Copy project credentials:
  - [ ] `SUPABASE_URL`
  - [ ] `SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_KEY`

- [ ] Run database migration:
  - [ ] Open SQL Editor
  - [ ] Paste `backend/migrations/001_initial_schema.sql`
  - [ ] Run query
  - [ ] Verify 3 tables created (users, conversations, mood_entries)

## Backend Deployment (5 minutes)

- [ ] Prepare `.env` file with:
  ```
  USE_SUPABASE=true
  SUPABASE_URL=...
  SUPABASE_ANON_KEY=...
  SUPABASE_SERVICE_KEY=...
  JWT_SECRET=... (generate random)
  NODE_ENV=production
  PORT=5000
  ```

- [ ] Deploy to Vercel:
  - [ ] Option A: Use `vercel deploy --prod`
  - [ ] Option B: Connect GitHub repo to Vercel
  - [ ] Add environment variables in Vercel dashboard
  - [ ] Note backend URL (e.g., `https://backend-xyz.vercel.app`)

- [ ] Verify backend:
  - [ ] Backend URL is accessible
  - [ ] Check Vercel logs for errors
  - [ ] Test API endpoint: `https://backend-url/api/auth/register`

## Frontend Deployment (5 minutes)

- [ ] Create `.env.local` with:
  ```
  REACT_APP_API_URL=https://your-backend-url.vercel.app
  ```

- [ ] Build locally to test:
  ```bash
  cd frontend
  npm run build
  # Should complete without errors
  ```

- [ ] Deploy to Vercel:
  - [ ] Option A: Use `vercel deploy --prod`
  - [ ] Option B: Connect GitHub repo to Vercel
  - [ ] Set build command: `npm run build`
  - [ ] Set output directory: `build`
  - [ ] Add environment variables
  - [ ] Note frontend URL (e.g., `https://frontend-xyz.vercel.app`)

## Post-Deployment Verification

- [ ] Frontend loads in browser ✅
- [ ] Can create account with nickname
- [ ] Can send chat message ✅
- [ ] Get AI response
- [ ] User appears in Supabase users table ✅
- [ ] Message logged in Supabase conversations table ✅
- [ ] Mood entry saved to database ✅
- [ ] Dashboard shows analytics ✅

## Optional: Custom Domain

- [ ] Purchase domain (Vercel, Google Domains, etc.)
- [ ] Connect to Vercel project
- [ ] Update frontend `.env.local` with custom URL
- [ ] Test with custom domain

## Production Hardening (Recommended)

- [ ] Review security settings:
  - [ ] JWT_SECRET is strong (64+ characters)
  - [ ] Database backups enabled in Supabase
  - [ ] RLS policies configured

- [ ] Set up monitoring:
  - [ ] Enable error tracking
  - [ ] Set up uptime monitoring
  - [ ] Create alerts for high error rates

- [ ] Document for team:
  - [ ] Environment variables documented
  - [ ] Deployment process written down
  - [ ] Rollback procedure ready

## Maintenance

- [ ] Regular backups (weekly minimum)
- [ ] Monitor costs:
  - [ ] Vercel bandwidth usage
  - [ ] Supabase storage/compute
- [ ] Security updates (check weekly)
- [ ] Performance monitoring (check monthly)

## Rollback Plan (If Needed)

- [ ] Previous Vercel deployment available
- [ ] Database backup exists
- [ ] Know how to revert to previous version

## Live! 🎉

Your app is now live and accessible to users!

### Share Your App

- [ ] Send frontend URL to users
- [ ] Create documentation/user guide
- [ ] Set up feedback mechanism
- [ ] Monitor for issues

---

## Time Estimate

- Supabase setup: **10 minutes**
- Backend deployment: **5 minutes**
- Frontend deployment: **5 minutes**
- Testing: **5 minutes**
- **Total: ~25 minutes**

## Common Issues & Quick Fixes

| Issue | Fix |
|-------|-----|
| CORS error | Check backend CORS configuration |
| Auth fails | Verify JWT_SECRET matches both apps |
| Database not found | Re-run SQL migration in Supabase |
| Frontend blank | Check REACT_APP_API_URL in .env.local |
| Vercel build fails | Ensure Node modules installed locally |

---

**Need help?** See [SUPABASE_DEPLOYMENT.md](SUPABASE_DEPLOYMENT.md) for detailed instructions.

*Checklist created: March 9, 2026*
