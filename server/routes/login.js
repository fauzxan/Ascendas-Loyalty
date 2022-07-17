require("../db/config");
const express = require("express");
const User = require("../db/User");
const router = express.Router();
const Jwt = require("jsonwebtoken");
const jwtKey = "loyalty";

router.post("/", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne({'email': "fod"}).exec(function (e, u) {
      if (e) {
        console.warn({ error: true });
      } else if (!u) {
        res.status(404).send({ result: "User Not Found" });
      } else {
        u.cp(req.body.password, function (me, im) {
          if (me) {
            res.status(404).send({ result: "Not found" });
          } else if (!im) {
            res.status(404).send({ result: "Not found" });
          } else {
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
              if (err) {
                res
                  .status(500)
                  .send({ result: "Error, please try again later." });
              }
              u = u.toObject();
              delete u.password;
              console.log(u)
              res.status(200).send({ u, au: token });
            });
          }
        });
      }
    });
  } else {
    res.status(404).send({ result: "Not found" });
  }
});

module.exports = router;
