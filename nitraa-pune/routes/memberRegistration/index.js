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

router.post('/payment', function(req, res, next) {
    jwt_token = req.get('authtoken');
    var mpId = req.body.mpId;
    console.log(jwt_token);
    if (jwt_token && jwt.verify(jwt_token, jwt_salt).tid){
        var uid = jwt.verify(jwt_token, jwt_salt).tid;
        mongo.connect(urlMongo, {useNewUrlParser : true}, function (err_mdbcon, db) {
            if (err_mdbcon == null) {
                dbo = db.db('nitraapune');
                dbo.collection('users').findOne({ _id: ObjectID(uid)}, function(err_arr, res_auth){
                  if(err_arr){
                    db.close();
                    res.json({
                      status: "fail",
                      message: "Authentication failed!"
                    });
                  }
                  else{
                    dbo.collection('membership_plans').findOne({ _id: ObjectID(mpId)}, function(err1, res1){
                      if(err1){
                        db.close();
                        res.json({
                          status: 'fail',
                          message: 'Error inserting data'
                        });
                      }
                      else{
                        if(res1){
                          let payLoad = {
                              purpose: mpId,
                              amount: parseFloat(res1.cost).toFixed(2),
                              phone: res_auth.phone,
                              buyer_name: uid,
                              redirect_url: 'https://nitraapune.in/profile?alertType=success&message=Successfully%20Renewed&title=Membership%20Renewal',
                              send_email: true,
                              webhook: 'https://nitraapune.in/member-reg/webhook',
                              send_sms: true,
                              email: res_auth.email,
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

router.post('/webhook', function(req, res, next) {
    mongo.connect(urlMongo, {useNewUrlParser : true}, function (err_mdbcon, db) {
      if (err_mdbcon == null) {
        let dbo = db.db('nitraapune');
        if(req.body.payment_id != "" && req.body.payment_request_id != "" && req.body.status == "Credit"){
          dbo.collection('membership_plans').findOne({'_id': ObjectID(req.body.purpose)}, function(err1, res1){
            if(err1){
              db.close();
              res.json({status: 'fail', message: "Database Error"});
            }
            else{
              if(res1){
                var timestamp;
                if(parseInt(res1.days) < 0){
                  timestamp = parseInt(res1.days);
                }
                else{
                  timestamp = parseInt((new Date()).getTime()) + parseInt(res1.days) * 24 * 3600 * 1000;
                }
                dbo.collection('users').updateOne({ '_id': ObjectID(req.body.buyer_name) }, {
                  $set:{
                    payment_details: req.body,
                    due_timestamp: timestamp
                  }
                }, (err2, res2) => {
                  if(err2){
                    db.close();
                    res.json({status: "fail", message: "Database Error"});
                  }
                  else{
                    db.close();
                    res.json({status: "success", message: "Successfully Updated"});
                  }
                });
              }
              else{
                db.close();
                res.json({status: 'fail', message: "No such records found"});
              }
            }
          });
        }
      }
      else{
        res.json({status: 'fail', message: 'Database connection failed'});
      }
    });
});

module.exports = router;
