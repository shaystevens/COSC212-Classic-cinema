var cart = (function(){
    "use strict";
    var pub = {};
    var movie;

    function addToCart(){
        movie = {
            title: this.parentElement.parentElement.querySelector("h3").innerText ,
             price: this.parentElement.querySelector("span").innerText
        };

        alert(JSON.stringify(movie));

    }

    pub.setup = function(){
        var buyButton, films, f;
        films = document.getElementsByClassName("film");
        for (f = 0; f < films.length; f += 1) {
            buyButton = films[f].getElementsByClassName("buy")[0];
            buyButton.style.cursor = "pointer"; //Let's user know they can click on title
            buyButton.onclick = addToCart;
        }
    };

    return pub;
}());

if (document.getElementById) {
    if (window.addEventListener) {
        window.addEventListener('load', cart.setup);
    } else if (window.attachEvent) {
        window.attachEvent('onload', cart.setup);
        /* jshint ignore:start */
    } else {
        alert("Could not attach 'cart.setup' to the 'window.onload' event");
        /* jshint ignore:end */
    }
}