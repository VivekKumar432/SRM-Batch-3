const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/node_db", {
    serverSelectionTimeoutMS: 5000
});

mongoose.connection.on("connected", () => {
    console.log("connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
    console.log("MongoDB connection error: ", error);
});

 module.exports = mongoose;

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
//       process.exit(1); // Exit process on connection failure
//     }
//   }
// };


// const mongoose = require('mongoose');

// const MONGO_URI = 'mongodb://localhost:27017/node_db';

// exports.connectDB = async () => {
//   try {
//     await mongoose.connect(MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       // Remove useCreateIndex completely
//     });
//     console.log('MongoDB connected');
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//     process.exit(1);
//   }
// };
