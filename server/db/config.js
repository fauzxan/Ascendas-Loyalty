const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://c4g7:loyalty@ascenda-loyalty.684oztw.mongodb.net/loyalty?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });
