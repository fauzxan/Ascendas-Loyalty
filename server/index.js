// import statements
require("./db/config");
const express = require("express");
const app = express();

const cors = require("cors");

const creditreq = require("./routes/creditReq");
const LoyaltyProgram = require("./routes/loyaltyprogram");
const LoyaltyUpload = require("./routes/loyaltyUpload");
const intermdiaryFind = require("./routes/getIntermediate");
const mv = require("./routes/mv");

const creditreqModel = require("./db/creditReq");
const { makeHandback } = require("./Dailies/handback");
const { makeAccural } = require("./Dailies/accrual");

app.use(express.json());
app.use(cors());

app.use("/submitcreditreq", creditreq);
app.use("/getloyaltyprogram", LoyaltyProgram);
app.use("/loyaltyupload", LoyaltyUpload);
app.use("/getintermediate", intermdiaryFind);
app.use("/validate", mv);

app.get("/makeacc", (req, res) => {
  makeAccural();
  res.status(200).send("ok");
});

app.get("/makehb", (req, res) => {
  // code to make handback file
  makeHandback();
  res.status(200).send("ok");
});

app.listen(5000, () => {
  console.log("Server is listening");
});

// get method to retrieve data from creditreq:
app.get("/getcreditreq", (req, res) => {
  creditreqModel.find({}, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
});
