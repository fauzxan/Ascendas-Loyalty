const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  transactions: {
    type: Map,
    default: {},
  },
});

module.exports = mongoose.model("users", userSchema);
