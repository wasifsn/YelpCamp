//middleware

var middlewareObj = {},
    Campground = require("../models/campground.js"),
    Comment    = require("../models/comment.js")

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
     if(req.isAuthenticated()){
         //is user logged in 
      Campground.findById(req.params.id, function(err, foundCampground){
                    if (err){
                        req.flash("error","Campground Does not exist");
                        res.redirect("back");
                    } else{
                        //does user owns the campground
                        if(foundCampground.author.id.equals(req.user._id)){
                        next(); 
                       }
                       else{
                          req.flash("error","You are not Authorized to do that")
                          res.redirect("back");
                       }
       }
    })
}
     else {
        req.flash("error","You Need to Be Logged In To Do That ");
        res.redirect('back');
    }
}

middlewareObj.checkCommentOwnership= function(req, res, next) {
     if(req.isAuthenticated()){
         //is user logged in 
      Comment.findById(req.params.comment_id, function(err, foundComment){
                    if (err){
                        req.flash("error","Comment not found");
                        res.redirect("back");
                    } else{
                        //does user owns the campground
                        if(foundComment.author.id.equals(req.user._id)){
                        next(); 
                       }
                       else{
                          req.flash("error","You are not authorized to do that"); 
                          res.redirect("back");
                       }
       }
    })
}
     else {
        req.flash("error","You Need to Be Logged In To Do That ");
        res.redirect('back');
    }
}

middlewareObj.isLoggedIn= function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    req.flash("error","You Need to Be Logged In To Do That ");
    res.redirect("/login");
}

module.exports = middlewareObj;