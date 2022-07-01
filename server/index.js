// import statements
const express = require("express");
const app = express();

const TcModel = require("./models/Ascendas_transfer_connect");

require("./db/config");
const User = require("./db/User");
const cors = require("cors");
const Jwt = require('jsonwebtoken');
const jwtKey='loyalty'


app.use(express.json());
app.use(cors());

// get requests help retrieve data from the specified resource
// the first argument is a route that tells you where the get request should get from
// the second argument is for sending and recieving information from the front and backend
app.get("/getData", (req, res) => {
	// in here goes all the logic that gets carried out when the front end makes a request through the route
	TcModel.find({}, (err, result) => {
		// err is for errors, obviously. Result is the value returned, i.e., the dataset
		// there are various ways to "find". an empty {} will return the whole dataset
		if (err) {
			res.json(err); // this will sent the error to the frontend
		} else {
			res.json(result); // this will send back the results to the frontend
			console.log(result);
		}
	});
});

/*

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({result}, jwtKey, {expiresIn:"2h"},(err,token)=>{
    if (err) {
      res.send({result: "Error, please try again later."})
    }
    res.send({result, au:token})
  })
})

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select('-password');
    if (user) {
      Jwt.sign({user}, jwtKey, {expiresIn:"2h"},(err,token)=>{
        if (err) {
          res.send({result: "Error, please try again later."})
        }
        res.send({user, au:token})
      })
    } else {
      res.send({ result: "Not found" });
    }
  } else {
    res.send({ result: "Not found" });
  }
})

app.listen(5000);

