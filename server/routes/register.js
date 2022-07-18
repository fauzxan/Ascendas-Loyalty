require("../db/config");
const express = require("express");
const User = require("../db/User");
const router = express.Router();
const Jwt = require("jsonwebtoken");
const jwtKey = "loyalty";

router.post(
  "/",
  (req, res, next) => {
    User.countDocuments({ email: req.body.email }, (e, c) => {
      if (c > 0) {
        res.status(403).send({ result: "Account with email already exists" });
        res.locals.create = false;
        next();
      } else {
        res.locals.create = true;
        next();
      }
    });
  },
  async (req, res) => {
    if (res.locals.create) {
      let user = new User(req.body);
      let result = await user.save();
      result = result.toObject();
      delete result.password;
      Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.status(500).send({ result: "Error, please try again later." });
        }
        res.status(200).send({ result, au: token });
      });
    } else {
      console.log("Attempted duplicate email");
    }
  }
);

module.exports = router;
