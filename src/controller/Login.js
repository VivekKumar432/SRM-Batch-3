const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateToken } = require("../utils/authUtils");
const jwt=require('jsonwebtoken')

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
        res.status(200).json({ user: user, token: token, role:user.role });

    } catch (error) {
        console.error("Login error:", error.message);
        res.status(401).json({ message: "Invalid credentials" });
    }
}

module.exports = { login };