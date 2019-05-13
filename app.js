var express               = require("express"),
     app                  = express(),
     bodyParser           = require("body-parser"),
     flash                = require("connect-flash"),
     mongoose             = require("mongoose"),
     localStrategy        = require("passport-local"),
     passport             = require("passport"),
     methodOverride       = require("method-override"),
     Campground           = require("./models/campground"),
     Comment              = require("./models/comment"),
     User                 = require("./models/user"),
     seedDB               = require("./seeds");
//Requiring Routes

var commentRoutes         = require("./routes/comments"),    
    campgroundRoutes      = require("./routes/campgrounds"),
    indexRoutes           = require("./routes/index");
    
// mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true }); // new syntax of connecting mongoose
app.use(flash());
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));
// seedDB(); seed the database

//PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret: "i am the best, yea thats meee",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use( function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error       = req.flash('error');
    res.locals.success     = req.flash('success');
    next();
});
//ROUTES-----------------------------------

app.use("/campgrounds/:id/comments",commentRoutes);
app.use(campgroundRoutes);
app.use("/", indexRoutes);

app.get("/", function(req,res){
    res.render("landing");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("the yelpcamp server has started");
    
});