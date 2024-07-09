const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const AdminModel = mongoose.model("Admins", AdminSchema)
module.exports = AdminModel