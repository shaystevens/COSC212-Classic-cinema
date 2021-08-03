var shoppingCart = (function(){
    "use strict";
    var pub = {}; //An object array filled with public functions
    var movieArray = [];

    function cart(){
        let par, i, movie, title, price;
        par = document.getElementById("cartDisplay");
        if (Cookie.get("Movie") === null) {
            par.innerText = "Your cart is currently empty.";
        } else {
            movieArray = JSON.parse(Cookie.get("Movie"));
            for(i=0; i < movieArray.length; i++){
                movie = movieArray[i];
                title = Object.keys(movie)[0];
                price = Object.keys(movie)[1];
                par.innerText = JSON.stringify(title) + JSON.stringify(price);

            }

        }
    }

    pub.setup = function() {
        cart();
    };

    return pub;

}());

if (document.getElementById) {
    if (window.addEventListener) {
        window.addEventListener('load', shoppingCart.setup);
    } else if (window.attachEvent) {
        window.attachEvent('onload', shoppingCart.setup);
        /* jshint ignore:start */
    } else {
        alert("Could not attach 'showHide.setup' to the 'window.onload' event");
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