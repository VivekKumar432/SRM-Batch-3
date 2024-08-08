const User = require("../models/userModel");
// const bcrypt = require("bcrypt");
const bcrypt = require("bcryptjs");

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

module.exports = { createAdminAccount, adminLogin };
