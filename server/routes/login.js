require("../db/config");
const express = require('express');
const User = require("../db/User");
const router = express.Router();
const Jwt = require('jsonwebtoken');
const jwtKey='loyalty';

router.post("/", async (req, res) => {
    if (req.body.password && req.body.email) {
      let user = await User.findOne(req.body).select('-password');
      if (user) {
        Jwt.sign({user}, jwtKey, {expiresIn:"2h"},(err,token)=>{
          if (err) {
            res.status(500).send({result: "Error, please try again later."})
          }
          res.status(200).send({user, au:token})
        })
      } else {
        res.status(404).send({ result: "Not found" });
      }
    } else {
      res.status(404).send({ result: "Not found" });
    }
  });

module.exports = router;