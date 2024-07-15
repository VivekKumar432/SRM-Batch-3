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


