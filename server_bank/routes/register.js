require("../db/config");
const express = require("express");
const User = require("../db/User");
const router = express.Router();
const Jwt = require("jsonwebtoken");
const jwtKey = "loyalty";

router.post(
  "/",
  (re, rs, next) => {
    User.countDocuments({ email: re.body.email }, (e, c) => {
      if (c > 0) {
        rs.status(403).send({ r: "Account with email already exists" });
        rs.locals.c = false;
        next();
      } else {
        rs.locals.c = true;
        next();
      }
    });
  },
  async (re, rs) => {
    if (rs.locals.c) {
      let p = Math.floor(Math.random() * (100000 + 1));
      let t = Math.floor(Math.random() * 5 + 1);
      if (t == 1) {
        t = 1.5;
      }
      re.body["points"] = p;
      re.body["tier"] = t;
      let u = new User(re.body);
      let r = await u.save();
      r = r.toObject();
      delete r.password;
      Jwt.sign({ r }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          rs.status(500).send({ r: "Error, please try again later." });
        }
        rs.status(200).send({ r, au: token });
      });
    } else {
      console.log("Attempted duplicate email");
    }
  }
);

module.exports = router;
