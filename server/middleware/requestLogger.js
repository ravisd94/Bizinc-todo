// Middleware to log incoming requests
const requestLogger = (req, res, next) => {
  // Logging request details
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Request Body:', req.body);
  console.log('Query Parameters:', req.query);
  console.log('Headers:', req.headers);
  console.log('-------------------');
  next(); // Move to the next middleware
};

// Exporting requestLogger middleware for use in other modules
module.exports = requestLogger;
