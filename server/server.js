// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('./config/passport');
const sequelize = require('./config/dbConfig'); 

// Import middleware
const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');
const authMiddleware = require('./middleware/authMiddleware');

// Import routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');

const app = express();
const port = process.env.ExpressPort || 4000;  

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(requestLogger); 
app.use(session({
  secret: process.env.SESSION_SECRET || '12345',
  resave: false,
  saveUninitialized: true,
  cookie:{
    maxAge : 1000 * 60 *60 *24  
  }
}));
app.use(passport.initialize()); 
app.use(passport.session());

// Routes setup
app.use('/auth', authRoutes); 
app.use('/api/users', authMiddleware, userRoutes); 
app.use('/api/data', dataRoutes);

// Error handling middleware
app.use(errorHandler);

// Sync models with the database and then start the server
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully');
    app.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Express server ready on http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error('Error syncing database:', error);
  });
