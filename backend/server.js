require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

let db;
const USE_SUPABASE = process.env.USE_SUPABASE === 'true';

try {
  if (USE_SUPABASE && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    console.log('Using Supabase database');
    db = require('./models/db-supabase').db;
  } else {
    console.log('Using in-memory database (Supabase credentials missing)');
    db = require('./models/db').db;
  }
} catch (error) {
  console.error('Database initialization error:', error.message);
  console.log('Falling back to in-memory database');
  db = require('./models/db').db;
}

global.db = db;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/mood', require('./routes/mood'));
app.use('/api/analytics', require('./routes/analytics'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
