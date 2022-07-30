require("../db/config");
const express = require("express");
const loyaltyprogram = require("../db/loyaltyprogram");
const router = express.Router();

router.post("/", async (req, res) => {
  let request = new loyaltyprogram(req.body);
  let result = await request.save();
  res.send(result);
});

module.exports = router;
