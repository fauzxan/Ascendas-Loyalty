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
const csvToJson = require("csvtojson");
const mongodb = require("mongodb");
const { Readable } = require("stream");
const Axios = require("axios");
const host = require("../config");

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
      const ojson = await csvToJson().fromFile("./destination/HANDBACK");
      var json_copy = JSON.parse(JSON.stringify(ojson));
      for (let i = 0; i < ojson.length; i++) {
        delete json_copy[i]["loyaltyprogramme"];
        delete json_copy[i]["partnercode"];
        delete json_copy[i]["memberid"];
        delete json_copy[i]["fullname"];
        let oc = outcomeCodes[Math.floor(Math.random() * outcomeCodes.length)];
        json_copy[i]["outcomecode"] = oc;
        ojson[i]["outcomecode"] = oc;
        json_copy[i]["_id"] = new ObjectID();
      }
      const csvFormat = convertToCSV(json_copy);
      var json = ojson;
      var fields = Object.keys(json[0]);
      var replacer = function (key, value) {
        return value === null ? "" : value;
      };
      var csv = json.map(function (row) {
        return fields
          .map(function (fieldName) {
            return JSON.stringify(row[fieldName], replacer);
          })
          .join(",");
      });
      csv.unshift(fields.join(","));
      csv = csv.join("\r\n");
      const readable = Readable.from([csvFormat]);
      fs.writeFile("./destination/HANDBACK", csv, function (err) {
        console.log("Completed");
      });
      return sftp.put(readable, `HANDBACK${fileName}`);
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
    Axios.post(host + "/updatestatus", json)
      .then((result) => {
        console.log("Update status success");
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log("Ignore this error", err);
  }
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
