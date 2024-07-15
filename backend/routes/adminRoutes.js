const express = require("express");
const { createAdminAccount } = require("../controller/adminCotroller");
const adminRouter = express.Router();

// router.post("/login", login);
adminRouter.post("/register", createAdminAccount);

module.exports = adminRouter;
