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
var upload = multer({dest:'public/images/personal_pictures'});
var uploadPath = path.join(__dirname, '../../public/images/personal_pictures');
router = express.Router();

router.post('/', upload.single('ImageFile'), function (req, res, next) {
    jwt_token = req.get('authtoken');
    if (jwt_token && jwt.verify(jwt_token, jwt_salt).tid){
        var uid = jwt.verify(jwt_token, jwt_salt).tid;
        mongo.connect(urlMongo, {useNewUrlParser : true}, function (err_mdbcon, db) {
            if (err_mdbcon == null) {
                dbo = db.db('nitraapune');
                dbo.collection('personal_pictures').find({userId : uid}).toArray(function (err1, res1) {
                    console.log(res1);
                    if (err1) {
                        db.close();
                        res.json({ status: 'fail', message: 'Error while searching for record' });
                    }
                    else {
                        if(res1.length < 4)
                        {
                          dbo.collection('personal_pictures').insertOne({userId : uid, imageFileName: ""}, function (err2, res2) {
                            if(err2){
                              db.close();
                              res.json({status: "fail", message: "Unexpected Error Occured"});
                            }
                            else{
                              if(res2.insertedId && req.file){
                                var DID = res2.insertedId;
                                var EXT = req.file.originalname.split(".");
                                EXT = EXT[EXT.length-1];
                                var fs = require('fs');
                                fs.rename(req.file.path, "public/images/personal_pictures/"+DID+"."+EXT, function(err_upload){
                                  if (err_upload){
                                    db.close();
                                    res.json({ status: 'fail', message: 'Error while moving file' });
                                  }
                                  else{
                                    dbo.collection('personal_pictures').updateOne({_id : ObjectID(DID)}, {$set : {imageFileName : DID+"."+EXT}}, function(err_ext, res_ext){
                                        if(err_ext){
                                            db.close();
                                            res.json({status : "fail", message : "Error in saving file details"});
                                        }
                                        else{
                                            db.close()
                                            res.json({status : "success"});
                                        }
                                    });
                                  }
                                });
                              }
                              else{
                                db.close();
                                res.json({status: "fail", message: "Unexpected Error Occured"})
                              }
                            }
                          });
                        }
                        else{
                          db.close();
                          res.json({status: "fail", message: "No of photos per person limit exceeded"});
                        }
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

router.get("/", function(req, res){
  jwt_token = req.get('authtoken');
  if (jwt_token && jwt.verify(jwt_token, jwt_salt).tid){
      var uid = jwt.verify(jwt_token, jwt_salt).tid;
      mongo.connect(urlMongo, {useNewUrlParser : true}, function (err_mdbcon, db) {
          if (err_mdbcon == null) {
            dbo = db.db('nitraapune');
            dbo.collection('personal_pictures').find({userId : uid}).toArray(function(err1, res1){
              if(err1){
                db.close();
                res.json({status: "fail", message: "Unexpected Error Occured"});
              }
              else{
                db.close();
                res.json({status: "success", data: res1});
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


router.delete("/", function(req, res){
  jwt_token = req.get('authtoken');
  if (jwt_token && jwt.verify(jwt_token, jwt_salt).tid){
      var uid = jwt.verify(jwt_token, jwt_salt).tid;
      mongo.connect(urlMongo, {useNewUrlParser : true}, function (err_mdbcon, db) {
          if (err_mdbcon == null) {
            dbo = db.db('nitraapune');
            dbo.collection('personal_pictures').findOne({_id: ObjectID(req.body.imageId)},function(err1, res1){
              if(err1){
                db.close();
                res.json({status: "fail", message: "Unexpected Error Occured"});
              }
              else{
                if(res1){
                  if(res1.userId === uid){
                    glob(path.join(uploadPath, req.body.imageId.toString()) + ".*", function(err2, result2) {
                        if (err2) {
                            db.close();
                            res.json({
                                status: "fail",
                                message: "File search failed!"
                            });
                        } else {
                            console.log(result2);
                            var fs = require('fs');
                            fs.unlink(result2[0], function (err3, result3) {
                                if (err3) {
                                    db.close();
                                    res.json({
                                        status: "fail",
                                        message: "File deletion failed!"
                                    });
                                } else {
                                    dbo.collection('personal_pictures').deleteOne({_id : ObjectID(req.body.imageId)}, function(err4, result4){
                                        if(err4)
                                        {
                                            db.close();
                                            res.json({status: "fail", message: "Unexpected error occured"});
                                        }
                                        else
                                        {
                                            db.close();
                                            res.json({status: "success", message: "File successfully deleted"});
                                        }
                                    });
                                }
                            });
                        }
                    });
                  }
                  else{
                    db.close();
                    res.json({status: "fail", message: "Not Authorized"});
                  }
                }
                else{
                  db.close();
                  res.json({status: "fail", message: "No records found"});
                }
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

module.exports = router;
