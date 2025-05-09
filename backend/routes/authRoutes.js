const express = require('express');
const { registerUser, loginUser, getUserDetails } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');  // Import authentication middleware

const router = express.Router();

// POST route for registering a new user
router.post('/register', registerUser);

// POST route for logging in a user
router.post('/login', loginUser);

// GET route to get user details (protected)
router.get('/user', authenticateToken, getUserDetails);

module.exports = router;
