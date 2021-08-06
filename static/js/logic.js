let myMap = L.map("map-id", {
    center: [0, 0],
    zoom: 3
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// L.control.Legend({
//     position: "bottomright",
//     legends: [{
//         label: ">90",
//         type: "circle",
//         fillcolor: "red",
//     },
//     {
//         label: "70-90",
//         type: "circle",
//         fillcolor: "orange",
//     },
//     {
//         label: "50-70",
//         type: "circle",
//         fillcolor: "yellow",
//     },
//     {
//         label: "30-50",
//         type: "circle",
//         fillcolor: "green",
//     },
//     {
//         label: "10-30",
//         type: "circle",
//         fillcolor: "blue",
//     },
//     {
//         label: "<30",
//         type: "circle",
//         fillcolor: "violet",
//     }]
// }).addTo(map);


// let legend = L.control({
//     position: "bottomright"
// });

// legend.onAdd = function () {
//     let div = L.DomUtil.create("div", "info legend");

//     let height = [">90 KM", "70-90 KM", "50-70 KM", "30-50 KM", "10-30 KM", "<10 KM"];
//     let colors = ["red", "orange", "yellow", "green", "blue", "violet"];
// }

//   // loop thry the intervals of colors to put it in the label
//     for (let i = 0; i<height.length; i++) {
//       div.innerHTML +=
//       "<i style='background: " + colors[i] + "'></i> " +
//       grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
//     }
//     return div;

// //   };


// legend.addTo(myMap)

let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

// let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_hour.geojson"

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
            `Location: ${eq_features[i].properties.place}` + "</h3> <hr> <h3>").addTo(myMap);
    };
});