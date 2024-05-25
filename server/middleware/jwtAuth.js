// Importing required module
const jwt = require('jsonwebtoken'); // Importing jsonwebtoken module for token operations

// Middleware function for JWT authentication
const jwtAuthMiddleware = (req, res, next) => {
    // Extracting authorization header
    const authorization = req.headers.authorization;
    // If authorization header is missing, return unauthorized error
    if(!authorization){
        return res.status(401).json({message: 'Unauthorized: Missing token'});
    }

    // Extracting token from authorization header
    const token = req.headers.authorization.split(' ')[1];
    // If token is missing, return unauthorized error
    if(!token){
        return res.status(401).json({message: 'Unauthorized: Missing token'});
    }

    try{
        // Verifying the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Storing decoded user data in request object
        req.user = decoded;
        next(); // Move to the next middleware
    }
    catch(error){
        // If token verification fails, log error and return invalid token error
        console.error(error);
        return res.status(401).json({message: 'Invalid token'});
    }
};

// Function to generate JWT token
const generateToken = (userData) => {
    // Generating token using user data and secret key
    const secretKey = process.env.JWT_SECRET;
    return jwt.sign(userData, secretKey, {expiresIn: 1000}); // Token expires in 1000 seconds
};

// Exporting jwtAuthMiddleware and generateToken functions for use in other modules
module.exports = {jwtAuthMiddleware , generateToken};
