const passport = require('passport'); // Importing passport module
const LocalStrategy = require('passport-local').Strategy; // Importing LocalStrategy from passport-local module
const bcrypt = require('bcrypt'); // Importing bcrypt module for password hashing
const User = require('../models/userModel'); // Importing User model

// Configuring local strategy for email/password authentication
passport.use(new LocalStrategy({
  usernameField: 'email', // Configuring username field as 'email'
  passwordField: 'password' // Configuring password field as 'password'
}, async (email, password, done) => {
    try {
        // Finding user by email in the database
        const user = await User.findOne({ where: { email } });
        // If user not found, return error
        if (!user) {
          return done(null, false, { message: 'Incorrect email' });
        }
    
        // Comparing password with hashed password stored in the database
        const isValidPassword = await bcrypt.compare(password, user.password);
        // If password is incorrect, return error
        if (!isValidPassword) {
          return done(null, false, { message: 'Incorrect password' });
        }
    
        // If user found and password is correct, return user
        return done(null, user);
      } catch (error) {
        // If any error occurs during authentication, return error
        return done(error);
      }
}));

// Serialize user object to session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    // Finding user by primary key in the database
    const user = await User.findByPk(id);
    // Return user
    done(null, user);
  } catch (error) {
    // If any error occurs during deserialization, return error
    done(error);
  }
});

// Exporting configured passport module for use in other modules
module.exports = passport;
