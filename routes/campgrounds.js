var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground");
var Comment     = require("../models/comment");
var middleware  = require("../middleware"); // automatically add index.js

// INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else { // req.user passes user data which we can use
            res.render("campgrounds/index", {campgrounds: allCampgrounds, page: "campgrounds"});
        }
    });
});

// CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form & add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, price: price, image: image, description: desc, author: author};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            // redirect back to campgrounds page
            req.flash("success", "Successfully created campground");
            res.redirect("/campgrounds");
        }
    });
});

// NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new"); 
});

// SHOW - show more details about one campground
router.get("/:id", function(req, res){
    // find campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            // render show template of that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// Show EDIT campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Successfully updated campground")
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DELETE campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds/" + req.params.id);
        } else {
            req.flash("success", "Successfully deleted campground");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;