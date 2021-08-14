var cart = (function(){
    "use strict";
    var pub = {};
    var movie;
    var movieArray = [];

    function addToCart(){
        movie = {
            title: $(this).parent().parent().find("h3").html() ,
            price: $(this).parent().find("span").html()
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
    }

    pub.setup = function(){
        $(".buy").click(addToCart).css({cursor: "pointer"});
    };

    return pub;
}());

$(document).ready(cart.setup);

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