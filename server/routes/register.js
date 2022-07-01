require("../db/config");
const express = require('express');
const User = require("../db/User");
const router = express.Router();
const Jwt = require('jsonwebtoken');
const jwtKey='loyalty';

router.post("/", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({result}, jwtKey, {expiresIn:"2h"},(err,token)=>{
      if (err) {
        res.status(500).send({result: "Error, please try again later."})
      }
      res.status(200).send({result, au:token})
    })
  });

module.exports = router;