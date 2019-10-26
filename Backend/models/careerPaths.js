var mongoose = require("mongoose");

const careerPaths = new mongoose.Schema({
  CareerPath: {
    type: String
  }
});
var c = mongoose.model("c", careerPaths);
module.exports = c;
