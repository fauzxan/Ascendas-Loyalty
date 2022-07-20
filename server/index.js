// import statements
require("./db/config");
const { reset } = require("./Dailies/reset");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
global.curr = 0;

const TcModel = require("./models/Ascendas_transfer_connect");

const cors = require("cors"); // allows us to connect to the react frontend
const login = require("./routes/login");
const register = require("./routes/register");
const creditreq = require("./routes/creditReq");
const handback = require("./routes/hanbackRoute");
const getUser = require("./routes/getUser");

const creditreqModel = require("./db/creditReq");
const userModel = require("./db/User");

//external modules
app.use(express.json());
app.use(cors());

//user defined routes
app.use("/login", login);
app.use("/register", register);
app.use("/submitcreditreq", creditreq);
app.use("/createhandback", handback);
app.use("/getUser", getUser);

app.get("/makeacc", (req, res) => {
  makeAccural();
  res.status(200).send("ok");
});

setInterval(reset, 86400000);

app.listen(5000, () => {
  console.log("Server is listening");
});
