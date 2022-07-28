require("../db/config");
const express = require("express");
const creditReq = require("../db/creditReq");
const User = require("../db/User");
const router = express.Router();

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
        rs.locals.oa = re.body["amount"]
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
      re.body["refcode"] = parseInt(
        `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}${curr}`
      );
      let rt = new creditReq(re.body);
      let rl = await rt.save();
      curr += 1;
      rs.send(rl);
    } else {
      console.log("Insufficient points");
    }
  }
);

module.exports = router;
