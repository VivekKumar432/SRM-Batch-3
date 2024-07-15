const express = require("express");
const { login } = require("../controller/Login");

const router = express.Router();

router.post("/login", login);

module.exports = router;