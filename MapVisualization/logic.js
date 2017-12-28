// Perform a GET request to query USGS JSON data
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(queryUrl, function(eq_data) {
  createFeatures(eq_data.features);});


// function markerSize(population) {
//   return population / 40;
// }

function createFeatures(earthquakes) {
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p><c> Magnitude: " +feature.properties.mag+"</c>");
  }

  // Create a GeoJSON layer containing the features array on the earthquakes object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakes, {
    onEachFeature: onEachFeature,
      pointToLayer: function (feature, coord) {
        var mag, 
          circle_size, 
          fillColor, 
          type;
        type=feature.properties.type;
        mag = feature.properties.mag;
        if(type === "earthquake"){
          if(mag !== null){
            fillColor = color_list(mag);
            circle_size = 4 * mag;}}

            return L.circleMarker(coord, {
              color:"light grey",
              fillColor:fillColor,
              radius: circle_size,
              fillOpacity: 0.8,
              weight: .3});}});


  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);}

function color_list(eq_data){
  var i= parseInt(eq_data);

  if(i >=0 & i<1 ){return "#d9ff66"}
    else if(i >=1 & i<2 ){return "#ace600"}
    else if(i >=2 & i<3 ){return "#cccc00"}
    else if(i >=3 & i<4 ){return "#ff751a"}
    else if(i >=4 & i<5 ){return "#e60000"}
      else {return "#F30"}}

function createMap(earthquakes) {
  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mcavellero/cjbpxida37bft2snpnqn0wao9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWNhdmVsbGVybyIsImEiOiJjamFrOXpnbWMyZmU0MnFwZGhrYzZhMWZ4In0.9RWUodFEVo3UY-8JNQLwZQ");
  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mcavellero/cjakamzbebl252rq7jayf880q/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWNhdmVsbGVybyIsImEiOiJjamFrOXpnbWMyZmU0MnFwZGhrYzZhMWZ4In0.9RWUodFEVo3UY-8JNQLwZQ");

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Regular": streetmap,
    "Satellite": darkmap};

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes};

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 4,
    layers: [streetmap, earthquakes]
  });


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (myMap) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4, 5],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + color_list(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);

};

function color_list(d){
//Reference - https://gis.stackexchange.com/questions/193161/add-legend-to-leaflet-map
  return d > 5 ? '#990000' :
  d > 4  ? '#e60000' :
  d > 3  ? '#ff751a' :
  d > 2  ? '#cccc00' :
  d > 1   ? '#ace600' :
            '#9F3';

}
