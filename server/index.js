// import statements
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const TcModel = require("./models/Ascendas_transfer_connect");

const cors = require("cors"); // this allows our api to connect with our react frontend

app.use(express.json());
app.use(cors());

mongoose.connect(
	"mongodb+srv://fauzaan:1vSrKEDpr45wErCM@cluster0.nt1bu1m.mongodb.net/Ascendas_handback_file?retryWrites=true&w=majority",
	{ useUnifiedTopology: true, useNewUrlParser: true },
	(req, res) => {
		console.log("connected to database");
	}
); // connect to the database using mongoose. This is the url retrieved after
// clicking "connect to application" on mongodb

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

app.listen(8999, () => {
	console.log("SERVER RUNS PERFECTLY!");
});

/*

app.get("/getUsers", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

app.listen(3001, () => {
  console.log("SERVER RUNS PERFECTLY!");
})
*/

/*
import app from "./server";
import mongodb from "mongodb";
import dotenv from "dotenv";

dotenv.config(); // this is to load in the environment variables
const MongoClient = mongodb.MongoClient; // mongo client access

const port = process.env.PORT || 8000; // we will try to access the port defined in the .env file. If unaccessible
// then the application will try to connect with the port 8000

MongoClient.connect(
	process.env.RESTREVIEWS_DB_URI, // access the uri defined in the .env folder
	{
		maxPoolSize: 50, // setting the max number of connections at any given point in time (only 50 open connections possible )
		wtimeoutMS: 2500, // the connection will timeout in 2500 milliseconds
		useNewUrlParser: true, // this helps parse the url, as the new mongodb url format is very large
	}
)
	.catch((err) => {
		// catch any errors that may pop up during the connection setup
		console.log(err.stack); // log the error
		process.exit(1); // exit the process
	})
	.then(
		// this will load the db uri then carry out an asynchronous process
		async (client) => {
			// the async porcess will help connect to the server port
			app.listen(port, () => [
				// this is how we tell the application to listen to the port
				console.log(`listening to port ${port}`),
			]);
		}
	);
*/
