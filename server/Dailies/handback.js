// 
/*
**********************************************************************************************
DOCUMENTATION:
Dailies/handback.js helps retrieve data from the SFTP server and send it to mongodb.
This is meant to serve as part of a testing routine, in which randomized outcome codes are 
generated and stored in mongodb. 
When the user queries the transaction in the frontend, a valid outcome code is generated. 
**********************************************************************************************

*/

require("../db/config");

let Client = require("ssh2-sftp-client");
let sftp = new Client();
const fs = require("fs");
const csv = require("csv-parser");
const csvToJson = require('csvtojson');

const express = require("express");
const handbackModel = require("../db/handbackModel");
const router = express.Router();

const outcomeCodes = ["0000", "0001", "0002", "0003", "0004", "0005", "0099"];

const makeHandback = async () => {
	// this part is required to make a connection to the correct sftp server
	const config = {
		host: "66.220.9.51",
		username: "sutd_2022_c4g7",
		password: "rxh3qpj7man0qwz_CNZ",
	};

	// For the file name of the day
	var today = new Date();
	console.log(today);

	let fileName = `${today.getFullYear()}${
		today.getMonth() + 1
	}${today.getDate()}.csv`;

	console.log("filename to be opened: " + fileName);

	sftp
		.connect(config)
		.then(() => {
			return sftp.list("/");
		})
		.then(() => {
			console.log("Writing to HANDBACK now...");
			/*
            ************************************************************************
            // ABSTRACT: this is how you pipe the data back into the SFTP server 
            // according to the documentation, as well as stackoverflow posts
            // ERROR ENCOUNTERED: The file written back to SFTP server is 0 bytes wide
            // TODO: need to explore the 'options' parameter
            // SOLUTION: (code below)
            sftp.get(fileName).then((stream)=> {
                stream.pipe(sftp.createWriteStream(`HANDBACK${fileName}`))
            })
            ************************************************************************
            */
			// INTERMEDIATE SOLUTION: (code below)
			return sftp.get(fileName, `./destination/HANDBACK${fileName}`);
		})
		.then(() => {
			console.log("done writing!");
			sftp.end();
		})
		.catch((err) => {
			console.log("There is an error ", err);
		});
	try {
        // json variable parses the incoming values from the csv file and puts it in object form
		const json = await csvToJson().fromFile(`./destination/HANDBACK${fileName}`)
        for (let i = 0; i < json.length; i++) {
			delete json[i]["loyaltyprogramme"];
			delete json[i]["partnercode"];
			delete json[i]["memberid"];
			delete json[i]["fullname"];
			json[i]["outcomecode"] =
				outcomeCodes[Math.floor(Math.random() * outcomeCodes.length)];
			//console.log(json[i]);
		}
		console.log(json);
		let newHandbackModel = new handbackModel(json);
		await newHandbackModel.save();
	} catch (err) {
		console.log("Ignore this error");
	}
};

module.exports = { makeHandback };

/*
    FORMAT: (of the handback file for reference)
    date: String,
	amount: Number,
	referencenumber: Number,
    outcomecode: String 
*/
