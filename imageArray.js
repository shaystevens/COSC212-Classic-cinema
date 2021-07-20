"use strict";
var imageList, imageIndex;

function nextImage() {
    if(imageIndex === imageList.length){
        imageIndex = 0;
    }

    document.getElementById("images").innerHTML.src = imageList[imageIndex];
    imageIndex++;
// Need some code in here using imageList and imageIndex
}

function setup() {
    imageList = [];
    imageList.push("images/Metropolis.jpg");
    imageList.push("images/Plan_9_from_Outer_Space.jpg");
    imageList.push("images/Vertigo.jpg");
    imageIndex = 0;
    setInterval(nextImage, 2000);
}

if (document.getElementById) {
    window.onload = setup;
}