//SCHEMA Setup
var mongoose = require("mongoose");
let campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"}
      ]
});

//mongoose object creation
// var Campground = mongoose.model("campground", campgroundSchema);

module.exports = mongoose.model("Campground", campgroundSchema);