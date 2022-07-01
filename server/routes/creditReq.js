require("../db/config");
const express = require('express');
const creditReq = require("../db/creditReq");
const router = express.Router();
const Jwt = require('jsonwebtoken');
const jwtKey='loyalty';

router.post("/", async (req, res) => {
    let request = new creditReq(req.body);
    let result = await request.save();
    res.send(result);
  });

module.exports = router;