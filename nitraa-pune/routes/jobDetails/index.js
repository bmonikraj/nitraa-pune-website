var express = require('express'),
    path = require('path'),
    mongo = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
    bodyParser = require('body-parser'),
    app = express(),
    multer = require('multer');
var jwt = require('jsonwebtoken');
var jwt_salt = require('../constant/jwt/index');
var urlMongo = require('../constant/mongodbAddress/index');
var glob = require('glob');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
router = express.Router();

/******************************************Job Details Upload**************************************************/
router.post('/', function (req, res, next){
    jwt_token = req.get('authtoken');
    if (jwt_token && jwt.verify(jwt_token, jwt_salt).tid){
        var uid = jwt.verify(jwt_token, jwt_salt).tid;
        mongo.connect(urlMongo, {useNewUrlParser : true}, function (err_mdbcon, db) {
            if (err_mdbcon == null) {
                dbo = db.db('nitraapune');
                dbo.collection('users').findOne({ _id: ObjectID(uid)}, function (err_arr, res_auth){
                  console.log(res_auth);
                  if(err_arr){
                    db.close();
                    res.json({
                      status: "failure",
                      message: "Authentication failed!"
                    });
                  }
                  else{
                    dbo.collection("jobs").insertOne({
                      jobTitle: req.body.jobTitle,
                      jobDatePosted: req.body.jobDatePosted,
                      jobDescription: req.body.jobDescription,
                      jobCompanyName: req.body.jobCompanyName,
                      jobLocation: req.body.jobLocation,
                      jobDeadline: req.body.jobDeadline,
                      jobExtLinks: req.body.jobExtLinks,
                      jobApplicationLink: req.body.jobApplicationLink,
                      jobPostedby: req.body.jobPostedby
                    }, (err1, res1) => {
                      if(err1){
                        db.close();
                        res.json({
                          status: 'failure',
                          message: 'Database operation error'
                        });
                      }
                      else{
                        console.log(res1);
                        if(res1.insertedId){
                          db.close();
                          res.json({
                            status: 'success',
                            message: 'Job Details inserted successfully!!!'
                          });
                        }
                        else{
                          db.close();
                          res.json({status: "fail", message:"Couldn't insert details"});
                        }
                      }
                    });
                  }
                });
            }
            else{
                res.json({status: 'fail', message: 'Database connection failed'});
            }
        });
    }
    else{
      res.json({status: 'fail', message: 'Token authentication failed'});
    }
});
/******************************************Job Details Upload ends*************************************/

/********************************************Job Details Get Begins**************************************************/
router.get('/', function (req, res, next) {
  mongo.connect(urlMongo, {useNewUrlParser: true}, (err, db) => {
    if(err){
      db.close();
      res.json({
        status: 'failure',
        message: 'Database Connection Error!!'
      });
    }
    else{
        dbo = db.db('nitraapune');
        dbo.collection('jobs').find({}).toArray((err1, res1) => {
          if(err1){
            db.close();
            res.json({
              status: 'failure',
              message: 'Database operation error'
            });
          }
          else{
            if(res1){
              db.close();
              res.json({
                status: 'success',
                data: res1
              });
            }
            else{
              db.close();
              res.json({
                status: 'failure',
                message: 'Error fetching data'
              });
            }
          }
        });
    }
  });
});
/*******************************************Job Details Get Ends*********************************************/

/*******************************************Single Job Details Get Begins*********************************************/
router.get('/:id', function (req, res, next) {
  let id = req.params.id;
  console.log(id);
  if(id !== null){
    mongo.connect(urlMongo, {useNewUrlParser: true}, (err, db) => {
      if(err){
        db.close();
        res.json({
          status: 'failure',
          message: 'Database Connection Error!!'
        });
      }
      else{
          dbo = db.db('nitraapune');
          dbo.collection('jobs').findOne({_id: ObjectID(id)}, (err1, res1) => {
            if(err1){
              db.close();
              res.json({
                status: 'failure',
                message: 'Database operation error'
              });
            }
            else{
              if(res1){
                db.close();
                res.json({
                  status: 'success',
                  data: res1
                });
              }
              else{
                db.close();
                res.json({
                  status: 'failure',
                  message: 'Error fetching data'
                });
              }
            }
          });
      }
    });
  }
  else{
    res.json({
      status: 'failure',
      message: 'Error in fetching job data'
    });
  }
});
/*******************************************Single Job Details Get Ends*********************************************/

/*******************************************Job Details Edit Begins*********************************************/
router.put('/update', (req, res, next) => {
  var jwt_token = req.get('authtoken');
  var jobTitle = req.body.jobTitle;
  var jobDatePosted =  req.body.jobDatePosted;
  var jobDescription=  req.body.jobDescription;
  var jobCompanyName= req.body.jobCompanyName;
  var jobLocation = req.body.jobLocation;
  var jobDeadline = req.body.jobDeadline;
  var jobExtLinks = req.body.jobExtLinks;
  var jobApplicationLink = req.body.jobApplicationLink;
  var jobPostedby = req.body.jobPostedby;
  if(jwt_token){
    if(jobTitle && jobDatePosted && jobDescription && jobCompanyName && jobLocation && jobDeadline && jobExtLinks && jobApplicationLink && jobPostedby){
      mongo.connect(urlMongo, {useNewUrlParser: true}, (err, db) => {
        if(err){
          db.close();
          res.json({
            status: 'failure',
            message: 'Database Connection failed!!'
          });
        }else{
          dbo = db.db('nitraapune');
          dbo.collection('jobs').updateOne({_id: ObjectID(req.body.id)},
          {$set:{
            jobTitle: jobTitle,
            jobDatePosted: jobDatePosted,
            jobDescription: jobDescription,
            jobCompanyName: jobCompanyName,
            jobLocation: jobLocation,
            jobDeadline: jobDeadline,
            jobExtLinks: jobExtLinks,
            jobApplicationLink: jobApplicationLink,
            jobPostedby: jobPostedby
          }}, (err1, res1) => {
            if(err1){
              db.close();
              res.json({status: "failure", message: "Database operation error"});
            }
            else{
              if(res1.modifiedCount == 1){
                db.close();
                res.json({status: "success", message: "Job Details Updated Successfully", data: res1});
              }
              else{
                db.close();
                res.json({status: "failure", message: "No matches found."});
              }
            }
          });
        }
        });
      }else{
        res.json({
          status: "failure",
          message: "One or more fields missing."
      });
    }
  }else{
    res.json({
      status: 'failure',
      message: 'Unauthorized access'
    });
  }
});
/*******************************************Job Details Edit Ends*********************************************/

/*******************************************Job Details Delete Begins*********************************************/
router.delete('/', (req, res, next) => {
  let id = req.body.id;
  if(id === null){
    var jwt_token = req.get('authtoken');
    if(jwt_token){
      mongo.connect(urlMongo, {useNewUrlParser: true}, (err, db) => {
        if(err == null){
          dbo = db.db('nitraapune');
          dbo.collection('jobs').findOne({_id: ObjectID(id)}, (err1, res1) => {
            if(err1){
              res.json({
                status: 'failure',
                message: 'No such event exists!'
              });
            }
            else{
              console.log("Event Deleted");
              dbo.collection('jobs').deleteOne({_id: ObjectID(id)}, (err2, res2) => {
                if(err2){
                  db.close();
                  res.json({
                    status: 'failure',
                    message: 'Job Deletion failed!!'
                  });
                }
                else{
                  db.close();
                  res.json({
                    status: 'success',
                    message: 'Job deleted successfully'
                  });
                }
              });
            }
          });
        }
        else{
          db.close();
          res.json({
            status: 'failure',
            message: 'Database Connection failed'
          });
        }
      });
    }
    else{
      res.json({
        status: 'failure',
        message:'Unauthorized access'
      });
    }
  }
  else{
    res.json({
      status: 'failure',
      message: 'Missing Parameters'
    });
  }
});
/*******************************************Job Details Delete Ends*********************************************/
module.exports = router;
