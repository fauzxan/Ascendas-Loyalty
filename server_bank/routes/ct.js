require("../db/config");
const express = require("express");
const User = require("../db/User");
const router = express.Router();
const Axios = require("axios");
const host = require("../config");

router.post(
  "/",
  (re, rs, nt) => {
    User.findOne({ email: re.body.email }, (e, o) => {
      if (o.points < re.body.amount) {
        rs.status(403).send({ result: "Insufficient points" });
        rs.locals.f = false;
        nt();
      } else {
        rs.locals.f = true;
        rs.locals.oa = re.body["amount"];
        re.body["amount"] *= o.tier;
        nt();
      }
    });
  },
  async (re, rs) => {
    if (rs.locals.f) {
      const today = new Date();
      await User.findOneAndUpdate(
        { email: re.body.email },
        {
          $set: {
            [`transactions.${parseInt(
              `${today.getFullYear()}${
                today.getMonth() + 1
              }${today.getDate()}${curr}`
            )}`]: "69420",
          },
          $inc: {
            points: -rs.locals.oa,
          },
        }
      );
      let referenceNumber = parseInt(
        `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}${curr}`
      );
      re.body["referenceNumber"] = referenceNumber;
      curr += 1;
      Axios.post(host + "/submitcreditreq", re.body)
        .then((result) => {
          console.log("Transaction creation success");
          rs.status(200).send({referenceNumber});
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Insufficient points");
    }
  }
);

module.exports = router;
