// import dbName from './settings';
var config = require("./../config/settings");

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(config.dbURL, { useNewUrlParser: true });
var mdb = mongoose.connection;

mdb.on("error", console.error.bind(console, "Connection error"));
mdb.on("open", () => {
  console.log("MongoDB connected!");
});

module.exports = { mongoose };
