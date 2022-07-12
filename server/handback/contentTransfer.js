// 1. pull the content out of the handback file in the mongodb as a csv file
// 2. store the content inside the sftp drive Z:
// 3. generate randomized outcome code
// 4. import the randomized outcome code into the handback document inside mongodb, such that it overwrites the existing content with fresh content

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
var fs = require("fs"),
	client = require("ssh2").Client; // creating the ssh2 connection variable 

upoladFile({
	localFolder:
		"C:\\Users\\fauza\\Desktop\\School stuff\\Elements of Software Construction\\Ascendas-Loyalty\\server\\rwStream\\",
	localFile: "accrual.csv",
	remoteFolder: "\\DriveHQShare\\melvrickgoh\\sutd_2022_c4g7\\",
	remoteFile: "accrual.csv",
	host: "proFTP.drivehq.com",
	port: 22,
	username: "sutd_2022_c4g7",
	password: "rxh3qpj7man0qwz_CNZ",
});

function upoladFile(p) {
	var conn = new client();
	conn
		.on("ready", function () {
			conn.sftp(function (err, sftp) {
				if (err) throw err;
				sftp.readdir(p.remoteFolder, function (err, list) {
					if (err) throw err;
					console.dir(list);
					var readStream = fs.createReadStream(p.localFolder + p.localFile);
					var writeStream = sftp.createWriteStream(
						p.remoteFolder + p.remoteFile,
						{ mode: 0100664 }
					);
					writeStream.on("close", function () {
						sftp.readdir(p.remoteFolder, function (err, list) {
							if (err) throw err;
							console.dir(list);
							conn.end();
						});
					});
					readStream.pipe(writeStream);
				});
			});
		})
		.connect({
			host: p.host,
			port: p.port,
			username: p.username,
			password: p.password,
		});
}
