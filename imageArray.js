var imageList, imageIndex;

function nextImage() {
    "use strict";
    if(imageIndex === imageList.length){
        imageIndex = 0;
    }
    document.getElementById("images").innerHTML = imageList[imageIndex];
    imageIndex++;
// Need some code in here using imageList and imageIndex
}

function setup() {
    "use strict";
    var classic, scifi, hitchcock;
    imageList = [];
    classic = new MovieCategory("Classic Films", "images/Metropolis.jpg", "classic.html");
    scifi = new MovieCategory("Science Fiction and Horror", "images/Plan_9_from_Outer_Space.jpg", "scifi.html");
    hitchcock = new MovieCategory("Alfred Hitchcock", "images/The_Birds.jpg", "hitchcock.html");

    imageList.push(classic.makeHTML());
    imageList.push(scifi.makeHTML());
    imageList.push(hitchcock.makeHTML());
    imageIndex = 0;
    window.onload = nextImage;
    setInterval(nextImage, 2000);
}

function MovieCategory(title, image, page) {
    this.title = title;
    this.image = image;
    this.page = page;
    this.makeHTML = function() {
        return "<a href='" + page + "'><figure><img src='" + image + "' ><figcaption>" + title + "</figcaption></figure></a>";
    };
}

if (document.getElementById) {
    window.onload = setup;

}