// Middleware for session-based authentication
function sessionAuthMiddleware(req, res, next) {
  // Checking if user is authenticated
  if (req.isAuthenticated()) {
    return next(); // Allow access to authenticated users
  }
  // If user is not authenticated, return unauthorized error
  res.status(401).json({ message: 'Unauthorized: Session not valid' });
}

// Exporting sessionAuthMiddleware for use in other modules
module.exports = sessionAuthMiddleware;
