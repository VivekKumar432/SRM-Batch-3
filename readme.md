# Full Stack Application Documentation

## Table of Contents
1. [Frontend Documentation (App.js)](#frontend-documentation-appjs)
2. [Backend Documentation (index.js)](#backend-documentation-indexjs)

## Frontend Documentation (App.js)

### Overview
This file (App.js) is the main component of a React application. It sets up the routing structure for the website, determining which components (pages) should be displayed based on the URL the user is visiting.

### Key Concepts
- **React**: A popular JavaScript library for building user interfaces.
- **Router**: A tool that helps manage different "pages" in a single-page application.
- **Components**: Reusable pieces of code that represent parts of a user interface.
- **State**: A way to store and manage data that can change over time in an application.

### Code Breakdown

```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
```
This section imports necessary tools:
- `React`: The core React library.
- `Router`, `Route`, `Routes`: Parts of 'react-router-dom', a popular routing library for React.

```javascript
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserHome from './components/UserHome';
import AdminHome from './components/AdminHome';
```
These lines import different components (pages) of the application.

```javascript
function App() {
  const [userRole, setUserRole] = React.useState(null);
```
This creates the main `App` function and sets up a piece of state called `userRole`. This will be used to keep track of whether the current user is an admin, a regular user, or not logged in.

```javascript
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-home" element={userRole === 'user' ? <UserHome /> : <Home />} />
        <Route path="/admin-home" element={userRole === 'admin' ? <AdminHome /> : <Home />} />
      </Routes>
    </Router>
  );
}
```
This section sets up the routing for the application:
- The homepage ("/") shows the `Home` component.
- "/login" shows the `Login` component and passes the `setUserRole` function to it.
- "/register" shows the `Register` component.
- "/user-home" shows the `UserHome` component if the user's role is 'user', otherwise it shows the `Home` component.
- "/admin-home" shows the `AdminHome` component if the user's role is 'admin', otherwise it shows the `Home` component.

```javascript
export default App;
```
This line makes the `App` component available for use in other parts of the application.

## Backend Documentation (index.js)

### Overview
This file sets up a server using Node.js and Express, connects to a MongoDB database, and defines routes for user registration and login.

### Key Concepts
- **Node.js**: A JavaScript runtime that allows running JavaScript on a server.
- **Express**: A web application framework for Node.js that simplifies creating server-side applications.
- **MongoDB**: A popular NoSQL database for storing application data.
- **Mongoose**: A tool that makes it easier to work with MongoDB in Node.js applications.
- **API Routes**: Endpoints that the frontend can communicate with to perform actions or retrieve data.

### Code Breakdown

```javascript
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
```
This section imports necessary tools:
- `express`: The web application framework.
- `mongoose`: For interacting with MongoDB.
- `cors`: Allows the API to be accessed from different domains.
- `dotenv`: For loading environment variables.

```javascript
dotenv.config();
const app = express();
const port = 3000;
```
This sets up the Express application and defines the port it will run on.

```javascript
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
```
These lines set up middleware:
- `cors()`: Enables Cross-Origin Resource Sharing.
- `express.urlencoded()` and `express.json()`: Allow the server to parse incoming request bodies.

```javascript
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```
This connects the application to a MongoDB database. The database URL is stored in an environment variable for security.

```javascript
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);
```
This defines the structure (schema) for user data in the database and creates a model for interacting with user data.

```javascript
app.post('/register', async (req, res) => {
  const { username, password, name, email, role } = req.body;
  try {
    const user = new User({ username, password, name, email, role });
    await user.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(400).send('Error registering user: ' + error);
  }
});
```
This sets up a route for user registration. When a POST request is made to '/register', it creates a new user in the database.

```javascript
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(400).send('Invalid credentials');
    }

    let message;
    switch (user.role) {
      case 'admin':
        message = `Welcome, admin ${user.name}!`;
        break;
      case 'user':
        message = `Welcome, user ${user.name}!`;
        break;
      default:
        message = `Login successful, ${user.name}!`;
        break;
    }

    res.send(message);
  } catch (error) {
    res.status(500).send('Error logging in: ' + error);
  }
});
```
This sets up a route for user login. When a POST request is made to '/login', it checks the user's credentials and responds with a welcome message.

```javascript
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```
This starts the server and makes it listen for incoming requests on the specified port.

### Security Considerations
- Passwords are currently stored in plain text, which is not secure. In a real application, passwords should be hashed before storage.
- The use of environment variables for sensitive information (like the database URL) is good practice.
- There's no token-based authentication system, which would be necessary for maintaining user sessions securely.

### Potential Improvements
1. Implement password hashing for better security.
2. Add input validation to prevent malformed data.
3. Implement a token-based authentication system.
4. Add error handling for database operations.
5. Create separate route files for better code organization as the application grows.
