
var map;
var grayStyles = [
    {
        featureType: "all",
        elementType: "geometry.fill",
        stylers: [
            {
                saturation: -100
            },
            {
                lightness: 50
            }
        ]
    },
    {
        elementType: "labels.text.fill",
        stylers: [
            {
                // "color": "#27aae1"
                // "color": "#999999"
                "color": "#333"
            }
        ]
    },
    {
        elementType: "labels.text.stroke",
        stylers: [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#ddd"
            }
        ]
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#ffffff"
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
            {
                "color": "#1e8be5"
            }
        ]
    }
];
var mapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: new google.maps.LatLng(33.9139599, -84.2968273),
    styles: grayStyles,
    zoom: 12
};
function initialize() {
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);