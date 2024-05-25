// Importing required middleware
const sessionAuthMiddleware = require('./sessionAuth'); // Importing session authentication middleware
const { jwtAuthMiddleware } = require('./jwtAuth'); // Importing JWT authentication middleware

// Middleware to handle authentication based on request headers
const authMiddleware = (req, res, next) => {
  // If authorization header exists, use JWT authentication
  if (req.headers.authorization) {
    console.log('Using JWT Auth');
    return jwtAuthMiddleware(req, res, next);
  }
  // If authorization header doesn't exist, use session authentication
  console.log('Using Session Auth');
  return sessionAuthMiddleware(req, res, next);
};

// Exporting authentication middleware for use in other modules
module.exports = authMiddleware;
