require("../db/config");
const express = require("express");
const creditReq = require("../db/creditReq");
const User = require("../db/User");
const router = express.Router();

router.post("/", async (req, res) => {
  const today = new Date();
  console.log(req.body.email)
  await User.findOneAndUpdate({email: req.body.email}, {
    $set: {
      [`transactions.${req.body.refcode}`]: "69",
    }
  });
  req.body["refcode"] = parseInt(
    `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}${curr}`
  );
  let request = new creditReq(req.body);
  let result = await request.save();
  curr += 1;
  res.send(result);
});

module.exports = router;
