var express = require('express'),
    path = require('path'),
    mongo = require('mongodb').MongoClient,
    objectId = require('mongodb').ObjectID,
    bodyParser = require('body-parser'),
    app = express(),
    multer = require('multer');
var jwt = require('jsonwebtoken');
var jwt_salt = require('../../constant/jwt/index');
var mongourl = require('../../constant/mongo/index');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
router = express.Router();

var upload = multer({dest:'public/images/gallery'});

router.get('/', function (req, res, next) {
    
    // jwt_token = req.get('authtoken');  
    // if (jwt_token && jwt.verify(jwt_token, jwt_salt).tid){ 
        mongo.connect(mongourl, function (err_mdbcon, db) {
            if (err_mdbcon == null) {
                dbo = db.db('nitraapune'); 
                dbo.collection('gallery').find({}).toArray(function (err_arr, array_res) {
                    if (err_arr) {
                        db.close();
                        res.json({ status: 'fail', message: 'Error while fetching data from database' });
                    }
                    else {
                        db.close();
                        res.json({ status: 'success', list: array_res.reverse() });
                    }
                })
            }
            else{
                console.log(err_mdbcon);
                res.json({status: 'fail', message: 'Database connection failed'});
            }
        })
    // }
    // else{
    //     res.json({status: 'fail', message: 'Token authentication failed'});
    // }
})

router.post('/', upload.single('galleryImage'), function (req, res, next) {
    jwt_token = req.get('authtoken');
    if (jwt_token && jwt.verify(jwt_token, jwt_salt).tid){
        mongo.connect(mongourl, function (err_mdbcon, db) {
            if (err_mdbcon == null) {
                dbo = db.db('nitraapune');
                dbo.collection('gallery').insertOne({caption : req.body.caption},function (err_arr, doc_inserted) {
                    if (err_arr) {
                        db.close();
                        res.json({ status: 'fail', message: 'Error while inserting record [Caption] into database' });
                    }
                    else {
                        var DID = doc_inserted.insertedId;
                        var EXT = req.file.originalname.split(".")
                        EXT = EXT[EXT.length-1];
                        var fs = require('fs');
                        fs.rename(req.file.path, "public/images/gallery/"+DID+"."+EXT, function(err_upload){
                            if (err_upload){
                                res.json({ status: 'fail', message: 'Error while moving file' });
                            }
                            else{
                                dbo.collection('gallery').updateOne({_id : objectId(DID)}, {$set : {'EXT' : EXT}}, function(err_ext, res_ext){
                                    if(err_ext){
                                        db.close();
                                        res.json({status : "fail", message : "Error in saving Extension of file"})
                                    }
                                    else{
                                        db.close()
                                        res.json({status : "success"})
                                    }
                                })
                            }
                        })
                        
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
        mongo.connect(mongourl, function (err_mdbcon, db) {
            if (err_mdbcon == null) {
                dbo = db.db('nitraapune');
                dbo.collection('gallery').deleteOne({_id:objectId(req.body.dbid)},function (err_arr) {
                    if (err_arr) {
                        db.close();
                        res.json({ status: 'fail', message: 'Error while deleting record from database' });
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

module.exports = router;