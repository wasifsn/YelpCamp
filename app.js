let express          = require("express"),
     app             = express(),
     bodyParser      = require("body-parser"),
     mongoose        = require("mongoose");
    
// mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//SCHEMA Setup
let campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

//mongoose object creation
var Campground = mongoose.model("campground", campgroundSchema);

// Campground.create(
//     {
//             name:"tipsinah", 
//             image: "https://storage.googleapis.com/ehimages/2018/11/3/img_64d012297d00cc777f803e10b98ee3a2_1541233025678_processed_original.jpg",
//             description: "this is a beautiful place with an awesome view"
//     }, function(err, campground){
//         if(err){
//             console.log("an Error occured");
//         } else{
//             console.log("the code worked fine!!")
//             console.log(campground);
//         }
//     }
// );


app.get("/", function(req,res){
    res.render("landing");
})
  
  //INDEX - shows all the campgrounds
  app.get("/campgrounds", function(req,res){
      //get data from DB
      Campground.find({}, function(err, allCampgrounds){
         if(err){
             console.log(err);
         } else {
              res.render("index",{campgrounds: allCampgrounds});
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
        res.render("new.ejs");
   })
   
    //SHOW - shows description/more infor about one campground
    app.get("/campgrounds/:id", function(req,res){
    //find the campground with provided id
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
              console.log(err);
        } else {
              console.log("this ran okay");
              //render the show template
              res.render("show.ejs",{campground: foundCampground});
        }
    });
});
    
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("the yelpcamp server has started");
    
})