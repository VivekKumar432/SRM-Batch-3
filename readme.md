# MERN Stack Application Documentation 

## Introduction to MERN Stack

MERN is a popular set of technologies used to build web applications. It stands for:

1. **M**ongoDB: A database that stores information
2. **E**xpress.js: A tool that helps create web servers
3. **R**eact: A library for building user interfaces
4. **N**ode.js: A platform that runs JavaScript on a computer

Imagine you're building a house. MongoDB is like a big storage room where you keep all your stuff. Express.js is like the framework of the house. React is like the rooms and decorations that people see and use. Node.js is like the foundation that holds everything together.

In our project, we're using these technologies to create a website where people can register, log in, and see different pages based on whether they're a regular user or an admin.

## How MERN Stack is Implemented in This Project

1. **MongoDB**: We use this to store user information like usernames and passwords.
2. **Express.js**: This helps us create a server that can handle requests from users, like when they try to log in or register.
3. **React**: We use this to create the pages that users see in their web browsers.
4. **Node.js**: This runs our server code and allows us to use JavaScript for both the front-end and back-end of our application.

Now, let's break down each part of our project:

## Frontend (The part users see)

### App.js

This is like the main control center of our website. It decides which page to show based on where the user wants to go.

```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserHome from './components/UserHome';
import AdminHome from './components/AdminHome';

function App() {
  const [userRole, setUserRole] = React.useState(null);

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

export default App;
```

What it does:
- It sets up different "routes" or paths for our website.
- It keeps track of whether someone is logged in as a user or an admin.
- It shows different pages based on the user's role and where they're trying to go.

### Home.js

This is the first page people see when they visit our website.

```javascript
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="container">
      <h1>Welcome to the Home Page</h1>
      <div className="button-container">
        <Link to="/login"><button>Login</button></Link>
        <Link to="/register"><button>Register</button></Link>
      </div>
    </div>
  );
}

export default Home;
```

What it does:
- It shows a welcome message.
- It has two buttons: one for logging in and one for registering.
- When you click these buttons, they take you to different pages.

### Login.js

This page lets users log into their accounts.

```javascript
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ setUserRole }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', { username, password });
      alert(response.data);
      if (response.data.includes('admin')) {
        setUserRole('admin');
        navigate('/admin-home');
      } else {
        setUserRole('user');
        navigate('/user-home');
      }
    } catch (error) {
      alert('Error logging in: ' + error.response.data);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
```

What it does:
- It shows a form where users can enter their username and password.
- When the form is submitted, it sends this information to the server to check if it's correct.
- If the login is successful, it takes the user to either the admin home page or the user home page.

### Register.js

This page lets new users create an account.

```javascript
import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { useNavigate } from 'react-router-dom'; 

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    role: 'user',
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, role: checked ? 'admin' : 'user' }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/register', formData);
      alert('User registered successfully');
      navigate('/');  
    } catch (error) {
      alert('Error registering user: ' + error.response.data);
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        {/* Form fields for username, password, name, email, and role */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
```

What it does:
- It shows a form where new users can enter their information.
- Users can choose if they want to be a regular user or an admin.
- When the form is submitted, it sends the information to the server to create a new account.
- If successful, it takes the user back to the home page.

### UserHome.js and AdminHome.js

These are special pages that users see after they log in.

UserHome.js:
```javascript
import React from 'react';
import './UserHome.css';

function UserHome() {
  return (
    <div className="container">
      <h1>Welcome, User!</h1>
      <p>This is the user home screen.</p>
    </div>
  );
}

export default UserHome;
```

AdminHome.js:
```javascript
import React from 'react';
import './AdminHome.css';

function AdminHome() {
  return (
    <div className="container">
      <h1>Welcome, Admin!</h1>
      <p>This is the admin home screen.</p>
    </div>
  );
}

export default AdminHome;
```

What they do:
- They show different welcome messages depending on whether the user is a regular user or an admin.
- In a real application, these pages would have more features and information.

## Backend (The part users don't see)

### index.js

This is the brain of our server. It handles all the behind-the-scenes work.

```javascript
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
  // Registration logic
  const { username, password, name, email, role } = req.body;
  try {
    const user = new User({ username, password, name, email, role });
    await user.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(400).send('Error registering user: ' + error);
  }
});

app.post('/login', async (req, res) => {
  // Login logic
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

What it does:
- It sets up a server that can receive requests from the frontend.
- It connects to the MongoDB database to store and retrieve user information.
- It defines what a user looks like in our database (username, password, etc.).
- It creates two main routes:
  1. '/register': for creating new user accounts
  2. '/login': for checking user credentials when they try to log in

## How It All Works Together

1. When you open the website, you see the Home page.
2. If you're new, you click "Register" and fill out the form. This information is sent to the server and stored in the database.
3. If you're returning, you click "Login" and enter your username and password. The server checks this against the database.
4. If your login is successful, the server tells the frontend what type of user you are (admin or regular user).
5. The frontend then shows you the correct home page based on your user type.

## Things to Improve

1. Making passwords more secure by scrambling them before storing.
2. Adding more checks to make sure the information users enter is correct.
3. Creating a way for users to stay logged in even if they close the browser.
4. Adding more detailed error messages to help users understand what went wrong.


