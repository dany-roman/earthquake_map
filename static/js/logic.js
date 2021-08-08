let myMap = L.map("map", {
    center: [0, 0],
    zoom: 3
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

d3.json(url).then(function (data) {
    console.log(data);

    let eq_features = data.features

    for (let i = 0; i < 5000; i++) {

        let coordinates = [eq_features[i].geometry.coordinates[1], eq_features[i].geometry.coordinates[0]]
        let depth = eq_features[i].geometry.coordinates[2]
        let color = "";

        if (depth >= 90) { color = 'red' }
        else if (depth >= 70) { color = 'orange' }
        else if (depth >= 50) { color = 'yellow' }
        else if (depth >= 30) { color = 'green' }
        else if (depth >= 10) { color = 'blue' }
        else if (depth < 10) { color = 'purple' }

        console.log(coordinates)
        L.circle(coordinates, {
            radius: (eq_features[i].properties.mag * 1e4),
            color: color,
            opacity: 1,
            fillOpacity: 0.8,
            fillColor: color
        }).bindPopup(
            "<h2>" + `Magnitude: ${eq_features[i].properties.mag}` + "</h2> <hr> <h3>" +
            `Location: ${eq_features[i].properties.place}` + "</h3> <hr> <h3>" +
            `Depth: ${depth} km` + "</h3> <hr> <h3>").addTo(myMap);
    };
});

let legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
    let div = L.DomUtil.create('div', 'info legend')
    let colors = ['#8F00FF', '#0000FF', '#00FF00', '#FFFF00', '#FFA500', '#FF0000']

    let labels = [];

    var leg_info =
        "<h1>Depth (km)<h1>" +
        "<div class=\"labels\">" +
        "<div class=\"max\">90</div>" +
        "<div class=\"fourth\">70-90</div>" +
        "<div class=\"third\">50-70</div>" +
        "<div class=\"second\">30-50</div>" +
        "<div class=\"first\">10-30</div>" +
        "<div class=\"min\"><10</div>" +
        "</div>";

    div.innerHTML = leg_info;

    colors.forEach(function (color) {
        labels.push("<li style=\"background-color: " + color + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
};

legend.addTo(myMap);
