const express = require("express");
const app = express();
require("./db/config");
const User = require("./db/User");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
})

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select('-password');
    if (user) {
      res.send(user)
    } else {
      res.send({ result: "Not found" });
    }
  } else {
    res.send({ result: "Not found" });
  }

})

app.listen(5000);



// mongoose.connect(
//   "mongodb+srv://Anthony:C4G7ESC@cluster0.tltj1.mongodb.net/test_database?retryWrites=true&w=majority"
// );

// app.get("/getUsers", (req, res) => {
//   UserModel.find({}, (err, result) => {
//     if (err) {
//       res.json(err);
//     } else {
//       res.json(result);
//     }
//   });
// });

// app.post("/createUser", async (req, res) => {
//   const user = req.body;
//   const newUser = new UserModel(user);
//   await newUser.save();

//   res.json(user);
// });

// app.listen(3001, () => {
//   console.log("SERVER RUNS PERFECTLY!");
// });
