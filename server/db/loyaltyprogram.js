const mongoose = require("mongoose");

const loyaltyprogram = new mongoose.Schema({
  programID: String,
  programName: String,
  currencyName: String,
  processingTime: String,
  description: String,
  enrollmentLink: String,
  termsAndCondition: String,
});

module.exports = mongoose.model("loyaltyprogram", loyaltyprogram);
