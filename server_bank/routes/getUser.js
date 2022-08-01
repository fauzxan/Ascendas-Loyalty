require("../db/config");
const express = require("express");
const User = require("../db/User");
const router = express.Router();

router.get("/", (req, res) => {
  User.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
