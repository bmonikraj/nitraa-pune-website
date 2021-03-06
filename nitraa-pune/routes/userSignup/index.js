var express = require('express'),
    path = require('path'),
    mongo = require('mongodb').MongoClient,
    bodyParser = require('body-parser'),
    crypto = require('crypto'),
    app = express();
var urlMongo = require('../constant/mongodbAddress/index');
var jwt = require('jsonwebtoken');
var jwt_salt = require('../constant/jwt/index');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
router = express.Router();
//for password encryption
var getHash = (password, email) => {
    var hmac = crypto.createHmac('sha512', email.toString());
    data = hmac.update(password);
    gen_hmac = data.digest('hex');
    return gen_hmac;
}

router.post('/', function (req, res, next) {
    var e_mail = req.body.email;
    var data = {
        "name": req.body.name,
        "email": e_mail,
        "password": getHash(req.body.password, req.body.email),
        "phone": req.body.phone,
        "address": "",
        "type": "custom",
        "dob": "",
        "yop": req.body.yop,
        "branch": req.body.branch,
        "organization": req.body.organization,
        "permanent_adr": "",
        "hobbies":[],
        "cover_pic_ext": null,
        "due_timestamp": 0
    }
    mongo.connect(urlMongo, function (err, db) {
        if (err == null) {
            var dbn = db.db("nitraapune");
            dbn.collection("users").find({email: e_mail}).toArray(function(err1, res1){
              if(err1){
                db.close();
                res.json({status: "fail", message: "Unexpected Error Occured"});
              }
              else{
                if(res1.length === 0){
                  dbn.collection("users").insertOne(data, (err2, res2) => {
                      if (err2) {
                          db.close();
                          res.json({
                              status: "fail",
                              message: "Error in signup!!"
                          });
                      } else {
                          db.close();
                          res.json({
                              status: "success",
                              message: "Signup complete!!"
                          });
                      }
                  });
                }
                else{
                  db.close();
                  res.json({
                      status: "fail",
                      message: "An account with this email already exists!"
                  });
                }
              }
            });

        } else {
            db.close();
            res.json({
                status: "fail",
                message: "Error in signup!!"
            });

        }

    });
});

module.exports = router;
