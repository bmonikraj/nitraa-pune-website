var express = require('express'),
    path = require('path'),
    mongo = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
    bodyParser = require('body-parser'),
    app = express();
var jwt = require('jsonwebtoken');
var jwt_salt = require('../constant/jwt/index');
var urlMongo = require('../constant/mongodbAddress/index');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
router = express.Router();

/******************************************Event Registration Begins***********************************/
router.post('/', function (req, res, next) {
    jwt_token = req.get('authtoken');
    var eventId = req.body.eid;
    console.log(jwt_token);
    if (jwt_token && jwt.verify(jwt_token, jwt_salt).tid){
        var uid = jwt.verify(jwt_token, jwt_salt).tid;
        mongo.connect(urlMongo, {useNewUrlParser : true}, function (err_mdbcon, db) {
            if (err_mdbcon == null) {
                dbo = db.db('nitraapune');
                dbo.collection('users').findOne({ _id: ObjectID(uid)}, function (err_arr, res_auth){
                  if(err_arr){
                    db.close();
                    res.json({
                      status: "fail",
                      message: "Authentication failed!"
                    });
                  }
                  else{
                    dbo.collection("event_registration").insertOne({
                      eventId: eventId,
                      userId: uid,
                      userName: res_auth.name,
                      userEmail: res_auth.email,
                      userPhone: res_auth.phone
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
                          db.close();
                          res.json({status: "success", message:"Successfully Registered for the event."});
                        }
                        else{
                          db.close();
                          res.json({status: "fail", message:"Couldn't register."});
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
/******************************************Event Registration ends*************************************/

/********************************************Registered User fetch for a particular event begins**************************************************/
router.get('/:eventId', function (req, res, next) {
  var jwt_token = req.get('authtoken');
  if(jwt_token){
    var uid = jwt.verify(jwt_token, jwt_salt).tid;
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
          dbo.collection('event_registration').findOne({eventId: req.params.eventId, userId: uid}, (err1, res1) => {
            if(err1){
              db.close();
              res.json({
                status: 'fail',
                message: 'Database operation error'
              });
            }
            else{
              if(res1!==null){
                db.close();
                res.json({
                  status: 'success',
                  data: true
                });
              }
              else{
                db.close();
                res.json({
                  status: 'success',
                  data: false
                });
              }
            }
          });
      }
    });
  }
  else{
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
          dbo.collection('event_registration').find({eventId: req.params.eventId}).toArray( (err1, res1) => {
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
  }
});
/*******************************************Registered User fetch for a particular event Ends*********************************************/

/*******************************************Event Deregistration Begins*********************************************/
router.delete('/', (req, res, next) => {
  let eid = req.body.eventId;
  if(eid !== null){
    var jwt_token = req.get('authtoken');
    if(jwt_token && jwt.verify(jwt_token, jwt_salt).tid){
      var uid = jwt.verify(jwt_token, jwt_salt).tid;
      mongo.connect(urlMongo, {useNewUrlParser: true}, (err, db) => {
        if(err == null){
          dbo = db.db('nitraapune');
          dbo.collection('event_registration').deleteOne({eventId: eid, userId: uid}, (err1, res1) => {
            if(err1){
              db.close();
              res.json({
                status: 'fail',
                message: 'Unexpected Error Occured.'
              });
            }
            else{
              db.close();
              res.json({
                status: 'success',
                message: 'Unregistered from the event successfully.'
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
        message:'Token Authentication Failed.'
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
/*******************************************Event Deregistration Ends*********************************************/
module.exports = router;
