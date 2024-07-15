# MERN Stack Application Documentation

## Introduction to MERN Stack

MERN is a popular set of technologies used to build web applications. It stands for:

1. **MongoDB**: A NoSQL database used for storing and retrieving large volumes of unstructured data efficiently.  
2. **Express.js**: A web application framework for Node.js, used to build robust and scalable server-side applications.  
3. **React**: A JavaScript library for building dynamic and responsive user interfaces, particularly single-page applications.  
4. **Node.js**: A JavaScript runtime environment that allows for server-side scripting, enabling the use of JavaScript for backend development.  

The integration of these technologies in the MERN stack facilitates the development of modern, high-performance web applications.  

---

## Workflow of the Project

1. **Setup**:  
   Configure Node.js, Express.js for backend.  
   Use MongoDB with Mongoose for database storage.  
   Initialize React.js for frontend development.  
   
2. **User Authentication**:  
   Implement user registration and login endpoints.  
   Hash passwords securely using bcrypt.  
   Issue JWT tokens upon successful login.  
   
3. **JWT Token Management**:  
   Store JWT tokens securely (e.g., localStorage).  
   Validate tokens on backend for each authenticated request.  
   Define protected routes based on user roles.  
   
4. **Error Handling**:  
   Address token expiry with frontend alerts for re-authentication.  
   Manage server-side errors with informative messages.  
   
5. **Testing and Documentation**:  
   Test API endpoints using Postman.  
   Validate frontend functionality across browsers.  
   Prepare project documentation and a concise project report.

Now lets review each part of the project,

## FRONTEND  
The client-side of an application responsible for presenting data to users and handling user interactions within a web browser or application interface.

### App.js

```javascript
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Dashboard from './pages/dashboard/Dashboard';
import Admin from './pages/dashboard/Admin';
import Customer from './pages/dashboard/Customer';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Signup/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/admin" element={<Admin/>} />
      <Route path="/customer" element={<Customer/>} />
      
    </Routes>
  );
}

export default App;
```
Code Explaination  
This code is a React component that defines the routing structure of a web application. It imports necessary components and uses the Routes and Route components from react-router-dom to set up different routes for the application. When a user navigates to specific paths (like "/login", "/register", "/dashboard", "/admin", and "/customer"), the corresponding component (such as Login, Signup, Dashboard, Admin, or Customer) will be rendered. This helps in navigating to different parts of the application based on the URL.

### Signup.js

```javascript

import { ThemeProvider } from '@emotion/react';
import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography, createTheme, Link } from '@mui/material';
import { useState } from 'react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
const defaultTheme = createTheme

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''

    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            if (result.user._id) {
                navigate("/login");

            } else {
                console.error("Signup failed");
            }

        } catch (error) {
            console.error(error.message);

        }
    }

    const handleSignInClick = () => {
        navigate("/login");
    }

    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, backgroundColor: "secondary.main" }}>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete='given-name'
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />


                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete='family-name'
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete='email'
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="password"
                                        label="Password"
                                        name="password"
                                        autoComplete='new-password'
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant='contained'
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                            >
                                Sign up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link variant="body2" onClick={handleSignInClick}>
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )
}

export default Signup;
```
Code Explaination  
It manages user input fields for first name, last name, email, and password using React's useState hook.  
Upon form submission, it sends a POST request to the server endpoint /user/register with user registration data in JSON format.  
If registration is successful (checked by the presence of result.user._id), it redirects the user to the login page (/login).  
It also provides a link to the login page for users who already have an account.  
Error messages are logged to the console in case of failures during registration.

### Login.js

```javascript

import { ThemeProvider } from '@emotion/react';
import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography, createTheme, Link } from '@mui/material';
import { useState } from 'react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme

const Login = () => {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        email: '',
        password: ''

    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/auth/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
            },
    body: JSON.stringify(formData)
});

            const result = await response.json();
            if (result.user.role=="admin") {
                navigate("/admin");
                const user= JSON.stringify(result.user);
                localStorage.setItem("user",user);
                localStorage.setItem("token",result.token);

            } else if(result.user.role=="customer"){
                navigate("/customer");
                const user= JSON.stringify(result.user);
                localStorage.setItem("user",user);
                localStorage.setItem("token",result.token);

            }
            else {
                console.error("Signup failed");
            }

        } catch (error) {
            console.error();

        }
    }

    const handleSignUpClick = () => {
        navigate("/register");
    }
    return(
        <>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, backgroundColor: "secondary.main"}}>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign In
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 3 }}>
                            <TextField
                                margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete='email'
                                        autoFocus
                                        value={formData.email}
                                        onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                        required
                                        fullWidth
                                        id="password"
                                        label="Password"
                                        name="password"
                                        autoComplete='new-password'
                                        value={formData.password}
                                        onChange={handleInputChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant='contained'
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link variant="body2" onClick={handleSignUpClick}>
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )
}
export default Login;
```
Code Explaination  
It uses Material-UI components for styling.  
It captures user input for email and password.  
On form submission, it sends a POST request to a local server endpoint /auth/login with user credentials.  
If login is successful and the user role is identified as "admin" or "customer", it redirects to respective pages (/admin or /customer) and stores user data and authentication token in localStorage.  
It also provides a link to the registration page if the user doesn't have an account.

### Admin.js and Customer.js

```javascript

import React from 'react';

const Admin = () => {
  const styles = {
    body: {
      margin: 0,
      padding: 0,
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to right, #bdc3c7, #2c3e50)', // Subtle gradient
      fontFamily: 'Arial, sans-serif',
      color: 'white',
    },
    container: {
      textAlign: 'center',
    },
    message: {
      fontSize: '4em',
      fontWeight: '700',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.message}>Welcome Admin</div>
      </div>
    </div>
  );
}

export default Admin;
```
```javascript

// export default Customer;
import React from 'react';

const Customer = () => {
  const styles = {
    body: {
      margin: 0,
      padding: 0,
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to right, #bdc3c7, #2c3e50)', // Subtle gradient
      fontFamily: 'Arial, sans-serif',
      color: 'white',
    },
    container: {
      textAlign: 'center',
    },
    message: {
      fontSize: '4em',
      fontWeight: '700',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.message}>Welcome Customer</div>
      </div>
    </div>
  );
}

export default Customer;
```
Code Explaination  
**Admin Component:** Displays "Welcome Admin" in large font with white text on a gradient background. It uses CSS-in-JS styling for layout and appearance.  
**Customer Component:** Displays "Welcome Customer" similarly to the Admin component but tailored for customers. It shares the same styling approach with a gradient background and centered message.

## BACKEND   

The server-side of an application responsible for processing requests, managing data, and interacting with databases.

### App.js
```javascript
const express = require("express");
const mongoose = require('mongoose');
const signupRoute = require("./routes/Signup");
const loginRoute = require("./routes/Login");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createAdminAccount } = require("./scripts/setup");
const checkRole=require("./middleware/userRole");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

createAdminAccount();

app.use("/user", signupRoute);
app.use("/auth", loginRoute);
app.get("/admin", checkRole("admin"),(req,res )=>{
  res.status(200).send("Welcome Admin");
})
app.get("/customer", checkRole("customer"),(req,res )=>{
  res.status(200).send("Welcome User");
})
app.listen(PORT, () => {
    console.log('server is running on http://localhost:3001');
})

```
Code Explaination  
It imports necessary modules and middleware, including routes for signup and login, and applies JSON body parsing and CORS handling.  
It initializes the application by calling createAdminAccount, and sets up routes for user registration (/user), authentication (/auth), and role-based access to admin and customer pages.  
The server starts listening for requests on port 3001 and logs a message to the console.

### Configuration codes : dbConfig.js and jwtConfig.js
```javascript
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/node_db", {
    serverSelectionTimeoutMS: 5000
});

mongoose.connection.on("connected", () => {
    console.log("connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
    console.log("MongoDB connection error: ", error);
});

module.exports = mongoose;
```
```javascript
const secretKey = 'G@2#4fa5!E%P0KqwJH7^&8lbRvZu1DxsY9eTI+c3VN6o-@mLrBjW'

module.exports = { secretKey: secretKey };
```
Code Explaination  
**MongoDB Connection Code:** Connects to a MongoDB database at mongodb://127.0.0.1:27017/node_db with a timeout setting of 5000 milliseconds, and logs connection success or errors.  
**Secret Key Export:** Exports a secret key (secretKey) for use in other parts of the application, typically for tasks like token signing or encryption.

### Routes codes : 
## Login.js
```javascript
const express = require("express");
const { login } = require("../controller/Login");

const router = express.Router();

router.post("/login", login);

module.exports = router;
```
## Signup.js
```javascript
const express = require("express");
const { signupUser } = require("../controller/Signup");

const router = express.Router();

router.post("/register", signupUser);

module.exports = router;
```
Code Explaination  
Login Route Code: Creates a route for logging in users by sending their data to a login function and exports this route.  
Signup Route Code: Creates a route for registering new users by sending their data to a signupUser function and exports this route. 

### user.js
```javascript
const mongoose = require("../configuration/dbConfig");
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
});

module.exports = mongoose.model('User', userSchema);
```
Code Explaination  
Connects to the MongoDB configuration (dbConfig).  
Creates a schema (userSchema) with fields for first name, last name, unique email, password, and role (either 'admin' or 'customer' with 'customer' as default).  
Exports the model (User) based on this schema for use in the application.

### userRole.js
```javascript
const jwt=require('jsonwebtoken');
const {secretKey} = require("../configuration/jwtConfig");

function checkRole(role) {
    return (req, res, next) => {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(403).json({ message: "No token provided" });
        }
        try {
            const decoded = jwt.verify(token, secretKey);
            if (decoded.role !== role) {
                return res.status(403).json({ message: "Access denied" });
            }
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Invalid token" });
        }
    };
}

module.exports=checkRole;
```
Code Explaination  
Checks if the user's role matches the required role by verifying a JWT token from the request's authorization header.  
If no token is provided or if the token is invalid, it returns an error message and denies access.  
If the role matches, it decodes the token, attaches the user info to the request, and proceeds to the next middleware or route handler.  
Exports this checkRole function for use in other parts of the application.

### authUtils.js
```javascript
const jwt = require("jsonwebtoken");
const {secretKey} = require("../configuration/jwtConfig");

console.log(secretKey);
function generateToken(user) {
    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };
  
    const options = {
      expiresIn: '1h', // Example expiration time
    };
  
    return jwt.sign(payload, secretKey, options);
  }

module.exports = { generateToken };
```
Code Explaination  
Takes a user object and creates a payload containing the user's ID, email, and role.  
Specifies token options, including an expiration time of 1 hour.  
Signs the payload with a secret key (secretKey) to generate a JWT token.  
Exports the generateToken function for use in other parts of the application.  

### How It All Works Together

1. **Initial Website Visit:**
   -When you visit the website, you start on the Home page.

2. **Registration Process:**
   - If you're a new user, you click "Register" and complete the registration form. This data is sent to the server and saved in the database.

3. **Login and Authentication:**
   - If you're an existing user, you click "Login" and provide your username and password. The server verifies this information against the database.

4. **User Authentication:**
   - Upon successful login, the server informs the frontend of your user role (admin or customer user).

5. **Dynamic Page Rendering:**
   - The frontend then displays the appropriate home page based on your user role.
