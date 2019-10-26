var mongoose = require("mongoose");

const events = new mongoose.Schema({
  Eventname: {
    type: String
  },
  Careerpath: {
    type: String
  },
  Eventlogo: {
    type: String
  },
  Eventlink: {
    type: String
  },
  Eventdate: {
    type: String
  }
});
// var event = event.model("event", events);
// module.exports = event;


module.exports = mongoose.model('event', events);