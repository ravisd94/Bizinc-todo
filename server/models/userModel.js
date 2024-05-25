// Importing required modules
const { DataTypes } = require('sequelize'); // Importing DataTypes from sequelize module
const sequelize = require('../config/dbConfig'); // Importing sequelize instance
const bcrypt = require('bcrypt'); // Importing bcrypt module for password hashing

// Defining User model with specified attributes and validations
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 50]
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 50]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [6, 100]
    }
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [['user', 'admin']]
    }
  }
}, {
  // Hooks to execute actions before creating or updating a user
  hooks: {
    // Before creating a user, hash the password
    beforeCreate: async (user) => {
      console.log('Changes:', user.changed());
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    },
    // Before updating a user, check if password or email changed and update accordingly
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
      if (user.changed('email')) {
        // Find if another user already exists with the new email
        const previousEmail = user.previous('email');
        const newEmail = user.email;
        if (previousEmail === newEmail) {
          return;
        }
        const existingUser = await User.findOne({ where: { email: user.email } });
        if (existingUser && existingUser.id !== user.id) {
          throw new Error('Email address is already in use');
        }
      }
    }
  }
});

// Method to validate password for a user instance
User.prototype.validPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Exporting User model for use in other modules
module.exports = User;
