var mongoose = require("mongoose");

const members = new mongoose.Schema({
  User: {
    type: String
  },
  email: {
    type: String
  },
  Role: {
    type: String
  },
  Experience: {
    type: String
  },
  Skills: {
    type: Array
  } ,
  Certifications: {
    type: Array
  }
});
var member = mongoose.model("member", members);
module.exports = member;
