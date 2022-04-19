
var MongoClient = require('mongodb').MongoClient;
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let DB = require('../config/db');
var mongo = require('mongodb');
//Create reference to DB schema

let Survey = require('../models/survey');

let url = DB.URI

module.exports.displaySurveyList = (req, res, next) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("SurveySite");
        dbo.collection("Survey").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.send(result, 200)
            db.close();
        });
    });

}

module.exports.getOneSurvey = (req, res, next) => {
    let id = req.params.id;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("SurveySite");
        dbo.collection("Survey").find({_id: new mongo.ObjectID(id)}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result.name);
            res.send(result, 200)
            db.close();
        });
    });

}

module.exports.processAddPage =
    (req, res, next)=>{
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("SurveySite");
            var myobj = [
                 req.body
            ];
            dbo.collection("Survey").insertMany(myobj, function(err, result) {
                if (err) throw err;
                res.send(myobj, 201)
                console.log("Number of documents inserted: " + res.insertedCount);
                db.close();
            });
        });
}

module.exports.processSurveyRespondAddPage =
    (req, res, next)=>{
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("SurveySite");
            var myobj = [
                req.body
            ];
            dbo.collection("Answer_Questions").insertMany(myobj, function(err, result) {
                if (err) throw err;
                res.send(myobj, 201)
                console.log("Number of documents inserted: " + res.insertedCount);
                db.close();
            });
        });
    }

module.exports.displaySurveyRespond = (req, res, next) => {

    let id = req.params.id;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("SurveySite");
        dbo.collection("Answer_Questions").find({survey_id: id}).toArray(function(err, result) {
            if (err) throw err;
            res.send(result, 200)
            db.close();
        });
    });
}

module.exports.processEditPage = (req, res, next)=>{
    let id = req.params.id;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("SurveySite");
        var myobj = {_id : new mongo.ObjectID(id)};
        var newvalues = {$set:{FirstName: req.body.FirstName, LastName: req.body.LastName, Title: req.body.Title,
                CreatedDate: req.body.CreatedDate, ExpiryDate: req.body.ExpiryDate, Questions: req.body.Questions}};
        dbo.collection("Survey").updateOne(myobj, newvalues, function(err, obj) {
            if (err) throw err;
            res.status(200).send(obj)
            // res.send(obj, 200)
            console.log("Number of documents inserted: " + res.newvalues);
            db.close();
        });
    });
}

module.exports.performDelete = (req, res, next)=>{
    let id = req.params.id;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("SurveySite");
        var myquery = { _id: new mongo.ObjectID(id) };
        dbo.collection("Survey").deleteOne(myquery, function(err, obj) {
            if (err) throw err;
            res.send(obj, 200)
            console.log("1 document deleted");
            db.close();
        });
    });

}
