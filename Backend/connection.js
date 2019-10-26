const mongoose = require("mongoose");

// Mongo db Connection
mongoose
  .connect(
    "mongodb+srv://sanith:hello@272main-ryn9i.mongodb.net/test?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Mongo connected"))
  .catch(err => console.log("error in Mongo connection:" + err));

//export My Sql Connection
module.exports = db;

//Older mongo connection string from Laxmikant
// mongoose
//   .connect(
//     "mongodb+srv://canvas:canvas@cluster0-llr4m.mongodb.net/Quora?retryWrites=true",
//     { useNewUrlParser: true }
//   )
//   .then(() => console.log("Mongo COnnected"))
//   .catch(err => console.log(err));
