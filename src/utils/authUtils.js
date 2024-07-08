const jwt = require("jsonwebtoken");
const {secretKey} = require("../configuration/jwtConfig");

console.log(secretKey);
function generateToken(user) {
    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };
  
    const options = {
      expiresIn: '1h', // Example expiration time
    };
  
    return jwt.sign(payload, secretKey, options);
  }

module.exports = { generateToken };