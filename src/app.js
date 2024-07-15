const express = require("express");
const mongoose = require('mongoose');
const signupRoute = require("./routes/Signup");
const loginRoute = require("./routes/Login");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createAdminAccount } = require("./scripts/setup");
const checkRole=require("./middleware/userRole");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

createAdminAccount();

app.use("/user", signupRoute);
app.use("/auth", loginRoute);
app.get("/admin", checkRole("admin"),(req,res )=>{
  res.status(200).send("Welcome Admin");
})
app.get("/customer", checkRole("customer"),(req,res )=>{
  res.status(200).send("Welcome User");
})
app.listen(PORT, () => {
    console.log('server is running on http://localhost:3001');
})

