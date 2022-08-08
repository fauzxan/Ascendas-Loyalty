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
  const all = await creditReq.aggregate([
    {
      $group: { _id: "$loyaltyprogramme", r: { $push: "$$ROOT" } },
    },
  ]);
  const today = new Date();
  for (const e of all) {
    try {
      console.log(e._id);
      const csv = parse(e.r, opts); // parses the data in mongodb as csv
      console.log(csv);
      fileName =
        e._id.replace(/\s+/g, "-").toLowerCase() +
        "_" +
        `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}.csv`;
      console.log("accrual file name: ", fileName);
      console.log("Writing to accrual file...");
      writeTo(fileName, csv);
      console.log("Accrual written!");
    } catch (err) {
      console.error(err);
    }
  }
  await creditReq.deleteMany({});
};

module.exports = { makeAccural, fileName };
