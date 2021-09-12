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
            },
            error: function (){
                displayError(target);
            }
        });
    }

    function displayError(target){
        if(target.style.display === "block"){
            target.style.display = "none";
        }else if(target.style.display === "none") {
            target.style.display = "block";
        }else{
            target.style.display = "block";
            $(target).append("<dl><dt>" + "There is no reviews for this movie." + "</dt></dl>");
            $(target).find('dl').classList.add("errorClass");
        }
    }

    function parseReviews(data, target){
        if(target.style.display === "block"){
            target.style.display = "none";
        }else if(target.style.display === "none") {
            target.style.display = "block";
        }else{
            let dl;
            $(target).append("<dl></dl>");
            if($(data).find("review").length === 0){
                displayError(target);
            }
            $(data).find("review").each(function () {
                let rating = $(this).find("rating")[0].textContent;
                let user = $(this).find("user")[0].textContent;
                dl = $(target).find("dl")[0];
                $(dl).append("<dt>" + user + ": </dt> <dd>" + rating + "</dd>");
            });
            target.style.display = "block";
        }
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
        $("showReviews").css("cursor", "pointer");
        $(".showReviews").click(showReviews);
    }
    return pub;
}());
$(document).ready(Reviews.setup);