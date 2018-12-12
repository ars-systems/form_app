var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

router.post("/add", function (req, res) {
    console.log(
        req.body.firstname+ ' '+
        req.body.lastname+ ' '+
        req.body.company+ ' '+
        req.body.position+ ' '+
        req.body.department+ ' '+
        req.body.email
    );
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            company:req.body.company,
            position:req.body.position,
            department:req.body.department,
            email:req.body.email
        };
        dbo.collection("my_model").insertOne(myobj, function(err, result) {
            if (err) throw err;
            console.log("1 document inserted");
            res.json(result);
            db.close();
        });

    });
    
});
router.get("/get_json", function (req, res) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        
        dbo.collection("my_model").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.json(result);
            db.close();
        });
    });

});
router.post("/update", function (req, res) {
    console.log(
        req.body.firstname+ ' '+
        req.body.lastname+ ' '+
        req.body.company+ ' '+
        req.body.position+ ' '+
        req.body.department+ ' '+
        req.body.email
    );
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myquery = {_id: ObjectID(req.body._id)};
        var newvalues = {
            $set: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                company:req.body.company,
                position:req.body.position,
                department:req.body.department,
                email:req.body.email
            } };
        console.log(req.body);
        dbo.collection("my_model").updateOne(myquery, newvalues, function (err, result) {
            if (err) throw err;
            console.log("1 document updated");
            res.json(result);
            db.close();
        });
    });

});

module.exports = router;