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
const request = require('request');
router = express.Router();

const headers = {

     'X-Api-Key': '2ecf8770b1e7564dacb784d94c18bac7',
     'X-Auth-Token': '16e7c964705533dd4a7a3b0667c90dcb'

 }

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
                      userPhone: res_auth.phone,
                      payment_status: "not_paid"
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

/******************************************Payment Begins***********************************/
router.post('/payment', function(req, res, next) {
    jwt_token = req.get('authtoken');
    var eventId = req.body.eventId;
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
                    dbo.collection("event_registration").findOne({
                      eventId: eventId,
                      userId: uid
                    }, (err1, res1) => {
                      if(err1){
                        db.close();
                        res.json({
                          status: 'fail',
                          message: 'Error inserting data'
                        });
                      }
                      else{
                        if(res1){
                          let eventRegId = res1._id.toString();
                          let payLoad = {
                              purpose: eventRegId,
                              amount: parseFloat(req.body.regFees).toFixed(2),
                              phone: res1.userPhone,
                              buyer_name: uid,
                              redirect_url: 'https://nitraapune.in/eventPage?eid='+eventId.toString()+'&message=Payment%20Successful&title=Payment%20Details',
                              send_email: true,
                              webhook: 'https://nitraapune.in/event-reg/payment-webhook',
                              send_sms: true,
                              email: res1.userEmail,
                              allow_repeated_payments: false
                          }
                          request.post('https://www.instamojo.com/api/1.1/payment-requests/',
                          {
                           form: payLoad,
                           headers: headers
                          }, (error, response, body) =>{
                              if(!error && response.statusCode == 201){
                                  db.close();
                                  res.json({
                                    status: "success",
                                    longURL: JSON.parse(body).payment_request.longurl
                                  });
                              }
                              else{
                                db.close();
                                res.json({
                                  status: "fail",
                                  message: body
                                });
                              }
                          });
                        }
                        else{
                          db.close();
                          res.json({status: "fail", message:"Couldn't complete the payment process."});
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
                if(res1.payment_status === "paid"){
                  db.close();
                  res.json({
                    status: 'success',
                    data: true,
                    payment_status: true
                  });
                }
                else{
                  db.close();
                  res.json({
                    status: 'success',
                    data: true,
                    payment_status: false
                  });
                }
              }
              else{
                db.close();
                res.json({
                  status: 'success',
                  data: false,
                  payment_status: false
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
          dbo.collection('event_registration').findOne({eventId: eid, userId: uid}, (err1, res1) => {
            if(err1){
              db.close();
              res.json({
                status: 'fail',
                message: 'Unexpected Error Occured.'
              });
            }
            else{
              if(res1){
                if(res1.payment_status === "paid"){
                  let payload = {
                    transaction_id: "1",
                    payment_id: ((res1.payment_details).payment_id).toString(),
                    type: "QFL",
                    body: "Event Deregistration",
                    refund_amount: (res1.payment_details.amount).toString()
                  };
                  request.post('https://www.instamojo.com/api/1.1/refunds/', {form: payload,  headers: headers}, (error, response, body) =>{
                       if(!error && response.statusCode == 201){
                         dbo.collection('event_registration').deleteOne({_id: ObjectID(res1._id)}, (err2, res2) =>{
                           if(err2){
                               db.close();
                               res.json({status: "fail", message: "Unexpected Error occured."});
                           }
                           else{
                               db.close();
                               res.json({status: "success", message: "Successfully Unregistered. Refund Initiated Successfully."});
                           }
                         });
                       }
                       else{
                         db.close();
                         res.json({status: "fail", message: "Error in initiating refund."});
                       }
                     });
                }
                else{
                  dbo.collection('event_registration').deleteOne({_id: ObjectID(res1._id)}, (err2, res2) =>{
                    if(err2){
                        db.close();
                        res.json({status: "fail", message: "Unexpected Error occured."});
                    }
                    else{
                        db.close();
                        res.json({status: "success", message: "Successfully Unregistered."});
                    }
                  });
                }
              }
              else{
                db.close();
                res.json({status: "fail", message: "no records found"});
              }
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
