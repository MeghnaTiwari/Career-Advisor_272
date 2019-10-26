var mongoose = require("mongoose");

const courses = new mongoose.Schema({
  Careerpath: {
    type: String
  },
  Skill: {
    type: String
  },
  Title: {
    type: String
  },
  Courselink: {
    type: String
  },
  Certification: {
    type: String
  }
});
var course = mongoose.model("course", courses);
module.exports = course;
