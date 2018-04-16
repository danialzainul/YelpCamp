var express     = require("express");
var router      = express.Router({mergeParams: true}); // mergeParams of both Campground & Comment
var Campground  = require("../models/campground");     // inside comment routes, we can access /campground/:id/
var Comment     = require("../models/comment");
var middleware  = require("../middleware"); // automatically add index.js

// Show Comments Create form
router.get("/new", middleware.isLoggedIn, function(req, res){
    // find campground by ID
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
        } else {
            res.render("comments/new", {campground:campground});
        }
    });
});

// Post Comments Create form
router.post("/", middleware.isLoggedIn, function(req, res){
    // lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){ // create new comment
                if(err){
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id; // comment.author.id based on commentSchema
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    campground.comments.push(comment); // connect new comment to campground
                    campground.save();
                    console.log(comment);
                    req.flash("success", "Successfully added comment");
                    res.redirect("/campgrounds/" + campground._id); // redirect to campground show page
                }
            });
        }
    });
});

// Show EDIT comment form
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    // req.params.comment_id is from the url. eq, /:comment_id/edit
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    })
});

// PUT UPDATE comment form
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Successfully edited comment");
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

// DELETE Comments Route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err) {
            res.redirect("back");
        } else {
            req.flash("success", "Successfully deleted comment");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;