// Importing required modules
const next = require('next'); // Importing next module

// Middleware function to handle errors
function errorHandler(err, req, res, next) {
    console.error(err.stack); // Log the error stack for debugging

    // Customize error message based on error type or context
    let errorMessage = 'Internal Server Error';
    if (err.status === 400) {
        errorMessage = 'Bad Request';
    } else if (err.status === 401) {
        errorMessage = 'Unauthorized';
    } else if (err.status === 404) {
        errorMessage = 'Not Found';
    }

    // Send error response with detailed information
    res.status(err.status || 500).json({
        message: errorMessage,
        error: err.message || 'Internal Server Error', // Include original error message if available
        details: err.details || '' // Additional details about the error, if provided
    });
}

// Exporting error handling middleware for use in other modules
module.exports = errorHandler;
