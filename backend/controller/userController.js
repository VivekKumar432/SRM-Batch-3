// const bcrypt = require("bcrypt");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");
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
    console.log("====================================");
    console.log(req.body);
    console.log("====================================");
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      id: uuidv4(),
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
      role: "customer",
    });
    res.status(201).json({
      message: "user created successfully",
      user: newUser,
    });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
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
