var express = require("express");
var app = express();
app.set("view engine", "ejs");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
 var campgrounds = [
    {name: "Nandi hills", image: "https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/sites/2/2018/01/21185609/NandiHills1.jpg?w=750&h=500&wm=webp&dpr=2"},
    {name:"tipsinah", image: "https://storage.googleapis.com/ehimages/2018/11/3/img_64d012297d00cc777f803e10b98ee3a2_1541233025678_processed_original.jpg"},
    {name: "kharghar", image: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"},
    {name: "Nandi hills", image: "https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/sites/2/2018/01/21185609/NandiHills1.jpg?w=750&h=500&wm=webp&dpr=2"},
    {name:"tipsinah", image: "https://storage.googleapis.com/ehimages/2018/11/3/img_64d012297d00cc777f803e10b98ee3a2_1541233025678_processed_original.jpg"},
    {name: "kharghar", image: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"},
    {name: "Nandi hills", image: "https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/sites/2/2018/01/21185609/NandiHills1.jpg?w=750&h=500&wm=webp&dpr=2"},
    {name:"tipsinah", image: "https://storage.googleapis.com/ehimages/2018/11/3/img_64d012297d00cc777f803e10b98ee3a2_1541233025678_processed_original.jpg"},
    {name: "kharghar", image: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"}    ];
    
app.get("/", function(req,res){
    res.render("landing");
})
  
  app.get("/campgrounds", function(req,res){
     res.render("campgrounds",{campgrounds: campgrounds});
});

 app.post("/campgrounds", function(req,res){
        var name = req.body.name;
        var image = req.body.image;
        var newCampground = {name: name, image: image};
        campgrounds.push(newCampground); 
        res.redirect("/campgrounds");
 });
 
  app.get("/campgrounds/new", function(req,res){
        res.render("new.ejs");
 });

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("the yelpcamp server has started");
    
})