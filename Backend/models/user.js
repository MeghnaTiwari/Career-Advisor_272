var mongoose = require("mongoose");

const users = new mongoose.Schema({
  Name: {
    type: String
  },
  Email: {
    type: String
  },
  Password: {
    type: String
  },
  card: [{ cardNumber: String, cvv: String, balance: Number }]
});
var user = mongoose.model("user", users);
module.exports = user;
