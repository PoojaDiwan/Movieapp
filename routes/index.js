var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var fdata = {};
var bodyParser = require("body-parser");
var User = require(".././models/moviedb");
var request=require('request');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost/users')
var db = mongoose.connection;

////to show all
router.get('/showall', function (req, res) {
  db.on("error", console.error.bind(console, "Connection Error:"));
  db.open('open', function(){
    User.find({}, function(err, data){
      fdata = data;
      res.send(fdata);
    });
  });
});
//to update
router.put('/update', function (req, res){
  db.on("error", console.error.bind(console, "Connection Error:"));
  db.open('open', function(){
    User.findById(req.body.id,function(err,data){
      if(err)
      {
      res.send("Movie not found");
      }
      else
      {
      data.Year = req.body.year;
      }


    data.save(function (err) {
      if (err) res.send(err);
      res.send("Movie Udated");

    });
    });
  });
});


  ////to add
  router.post('/add', function(req, res, next) {

   var mname=req.body.title;
   var murl="http://www.omdbapi.com/?t="+mname+"&y=&plot=short&r=json";
     console.log(murl);
   request(murl, function(err, resp, body) {
    body = JSON.parse(body);
    var obj=new User(body);
 //movie.save(body, function(err, result) {
 obj.save( function(err){
      if (err)
        console.log(err);
        res.send("Movie not present");
      //res.send(res1.Title+" movie  record Inserted");
     // res.end();
    });
 res.send(obj.Title+" Inserted");
//  });

 });
 });
  ///to delete
  router.delete('/del', function(req, res) {
    db.on("error", console.error.bind(console, "Connection Error:"));
    db.open('open', function(){
      User.remove({'title':req.body.name}, function(err, data){
        fdata = data;
        res.send(fdata);
      });
    });
  });
  module.exports = router;
