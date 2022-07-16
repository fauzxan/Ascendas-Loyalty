let Client = require("ssh2-sftp-client");

const config = {
  host: "66.220.9.51",
  username: "sutd_2022_c4g7",
  password: "rxh3qpj7man0qwz_CNZ",
};

const writeTo = async (fname, data) => {
  let sftp = new Client();
  sftp
    .connect(config)
    .then(() => {
      return sftp.cwd();
    })
    .then((p) => {
      sftp.createWriteStream(p + fname).write(data);
      return sftp.end();
    })
    .catch((err) => {
      console.log(`Error: ${err.message}`);
    });
};

module.exports = { writeTo };
writeTo("eff.txt", "stop looking at me");
