const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongodb = require('./configuration/dbConfig');

const bodyParser = require("body-parser");
// const checkRole = require("./middleware/userRole");
//express
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.get('/',(req,res) => {
  res.send('hello,world!');
});

// app.get("/admin", checkRole("admin"),(req,res )=>{
//   res.status(200).send("Welcome Admin");
// })
// app.get("/customer", checkRole("customer"),(req,res )=>{
//   res.status(200).send("Welcome User");
// })
//new
app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
