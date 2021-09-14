var showHide = (function(){
    "use strict";
    var pub = {}; //An object array filled with public functions

    function showHideDetails() {
        $(this).siblings().toggle();
    }

    pub.setup = function() {
        let h3Tags = $(".film").find("h3");
        h3Tags.css("cursor", "pointer");
        h3Tags.click(showHideDetails);
    };

    return pub;

}());

$(document).ready(showHide.setup);