var express = require('express'),
    path = require('path'),
    mongo = require('mongodb').MongoClient,
    bodyParser = require('body-parser'),
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
    mongo.connect(urlMongo, function (err, db) {
        if (err == null) {
            var dbn = db.db("nitraa-pune");
            dbn.collection("users").findOne({
                "email": req.body.email,
                "password": getHash(req.body.password, req.body.email)
            }, function (err1, result) {
                if (err1 == null) {
                    if (result == null) {
                        db.close();
                        res.json({
                            status: "fail",
                            message: "Service Failed!!"
                        });
                    } else {
                        db.close();
                        var jwt_token = jwt.sign({
                            tid: result._id
                        }, jwt_salt);
                        if (jwt_token) {
                            res.set({
                                'authtoken': jwt_token
                            });
                            res.json({
                                status: "success",
                            });
                        } else {
                            res.json({
                                status: "fail",
                                message: "Creation of customer token failed!"
                            });
                        }
                    }
                } else {
                    db.close();
                    res.json({
                        status: "fail",
                        message: "Authentication Failed!!"
                    });
                }
            });
        } else {
            db.close();
            res.json({
                status: "fail",
                message: "Error in signin!!"
            });

        }

    });
});

module.exports = router;