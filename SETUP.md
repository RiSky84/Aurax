# Mental Health Companion - Setup Guide

## Quick Start

### 1. Install Dependencies

From the project root directory:

```bash
npm run install-all
```

This will install dependencies for the root project, backend, and frontend.

### 2. Configure Environment Variables

#### Backend Configuration

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Create `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` with your configuration:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mental-health-companion
   JWT_SECRET=your-secret-key-change-this
   NODE_ENV=development
   ```

### 3. Start the Application

#### Option A: Run Backend and Frontend Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Frontend will run on http://localhost:3000

#### Option B: Run Both Concurrently (from root)

```bash
npm run dev
```

### 4. Access the Application

Open your browser and go to:
```
http://localhost:3000
```

## Database Setup

### Using Local MongoDB

If you have MongoDB installed locally:

```bash
# Start MongoDB service (macOS with Brew)
brew services start mongodb-community

# Or on Linux
sudo systemctl start mongod

# Or Windows
mongod
```

### Using MongoDB Atlas (Cloud)

1. Create account at [mongodb.com](https://www.mongodb.com)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
   ```

## Verification

### Check Backend is Running
```bash
curl http://localhost:5000/api/auth/register
```

### Check Frontend is Running
Open http://localhost:3000 in your browser

## Troubleshooting

### "Cannot find module" errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules backend/node_modules frontend/node_modules
npm run install-all
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify username/password if using Atlas

### Port Already in Use
- Backend: Change PORT in `.env`
- Frontend: Set environment variable `PORT=3001` before running

## Development Tips

### Backend Structure
- All API routes are in `backend/routes/`
- Models are in `backend/models/`
- Utilities for emotion analysis and crisis detection are in `backend/utils/`

### Frontend Structure
- Main app is in `frontend/src/App.js`
- Components are in `frontend/src/components/`
- Styles are in `frontend/src/styles/`
- API client is in `frontend/src/utils/api.js`

### Adding New Features

1. **Backend**:
   - Create new route in `backend/routes/`
   - Import in `backend/server.js`
   - Add corresponding controller if needed

2. **Frontend**:
   - Create new component in `frontend/src/components/`
   - Import in `App.js`
   - Add styling in `frontend/src/styles/`
   - Update navigation if needed

## Production Deployment

### Backend (Node.js)
1. Choose hosting (Heroku, Railway, Vercel, AWS, etc.)
2. Set environment variables
3. Deploy:
   ```bash
   git push heroku main
   ```

### Frontend (React)
1. Build the project:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy `frontend/build/` to hosting service

### Environment for Production
Update `.env`:
```
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-secret-key
```

## Support

For issues and questions, refer to the main README.md file.
