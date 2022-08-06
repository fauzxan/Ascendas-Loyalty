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
const csv = require("csvtojson");
const { Readable } = require("stream");
const Axios = require("axios");
const host = require("../config");

const outcomeCodes = ["0000", "0001", "0002", "0003", "0004", "0005", "0099"];
const today = new Date();
const makeHandback = async () => {
  const config = {
    host: "66.220.9.51",
    username: "sutd_2022_c4g7",
    password: "rxh3qpj7man0qwz_CNZ",
  };

  let fd =
    "/Accrual" +
    "/" +
    `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}/`;
  await sftp
    .connect(config)
    .then(() => {
      sftp.mkdir(
        "/Handback/" +
          `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}/`
      );
    })
    .then(() => {
      return sftp.list(fd);
    })
    .then(async (ls) => {
      var o = [];
      for (const e of ls) {
        const r = await sftp.get(fd + e.name);
        const t = await csv().fromString(r.toString());
        var jc = JSON.parse(JSON.stringify(t));
        for (let i = 0; i < t.length; i++) {
          let oc =
            outcomeCodes[Math.floor(Math.random() * outcomeCodes.length)];
          jc[i]["outcomecode"] = oc;
          t[i]["outcomecode"] = oc;
          delete jc[i]["loyaltyprogramme"];
          delete jc[i]["partnercode"];
          delete jc[i]["memberid"];
          delete jc[i]["fullname"];
        }
        const cf = convertToCSV(jc);
        const readable = Readable.from([cf]);
        await sftp.put(
          readable,
          "/Handback/" +
            `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}/` +
            `HANDBACK_${e.name}`
        );
        o = o.concat(t);
      }
      console.log(o);
      return o;
    })
    .then(async (o) => {
      Axios.post(host + "/updatestatus", o)
        .then(() => {
          console.log("Update status success");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .then(() => {
      console.log("done writing!");
      sftp.end();
    })
    .catch((err) => {
      console.log("There is an error ", err);
    });
};

function convertToCSV(arr) {
  var arrconv = '"date","amount","referenceNumber","outcomecode","email"\r\n';
  for (let i = 0; i < arr.length; i++) {
    arrconv +=
      arr[i]["date"] +
      "," +
      arr[i]["amount"] +
      "," +
      arr[i]["referenceNumber"] +
      "," +
      arr[i]["outcomecode"] +
      "," +
      arr[i]["email"] +
      "\r\n";
  }
  return arrconv;
}

module.exports = { makeHandback };
