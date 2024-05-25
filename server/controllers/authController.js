// Importing required modules
const db = require('../config/dbConfig'); // Importing database configuration
const passport = require('passport'); // Importing passport module
const jwt = require('jsonwebtoken'); // Importing jsonwebtoken module for generating JWT tokens
const bcrypt = require('bcrypt'); // Importing bcrypt module for password hashing

// Function to register a new user
const register = async (req, res) => {
  try {
    // Extracting user details from request body
    const { first_name, last_name, email, password, role } = req.body;
    
    // Checking if user with the same email already exists
    const existingUser = await db.getUserByEmail(email);
    
    // If user with the same email exists, return error
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hashing the password before storing in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Creating a new user with hashed password
    const newUser = await db.createUser({ first_name, last_name, email, password: hashedPassword, role });
    
    // Generating JWT token for the newly registered user
    const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET , { expiresIn: '1h' });

    // Returning success response with token
    return res.status(201).json({ message: 'User created', token });
  } catch (error) {
    // If any error occurs during registration, return internal server error
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Function to authenticate user login
const login = (req, res, next) => {
  // Authenticating user using local strategy
  passport.authenticate('local', { session: false }, (err, user, info) => {
    // If any error occurs during authentication, return internal server error
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    // If user authentication fails, return unauthorized error
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: Invalid credentials' });
    }
    // If authentication is successful, generate JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Return success response with token
    return res.json({ message: 'Login successful', token });
  })(req, res, next);
};

// Exporting functions for use in other modules
module.exports = {
  register, // Function to register a new user
  login, // Function to authenticate user login
};
