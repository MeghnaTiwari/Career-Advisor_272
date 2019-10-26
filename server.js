const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
var members=require('./Backend/models/members');
var mongoose = require('mongoose');

const uri="mongodb+srv://sanith:hello@272main-ryn9i.mongodb.net/test?retryWrites=true"
const options={
  type:'mongodb',
  ssl:true,
  authsource:"admin",
  replicaSet:"canvas-shard-0",
  reconectTries:Number.MAX_VALUE,
  useNewUrlParser:true
}
var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
mongoose.connect(uri,{ useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
var db=mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB connection error:'));
db.once('open',function(){
  console.log("Mongodb Connection created");
})
var port =8000;
app.listen(port, () => {
    console.log("Listening at ",port);
});
app.post('/notes', (req, res) => {
      // You'll create your note here.
      res.send('Hello')
 });
 app.post('/register',(req,res)=>{
     console.log("message received ",req.body);
    var member = new members({
        "user": req.body.user,
        "email": req.body.email,
        "Role": req.body.Role,
        "Experience": req.body.Experience,
        "Skills":req.body.Skills,
        "Certifications":req.body.Certifications
    });

    member.save(function(err,result){
        console.log("inside save member");
        if(err){console.log("error occured",err)}
        else{
            console.log("saved",result)
            res.json(result).status(200);
        }
    })
 }) 

 app.post('/find',(req,res)=>{
console.log("request body received ",req.body);
members.find({_id:req.body._id},(err,results)=>{
    if(err){console.log("error ",err)}
    else{
        console.log("received Object",results);
        res.json(results).status(200);

    }
})


 })