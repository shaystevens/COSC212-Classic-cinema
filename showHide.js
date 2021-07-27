var showHide = (function(){
    "use strict";
    var pub = {}; //An object array filled with public functions

    function showHideDetails() {
        var paragraphs, p, image, i;
        paragraphs = this.parentNode.getElementsByTagName("p");
        image = this.parentNode.getElementsByTagName("img");
        for (p = 0; p < paragraphs.length; p+=1) {
            // Show or hide paragraphs[p]
            if (paragraphs[p].style.display === "none") {
                paragraphs[p].style.display = "block";
            } else {
                paragraphs[p].style.display = "none";
            }
        }
        for (i = 0; i < image.length; i+=1) {
            // Show or hide paragraphs[p]
            if (image[i].style.display === "none") {
                image[i].style.display = "block";
            } else {
                image[i].style.display = "none";
            }
        }
    }
    pub.setup = function() {
        var films, f, title;
        films = document.getElementsByClassName("film");
        for (f = 0; f < films.length; f += 1) {
            title = films[f].getElementsByTagName("h3")[0];
            title.style.cursor = "pointer"; //Let's user know they can click on title
            title.onclick = showHideDetails;
        }
    };

    return pub;

}());

if (document.getElementById) {
    if (window.addEventListener) {
        window.addEventListener('load', showHide.setup);
    } else if (window.attachEvent) {
        window.attachEvent('onload', showHide.setup);
    } else {
        alert("Could not attach 'showHide.setup' to the 'window.onload' event");
    }
}
