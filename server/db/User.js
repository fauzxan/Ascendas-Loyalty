const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { use } = require("../routes/login");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  transactions: {
    type: Map,
    default: {}
  },
  points: Number
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

userSchema.methods.cp = function(p, c) {
    bcrypt.compare(p, this.password, function(e, im) {
      if (e) {
        return c(e)
      } else {
        c(null, im)
      }
    })
  }

module.exports = mongoose.model("users", userSchema);
