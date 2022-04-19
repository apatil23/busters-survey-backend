var MongoClient = require('mongodb').MongoClient;

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// enable jwt
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

//User model Instance
let userModel = require('../models/user');
let User = userModel.User;

let url = DB.URI


module.exports.processLoginPage = (req, res, next) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("SurveySite");
        dbo.collection("users").findOne({username: req.body.username, password:req.body.password},
            function(err, result) {
            if (err) throw err;
            res.send(result, 201)
            console.log(result);
            db.close();
        });
    });
}


module.exports.processRegisterPage = (req, res, next) => {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("SurveySite");
        dbo.collection("users").insertOne(req.body, function(err, res1) {
            if (err) throw err;

            res.send(res1, 201)
            console.log("1 document inserted");
            db.close();
        });
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}
