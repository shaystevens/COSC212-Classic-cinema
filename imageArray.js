var imageArray = (function(){
    "use strict";
    var pub = {}; //An object array filled with public functions

    var imageList, imageIndex;
    function nextImage() {
        if(imageIndex === imageList.length){
            imageIndex = 0;
        }
        document.getElementById("images").innerHTML = imageList[imageIndex];
        imageIndex++;
        $('img').fadeOut(2000, nextImage);
    }

    pub.setup = function() {
        var classic, scifi, hitchcock;
        imageList = [];
        classic = new MovieCategory("Classic Films", "images/Metropolis.jpg", "classic.html");
        scifi = new MovieCategory("Science Fiction and Horror", "images/Plan_9_from_Outer_Space.jpg", "scifi.html");
        hitchcock = new MovieCategory("Alfred Hitchcock", "images/The_Birds.jpg", "hitchcock.html");

        imageList.push(classic.makeHTML());
        imageList.push(scifi.makeHTML());
        imageList.push(hitchcock.makeHTML());
        imageIndex = 0;
        nextImage();
        $('img').fadeOut(2000, nextImage);
    };

    function MovieCategory(title, image, page) {
        this.title = title;
        this.image = image;
        this.page = page;
        this.makeHTML = function() {
            return "<a href='" + this.page + "'><figure><img alt = 'Metropolis' src='" + this.image + " '><figcaption>" + this.title + "</figcaption></figure></a>";
        };
    }

    return pub;

}());

$(document).ready(imageArray.setup);
