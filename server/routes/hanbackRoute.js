require("../db/config");
const express = require("express");
const handbackModel = require("../db/handbackModel");
const router = express.Router();

router.post("/", async (req, res) => {
  const today = new Date();
  req.body["referencenumber"] = parseInt(
    `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`
  );
  let request = new handbackModel(req.body);
  let result = await request.save();
  curr += 1;
  res.send(result);
});

module.exports = router;
