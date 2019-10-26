const Express = require("express");
const BodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
var member = require("./models/members");
var role = require("./models/careerPaths");
var course = require("./models/courses");
var mongoose = require("mongoose");
var user = require("./models/user");

const uri =
  "mongodb+srv://sanith:hello@272main-ryn9i.mongodb.net/272project?retryWrites=true";
const options = {
  type: "mongodb",
  ssl: true,
  authsource: "admin",
  replicaSet: "canvas-shard-0",
  reconectTries: Number.MAX_VALUE,
  useNewUrlParser: true
};
var app = Express();

app.use(BodyParser.json());
app.use(cors());
app.use(BodyParser.urlencoded({ extended: true }));
mongoose.connect(uri, { useNewUrlParser: true });
mongoose.set("useCreateIndex", true);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function() {
  console.log("Mongodb Connection created");
});

//use cors to allow cross origin resource sharing
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

var port = 8000;
app.listen(port, () => {
  console.log("Listening at ", port);
});

//
app.post("/signup", (req, res) => {
  // You'll create your note here.
  res.send("Hello");
});

/* --------------------> Signup <-------------------- */
app.post("/register", (req, res) => {
  // user.findOne({ Email: req.body.Email }, (err2, userResult) => {
  //   if (err2) {
  //     console.log("Error in  finding the user");
  //     res.status(400);
  //   } else {
  //     console.log("User already exists");
  //     res.json({ message: "user already  exists", status: 404 });
  //   }
  // });
  console.log("message received ", req.body);
  var usernew = new user({
    Name: req.body.Name,
    Email: req.body.Email,
    Password: req.body.Password
  });
  usernew.save(function(err, result) {
    console.log("inside save member");
    if (err) {
      console.log("error occured", err);
    } else {
      console.log("saved", result);
      let obj = {
        userid: result._id
      };
      res.json(obj).status(200);
    }
  });
});

//login
app.post("/login", (req, res) => {
  console.log("insideadgfdsdf login");
  console.log(req.body);
  user.findOne({ Email: req.body.Email }, (err, result) => {
    if (err) {
      res.json(err).status(400);
    } else {
      console.log("This is user", result.Password);
      if (result.Password === req.body.Password) {
        console.log("Auth Successful");
        if (result.card.length) {
          res
            .json({
              message:
                "Login successfull: you have already added your card please proceed with your order.  Choose your ordeer : 1.Cappuccino 2.Mocha 3.Carrotcake",
              status: 200,
              userid: result._id
            })
            .status(200);
        } else {
          res
            .json({
              message:
                "You dont have any card on your name , please add your card details and then proceed to order",
              status: 201,
              userid: result._id
            })
            .status(201);
        }
      } else {
        res.json({ message: "Incorrect Password", status: 404 }).status(400);
      }
    }
  });
});

//adding card
app.post("/addcard", (req, res) => {
  console.log("Inside Addcard");
  console.log(req.body);
  if (req.body.cardNumber.length == 9 && req.body.cvv.length == 3) {
    const cardDetails = {
      cardNumber: req.body.cardNumber,
      cvv: req.body.cvv,
      balance: 20
    };
    user.updateOne(
      { _id: req.body.userid },
      {
        $push: {
          card: cardDetails
        }
      },
      (err, result) => {
        if (err) {
          res.json("error while saving card details").status(400);
        } else {
          res.json(result).status(200);
          console.log(
            "Card details updated successfully ---Choose your ordeer : 1.Cappuccino 2.Mocha 3.Carrotcake"
          );
        }
      }
    );
  } else {
    res.json("Please enter 16 digit card number").status(400);
  }
});

//placing order
app.post("/placeorder", (req, res) => {
  console.log("Inside placeorder", req.body);
  user.findOne(
    { _id: req.body.userid, "card._id": req.body.cardId },
    { "card.$": 1 },
    (err, userResult) => {
      if (err) {
        res.json({ Message: "User not found" }).status(400);
      } else {
        console.log("This is the USER==========", userResult.card[0].balance);
        if (userResult.card[0].balance > 1.5) {
          user.update(
            { _id: req.body.userid, "card._id": req.body.cardId },
            { $inc: { "card.$.balance": -1.5 } },
            (err2, balanceResult) => {
              if (err2) {
                console.log("This is an error in deducting the amount");
                res.json({ Message: "Error in deducting amount" }).status(400);
              } else {
                console.log("BALANCE =======", balanceResult);
                res
                  .json({
                    Message: "Payment Successfull. Enjoy your order",
                    status: 200
                  })
                  .status(200);
              }
            }
          );
        } else {
          console.log("Does not have balance");
          res.json({
            Message:
              "Balance is less than $1.50, hence cannot place order. Please add another card.",
            status: 203
          });
        }
      }
    }
  );
});

app.get("/getprofile", (req, res) => {
  console.log("Inside getprofile", req.query);
  user.findById(req.query.userid, (err, result) => {
    if (err) {
      console.log(err);
      res.json(err).status(400);
    } else {
      console.log("User found", result);
      res.status(200).json(result);
    }
  });
});

//get card details
app.get("/getcards", (req, res) => {
  console.log("Inside ", req.query);
  user.findById(req.query.userid, (err, userResult) => {
    if (err) {
      res.json({ Message: "No User Found" }).status(400);
    } else {
      res.json(userResult).status(200);
    }
  });
});

/* --------------------> Find a user <-------------------- */
app.post("/find", (req, res) => {
  console.log("request body received ", req.body);
  member.find({ _id: req.body._id }, (err, results) => {
    if (err) {
      console.log("error ", err);
    } else {
      console.log("received Object", results);
      res.json(results).status(200);
    }
  });
});

/* --------------------> Find All career path <-------------------- */
app.get("/getalldata", async (req, res) => {
  let returnData = {
    roles: [],
    skills: [],
    certification: [],
    onlineCourses: []
  };
  careerRoles = await role.find({});
  console.log("roles", careerRoles);
  returnData.roles = careerRoles;

  skills = await course.find({}, "Skill");
  console.log("skills", skills);
  returnData.skills = skills;

  certification = await course.find({}, "Certification");
  console.log("certification", certification);
  returnData.certification = certification;

  // onlineCourses = await course.find({}, "Title CourseLink");
  // console.log("online courses", onlineCourses);
  // returnData.onlineCourses = onlineCourses;
  res.json(returnData).status(200);
});

/* --------------------> Create a user with details <-------------------- */

app.get("/jobsvscount", async (req, res) => {
  var agg = [
    {
      $group: {
        _id: "$Role",
        total: { $sum: 1 }
      }
    }
  ];
  logs = await member.aggregate(agg);
  if (!!logs && logs.length) {
    res.json(logs).status(200);
    console.log(logs);
  }
});
/* --------------------> Get courses and its relative courses with details <-------------------- */
app.post("/getcourses", (req, res) => {
  console.log("request body received ", req.body);
  member.findOne({ email: req.body.email }, (err1, memberResults) => {
    if (err1) {
      res.status(400).json({ message: "Error in finding the email in member" });
      console.log("error ", err1);
    } else {
      course.find(
        { Careerpath: memberResults.Role },
        "Title Courselink",
        (err2, courseResult) => {
          if (err2) {
            console.log(
              "Error in finding the courses pertaining to CareerPath",
              err2
            );
            res.status(400).json({
              message: "Error in finding the courses pertaining to CareerPath"
            });
          } else {
            console.log("Result ", courseResult);
            res.status(200).send(courseResult);
          }
        }
      );
    }
  });
});

/* --------------------> Get skills and its relative courses with details <-------------------- */
app.post("/getskills", (req, res) => {
  console.log("request body received ", req.body);
  member.findOne({ email: req.body.email }, (err1, memberResults) => {
    if (err1) {
      res.status(400).json({ message: "Error in finding the email in member" });
      console.log("error ", err1);
    } else {
      console.log("this is result", memberResults);
      course.find(
        { Careerpath: memberResults.Role },
        "Skill",
        (err2, courseResult) => {
          if (err2) {
            console.log("Error in finding the Skills", err2);
            res.status(400).json({
              message: "Error in finding the courses pertaining to CareerPath"
            });
          } else {
            let skillset = courseResult.map(e => e.Skill);
            let otherskills = skillset.filter(
              f => !memberResults.Skills.includes(f)
            );
            let finalData = {
              presentSkills: memberResults.Skills,
              neededSkills: otherskills
            };
            res.status(200).send(finalData);
          }
        }
      );
    }
  });
});
