const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { generateToken } = require("../utils/authUtils");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = generateToken(user); // Generate JWT token
    res.status(200).json({ user: user, token: token, role: user.role });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(401).json({ message: "Invalid credentials" });
  }
}

async function register(req, res) {
  try {
    const { firstName, lastName, userName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "customer",
    });
    const savedUser = await newUser.save();
    res.status(201).json({
      message: "user created successfully, user:savedUser",
      user: savedUser,
    });
  } catch (error) {
    res.status(400).json({ message: error.Error });
  }
}

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

module.exports = { login, register, verifyUser };
