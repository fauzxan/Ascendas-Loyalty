/*
********************************************
DOCUMENTATION:
PROBLEM:
This is a solution I came up with because the handback file in the local mongodb
does not contain any identifying information of the user. So there is no way to know 
which users dictionary I have to update. 
SOLUTION:
The intermediary handback file, unlike the original handback file in mongodb,
contains all of the information passed on to us by the handback file from the SFTP server!
So, what does this solve?
    This helps update the transactions list in the Users database. Before this there
    was no other way to help solve this problem
********************************************
*/

const mongoose = require('mongoose')

const intermediarySchema = new mongoose.Schema({
    // "memberid","fullname","date","amount","partnercode","loyaltyprogramme","refcode"
    memberid: String,
    fullname:String,
    date: String,
    amount: Number,
    partnercode: String,
    loyaltyprogramme: String,
    referencecode: Number
});

const intermediaryModel = mongoose.model("intermediaryhandback", intermediarySchema);

module.exports = intermediaryModel;
