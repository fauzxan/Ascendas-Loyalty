require("../db/config");
const creditReq = require("../db/creditReq");
const { parse } = require("json2csv");
const { writeTo } = require("./sftp");

var fileName;
const makeAccural = async () => {
  const fields = [
    "memberid",
    "fullname",
    "email",
    "date",
    "amount",
    "partnercode",
    "loyaltyprogramme",
    "referenceNumber",
  ];
  const opts = { fields };
  const all = await creditReq.find({});
  const today = new Date();
  try {
    const csv = parse(all, opts); // parses the data in mongodb as csv
    fileName = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}.csv`
    console.log("accrual file name: ", fileName);
    console.log("Writing to accrual file...")
    writeTo(
      fileName,
      csv
    );
    console.log("Accrual written!")
  } catch (err) {
    console.error(err);
  }
  await creditReq.deleteMany({})
};

module.exports = { makeAccural, fileName };
