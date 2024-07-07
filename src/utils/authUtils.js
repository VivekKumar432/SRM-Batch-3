const jwt = require("jsonwebtoken");
const {secretKey} = require("../configuration/jwtConfig");

// function generateToken(user) {
//     const payload = {
//         id: user._id,
//         email: user.email,
//         role: user.role
//     };
//     return jwt.sign(payload, secretKey, { expiresIn: "1h" });
// };
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

// function generateRefreshToken(user) {
//     const payload = {
//         id: user._id,
//         email: user.email,
//         role: user.role
//     };
//     return jwt.sign(payload, secretKey, { expiresIn: "7h" });
// };

// function verifyToken(token) {
//     return jwt.verify(token, secretKey);
// };

module.exports = { generateToken };