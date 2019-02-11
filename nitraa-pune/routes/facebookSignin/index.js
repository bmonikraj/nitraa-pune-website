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

routes = express.Router();

//post request for sign-in through facebook
routes.post('/', function (req, res, next) {
	mongo.connect(new_database_path, function (error, db) {
		if (error == null) {
			dbo = db.db("nitraa-pune");
			dbo.collection("users").findOne({ "email": req.body.email }, { type: 1 }, function (err1, r) {
				if (err1 == null) {
					if (r != null) {
						if (r.type == "facebook") {
							db.close();
							jwt_token = jwt.sign({db_id: r._id}, jwt_salt);
							if(jwt_token)
							{
								res.set({'jwt_token': jwt_token});
								res.json({ status: "success", message: "Login Successful!", email: r.email, type:"facebook" });
							}
							else
							{
								res.json({status: "fail", message: "Creation of customer token failed!"});
							}
						}
						else {
							db.close();
							res.json({ status: "fail", message: "Email already in use!!", CustomerToken: req.session.CustomerId });
						}
					}
					else {
						if (req.body.email) {
							dbo.collection("users").insertMany([{ "name": req.body.name, "email": req.body.email, "type": "facebook" }], function (err, result) {
								if (err) {
									db.close();
									res.json({ status: "fail", message: "Error in login!!" });
								}
								else {
									db.close();
									jwt_token = jwt.sign({db_id: result.insertedIds["0"]}, jwt_salt);
									if(jwt_token)
									{
										res.set({"authtoken": jwt_token});
										res.json({ status: "success", message: "Login Successful!",email: req.body.email, type: "facebook" });
									}
									else
									{
										res.json({status: "fail", message: "Creation of customer token failed!"});
									}
								}

							});
						}
						else {
							db.close();
							res.json({ status: "fail", message: "Your facebook account is not linked with any email" });
						}
					}
				}
			});
		}
		else {
			db.close();
			res.json({ status: "fail", message: "Error while database connection!" });
		}
	});

});

module.exports = routes;