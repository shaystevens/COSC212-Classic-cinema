function showHideDetails() {
    alert("Not implemented yet");
}
function setup() {
    var films, f, title;
    films = document.getElementsByClassName("film");
    for (f = 0; f < films.length; f += 1) {
        title = films[f].getElementsByTagName("h3")[0];
        title.onclick = showHideDetails;
    }
}
if (document.getElementById) {
    window.onload = setup;
}