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

router.get('/:authtoken', function (req, res, next) {
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
    })
})

module.exports = router;