// 1. pull the content out of the handback file in the mongodb as a csv file
// 2. store the content inside the sftp drive Z:
// 3. generate randomized outcome code
// 4. import the randomized outcome code into the handback document inside mongodb, such that it overwrites the existing content with fresh content

const { slotShouldForwardProp } = require("@mui/material/styles/styled");

//1.
/*
const mongodb = require("mongodb").MongoClient;
const fastcsv = require("fast-csv");
const fs = require("fs");

let uniqueTime = new Date().toLocaleTimeString();
let uniqueDate = new Date().toLocaleDateString();
let fileName = `ftp://sutd_2022_c4g7:rxh3qpj7man0qwz_CNZ@ftp.drivehq.com/accrual.csv`;
const writeStream = fs.createWriteStream(fileName);
let url =
	"mongodb+srv://c4g7:loyalty@ascenda-loyalty.684oztw.mongodb.net/loyalty?retryWrites=true&w=majority";

mongodb.connect(
	url,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err, client) => {
		if (err) throw err;
		client
			.db()
			.collection("creditreqs")
			.find({})
			.toArray((err, data) => {
				if (err) throw err;
				console.log(data);

				fastcsv
					.write(data, { headers: true })
					.on("finish", function () {
						console.log("written succesfully");
					})
					.pipe(writeStream);
				client.close();
			});
	}
);
*/
var client = require ('ssh2').Client;
var m_ssh2Credentials = {
	host: config.ftpHostName,
	port: config.ftpPort,
	username: config.ftpUser,
	password: config.ftpPassword,
	readyTimeout: 20000,
	algotithms: { cipher: ["3des-cbc", "aes256-cbc", "aes192-cbc","aes128-cbc"]}
};

var conn = new Client();
var datalength = 0;
conn.on('ready', () => { // on is an event listener. "ready" is the event
	conn.sftp((err, sftp) => {
		if (err){
			writeToErrorLog("Failed to open SFTP connection.");
		}
		else{
			writeToLog("Opened SFTP connection!");
		}

		var streamErr = "";
		var datalength = 0;

		var stream = 




	})
})