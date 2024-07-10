const jwt = require("jsonwebtoken");
const secretKey = require("../configuration/jwtConfig");
const { generateToken } = require("../utils/jwtUtils");
// const { verifyToken: verifyTokenFromMiddleware } = require("../utils/authMiddleware");

function authenticateToken(req, res, next) {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized: Missing token!" });
    }

    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
        return res
        .status(401)
        .json({ message: "Unauthorized: Invalid token format" });
    }

    jwt.verify(token, secretKey, (err, user) => {
        // if (err) {
        //     return res.status(403).json({ message: "Forbidden: Invalid Token" });
        // }
        req.user = user;
        next();
    });
}

// Removed local verifyToken function to avoid duplication

module.exports = { authenticateToken };