const mongoose = require("mongoose");

const handbackSchema = new mongoose.Schema({
	date: Date,
	amount: Number,
	referencenumber: Number,
	outcomecode: String,
});

const handbackModel = mongoose.model("handback", handbackSchema);
module.exports = handbackModel;
