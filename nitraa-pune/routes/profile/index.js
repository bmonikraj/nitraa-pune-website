var express = require('express'),
    path = require('path'),
    mongo = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
    bodyParser = require('body-parser'),
    app = express(),
    multer = require('multer');
var jwt = require('jsonwebtoken');
var jwt_salt = require('../constant/jwt/index');
var urlMongo = require('../constant/mongodbAddress/index');
var glob = require('glob');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
var upload = multer({dest:'public/images/profile_pictures'});
var uploadPath = path.join(__dirname, '../../public/images/profile_pictures');
router = express.Router();


router.get('/read', function (req, res, next) {
    var auth_token = req.get('authtoken');
    if(auth_token)
    {
        var uid = jwt.verify(auth_token, jwt_salt).tid;
        if(!uid)
        {
            res.json({status: "fail", message: "Token verification failure!"});
        }
        else
        {
            mongo.connect(urlMongo, {useNewUrlParser : true}, function(err, db){
                if(err == null)
                {
                    dbo = db.db("nitraa-pune");
                    dbo.collection("users").findOne({_id: ObjectID(uid)}, function(err1, res1){
                        if(err1)
                        {
                            db.close();
                            res.json({status: "fail", message:"Error fetching data"});
                        }
                        else{
                            if(res1 == null)
                            {
                                db.close();
                                res.json({status: "fail", message: "Error fetching data"});
                            }
                            else
                            {
                                db.close();
                                res.json({status: "success", data : res1});
                            }
                        }
                    });
                }
            });
        }
    }
    else
    {
        res.json({status:"fail", message: "Unauthorized access!"});
    }
});

router.put('/update', function(req, res, next){
    var auth_token = req.get('authtoken');
    if(auth_token)
    {
        var uid = jwt.verify(auth_token, jwt_salt).tid;
        if(!uid)
        {
            res.json({status: "fail", message: "Token verification failure!"});
        }
        else
        {
            mongo.connect(urlMongo, {useNewUrlParser : true}, function(err, db){
                if(err == null)
                {
                    dbo = db.db("nitraa-pune");
                    dbo.collection("users").updateOne({_id: ObjectID(uid)},
                    {$set: {
                        name: req.body.name,
                        address: req.body.address,
                        phone: req.body.phone,
                        father: req.body.father,
                        mother : req.body.mother,
                        spouse_name: req.body.spouse_name,
                        dob : req.body.dob,
                        children: req.body.children,
                        permanent_adr: req.body.permanent_adr,
                        hobbies: req.body.hobbies,
                        siblings: req.body.siblings
                    }}, function(err1, res1){
                        if(err1)
                        {
                            db.close();
                            res.json({status: "fail", message:"Error fetching data"});
                        }
                        else{
                            if(res1 == null)
                            {
                                db.close();
                                res.json({status: "fail", message: "Error fetching data"});
                            }
                            else
                            {
                                db.close();
                                res.json({status: "success", data : res1});
                            }
                        }
                    });
                }
            });
        }
    }
    else
    {
        res.json({status:"fail", message: "Unauthorized access!"});
    }
});

router.post('/profilePicUpload', upload.single('ImageFile'), function (req, res, next) {
    jwt_token = req.get('authtoken');
    if (jwt_token && jwt.verify(jwt_token, jwt_salt).tid){
        var uid = jwt.verify(jwt_token, jwt_salt).tid;
        //console.log(uid);
        mongo.connect(urlMongo, {useNewUrlParser : true}, function (err_mdbcon, db) {
            if (err_mdbcon == null) {
                dbo = db.db('nitraa-pune');
                dbo.collection('users').findOne({_id : ObjectID(uid)},function (err1, res1) {
                    console.log(res1);
                    if (err1) {
                        db.close();
                        res.json({ status: 'fail', message: 'Error while searching for record' });
                    }
                    else {
                        if(res1 != null)
                        {
                            if(res1.cover_pic_ext == null)
                            {
                                var DID = res1._id;
                                var EXT = req.file.originalname.split(".");
                                EXT = EXT[EXT.length-1];
                                console.log(EXT);
                                var fs = require('fs');
                                fs.rename(req.file.path, "public/images/profile_pictures/"+DID+"."+EXT, function(err_upload){
                                    if (err_upload){
                                        res.json({ status: 'fail', message: 'Error while moving file' });
                                    }
                                    else{
                                        dbo.collection('users').updateOne({_id : ObjectID(DID)}, {$set : {'cover_pic_ext' : EXT}}, function(err_ext, res_ext){
                                            if(err_ext){
                                                db.close();
                                                res.json({status : "fail", message : "Error in saving Extension of file"})
                                            }
                                            else{
                                                db.close()
                                                res.json({status : "success"});
                                            }
                                        })
                                    }
                                });
                            }
                            else
                            {
                                console.log(res1._id);
                                glob( path.join(uploadPath, res1._id.toString()) + ".*", function (err2, result2) {
                                    if (err2) {
                                        res.json({
                                            status: "fail",
                                            message: "File search failed!"
                                        });
                                    } else {
                                        var fs = require('fs');
                                        fs.unlink(result2[0], function (err3, result3) {
                                            if (err3) {
                                                res.json({
                                                    status: "fail",
                                                    message: "File search failed!"
                                                });
                                            } else {
                                                var DID = res1._id;
                                                var EXT = req.file.originalname.split(".");
                                                EXT = EXT[EXT.length-1];
                                                var fs = require('fs');
                                                fs.rename(req.file.path, "public/images/profile_pictures/"+DID+"."+EXT, function(err_upload){
                                                    if (err_upload){
                                                        res.json({ status: 'fail', message: 'Error while moving file' });
                                                    }
                                                    else{
                                                        dbo.collection('users').updateOne({_id : ObjectID(DID)}, {$set : {'cover_pic_ext' : EXT}}, function(err_ext, res_ext){
                                                            if(err_ext){
                                                                db.close();
                                                                res.json({status : "fail", message : "Error in saving Extension of file"})
                                                            }
                                                            else{
                                                                db.close()
                                                                res.json({status : "success"});
                                                            }
                                                        })
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    }
                })
            }
            else{
                res.json({status: 'fail', message: 'Database connection failed'});
            }
        });
    }
    else{
        res.json({status: 'fail', message: 'Token authentication failed'});
    }
});

router.get('/ProfilePicRemove', function(req, res, next){
    jwt_token = req.get('authtoken');
    console.log(jwt_token);
    if (jwt_token && jwt.verify(jwt_token, jwt_salt).tid){
        var uid = jwt.verify(jwt_token, jwt_salt).tid;
        mongo.connect(urlMongo, {useNewUrlParser : true}, function (err_mdbcon, db) {
            if (err_mdbcon == null) {
                dbo = db.db('nitraa-pune');
                dbo.collection('users').findOne({_id : ObjectID(uid)},function (err1, res1) {
                    if (err1) {
                        db.close();
                        res.json({ status: 'fail', message: 'Error while searching for record.' });
                    }
                    else {
                        console.log(res1);
                        if(res1 != null)
                        {
                            glob( path.join(uploadPath, res1._id.toString()) + ".*", function (err2, result2) {
                                if (err2) {
                                    res.json({
                                        status: "fail",
                                        message: "File search failed!"
                                    });
                                } else {
                                    console.log(result2);
                                    var fs = require('fs');
                                    fs.unlink(result2[0], function (err3, result3) {
                                        if (err3) {
                                            res.json({
                                                status: "fail",
                                                message: "File search failed!"
                                            });
                                        } else {
                                            dbo.collection('users').updateOne({_id : ObjectID(uid)}, {
                                                $set:{
                                                    'cover_pic_ext': null
                                                }
                                            }, function(err4, result4){
                                                if(err4)
                                                {
                                                    db.close();
                                                    res.json({status: "fail", message: "Error while saving file extension."});
                                                }
                                                else
                                                {
                                                    db.close();
                                                    res.json({status: "success"});
                                                }
                                            });
                                        }
                                    });
                                }
                            });       
                        }
                    }
                })
            }
            else{
                res.json({status: 'fail', message: 'Database connection failed'});
            }
        });
    }
    else{
        res.json({status: 'fail', message: 'Token authentication failed'});
    }
});

module.exports = router;