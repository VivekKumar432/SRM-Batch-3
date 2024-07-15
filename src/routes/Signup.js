const express = require("express");
const { signupUser } = require("../controller/Signup");

const router = express.Router();

router.post("/register", signupUser);

module.exports = router;

