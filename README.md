# Next.js Application with Node.js Backend and PostgreSQL Database

This repository contains a full-stack web application built with Next.js for the frontend, Node.js for the backend, and PostgreSQL for the database.

## Frontend (React.js and Next.js)

### 1. React.js Basics:
- Implemented a simple to-do list component.
- Users can add new items to the list.

### 2. Next.js Routing:
- Developed a multi-page Next.js application.
- Implemented client-side navigation between pages.

### 3. API Integration:
- Integrated a mock API endpoint using JSON Server.
- Fetched data from the API and displayed it on a page.

## Backend (Node.js)

### 4. Node.js Server:
- Set up a basic Node.js server using Express.js.
- Created API endpoints that return JSON responses.

### 5. Middleware:
- Implemented middleware for logging incoming requests.

### 6. Database Interaction:
- Connected the Node.js server to a PostgreSQL database.
- Created tables for storing user information and implemented CRUD operations.

## Database (PostgreSQL)

### 7. Database Schema:
- Designed a relational database schema for a blogging platform.
- Included tables for users, posts, and comments.
- To create the database schema, access the `db` folder: `project/server/db/schema.sql` and `project/server/db/queries.sql`.

### 8. SQL Queries:
- Wrote SQL queries to retrieve posts by a specific user and count comments on a post.

## Additional Challenge: Authentication

## Additional Challenge: Authentication

### 9. Authentication:
- Implemented user authentication using email and password.
- Utilized session-based authentication for user login.
- Integrated JWT (JSON Web Token) for stateless authentication, suitable for APIs.
- Secured specific API endpoints to be accessible only to authenticated users.

## Testing Authentication

To test the authentication functionality in the application, follow these steps:

1. **Register a New User:**
   - Use the provided API endpoint to create a new user account.
   - Provide the required details such as email and password.
   - Ensure that the user registration is successful.

2. **Login with the Registered User:**
   - Use the provided API endpoint to authenticate with the credentials of the registered user.
   - Provide the email and password used during registration.
   - Verify that the login process is successful and the appropriate response is received.

3. **Access Authenticated Routes with Session Authentication:**
   - Once logged in, navigate to routes that require authentication.
   - Ensure that access to these routes is restricted to authenticated users only.
   - Attempt to access these routes without being logged in and verify that access is denied.

4. **Access Authenticated Routes with JWT Authentication:**
   - Use the provided API endpoint (`/login-jwt`) to obtain a JWT token after login.
   - Include the JWT token in the request headers (`Authorization: Bearer <token>`) when accessing authenticated routes.
   - Verify that access to these routes is granted with a valid JWT token and denied without it.

By following these steps, you can ensure that both session-based and JWT authentication systems are working as expected in the application.


## Running the Application

### Frontend (Next.js)
To run the Next.js application, use: `npm run dev`

### Backend (Node.js)
To run the Node.js server, use: `npm run dev:server`

### JSON Server
To run the JSON Server, use: `npm run json-server`

## Installation and Setup
1. Clone this repository.
2. Install dependencies for both frontend and backend using: `npm install`.
3. Update database credentials:
   - Navigate to the `config` folder: `project/server/config`
   - Open `dbconfig.js` and update the database credentials as needed.
4. Create a `.env` file in the root directory of your project.
5. Add the following values to the `.env` file:
   - `JWT_SECRET=12345`
   - `ExpressPort=4000`
   - `SESSION_SECRET=12345`
6. Start the frontend and backend servers using: `npm run dev` and `npm start`, respectively.

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## License
This project is licensed under the [MIT License](LICENSE).
