const bcrypt = require("bcrypt");
const Admin = require("../models/adminModel");
const { v4: uuidv4 } = require("uuid");
const { generateToken } = require("../utils/authUtils");
const jwt = require("jsonwebtoken");

async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(admin); // Generate JWT token
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json("Success");
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
}

async function adminRegister(req, res) {
  try {
    const { name, email, password } = req.body;
    console.log("====================================");
    console.log(req.body);
    console.log("====================================");
    const hashedPassword = await bcrypt.hash(password, 10);
    const newadmin = await Admin.create({
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });
    res.status(201).json({
      message: "admin created successfully",
      admin: newadmin,
    });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    res.status(400).json({ message: error.Error });
  }
}

const verifyuser = (req, res, next) => {
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

module.exports = { adminLogin, adminRegister, verifyuser };
