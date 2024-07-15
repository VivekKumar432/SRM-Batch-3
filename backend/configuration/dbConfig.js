const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
  serverSelectionTimeoutMS: 5000,
});

mongoose.connection.on("connected", () => {
  console.log("connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
  console.log("MongoDB connection error: ", error);
});

module.exports = mongoose;
