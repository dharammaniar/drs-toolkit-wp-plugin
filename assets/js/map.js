jQuery(document).ready(function($) {


    var apiKey = getApiKey($('#map'));
    var projectKey = getProjectKey($('#map'));

    var colorGroups = getColorGroups($('#map'));
    var colorDescriptions = getColorDescriptions($('#map'));

    var items = getItemsFromJqueryArray($('.coordinates'));

    var mymap = createMap('map');

    addTileLayerToMap(mymap, apiKey, projectKey);

    addPopupsToItems(items, mymap, colorGroups);

    var bounds = getBoundsForMap(items);

    mymap.fitBounds(bounds);
});

function getApiKey(jqSelector) {
    return jqSelector.data('map_api_key');
}

function getProjectKey(jqSelector) {
    return jqSelector.data('map_project_key');
}

function getColorDescriptions(jqSelector) {
    var colorDescriptions = {};
    if (jqSelector.data('red_legend_desc')) {
        colorDescriptions.red = jqSelector.data('red_legend_desc');
    }
    if (jqSelector.data('blue_legend_desc')) {
        colorDescriptions.blue = jqSelector.data('blue_legend_desc');
    }
    if (jqSelector.data('green_legend_desc')) {
        colorDescriptions.green = jqSelector.data('green_legend_desc');
    }
    if (jqSelector.data('yellow_legend_desc')) {
        colorDescriptions.yellow = jqSelector.data('yellow_legend_desc');
    }
    if (jqSelector.data('orange_legend_desc')) {
        colorDescriptions.orange = jqSelector.data('orange_legend_desc');
    }

    return colorDescriptions;
}

function getColorGroups(jqSelector) {
    var colorGroups = {};
    if (jqSelector.data('red')) {
        colorGroups.red = jqSelector.data('red');
    }
    if (jqSelector.data('blue')) {
        colorGroups.blue = jqSelector.data('blue');
    }
    if (jqSelector.data('green')) {
        colorGroups.green = jqSelector.data('green');
    }
    if (jqSelector.data('yellow')) {
        colorGroups.yellow = jqSelector.data('yellow');
    }
    if (jqSelector.data('orange')) {
        colorGroups.orange = jqSelector.data('orange');
    }

    return colorGroups;
}

function getCordinatesFromString(input) {
    if (!input) {
        return null;
    }
    return [
        input.split(',')[0].trim(),
        input.split(',')[1].trim()
    ];
}

function getItemsFromJqueryArray(jqArray) {
    var items = [];
    jqArray.each(function(index) {
        if (dataExists(jqArray[index])) {
            items.push({
                pid: jQuery(jqArray[index]).data('pid'),
                title: jQuery(jqArray[index]).data('title'),
                coordinates: getCordinatesFromString(jQuery(jqArray[index]).data('coordinates')),
                metadata: jQuery(jqArray[index]).data('metadata'),
                url: jQuery(jqArray[index]).data('url')
            });
        }
    });

    return items;
}

function dataExists(input) {
    return pidExists(input) && titleExists(input) && coordinatesExists(input) && metaDataExists(input) && urlExists(input);
}

function pidExists(input) {
    return (jQuery(input).data('pid')) ? true : false;
}
function titleExists(input) {
    return (jQuery(input).data('title')) ? true : false;
}
function coordinatesExists(input) {
    return (jQuery(input).data('coordinates')) ? true : false;
}
function metaDataExists(input) {
    return (jQuery(input).data('metadata')) ? true : false;
}
function urlExists(input) {
    return (jQuery(input).data('url')) ? true : false;
}

function createMap(mapID) {
    if (!mapID) {
        return null;
    }
    return L.map(mapID);
}

function getBoundsForMap(items) {
    var bounds = [];
    jQuery.each(items, function(index, item) {
        bounds.push(item.coordinates);
    });
    return bounds;
}

function addPopupsToItems(items, map, colorGroups) {
    var markers = L.markerClusterGroup();


    jQuery.each(items, function(index, item) {

        var icon = L.icon({
            iconUrl: './wp-content/plugins/drs-tk/assets/js/leaflet/images/marker-blue-icon.png',
            iconRetinalUrl: './wp-content/plugins/drs-tk/assets/js/leaflet/images/marker-blue-icon-2x.png',
            iconSize: [29, 41],
            iconAnchor: [14, 41],
            popupAnchor: [0, -41],
            shadowUrl: './wp-content/plugins/drs-tk/assets/js/leaflet/images/marker-shadow.png',
            shadowRetinaUrl: './wp-content/plugins/drs-tk/assets/js/leaflet/images/marker-shadow.png',
            shadowSize: [41, 41],
            shadowAnchor: [13, 41]
        });

        if (colorGroups.red.includes(item.pid)) {
            icon = L.icon({
                iconUrl: './wp-content/plugins/drs-tk/assets/js/leaflet/images/marker-red-icon.png',
                iconRetinalUrl: './wp-content/plugins/drs-tk/assets/js/leaflet/images/marker-red-icon-2x.png',
                iconSize: [29, 41],
                iconAnchor: [14, 41],
                popupAnchor: [0, -41],
                shadowUrl: './wp-content/plugins/drs-tk/assets/js/leaflet/images/marker-shadow.png',
                shadowRetinaUrl: './wp-content/plugins/drs-tk/assets/js/leaflet/images/marker-shadow.png',
                shadowSize: [41, 41],
                shadowAnchor: [13, 41]
            });
        }

        if (colorGroups.blue.includes(item.pid)) {
            icon = L.icon({
                iconUrl: './wp-content/plugins/drs-tk/assets/js/leaflet/images/marker-blue-icon.png',
                iconRetinalUrl: './wp-content/plugins/drs-tk/assets/js/leaflet/images/marker-blue-icon-2x.png',
                iconSize: [29, 41],
                iconAnchor: [14, 41],
                popupAnchor: [0, -41],
                shadowUrl: './wp-content/plugins/drs-tk/assets/js/leaflet/images/marker-shadow.png',
                shadowRetinaUrl: './wp-content/plugins/drs-tk/assets/js/leaflet/images/marker-shadow.png',
                shadowSize: [41, 41],
                shadowAnchor: [13, 41]
            });
        }

        if (colorGroups.green.includes(item.pid)) {
            icon = L.icon({
                iconUrl: './wp-content/plugins/drs-tk/assets/js/leaflet/images/marker-green-icon.png',
                iconRetinalUrl: './wp-content/plugins/drs-tk/assets/js/leaflet/images/marker-green-icon-2x.png',
                iconSize: [29, 41],
                iconAnchor: [14, 41],
                popupAnchor: [0, -41],
                shadowUrl: './wp-content/plugins/drs-tk/assets/js/leaflet/images/marker-shadow.png',
                shadowRetinaUrl: './wp-content/plugins/drs-tk/assets/js/leaflet/images/marker-shadow.png',
                shadowSize: [41, 41],
                shadowAnchor: [13, 41]
            });
        }

        if (colorGroups.yellow.includes(item.pid)) {
            icon = L.icon({
                iconUrl: './wp-content/plugins/drs-tk/assets/js/leaflet/images/marker-yellow-icon.png',
                iconRetinalUrl: './wp-content/plugins/drs-tk/assets/js/leaflet/images/marker-yellow-icon-2x.png',
                iconSize: [29, 41],
                iconAnchor: [14, 41],
                popupAnchor: [0, -41],
                shadowUrl: './wp-content/plugins/drs-tk/assets/js/leaflet/images/marker-shadow.png',
                shadowRetinaUrl: './wp-content/plugins/drs-tk/assets/js/leaflet/images/marker-shadow.png',
                shadowSize: [41, 41],
                shadowAnchor: [13, 41]
            });
        }

        if (colorGroups.orange.includes(item.pid)) {
            icon = L.icon({
                iconUrl: './wp-content/plugins/drs-tk/assets/js/leaflet/images/marker-orange-icon.png',
                iconRetinalUrl: './wp-content/plugins/drs-tk/assets/js/leaflet/images/marker-orange-icon-2x.png',
                iconSize: [29, 41],
                iconAnchor: [14, 41],
                popupAnchor: [0, -41],
                shadowUrl: './wp-content/plugins/drs-tk/assets/js/leaflet/images/marker-shadow.png',
                shadowRetinaUrl: './wp-content/plugins/drs-tk/assets/js/leaflet/images/marker-shadow.png',
                shadowSize: [41, 41],
                shadowAnchor: [13, 41]
            });
        }

        var marker = L.marker(
            new L.LatLng(item.coordinates[0], item.coordinates[1]),
            {
                title: item.title,
                icon: icon
            });
        var popupContent = "<a href='" + item.url + "' target='_blank'>" + item.title + "</a><br/>" + item.metadata;
        marker.bindPopup(popupContent);
        markers.addLayer(marker);
    });
    map.addLayer(markers);
}

function addTileLayerToMap(map, apiKey, projectKey) {
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: projectKey,
        accessToken: apiKey
    }).addTo(map);
}