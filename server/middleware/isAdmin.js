// isAdmin.js

const isAdmin = (req, res, next) => {
  console.log('isAdmin middleware :' , req.user, req.user.role === 'admin');
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: Only admin users have access' });
    }
  };
  
  module.exports = isAdmin;
  