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
var upload = multer({dest:'public/images/events'});
var uploadPath = path.join(__dirname, '../../public/images/events');
router = express.Router();

/******************************************Event Details Upload Begins***********************************/
router.post('/', upload.single('ImageFile'), function (req, res, next) {
    jwt_token = req.get('authtoken');
    console.log(jwt_token);
    if (jwt_token && jwt.verify(jwt_token, jwt_salt).tid){
        var uid = jwt.verify(jwt_token, jwt_salt).tid;
        if(req.file){
          mongo.connect(urlMongo, {useNewUrlParser : true}, function (err_mdbcon, db) {
              if (err_mdbcon == null) {
                  dbo = db.db('nitraapune');
                  dbo.collection('moderators').findOne({ _id: ObjectID(uid)}, function (err_arr, res_auth){
                    //console.log(res_auth);
                    if(err_arr){
                      db.close();
                      res.json({
                        status: "fail",
                        message: "Moderator authentication failed!"
                      });
                    }
                    else{
                      dbo.collection("events").insertOne({
                        eventName: req.body.eventName,
                        eventDate: req.body.eventDate,
                        eventTime: req.body.eventTime,
                        eventLocation: req.body.eventLocation,
                        eventDescription: req.body.eventDescription,
                        eventExtLinks: req.body.eventExtLinks,
                        eventRegFees: req.body.eventRegFees,
                        eventCreatedby: req.body.eventCreatedby,
                        eventOnBehalfof: req.body.eventOnBehalfof
                      }, (err1, res1) => {
                        if(err1){
                          db.close();
                          res.json({
                            status: 'fail',
                            message: 'Error inserting data'
                          });
                        }
                        else{
                          if(res1.insertedId){
                                var DID = res1.insertedId;
                                var EXT = req.file.originalname.split(".");
                                EXT = EXT[EXT.length-1];
                                console.log(EXT);
                                var fs = require('fs');
                                fs.rename(req.file.path, "public/images/events/"+DID+"."+EXT, function(err_upload){
                                    if (err_upload){
                                        res.json({ status: 'fail', message: 'Error while moving file' });
                                    }
                                    else{
                                        dbo.collection('events').updateOne({_id : ObjectID(DID)}, {$set : {'event_image_ext' : EXT}}, function(err_ext, res_ext){
                                            if(err_ext){
                                                db.close();
                                                res.json({status : "fail", message : "Error in saving Extension of file"})
                                            }
                                            else{
                                                db.close()
                                                res.json({status : "success"});
                                            }
                                        })
                                    }
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
          res.json({
            status: "fail",
            message: "Required file missing!"
          })
        }
    }
    else{
      res.json({status: 'fail', message: 'Token authentication failed'});
    }
});
/******************************************Events Details Upload ends*************************************/

/********************************************Events Details Get Begins**************************************************/
router.get('/', function (req, res, next) {
  mongo.connect(urlMongo, {useNewUrlParser: true}, (err, db) => {
    if(err){
      db.close();
      res.json({
        status: 'fail',
        message: 'Database Connection Error!!'
      });
    }
    else{
        dbo = db.db('nitraapune');
        dbo.collection('events').find({}).toArray( (err1, res1) => {
          if(err1){
            db.close();
            res.json({
              status: 'fail',
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
                status: 'fail',
                message: 'Error fetching data'
              });
            }
          }
        });
    }
  });
});
/*******************************************Events Details Get Ends*********************************************/

/*******************************************Single Event Details Get Begins*********************************************/
router.get('/:id', function (req, res, next) {
  let id = req.params.id;
  if(id !== null){
    mongo.connect(urlMongo, {useNewUrlParser: true}, (err, db) => {
      if(err){
        db.close();
        res.json({
          status: 'fail',
          message: 'Database Connection Error!!'
        });
      }
      else{
        dbo = db.db('nitraapune');
        dbo.collection('events').findOne({_id: ObjectID(id)}, (err1, res1) => {
          if(err1){
            db.close();
            res.json({
              status: 'fail',
              message: 'Error fetching data'
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
                status: 'fail',
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
      status: 'fail',
      message: 'Error in fetching event data'
    });
  }
});
/*******************************************Single Event Details Get Ends*********************************************/

/*******************************************Events Details Edit Begins*********************************************/
router.put('/', upload.single('ImageFile'), (req, res, next) => {
  var jwt_token = req.get('authtoken');
  var pEventName = req.body.eventName;
  var pEventDate = req.body.eventDate;
  var pEventTime = req.body.eventTime;
  var pEventLocation = req.body.eventLocation;
  var pEventDescription = req.body.eventDescription;
  var pEventExtLinks = req.body.eventExtLinks;
  var pEventRegFees = req.body.eventRegFees;
  var pEventCreatedby = req.body.eventCreatedby;
  var pEventOnBehalfof = req.body.eventOnBehalfof;
  if(jwt_token){
    if(pEventName && pEventDate && pEventTime && pEventLocation && pEventDescription && pEventExtLinks && pEventRegFees && pEventCreatedby && pEventOnBehalfof){
      mongo.connect(urlMongo, {useNewUrlParser: true}, (err, db) => {
        if(err){
          db.close();
          res.json({
            status: 'fail',
            message: 'Database Connection failed!!'
          });
        }else{
          dbo = db.db('nitraapune');
          dbo.collection('events').updateOne({_id: ObjectID(req.body.id)},
          {$set:{
            eventName: pEventName,
            eventDate: pEventDate,
            eventTime: pEventTime,
            eventLocation: pEventLocation,
            eventDescription: pEventDescription,
            eventExtLinks: pEventExtLinks,
            eventRegFees: pEventRegFees,
            eventCreatedby: pEventCreatedby,
            eventOnBehalfof: pEventOnBehalfof
          }}, (err1, res1) => {
            if(err1){
              db.close();
              res.json({status: "fail", message: "Database operation error"});
            }
            else{
              if(req.file){
                glob(path.join(uploadPath, req.body.id.toString()) + ".*", function(err2, res2){
                  if(err2){
                    db.close();
                    res.json({
                      status: "fail",
                      message: "File search failed!"
                    });
                  }
                  else{
                    var fs = require('fs');
                    fs.unlink(res2[0], function (err3, res3){
                      if(err3){
                        db.close();
                        res.json({
                            status: "fail",
                            message: "File removal failed!"
                        });
                      }
                      else{
                        var DID = req.body.id;
                        var EXT = req.file.originalname.split(".");
                        EXT = EXT[EXT.length-1];
                        fs.rename(req.file.path, "public/images/events/"+DID+"."+EXT, function(err_upload){
                          if (err_upload){
                              db.close();
                              res.json({ status: 'fail', message: 'Error while moving file' });
                          }
                          else{
                            dbo.collection('events').updateOne({_id : ObjectID(DID)}, {$set : {'event_image_ext' : EXT}}, function(err_ext, res_ext){
                              if(err_ext){
                                  db.close();
                                  res.json({status : "fail", message : "Error in saving Extension of file"});
                              }
                              else{
                                  db.close();
                                  res.json({status: "success", message: "Event Details Updated Successfully"});
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
              else{
                db.close();
                res.json({status: "success", message: "Event Details Updated Successfully"});
              }
            }
          });
        }
        });
      }else{
        res.json({
          status: "fail",
          message: "One or more fields missing."
      });
    }
  }else{
    res.json({
      status: 'fail',
      message: 'Unauthorized access'
    });
  }
});
/*******************************************Events Details Edit Ends*********************************************/

/*******************************************Events Details Delete Begins*********************************************/
router.delete('/', (req, res, next) => {
  let id = req.body.id;
  if(id !== null){
    var jwt_token = req.get('authtoken');
    if(jwt_token){
      mongo.connect(urlMongo, {useNewUrlParser: true}, (err, db) => {
        if(err == null){
          dbo = db.db('nitraapune');
          dbo.collection('events').findOne({_id: ObjectID(id)}, (err1, res1) => {
            if(err1){
              res.json({
                status: 'fail',
                message: 'No such event exists!'
              });
            }
            else{
              console.log("Event Deleted");
              dbo.collection('events').deleteOne({_id: ObjectID(id)}, (err2, res2) => {
                if(err2){
                  db.close();
                  res.json({
                    status: 'fail',
                    message: 'Event Deletion failed!!'
                  });
                }
                else{
                  db.close();
                  glob(path.join(uploadPath, req.body.id.toString()) + ".*", function (err3, res3) {
                    if(err3){
                      db.close();
                      res.json({
                        staus: 'fail',
                        message: 'Event Deletion failed!'
                      });
                    }
                    else{
                      var fs = require('fs');
                      fs.unlink(res3[0], function (err4, res4){
                        if(err4){
                          db.close();
                          res.json({
                              status: "fail",
                              message: "Event Deletion failed!"
                          });
                        }
                        else{
                          db.close();
                          res.json({
                            status: 'success',
                            message: 'Event deleted successfully'
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
        else{
          db.close();
          res.json({
            status: 'fail',
            message: 'Database Connection failed'
          });
        }
      });
    }
    else{
      res.json({
        status: 'fail',
        message:'Unauthorized access'
      });
    }
  }
  else{
    res.json({
      status: 'fail',
      message: 'Missing Parameters'
    });
  }
});
/*******************************************Events Details Delete Ends*********************************************/
module.exports = router;
