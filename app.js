var express = require("express");
var app = express();
app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("landing");
})
  
  app.get("/campgrounds", function(req,res){
   
    var campgrounds = [
    {   
        name: "Nandi hills", image: "https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/sites/2/2018/01/21185609/NandiHills1.jpg?w=750&h=500&wm=webp&dpr=2"
    },
    
    {
        name:"tipsinah", image: "http://tipsinahmoundscampground.com/wp-content/uploads/2017/07/IMG_6559-copy.jpg"
    }
    ]
     res.render("campgrounds",{campgrounds: campgrounds});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("the yelpcamp server has started");
    
})