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
const csvToJson = require("csvtojson");
const { parse } = require("json2csv");
const User = require("../db/User");
const mongodb = require("mongodb");
const { Readable } = require("stream");

const express = require("express");
const handbackModel = require("../db/handbackModel");
const intermediaryhandback = require("../db/intermediateHandback");
const { ObjectID } = require("bson");
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

	await sftp
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
			return sftp.get(fileName, `./destination/HANDBACK`);
		})
		.then(async () => {
			const json = await csvToJson().fromFile("./destination/HANDBACK");
			for (let i = 0; i < json.length; i++) {
				delete json[i]["loyaltyprogramme"];
				delete json[i]["partnercode"];
				delete json[i]["memberid"];
				delete json[i]["fullname"];
				json[i]["outcomecode"] =
					outcomeCodes[Math.floor(Math.random() * outcomeCodes.length)];
				json[i]["_id"] = new ObjectID();
			}
			// code to convert json to csv as a file stream
			console.log("json:", json);
			const csvFormat = convertToCSV(json);
			//console.log(csvFormat);
			const readable = Readable.from([csvFormat]);

			return sftp.put(readable, `./handback/HANDBACK${fileName}`);
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
		const json = await csvToJson().fromFile(`./destination/HANDBACK`);
		var json_copy = JSON.parse(JSON.stringify(Array.from(json)));
		// deepcopy of a shallow copy. Please dont ask me why I did this in the morning. This is the only way it works
		// Array.from(json) makes the json_copy changeable without changing json. JSON.parse(JSON.stringify()) makes a deep copy of the parameter passed.
		// fkn stackoverflow was down so I had to figure this one out on my own

		console.log("reaches here");

		for (let i = 0; i < json.length; i++) {
			delete json[i]["loyaltyprogramme"];
			delete json[i]["partnercode"];
			delete json[i]["memberid"];
			delete json[i]["fullname"];
			let outcomeCodeCopy =
				outcomeCodes[Math.floor(Math.random() * outcomeCodes.length)];
			json[i]["outcomecode"] = outcomeCodeCopy;
			json[i]["_id"] = new ObjectID();
			//console.log(json[i]);
			json_copy[i]["outcomecode"] = outcomeCodeCopy;
		}
		console.log("json_copy", json_copy);
		await intermediaryhandback.deleteMany({});
		await intermediaryhandback.insertMany(json_copy);

		try {
			await handbackModel.deleteMany({});
			await handbackModel.insertMany(json);
			var userHashMap = [];
			
			// Alphonsus
			for (let i = 0; i < json_copy.length; i++) {
				if ((userHashMap.includes(json_copy[i].fullname)) == false) { 
					// need to debug why this part is not working. It is only supposed to update if the name does not exist in the hash map
					console.log(json_copy[i].fullname);
					let transactionsprep = [];
					json_copy.map((value, index, arr) => {
						if (value.fullname == json_copy[i].fullname) {
							const referenceNumbercopy = json_copy[index].referenceNumber;
							const outcomeCopy = json_copy[index].outcomecode;
							const obj = { [`${referenceNumbercopy}`]: outcomeCopy };
							transactionsprep.push(obj);
						}
					});
					console.log("transactions", transactionsprep);

					User.findOneAndUpdate(
						{ name: `${json_copy[i].fullname}` },
						{
							$set: {
								transactions: transactionsprep[0],
							},
						}
					);
					userHashMap.push(json_copy[i].username);
				}

				/*
				const username = json_copy[i]["username"]
				const referenceNumber = json_copy[i]["referenceNumber"]
				const outcomecodetemp = json_copy[i]["outcomecode"]

				if (username in userHashMap) {
					// if the users transaction already exists
					userHashMap.username.referenceNumber.push(
						outcomecodetemp
					);
				} else {
					// otherwise just create 
					userHashMap.username = {}
					userHashMap.username.referenceNumber = new Array();
					// and push
					userHashMap.username.referenceNumber.push(
						outcomecodetemp
					);
				}
*/
			}
			console.log(userHashMap);
			//await User.updateAll
			console.log("writing to handback file in mongoDB");
		} catch (err) {
			console.log(err);
		}
	} catch (err) {
		console.log("Ignore this error", err);
	}
	console.log("handback update process done!");
};

function convertToCSV(arr) {
	var arrconv = '"date","amount","referenceNumber","outcomecode"\r\n';
	for (let i = 0; i < arr.length; i++) {
		arrconv +=
			arr[i]["date"] +
			"," +
			arr[i]["amount"] +
			"," +
			arr[i]["referenceNumber"] +
			"," +
			arr[i]["outcomecode"] +
			"\r\n";
	}
	return arrconv;
}

module.exports = { makeHandback };

/*
    FORMAT: (of the handback file for reference)
    date: String,
	amount: Number,
	referencenumber: Number,
    outcomecode: String 
*/
