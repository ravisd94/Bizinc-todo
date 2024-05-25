const { Sequelize } = require('sequelize');

// Create a new Sequelize instance with the connection details for our PostgreSQL database
const sequelize = new Sequelize({
  database: 'bizinc',
  username: 'postgres',
  password: 'password123',
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;


//Below code is for raw queries with pg library 
// const { Pool } = require('pg');
// const bcrypt = require('bcrypt');
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'bizinc',
//   password: 'password123',
//   port: 5432,
// });

// // Function to create a new user
// const createUser = async ({ first_name,last_name, email, password,role }) => {
//   // Hash the password before storing it in the database
//   const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds: 10
//   const query = 'INSERT INTO users (first_name,last_name, email, password,role) VALUES ($1, $2, $3,$4,$5) RETURNING *';
//   const values = [first_name,last_name, email, hashedPassword,role];
//   const result = await pool.query(query, values);
//   return result.rows[0];
// };

// // Function to get all users
// const getUsers = async () => {
//   const query = 'SELECT * FROM users';
//   const result = await pool.query(query);
//   return result.rows;
// };

// // Function to get a user by ID
// const getUserById = async (userId) => {
//   const query = 'SELECT * FROM users WHERE id = $1';
//   const values = [userId];
//   const result = await pool.query(query, values);
//   return result.rows[0];
// };

// const getUserByEmail = async (email) => {
//   const query = 'SELECT * FROM users WHERE email = $1';
//   const values = [email];
//   const result = await pool.query(query, values);
//   return result.rows[0];
// }

// // Function to update a user by ID
// const updateUserById = async (userId, { first_name,last_name, email,role }) => {
//   const query = 'UPDATE users SET first_name = $1, last_name = $2, email = $3, role = $4 WHERE id = $5 RETURNING *';
//   const values = [first_name,last_name, email, role, userId];
//   const result = await pool.query(query, values);
//   return result.rows[0];
// };

// // Function to delete a user by ID
// const deleteUserById = async (userId) => {
//   const query = 'DELETE FROM users WHERE id = $1';
//   const values = [userId];
//   await pool.query(query, values);
//   return true;
// };

// module.exports = {
//   createUser,
//   getUsers,
//   getUserByEmail,
//   getUserById,
//   updateUserById,
//   deleteUserById
// };