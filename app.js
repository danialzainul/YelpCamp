require('dotenv').config();

var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    flash               = require("connect-flash"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    methodOverride      = require("method-override"),
    passportLocalMongoose = require("passport-local-mongoose"),
    Campground          = require("./models/campground"),
    Comment             = require("./models/comment"),
    User                = require("./models/user"),
    seedDB              = require("./seeds");

// Requiring Routes
var indexRoutes         = require("./routes/index"),
    campgroundRoutes    = require("./routes/campgrounds"),
    commentRoutes       = require("./routes/comments");
    
// Development env - Local host database
mongoose.connect(process.env.DATABASEURL);

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";
mongoose.connect(url);

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();   // seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Spiderman, best superhero!!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Pass current user data to ALL templates
// MIDDLEWARE
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

// Tells the app to use the routes which we required as above
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP);