var map = (function(){
    "use strict";
    var pub ={};
    var centralMarker, northMarker, southMarker;


    function onMapClick(e) {
        alert('You clicked the map at ' + e.latlng);
    }

    function centreMap(e) {
        var markerLocation, markerBounds;
        console.log(this);
        if (this.textContent === 'Central') {
            markerLocation = [centralMarker.getLatLng()];
            markerBounds = L.latLngBounds(markerLocation);
            map.fitBounds(markerBounds);
        }

        if (this.textContent === 'North') {
            markerLocation = [northMarker.getLatLng()];
            markerBounds = L.latLngBounds(markerLocation);
            map.fitBounds(markerBounds);
        }

        if (this.textContent === 'South') {
            markerLocation = [southMarker.getLatLng()];
            markerBounds = L.latLngBounds(markerLocation);
            map.fitBounds(markerBounds);
        }
    }

    pub.setup = function(){
        var headings, heading, f;
        map = L.map('map').setView([-45.875, 170.500], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            { maxZoom: 18, attribution: 'Map data &copy; ' +
                '<a href="http://www.openstreetmap.org/copyright">' + 'OpenStreetMap contributors</a> CC-BY-SA'
        }).addTo(map);

        //North
        northMarker = L.marker([-45.860973, 170.511925]).addTo(map);
        northMarker.bindPopup("<b id=" + 'popupB' + ">North Store</b>" +
            "<img id= " + 'popupImage' + " src= " + 'images/The_Birds.jpg' + ">" +
            "<p id= " + 'popupP' + ">Specialising in Alfred Hitchcock</p>");

        //Central
        centralMarker = L.marker([-45.873782, 170.502896]).addTo(map);
        centralMarker.bindPopup("<b id=" + 'popupB' + ">Central Store</b>" +
            "<img id= " + 'popupImage' + " src= " + 'images/Metropolis.jpg' + ">" +
            "<p id= " + 'popupP' + ">Specialising in Classic Cinema</p>");

        //South
        southMarker = L.marker([-45.885554, 170.496504]).addTo(map);
        southMarker.bindPopup("<b id=" + 'sciB' + ">South Store</b>" +
            "<img id= " + 'sciImage' + " src= " + 'images/Plan_9_from_Outer_Space.jpg' + ">" +
            "<p id= " + 'sciP' + ">Specialising in Science Fiction</p>");


        L.circle( [-45.875, 170.500],
            { radius: 100,
                color: 'red',
                fillColor: 'red',
                fillOpacity: 0.5 } ).addTo(map);

        L.polygon( [ [-45.874, 170.500],
                [-45.875, 170.499],
                [-45.875, 170.501] ],
            { color: 'green',
                fillColor: 'blue',
                fillOpacity: 0.25 } ).addTo(map);

        map.on('click', onMapClick);

        headings = document.getElementsByTagName("h3");
        for(f=0; f<headings.length; f++){
            heading = headings[f];
            heading.style.cursor = "pointer";
            heading.onclick = centreMap;
        }

        };

    return pub;

}());

if (document.getElementById) {
    if (window.addEventListener) {
        window.addEventListener('load', map.setup);
    } else if (window.attachEvent) {
        window.attachEvent('onload', map.setup);
        /* jshint ignore:start */
    } else {
        alert("Could not attach 'map.setup' to the 'window.onload' event");
        /* jshint ignore:end */
    }
}
