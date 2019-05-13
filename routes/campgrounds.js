var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware")
router.get("/", function(req,res){
    res.render("landing");
});

//Index - show all campgrounds
  router.get("/campgrounds", function(req,res){
      //get data from DB
      Campground.find({}, function(err, allCampgrounds){
         if(err){
             console.log(err);
         } else {
              res.render("campgrounds/index",{campgrounds: allCampgrounds});
         }
         
      });
});
    
 //CREATE - create a campground    
 router.post("/campgrounds", middleware.isLoggedIn, function(req,res){
        var name = req.body.name;
        var image = req.body.image;
        var desc = req.body.description;
        var author = {
            id: req.user._id,
            username: req.user.username
        }
        var newCampground = {name: name, image: image, description: desc, author:author};
        //'create a new campground and save to DB'
        Campground.create(newCampground, function(err, newlycreated){
          if(err){
              console.log(err);
          } else {
              //redirect back to campground
              res.redirect("/campgrounds");
          } 
        });
  });
 
  //NEW - shows form to add a campground
   router.get("/campgrounds/new", middleware.isLoggedIn, function(req,res){
        res.render("campgrounds/new");
   });
   
    //SHOW - shows description/more infor about one campground
    router.get("/campgrounds/:id", function(req,res){
    //find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
              console.log(err);
        } else {
              console.log(foundCampground);
              //render the show template
              res.render("campgrounds/show",{campground: foundCampground});
        }
    });
});
//EDIT ROUTE
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership , function(req, res) {
        Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground}); 
        });
});
//UPDATE ROUTE
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if (err){
            console.log("err");
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DELETE ROUTE

router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndDelete(req.params.id, function(err){
      if (err){
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds");
      }
   }); 
});

module.exports = router;