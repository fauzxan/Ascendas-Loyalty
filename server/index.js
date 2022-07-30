// import statements
require("./db/config");
const { reset } = require("./Dailies/reset");
const express = require("express");
const app = express();

const cors = require("cors");

const creditreq = require("./routes/creditReq");
const handback = require("./routes/hanbackRoute");
const LoyaltyProgram = require("./routes/loyaltyprogram");
const LoyaltyUpload = require("./routes/loyaltyUpload")

const creditreqModel = require("./db/creditReq");
const { makeHandback } = require("./Dailies/handback");
const { makeAccural } = require("./Dailies/accrual");

app.use(express.json());
app.use(cors());

app.use("/submitcreditreq", creditreq);
app.use("/createhandback", handback);
app.use("/getloyaltyprogram", LoyaltyProgram);
app.use("/loyaltyupload", LoyaltyUpload)

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
