let Client = require("ssh2-sftp-client");

const config = {
  host: "66.220.9.51",
  username: "sutd_2022_c4g7",
  password: "rxh3qpj7man0qwz_CNZ",
};

const today = new Date();

const writeTo = async (fname, data) => {
  let sftp = new Client();
  sftp
    .connect(config)
    .then(() => {
      return sftp.mkdir(
        "/Accrual/" +
          `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`
      );
    })
    .then(() => {
      return sftp.cwd();
    })
    .then((p) => {
      const w = sftp.createWriteStream(
        p +
          "Accrual/" +
          `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}` +
          "/" +
          fname
      );
      w.write(data);
      w.end();
      w.on("close", () => {
        console.log("Accrual file successfully created");
        return sftp.end();
      });
    })
    .catch((err) => {
      console.log(`Error: ${err.message}`);
    });
};

module.exports = { writeTo };
