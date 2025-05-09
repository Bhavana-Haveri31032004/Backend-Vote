require('dotenv').config();
console.log('✅ MONGO_URI from .env:', process.env.MONGO_URI);

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/user'); // adjust path if needed

const app = express();
app.use(express.json());

// Connect to MongoDB (updated connection without deprecated options)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected!');
  })
  .catch(err => {
    console.error('❌ MongoDB error:', err.message); // This will log the error message directly
  });

// Signup route
app.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ name, email, password, role });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (err) {
    console.error('Error during signup:', err); // Log error
    res.status(500).json({ error: err.message });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password); // Use bcrypt to compare hashed password
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Error during login:', err); // Log error
    res.status(500).json({ error: err.message });
  }
});

// Test protected route
app.get('/protected', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from 'Authorization' header
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: 'Access granted!', user: decoded });
  } catch (err) {
    console.error('Invalid token:', err); // Log error
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
