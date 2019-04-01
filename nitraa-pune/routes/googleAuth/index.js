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
//var urlMongo = require('../constant/mongo/index');

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
    mongo.connect(urlMongo, {useNewUrlParser : true}, function(error, db){
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
    mongo.connect(urlMongo, {useNewUrlParser : true}, function(error, db){
        if(error == null)
        {
            dbo = db.db("nitraa-pune");
            dbo.collection("users").findOne({"email" : req.user.emails[0].value},function (err, result){
                if(err)
                {
                    db.close();
                    res.redirect("http://localhost:3000/login?status=fail&message=Login%20Failed");
                }
                else
                {
                    if(result == null)
                    {
                        dbo.collection("users").insertMany([{"name": req.user.name.givenName, "email": req.user.emails[0].value, "type": "google", "idToken": req.user.id, "address": "","phone": "", "father": "", "mother" : "", "spouse_name": "", "dob" : "", "children": [],
                        "siblings": [],"permanent_adr": "", "hobbies": [], "cover_pic_ext": null, "log_timestamp": ""}], (err1,result1) => {
                            if (err1) {
                                db.close();
                                res.redirect("http://localhost:3000/login?status=fail&message=Login%20Failed");
                            }
                            else
                            {
                                dbo.collection("users").updateOne({_id: ObjectID(result1.insertedIds["0"])}, {
                                    $set: {
                                        log_timestamp : Date.now()
                                    }
                                }, function(err2, res2){
                                    if(!err2)
                                    {
                                        db.close();
                                        res.redirect("http://localhost:3000/loginCheck?id="+result1.insertedIds["0"].toString());
                                    }
                                    else
                                    {
                                        db.close();
                                        res.redirect("http://localhost:3000/login?status=fail&message=Error%20occured%20while%20logging%20in");
                                    }
                                });
                            }
                        });
                    }
                    else
                    {
                        if(result.type === "google")
                        {
                            dbo.collection("users").updateOne({_id: ObjectID(result._id)}, {
                                $set:
                                {
                                    log_timestamp: Date.now()
                                }
                            }, function(err2, res2){
                                if(!err2)
                                {
                                    db.close();
                                    res.redirect("http://localhost:3000/loginCheck?id="+result._id.toString());
                                }
                                else
                                {
                                    db.close();
                                    res.redirect("http://localhost:3000/login?status=fail&message=Error%20occured%20while%20logging%20in");
                                }
                            });
                        }
                        else
                        {
                            db.close();
                            res.redirect("http://localhost:3000/login?status=fail&message=Email%20address%20already%20registered%20in%20an%20existing%20account");
                        }
                    }
                }
            });
        }
    });
});

module.exports = routes;

