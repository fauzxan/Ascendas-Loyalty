// import statements
const express = require("express");
const app = express();

const TcModel = require("./models/Ascendas_transfer_connect");

const cors = require("cors");
const login = require('./routes/login');
const register = require('./routes/register');
const creditreq = require('./routes/creditReq');

app.use(express.json());
app.use(cors());
app.use('/login', login);
app.use('/register', register);
app.use('/submitcreditreq', creditreq);

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

app.listen(5000, ()=>{
  console.log("Server is listening")
});

