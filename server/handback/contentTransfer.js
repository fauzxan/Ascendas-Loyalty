// 1. pull the content out of the handback file in the mongodb as a csv file
// 2. store the content inside the sftp drive Z:
// 3. generate randomized outcome code
// 4. import the randomized outcome code into the handback document inside mongodb, such that it overwrites the existing content with fresh content

//1.
const mongodb = require("mongodb").MongoClient;
const fastcsv = require("fast-csv");
const fs = require("fs");

let uniqueTime = new Date().toLocaleTimeString();
let uniqueDate = new Date().toLocaleDateString();
let fileName = `./server/rwStream/accrual.csv`;
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
						console.log("Write to bezkoder_mongodb_fastcsv.csv successfully!");
					})
					.pipe(writeStream);
				client.close();
			});
	}
);
