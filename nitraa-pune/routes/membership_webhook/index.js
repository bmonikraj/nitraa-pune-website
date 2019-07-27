router.post('/webhook', function(req, res, next) {
    mongo.connect(urlMongo, {useNewUrlParser : true}, function (err_mdbcon, db) {
      if (err_mdbcon == null) {
        let dbo = db.db('nitraapune');
        if(req.body.payment_id != "" && req.body.payment_request_id != "" && req.body.status == "Credit"){
          dbo.collection('membership_plans').findOne({'_id': ObjectID(req.body.purpose)}, function(err1, res1){
            if(err1){
              db.close();
              res.json({status: 'fail', message: "Database Error"});
            }
            else{
              if(res1){
                var timestamp;
                if(parseInt(res1.days) < 0){
                  timestamp = parseInt(res1.days);
                }
                else{
                  timestamp = parseInt((new Date()).getTime()) + parseInt(res1.days) * 24 * 3600 * 1000;
                }
                dbo.collection('users').updateOne({ '_id': ObjectID(req.body.buyer_name) }, {
                  $set:{
                    payment_details: req.body,
                    due_timestamp: timestamp
                  }
                }, (err2, res2) => {
                  if(err2){
                    db.close();
                    res.json({status: "fail", message: "Database Error"});
                  }
                  else{
                    db.close();
                    res.json({status: "success", message: "Successfully Updated"});
                  }
                });
              }
              else{
                db.close();
                res.json({status: 'fail', message: "No such records found"});
              }
            }
          });
        }
      }
      else{
        res.json({status: 'fail', message: 'Database connection failed'});
      }
    });
});

module.exports = router;
