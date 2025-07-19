const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const Database = require('better-sqlite3');
const db = new Database('users.db');
db.exec(`CREATE TABLE IF NOT EXISTS users (
  email TEXT PRIMARY KEY,
  password TEXT NOT NULL
)`);

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'DeepWave AI Chatbot API is running', 
    status: 'healthy' 
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'DeepWave AI Chatbot',
    version: '1.0.0',
    openai_configured: !!process.env.OPENAI_API_KEY
  });
});

// Register endpoint
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
    }
  const existing = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (existing) {
    return res.status(409).json({ error: 'User already exists.' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  db.prepare('INSERT INTO users (email, password) VALUES (?, ?)').run(email, hashedPassword);
  res.json({ message: 'Registration successful.' });
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }
  res.json({ message: 'Login successful.' });
});

app.listen(PORT, () => {
  console.log(`🚀 DeepWave server running on http://localhost:${PORT}`);
  console.log(`📝 API Documentation: http://localhost:${PORT}/health`);
}); 