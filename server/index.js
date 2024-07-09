const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


const AdminModel = require('./models/Admin');
const app = express();

const JWT_SECRET = "jwt-secret-key"; // Use a more secure secret key in production

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/employee', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB database!");
});

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json("The token was not available");
    } else {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) return res.json("Token is wrong");
            next();
        });
    }
};

app.get('/home', verifyUser, (req, res) => {
    return res.json("Success");
});

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: String,
  email: String,
  password: String
});
const User = mongoose.model('User', userSchema);

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    bcrypt.hash(password, 10)
        .then(hash => {
            const newUser = new User({ name, email, password: hash });
            newUser.save()
                .then(savedUser => {
                    console.log('User saved successfully:', savedUser);
                    const token = jwt.sign({ email: savedUser.email }, JWT_SECRET, { expiresIn: "1d" });
                    res.cookie("token", token, { httpOnly: true, sameSite: 'strict' });
                    res.status(200).json({ message: 'User registered successfully', token });
                })
                .catch(err => {
                    console.error('Error saving user:', err);
                    res.status(500).json({ message: 'Failed to register user' });
                });
        })
        .catch(err => {
            console.error('Error hashing password:', err);
            res.status(500).json({ message: 'Failed to register user' });
        });
});

app.post('/admin', (req, res) => {
    const { name, email, password } = req.body;

    bcrypt.hash(password, 10)
        .then(hash => {
            const newAdmin = new AdminModel({ name, email, password: hash });
            newAdmin.save()
                .then(savedAdmin => {
                    const token = jwt.sign({ email: savedAdmin.email }, JWT_SECRET, { expiresIn: "1d" });
                    res.cookie("token", token, { httpOnly: true, sameSite: 'strict' });
                    res.json({ message: 'Admin registered successfully', token });
                })
                .catch(err => res.status(500).json({ message: 'Failed to register admin', error: err.message }));
        })
        .catch(err => {
            console.error('Error hashing password:', err);
            res.status(500).json({ message: 'Failed to register admin' });
        });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log("Login request received for email:", email); // Log email for debugging

    User.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "1d" });
                        res.cookie("token", token, { httpOnly: true, sameSite: 'strict' });
                        res.json({message:"Success",token:token});   //jruri h
                    } else {
                        res.json("The password is incorrect");
                    }
                });
            } else {
                console.log("No user found with email:", email); // Log if no user found
                res.json("No record existed");
            }
        })
        .catch(err => res.status(500).json({ message: 'An error occurred during login', error: err.message }));
});

app.post("/admin/login", (req, res) => {
    const { email, password } = req.body;
    console.log("Admin login request received for email:", email); // Log email for debugging

    AdminModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "1d" });
                        res.cookie("token", token, { httpOnly: true, sameSite: 'strict' });
                        res.json("Success");
                    } else {
                        res.json("The password is incorrect");
                    }
                });
            } else {
                console.log("No admin found with email:", email); // Log if no admin found
                res.json("No record existed");
            }
        })
        .catch(err => res.status(500).json({ message: 'An error occurred during admin login', error: err.message }));
});



app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});
