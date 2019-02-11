var express = require('express'),
    path = require('path'),
    mongo = require('mongodb').MongoClient,
    objectId = require('mongodb').ObjectID,
    bodyParser = require('body-parser'),
    app = express();
var jwt = require('jsonwebtoken');
var jwt_salt = require('../constant/jwt/index');
var mongourl = require('../constant/mongo/index');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
router = express.Router();

router.get('/', function (req, res, next) {
    jwt_token = req.get('authtoken');
    if (jwt_token && jwt.verify(jwt_token, jwt_salt).tid){
        MongoClient.connect(mongourl, function (err_mdbcon, db) {
            if (err_mdbcon == null) {
                dbo = db.db('nitraapune');
                dbo.collection('moderators').find({}, { fields: { "_id": 0 } }).toArray(function (err_arr, array_res) {
                    if (err_arr) {
                        db.close();
                        res.json({ status: 'fail', message: 'Error while fetching data from database' });
                    }
                    else {
                        db.close();
                        res.json({ status: 'success', list: array_res });
                    }
                })
            }
            else{
                res.json({status: 'fail', message: 'Database connection failed'});
            }
        })
    }
    else{
        res.json({status: 'fail', message: 'Token authentication failed'});
    }
})

router.post('/', function (req, res, next) {
    jwt_token = req.get('authtoken');
    if (jwt_token && jwt.verify(jwt_token, jwt_salt).tid){
        MongoClient.connect(mongourl, function (err_mdbcon, db) {
            if (err_mdbcon == null) {
                dbo = db.db('nitraapune');
                dbo.collection('moderators').insertOne({username : req.body.username, password : req.body.password},function (err_arr) {
                    if (err_arr) {
                        db.close();
                        res.json({ status: 'fail', message: 'Error while inserting record into database' });
                    }
                    else {
                        db.close();
                        res.json({ status: 'success'});
                    }
                })
            }
            else{
                res.json({status: 'fail', message: 'Database connection failed'});
            }
        })
    }
    else{
        res.json({status: 'fail', message: 'Token authentication failed'});
    }
})

router.delete('/', function (req, res, next) {
    jwt_token = req.get('authtoken');
    if (jwt_token && jwt.verify(jwt_token, jwt_salt).tid){
        MongoClient.connect(mongourl, function (err_mdbcon, db) {
            if (err_mdbcon == null) {
                dbo = db.db('nitraapune');
                dbo.collection('moderators').deleteOne({username:req.body.username},function (err_arr) {
                    if (err_arr) {
                        db.close();
                        res.json({ status: 'fail', message: 'Error while deleting record from database' });
                    }
                    else {
                        db.close();
                        res.json({ status: 'success', list: array_res });
                    }
                })
            }
            else{
                res.json({status: 'fail', message: 'Database connection failed'});
            }
        })
    }
    else{
        res.json({status: 'fail', message: 'Token authentication failed'});
    }
})

module.exports = router;