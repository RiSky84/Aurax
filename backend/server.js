require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Select database based on environment variable
const USE_SUPABASE = process.env.USE_SUPABASE === 'true';
const { db } = USE_SUPABASE 
  ? require('./models/db-supabase') 
  : require('./models/db');

// Make db available globally for routes
global.db = db;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/mood', require('./routes/mood'));
app.use('/api/analytics', require('./routes/analytics'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
