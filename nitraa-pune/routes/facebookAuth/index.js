var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
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
            dbo.collection("users").findOne({"idToken" : ID},function (err, result){
                done(null, result);
            });
        }
    });
});

passport.use(new FacebookStrategy({
        clientID: config.facebookAuth.clientID,
        clientSecret: config.facebookAuth.clientSecret,
        callbackURL: config.facebookAuth.callbackURL,
        profileFields: ['emails','displayName', 'photos']
    },
    function(accessToken, refreshToken, profile, done) {
        done(null, profile);
    }
));

routes.get('/', passport.authenticate('facebook'));

routes.get('/callback', passport.authenticate('facebook',{ scope: ['email'] }), function(req, res, next){
    //console.log(req.user);
    if(req.user.emails[0].value)
    {
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
                            dbo.collection("users").insertMany([{"name": req.user.name.givenName, "email": req.user.emails[0].value, "type": "facebook", "idToken": req.user.id, "address": "","phone": "", "father": "", "mother" : "", "spouse_name": "", "dob" : "", "children": [],
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
                            if(result.type === "facebook")
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
    }
    else
    {
        //res.json({status: "fail", message: "Account does not have an email address."});
        res.redirect("http://localhost:3000/login?status=fail&message=Account%20does%20not%20have%20an%20email%20address");
    }
});

module.exports = routes;