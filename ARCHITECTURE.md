# 🏗️ Supabase Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (React)                         │
│              deployed on Vercel/Netlify/AWS                  │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  - Auth Component (Register/Login)                   │   │
│  │  - Chat Component (AI responses)                     │   │
│  │  - Mood Tracker (Daily tracking)                     │   │
│  │  - Dashboard (Analytics)                             │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  REACT_APP_API_URL = https://api.your-domain.com            │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTPS Requests
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              BACKEND (Express.js)                            │
│           deployed on Vercel/Railway/Render                  │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  server.js - Selects database based on env vars      │   │
│  │                                                       │   │
│  │  ├─ IF USE_SUPABASE = false                          │   │
│  │  │  └─ Use: db.js (in-memory storage)                │   │
│  │  │     Perfect for: Development/Testing              │   │
│  │  │                                                    │   │
│  │  └─ IF USE_SUPABASE = true                           │   │
│  │     └─ Use: db-supabase.js (@supabase/supabase-js)  │   │
│  │        Perfect for: Production                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  Routes:                                                      │
│  - /api/auth (register, login)                              │
│  - /api/chat (send messages, get history)                  │
│  - /api/mood (track mood, analytics)                       │
│  - /api/analytics (dashboard data)                         │
└──────────────────────┬──────────────────────────────────────┘
                       │ REST API
                       ▼
┌─────────────────────────────────────────────────────────────┐
│          SUPABASE (PostgreSQL + Auth)                        │
│         Self-managed or Supabase Cloud                       │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  PostgreSQL Database                                 │   │
│  │                                                       │   │
│  │  Tables:                                              │   │
│  │  - users (authentication & profiles)                 │   │
│  │  - conversations (chat history)                      │   │
│  │  - mood_entries (mood tracking data)                 │   │
│  │                                                       │   │
│  │  Features:                                            │   │
│  │  - Row-Level Security (RLS)                          │   │
│  │  - Automatic backups                                 │   │
│  │  - Point-in-time recovery                            │   │
│  │  - Real-time capabilities (optional)                 │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow Examples

### Example 1: User Registration

```
1. User enters username, email, password in frontend
   └─ Frontend validates input
   
2. POST /api/auth/register
   └─ Sent to Express backend
   
3. Backend checks if user exists
   └─ global.db.User.findOne({ email })
   
4. If Supabase enabled:
   ├─ Query sent to Supabase
   └─ Supabase checks PostgreSQL
   
5. Create new user
   └─ global.db.User.create({ username, email, password })
   
6. If Supabase enabled:
   ├─ Data inserted into users table
   ├─ Password automatically hashed (bcrypt)
   └─ Timestamps set (created_at, updated_at)
   
7. Returns JWT token
   └─ Token stored in frontend localStorage
```

### Example 2: Saving Mood Entry

```
1. User selects mood (1-5) + emotion + activities
   └─ Frontend collects data
   
2. POST /api/mood/entry
   └─ Sent with userId, moodScore, emotion, etc.
   
3. Backend creates mood entry
   └─ global.db.MoodEntry.create({ userId, moodScore, ... })
   
4. If Supabase enabled:
   ├─ Data formatted for PostgreSQL
   │  └─ mood_score, created_at, etc.
   ├─ Inserted into mood_entries table
   └─ Automatically indexed for fast queries
   
5. Returns success response
   └─ Frontend shows confirmation
```

### Example 3: Fetching Dashboard Analytics

```
1. Dashboard component mounts
   └─ Requests analytics for last 30 days
   
2. GET /api/analytics/dashboard/:userId
   └─ Sent to backend
   
3. Backend queries conversations and mood_entries
   ├─ global.db.Conversation.find({ userId, startedAt: {...} })
   └─ global.db.MoodEntry.find({ userId, date: {...} })
   
4. If Supabase enabled:
   ├─ Queries run on PostgreSQL
   ├─ Indexes used for performance
   ├─ Results aggregated
   └─ Returned to backend
   
5. Backend processes data
   ├─ Calculates average mood
   ├─ Counts crisis sessions
   ├─ Computes engagement score
   └─ Returns JSON
   
6. Frontend displays analytics
   └─ Charts, statistics, trends
```

## Environment Configuration

### Development (In-Memory)

```env
USE_SUPABASE=false
PORT=5000
NODE_ENV=development
JWT_SECRET=dev-secret-key

# Database: In-memory (data resets on restart)
# Perfect for: Testing, development, demos
# No external services needed
```

### Production (Supabase)

```env
USE_SUPABASE=true
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIs...
JWT_SECRET=production-secret-key-long-and-random
PORT=5000
NODE_ENV=production

# Database: Supabase PostgreSQL (persistent)
# Perfect for: Production, users, scale
# Requires Supabase account
```

## API Request/Response Flow

### Request to Supabase-Enabled Backend

```
CLIENT REQUEST:
POST /api/auth/register
Content-Type: application/json
Authorization: Bearer <jwt-token>

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secure123",
  "fullName": "John Doe"
}

↓ BACKEND PROCESSING (if USE_SUPABASE=true)

1. Parse request ✓
2. Validate input ✓
3. Check if user exists:
   └─ SELECT * FROM users WHERE email=$1 OR username=$2
4. Hash password with bcrypt ✓
5. Insert new user:
   └─ INSERT INTO users (...) VALUES (...)
6. Generate JWT token ✓

SERVER RESPONSE (201 Created):
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 42,
    "username": "john_doe",
    "email": "john@example.com",
    "fullName": "John Doe"
  }
}
```

## Connection Flow

### Using In-Memory Database

```
Express Server
    ↓
    ├─ server.js sets USE_SUPABASE=false
    ├─ Requires: db.js (in-memory)
    ├─ Sets: global.db
    └─ Routes use: global.db.User.create()
         ↓
         Maps operations: In-memory Map data structure
         No external connections needed ✓
```

### Using Supabase

```
Express Server
    ↓
    ├─ server.js sets USE_SUPABASE=true
    ├─ Requires: db-supabase.js
    ├─ Creates: Supabase client
    ├─ Sets: global.db
    └─ Routes use: global.db.User.create()
         ↓
         Maps operations: Supabase client methods
         ↓
         Makes HTTPS requests to: https://your-project.supabase.co
         ↓
         Uses Supabase JS client library
         ↓
         Executes SQL via Supabase API
         ↓
         Queries PostgreSQL database
         ↓
         Returns results
```

## Deployment Architecture

```
GitHub Repository
    ↓
    ├─ Pushed to main branch
    ├─ Vercel detects changes
    ├─ AND Netlify detects changes
    ↓
    
VERCEL DEPLOYMENT (Backend)
    ├─ Builds Express app
    ├─ Installs node_modules
    ├─ Sets environment variables from dashboard
    ├─ Deploys serverless functions
    └─ Assigns URL: https://api.your-project.vercel.app
    
VERCEL/NETLIFY DEPLOYMENT (Frontend)
    ├─ Builds React app
    ├─ Injects REACT_APP_API_URL
    ├─ Optimizes bundle
    ├─ Deploys static assets to CDN
    └─ Assigns URL: https://your-project.vercel.app
    
Both connect to the same Supabase project:
    └─ SUPABASE_URL: https://your-project.supabase.co
```

## Security Architecture

```
┌─────────────────────────────────────────────┐
│         SECURITY LAYERS                      │
└─────────────────────────────────────────────┘

Layer 1: HTTPS/TLS
    ├─ All traffic encrypted
    ├─ Certificate auto-renewed
    └─ Port: 443

Layer 2: Authentication
    ├─ JWT tokens (7-day expiry)
    ├─ Stored in localStorage
    └─ Verified on each request

Layer 3: Environment Variables
    ├─ Secrets never in code
    ├─ Set in deployment platform
    └─ Hidden from logs

Layer 4: Database Security
    ├─ Password hashing (bcryptjs)
    ├─ Row-Level Security (RLS) policies
    ├─ Foreign key constraints
    └─ Data validation

Layer 5: API Security
    ├─ CORS headers
    ├─ Input validation
    ├─ Rate limiting (optional)
    └─ Error handling
```

## Scaling Path

```
Stage 1: Development
    └─ In-memory database
       └─ Perfect for: Solo developer, testing

Stage 2: MVP/Staging
    └─ Supabase Free tier ($0/month)
       └─ 500MB storage, 2 concurrent connections
       └─ Perfect for: Testing with real db

Stage 3: Production
    └─ Supabase Pro tier ($25/month)
       └─ 10GB storage, 30 concurrent connections
       └─ Perfect for: Small to medium user base

Stage 4: Scale
    └─ Supabase Team/Enterprise
       └─ Custom limits, dedicated support
       └─ Perfect for: Large-scale applications
```

---

*Architecture documentation created: March 9, 2026*
*Last updated: March 9, 2026*
