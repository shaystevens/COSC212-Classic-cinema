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
        setInterval(nextImage, 2000);
    };

    function MovieCategory(title, image, page) {
        this.title = title;
        this.image = image;
        this.page = page;
        this.makeHTML = function() {
            return "<a href='" + this.page + "'><figure><img src='" + this.image + "'><figcaption>" + this.title + "</figcaption></figure></a>";
        };
    }

    return pub;

}());


if (document.getElementById) {
    if (window.addEventListener) {
        window.addEventListener('load', imageArray.setup);
    } else if (window.attachEvent) {
        window.attachEvent('onload', imageArray.setup);
        /* jshint ignore:start */
    } else {
        alert("Could not attach 'imageArray.setup' to the 'window.onload' event");
        /* jshint ignore:end */
    }
}