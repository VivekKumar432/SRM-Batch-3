const jwt = require("jsonwebtoken");
const { secretKey } = require("../configuration/jwtConfig");

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

module.exports = checkRole;
