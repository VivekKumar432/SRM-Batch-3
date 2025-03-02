/*const User = require("../models/userModel");
const bcrypt = require("bcrypt");

async function createAdminAccount() {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const newAdmin = new AdminModel({ name, email, password: hash });
      newAdmin
        .save()
        .then((savedAdmin) => {
          const token = jwt.sign({ email: savedAdmin.email }, JWT_SECRET, {
            expiresIn: "1d",
          });
          res.cookie("token", token, { httpOnly: true, sameSite: "strict" });
          res.json({ message: "Admin registered successfully", token });
        })
        .catch((err) =>
          res
            .status(500)
            .json({ message: "Failed to register admin", error: err.message })
        );
    })
    .catch((err) => {
      console.error("Error hashing password:", err);
      res.status(500).json({ message: "Failed to register admin" });
    });
}

const adminLogin = (req, res) => {
  const { email, password } = req.body;
  console.log("Admin login request received for email:", email); // Log email for debugging

  AdminModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const token = jwt.sign({ email: user.email }, JWT_SECRET, {
              expiresIn: "1d",
            });
            res.cookie("token", token, { httpOnly: true, sameSite: "strict" });
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
    .catch((err) =>
      res.status(500).json({
        message: "An error occurred during admin login",
        error: err.message,
      })
    );
};

module.exports = { createAdminAccount, adminLogin };*/

const bcrypt = require("bcrypt");
const Admin = require("../models/adminModel");
const { v4: uuidv4 } = require("uuid");
const { generateToken } = require("../utils/authUtils");
const jwt = require("jsonwebtoken");
//new
async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new Error("Admin not found");
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = generateToken(admin); // Generate JWT token
    res.status(200).json({ user: admin, token: token, role: admin.role });
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
