require("../db/config");
const creditReq = require("../db/creditReq");
const { parse } = require("json2csv");
const { writeTo } = require("./sftp");

var fileName;
const makeAccural = async () => {
  const fields = [
    "memberid",
    "fullname",
    "date",
    "amount",
    "partnercode",
    "loyaltyprogramme",
    "refcode",
  ];
  const opts = { fields };
  const all = await creditReq.find({});
  const today = new Date();
  try {
    const csv = parse(all, opts);
    fileName = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}${curr}.csv`
    writeTo(
      fileName,
      csv
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = { makeAccural, fileName };
