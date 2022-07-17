const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    transactions: Map
})

module.exports = mongoose.model("users", userSchema)