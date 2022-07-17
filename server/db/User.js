const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  transactions: {
    type: Map,
    default: {}
  }
});

userSchema.pre("save", function (n) {
  const user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, (se, s) => {
      if (se) {
        return next(se);
      } else {
        bcrypt.hash(user.password, s, (he, h) => {
          if (he) {
            return next(he);
          }
          user.password = h;
          n();
        });
      }
    });
  } else {
    return n();
  }
});

module.exports = mongoose.model("users", userSchema);
