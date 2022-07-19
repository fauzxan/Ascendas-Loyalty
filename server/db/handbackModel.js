const mongoose = require("mongoose");

const handbackSchema = new mongoose.Schema({
	date: String,
	amount: String,
	referencenumber: String,
	outcomecode: String,
});

const handbackModel = mongoose.model("handback", handbackSchema);
module.exports = { handbackModel };
