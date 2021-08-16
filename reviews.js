var Reviews = (function() {
    var pub = {};
    function showReviews() {
        var target = $(this).parent().find(".review")[0];
        var data = $(this).parent().find("img")[0].src.replace("images", "reviews").replace("jpg", "xml");
        console.log(data);
        console.log(target);
        console.log("Show Reviews called");
        $.ajax({
            type: "GET",
            url: data,
            cache: false,
            success: function(data) {
                parseReviews(data, target);
            }
        });
    }

    function parseReviews(data, target){
        var x = target.html();
        $(data).find("review").each(function () {
            var rating = $(this).find("rating")[0].textContent;
            var user = $(this).find("user")[0].textContent;
        });
    }
    pub.setup = function() {
        var film = $(".film");
        var $newDiv = $("<div/>").addClass("review");
        var $newinput = $('<input type='+"button " + 'value=' + "Show"  +"Reviews" + '>').addClass("showReviews");
        film.append($newinput);
        film.append($newDiv);
        $(".showReviews").click(showReviews);
    }
    return pub;
}());
$(document).ready(Reviews.setup);