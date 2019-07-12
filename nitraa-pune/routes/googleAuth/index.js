var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var express = require('express');
var path = require('path');
var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
var app = express();
var jwt = require('jsonwebtoken');
var jwt_salt = require('../constant/jwt/index');
var urlMongo = require('../constant/mongodbAddress/index');

router = express.Router();

router.post('/', (req, res, next) => {
   let profileObj = req.body.profileObj;
   console.log(profileObj);
   mongo.connect(urlMongo, {useNewUrlParser : true}, (err, db) => {
     if(err){
       res.json({
         status: "fail",
         message: "Error in connection. Please try after some time."
       });
     }
     else{
       dbo = db.db("nitraapune");
       dbo.collection("users").findOne({ email: profileObj.email }, (err1, res1) => {
         if(err1){
           db.close();
           res.json({
             status: "fail",
             message: "Unexpected Error. Please try after some time."
           });
         }
         else{
           if(res1 != null){
             if(res1.type === "google"){
               var userId = res1._id;
               var jwtToken = jwt.sign({tid: userId}, jwt_salt);
               if(jwtToken){
                 db.close();
                 res.set({
                   'authtoken': jwtToken
                 });
                 res.json({
                   status: "success",
                   message: "Successfully logged in."
                 });
               }
               else{
                 db.close();
                 res.json({
                   status: "fail",
                   message: "Could not log in."
                 });
               }
             }
             else{
               db.close();
               res.json({
                 status: "fail",
                 message: "Email Address already registered in an existing account."
               });
             }
           }
           else{
             dbo.collection("users").insertOne({
               "name": profileObj.name,
               "email": profileObj.email,
               "type": "google",
               "idToken": profileObj.googleId,
               "address": "",
               "phone": "",
               "dob" : "",
               "permanent_adr": "",
               "hobbies": [],
               "yop": "",
               "branch": "",
               "organization": "",
               "due_timestamp": 0,
               "cover_pic_ext": null
             }, (err2,res2)=>{
               if(err2){
                 db.close();
                 res.json({
                   status: "fail",
                   response: "Unexpected Error. Please try after some time."
                 });
               }
               else{
                 if(res2.insertedId){
                   var userId = res2.insertedId;
                   var jwtToken = jwt.sign({tid: userId}, jwt_salt);
                   if(jwtToken){
                     db.close();
                     res.set({
                       'authtoken': jwtToken
                     });
                     res.json({
                       status: "success",
                       response: "Successfully logged in."
                     });
                   }
                   else{
                     db.close();
                     res.json({
                       status: "fail",
                       response: "Could not log in."
                     });
                   }
                 }
                 else{
                   db.close();
                   res.json({
                     status: "fail",
                     response: "Could not log in."
                   });
                 }
               }
             });
           }
         }
       });
     }
   })
 });

module.exports = router;
