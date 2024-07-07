const express = require("express");
const mongoose = require('mongoose');
const signupRoute = require("./routes/Signup");
const loginRoute = require("./routes/Login");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createAdminAccount } = require("./scripts/setup");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

createAdminAccount();

app.use("/user", signupRoute);
app.use("/auth", loginRoute);

app.listen(PORT, () => {
    console.log('server is running on http://localhost:3001');
})

// db.js
// const mongoose = require('mongoose');

// const MONGO_URI = 'mongodb://localhost:27017/node_db';
// let isConnected = false;

// exports.connectDB = async () => {
//   if (!isConnected) {
//     try {
//       await mongoose.connect(MONGO_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true,
//       });
//       console.log('MongoDB connected');
//       isConnected = true;
//     } catch (error) {
//       console.error('MongoDB connection error:', error);
//       process.exit(1);
//     }
//   }
// };

// // app.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const { connectDB } = require('./configuration/dbConfig');
// const { createAdminAccount } = require('./scripts/setup');

// const signupRoute = require('./routes/Signup');
// const loginRoute = require('./routes/Login');

// const app = express();
// const PORT = process.env.PORT || 3001;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // Connect to MongoDB
// connectDB().then(() => {
//   // Create admin account after successful DB connection
//   createAdminAccount();
// });

// // Routes
// app.use('/user', signupRoute);
// app.use('/auth', loginRoute);

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const { connectDB } = require('./configuration/dbConfig');
// const { createAdminAccount } = require('./scripts/setup');

// const signupRoute = require('./routes/Signup');
// const loginRoute = require('./routes/Login');

// const app = express();
// const PORT = process.env.PORT || 3001;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // Connect to MongoDB
// connectDB().then(() => {
//   // Create admin account after successful DB connection
//   createAdminAccount();
// }).catch((err) => {
//   console.error('Failed to connect to MongoDB:', err);
//   process.exit(1); // Exit process on connection failure
// });

// // Routes
// app.use('/user', signupRoute);
// app.use('/auth', loginRoute);

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
