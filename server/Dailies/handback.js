const {fileName} = require('./accural');

let Client =  require('ssh2-sftp-client');
let sftp = new Client();

const config = {
    host: "66.220.9.51",
	username: "sutd_2022_c4g7",
	password: "rxh3qpj7man0qwz_CNZ"
}

function filterItems(val){
    return val.name == "20227171.csv"
} 

sftp
.connect(config)
.then(() => {
    return sftp.get("/20227171.csv", "./destination/handback.csv")
}).then ( data => {
    console.log("outputting data\n", data)
    // you need to createReadStream here, then read the content of one of the files.
}).then(() => {
    sftp.end();
})
.catch(err =>{
    console.log(err)
});

// TODO: July 19th 2020:
//       Create a fs of the data being read. Not sure if you can read it directly
//       Explore the options

// when the user presses the create accrual file, a handback file containing the same details as the accrual file must be generated. 
// the handback file generated must contain randomized outcome codes. 
// the handback file generated must be pushed to the mongodb serevr on the local host

