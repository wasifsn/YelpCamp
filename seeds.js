var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [{ name:"mumbai",
              image: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
              description: "Essential JavaScript development tools that help you go to market faster and build powerful applications using modern open source code."
            },
            { name:"bangalore",
              image: "https://images.pexels.com/photos/556416/pexels-photo-556416.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
              description: "Essential JavaScript development tools that help you go to market faster and build powerful applications using modern open source code."
            },
            { name:"chennai",
              image: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
              description: "Essential JavaScript development tools that help you go to market faster and build powerful applications using modern open source code."
            },
            
];

function seedDB(){
Campground.deleteMany(function(err, removeCampground){
    if (err) {
        console.log(err);
    } else {
        console.log("campgrounds Removed");
        data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if (err){
                        console.log(err);
                    } else {
                        console.log("added a campground");
                       
                        Comment.create({text:"this is a new comment for the test", 
                                        author:"homer"},
                            function(err,comment){
                                if (err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("created new comment");
                                }
                            });
                    }
                });
            });
        }
    });  
}
module.exports = seedDB;