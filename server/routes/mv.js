require("../db/config");
const express = require("express");
const loyaltyprogram = require("../db/loyaltyprogram");
const router = express.Router();

router.post("/", async (re, rs) => {
  console.log(re.body);
  let r = (
    await loyaltyprogram.find({ programName: re.body.l })
  )[0].regex;
  if (new RegExp(r).test(re.body.m)) {
    rs.status(200).send("Success");
  } else {
    rs.status(403).send("Invalid membership number");
  }
});

module.exports = router;
