const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');  // Make sure this is the correct path

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists by email
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // If the email doesn't exist, hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // Respond with success message
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare password with the hashed password in the DB
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token for the user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token in response
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Get user details (protected route)
const getUserDetails = async (req, res) => {
  try {
    // Fetch the user by ID (from the JWT payload)
    const user = await User.findById(req.user.userId).select('-password');  // Exclude password field

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the user details as a response
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details", error });
  }
};

module.exports = { registerUser, loginUser, getUserDetails };
