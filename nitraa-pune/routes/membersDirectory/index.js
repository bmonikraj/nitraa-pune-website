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

/********************************************Members Directory Get Begins**************************************************/
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
        dbo.collection('users').find({}).toArray((err1, res1) => {
          if(err1){
            db.close();
            res.json({
              status: 'fail',
              message: 'Database operation error'
            });
          }
          else{
            db.close();
            res.json({
              status: 'success',
              data: res1
            });
          }
        });
      }
    });
});
/*******************************************Members Directory Get Ends*********************************************/
module.exports = router;
