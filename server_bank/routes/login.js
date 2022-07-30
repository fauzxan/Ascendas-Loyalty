require("../db/config");
const express = require("express");
const User = require("../db/User");
const router = express.Router();
const Jwt = require("jsonwebtoken");
const jwtKey = "loyalty";

router.post("/", async (re, rs) => {
  if (re.body.password && re.body.email) {
    let u = await User.findOne({ email: re.body.email }).exec(function (e, u) {
      if (e) {
        console.warn({ error: true });
      } else if (!u) {
        rs.status(404).send({ result: "User Not Found" });
      } else {
        u.cp(re.body.password, function (me, im) {
          if (me) {
            rs.status(404).send({ result: "Not found" });
          } else if (!im) {
            rs.status(404).send({ result: "Not found" });
          } else {
            Jwt.sign({ u }, jwtKey, { expiresIn: "2h" }, (err, token) => {
              if (err) {
                rs.status(500).send({
                  result: "Error, please try again later.",
                });
              }
              u = u.toObject();
              delete u.password;
              rs.status(200).send({ u, au: token });
            });
          }
        });
      }
    });
  } else {
    rs.status(404).send({ result: "Not found" });
  }
});

module.exports = router;
