module.exports = { createUser };
const userService = require("../services/signup");

async function createUser(req, res) {
    try {
        const userData = req.body;

        // Input validation
        if (!userData.email || !userData.password || !userData.name) {
            return res.status(400).json({ message: "Email, password, and name are required" });
        }

        const user = await userService.createUser(userData);
        res.status(201).json({ user, message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(400).json({ message: error.message });
    }
}
