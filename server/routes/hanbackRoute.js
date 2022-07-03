require("../db/config");
const express = require("express");
const handbackModel = require("../db/handbackModel");
const router = express.Router();
const Jwt = require("jsonwebtoken");
const jwtKey = "loyalty";

router.post("/", async (req, res) => {
	let request = new handbackModel(req.body);
	let result = await request.save();
	res.send(result);
});

module.exports = router;
