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
        dbo.collection('users').find({}).sort({"yop":1, "name":1}).toArray((err1, res1) => {
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

router.get('/:memberId', function (req, res, next) {
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
        dbo.collection('users').findOne({_id: ObjectID(req.params.memberId)},(err1, res1) => {
          if(err1){
            db.close();
            res.json({
              status: 'fail',
              message: 'Database operation error'
            });
          }
          else{
            if(res1){
              dbo.collection('personal_pictures').find({userId: req.params.memberId}).toArray((err2, res2) => {
                if(err2){
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
                    data: res1,
                    picsList: res2
                  });
                }
              });
            }
            else{
              db.close();
              res.json({
                status: 'fail',
                message: "No such records found"
              });
            }
          }
        });
      }
    });
});
/*******************************************Members Directory Get Ends*********************************************/
module.exports = router;
