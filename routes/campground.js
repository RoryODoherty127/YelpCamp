// *************************
// Campground Route //
// *************************

var express = require("express");
var router = express.Router();
var Campground = require('../models/campground');
var Comment = require("../models/comment");
var middleware = require("../middleware");

//  INDEX -- Show all campgrounds
router.get("/", function(req, res){
        // Get all campgrounds from DB and then render file
        Campground.find({}, function(err, allCampgrounds){
            if (err) {
                console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds,});
        }
        // res.render("campgrounds", {campgrounds:campgrounds});
    });
});

// CREATE -- Add new campground to DB
router.post("/", function(req, res){
    
    // get data from form and add to campgrounds array 
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, price: price, image: image, description: desc, author:author};
    // need to create a new campground and add to the DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){ console.log(err);
    } else {
        console.log(newlyCreated);
        req.flash("success", "well done, you built a new campground");
        res.redirect("/campgrounds");
    }
    });
});

// NEW -- show form to create a new campground 
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

// SHOW - Shows more information about one campground
router.get("/:id", function(req, res) {
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){console.log(err);
       } else{
        //   render show template with that campground
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});

// EDIT campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){console.log(err)} else{
        res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});


// UPDATE campground route

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    // we need to find and update the correct campground database
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {    // redirect somewhere - usually the showpage
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY Campground Route

router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else { 
            res.redirect("/campgrounds");
        }
    }); 
});

module.exports = router;