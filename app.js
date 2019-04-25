let express          = require("express"),
     app             = express(),
     bodyParser      = require("body-parser"),
     mongoose        = require("mongoose"),
    Campground       = require("./models/campground"),
    seedDB           = require("./seeds"),
    Comment          = require("./models/comment")
    seedDB();
    
// mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true }); // new syntax of connecting mongoose
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));


app.get("/", function(req,res){
    res.render("landing");
});
  
  //INDEX - shows all the campgrounds
  app.get("/campgrounds", function(req,res){
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
 app.post("/campgrounds", function(req,res){
        var name = req.body.name;
        var image = req.body.image;
        var desc = req.body.description;
        var newCampground = {name: name, image: image, description: desc};
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
   app.get("/campgrounds/new", function(req,res){
        res.render("campgrounds/new");
   });
   
    //SHOW - shows description/more infor about one campground
    app.get("/campgrounds/:id", function(req,res){
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
//================================
//=========comments routes========
//================================
//comments - new Route

app.get("/campgrounds/:id/comments/new", function(req, res) {
  Campground.findById(req.params.id, function(err, campground){
      if (err) {
          console.log(err);
      } else {
          res.render("comments/new", {campground: campground});
      }
  });
});

//comments - Update Route
//find campground using id
//create comment using Comment model
//associate comment with campground
//save comment in the db

app.post("/campgrounds/:id/comments", function(req, res){
    Campground.findById(req.params.id, function(err, campground) {
      if (err){
          console.log(err);
          res.redirect("/campgrounds");
      } else {
          Comment.create(req.body.comment, function(err, comment){
              if (err) {
                  console.log(err);
              } else {
                     campground.comments.push(comment);
                        campground.save();
                        res.redirect("/campgrounds/" + campground._id);
              }
          });
      }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("the yelpcamp server has started");
    
});