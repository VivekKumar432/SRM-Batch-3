const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id:{ type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
});

module.exports = mongoose.model('User', userSchema);
