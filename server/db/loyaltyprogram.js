const mongoose = require("mongoose");

const loyaltyprogram = new mongoose.Schema({
  programID: String,
  programName: String,
  currencyName: String,
  description: String,
  regex: String,
  img: String,
});

module.exports = mongoose.model("loyaltyprogram", loyaltyprogram);
