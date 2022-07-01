// every file in this folder represents a collection
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const TcSchema = new mongoose.Schema({
	_id: {
		type: ObjectId,
		required: true,
	},
	bankid: {
		// to know which account the points are transferred to
		type: Number, /// type of input
		required: true, // if the field is required or not
	},
    age: {
		// not required field, just required in cases where the loyalty points belong to some age restricted store
		// like wine club
		type: Number,
		required: false,
	},
	validated: {
		// to know if the points transfer has taken place or not
		type: Boolean,
		required: true,
	},
	number: {
		type: Number,
		required: true,
	},
	pointscollected: {
		// to know the total number of points collected
		type: Number,
		required: true,
	}
	
});

// model method takes in the collection name, and the schema name that we just created.
const TcModel = mongoose.model("Ascendas_transfer_connect", TcSchema);
module.exports = TcModel; // this is used in index.js
