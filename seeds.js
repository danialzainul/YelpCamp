var mongoose        = require("mongoose");
var Campground      = require("./models/campground");
var Comment         = require("./models/comment");

var data = [
    {
        name: "Parzival",
        image: "https://d3p3bcg1goda5c.cloudfront.net/media/catalog/product/cache/small_image/240x300/beff4985b56e3afdbeabfc89641a4582/2/6/26916_1.png",
        description: "Real name is Wade Watts. Main character of RPO. The worldwide bestseller—now a major motion picture directed by Steven Spielberg. In the year 2045, reality is an ugly place. The only time teenage Wade Watts really feels alive is when he's jacked into the virtual utopia known as the OASIS."
    },
    {
        name: "Sho the Yellow Ninja",
        image: "https://d3p3bcg1goda5c.cloudfront.net/media/catalog/product/cache/small_image/240x300/beff4985b56e3afdbeabfc89641a4582/2/2/22054_1.png",
        description: "Real name is Xo. He is 11 years old. The worldwide bestseller—now a major motion picture directed by Steven Spielberg. In the year 2045, reality is an ugly place. The only time teenage Wade Watts really feels alive is when he's jacked into the virtual utopia known as the OASIS."
    },
    {
        name: "Art3mis",
        image: "https://d3p3bcg1goda5c.cloudfront.net/media/catalog/product/cache/small_image/240x300/beff4985b56e3afdbeabfc89641a4582/2/2/22050_1.png",
        description: "Real name is Samantha. Love interest of Wade. The worldwide bestseller—now a major motion picture directed by Steven Spielberg. In the year 2045, reality is an ugly place. The only time teenage Wade Watts really feels alive is when he's jacked into the virtual utopia known as the OASIS."
    },
]
    
function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Removed campgrounds!");
            // Add new campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Added new campground!");
                        // Create a comment on each campground
                        Comment.create(
                            {
                                text: "This movie is awesome!!",
                                author: "Steven Spielberg",
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Comments created!");
                                }
                            });
                    }
                });
            });
        }
    });
    // Add a few comments
}

module.exports = seedDB;