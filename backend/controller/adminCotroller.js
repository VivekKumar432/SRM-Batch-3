const bcrypt = require("bcrypt");
const Admin = require("../models/adminModel");
const { v4: uuidv4 } = require("uuid");
const { generateToken } = require("../utils/authUtils");
const jwt = require("jsonwebtoken");
//new
async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;
    const admin = await admin.findOne({ email });
    if (!admin) {
      throw new Error("Admin not found");
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = generateToken(admin); // Generate JWT token
    res.status(200).json({ admin: admin, token: token, role: admin.role });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(401).json({ message: "Invalid credentials" });
  }
}

async function adminRegister(req, res) {
  try {
    const { name, email, password } = req.body;
    console.log("====================================");
    console.log(req.body);
    console.log("====================================");
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      role: "customer",
    });
    res.status(201).json({
      message: "admin created successfully",
      admin: newAdmin,
    });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    res.status(400).json({ message: error.Error });
  }
}

const verifyAdmin = (req, res, next) => {
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

module.exports = { adminLogin, adminRegister, verifyAdmin };
