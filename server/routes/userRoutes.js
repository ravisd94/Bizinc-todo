// Importing required modules
const express = require('express'); // Importing express module
const router = express.Router(); // Creating router instance
const userController = require('../controllers/userController'); // Importing user controller
const isAdmin = require('../middleware/isAdmin'); // Importing isAdmin middleware for admin access

// Route to retrieve all users
router.get('/',  async (req, res, next) => {
  try {
    // Retrieve all users
    const users = await userController.getAllUsers();
    // Send users as JSON response
    res.json(users);
  } catch (error) {
    // Pass error to error handling middleware
    next(error);
  }
});

// Route to retrieve a user by ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    // Retrieve a user by ID
    const user = await userController.getUserById(id);
    // If user not found, return 404 error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Send user as JSON response
    res.json(user);
  } catch (error) {
    // Pass error to error handling middleware
    next(error);
  }
});

// Route to retrieve a user by email
router.get('/email/:email', async (req, res, next) => {
  try {
    const { email } = req.params;
    // Retrieve a user by email
    const user = await userController.findUserByEmail(email);
    // If user not found, return 404 error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Send user as JSON response
    res.json(user);
  } catch (error) {
    // Pass error to error handling middleware
    next(error);
  }
});

// Route to update a user (accessible only to admin users)
router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    // Update a user
    const updatedUser = await userController.updateUser(id, newData);
    // Send updated user as JSON response
    res.json(updatedUser);
  } catch (error) {
    // Pass error to error handling middleware
    next(error);
  }
});

// Route to delete a user (accessible only to admin users)
router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    // Delete a user
    const deletedUser = await userController.deleteUser(id);
    // Send deleted user as JSON response
    res.json(deletedUser);
  } catch (error) {
    // Pass error to error handling middleware
    next(error);
  }
});

// Exporting router for use in other modules
module.exports = router;
