var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport')
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var express = require('express');
var path = require('path');
var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
var app = express();
var urlMongo = require('../constant/mongodbAddress/index');
var jwt = require('jsonwebtoken');
var jwt_salt = require('../constant/jwt/index');

var config = require("../constant/app_credentials/index");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

routes = express.Router();

passport.serializeUser((user,done)=>{
    done(null, user.id)
});

passport.deserializeUser((ID,done)=>{
    mongo.connect(function(error, db){
        if(error == null)
        {
            dbo = db.db("nitraa-pune");
            dbo.collection("users").findOne({"idToken" : ID}).toArray(function (err, result){
                done(null, result);
            });
        }
    });
});

passport.use(new GoogleStrategy({
        clientID: config.googleAuth.consumerKey,
        clientSecret: config.googleAuth.consumerSecret,
        callbackURL: config.googleAuth.callbackURL,
        profileFields: ['emails']
    },
    function(accessToken, refreshToken, profile, done) {
        done(null, profile);
    }
));

routes.get('/', passport.authenticate('google',{ scope: ['email', 'profile'] }));

routes.get('/callback', passport.authenticate('google'), function(req, res, next){
    //console.log(req.user);
    mongo.connect(urlMongo,{useNewUrlParser : true}, function(error, db){
            if(error == null)
            {
                dbo = db.db("nitraa-pune");
                dbo.collection("users").findOne({"email" : req.user.emails[0].value},function (err, result){
                    if(err)
                    {
                        db.close();
                        done(err, null);
                    }
                    else
                    {
                        if(result == null)
                        {
                            dbo.collection("users").insertMany([{"name": req.user.displayName, "email": req.user.emails[0].value, "type": "google", "idToken": req.user.id}], (err1,result1) => {
                                if (err1) {
                                    db.close();
                                    res.json({status : "fail", message: "Login failed!"});
                                }
                                else
                                {
                                    db.close();
                                    jwt_token = jwt.sign({tid : result1.insertedIds["0"]}, jwt_salt);
                                    if(jwt_token)
                                    {
                                        res.set({"authtoken" : jwt_token});
                                        res.json({status : "success", message: "Login Successful!"});
                                    }
                                    else
                                    {
                                        db.close();
                                        res.json({status : "fail", message : "Login Failed!"});
                                    }
                                }
                            });
                        }
                        else
                        {
                            if(result.type === "google")
                            {
                                db.close();
                                jwt_token = jwt.sign({tid : result._id}, jwt_salt);
                                if(jwt_token)
                                {
                                    res.set({"authtoken" : jwt_token});
                                    res.json({status : "success", message: "Login Successful!"});
                                }
                                else
                                {
                                    db.close();
                                    res.json({status : "fail", message : "Login Failed!"});
                                }
                            }
                            else
                            {
                                db.close();
                                res.json({status: "fail", message: "An account with same email address already exists!"});
                            }
                        }
                    }
                });
            }
        });
});

module.exports = routes;

