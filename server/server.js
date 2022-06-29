import express from "express";
import cors from "cors";
import restaurants from "./api/restaurants.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/restaurants"); // this is the url that people will go to
app.use("*", (req, res) => res.status(404).json({ error: "not found" })); // a route that is not in our route file

export default app;
//separating server file from main file that you node run
