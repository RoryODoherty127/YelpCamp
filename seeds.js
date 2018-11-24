var mongoose    =   require("mongoose"),
    Campground  =   require("./models/campground"),
    Comment     =   require("./models/comment");
 
var data = [{
    name : "Westport",
    image : "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
    description: "Freegan drinking vinegar disrupt selfies fashion axe, biodiesel williamsburg keytar. Narwhal craft beer cardigan vaporware meh succulents crucifix hoodie polaroid chia semiotics aesthetic. Skateboard vexillologist lyft tumblr scenester polaroid semiotics. Twee intelligentsia keffiyeh, four dollar toast sartorial leggings quinoa fam ramps."
},
{   name:"Castlebar",
    image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
    description: "Freegan drinking vinegar disrupt selfies fashion axe, biodiesel williamsburg keytar. Narwhal craft beer cardigan vaporware meh succulents crucifix hoodie polaroid chia semiotics aesthetic. Skateboard vexillologist lyft tumblr scenester polaroid semiotics. Twee intelligentsia keffiyeh, four dollar toast sartorial leggings quinoa fam ramps."
},
{   name: "Westport, CT",
    image:"https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
    description: "Freegan drinking vinegar disrupt selfies fashion axe, biodiesel williamsburg keytar. Narwhal craft beer cardigan vaporware meh succulents crucifix hoodie polaroid chia semiotics aesthetic. Skateboard vexillologist lyft tumblr scenester polaroid semiotics. Twee intelligentsia keffiyeh, four dollar toast sartorial leggings quinoa fam ramps."
}] ;



function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        // add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;