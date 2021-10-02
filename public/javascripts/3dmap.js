mapboxgl.accessToken =
"pk.eyJ1IjoiYWxpLWFnaCIsImEiOiJja3U0OWJlNW4weDgwMzFvNmhsY2dhMWZ0In0._9bFwcY83fo_G3G2EuI8xw";
const map = new mapboxgl.Map({
style: "mapbox://styles/mapbox/light-v10",
center: [-83.045754, 42.331427],
zoom: 15.6,
pitch: 45,
bearing: -17.6,
container: "3dmap",
antialias: true,
});


// add fullscreen button
map.addControl(new mapboxgl.FullscreenControl());


// add navigation control (zoom in, zoom out, direction)
map.addControl(new mapboxgl.NavigationControl());



// define the geocoder and it functionality
const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
    });


// add the geocoder to the site
document.getElementById('geocoder').appendChild(geocoder.onAdd(map));


// load the 3d building layer
map.on("load", () => {
// Insert the layer beneath any symbol layer.
const layers = map.getStyle().layers;
const labelLayerId = layers.find(
    (layer) => layer.type === "symbol" && layer.layout["text-field"]
).id;

// The 'building' layer in the Mapbox Streets
// vector tileset contains building height data
// from OpenStreetMap.
map.addLayer(
    {
        id: "add-3d-buildings",
        source: "composite",
        "source-layer": "building",
        filter: ["==", "extrude", "true"],
        type: "fill-extrusion",
        minzoom: 15,
        paint: {
            "fill-extrusion-color": "#aaa",

            // Use an 'interpolate' expression to
            // add a smooth transition effect to
            // the buildings as the user zooms in.
            "fill-extrusion-height": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.05,
                ["get", "height"],
            ],
            "fill-extrusion-base": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.05,
                ["get", "min_height"],
            ],
            "fill-extrusion-opacity": 0.6,
        },
    },
    labelLayerId
);
});