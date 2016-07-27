var mongoose = require('mongoose');
var Movieschema=mongoose.Schema({
  Title: String,
  Year: String,
  Actors:String,
  Director:String,
  Language:String,
  Releasdate:String,
  Rating:String,
  Awards:String
});
module.exports = mongoose.model("moviecollection", Movieschema);
