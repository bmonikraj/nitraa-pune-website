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
var upload = multer({dest:'public/images/blogs'});
var uploadPath = path.join(__dirname, '../../public/images/blogs');
router = express.Router();


/*****************************************************Blog details upload Begins***************************************************************/
router.post('/', upload.single('ImageFile'), function (req, res, next) {
  jwt_token = req.get('authtoken');
  if (jwt_token && jwt.verify(jwt_token, jwt_salt).tid){
      var uid = jwt.verify(jwt_token, jwt_salt).tid;
      mongo.connect(urlMongo, {useNewUrlParser : true}, function (err_mdbcon, db) {
          if (err_mdbcon == null) {
              dbo = db.db('nitraapune');
              dbo.collection('moderators').findOne({ _id: ObjectID(uid)}, function (err_arr, res_auth){
                console.log(res_auth);
                if(err_arr){
                  db.close();
                  res.json({
                    status: "failure",
                    message: "Moderator authentication failed!"
                  });
                }
                else{
                  dbo.collection("blogs").insertOne({
                    blogTitle: req.body.blogTitle,
                    blogDescription: req.body.blogDescription,
                    blogPostedby: req.body.blogPostedby
                  }, (err1, res1) => {
                    if(err1){
                      db.close();
                      res.json({
                        status: 'failure',
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
                          fs.rename(req.file.path, "public/images/blogs/"+DID+"."+EXT, function(err_upload){
                              if (err_upload){
                                  res.json({ status: 'fail', message: 'Error while moving file' });
                              }
                              else{
                                  dbo.collection('blogs').updateOne({_id : ObjectID(DID)}, {$set : {'blog_image_ext' : EXT}}, function(err_ext, res_ext){
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
                        res.json({status: "failure", message:"Couldn't insert details"});
                      }
                    }
                  });
                }
              });
          }
          else{
              res.json({status: 'failure', message: 'Database connection failed'});
          }
      });
  }
  else{
    res.json({status: 'fail', message: 'Token authentication failed'});
  }
});
/*****************************************************Blog details upload ends***************************************************************/

/*****************************************************Blog details get Begins******************************************************************/
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
        dbo.collection('blogs').find({}).toArray( (err1, res1) => {
          if(err1){
            db.close();
            res.json({
              status: 'failure',
              message: 'Database Operation Error'
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
/*****************************************************Blog details get Ends*****************************************************/

/*****************************************************Single Blog details get Begins***************************************************************/
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
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
          dbo.collection('blogs').findOne({_id: ObjectID(id)}, (err1, res1) => {
            if(err1){
              db.close();
              res.json({
                status: 'failure',
                message: 'Database Operation Error'
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
  }else{
    res.json({
      status: 'failure',
      message: 'Error in fetching blog data'
    });
  }
});
/*****************************************************Single Blog details get Begins***************************************************************/

/*****************************************************Single Blog details Edit Begins***************************************************************/
router.put('/update', (req, res, next) => {
  var jwt_token = req.get('authtoken');
  var pBlogTitle = req.body.blogTitle;
  var pBlogDescription = req.body.blogDescription;
  var pBlogPostedby =req.body.blogPostedby;
  if(jwt_token){
    if(pBlogTitle && pBlogDescription && pBlogPostedby){
      mongo.connect(urlMongo, {useNewUrlParser: true}, (err, db) => {
        if(err){
          db.close();
          res.json({
            status: 'failure',
            message: 'Database Connection failed!!'
          });
        }else{
          dbo = db.db('nitraapune');
          dbo.collection('blogs').updateOne({_id: ObjectID(req.body.id)},
          {$set:{
            blogTitle: pBlogTitle,
            blogDescription: pBlogDescription,
            blogPostedby: pBlogPostedby
          }}, (err1, res1) => {
            if(err1){
              db.close();
              res.json({status: "failure", message: "Database operation error"});
            }
            else{
              if(res1.modifiedCount == 1){
                db.close();
                res.json({status: "success", message: "Blog Updated Successfully", data: res1});
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
/*****************************************************Single Blog details Edit ends***************************************************************/

/*****************************************************Blog details Delete Begins***************************************************************/
router.delete('/', (req, res, next) => {
  let id = req.body.id;
  if(id === null){
    var jwt_token = req.get('authtoken');
    if(jwt_token){
      mongo.connect(urlMongo, {useNewUrlParser: true}, (err, db) => {
        if(err == null){
          dbo = db.db('nitraapune');
          dbo.collection('blogs').findOne({_id: ObjectID(id)}, (err1, res1) => {
            if(err1){
              res.json({
                status: 'failure',
                message: 'No such blog exists!!'
              });
            }
            else{
              console.log('Blog Deleted');
              dbo.collection('blogs').deleteOne({_id: ObjectID(id)}, (err2, res2) => {
                if(err2){
                  db.close();
                  res.json({
                    staus: 'failure',
                    message: 'Blog Deletion failed!!'
                  });
                }
                else{
                  db.close();
                  res.json({
                    status: 'failure',
                    message: 'Blog deleted successfully!!'
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
        message: 'Unauthorized access'
      });
    }
  }
  else{
    res.json({
      status: 'failure',
      message: 'Missing Parameters Id'
    });
  }
});
/*****************************************************Blog details Delete ends***************************************************************/

module.exports = router;
