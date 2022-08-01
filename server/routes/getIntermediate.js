require("../db/config");

const express = require("express");

const intermediaryhandback = require("../db/intermediateHandback");
const router = express.Router();

router.get("/", (req, res) => {
    intermediaryhandback.find({}, (err, result) => {
        if (err) console.log(err);
        else {
            console.log("retrieving information...")
            res.json(result)
        }
    })
})

module.exports = router;
