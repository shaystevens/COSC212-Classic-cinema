var Reviews = (function() {
    var pub = {};

    function showReviews() {
        let target = $(this).parent().find(".review")[0];
        let xmlSource = $(this).parent().find("img")[0].src.replace("images", "reviews").replace("jpg", "xml");
        $.ajax({
            type: "GET",
            url: xmlSource,
            cache: false,
            success: function(data) {
                parseReviews(data, target);
            }
        });
    }

    function parseReviews(data, target){
        let html, dl;
        $(target).append("<dl></dl>");
        console.log(target);
        $(data).find("review").each(function () {
            let rating = $(this).find("rating")[0].textContent;
            let user = $(this).find("user")[0].textContent;
            html = "<dt>" + user + ": </dt> <dd>" + rating + "</dd>"
            dl = $(target).find("dl")[0];
            $(dl).append(html);
            console.log(target);
        });
    }


    pub.setup = function() {
        var film = $(".film");
        var $newDiv = $("<div/>").addClass("review");
        var $newinput = $('<input/>').attr({
            type: "button",
            class: "showReviews",
            value: "Show Reviews"
        });

        film.append($newinput);
        film.append($newDiv);
        $(".showReviews").click(showReviews);
    }
    return pub;
}());
$(document).ready(Reviews.setup);