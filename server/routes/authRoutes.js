// Importing required modules
const express = require('express'); // Importing express module
const router = express.Router(); // Creating router instance
const { jwtAuthMiddleware, generateToken } = require('../middleware/jwtAuth'); // Importing JWT authentication middleware and token generation function
const userController = require('../controllers/userController'); // Importing user controller
const passport = require('passport'); // Importing passport module

// Route to create a new user
router.post('/signup', async (req, res) => {
    try {
        // Destructure request body
        const { firstName, lastName, email, password, role } = req.body;
        // Create a new user
        const newUser = await userController.createUser(firstName, lastName, email, password, role);
        console.log('User created successfully.');

        // Generate JWT token for the new user
        const payload = {
            id: newUser.id,
            email: newUser.email,
            role: newUser.role
        };
        const token = generateToken(payload);
        console.log('Token generated successfully:', token);

        // Send success response with user and token
        res.status(200).json({ newUser, token });
    } catch (error) {
        // Handle errors during user creation
        if (error.message.startsWith('Validation errors:')) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Failed to create user' });
        }
    }
});

// Route to login a user with passport
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json(req.user);
});

// Route to login a user with JWT
router.post('/login-jwt', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userController.findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const validPassword = await user.validPassword(password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        const payload = { id: user.id, email: user.email, role: user.role };
        const token = generateToken(payload);
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to login user' });
    }
});

// Exporting router for use in other modules
module.exports = router;
