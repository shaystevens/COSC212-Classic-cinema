var shoppingCart = (function(){
    "use strict";
    var pub = {}; //An object array filled with public functions
    var movieArray = [];

    function cart(){
        let i, movie, title, price, movieList;
        let total = 0;

        if (Cookie.get("Movie") === null) {
            $("#cartDisplay").text("Your cart is currently empty.");
            $("#checkoutForm").css({display: "none"});
        } else {
            $("#checkoutForm").css({display: "block"});
            movieArray = JSON.parse(Cookie.get("Movie"));
            for(i=0; i < movieArray.length; i++){
                movieList = document.createElement("li");
                movie = movieArray[i];
                title = Object.values(movie)[0];
                price = Object.values(movie)[1];
                total += parseFloat(price);
                movieList.innerText = "Movie title: " + title + " Price: " + price;
                $("#movieDisplay").append(movieList);
                $("#cartDisplay").text("The Total Price is: " + total.toFixed(2));
            }

        }
    }

    pub.setup = function() {
        cart();
    };

    return pub;

}());

$(document).ready(shoppingCart.setup);

var Cookie = (function () {
    "use strict";
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