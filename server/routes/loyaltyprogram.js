require("../db/config");
const express = require("express");
const loyaltyprogram = require("../db/loyaltyprogram");
const router = express.Router();

router.get("/", (req, res) => {
  loyaltyprogram.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// post code written in index.js

module.exports = router;
