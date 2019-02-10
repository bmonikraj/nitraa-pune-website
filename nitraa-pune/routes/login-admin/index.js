var express = require('express'),
	path = require('path'),
	mongo = require('mongodb').MongoClient,
	bodyParser = require('body-parser'),
    app = express();
var jwt = require('jsonwebtoken');
var jwt_salt = require('../constant/jwt/index');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
router = express.Router();


router.post('/', function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    if (email == 'admin@nitraa.pune' && password == 'admin-nitraa'){
        jwt_token = jwt.sign({userid : 'admin@nitraa.pune'}, jwt_salt);
        res.set('authtoken', jwt_token);
        res.json({status:'success'});
    }
    else{
        res.json({status:'fail', message:'User ID or Password didn\'t match. Authentication failed'});
    }
});

module.exports = router;
