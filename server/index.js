// import statements
require("./db/config");
const { reset } = require("./Dailies/reset");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
global.curr = 0;

const TcModel = require("./models/Ascendas_transfer_connect");

const cors = require("cors"); // allows us to connect to the react frontend
const login = require("./routes/login");
const register = require("./routes/register");
const creditreq = require("./routes/creditReq");
const handback = require("./routes/hanbackRoute");

const creditreqModel = require("./db/creditReq");
const { makeHandback } = require("./Dailies/handback");
const {makeAccural} = require("./Dailies/accural");

//external modules
app.use(express.json());
app.use(cors());

//user defined routes
app.use("/login", login);
app.use("/register", register);
app.use("/submitcreditreq", creditreq);
app.use("/createhandback", handback);

app.get("/makeacc", (req, res) => {
	makeAccural();
	res.status(200).send("ok");
});

app.get("/makehb", (req, res) => {
	// code to make handback file
	makeHandback();
	res.status(200).send("ok");
});

setInterval(reset, 86400000);

app.listen(5000, () => {
	console.log("Server is listening");
});

// get method to retrieve data from creditreq:
app.get("/getcreditreq", (req, res) => {
	creditreqModel.find({}, (err, data) => {
		if (err) {
			res.json(err);
		} else {
			res.json(data);
		}
	});
});
