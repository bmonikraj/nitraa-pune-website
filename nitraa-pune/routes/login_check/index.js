var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var express = require('express');
var path = require('path');
var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
var app = express();
var urlMongo = require('../constant/mongodbAddress/index');
//var urlMongo = require('../constant/mongo/index');
var jwt = require('jsonwebtoken');
var jwt_salt = require('../constant/jwt/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const authcheck = (req, res, next) => {
    var user_id = req.get('uid');
    if(!user_id)
    {
        res.json({status: "fail", message: "Unauthorized Access."});
    }
    else{
        mongo.connect(urlMongo, {useNewUrlParser : true}, function(error, db){
            if(error == null)
            {
                dbo = db.db("nitraapune");
                dbo.collection("users").findOne({"_id" : ObjectID(user_id)},function (err, result){
                    if(err)
                    {
                        db.close();
                        res.json({status: "fail", message: "Database Error."});
                    }
                    else
                    {
                        if(result == null)
                        {
                            db.close();
                            res.json({status: "fail", message: "Authentication Failure"});
                        }
                        else
                        {
                            if(Date.now() - result.log_timestamp <= 30000)
                            {
                                db.close();
                                next();
                            }
                            else
                            {
                                db.close();
                                res.json({status: "fail", message: "Request Timeout."});
                            }
                        }
                    }
                });
            }
        });
    }
};

routes = express.Router();

routes.get('/', authcheck, function(req, res, next){
    var user_id = req.get('uid');
    var jwt_token = jwt.sign({tid: user_id}, jwt_salt);
    if(jwt_token)
    {
        res.set({'authtoken': jwt_token });
        res.json({status: "success", message: "Logged In successfully."});
    }
    else
    {
        res.json({status: "fail", message: "Authentication Token Error"});
    }
});

module.exports = routes;

