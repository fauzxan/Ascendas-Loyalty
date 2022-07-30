const mongoose = require("mongoose");

const creditReq = new mongoose.Schema({
  memberid: String,
  fullname: String,
  date: String,
  amount: Number,
  email: String,
  partnercode: String,
  loyaltyprogramme: String,
  referenceNumber: Number,
});

module.exports = mongoose.model("creditreqs", creditReq);
