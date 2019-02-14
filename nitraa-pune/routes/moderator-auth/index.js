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

router.post('/', function (req, res, next) {

    mongo.connect(mongourl, function (err_mdbcon, db) {
        if (err_mdbcon == null) {
            dbo = db.db('nitraapune');
            dbo.collection('moderators').findOne({ username: req.body.email, password: req.body.password }, function (err_arr, res_auth) {
                if (err_arr) {
                    db.close();
                    res.json({ status: 'fail', message: 'Moderator authentication failed' });
                }
                else {
                    db.close();
                    jwt_token = jwt.sign({ tid: res_auth._id }, jwt_salt);
                    res.set('authtoken', jwt_token);
                    res.json({ status: 'success' });
                }
            })
        }
        else {
            res.json({ status: 'fail', message: 'Database connection failed' });
        }
    })

})

module.exports = router;