const express = require('express');
const jwtUtils = require('../utils/jwt'); 
const User = require('../models/user'); 

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    // Generate JWT token upon successful signup
    const token = jwtUtils.generateToken(newUser._id);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token upon successful login
    const token = jwtUtils.generateToken(user._id);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Example route to verify JWT token
router.get('/verify', (req, res) => {
  const token = req.headers.authorization;
  try {
    const decodedToken = jwtUtils.verifyToken(token);
    res.json({ decodedToken });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
