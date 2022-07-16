require("../db/config");
const express = require("express");
const creditReq = require("../db/creditReq");
const router = express.Router();

router.post("/", async (req, res) => {
  const today = new Date();
  console.log(today.getMonth());
  req.body["refcode"] = parseInt(
    `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}${curr}`
  );
  console.log(today.getFullYear() + today.getMonth() + today.getDate() + curr);
  let request = new creditReq(req.body);
  let result = await request.save();
  curr += 1;
  res.send(result);
});

module.exports = router;
