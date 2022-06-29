/*
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");

const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://Anthony:C4G7ESC@cluster0.tltj1.mongodb.net/test_database?retryWrites=true&w=majority"
);

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
});\
*/
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
