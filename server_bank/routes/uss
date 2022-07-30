require("../db/config");
const express = require("express");
const User = require("../db/User");
const router = express.Router();

router.post("/", async (re, rs) => {
  try {
    var hm = [];
    for (let i = 0; i < re.body.length; i++) {
      if (hm.includes(re.body[i].email) == false) {
        let ussss = await User.findOne({
          email: re.body[i].email,
        }).select("transactions -_id");
        ttp = ussss.transactions.toJSON();
        re.body.map((value, index, arr) => {
          if (value.email == re.body[i].email) {
            const rnc = re.body[index].referenceNumber;
            const oc = re.body[index].outcomecode;
            ttp[rnc] = oc;
          }
        });
        await User.findOneAndUpdate(
          { email: `${re.body[i].email}` },
          {
            $set: {
              transactions: { ...ttp },
            },
          }
        );
        hm.push(re.body[i].email);
      }
    }
    console.log("writing to handback file in mongoDB");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
