var cart = (function(){
    "use strict";
    var pub = {};
    var movie;
    var movieArray = [];

    function addToCart(){
        movie = {
            title: this.parentElement.parentElement.querySelector("h3").innerHTML ,
             price: this.parentElement.querySelector("span").innerHTML
        };

        movieArray.push(movie);
        if(Cookie.get("Movie") === null){
            Cookie.set("Movie", JSON.stringify(movieArray), 1);
        } else{
            movieArray = Cookie.get("Movie");
            movieArray = JSON.parse(movieArray);
            movieArray.push(movie);
            Cookie.set("Movie",  JSON.stringify(movieArray), 1);
        }

        alert(JSON.stringify(movieArray));

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

var Cookie = (function () {

    var pub = {};
    pub.set = function (name, value, hours) {
        var date, expires;

        if (hours) {
            date = new Date();
            date.setHours(date.getHours() + hours);
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    };

    pub.get = function (name) {
        var nameEq, cookies, cookie, i;
        nameEq = name + "=";
        cookies = document.cookie.split(";");
        for (i = 0; i < cookies.length; i += 1) {
            cookie = cookies[i].trim();
            if (cookie.indexOf(nameEq) === 0) {
                return cookie.substring(nameEq.length, cookie.length);
            }
        }
        return null;
    };

    pub.clear = function (name) {
        pub.set(name, "", -1);
    };

    return pub;
}());