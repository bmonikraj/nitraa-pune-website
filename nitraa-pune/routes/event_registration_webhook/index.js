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

router.post('/', function(req, res, next) {
    mongo.connect(urlMongo, {useNewUrlParser : true}, function (err_mdbcon, db) {
      if (err_mdbcon == null) {
        let dbo = db.db('nitraapune');
        if(req.body.payment_id != "" && req.body.payment_request_id != "" && req.body.status == "Credit"){
          dbo.collection('event_registration').updateOne({ '_id': ObjectID(req.body.purpose) }, {
            $set:{
              payment_details: req.body,
              payment_status: "paid"
            }
          }, (err1, res1) => {
            if(err1){
              db.close();
              res.json({status: "fail", message: "Database Error"});
            }
            else{
              db.close();
              res.json({status: "success", message: "Successfully Updated"});
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
