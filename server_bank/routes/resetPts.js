require("../db/config");
const express = require("express");
const User = require("../db/User");
const router = express.Router();

router.post("/", async (re, rs) => {
  await User.findOneAndUpdate(
    { email: re.body.email },
    { $set: { points: 100000 } }
  );
  rs.status(200).send({ result: "success" });
});

module.exports = router;
