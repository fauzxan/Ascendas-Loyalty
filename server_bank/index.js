// import statements
require("./db/config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
global.curr = 0;

const cors = require("cors");
const login = require("./routes/login");
const register = require("./routes/register");
const resetpts = require("./routes/resetPts");
const getUser = require("./routes/getUser");
const mt = require("./routes/ct")
const updateStatus = require("./routes/updateStatus")

app.use(express.json());
app.use(cors());

app.use("/login", login);
app.use("/register", register);
app.use("/resetpts", resetpts);
app.use("/getUser", getUser);
app.use("/createTransaction", mt)
app.use("/updateStatus", updateStatus) 

app.listen(5001, () => {
  console.log("Server is listening");
});