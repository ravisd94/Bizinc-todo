// Importing required modules
const User = require('../models/userModel'); // Importing User model
const { ValidationError } = require('sequelize'); // Importing ValidationError from sequelize module

// Function to create a new user
async function createUser(firstName, lastName, email, password, role) {
  try {
    // Creating a new user in the database
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      role
    });
    // Returning the newly created user
    return newUser;
  } catch (error) {
    // Handling validation errors
    if (error instanceof ValidationError) {
      const validationErrors = error.errors.map(err => err.message);
      console.error('Validation errors:', validationErrors);
      throw new Error(`Validation errors: ${validationErrors.join(', ')}`);
    } else {
      // Handling other errors
      console.error('Error creating user:', error);
      throw error;
    }
  }
}

// Function to retrieve a user by ID
async function getUserById(id) {
  try {
    // Finding user by ID in the database
    const user = await User.findByPk(id);
    // Returning the user
    return user;
  } catch (error) {
    // Handling errors
    if (error instanceof ValidationError) {
      const validationErrors = error.errors.map(err => err.message);
      console.error('Validation errors:', validationErrors);
      throw new Error(`Validation errors: ${validationErrors.join(', ')}`);
    } else {
      console.error('Error retrieving user:', error);
      throw error;
    }
  }
}

// Function to retrieve a user by email
async function findUserByEmail(email) {
  try {
    // Finding user by email in the database
    const user = await User.findOne({ where: { email } });
    // Returning the user
    return user;
  } catch (error) {
    // Handling errors
    if (error instanceof ValidationError) {
      const validationErrors = error.errors.map(err => err.message);
      console.error('Validation errors:', validationErrors);
      throw new Error(`Validation errors: ${validationErrors.join(', ')}`);
    } else {
      console.error('Error retrieving user:', error);
      throw error;
    }
  }
}

// Function to retrieve all users
async function getAllUsers() {
  try {
    // Retrieving all users from the database
    const users = await User.findAll();
    // Returning all users
    return users;
  } catch (error) {
    // Handling errors
    if (error instanceof ValidationError) {
      const validationErrors = error.errors.map(err => err.message);
      console.error('Validation errors:', validationErrors);
      throw new Error(`Validation errors: ${validationErrors.join(', ')}`);
    } else {
      console.error('Error retrieving users:', error);
      throw error;
    }
  }
}

// Function to update a user
async function updateUser(id, newData) {
  try {
    // Finding user by ID in the database
    const user = await User.findByPk(id);
    // If user not found, throw error
    if (!user) {
      throw new Error('User not found');
    }
    // Updating user data
    await user.update(newData);
    // Returning the updated user
    return user;
  } catch (error) {
    // Handling errors
    if (error instanceof ValidationError) {
      const validationErrors = error.errors.map(err => err.message);
      console.error('Validation errors:', validationErrors);
      throw new Error(`Validation errors: ${validationErrors.join(', ')}`);
    } else {
      console.error('Error updating user:', error);
      throw error;
    }
  }
}

// Function to delete a user
async function deleteUser(id) {
  try {
    // Finding user by ID in the database
    const user = await User.findByPk(id);
    // If user not found, throw error
    if (!user) {
      throw new Error('User not found');
    }
    // Deleting the user
    await user.destroy();
    // Returning the deleted user
    return user;
  } catch (error) {
    // Handling errors
    if (error instanceof ValidationError) {
      const validationErrors = error.errors.map(err => err.message);
      console.error('Validation errors:', validationErrors);
      throw new Error(`Validation errors: ${validationErrors.join(', ')}`);
    } else {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}

// Exporting functions for use in other modules
module.exports = {
  createUser, // Function to create a new user
  getUserById, // Function to retrieve a user by ID
  findUserByEmail, // Function to retrieve a user by email
  getAllUsers, // Function to retrieve all users
  updateUser, // Function to update a user
  deleteUser // Function to delete a user
};
